/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(b1e08200017f90563ea2d5a5bdaf0c38b11aef1a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/yaml/yaml.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "yaml",
  extensions: [".yaml", ".yml"],
  aliases: ["YAML", "yaml", "YML", "yml"],
  mimetypes: ["application/x-yaml", "text/x-yaml"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/yaml/yaml"], resolve, reject);
      });
    } else {
      return import("./yaml");
    }
  }
});