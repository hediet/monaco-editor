"use strict";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(02346abe919cf68493ee56510a23375671d70d09)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/html/monaco.contribution", ["require","vs/editor/editor.api"],(require)=>{
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

  // src/language/html/monaco.contribution.ts
  var monaco_contribution_exports = {};
  __export(monaco_contribution_exports, {
    handlebarDefaults: () => handlebarDefaults,
    handlebarLanguageService: () => handlebarLanguageService,
    htmlDefaults: () => htmlDefaults,
    htmlLanguageService: () => htmlLanguageService,
    razorDefaults: () => razorDefaults,
    razorLanguageService: () => razorLanguageService,
    registerHTMLLanguageService: () => registerHTMLLanguageService
  });

  // src/fillers/monaco-editor-core.ts
  var monaco_editor_core_exports = {};
  __reExport(monaco_editor_core_exports, __toESM(require_monaco_editor_core_amd()));

  // src/language/html/monaco.contribution.ts
  var LanguageServiceDefaultsImpl = class {
    _onDidChange = new monaco_editor_core_exports.Emitter();
    _options;
    _modeConfiguration;
    _languageId;
    constructor(languageId, options, modeConfiguration) {
      this._languageId = languageId;
      this.setOptions(options);
      this.setModeConfiguration(modeConfiguration);
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get languageId() {
      return this._languageId;
    }
    get options() {
      return this._options;
    }
    get modeConfiguration() {
      return this._modeConfiguration;
    }
    setOptions(options) {
      this._options = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
    setModeConfiguration(modeConfiguration) {
      this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
  };
  var formatDefaults = {
    tabSize: 4,
    insertSpaces: false,
    wrapLineLength: 120,
    unformatted: 'default": "a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var',
    contentUnformatted: "pre",
    indentInnerHtml: false,
    preserveNewLines: true,
    maxPreserveNewLines: void 0,
    indentHandlebars: false,
    endWithNewline: false,
    extraLiners: "head, body, /html",
    wrapAttributes: "auto"
  };
  var optionsDefault = {
    format: formatDefaults,
    suggest: {},
    data: { useDefaultDataProvider: true }
  };
  function getConfigurationDefault(languageId) {
    return {
      completionItems: true,
      hovers: true,
      documentSymbols: true,
      links: true,
      documentHighlights: true,
      rename: true,
      colors: true,
      foldingRanges: true,
      selectionRanges: true,
      diagnostics: languageId === htmlLanguageId,
      documentFormattingEdits: languageId === htmlLanguageId,
      documentRangeFormattingEdits: languageId === htmlLanguageId
    };
  }
  var htmlLanguageId = "html";
  var handlebarsLanguageId = "handlebars";
  var razorLanguageId = "razor";
  var htmlLanguageService = registerHTMLLanguageService(htmlLanguageId, optionsDefault, getConfigurationDefault(htmlLanguageId));
  var htmlDefaults = htmlLanguageService.defaults;
  var handlebarLanguageService = registerHTMLLanguageService(handlebarsLanguageId, optionsDefault, getConfigurationDefault(handlebarsLanguageId));
  var handlebarDefaults = handlebarLanguageService.defaults;
  var razorLanguageService = registerHTMLLanguageService(razorLanguageId, optionsDefault, getConfigurationDefault(razorLanguageId));
  var razorDefaults = razorLanguageService.defaults;
  monaco_editor_core_exports.languages.html = {
    htmlDefaults,
    razorDefaults,
    handlebarDefaults,
    htmlLanguageService,
    handlebarLanguageService,
    razorLanguageService,
    registerHTMLLanguageService
  };
  function getMode() {
    if (true) {
      return new Promise((resolve, reject) => {
        __require(["vs/language/html/htmlMode"], resolve, reject);
      });
    } else {
      return null;
    }
  }
  function registerHTMLLanguageService(languageId, options = optionsDefault, modeConfiguration = getConfigurationDefault(languageId)) {
    const defaults = new LanguageServiceDefaultsImpl(languageId, options, modeConfiguration);
    let mode;
    const onLanguageListener = monaco_editor_core_exports.languages.onLanguage(languageId, async () => {
      mode = (await getMode()).setupMode(defaults);
    });
    return {
      defaults,
      dispose() {
        onLanguageListener.dispose();
        mode?.dispose();
        mode = void 0;
      }
    };
  }
  return __toCommonJS(monaco_contribution_exports);
})();
return moduleExports;
});
