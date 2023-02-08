/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(fdd81a9401fff5b3842f030d1e86b624c77b5e69)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/redis/redis.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "redis",
  extensions: [".redis"],
  aliases: ["redis"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/redis/redis"], resolve, reject);
      });
    } else {
      return import("./redis.js");
    }
  }
});
