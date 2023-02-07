/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(8d5c4f0a8825a8151f612fa63d3466c1374ac3c9)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/vb/vb.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "vb",
  extensions: [".vb"],
  aliases: ["Visual Basic", "vb"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/vb/vb"], resolve, reject);
      });
    } else {
      return import("./vb");
    }
  }
});
