/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "monaco-editor-core/esm/vs/editor/editor.worker", "./htmlWorker"], function (require, exports, worker, htmlWorker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    self.onmessage = function () {
        // ignore the first message
        worker.initialize(function (ctx, createData) {
            return new htmlWorker_1.HTMLWorker(ctx, createData);
        });
    };
});
//# sourceMappingURL=html.worker.js.map