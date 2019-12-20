(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["codestream"] = factory();
	else
		root["codestream"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blockstream.ts":
/*!****************************!*\
  !*** ./src/blockstream.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEnabled = false;
var CodeStreamConsole = (function () {
    function CodeStreamConsole(blockHandle) {
        this.blockHandle = blockHandle;
    }
    CodeStreamConsole.prototype.write = function (args, method) {
        var codeAt = new Error();
        var lines = codeAt.stack.split("\n").reduce(function (acc, line) {
            if (line === "Error") {
                return acc;
            }
            if (line.indexOf("CodeStream") < 0) {
                acc.push(line);
            }
            return acc;
        }, []);
        var line = lines[0];
        var path = line.split("/");
        args.push("\n" + this.blockHandle.path.join(" "));
        args.push("\n" + line);
        console[method].apply(console, args);
    };
    CodeStreamConsole.prototype.enable = function () {
        isEnabled = true;
    };
    CodeStreamConsole.prototype.disable = function () {
        isEnabled = false;
    };
    CodeStreamConsole.prototype.log = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "log");
    };
    CodeStreamConsole.prototype.error = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "error");
    };
    CodeStreamConsole.prototype.info = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "info");
    };
    CodeStreamConsole.prototype.debug = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "debug");
    };
    CodeStreamConsole.prototype.warn = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "warn");
    };
    CodeStreamConsole.prototype.table = function () {
        this.write(Array.prototype.splice.call(arguments, 0), "table");
    };
    return CodeStreamConsole;
}());
var CodeStreamHandle = (function () {
    function CodeStreamHandle(blockName, blockPath) {
        this.blockName = blockName;
        this.blockPath = blockPath;
        this._console = new CodeStreamConsole(this);
    }
    Object.defineProperty(CodeStreamHandle.prototype, "name", {
        get: function () {
            return this.blockName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeStreamHandle.prototype, "path", {
        get: function () {
            return __spreadArrays(this.blockPath, [this.name]);
        },
        enumerable: true,
        configurable: true
    });
    CodeStreamHandle.prototype.fork = function (forkName, forkBlock) {
        var handle = new CodeStreamHandle(forkName, this.path);
        var doGroup = this.path.length > 0;
        var groupName = forkName;
        if (doGroup) {
            console.group(groupName);
        }
        var ret = forkBlock(handle);
        if (doGroup) {
            console.groupEnd();
        }
        return ret;
    };
    Object.defineProperty(CodeStreamHandle.prototype, "console", {
        get: function () {
            return this._console;
        },
        enumerable: true,
        configurable: true
    });
    CodeStreamHandle.prototype.toString = function () {
        return "\n" + this.path.join(' / ');
    };
    CodeStreamHandle.prototype._toString = function () {
        return this.toString();
    };
    CodeStreamHandle.prototype.tag = function () {
        return this.toString();
    };
    return CodeStreamHandle;
}());
exports.CodeStreamHandle = CodeStreamHandle;
var CodeStreamBlock = function (blockName, blockCode) {
    var handle = new CodeStreamHandle("", []);
    var ret = handle.fork(blockName, blockCode);
    return ret;
};
exports.CodeStreamBlock = CodeStreamBlock;
var block = CodeStreamBlock;
exports.block = block;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./blockstream */ "./src/blockstream.ts"));


/***/ })

/******/ });
});
//# sourceMappingURL=codestream.js.map