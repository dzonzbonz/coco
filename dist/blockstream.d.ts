interface ICodeStreamHandle {
    name: string;
    path: string[];
    fork: (forkName: string, forkBlock: (forkHandle: ICodeStreamHandle) => any) => {};
    console: CodeStreamConsole;
}
declare class CodeStreamConsole {
    private blockHandle;
    constructor(blockHandle: ICodeStreamHandle);
    private write;
    enable(): void;
    disable(): void;
    log(): void;
    error(): void;
    info(): void;
    debug(): void;
    warn(): void;
    table(): void;
}
declare class CodeStreamHandle implements ICodeStreamHandle {
    private blockName;
    private blockPath;
    private _console;
    constructor(blockName: string, blockPath: string[]);
    get name(): string;
    get path(): string[];
    fork(forkName: string, forkBlock: (forkHandle: ICodeStreamHandle) => any): any;
    get console(): CodeStreamConsole;
    toString(): string;
    _toString(): string;
    tag(): string;
}
declare const CodeStreamBlock: (blockName: string, blockCode: (forkHandle: ICodeStreamHandle) => any) => any;
declare const block: (blockName: string, blockCode: (forkHandle: ICodeStreamHandle) => any) => any;
export { CodeStreamBlock, ICodeStreamHandle, CodeStreamHandle, block };
