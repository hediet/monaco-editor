/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(2a90206df3b5f5792a3a9fdd2796482b3eaf7969)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/typescript/typescript.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "typescript",
  extensions: [".ts", ".tsx"],
  aliases: ["TypeScript", "ts", "typescript"],
  mimetypes: ["text/typescript"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/typescript/typescript"], resolve, reject);
      });
    } else {
      return import("./typescript.js");
    }
  }
});
