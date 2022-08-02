/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { RunOnceScheduler } from '../../../base/common/async.js';
import { Emitter } from '../../../base/common/event.js';
import { DisposableStore } from '../../../base/common/lifecycle.js';
import { IMenuService, isIMenuItem, isISubmenuItem, MenuItemAction, MenuItemActionManageActions, MenuRegistry, SubmenuItemAction } from './actions.js';
import { ICommandService } from '../../commands/common/commands.js';
import { IContextKeyService } from '../../contextkey/common/contextkey.js';
import { SubmenuAction } from '../../../base/common/actions.js';
import { IStorageService } from '../../storage/common/storage.js';
import { removeFastWithoutKeepingOrder } from '../../../base/common/arrays.js';
import { localize } from '../../../nls.js';
let MenuService = class MenuService {
    constructor(_commandService, storageService) {
        this._commandService = _commandService;
        this._hiddenStates = new PersistedMenuHideState(storageService);
    }
    createMenu(id, contextKeyService, options) {
        return new Menu(id, this._hiddenStates, Object.assign({ emitEventsForSubmenuChanges: false, eventDebounceDelay: 50 }, options), this._commandService, contextKeyService, this);
    }
};
MenuService = __decorate([
    __param(0, ICommandService),
    __param(1, IStorageService)
], MenuService);
export { MenuService };
let PersistedMenuHideState = class PersistedMenuHideState {
    constructor(_storageService) {
        this._storageService = _storageService;
        this._disposables = new DisposableStore();
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this._ignoreChangeEvent = false;
        try {
            const raw = _storageService.get(PersistedMenuHideState._key, 0 /* StorageScope.PROFILE */, '{}');
            this._data = JSON.parse(raw);
        }
        catch (err) {
            this._data = Object.create(null);
        }
        this._disposables.add(_storageService.onDidChangeValue(e => {
            if (e.key !== PersistedMenuHideState._key) {
                return;
            }
            if (!this._ignoreChangeEvent) {
                try {
                    const raw = _storageService.get(PersistedMenuHideState._key, 0 /* StorageScope.PROFILE */, '{}');
                    this._data = JSON.parse(raw);
                }
                catch (err) {
                    console.log('FAILED to read storage after UPDATE', err);
                }
            }
            this._onDidChange.fire();
        }));
    }
    dispose() {
        this._onDidChange.dispose();
        this._disposables.dispose();
    }
    isHidden(menu, commandId) {
        var _a, _b;
        return (_b = (_a = this._data[menu.id]) === null || _a === void 0 ? void 0 : _a.includes(commandId)) !== null && _b !== void 0 ? _b : false;
    }
    updateHidden(menu, commandId, hidden) {
        const entries = this._data[menu.id];
        if (!hidden) {
            // remove and cleanup
            if (entries) {
                const idx = entries.indexOf(commandId);
                if (idx >= 0) {
                    removeFastWithoutKeepingOrder(entries, idx);
                }
                if (entries.length === 0) {
                    delete this._data[menu.id];
                }
            }
        }
        else {
            // add unless already added
            if (!entries) {
                this._data[menu.id] = [commandId];
            }
            else {
                const idx = entries.indexOf(commandId);
                if (idx < 0) {
                    entries.push(commandId);
                }
            }
        }
        this._persist();
    }
    _persist() {
        try {
            this._ignoreChangeEvent = true;
            const raw = JSON.stringify(this._data);
            this._storageService.store(PersistedMenuHideState._key, raw, 0 /* StorageScope.PROFILE */, 0 /* StorageTarget.USER */);
        }
        finally {
            this._ignoreChangeEvent = false;
        }
    }
};
PersistedMenuHideState._key = 'menu.hiddenCommands';
PersistedMenuHideState = __decorate([
    __param(0, IStorageService)
], PersistedMenuHideState);
let Menu = class Menu {
    constructor(_id, _hiddenStates, _options, _commandService, _contextKeyService, _menuService) {
        this._id = _id;
        this._hiddenStates = _hiddenStates;
        this._options = _options;
        this._commandService = _commandService;
        this._contextKeyService = _contextKeyService;
        this._menuService = _menuService;
        this._disposables = new DisposableStore();
        this._menuGroups = [];
        this._contextKeys = new Set();
        this._build();
        // Rebuild this menu whenever the menu registry reports an event for this MenuId.
        // This usually happen while code and extensions are loaded and affects the over
        // structure of the menu
        const rebuildMenuSoon = new RunOnceScheduler(() => {
            this._build();
            this._onDidChange.fire(this);
        }, _options.eventDebounceDelay);
        this._disposables.add(rebuildMenuSoon);
        this._disposables.add(MenuRegistry.onDidChangeMenu(e => {
            if (e.has(_id)) {
                rebuildMenuSoon.schedule();
            }
        }));
        // When context keys or storage state changes we need to check if the menu also has changed. However,
        // we only do that when someone listens on this menu because (1) these events are
        // firing often and (2) menu are often leaked
        const lazyListener = this._disposables.add(new DisposableStore());
        const startLazyListener = () => {
            const fireChangeSoon = new RunOnceScheduler(() => this._onDidChange.fire(this), _options.eventDebounceDelay);
            lazyListener.add(fireChangeSoon);
            lazyListener.add(_contextKeyService.onDidChangeContext(e => {
                if (e.affectsSome(this._contextKeys)) {
                    fireChangeSoon.schedule();
                }
            }));
            lazyListener.add(_hiddenStates.onDidChange(() => {
                fireChangeSoon.schedule();
            }));
        };
        this._onDidChange = new Emitter({
            // start/stop context key listener
            onFirstListenerAdd: startLazyListener,
            onLastListenerRemove: lazyListener.clear.bind(lazyListener)
        });
        this.onDidChange = this._onDidChange.event;
    }
    dispose() {
        this._disposables.dispose();
        this._onDidChange.dispose();
    }
    _build() {
        // reset
        this._menuGroups.length = 0;
        this._contextKeys.clear();
        const menuItems = MenuRegistry.getMenuItems(this._id);
        let group;
        menuItems.sort(Menu._compareMenuItems);
        for (const item of menuItems) {
            // group by groupId
            const groupName = item.group || '';
            if (!group || group[0] !== groupName) {
                group = [groupName, []];
                this._menuGroups.push(group);
            }
            group[1].push(item);
            // keep keys for eventing
            this._collectContextKeys(item);
        }
    }
    _collectContextKeys(item) {
        Menu._fillInKbExprKeys(item.when, this._contextKeys);
        if (isIMenuItem(item)) {
            // keep precondition keys for event if applicable
            if (item.command.precondition) {
                Menu._fillInKbExprKeys(item.command.precondition, this._contextKeys);
            }
            // keep toggled keys for event if applicable
            if (item.command.toggled) {
                const toggledExpression = item.command.toggled.condition || item.command.toggled;
                Menu._fillInKbExprKeys(toggledExpression, this._contextKeys);
            }
        }
        else if (this._options.emitEventsForSubmenuChanges) {
            // recursively collect context keys from submenus so that this
            // menu fires events when context key changes affect submenus
            MenuRegistry.getMenuItems(item.submenu).forEach(this._collectContextKeys, this);
        }
    }
    getActions(options) {
        const result = [];
        const allToggleActions = [];
        for (const group of this._menuGroups) {
            const [id, items] = group;
            const toggleActions = [];
            const activeActions = [];
            for (const item of items) {
                if (this._contextKeyService.contextMatchesRules(item.when)) {
                    let action;
                    const isMenuItem = isIMenuItem(item);
                    const hideActions = new MenuItemActionManageActions(new HideMenuItemAction(this._id, isMenuItem ? item.command : item, this._hiddenStates), allToggleActions);
                    if (isMenuItem) {
                        if (!this._hiddenStates.isHidden(this._id, item.command.id)) {
                            action = new MenuItemAction(item.command, item.alt, options, hideActions, this._contextKeyService, this._commandService);
                        }
                        // add toggle commmand
                        toggleActions.push(new ToggleMenuItemAction(this._id, item.command, this._hiddenStates));
                    }
                    else {
                        action = new SubmenuItemAction(item, hideActions, this._menuService, this._contextKeyService, options);
                        if (action.actions.length === 0) {
                            action.dispose();
                            action = undefined;
                        }
                        // add toggle submenu - this re-creates ToggleMenuItemAction-instances for submenus but that's OK...
                        if (action) {
                            const makeToggleCommand = (id, action) => {
                                if (action instanceof SubmenuItemAction) {
                                    return new SubmenuAction(action.id, action.label, action.actions.map(a => makeToggleCommand(action.item.submenu, a)));
                                }
                                else if (action instanceof MenuItemAction) {
                                    return new ToggleMenuItemAction(id, action.item, this._hiddenStates);
                                }
                                else {
                                    return action;
                                }
                            };
                            toggleActions.push(makeToggleCommand(this._id, action));
                        }
                    }
                    if (action) {
                        activeActions.push(action);
                    }
                }
            }
            if (activeActions.length > 0) {
                result.push([id, activeActions]);
            }
            if (toggleActions.length > 0) {
                allToggleActions.push(toggleActions);
            }
        }
        return result;
    }
    static _fillInKbExprKeys(exp, set) {
        if (exp) {
            for (const key of exp.keys()) {
                set.add(key);
            }
        }
    }
    static _compareMenuItems(a, b) {
        const aGroup = a.group;
        const bGroup = b.group;
        if (aGroup !== bGroup) {
            // Falsy groups come last
            if (!aGroup) {
                return 1;
            }
            else if (!bGroup) {
                return -1;
            }
            // 'navigation' group comes first
            if (aGroup === 'navigation') {
                return -1;
            }
            else if (bGroup === 'navigation') {
                return 1;
            }
            // lexical sort for groups
            const value = aGroup.localeCompare(bGroup);
            if (value !== 0) {
                return value;
            }
        }
        // sort on priority - default is 0
        const aPrio = a.order || 0;
        const bPrio = b.order || 0;
        if (aPrio < bPrio) {
            return -1;
        }
        else if (aPrio > bPrio) {
            return 1;
        }
        // sort on titles
        return Menu._compareTitles(isIMenuItem(a) ? a.command.title : a.title, isIMenuItem(b) ? b.command.title : b.title);
    }
    static _compareTitles(a, b) {
        const aStr = typeof a === 'string' ? a : a.original;
        const bStr = typeof b === 'string' ? b : b.original;
        return aStr.localeCompare(bStr);
    }
};
Menu = __decorate([
    __param(3, ICommandService),
    __param(4, IContextKeyService),
    __param(5, IMenuService)
], Menu);
class ToggleMenuItemAction {
    constructor(id, command, hiddenStates) {
        this.enabled = true;
        this.tooltip = '';
        this.id = `toggle/${id.id}/${command.id}`;
        this.label = typeof command.title === 'string' ? command.title : command.title.value;
        let isHidden = hiddenStates.isHidden(id, command.id);
        this.checked = !isHidden;
        this.run = () => {
            isHidden = !isHidden;
            hiddenStates.updateHidden(id, command.id, isHidden);
        };
    }
    dispose() {
        // NOTHING
    }
}
class HideMenuItemAction {
    constructor(menu, command, hiddenStates) {
        this.enabled = true;
        this.tooltip = '';
        const id = isISubmenuItem(command) ? command.submenu.id : command.id;
        this.id = `hide/${menu.id}/${id}`;
        this.label = localize('hide.label', 'Hide \'{0}\'', typeof command.title === 'string' ? command.title : command.title.value);
        this.run = () => { hiddenStates.updateHidden(menu, id, true); };
    }
    dispose() {
        // NOTHING
    }
}
