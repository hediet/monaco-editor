/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // freemarker.tag-square.interpolation-dollar is the default
    // According the docs tag-auto will be the default for version 2.4+, but that
    // hasn't event been released yet.
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2',
        extensions: ['.ftl', '.ftlh', '.ftlx'],
        aliases: ['FreeMarker2', 'Apache FreeMarker2'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagAngleInterpolationDollar; });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./freemarker2'], resolve_1, reject_1); }).then(function (m) { return m.TagAutoInterpolationDollar; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-angle.interpolation-dollar',
        aliases: ['FreeMarker2 (Angle/Dollar)', 'Apache FreeMarker2 (Angle/Dollar)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagAngleInterpolationDollar; });
            }
            else {
                return new Promise(function (resolve_2, reject_2) { require(['./freemarker2'], resolve_2, reject_2); }).then(function (m) { return m.TagAngleInterpolationDollar; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-bracket.interpolation-dollar',
        aliases: ['FreeMarker2 (Bracket/Dollar)', 'Apache FreeMarker2 (Bracket/Dollar)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagBracketInterpolationDollar; });
            }
            else {
                return new Promise(function (resolve_3, reject_3) { require(['./freemarker2'], resolve_3, reject_3); }).then(function (m) { return m.TagBracketInterpolationDollar; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-angle.interpolation-bracket',
        aliases: ['FreeMarker2 (Angle/Bracket)', 'Apache FreeMarker2 (Angle/Bracket)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagAngleInterpolationBracket; });
            }
            else {
                return new Promise(function (resolve_4, reject_4) { require(['./freemarker2'], resolve_4, reject_4); }).then(function (m) { return m.TagAngleInterpolationBracket; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-bracket.interpolation-bracket',
        aliases: ['FreeMarker2 (Bracket/Bracket)', 'Apache FreeMarker2 (Bracket/Bracket)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagBracketInterpolationBracket; });
            }
            else {
                return new Promise(function (resolve_5, reject_5) { require(['./freemarker2'], resolve_5, reject_5); }).then(function (m) { return m.TagBracketInterpolationBracket; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-auto.interpolation-dollar',
        aliases: ['FreeMarker2 (Auto/Dollar)', 'Apache FreeMarker2 (Auto/Dollar)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagAutoInterpolationDollar; });
            }
            else {
                return new Promise(function (resolve_6, reject_6) { require(['./freemarker2'], resolve_6, reject_6); }).then(function (m) { return m.TagAutoInterpolationDollar; });
            }
        }
    });
    (0, __contribution_1.registerLanguage)({
        id: 'freemarker2.tag-auto.interpolation-bracket',
        aliases: ['FreeMarker2 (Auto/Bracket)', 'Apache FreeMarker2 (Auto/Bracket)'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/freemarker2/freemarker2'], resolve, reject);
                }).then(function (m) { return m.TagAutoInterpolationBracket; });
            }
            else {
                return new Promise(function (resolve_7, reject_7) { require(['./freemarker2'], resolve_7, reject_7); }).then(function (m) { return m.TagAutoInterpolationBracket; });
            }
        }
    });
});
//# sourceMappingURL=freemarker2.contribution.js.map