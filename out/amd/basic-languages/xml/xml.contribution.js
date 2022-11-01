/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'xml',
        extensions: [
            '.xml',
            '.dtd',
            '.ascx',
            '.csproj',
            '.config',
            '.wxi',
            '.wxl',
            '.wxs',
            '.xaml',
            '.svg',
            '.svgz',
            '.opf',
            '.xsl'
        ],
        firstLine: '(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)',
        aliases: ['XML', 'xml'],
        mimetypes: ['text/xml', 'application/xml', 'application/xaml+xml', 'application/xml-dtd'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/xml/xml'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./xml'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=xml.contribution.js.map