/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Lazy } from '../../../../base/common/lazy.js';
import { codeActionCommandId, fixAllCommandId, organizeImportsCommandId, refactorCommandId, sourceActionCommandId } from './codeAction.js';
import { CodeActionCommandArgs, CodeActionKind } from '../common/types.js';
export class CodeActionKeybindingResolver {
    constructor(keybindingService) {
        this.keybindingService = keybindingService;
    }
    getResolver() {
        // Lazy since we may not actually ever read the value
        const allCodeActionBindings = new Lazy(() => this.keybindingService.getKeybindings()
            .filter(item => CodeActionKeybindingResolver.codeActionCommands.indexOf(item.command) >= 0)
            .filter(item => item.resolvedKeybinding)
            .map((item) => {
            // Special case these commands since they come built-in with VS Code and don't use 'commandArgs'
            let commandArgs = item.commandArgs;
            if (item.command === organizeImportsCommandId) {
                commandArgs = { kind: CodeActionKind.SourceOrganizeImports.value };
            }
            else if (item.command === fixAllCommandId) {
                commandArgs = { kind: CodeActionKind.SourceFixAll.value };
            }
            return Object.assign({ resolvedKeybinding: item.resolvedKeybinding }, CodeActionCommandArgs.fromUser(commandArgs, {
                kind: CodeActionKind.None,
                apply: "never" /* CodeActionAutoApply.Never */
            }));
        }));
        return (action) => {
            if (action.kind) {
                const binding = this.bestKeybindingForCodeAction(action, allCodeActionBindings.getValue());
                return binding === null || binding === void 0 ? void 0 : binding.resolvedKeybinding;
            }
            return undefined;
        };
    }
    bestKeybindingForCodeAction(action, candidates) {
        if (!action.kind) {
            return undefined;
        }
        const kind = new CodeActionKind(action.kind);
        return candidates
            .filter(candidate => candidate.kind.contains(kind))
            .filter(candidate => {
            if (candidate.preferred) {
                // If the candidate keybinding only applies to preferred actions, the this action must also be preferred
                return action.isPreferred;
            }
            return true;
        })
            .reduceRight((currentBest, candidate) => {
            if (!currentBest) {
                return candidate;
            }
            // Select the more specific binding
            return currentBest.kind.contains(candidate.kind) ? candidate : currentBest;
        }, undefined);
    }
}
CodeActionKeybindingResolver.codeActionCommands = [
    refactorCommandId,
    codeActionCommandId,
    sourceActionCommandId,
    organizeImportsCommandId,
    fixAllCommandId
];
