/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'scala',
        extensions: ['.scala', '.sc', '.sbt'],
        aliases: ['Scala', 'scala', 'SBT', 'Sbt', 'sbt', 'Dotty', 'dotty'],
        mimetypes: ['text/x-scala-source', 'text/x-scala', 'text/x-sbt', 'text/x-dotty'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/scala/scala'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./scala'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=scala.contribution.js.map