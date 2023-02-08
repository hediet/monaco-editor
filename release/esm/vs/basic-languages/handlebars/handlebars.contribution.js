/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(fdd81a9401fff5b3842f030d1e86b624c77b5e69)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/handlebars/handlebars.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "handlebars",
  extensions: [".handlebars", ".hbs"],
  aliases: ["Handlebars", "handlebars", "hbs"],
  mimetypes: ["text/x-handlebars-template"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/handlebars/handlebars"], resolve, reject);
      });
    } else {
      return import("./handlebars.js");
    }
  }
});
