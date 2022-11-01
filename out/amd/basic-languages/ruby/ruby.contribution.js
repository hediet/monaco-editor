/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'ruby',
        extensions: ['.rb', '.rbx', '.rjs', '.gemspec', '.pp'],
        filenames: ['rakefile', 'Gemfile'],
        aliases: ['Ruby', 'rb'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/ruby/ruby'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./ruby'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=ruby.contribution.js.map