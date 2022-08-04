/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(02346abe919cf68493ee56510a23375671d70d09)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/st/st.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "st",
  extensions: [".st", ".iecst", ".iecplc", ".lc3lib"],
  aliases: ["StructuredText", "scl", "stl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/st/st"], resolve, reject);
      });
    } else {
      return import("./st.js");
    }
  }
});
