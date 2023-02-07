/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(8d5c4f0a8825a8151f612fa63d3466c1374ac3c9)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/python/python.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "python",
  extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
  aliases: ["Python", "py"],
  firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/python/python"], resolve, reject);
      });
    } else {
      return import("./python.js");
    }
  }
});
