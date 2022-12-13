/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.34.1(2a90206df3b5f5792a3a9fdd2796482b3eaf7969)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/azcli/azcli.ts
var conf = {
  comments: {
    lineComment: "#"
  }
};
var language = {
  defaultToken: "keyword",
  ignoreCase: true,
  tokenPostfix: ".azcli",
  str: /[^#\s]/,
  tokenizer: {
    root: [
      { include: "@comment" },
      [
        /\s-+@str*\s*/,
        {
          cases: {
            "@eos": { token: "key.identifier", next: "@popall" },
            "@default": { token: "key.identifier", next: "@type" }
          }
        }
      ],
      [
        /^-+@str*\s*/,
        {
          cases: {
            "@eos": { token: "key.identifier", next: "@popall" },
            "@default": { token: "key.identifier", next: "@type" }
          }
        }
      ]
    ],
    type: [
      { include: "@comment" },
      [
        /-+@str*\s*/,
        {
          cases: {
            "@eos": { token: "key.identifier", next: "@popall" },
            "@default": "key.identifier"
          }
        }
      ],
      [
        /@str+\s*/,
        {
          cases: {
            "@eos": { token: "string", next: "@popall" },
            "@default": "string"
          }
        }
      ]
    ],
    comment: [
      [
        /#.*$/,
        {
          cases: {
            "@eos": { token: "comment", next: "@popall" }
          }
        }
      ]
    ]
  }
};
export {
  conf,
  language
};
