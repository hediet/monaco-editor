/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'systemverilog',
        extensions: ['.sv', '.svh'],
        aliases: ['SV', 'sv', 'SystemVerilog', 'systemverilog'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/systemverilog/systemverilog'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./systemverilog'], resolve_1, reject_1); });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'verilog',
        extensions: ['.v', '.vh'],
        aliases: ['V', 'v', 'Verilog', 'verilog'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/systemverilog/systemverilog'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_2, reject_2) { require(['./systemverilog'], resolve_2, reject_2); });
            }
        }
    });
});
//# sourceMappingURL=systemverilog.contribution.js.map