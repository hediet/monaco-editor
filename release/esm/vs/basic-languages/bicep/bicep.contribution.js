/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(478c324f7046c0ab60415d732a0687b384a02225)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/bicep/bicep.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "bicep",
  extensions: [".bicep"],
  aliases: ["Bicep"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/bicep/bicep"], resolve, reject);
      });
    } else {
      return import("./bicep.js");
    }
  }
});
