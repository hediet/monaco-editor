/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./workerManager", "../common/lspLanguageFeatures", "../../fillers/monaco-editor-core", "./workerManager", "../common/lspLanguageFeatures"], function (require, exports, workerManager_1, languageFeatures, monaco_editor_core_1, workerManager_2, lspLanguageFeatures_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerManager = exports.setupMode = void 0;
    function setupMode(defaults) {
        var disposables = [];
        var providers = [];
        var client = new workerManager_1.WorkerManager(defaults);
        disposables.push(client);
        var worker = function () {
            var uris = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                uris[_i] = arguments[_i];
            }
            return client.getLanguageServiceWorker.apply(client, uris);
        };
        function registerProviders() {
            var languageId = defaults.languageId, modeConfiguration = defaults.modeConfiguration;
            disposeAll(providers);
            if (modeConfiguration.completionItems) {
                providers.push(monaco_editor_core_1.languages.registerCompletionItemProvider(languageId, new languageFeatures.CompletionAdapter(worker, ['/', '-', ':'])));
            }
            if (modeConfiguration.hovers) {
                providers.push(monaco_editor_core_1.languages.registerHoverProvider(languageId, new languageFeatures.HoverAdapter(worker)));
            }
            if (modeConfiguration.documentHighlights) {
                providers.push(monaco_editor_core_1.languages.registerDocumentHighlightProvider(languageId, new languageFeatures.DocumentHighlightAdapter(worker)));
            }
            if (modeConfiguration.definitions) {
                providers.push(monaco_editor_core_1.languages.registerDefinitionProvider(languageId, new languageFeatures.DefinitionAdapter(worker)));
            }
            if (modeConfiguration.references) {
                providers.push(monaco_editor_core_1.languages.registerReferenceProvider(languageId, new languageFeatures.ReferenceAdapter(worker)));
            }
            if (modeConfiguration.documentSymbols) {
                providers.push(monaco_editor_core_1.languages.registerDocumentSymbolProvider(languageId, new languageFeatures.DocumentSymbolAdapter(worker)));
            }
            if (modeConfiguration.rename) {
                providers.push(monaco_editor_core_1.languages.registerRenameProvider(languageId, new languageFeatures.RenameAdapter(worker)));
            }
            if (modeConfiguration.colors) {
                providers.push(monaco_editor_core_1.languages.registerColorProvider(languageId, new languageFeatures.DocumentColorAdapter(worker)));
            }
            if (modeConfiguration.foldingRanges) {
                providers.push(monaco_editor_core_1.languages.registerFoldingRangeProvider(languageId, new languageFeatures.FoldingRangeAdapter(worker)));
            }
            if (modeConfiguration.diagnostics) {
                providers.push(new languageFeatures.DiagnosticsAdapter(languageId, worker, defaults.onDidChange));
            }
            if (modeConfiguration.selectionRanges) {
                providers.push(monaco_editor_core_1.languages.registerSelectionRangeProvider(languageId, new languageFeatures.SelectionRangeAdapter(worker)));
            }
            if (modeConfiguration.documentFormattingEdits) {
                providers.push(monaco_editor_core_1.languages.registerDocumentFormattingEditProvider(languageId, new languageFeatures.DocumentFormattingEditProvider(worker)));
            }
            if (modeConfiguration.documentRangeFormattingEdits) {
                providers.push(monaco_editor_core_1.languages.registerDocumentRangeFormattingEditProvider(languageId, new languageFeatures.DocumentRangeFormattingEditProvider(worker)));
            }
        }
        registerProviders();
        disposables.push(asDisposable(providers));
        return asDisposable(disposables);
    }
    exports.setupMode = setupMode;
    function asDisposable(disposables) {
        return { dispose: function () { return disposeAll(disposables); } };
    }
    function disposeAll(disposables) {
        while (disposables.length) {
            disposables.pop().dispose();
        }
    }
    Object.defineProperty(exports, "WorkerManager", { enumerable: true, get: function () { return workerManager_2.WorkerManager; } });
    __exportStar(lspLanguageFeatures_1, exports);
});
//# sourceMappingURL=cssMode.js.map