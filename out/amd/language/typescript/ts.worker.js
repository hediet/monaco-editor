/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "monaco-editor-core/esm/vs/editor/editor.worker", "./tsWorker", "./tsWorker"], function (require, exports, edworker, tsWorker_1, tsWorker_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = void 0;
    self.onmessage = function () {
        // ignore the first message
        edworker.initialize(function (ctx, createData) {
            return (0, tsWorker_1.create)(ctx, createData);
        });
    };
    Object.defineProperty(exports, "create", { enumerable: true, get: function () { return tsWorker_2.create; } });
});
