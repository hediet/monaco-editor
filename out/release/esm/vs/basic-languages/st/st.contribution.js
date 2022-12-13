/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(2a90206df3b5f5792a3a9fdd2796482b3eaf7969)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/st/st.contribution.ts
import { registerLanguage } from "../_.contribution";
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
      return import("./st");
    }
  }
});
