"use strict";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(2a90206df3b5f5792a3a9fdd2796482b3eaf7969)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/json/monaco.contribution", ["require","vs/editor/editor.api"],(require)=>{
var moduleExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/fillers/monaco-editor-core-amd.ts
  var require_monaco_editor_core_amd = __commonJS({
    "src/fillers/monaco-editor-core-amd.ts"(exports, module) {
      var api = __toESM(__require("vs/editor/editor.api"));
      module.exports = api;
    }
  });

  // src/language/json/monaco.contribution.ts
  var monaco_contribution_exports = {};
  __export(monaco_contribution_exports, {
    jsonDefaults: () => jsonDefaults
  });

  // src/fillers/monaco-editor-core.ts
  var monaco_editor_core_exports = {};
  __reExport(monaco_editor_core_exports, __toESM(require_monaco_editor_core_amd()));

  // src/language/json/monaco.contribution.ts
  var LanguageServiceDefaultsImpl = class {
    _onDidChange = new monaco_editor_core_exports.Emitter();
    _diagnosticsOptions;
    _modeConfiguration;
    _languageId;
    constructor(languageId, diagnosticsOptions, modeConfiguration) {
      this._languageId = languageId;
      this.setDiagnosticsOptions(diagnosticsOptions);
      this.setModeConfiguration(modeConfiguration);
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get languageId() {
      return this._languageId;
    }
    get modeConfiguration() {
      return this._modeConfiguration;
    }
    get diagnosticsOptions() {
      return this._diagnosticsOptions;
    }
    setDiagnosticsOptions(options) {
      this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
    setModeConfiguration(modeConfiguration) {
      this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
  };
  var diagnosticDefault = {
    validate: true,
    allowComments: true,
    schemas: [],
    enableSchemaRequest: false,
    schemaRequest: "warning",
    schemaValidation: "warning",
    comments: "error",
    trailingCommas: "error"
  };
  var modeConfigurationDefault = {
    documentFormattingEdits: true,
    documentRangeFormattingEdits: true,
    completionItems: true,
    hovers: true,
    documentSymbols: true,
    tokens: true,
    colors: true,
    foldingRanges: true,
    diagnostics: true,
    selectionRanges: true
  };
  var jsonDefaults = new LanguageServiceDefaultsImpl("json", diagnosticDefault, modeConfigurationDefault);
  monaco_editor_core_exports.languages.json = { jsonDefaults };
  function getMode() {
    if (true) {
      return new Promise((resolve, reject) => {
        __require(["vs/language/json/jsonMode"], resolve, reject);
      });
    } else {
      return null;
    }
  }
  monaco_editor_core_exports.languages.register({
    id: "json",
    extensions: [".json", ".bowerrc", ".jshintrc", ".jscsrc", ".eslintrc", ".babelrc", ".har"],
    aliases: ["JSON", "json"],
    mimetypes: ["application/json"]
  });
  monaco_editor_core_exports.languages.onLanguage("json", () => {
    getMode().then((mode) => mode.setupMode(jsonDefaults));
  });
  return __toCommonJS(monaco_contribution_exports);
})();
return moduleExports;
});
