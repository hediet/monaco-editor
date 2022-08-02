"use strict";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(8143918f249162979e81ac54ead0a95700853745)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/monaco.contribution", ["require","vs/editor/editor.api"],(require)=>{
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

  // src/fillers/monaco-editor-core-amd.ts
  var require_monaco_editor_core_amd = __commonJS({
    "src/fillers/monaco-editor-core-amd.ts"(exports, module) {
      var api = __toESM(__require("vs/editor/editor.api"));
      module.exports = api;
    }
  });

  // src/fillers/monaco-editor-core.ts
  var monaco_editor_core_exports = {};
  __reExport(monaco_editor_core_exports, __toESM(require_monaco_editor_core_amd()));

  // src/basic-languages/_.contribution.ts
  var languageDefinitions = {};
  var lazyLanguageLoaders = {};
  var LazyLanguageLoader = class {
    static getOrCreate(languageId) {
      if (!lazyLanguageLoaders[languageId]) {
        lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
      }
      return lazyLanguageLoaders[languageId];
    }
    _languageId;
    _loadingTriggered;
    _lazyLoadPromise;
    _lazyLoadPromiseResolve;
    _lazyLoadPromiseReject;
    constructor(languageId) {
      this._languageId = languageId;
      this._loadingTriggered = false;
      this._lazyLoadPromise = new Promise((resolve, reject) => {
        this._lazyLoadPromiseResolve = resolve;
        this._lazyLoadPromiseReject = reject;
      });
    }
    load() {
      if (!this._loadingTriggered) {
        this._loadingTriggered = true;
        languageDefinitions[this._languageId].loader().then((mod) => this._lazyLoadPromiseResolve(mod), (err) => this._lazyLoadPromiseReject(err));
      }
      return this._lazyLoadPromise;
    }
  };
  function registerLanguage(def) {
    const languageId = def.id;
    languageDefinitions[languageId] = def;
    monaco_editor_core_exports.languages.register(def);
    const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
    monaco_editor_core_exports.languages.registerTokensProviderFactory(languageId, {
      create: async () => {
        const mod = await lazyLanguageLoader.load();
        return mod.language;
      }
    });
    monaco_editor_core_exports.languages.onLanguage(languageId, async () => {
      const mod = await lazyLanguageLoader.load();
      monaco_editor_core_exports.languages.setLanguageConfiguration(languageId, mod.conf);
    });
  }

  // src/basic-languages/abap/abap.contribution.ts
  registerLanguage({
    id: "abap",
    extensions: [".abap"],
    aliases: ["abap", "ABAP"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/abap/abap"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/apex/apex.contribution.ts
  registerLanguage({
    id: "apex",
    extensions: [".cls"],
    aliases: ["Apex", "apex"],
    mimetypes: ["text/x-apex-source", "text/x-apex"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/apex/apex"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/azcli/azcli.contribution.ts
  registerLanguage({
    id: "azcli",
    extensions: [".azcli"],
    aliases: ["Azure CLI", "azcli"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/azcli/azcli"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/bat/bat.contribution.ts
  registerLanguage({
    id: "bat",
    extensions: [".bat", ".cmd"],
    aliases: ["Batch", "bat"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/bat/bat"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/bicep/bicep.contribution.ts
  registerLanguage({
    id: "bicep",
    extensions: [".bicep"],
    aliases: ["Bicep"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/bicep/bicep"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/cameligo/cameligo.contribution.ts
  registerLanguage({
    id: "cameligo",
    extensions: [".mligo"],
    aliases: ["Cameligo"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/cameligo/cameligo"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/clojure/clojure.contribution.ts
  registerLanguage({
    id: "clojure",
    extensions: [".clj", ".cljs", ".cljc", ".edn"],
    aliases: ["clojure", "Clojure"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/clojure/clojure"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/coffee/coffee.contribution.ts
  registerLanguage({
    id: "coffeescript",
    extensions: [".coffee"],
    aliases: ["CoffeeScript", "coffeescript", "coffee"],
    mimetypes: ["text/x-coffeescript", "text/coffeescript"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/coffee/coffee"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/cpp/cpp.contribution.ts
  registerLanguage({
    id: "c",
    extensions: [".c", ".h"],
    aliases: ["C", "c"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/cpp/cpp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });
  registerLanguage({
    id: "cpp",
    extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx"],
    aliases: ["C++", "Cpp", "cpp"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/cpp/cpp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/csharp/csharp.contribution.ts
  registerLanguage({
    id: "csharp",
    extensions: [".cs", ".csx", ".cake"],
    aliases: ["C#", "csharp"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/csharp/csharp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/csp/csp.contribution.ts
  registerLanguage({
    id: "csp",
    extensions: [],
    aliases: ["CSP", "csp"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/csp/csp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/css/css.contribution.ts
  registerLanguage({
    id: "css",
    extensions: [".css"],
    aliases: ["CSS", "css"],
    mimetypes: ["text/css"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/css/css"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/cypher/cypher.contribution.ts
  registerLanguage({
    id: "cypher",
    extensions: [".cypher", ".cyp"],
    aliases: ["Cypher", "OpenCypher"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/cypher/cypher"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/dart/dart.contribution.ts
  registerLanguage({
    id: "dart",
    extensions: [".dart"],
    aliases: ["Dart", "dart"],
    mimetypes: ["text/x-dart-source", "text/x-dart"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/dart/dart"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/dockerfile/dockerfile.contribution.ts
  registerLanguage({
    id: "dockerfile",
    extensions: [".dockerfile"],
    filenames: ["Dockerfile"],
    aliases: ["Dockerfile"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/dockerfile/dockerfile"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/ecl/ecl.contribution.ts
  registerLanguage({
    id: "ecl",
    extensions: [".ecl"],
    aliases: ["ECL", "Ecl", "ecl"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/ecl/ecl"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/elixir/elixir.contribution.ts
  registerLanguage({
    id: "elixir",
    extensions: [".ex", ".exs"],
    aliases: ["Elixir", "elixir", "ex"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/elixir/elixir"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/flow9/flow9.contribution.ts
  registerLanguage({
    id: "flow9",
    extensions: [".flow"],
    aliases: ["Flow9", "Flow", "flow9", "flow"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/flow9/flow9"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/fsharp/fsharp.contribution.ts
  registerLanguage({
    id: "fsharp",
    extensions: [".fs", ".fsi", ".ml", ".mli", ".fsx", ".fsscript"],
    aliases: ["F#", "FSharp", "fsharp"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/fsharp/fsharp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/freemarker2/freemarker2.contribution.ts
  registerLanguage({
    id: "freemarker2",
    extensions: [".ftl", ".ftlh", ".ftlx"],
    aliases: ["FreeMarker2", "Apache FreeMarker2"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagAngleInterpolationDollar);
      } else {
        return null.then((m) => m.TagAutoInterpolationDollar);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-angle.interpolation-dollar",
    aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagAngleInterpolationDollar);
      } else {
        return null.then((m) => m.TagAngleInterpolationDollar);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-bracket.interpolation-dollar",
    aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagBracketInterpolationDollar);
      } else {
        return null.then((m) => m.TagBracketInterpolationDollar);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-angle.interpolation-bracket",
    aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagAngleInterpolationBracket);
      } else {
        return null.then((m) => m.TagAngleInterpolationBracket);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-bracket.interpolation-bracket",
    aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagBracketInterpolationBracket);
      } else {
        return null.then((m) => m.TagBracketInterpolationBracket);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-auto.interpolation-dollar",
    aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagAutoInterpolationDollar);
      } else {
        return null.then((m) => m.TagAutoInterpolationDollar);
      }
    }
  });
  registerLanguage({
    id: "freemarker2.tag-auto.interpolation-bracket",
    aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
        }).then((m) => m.TagAutoInterpolationBracket);
      } else {
        return null.then((m) => m.TagAutoInterpolationBracket);
      }
    }
  });

  // src/basic-languages/go/go.contribution.ts
  registerLanguage({
    id: "go",
    extensions: [".go"],
    aliases: ["Go"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/go/go"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/graphql/graphql.contribution.ts
  registerLanguage({
    id: "graphql",
    extensions: [".graphql", ".gql"],
    aliases: ["GraphQL", "graphql", "gql"],
    mimetypes: ["application/graphql"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/graphql/graphql"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/handlebars/handlebars.contribution.ts
  registerLanguage({
    id: "handlebars",
    extensions: [".handlebars", ".hbs"],
    aliases: ["Handlebars", "handlebars", "hbs"],
    mimetypes: ["text/x-handlebars-template"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/handlebars/handlebars"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/hcl/hcl.contribution.ts
  registerLanguage({
    id: "hcl",
    extensions: [".tf", ".tfvars", ".hcl"],
    aliases: ["Terraform", "tf", "HCL", "hcl"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/hcl/hcl"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/html/html.contribution.ts
  registerLanguage({
    id: "html",
    extensions: [".html", ".htm", ".shtml", ".xhtml", ".mdoc", ".jsp", ".asp", ".aspx", ".jshtm"],
    aliases: ["HTML", "htm", "html", "xhtml"],
    mimetypes: ["text/html", "text/x-jshtm", "text/template", "text/ng-template"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/html/html"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/ini/ini.contribution.ts
  registerLanguage({
    id: "ini",
    extensions: [".ini", ".properties", ".gitconfig"],
    filenames: ["config", ".gitattributes", ".gitconfig", ".editorconfig"],
    aliases: ["Ini", "ini"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/ini/ini"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/java/java.contribution.ts
  registerLanguage({
    id: "java",
    extensions: [".java", ".jav"],
    aliases: ["Java", "java"],
    mimetypes: ["text/x-java-source", "text/x-java"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/java/java"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/javascript/javascript.contribution.ts
  registerLanguage({
    id: "javascript",
    extensions: [".js", ".es6", ".jsx", ".mjs", ".cjs"],
    firstLine: "^#!.*\\bnode",
    filenames: ["jakefile"],
    aliases: ["JavaScript", "javascript", "js"],
    mimetypes: ["text/javascript"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/javascript/javascript"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/julia/julia.contribution.ts
  registerLanguage({
    id: "julia",
    extensions: [".jl"],
    aliases: ["julia", "Julia"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/julia/julia"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/kotlin/kotlin.contribution.ts
  registerLanguage({
    id: "kotlin",
    extensions: [".kt"],
    aliases: ["Kotlin", "kotlin"],
    mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/kotlin/kotlin"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/less/less.contribution.ts
  registerLanguage({
    id: "less",
    extensions: [".less"],
    aliases: ["Less", "less"],
    mimetypes: ["text/x-less", "text/less"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/less/less"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/lexon/lexon.contribution.ts
  registerLanguage({
    id: "lexon",
    extensions: [".lex"],
    aliases: ["Lexon"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/lexon/lexon"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/lua/lua.contribution.ts
  registerLanguage({
    id: "lua",
    extensions: [".lua"],
    aliases: ["Lua", "lua"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/lua/lua"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/liquid/liquid.contribution.ts
  registerLanguage({
    id: "liquid",
    extensions: [".liquid", ".html.liquid"],
    aliases: ["Liquid", "liquid"],
    mimetypes: ["application/liquid"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/liquid/liquid"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/m3/m3.contribution.ts
  registerLanguage({
    id: "m3",
    extensions: [".m3", ".i3", ".mg", ".ig"],
    aliases: ["Modula-3", "Modula3", "modula3", "m3"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/m3/m3"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/markdown/markdown.contribution.ts
  registerLanguage({
    id: "markdown",
    extensions: [".md", ".markdown", ".mdown", ".mkdn", ".mkd", ".mdwn", ".mdtxt", ".mdtext"],
    aliases: ["Markdown", "markdown"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/markdown/markdown"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/mips/mips.contribution.ts
  registerLanguage({
    id: "mips",
    extensions: [".s"],
    aliases: ["MIPS", "MIPS-V"],
    mimetypes: ["text/x-mips", "text/mips", "text/plaintext"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/mips/mips"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/msdax/msdax.contribution.ts
  registerLanguage({
    id: "msdax",
    extensions: [".dax", ".msdax"],
    aliases: ["DAX", "MSDAX"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/msdax/msdax"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/mysql/mysql.contribution.ts
  registerLanguage({
    id: "mysql",
    extensions: [],
    aliases: ["MySQL", "mysql"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/mysql/mysql"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/objective-c/objective-c.contribution.ts
  registerLanguage({
    id: "objective-c",
    extensions: [".m"],
    aliases: ["Objective-C"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/objective-c/objective-c"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/pascal/pascal.contribution.ts
  registerLanguage({
    id: "pascal",
    extensions: [".pas", ".p", ".pp"],
    aliases: ["Pascal", "pas"],
    mimetypes: ["text/x-pascal-source", "text/x-pascal"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/pascal/pascal"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/pascaligo/pascaligo.contribution.ts
  registerLanguage({
    id: "pascaligo",
    extensions: [".ligo"],
    aliases: ["Pascaligo", "ligo"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/pascaligo/pascaligo"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/perl/perl.contribution.ts
  registerLanguage({
    id: "perl",
    extensions: [".pl"],
    aliases: ["Perl", "pl"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/perl/perl"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/pgsql/pgsql.contribution.ts
  registerLanguage({
    id: "pgsql",
    extensions: [],
    aliases: ["PostgreSQL", "postgres", "pg", "postgre"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/pgsql/pgsql"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/php/php.contribution.ts
  registerLanguage({
    id: "php",
    extensions: [".php", ".php4", ".php5", ".phtml", ".ctp"],
    aliases: ["PHP", "php"],
    mimetypes: ["application/x-php"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/php/php"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/pla/pla.contribution.ts
  registerLanguage({
    id: "pla",
    extensions: [".pla"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/pla/pla"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/postiats/postiats.contribution.ts
  registerLanguage({
    id: "postiats",
    extensions: [".dats", ".sats", ".hats"],
    aliases: ["ATS", "ATS/Postiats"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/postiats/postiats"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/powerquery/powerquery.contribution.ts
  registerLanguage({
    id: "powerquery",
    extensions: [".pq", ".pqm"],
    aliases: ["PQ", "M", "Power Query", "Power Query M"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/powerquery/powerquery"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/powershell/powershell.contribution.ts
  registerLanguage({
    id: "powershell",
    extensions: [".ps1", ".psm1", ".psd1"],
    aliases: ["PowerShell", "powershell", "ps", "ps1"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/powershell/powershell"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/protobuf/protobuf.contribution.ts
  registerLanguage({
    id: "proto",
    extensions: [".proto"],
    aliases: ["protobuf", "Protocol Buffers"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/protobuf/protobuf"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/pug/pug.contribution.ts
  registerLanguage({
    id: "pug",
    extensions: [".jade", ".pug"],
    aliases: ["Pug", "Jade", "jade"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/pug/pug"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/python/python.contribution.ts
  registerLanguage({
    id: "python",
    extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
    aliases: ["Python", "py"],
    firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/python/python"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/qsharp/qsharp.contribution.ts
  registerLanguage({
    id: "qsharp",
    extensions: [".qs"],
    aliases: ["Q#", "qsharp"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/qsharp/qsharp"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/r/r.contribution.ts
  registerLanguage({
    id: "r",
    extensions: [".r", ".rhistory", ".rmd", ".rprofile", ".rt"],
    aliases: ["R", "r"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/r/r"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/razor/razor.contribution.ts
  registerLanguage({
    id: "razor",
    extensions: [".cshtml"],
    aliases: ["Razor", "razor"],
    mimetypes: ["text/x-cshtml"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/razor/razor"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/redis/redis.contribution.ts
  registerLanguage({
    id: "redis",
    extensions: [".redis"],
    aliases: ["redis"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/redis/redis"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/redshift/redshift.contribution.ts
  registerLanguage({
    id: "redshift",
    extensions: [],
    aliases: ["Redshift", "redshift"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/redshift/redshift"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/restructuredtext/restructuredtext.contribution.ts
  registerLanguage({
    id: "restructuredtext",
    extensions: [".rst"],
    aliases: ["reStructuredText", "restructuredtext"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/restructuredtext/restructuredtext"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/ruby/ruby.contribution.ts
  registerLanguage({
    id: "ruby",
    extensions: [".rb", ".rbx", ".rjs", ".gemspec", ".pp"],
    filenames: ["rakefile", "Gemfile"],
    aliases: ["Ruby", "rb"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/ruby/ruby"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/rust/rust.contribution.ts
  registerLanguage({
    id: "rust",
    extensions: [".rs", ".rlib"],
    aliases: ["Rust", "rust"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/rust/rust"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/sb/sb.contribution.ts
  registerLanguage({
    id: "sb",
    extensions: [".sb"],
    aliases: ["Small Basic", "sb"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/sb/sb"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/scala/scala.contribution.ts
  registerLanguage({
    id: "scala",
    extensions: [".scala", ".sc", ".sbt"],
    aliases: ["Scala", "scala", "SBT", "Sbt", "sbt", "Dotty", "dotty"],
    mimetypes: ["text/x-scala-source", "text/x-scala", "text/x-sbt", "text/x-dotty"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/scala/scala"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/scheme/scheme.contribution.ts
  registerLanguage({
    id: "scheme",
    extensions: [".scm", ".ss", ".sch", ".rkt"],
    aliases: ["scheme", "Scheme"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/scheme/scheme"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/scss/scss.contribution.ts
  registerLanguage({
    id: "scss",
    extensions: [".scss"],
    aliases: ["Sass", "sass", "scss"],
    mimetypes: ["text/x-scss", "text/scss"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/scss/scss"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/shell/shell.contribution.ts
  registerLanguage({
    id: "shell",
    extensions: [".sh", ".bash"],
    aliases: ["Shell", "sh"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/shell/shell"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/solidity/solidity.contribution.ts
  registerLanguage({
    id: "sol",
    extensions: [".sol"],
    aliases: ["sol", "solidity", "Solidity"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/solidity/solidity"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/sophia/sophia.contribution.ts
  registerLanguage({
    id: "aes",
    extensions: [".aes"],
    aliases: ["aes", "sophia", "Sophia"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/sophia/sophia"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/sparql/sparql.contribution.ts
  registerLanguage({
    id: "sparql",
    extensions: [".rq"],
    aliases: ["sparql", "SPARQL"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/sparql/sparql"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/sql/sql.contribution.ts
  registerLanguage({
    id: "sql",
    extensions: [".sql"],
    aliases: ["SQL"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/sql/sql"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/st/st.contribution.ts
  registerLanguage({
    id: "st",
    extensions: [".st", ".iecst", ".iecplc", ".lc3lib"],
    aliases: ["StructuredText", "scl", "stl"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/st/st"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/swift/swift.contribution.ts
  registerLanguage({
    id: "swift",
    aliases: ["Swift", "swift"],
    extensions: [".swift"],
    mimetypes: ["text/swift"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/swift/swift"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/systemverilog/systemverilog.contribution.ts
  registerLanguage({
    id: "systemverilog",
    extensions: [".sv", ".svh"],
    aliases: ["SV", "sv", "SystemVerilog", "systemverilog"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/systemverilog/systemverilog"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });
  registerLanguage({
    id: "verilog",
    extensions: [".v", ".vh"],
    aliases: ["V", "v", "Verilog", "verilog"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/systemverilog/systemverilog"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/tcl/tcl.contribution.ts
  registerLanguage({
    id: "tcl",
    extensions: [".tcl"],
    aliases: ["tcl", "Tcl", "tcltk", "TclTk", "tcl/tk", "Tcl/Tk"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/tcl/tcl"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/twig/twig.contribution.ts
  registerLanguage({
    id: "twig",
    extensions: [".twig"],
    aliases: ["Twig", "twig"],
    mimetypes: ["text/x-twig"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/twig/twig"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/typescript/typescript.contribution.ts
  registerLanguage({
    id: "typescript",
    extensions: [".ts", ".tsx"],
    aliases: ["TypeScript", "ts", "typescript"],
    mimetypes: ["text/typescript"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/typescript/typescript"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/vb/vb.contribution.ts
  registerLanguage({
    id: "vb",
    extensions: [".vb"],
    aliases: ["Visual Basic", "vb"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/vb/vb"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/xml/xml.contribution.ts
  registerLanguage({
    id: "xml",
    extensions: [
      ".xml",
      ".dtd",
      ".ascx",
      ".csproj",
      ".config",
      ".wxi",
      ".wxl",
      ".wxs",
      ".xaml",
      ".svg",
      ".svgz",
      ".opf",
      ".xsl"
    ],
    firstLine: "(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)",
    aliases: ["XML", "xml"],
    mimetypes: ["text/xml", "application/xml", "application/xaml+xml", "application/xml-dtd"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/xml/xml"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });

  // src/basic-languages/yaml/yaml.contribution.ts
  registerLanguage({
    id: "yaml",
    extensions: [".yaml", ".yml"],
    aliases: ["YAML", "yaml", "YML", "yml"],
    mimetypes: ["application/x-yaml", "text/x-yaml"],
    loader: () => {
      if (true) {
        return new Promise((resolve, reject) => {
          __require(["vs/basic-languages/yaml/yaml"], resolve, reject);
        });
      } else {
        return null;
      }
    }
  });
})();
return moduleExports;
});
