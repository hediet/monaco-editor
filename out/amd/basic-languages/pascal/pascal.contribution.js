/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'pascal',
        extensions: ['.pas', '.p', '.pp'],
        aliases: ['Pascal', 'pas'],
        mimetypes: ['text/x-pascal-source', 'text/x-pascal'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/pascal/pascal'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./pascal'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=pascal.contribution.js.map