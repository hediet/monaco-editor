/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4905f3a86a1a33bff56fac397b489816f8b4ae46)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/restructuredtext/restructuredtext.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "restructuredtext",
  extensions: [".rst"],
  aliases: ["reStructuredText", "restructuredtext"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/restructuredtext/restructuredtext"], resolve, reject);
      });
    } else {
      return import("./restructuredtext.js");
    }
  }
});
