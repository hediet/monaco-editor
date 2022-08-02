/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vscode-languageserver-types", "../../fillers/monaco-editor-core"], function (require, exports, lsTypes, monaco_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionRangeAdapter = exports.FoldingRangeAdapter = exports.DocumentColorAdapter = exports.DocumentRangeFormattingEditProvider = exports.DocumentFormattingEditProvider = exports.DocumentLinkAdapter = exports.DocumentSymbolAdapter = exports.RenameAdapter = exports.ReferenceAdapter = exports.DefinitionAdapter = exports.DocumentHighlightAdapter = exports.HoverAdapter = exports.toTextEdit = exports.toRange = exports.fromRange = exports.fromPosition = exports.CompletionAdapter = exports.DiagnosticsAdapter = void 0;
    var DiagnosticsAdapter = /** @class */ (function () {
        function DiagnosticsAdapter(_languageId, _worker, configChangeEvent) {
            var _this = this;
            this._languageId = _languageId;
            this._worker = _worker;
            this._disposables = [];
            this._listener = Object.create(null);
            var onModelAdd = function (model) {
                var modeId = model.getLanguageId();
                if (modeId !== _this._languageId) {
                    return;
                }
                var handle;
                _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
                    window.clearTimeout(handle);
                    handle = window.setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 500);
                });
                _this._doValidate(model.uri, modeId);
            };
            var onModelRemoved = function (model) {
                monaco_editor_core_1.editor.setModelMarkers(model, _this._languageId, []);
                var uriStr = model.uri.toString();
                var listener = _this._listener[uriStr];
                if (listener) {
                    listener.dispose();
                    delete _this._listener[uriStr];
                }
            };
            this._disposables.push(monaco_editor_core_1.editor.onDidCreateModel(onModelAdd));
            this._disposables.push(monaco_editor_core_1.editor.onWillDisposeModel(onModelRemoved));
            this._disposables.push(monaco_editor_core_1.editor.onDidChangeModelLanguage(function (event) {
                onModelRemoved(event.model);
                onModelAdd(event.model);
            }));
            this._disposables.push(configChangeEvent(function (_) {
                monaco_editor_core_1.editor.getModels().forEach(function (model) {
                    if (model.getLanguageId() === _this._languageId) {
                        onModelRemoved(model);
                        onModelAdd(model);
                    }
                });
            }));
            this._disposables.push({
                dispose: function () {
                    monaco_editor_core_1.editor.getModels().forEach(onModelRemoved);
                    for (var key in _this._listener) {
                        _this._listener[key].dispose();
                    }
                }
            });
            monaco_editor_core_1.editor.getModels().forEach(onModelAdd);
        }
        DiagnosticsAdapter.prototype.dispose = function () {
            this._disposables.forEach(function (d) { return d && d.dispose(); });
            this._disposables.length = 0;
        };
        DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
            this._worker(resource)
                .then(function (worker) {
                return worker.doValidation(resource.toString());
            })
                .then(function (diagnostics) {
                var markers = diagnostics.map(function (d) { return toDiagnostics(resource, d); });
                var model = monaco_editor_core_1.editor.getModel(resource);
                if (model && model.getLanguageId() === languageId) {
                    monaco_editor_core_1.editor.setModelMarkers(model, languageId, markers);
                }
            })
                .then(undefined, function (err) {
                console.error(err);
            });
        };
        return DiagnosticsAdapter;
    }());
    exports.DiagnosticsAdapter = DiagnosticsAdapter;
    function toSeverity(lsSeverity) {
        switch (lsSeverity) {
            case lsTypes.DiagnosticSeverity.Error:
                return monaco_editor_core_1.MarkerSeverity.Error;
            case lsTypes.DiagnosticSeverity.Warning:
                return monaco_editor_core_1.MarkerSeverity.Warning;
            case lsTypes.DiagnosticSeverity.Information:
                return monaco_editor_core_1.MarkerSeverity.Info;
            case lsTypes.DiagnosticSeverity.Hint:
                return monaco_editor_core_1.MarkerSeverity.Hint;
            default:
                return monaco_editor_core_1.MarkerSeverity.Info;
        }
    }
    function toDiagnostics(resource, diag) {
        var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
        return {
            severity: toSeverity(diag.severity),
            startLineNumber: diag.range.start.line + 1,
            startColumn: diag.range.start.character + 1,
            endLineNumber: diag.range.end.line + 1,
            endColumn: diag.range.end.character + 1,
            message: diag.message,
            code: code,
            source: diag.source
        };
    }
    var CompletionAdapter = /** @class */ (function () {
        function CompletionAdapter(_worker, _triggerCharacters) {
            this._worker = _worker;
            this._triggerCharacters = _triggerCharacters;
        }
        Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
            get: function () {
                return this._triggerCharacters;
            },
            enumerable: false,
            configurable: true
        });
        CompletionAdapter.prototype.provideCompletionItems = function (model, position, context, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.doComplete(resource.toString(), fromPosition(position));
            })
                .then(function (info) {
                if (!info) {
                    return;
                }
                var wordInfo = model.getWordUntilPosition(position);
                var wordRange = new monaco_editor_core_1.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
                var items = info.items.map(function (entry) {
                    var item = {
                        label: entry.label,
                        insertText: entry.insertText || entry.label,
                        sortText: entry.sortText,
                        filterText: entry.filterText,
                        documentation: entry.documentation,
                        detail: entry.detail,
                        command: toCommand(entry.command),
                        range: wordRange,
                        kind: toCompletionItemKind(entry.kind)
                    };
                    if (entry.textEdit) {
                        if (isInsertReplaceEdit(entry.textEdit)) {
                            item.range = {
                                insert: toRange(entry.textEdit.insert),
                                replace: toRange(entry.textEdit.replace)
                            };
                        }
                        else {
                            item.range = toRange(entry.textEdit.range);
                        }
                        item.insertText = entry.textEdit.newText;
                    }
                    if (entry.additionalTextEdits) {
                        item.additionalTextEdits =
                            entry.additionalTextEdits.map(toTextEdit);
                    }
                    if (entry.insertTextFormat === lsTypes.InsertTextFormat.Snippet) {
                        item.insertTextRules = monaco_editor_core_1.languages.CompletionItemInsertTextRule.InsertAsSnippet;
                    }
                    return item;
                });
                return {
                    isIncomplete: info.isIncomplete,
                    suggestions: items
                };
            });
        };
        return CompletionAdapter;
    }());
    exports.CompletionAdapter = CompletionAdapter;
    function fromPosition(position) {
        if (!position) {
            return void 0;
        }
        return { character: position.column - 1, line: position.lineNumber - 1 };
    }
    exports.fromPosition = fromPosition;
    function fromRange(range) {
        if (!range) {
            return void 0;
        }
        return {
            start: {
                line: range.startLineNumber - 1,
                character: range.startColumn - 1
            },
            end: { line: range.endLineNumber - 1, character: range.endColumn - 1 }
        };
    }
    exports.fromRange = fromRange;
    function toRange(range) {
        if (!range) {
            return void 0;
        }
        return new monaco_editor_core_1.Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
    }
    exports.toRange = toRange;
    function isInsertReplaceEdit(edit) {
        return (typeof edit.insert !== 'undefined' &&
            typeof edit.replace !== 'undefined');
    }
    function toCompletionItemKind(kind) {
        var mItemKind = monaco_editor_core_1.languages.CompletionItemKind;
        switch (kind) {
            case lsTypes.CompletionItemKind.Text:
                return mItemKind.Text;
            case lsTypes.CompletionItemKind.Method:
                return mItemKind.Method;
            case lsTypes.CompletionItemKind.Function:
                return mItemKind.Function;
            case lsTypes.CompletionItemKind.Constructor:
                return mItemKind.Constructor;
            case lsTypes.CompletionItemKind.Field:
                return mItemKind.Field;
            case lsTypes.CompletionItemKind.Variable:
                return mItemKind.Variable;
            case lsTypes.CompletionItemKind.Class:
                return mItemKind.Class;
            case lsTypes.CompletionItemKind.Interface:
                return mItemKind.Interface;
            case lsTypes.CompletionItemKind.Module:
                return mItemKind.Module;
            case lsTypes.CompletionItemKind.Property:
                return mItemKind.Property;
            case lsTypes.CompletionItemKind.Unit:
                return mItemKind.Unit;
            case lsTypes.CompletionItemKind.Value:
                return mItemKind.Value;
            case lsTypes.CompletionItemKind.Enum:
                return mItemKind.Enum;
            case lsTypes.CompletionItemKind.Keyword:
                return mItemKind.Keyword;
            case lsTypes.CompletionItemKind.Snippet:
                return mItemKind.Snippet;
            case lsTypes.CompletionItemKind.Color:
                return mItemKind.Color;
            case lsTypes.CompletionItemKind.File:
                return mItemKind.File;
            case lsTypes.CompletionItemKind.Reference:
                return mItemKind.Reference;
        }
        return mItemKind.Property;
    }
    function fromCompletionItemKind(kind) {
        var mItemKind = monaco_editor_core_1.languages.CompletionItemKind;
        switch (kind) {
            case mItemKind.Text:
                return lsTypes.CompletionItemKind.Text;
            case mItemKind.Method:
                return lsTypes.CompletionItemKind.Method;
            case mItemKind.Function:
                return lsTypes.CompletionItemKind.Function;
            case mItemKind.Constructor:
                return lsTypes.CompletionItemKind.Constructor;
            case mItemKind.Field:
                return lsTypes.CompletionItemKind.Field;
            case mItemKind.Variable:
                return lsTypes.CompletionItemKind.Variable;
            case mItemKind.Class:
                return lsTypes.CompletionItemKind.Class;
            case mItemKind.Interface:
                return lsTypes.CompletionItemKind.Interface;
            case mItemKind.Module:
                return lsTypes.CompletionItemKind.Module;
            case mItemKind.Property:
                return lsTypes.CompletionItemKind.Property;
            case mItemKind.Unit:
                return lsTypes.CompletionItemKind.Unit;
            case mItemKind.Value:
                return lsTypes.CompletionItemKind.Value;
            case mItemKind.Enum:
                return lsTypes.CompletionItemKind.Enum;
            case mItemKind.Keyword:
                return lsTypes.CompletionItemKind.Keyword;
            case mItemKind.Snippet:
                return lsTypes.CompletionItemKind.Snippet;
            case mItemKind.Color:
                return lsTypes.CompletionItemKind.Color;
            case mItemKind.File:
                return lsTypes.CompletionItemKind.File;
            case mItemKind.Reference:
                return lsTypes.CompletionItemKind.Reference;
        }
        return lsTypes.CompletionItemKind.Property;
    }
    function toTextEdit(textEdit) {
        if (!textEdit) {
            return void 0;
        }
        return {
            range: toRange(textEdit.range),
            text: textEdit.newText
        };
    }
    exports.toTextEdit = toTextEdit;
    function toCommand(c) {
        return c && c.command === 'editor.action.triggerSuggest'
            ? { id: c.command, title: c.title, arguments: c.arguments }
            : undefined;
    }
    var HoverAdapter = /** @class */ (function () {
        function HoverAdapter(_worker) {
            this._worker = _worker;
        }
        HoverAdapter.prototype.provideHover = function (model, position, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.doHover(resource.toString(), fromPosition(position));
            })
                .then(function (info) {
                if (!info) {
                    return;
                }
                return {
                    range: toRange(info.range),
                    contents: toMarkedStringArray(info.contents)
                };
            });
        };
        return HoverAdapter;
    }());
    exports.HoverAdapter = HoverAdapter;
    function isMarkupContent(thing) {
        return (thing && typeof thing === 'object' && typeof thing.kind === 'string');
    }
    function toMarkdownString(entry) {
        if (typeof entry === 'string') {
            return {
                value: entry
            };
        }
        if (isMarkupContent(entry)) {
            if (entry.kind === 'plaintext') {
                return {
                    value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
                };
            }
            return {
                value: entry.value
            };
        }
        return { value: '```' + entry.language + '\n' + entry.value + '\n```\n' };
    }
    function toMarkedStringArray(contents) {
        if (!contents) {
            return void 0;
        }
        if (Array.isArray(contents)) {
            return contents.map(toMarkdownString);
        }
        return [toMarkdownString(contents)];
    }
    var DocumentHighlightAdapter = /** @class */ (function () {
        function DocumentHighlightAdapter(_worker) {
            this._worker = _worker;
        }
        DocumentHighlightAdapter.prototype.provideDocumentHighlights = function (model, position, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) { return worker.findDocumentHighlights(resource.toString(), fromPosition(position)); })
                .then(function (entries) {
                if (!entries) {
                    return;
                }
                return entries.map(function (entry) {
                    return {
                        range: toRange(entry.range),
                        kind: toDocumentHighlightKind(entry.kind)
                    };
                });
            });
        };
        return DocumentHighlightAdapter;
    }());
    exports.DocumentHighlightAdapter = DocumentHighlightAdapter;
    function toDocumentHighlightKind(kind) {
        switch (kind) {
            case lsTypes.DocumentHighlightKind.Read:
                return monaco_editor_core_1.languages.DocumentHighlightKind.Read;
            case lsTypes.DocumentHighlightKind.Write:
                return monaco_editor_core_1.languages.DocumentHighlightKind.Write;
            case lsTypes.DocumentHighlightKind.Text:
                return monaco_editor_core_1.languages.DocumentHighlightKind.Text;
        }
        return monaco_editor_core_1.languages.DocumentHighlightKind.Text;
    }
    var DefinitionAdapter = /** @class */ (function () {
        function DefinitionAdapter(_worker) {
            this._worker = _worker;
        }
        DefinitionAdapter.prototype.provideDefinition = function (model, position, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.findDefinition(resource.toString(), fromPosition(position));
            })
                .then(function (definition) {
                if (!definition) {
                    return;
                }
                return [toLocation(definition)];
            });
        };
        return DefinitionAdapter;
    }());
    exports.DefinitionAdapter = DefinitionAdapter;
    function toLocation(location) {
        return {
            uri: monaco_editor_core_1.Uri.parse(location.uri),
            range: toRange(location.range)
        };
    }
    var ReferenceAdapter = /** @class */ (function () {
        function ReferenceAdapter(_worker) {
            this._worker = _worker;
        }
        ReferenceAdapter.prototype.provideReferences = function (model, position, context, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.findReferences(resource.toString(), fromPosition(position));
            })
                .then(function (entries) {
                if (!entries) {
                    return;
                }
                return entries.map(toLocation);
            });
        };
        return ReferenceAdapter;
    }());
    exports.ReferenceAdapter = ReferenceAdapter;
    var RenameAdapter = /** @class */ (function () {
        function RenameAdapter(_worker) {
            this._worker = _worker;
        }
        RenameAdapter.prototype.provideRenameEdits = function (model, position, newName, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.doRename(resource.toString(), fromPosition(position), newName);
            })
                .then(function (edit) {
                return toWorkspaceEdit(edit);
            });
        };
        return RenameAdapter;
    }());
    exports.RenameAdapter = RenameAdapter;
    function toWorkspaceEdit(edit) {
        if (!edit || !edit.changes) {
            return void 0;
        }
        var resourceEdits = [];
        for (var uri in edit.changes) {
            var _uri = monaco_editor_core_1.Uri.parse(uri);
            for (var _i = 0, _a = edit.changes[uri]; _i < _a.length; _i++) {
                var e = _a[_i];
                resourceEdits.push({
                    resource: _uri,
                    versionId: undefined,
                    textEdit: {
                        range: toRange(e.range),
                        text: e.newText
                    }
                });
            }
        }
        return {
            edits: resourceEdits
        };
    }
    var DocumentSymbolAdapter = /** @class */ (function () {
        function DocumentSymbolAdapter(_worker) {
            this._worker = _worker;
        }
        DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) { return worker.findDocumentSymbols(resource.toString()); })
                .then(function (items) {
                if (!items) {
                    return;
                }
                return items.map(function (item) { return ({
                    name: item.name,
                    detail: '',
                    containerName: item.containerName,
                    kind: toSymbolKind(item.kind),
                    range: toRange(item.location.range),
                    selectionRange: toRange(item.location.range),
                    tags: []
                }); });
            });
        };
        return DocumentSymbolAdapter;
    }());
    exports.DocumentSymbolAdapter = DocumentSymbolAdapter;
    function toSymbolKind(kind) {
        var mKind = monaco_editor_core_1.languages.SymbolKind;
        switch (kind) {
            case lsTypes.SymbolKind.File:
                return mKind.Array;
            case lsTypes.SymbolKind.Module:
                return mKind.Module;
            case lsTypes.SymbolKind.Namespace:
                return mKind.Namespace;
            case lsTypes.SymbolKind.Package:
                return mKind.Package;
            case lsTypes.SymbolKind.Class:
                return mKind.Class;
            case lsTypes.SymbolKind.Method:
                return mKind.Method;
            case lsTypes.SymbolKind.Property:
                return mKind.Property;
            case lsTypes.SymbolKind.Field:
                return mKind.Field;
            case lsTypes.SymbolKind.Constructor:
                return mKind.Constructor;
            case lsTypes.SymbolKind.Enum:
                return mKind.Enum;
            case lsTypes.SymbolKind.Interface:
                return mKind.Interface;
            case lsTypes.SymbolKind.Function:
                return mKind.Function;
            case lsTypes.SymbolKind.Variable:
                return mKind.Variable;
            case lsTypes.SymbolKind.Constant:
                return mKind.Constant;
            case lsTypes.SymbolKind.String:
                return mKind.String;
            case lsTypes.SymbolKind.Number:
                return mKind.Number;
            case lsTypes.SymbolKind.Boolean:
                return mKind.Boolean;
            case lsTypes.SymbolKind.Array:
                return mKind.Array;
        }
        return mKind.Function;
    }
    var DocumentLinkAdapter = /** @class */ (function () {
        function DocumentLinkAdapter(_worker) {
            this._worker = _worker;
        }
        DocumentLinkAdapter.prototype.provideLinks = function (model, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) { return worker.findDocumentLinks(resource.toString()); })
                .then(function (items) {
                if (!items) {
                    return;
                }
                return {
                    links: items.map(function (item) { return ({
                        range: toRange(item.range),
                        url: item.target
                    }); })
                };
            });
        };
        return DocumentLinkAdapter;
    }());
    exports.DocumentLinkAdapter = DocumentLinkAdapter;
    var DocumentFormattingEditProvider = /** @class */ (function () {
        function DocumentFormattingEditProvider(_worker) {
            this._worker = _worker;
        }
        DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
            var resource = model.uri;
            return this._worker(resource).then(function (worker) {
                return worker
                    .format(resource.toString(), null, fromFormattingOptions(options))
                    .then(function (edits) {
                    if (!edits || edits.length === 0) {
                        return;
                    }
                    return edits.map(toTextEdit);
                });
            });
        };
        return DocumentFormattingEditProvider;
    }());
    exports.DocumentFormattingEditProvider = DocumentFormattingEditProvider;
    var DocumentRangeFormattingEditProvider = /** @class */ (function () {
        function DocumentRangeFormattingEditProvider(_worker) {
            this._worker = _worker;
        }
        DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
            var resource = model.uri;
            return this._worker(resource).then(function (worker) {
                return worker
                    .format(resource.toString(), fromRange(range), fromFormattingOptions(options))
                    .then(function (edits) {
                    if (!edits || edits.length === 0) {
                        return;
                    }
                    return edits.map(toTextEdit);
                });
            });
        };
        return DocumentRangeFormattingEditProvider;
    }());
    exports.DocumentRangeFormattingEditProvider = DocumentRangeFormattingEditProvider;
    function fromFormattingOptions(options) {
        return {
            tabSize: options.tabSize,
            insertSpaces: options.insertSpaces
        };
    }
    var DocumentColorAdapter = /** @class */ (function () {
        function DocumentColorAdapter(_worker) {
            this._worker = _worker;
        }
        DocumentColorAdapter.prototype.provideDocumentColors = function (model, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) { return worker.findDocumentColors(resource.toString()); })
                .then(function (infos) {
                if (!infos) {
                    return;
                }
                return infos.map(function (item) { return ({
                    color: item.color,
                    range: toRange(item.range)
                }); });
            });
        };
        DocumentColorAdapter.prototype.provideColorPresentations = function (model, info, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range));
            })
                .then(function (presentations) {
                if (!presentations) {
                    return;
                }
                return presentations.map(function (presentation) {
                    var item = {
                        label: presentation.label
                    };
                    if (presentation.textEdit) {
                        item.textEdit = toTextEdit(presentation.textEdit);
                    }
                    if (presentation.additionalTextEdits) {
                        item.additionalTextEdits =
                            presentation.additionalTextEdits.map(toTextEdit);
                    }
                    return item;
                });
            });
        };
        return DocumentColorAdapter;
    }());
    exports.DocumentColorAdapter = DocumentColorAdapter;
    var FoldingRangeAdapter = /** @class */ (function () {
        function FoldingRangeAdapter(_worker) {
            this._worker = _worker;
        }
        FoldingRangeAdapter.prototype.provideFoldingRanges = function (model, context, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) { return worker.getFoldingRanges(resource.toString(), context); })
                .then(function (ranges) {
                if (!ranges) {
                    return;
                }
                return ranges.map(function (range) {
                    var result = {
                        start: range.startLine + 1,
                        end: range.endLine + 1
                    };
                    if (typeof range.kind !== 'undefined') {
                        result.kind = toFoldingRangeKind(range.kind);
                    }
                    return result;
                });
            });
        };
        return FoldingRangeAdapter;
    }());
    exports.FoldingRangeAdapter = FoldingRangeAdapter;
    function toFoldingRangeKind(kind) {
        switch (kind) {
            case lsTypes.FoldingRangeKind.Comment:
                return monaco_editor_core_1.languages.FoldingRangeKind.Comment;
            case lsTypes.FoldingRangeKind.Imports:
                return monaco_editor_core_1.languages.FoldingRangeKind.Imports;
            case lsTypes.FoldingRangeKind.Region:
                return monaco_editor_core_1.languages.FoldingRangeKind.Region;
        }
        return void 0;
    }
    var SelectionRangeAdapter = /** @class */ (function () {
        function SelectionRangeAdapter(_worker) {
            this._worker = _worker;
        }
        SelectionRangeAdapter.prototype.provideSelectionRanges = function (model, positions, token) {
            var resource = model.uri;
            return this._worker(resource)
                .then(function (worker) {
                return worker.getSelectionRanges(resource.toString(), positions.map(fromPosition));
            })
                .then(function (selectionRanges) {
                if (!selectionRanges) {
                    return;
                }
                return selectionRanges.map(function (selectionRange) {
                    var result = [];
                    while (selectionRange) {
                        result.push({ range: toRange(selectionRange.range) });
                        selectionRange = selectionRange.parent;
                    }
                    return result;
                });
            });
        };
        return SelectionRangeAdapter;
    }());
    exports.SelectionRangeAdapter = SelectionRangeAdapter;
});
//#endregion
