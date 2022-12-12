/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(b1e08200017f90563ea2d5a5bdaf0c38b11aef1a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/dart/dart.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "dart",
  extensions: [".dart"],
  aliases: ["Dart", "dart"],
  mimetypes: ["text/x-dart-source", "text/x-dart"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/dart/dart"], resolve, reject);
      });
    } else {
      return import("./dart.js");
    }
  }
});
