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
define(["require", "exports", "./workerManager", "./languageFeatures", "../../fillers/monaco-editor-core", "./workerManager", "./languageFeatures"], function (require, exports, workerManager_1, languageFeatures, monaco_editor_core_1, workerManager_2, languageFeatures_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerManager = exports.getTypeScriptWorker = exports.getJavaScriptWorker = exports.setupJavaScript = exports.setupTypeScript = void 0;
    var javaScriptWorker;
    var typeScriptWorker;
    function setupTypeScript(defaults) {
        typeScriptWorker = setupMode(defaults, 'typescript');
    }
    exports.setupTypeScript = setupTypeScript;
    function setupJavaScript(defaults) {
        javaScriptWorker = setupMode(defaults, 'javascript');
    }
    exports.setupJavaScript = setupJavaScript;
    function getJavaScriptWorker() {
        return new Promise(function (resolve, reject) {
            if (!javaScriptWorker) {
                return reject('JavaScript not registered!');
            }
            resolve(javaScriptWorker);
        });
    }
    exports.getJavaScriptWorker = getJavaScriptWorker;
    function getTypeScriptWorker() {
        return new Promise(function (resolve, reject) {
            if (!typeScriptWorker) {
                return reject('TypeScript not registered!');
            }
            resolve(typeScriptWorker);
        });
    }
    exports.getTypeScriptWorker = getTypeScriptWorker;
    function setupMode(defaults, modeId) {
        var client = new workerManager_1.WorkerManager(modeId, defaults);
        var worker = function () {
            var uris = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                uris[_i] = arguments[_i];
            }
            return client.getLanguageServiceWorker.apply(client, uris);
        };
        var libFiles = new languageFeatures.LibFiles(worker);
        monaco_editor_core_1.languages.registerCompletionItemProvider(modeId, new languageFeatures.SuggestAdapter(worker));
        monaco_editor_core_1.languages.registerSignatureHelpProvider(modeId, new languageFeatures.SignatureHelpAdapter(worker));
        monaco_editor_core_1.languages.registerHoverProvider(modeId, new languageFeatures.QuickInfoAdapter(worker));
        monaco_editor_core_1.languages.registerDocumentHighlightProvider(modeId, new languageFeatures.OccurrencesAdapter(worker));
        monaco_editor_core_1.languages.registerDefinitionProvider(modeId, new languageFeatures.DefinitionAdapter(libFiles, worker));
        monaco_editor_core_1.languages.registerReferenceProvider(modeId, new languageFeatures.ReferenceAdapter(libFiles, worker));
        monaco_editor_core_1.languages.registerDocumentSymbolProvider(modeId, new languageFeatures.OutlineAdapter(worker));
        monaco_editor_core_1.languages.registerDocumentRangeFormattingEditProvider(modeId, new languageFeatures.FormatAdapter(worker));
        monaco_editor_core_1.languages.registerOnTypeFormattingEditProvider(modeId, new languageFeatures.FormatOnTypeAdapter(worker));
        monaco_editor_core_1.languages.registerCodeActionProvider(modeId, new languageFeatures.CodeActionAdaptor(worker));
        monaco_editor_core_1.languages.registerRenameProvider(modeId, new languageFeatures.RenameAdapter(libFiles, worker));
        monaco_editor_core_1.languages.registerInlayHintsProvider(modeId, new languageFeatures.InlayHintsAdapter(worker));
        new languageFeatures.DiagnosticsAdapter(libFiles, defaults, modeId, worker);
        return worker;
    }
    Object.defineProperty(exports, "WorkerManager", { enumerable: true, get: function () { return workerManager_2.WorkerManager; } });
    __exportStar(languageFeatures_1, exports);
});
//# sourceMappingURL=tsMode.js.map