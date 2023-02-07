/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(8d5c4f0a8825a8151f612fa63d3466c1374ac3c9)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/m3/m3.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "m3",
  extensions: [".m3", ".i3", ".mg", ".ig"],
  aliases: ["Modula-3", "Modula3", "modula3", "m3"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/m3/m3"], resolve, reject);
      });
    } else {
      return import("./m3.js");
    }
  }
});
