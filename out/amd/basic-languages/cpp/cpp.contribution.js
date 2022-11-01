/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'c',
        extensions: ['.c', '.h'],
        aliases: ['C', 'c'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/cpp/cpp'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./cpp'], resolve_1, reject_1); });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'cpp',
        extensions: ['.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx'],
        aliases: ['C++', 'Cpp', 'cpp'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/cpp/cpp'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_2, reject_2) { require(['./cpp'], resolve_2, reject_2); });
            }
        }
    });
});
//# sourceMappingURL=cpp.contribution.js.map