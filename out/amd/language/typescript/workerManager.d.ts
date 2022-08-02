import { LanguageServiceDefaults } from './monaco.contribution';
import type { TypeScriptWorker } from './tsWorker';
import { Uri } from '../../fillers/monaco-editor-core';
export declare class WorkerManager {
    private _modeId;
    private _defaults;
    private _configChangeListener;
    private _updateExtraLibsToken;
    private _extraLibsChangeListener;
    private _worker;
    private _client;
    constructor(modeId: string, defaults: LanguageServiceDefaults);
    private _stopWorker;
    dispose(): void;
    private _updateExtraLibs;
    private _getClient;
    getLanguageServiceWorker(...resources: Uri[]): Promise<TypeScriptWorker>;
}
