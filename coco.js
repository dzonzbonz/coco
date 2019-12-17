"use strict";

var logEnabled = true;
var logMode = "normal"; // normal, line
let groupLevel = 0;
const cocoFork = function(...parentArgs) {
  const methods = [
    "log",
    "warn",
    "info",
    "debug",
    "error",
    "group",
    "trace",
    "table",
    "groupEnd",
    "groupCollapsed"
  ];

  const fork = function() {
    fork.debug.apply(null, arguments);
  };

  methods.forEach(l => {
    fork[l] = function(...args) {
      if (!logEnabled) {
        return fork;
      }

      if (l == "group" || l == "groupCollapsed") {
        groupLevel++;
      }

      if (l == "groupEnd") {
        groupLevel--;
      }

      if (
        l != "group" &&
        l != "groupCollapsed" &&
        l != "groupEnd" &&
        groupLevel > 0
      ) {
        args.push(parentArgs);
      } else {
        args.splice(0, 0, ...parentArgs);
      }

      console[l].apply(console, args);

      return fork;
    };
  });

  fork.fork = function(...args) {
    args.splice(0, 0, ...parentArgs);
    return horisenLogFork(...args);
  };

  fork.begin = function (...args) {
    const f = fork.fork(...args);
    f.groupCollapsed();
    return f;
  }

  fork.end = function () {
    fork.groupEnd();
  }

  fork.block = function (blockName, cb) {
    const forkBlock = fork.begin(blockName);
    const ret = cb(forkBlock);
    forkBlock.end();
    return ret;
  }

  return fork;
};

const coco = cocoFork();

coco.enable = function() {
  logEnabled = true;
  return horisenLog;
};

coco.disable = function() {
  logEnabled = false;
  return horisenLog;
};

export default coco;
