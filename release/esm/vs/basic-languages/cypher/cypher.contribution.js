/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(36b123d0441c6c539362d0b1f99ee29923f2ab69)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/cypher/cypher.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "cypher",
  extensions: [".cypher", ".cyp"],
  aliases: ["Cypher", "OpenCypher"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cypher/cypher"], resolve, reject);
      });
    } else {
      return import("./cypher.js");
    }
  }
});
