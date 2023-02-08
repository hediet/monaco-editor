/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(fdd81a9401fff5b3842f030d1e86b624c77b5e69)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/scheme/scheme.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "scheme",
  extensions: [".scm", ".ss", ".sch", ".rkt"],
  aliases: ["scheme", "Scheme"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/scheme/scheme"], resolve, reject);
      });
    } else {
      return import("./scheme.js");
    }
  }
});
