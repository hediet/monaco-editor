/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(02346abe919cf68493ee56510a23375671d70d09)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/graphql/graphql.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "graphql",
  extensions: [".graphql", ".gql"],
  aliases: ["GraphQL", "graphql", "gql"],
  mimetypes: ["application/graphql"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/graphql/graphql"], resolve, reject);
      });
    } else {
      return import("./graphql");
    }
  }
});
