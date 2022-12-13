/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(2a90206df3b5f5792a3a9fdd2796482b3eaf7969)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/ini/ini.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "ini",
  extensions: [".ini", ".properties", ".gitconfig"],
  filenames: ["config", ".gitattributes", ".gitconfig", ".editorconfig"],
  aliases: ["Ini", "ini"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/ini/ini"], resolve, reject);
      });
    } else {
      return import("./ini");
    }
  }
});
