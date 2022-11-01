/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../../fillers/monaco-editor-core"], function (require, exports, monaco_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lessDefaults = exports.scssDefaults = exports.cssDefaults = void 0;
    // --- CSS configuration and defaults ---------
    var LanguageServiceDefaultsImpl = /** @class */ (function () {
        function LanguageServiceDefaultsImpl(languageId, options, modeConfiguration) {
            this._onDidChange = new monaco_editor_core_1.Emitter();
            this._languageId = languageId;
            this.setOptions(options);
            this.setModeConfiguration(modeConfiguration);
        }
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "onDidChange", {
            get: function () {
                return this._onDidChange.event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "languageId", {
            get: function () {
                return this._languageId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "modeConfiguration", {
            get: function () {
                return this._modeConfiguration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "diagnosticsOptions", {
            get: function () {
                return this.options;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        LanguageServiceDefaultsImpl.prototype.setOptions = function (options) {
            this._options = options || Object.create(null);
            this._onDidChange.fire(this);
        };
        LanguageServiceDefaultsImpl.prototype.setDiagnosticsOptions = function (options) {
            this.setOptions(options);
        };
        LanguageServiceDefaultsImpl.prototype.setModeConfiguration = function (modeConfiguration) {
            this._modeConfiguration = modeConfiguration || Object.create(null);
            this._onDidChange.fire(this);
        };
        return LanguageServiceDefaultsImpl;
    }());
    var optionsDefault = {
        validate: true,
        lint: {
            compatibleVendorPrefixes: 'ignore',
            vendorPrefix: 'warning',
            duplicateProperties: 'warning',
            emptyRules: 'warning',
            importStatement: 'ignore',
            boxModel: 'ignore',
            universalSelector: 'ignore',
            zeroUnits: 'ignore',
            fontFaceProperties: 'warning',
            hexColorLength: 'error',
            argumentsInColorFunction: 'error',
            unknownProperties: 'warning',
            ieHack: 'ignore',
            unknownVendorSpecificProperties: 'ignore',
            propertyIgnoredDueToDisplay: 'warning',
            important: 'ignore',
            float: 'ignore',
            idSelector: 'ignore'
        },
        data: { useDefaultDataProvider: true },
        format: {
            newlineBetweenSelectors: true,
            newlineBetweenRules: true,
            spaceAroundSelectorSeparator: false,
            braceStyle: 'collapse',
            maxPreserveNewLines: undefined,
            preserveNewLines: true
        }
    };
    var modeConfigurationDefault = {
        completionItems: true,
        hovers: true,
        documentSymbols: true,
        definitions: true,
        references: true,
        documentHighlights: true,
        rename: true,
        colors: true,
        foldingRanges: true,
        diagnostics: true,
        selectionRanges: true,
        documentFormattingEdits: true,
        documentRangeFormattingEdits: true
    };
    exports.cssDefaults = new LanguageServiceDefaultsImpl('css', optionsDefault, modeConfigurationDefault);
    exports.scssDefaults = new LanguageServiceDefaultsImpl('scss', optionsDefault, modeConfigurationDefault);
    exports.lessDefaults = new LanguageServiceDefaultsImpl('less', optionsDefault, modeConfigurationDefault);
    // export to the global based API
    monaco_editor_core_1.languages.css = { cssDefaults: exports.cssDefaults, lessDefaults: exports.lessDefaults, scssDefaults: exports.scssDefaults };
    function getMode() {
        if (AMD) {
            return new Promise(function (resolve, reject) {
                require(['vs/language/css/cssMode'], resolve, reject);
            });
        }
        else {
            return new Promise(function (resolve_1, reject_1) { require(['./cssMode'], resolve_1, reject_1); });
        }
    }
    monaco_editor_core_1.languages.onLanguage('less', function () {
        getMode().then(function (mode) { return mode.setupMode(exports.lessDefaults); });
    });
    monaco_editor_core_1.languages.onLanguage('scss', function () {
        getMode().then(function (mode) { return mode.setupMode(exports.scssDefaults); });
    });
    monaco_editor_core_1.languages.onLanguage('css', function () {
        getMode().then(function (mode) { return mode.setupMode(exports.cssDefaults); });
    });
});
//# sourceMappingURL=monaco.contribution.js.map