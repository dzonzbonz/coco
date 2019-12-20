let isEnabled = false;

/**
 * Interface to the stream handle
 */
interface ICodeStreamHandle {
  name: string;
  path: string[];
  fork: (
    forkName: string,
    forkBlock: (forkHandle: ICodeStreamHandle) => any
  ) => {};
  console: CodeStreamConsole;
}

/**
 * Console to output info
 */
class CodeStreamConsole {
  constructor(private blockHandle: ICodeStreamHandle) {}

  private write(args: any[], method: string) {
    const codeAt = new Error(); // should track the parent
    const lines = codeAt.stack.split("\n").reduce((acc, line) => {
      if (line === "Error") {
        return acc;
      }
      if (line.indexOf("CodeStream") < 0) {
        acc.push(line);
      }
      return acc;
    }, []);
    const line = lines[0];
    
    const path = line.split("/");

    args.push("\n" + this.blockHandle.path.join(" "));
    args.push("\n" + line);
    // should write a path down bellow
    (console as any)[method].apply(console, args);
  }

  enable() {
    isEnabled = true;
  }

  disable() {
    isEnabled = false;
  }

  log() {
    this.write(Array.prototype.splice.call(arguments, 0), "log");
  }

  error() {
    this.write(Array.prototype.splice.call(arguments, 0), "error");
  }

  info() {
    this.write(Array.prototype.splice.call(arguments, 0), "info");
  }

  debug() {
    this.write(Array.prototype.splice.call(arguments, 0), "debug");
  }

  warn() {
    this.write(Array.prototype.splice.call(arguments, 0), "warn");
  }

  table() {
    this.write(Array.prototype.splice.call(arguments, 0), "table");
  }
}

class CodeStreamHandle implements ICodeStreamHandle {
  private _console: CodeStreamConsole;

  constructor(private blockName: string, private blockPath: string[]) {
    this._console = new CodeStreamConsole(this);
  }

  get name(): string {
    return this.blockName;
  }

  get path(): string[] {
    return [...this.blockPath, this.name];
  }

  fork(
    forkName: string,
    forkBlock: (forkHandle: ICodeStreamHandle) => any
  ): any {
    const handle = new CodeStreamHandle(forkName, this.path);
    const doGroup = this.path.length > 0;
    // const groupName = doGroup ? [...this.path, forkName].join("->") : null;
    const groupName = forkName;

    if (doGroup) {
      console.group(groupName);
    }

    const ret = forkBlock(handle);

    if (doGroup) {
      console.groupEnd();
    }
    return ret;
  }

  get console() {
    return this._console;
  }

  toString() {
    return "\n" + this.path.join(' / ');
  }

  _toString() {
    return this.toString();
  }

  tag() {
    return this.toString();
  }
}

const CodeStreamBlock = (
  blockName: string,
  blockCode: (forkHandle: ICodeStreamHandle) => any
) => {
  const handle = new CodeStreamHandle("", []);
  const ret = handle.fork(blockName, blockCode);
  return ret;
};

const block = CodeStreamBlock;

export { CodeStreamBlock, ICodeStreamHandle, CodeStreamHandle, block };

/**
 * codeblock('#blockName', (blockHandle) => {
 *  parentBlockHandle.fork('#blockFork', (forkBlockHandle) => {
 *  })
 * })
 */
