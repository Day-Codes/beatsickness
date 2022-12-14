(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/stackframe/stackframe.js
  var require_stackframe = __commonJS({
    "node_modules/stackframe/stackframe.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define("stackframe", [], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.StackFrame = factory();
        }
      })(exports, function() {
        "use strict";
        function _isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        __name(_isNumber, "_isNumber");
        function _capitalize(str) {
          return str.charAt(0).toUpperCase() + str.substring(1);
        }
        __name(_capitalize, "_capitalize");
        function _getter(p) {
          return function() {
            return this[p];
          };
        }
        __name(_getter, "_getter");
        var booleanProps = ["isConstructor", "isEval", "isNative", "isToplevel"];
        var numericProps = ["columnNumber", "lineNumber"];
        var stringProps = ["fileName", "functionName", "source"];
        var arrayProps = ["args"];
        var objectProps = ["evalOrigin"];
        var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
        function StackFrame(obj) {
          if (!obj)
            return;
          for (var i2 = 0; i2 < props.length; i2++) {
            if (obj[props[i2]] !== void 0) {
              this["set" + _capitalize(props[i2])](obj[props[i2]]);
            }
          }
        }
        __name(StackFrame, "StackFrame");
        StackFrame.prototype = {
          getArgs: function() {
            return this.args;
          },
          setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== "[object Array]") {
              throw new TypeError("Args must be an Array");
            }
            this.args = v;
          },
          getEvalOrigin: function() {
            return this.evalOrigin;
          },
          setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
              this.evalOrigin = v;
            } else if (v instanceof Object) {
              this.evalOrigin = new StackFrame(v);
            } else {
              throw new TypeError("Eval Origin must be an Object or StackFrame");
            }
          },
          toString: function() {
            var fileName = this.getFileName() || "";
            var lineNumber = this.getLineNumber() || "";
            var columnNumber = this.getColumnNumber() || "";
            var functionName = this.getFunctionName() || "";
            if (this.getIsEval()) {
              if (fileName) {
                return "[eval] (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
              }
              return "[eval]:" + lineNumber + ":" + columnNumber;
            }
            if (functionName) {
              return functionName + " (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
            }
            return fileName + ":" + lineNumber + ":" + columnNumber;
          }
        };
        StackFrame.fromString = /* @__PURE__ */ __name(function StackFrame$$fromString(str) {
          var argsStartIndex = str.indexOf("(");
          var argsEndIndex = str.lastIndexOf(")");
          var functionName = str.substring(0, argsStartIndex);
          var args = str.substring(argsStartIndex + 1, argsEndIndex).split(",");
          var locationString = str.substring(argsEndIndex + 1);
          if (locationString.indexOf("@") === 0) {
            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, "");
            var fileName = parts[1];
            var lineNumber = parts[2];
            var columnNumber = parts[3];
          }
          return new StackFrame({
            functionName,
            args: args || void 0,
            fileName,
            lineNumber: lineNumber || void 0,
            columnNumber: columnNumber || void 0
          });
        }, "StackFrame$$fromString");
        for (var i = 0; i < booleanProps.length; i++) {
          StackFrame.prototype["get" + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
          StackFrame.prototype["set" + _capitalize(booleanProps[i])] = function(p) {
            return function(v) {
              this[p] = Boolean(v);
            };
          }(booleanProps[i]);
        }
        for (var j = 0; j < numericProps.length; j++) {
          StackFrame.prototype["get" + _capitalize(numericProps[j])] = _getter(numericProps[j]);
          StackFrame.prototype["set" + _capitalize(numericProps[j])] = function(p) {
            return function(v) {
              if (!_isNumber(v)) {
                throw new TypeError(p + " must be a Number");
              }
              this[p] = Number(v);
            };
          }(numericProps[j]);
        }
        for (var k = 0; k < stringProps.length; k++) {
          StackFrame.prototype["get" + _capitalize(stringProps[k])] = _getter(stringProps[k]);
          StackFrame.prototype["set" + _capitalize(stringProps[k])] = function(p) {
            return function(v) {
              this[p] = String(v);
            };
          }(stringProps[k]);
        }
        return StackFrame;
      });
    }
  });

  // node_modules/error-stack-parser/error-stack-parser.js
  var require_error_stack_parser = __commonJS({
    "node_modules/error-stack-parser/error-stack-parser.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define("error-stack-parser", ["stackframe"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(require_stackframe());
        } else {
          root.ErrorStackParser = factory(root.StackFrame);
        }
      })(exports, /* @__PURE__ */ __name(function ErrorStackParser(StackFrame) {
        "use strict";
        var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
        var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
        var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
        return {
          parse: /* @__PURE__ */ __name(function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") {
              return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
              return this.parseV8OrIE(error);
            } else if (error.stack) {
              return this.parseFFOrSafari(error);
            } else {
              throw new Error("Cannot parse given Error object");
            }
          }, "ErrorStackParser$$parse"),
          extractLocation: /* @__PURE__ */ __name(function ErrorStackParser$$extractLocation(urlLike) {
            if (urlLike.indexOf(":") === -1) {
              return [urlLike];
            }
            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[()]/g, ""));
            return [parts[1], parts[2] || void 0, parts[3] || void 0];
          }, "ErrorStackParser$$extractLocation"),
          parseV8OrIE: /* @__PURE__ */ __name(function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split("\n").filter(function(line) {
              return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);
            return filtered.map(function(line) {
              if (line.indexOf("(eval ") > -1) {
                line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, "");
              }
              var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(");
              var location2 = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
              sanitizedLine = location2 ? sanitizedLine.replace(location2[0], "") : sanitizedLine;
              var tokens = sanitizedLine.split(/\s+/).slice(1);
              var locationParts = this.extractLocation(location2 ? location2[1] : tokens.pop());
              var functionName = tokens.join(" ") || void 0;
              var fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
              return new StackFrame({
                functionName,
                fileName,
                lineNumber: locationParts[1],
                columnNumber: locationParts[2],
                source: line
              });
            }, this);
          }, "ErrorStackParser$$parseV8OrIE"),
          parseFFOrSafari: /* @__PURE__ */ __name(function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split("\n").filter(function(line) {
              return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);
            return filtered.map(function(line) {
              if (line.indexOf(" > eval") > -1) {
                line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
              }
              if (line.indexOf("@") === -1 && line.indexOf(":") === -1) {
                return new StackFrame({
                  functionName: line
                });
              } else {
                var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                var matches = line.match(functionNameRegex);
                var functionName = matches && matches[1] ? matches[1] : void 0;
                var locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
                return new StackFrame({
                  functionName,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
                });
              }
            }, this);
          }, "ErrorStackParser$$parseFFOrSafari"),
          parseOpera: /* @__PURE__ */ __name(function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length) {
              return this.parseOpera9(e);
            } else if (!e.stack) {
              return this.parseOpera10(e);
            } else {
              return this.parseOpera11(e);
            }
          }, "ErrorStackParser$$parseOpera"),
          parseOpera9: /* @__PURE__ */ __name(function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split("\n");
            var result = [];
            for (var i = 2, len = lines.length; i < len; i += 2) {
              var match = lineRE.exec(lines[i]);
              if (match) {
                result.push(new StackFrame({
                  fileName: match[2],
                  lineNumber: match[1],
                  source: lines[i]
                }));
              }
            }
            return result;
          }, "ErrorStackParser$$parseOpera9"),
          parseOpera10: /* @__PURE__ */ __name(function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split("\n");
            var result = [];
            for (var i = 0, len = lines.length; i < len; i += 2) {
              var match = lineRE.exec(lines[i]);
              if (match) {
                result.push(new StackFrame({
                  functionName: match[3] || void 0,
                  fileName: match[2],
                  lineNumber: match[1],
                  source: lines[i]
                }));
              }
            }
            return result;
          }, "ErrorStackParser$$parseOpera10"),
          parseOpera11: /* @__PURE__ */ __name(function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split("\n").filter(function(line) {
              return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);
            return filtered.map(function(line) {
              var tokens = line.split("@");
              var locationParts = this.extractLocation(tokens.pop());
              var functionCall = tokens.shift() || "";
              var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
              var argsRaw;
              if (functionCall.match(/\(([^)]*)\)/)) {
                argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1");
              }
              var args = argsRaw === void 0 || argsRaw === "[arguments not available]" ? void 0 : argsRaw.split(",");
              return new StackFrame({
                functionName,
                args,
                fileName: locationParts[0],
                lineNumber: locationParts[1],
                columnNumber: locationParts[2],
                source: line
              });
            }, this);
          }, "ErrorStackParser$$parseOpera11")
        };
      }, "ErrorStackParser"));
    }
  });

  // node_modules/stack-generator/stack-generator.js
  var require_stack_generator = __commonJS({
    "node_modules/stack-generator/stack-generator.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define("stack-generator", ["stackframe"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(require_stackframe());
        } else {
          root.StackGenerator = factory(root.StackFrame);
        }
      })(exports, function(StackFrame) {
        return {
          backtrace: /* @__PURE__ */ __name(function StackGenerator$$backtrace(opts) {
            var stack = [];
            var maxStackSize = 10;
            if (typeof opts === "object" && typeof opts.maxStackSize === "number") {
              maxStackSize = opts.maxStackSize;
            }
            var curr = arguments.callee;
            while (curr && stack.length < maxStackSize && curr["arguments"]) {
              var args = new Array(curr["arguments"].length);
              for (var i = 0; i < args.length; ++i) {
                args[i] = curr["arguments"][i];
              }
              if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
                stack.push(new StackFrame({ functionName: RegExp.$1 || void 0, args }));
              } else {
                stack.push(new StackFrame({ args }));
              }
              try {
                curr = curr.caller;
              } catch (e) {
                break;
              }
            }
            return stack;
          }, "StackGenerator$$backtrace")
        };
      });
    }
  });

  // node_modules/source-map/lib/util.js
  var require_util = __commonJS({
    "node_modules/source-map/lib/util.js"(exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
          return aArgs[aName];
        } else if (arguments.length === 3) {
          return aDefaultValue;
        } else {
          throw new Error('"' + aName + '" is a required argument.');
        }
      }
      __name(getArg, "getArg");
      exports.getArg = getArg;
      var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
      var dataUrlRegexp = /^data:.+\,.+$/;
      function urlParse(aUrl) {
        var match = aUrl.match(urlRegexp);
        if (!match) {
          return null;
        }
        return {
          scheme: match[1],
          auth: match[2],
          host: match[3],
          port: match[4],
          path: match[5]
        };
      }
      __name(urlParse, "urlParse");
      exports.urlParse = urlParse;
      function urlGenerate(aParsedUrl) {
        var url = "";
        if (aParsedUrl.scheme) {
          url += aParsedUrl.scheme + ":";
        }
        url += "//";
        if (aParsedUrl.auth) {
          url += aParsedUrl.auth + "@";
        }
        if (aParsedUrl.host) {
          url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
          url += ":" + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
          url += aParsedUrl.path;
        }
        return url;
      }
      __name(urlGenerate, "urlGenerate");
      exports.urlGenerate = urlGenerate;
      function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
          if (!url.path) {
            return aPath;
          }
          path = url.path;
        }
        var isAbsolute = exports.isAbsolute(path);
        var parts = path.split(/\/+/);
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i];
          if (part === ".") {
            parts.splice(i, 1);
          } else if (part === "..") {
            up++;
          } else if (up > 0) {
            if (part === "") {
              parts.splice(i + 1, up);
              up = 0;
            } else {
              parts.splice(i, 2);
              up--;
            }
          }
        }
        path = parts.join("/");
        if (path === "") {
          path = isAbsolute ? "/" : ".";
        }
        if (url) {
          url.path = path;
          return urlGenerate(url);
        }
        return path;
      }
      __name(normalize, "normalize");
      exports.normalize = normalize;
      function join(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        if (aPath === "") {
          aPath = ".";
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
          aRoot = aRootUrl.path || "/";
        }
        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) {
            aPathUrl.scheme = aRootUrl.scheme;
          }
          return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
          return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath;
          return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
        if (aRootUrl) {
          aRootUrl.path = joined;
          return urlGenerate(aRootUrl);
        }
        return joined;
      }
      __name(join, "join");
      exports.join = join;
      exports.isAbsolute = function(aPath) {
        return aPath.charAt(0) === "/" || !!aPath.match(urlRegexp);
      };
      function relative(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        aRoot = aRoot.replace(/\/$/, "");
        var level = 0;
        while (aPath.indexOf(aRoot + "/") !== 0) {
          var index = aRoot.lastIndexOf("/");
          if (index < 0) {
            return aPath;
          }
          aRoot = aRoot.slice(0, index);
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
            return aPath;
          }
          ++level;
        }
        return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
      }
      __name(relative, "relative");
      exports.relative = relative;
      var supportsNullProto = function() {
        var obj = Object.create(null);
        return !("__proto__" in obj);
      }();
      function identity(s2) {
        return s2;
      }
      __name(identity, "identity");
      function toSetString(aStr) {
        if (isProtoString(aStr)) {
          return "$" + aStr;
        }
        return aStr;
      }
      __name(toSetString, "toSetString");
      exports.toSetString = supportsNullProto ? identity : toSetString;
      function fromSetString(aStr) {
        if (isProtoString(aStr)) {
          return aStr.slice(1);
        }
        return aStr;
      }
      __name(fromSetString, "fromSetString");
      exports.fromSetString = supportsNullProto ? identity : fromSetString;
      function isProtoString(s2) {
        if (!s2) {
          return false;
        }
        var length = s2.length;
        if (length < 9) {
          return false;
        }
        if (s2.charCodeAt(length - 1) !== 95 || s2.charCodeAt(length - 2) !== 95 || s2.charCodeAt(length - 3) !== 111 || s2.charCodeAt(length - 4) !== 116 || s2.charCodeAt(length - 5) !== 111 || s2.charCodeAt(length - 6) !== 114 || s2.charCodeAt(length - 7) !== 112 || s2.charCodeAt(length - 8) !== 95 || s2.charCodeAt(length - 9) !== 95) {
          return false;
        }
        for (var i = length - 10; i >= 0; i--) {
          if (s2.charCodeAt(i) !== 36) {
            return false;
          }
        }
        return true;
      }
      __name(isProtoString, "isProtoString");
      function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = mappingA.source - mappingB.source;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return mappingA.name - mappingB.name;
      }
      __name(compareByOriginalPositions, "compareByOriginalPositions");
      exports.compareByOriginalPositions = compareByOriginalPositions;
      function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = mappingA.source - mappingB.source;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return mappingA.name - mappingB.name;
      }
      __name(compareByGeneratedPositionsDeflated, "compareByGeneratedPositionsDeflated");
      exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
          return 0;
        }
        if (aStr1 > aStr2) {
          return 1;
        }
        return -1;
      }
      __name(strcmp, "strcmp");
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      __name(compareByGeneratedPositionsInflated, "compareByGeneratedPositionsInflated");
      exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    }
  });

  // node_modules/source-map/lib/binary-search.js
  var require_binary_search = __commonJS({
    "node_modules/source-map/lib/binary-search.js"(exports) {
      exports.GREATEST_LOWER_BOUND = 1;
      exports.LEAST_UPPER_BOUND = 2;
      function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math.floor((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
          return mid;
        } else if (cmp > 0) {
          if (aHigh - mid > 1) {
            return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return aHigh < aHaystack.length ? aHigh : -1;
          } else {
            return mid;
          }
        } else {
          if (mid - aLow > 1) {
            return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return mid;
          } else {
            return aLow < 0 ? -1 : aLow;
          }
        }
      }
      __name(recursiveSearch, "recursiveSearch");
      exports.search = /* @__PURE__ */ __name(function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack.length === 0) {
          return -1;
        }
        var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
        if (index < 0) {
          return -1;
        }
        while (index - 1 >= 0) {
          if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
            break;
          }
          --index;
        }
        return index;
      }, "search");
    }
  });

  // node_modules/source-map/lib/array-set.js
  var require_array_set = __commonJS({
    "node_modules/source-map/lib/array-set.js"(exports) {
      var util = require_util();
      var has = Object.prototype.hasOwnProperty;
      function ArraySet() {
        this._array = [];
        this._set = Object.create(null);
      }
      __name(ArraySet, "ArraySet");
      ArraySet.fromArray = /* @__PURE__ */ __name(function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet();
        for (var i = 0, len = aArray.length; i < len; i++) {
          set.add(aArray[i], aAllowDuplicates);
        }
        return set;
      }, "ArraySet_fromArray");
      ArraySet.prototype.size = /* @__PURE__ */ __name(function ArraySet_size() {
        return Object.getOwnPropertyNames(this._set).length;
      }, "ArraySet_size");
      ArraySet.prototype.add = /* @__PURE__ */ __name(function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = util.toSetString(aStr);
        var isDuplicate = has.call(this._set, sStr);
        var idx = this._array.length;
        if (!isDuplicate || aAllowDuplicates) {
          this._array.push(aStr);
        }
        if (!isDuplicate) {
          this._set[sStr] = idx;
        }
      }, "ArraySet_add");
      ArraySet.prototype.has = /* @__PURE__ */ __name(function ArraySet_has(aStr) {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }, "ArraySet_has");
      ArraySet.prototype.indexOf = /* @__PURE__ */ __name(function ArraySet_indexOf(aStr) {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
        throw new Error('"' + aStr + '" is not in the set.');
      }, "ArraySet_indexOf");
      ArraySet.prototype.at = /* @__PURE__ */ __name(function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) {
          return this._array[aIdx];
        }
        throw new Error("No element indexed by " + aIdx);
      }, "ArraySet_at");
      ArraySet.prototype.toArray = /* @__PURE__ */ __name(function ArraySet_toArray() {
        return this._array.slice();
      }, "ArraySet_toArray");
      exports.ArraySet = ArraySet;
    }
  });

  // node_modules/source-map/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/source-map/lib/base64.js"(exports) {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number) {
        if (0 <= number && number < intToCharMap.length) {
          return intToCharMap[number];
        }
        throw new TypeError("Must be between 0 and 63: " + number);
      };
      exports.decode = function(charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
          return charCode - bigA;
        }
        if (littleA <= charCode && charCode <= littleZ) {
          return charCode - littleA + littleOffset;
        }
        if (zero <= charCode && charCode <= nine) {
          return charCode - zero + numberOffset;
        }
        if (charCode == plus) {
          return 62;
        }
        if (charCode == slash) {
          return 63;
        }
        return -1;
      };
    }
  });

  // node_modules/source-map/lib/base64-vlq.js
  var require_base64_vlq = __commonJS({
    "node_modules/source-map/lib/base64-vlq.js"(exports) {
      var base64 = require_base64();
      var VLQ_BASE_SHIFT = 5;
      var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
      var VLQ_BASE_MASK = VLQ_BASE - 1;
      var VLQ_CONTINUATION_BIT = VLQ_BASE;
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
      }
      __name(toVLQSigned, "toVLQSigned");
      function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted;
      }
      __name(fromVLQSigned, "fromVLQSigned");
      exports.encode = /* @__PURE__ */ __name(function base64VLQ_encode(aValue) {
        var encoded = "";
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
          digit = vlq & VLQ_BASE_MASK;
          vlq >>>= VLQ_BASE_SHIFT;
          if (vlq > 0) {
            digit |= VLQ_CONTINUATION_BIT;
          }
          encoded += base64.encode(digit);
        } while (vlq > 0);
        return encoded;
      }, "base64VLQ_encode");
      exports.decode = /* @__PURE__ */ __name(function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr.length;
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
          if (aIndex >= strLen) {
            throw new Error("Expected more digits in base 64 VLQ value.");
          }
          digit = base64.decode(aStr.charCodeAt(aIndex++));
          if (digit === -1) {
            throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
          }
          continuation = !!(digit & VLQ_CONTINUATION_BIT);
          digit &= VLQ_BASE_MASK;
          result = result + (digit << shift);
          shift += VLQ_BASE_SHIFT;
        } while (continuation);
        aOutParam.value = fromVLQSigned(result);
        aOutParam.rest = aIndex;
      }, "base64VLQ_decode");
    }
  });

  // node_modules/source-map/lib/quick-sort.js
  var require_quick_sort = __commonJS({
    "node_modules/source-map/lib/quick-sort.js"(exports) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      __name(swap, "swap");
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      __name(randomIntInRange, "randomIntInRange");
      function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator(ary[j], pivot) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator, p, q - 1);
          doQuickSort(ary, comparator, q + 1, r);
        }
      }
      __name(doQuickSort, "doQuickSort");
      exports.quickSort = function(ary, comparator) {
        doQuickSort(ary, comparator, 0, ary.length - 1);
      };
    }
  });

  // node_modules/source-map/lib/source-map-consumer.js
  var require_source_map_consumer = __commonJS({
    "node_modules/source-map/lib/source-map-consumer.js"(exports) {
      var util = require_util();
      var binarySearch = require_binary_search();
      var ArraySet = require_array_set().ArraySet;
      var base64VLQ = require_base64_vlq();
      var quickSort = require_quick_sort().quickSort;
      function SourceMapConsumer(aSourceMap) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
        }
        return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
      }
      __name(SourceMapConsumer, "SourceMapConsumer");
      SourceMapConsumer.fromSourceMap = function(aSourceMap) {
        return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
      };
      SourceMapConsumer.prototype._version = 3;
      SourceMapConsumer.prototype.__generatedMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
        get: function() {
          if (!this.__generatedMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__generatedMappings;
        }
      });
      SourceMapConsumer.prototype.__originalMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
        get: function() {
          if (!this.__originalMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__originalMappings;
        }
      });
      SourceMapConsumer.prototype._charIsMappingSeparator = /* @__PURE__ */ __name(function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr.charAt(index);
        return c === ";" || c === ",";
      }, "SourceMapConsumer_charIsMappingSeparator");
      SourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error("Subclasses must implement _parseMappings");
      }, "SourceMapConsumer_parseMappings");
      SourceMapConsumer.GENERATED_ORDER = 1;
      SourceMapConsumer.ORIGINAL_ORDER = 2;
      SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
      SourceMapConsumer.LEAST_UPPER_BOUND = 2;
      SourceMapConsumer.prototype.eachMapping = /* @__PURE__ */ __name(function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
        var mappings;
        switch (order) {
          case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
          case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
          default:
            throw new Error("Unknown order of iteration.");
        }
        var sourceRoot = this.sourceRoot;
        mappings.map(function(mapping) {
          var source = mapping.source === null ? null : this._sources.at(mapping.source);
          if (source != null && sourceRoot != null) {
            source = util.join(sourceRoot, source);
          }
          return {
            source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
          };
        }, this).forEach(aCallback, context);
      }, "SourceMapConsumer_eachMapping");
      SourceMapConsumer.prototype.allGeneratedPositionsFor = /* @__PURE__ */ __name(function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var line = util.getArg(aArgs, "line");
        var needle = {
          source: util.getArg(aArgs, "source"),
          originalLine: line,
          originalColumn: util.getArg(aArgs, "column", 0)
        };
        if (this.sourceRoot != null) {
          needle.source = util.relative(this.sourceRoot, needle.source);
        }
        if (!this._sources.has(needle.source)) {
          return [];
        }
        needle.source = this._sources.indexOf(needle.source);
        var mappings = [];
        var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (aArgs.column === void 0) {
            var originalLine = mapping.originalLine;
            while (mapping && mapping.originalLine === originalLine) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          } else {
            var originalColumn = mapping.originalColumn;
            while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          }
        }
        return mappings;
      }, "SourceMapConsumer_allGeneratedPositionsFor");
      exports.SourceMapConsumer = SourceMapConsumer;
      function BasicSourceMapConsumer(aSourceMap) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
        }
        var version = util.getArg(sourceMap, "version");
        var sources = util.getArg(sourceMap, "sources");
        var names = util.getArg(sourceMap, "names", []);
        var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
        var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
        var mappings = util.getArg(sourceMap, "mappings");
        var file = util.getArg(sourceMap, "file", null);
        if (version != this._version) {
          throw new Error("Unsupported version: " + version);
        }
        sources = sources.map(String).map(util.normalize).map(function(source) {
          return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
        });
        this._names = ArraySet.fromArray(names.map(String), true);
        this._sources = ArraySet.fromArray(sources, true);
        this.sourceRoot = sourceRoot;
        this.sourcesContent = sourcesContent;
        this._mappings = mappings;
        this.file = file;
      }
      __name(BasicSourceMapConsumer, "BasicSourceMapConsumer");
      BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
      BasicSourceMapConsumer.fromSourceMap = /* @__PURE__ */ __name(function SourceMapConsumer_fromSourceMap(aSourceMap) {
        var smc = Object.create(BasicSourceMapConsumer.prototype);
        var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
        var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
        smc.sourceRoot = aSourceMap._sourceRoot;
        smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
        smc.file = aSourceMap._file;
        var generatedMappings = aSourceMap._mappings.toArray().slice();
        var destGeneratedMappings = smc.__generatedMappings = [];
        var destOriginalMappings = smc.__originalMappings = [];
        for (var i = 0, length = generatedMappings.length; i < length; i++) {
          var srcMapping = generatedMappings[i];
          var destMapping = new Mapping();
          destMapping.generatedLine = srcMapping.generatedLine;
          destMapping.generatedColumn = srcMapping.generatedColumn;
          if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;
            if (srcMapping.name) {
              destMapping.name = names.indexOf(srcMapping.name);
            }
            destOriginalMappings.push(destMapping);
          }
          destGeneratedMappings.push(destMapping);
        }
        quickSort(smc.__originalMappings, util.compareByOriginalPositions);
        return smc;
      }, "SourceMapConsumer_fromSourceMap");
      BasicSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
        get: function() {
          return this._sources.toArray().map(function(s2) {
            return this.sourceRoot != null ? util.join(this.sourceRoot, s2) : s2;
          }, this);
        }
      });
      function Mapping() {
        this.generatedLine = 0;
        this.generatedColumn = 0;
        this.source = null;
        this.originalLine = null;
        this.originalColumn = null;
        this.name = null;
      }
      __name(Mapping, "Mapping");
      BasicSourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr.length;
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;
        while (index < length) {
          if (aStr.charAt(index) === ";") {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
          } else if (aStr.charAt(index) === ",") {
            index++;
          } else {
            mapping = new Mapping();
            mapping.generatedLine = generatedLine;
            for (end = index; end < length; end++) {
              if (this._charIsMappingSeparator(aStr, end)) {
                break;
              }
            }
            str = aStr.slice(index, end);
            segment = cachedSegments[str];
            if (segment) {
              index += str.length;
            } else {
              segment = [];
              while (index < end) {
                base64VLQ.decode(aStr, index, temp);
                value = temp.value;
                index = temp.rest;
                segment.push(value);
              }
              if (segment.length === 2) {
                throw new Error("Found a source, but no line and column");
              }
              if (segment.length === 3) {
                throw new Error("Found a source and line, but no column");
              }
              cachedSegments[str] = segment;
            }
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;
            if (segment.length > 1) {
              mapping.source = previousSource + segment[1];
              previousSource += segment[1];
              mapping.originalLine = previousOriginalLine + segment[2];
              previousOriginalLine = mapping.originalLine;
              mapping.originalLine += 1;
              mapping.originalColumn = previousOriginalColumn + segment[3];
              previousOriginalColumn = mapping.originalColumn;
              if (segment.length > 4) {
                mapping.name = previousName + segment[4];
                previousName += segment[4];
              }
            }
            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === "number") {
              originalMappings.push(mapping);
            }
          }
        }
        quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
        this.__generatedMappings = generatedMappings;
        quickSort(originalMappings, util.compareByOriginalPositions);
        this.__originalMappings = originalMappings;
      }, "SourceMapConsumer_parseMappings");
      BasicSourceMapConsumer.prototype._findMapping = /* @__PURE__ */ __name(function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0) {
          throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
        }
        if (aNeedle[aColumnName] < 0) {
          throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
        }
        return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
      }, "SourceMapConsumer_findMapping");
      BasicSourceMapConsumer.prototype.computeColumnSpans = /* @__PURE__ */ __name(function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this._generatedMappings.length; ++index) {
          var mapping = this._generatedMappings[index];
          if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];
            if (mapping.generatedLine === nextMapping.generatedLine) {
              mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
              continue;
            }
          }
          mapping.lastGeneratedColumn = Infinity;
        }
      }, "SourceMapConsumer_computeColumnSpans");
      BasicSourceMapConsumer.prototype.originalPositionFor = /* @__PURE__ */ __name(function SourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
        if (index >= 0) {
          var mapping = this._generatedMappings[index];
          if (mapping.generatedLine === needle.generatedLine) {
            var source = util.getArg(mapping, "source", null);
            if (source !== null) {
              source = this._sources.at(source);
              if (this.sourceRoot != null) {
                source = util.join(this.sourceRoot, source);
              }
            }
            var name = util.getArg(mapping, "name", null);
            if (name !== null) {
              name = this._names.at(name);
            }
            return {
              source,
              line: util.getArg(mapping, "originalLine", null),
              column: util.getArg(mapping, "originalColumn", null),
              name
            };
          }
        }
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }, "SourceMapConsumer_originalPositionFor");
      BasicSourceMapConsumer.prototype.hasContentsOfAllSources = /* @__PURE__ */ __name(function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this.sourcesContent) {
          return false;
        }
        return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
          return sc == null;
        });
      }, "BasicSourceMapConsumer_hasContentsOfAllSources");
      BasicSourceMapConsumer.prototype.sourceContentFor = /* @__PURE__ */ __name(function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this.sourcesContent) {
          return null;
        }
        if (this.sourceRoot != null) {
          aSource = util.relative(this.sourceRoot, aSource);
        }
        if (this._sources.has(aSource)) {
          return this.sourcesContent[this._sources.indexOf(aSource)];
        }
        var url;
        if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
          var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
          if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
            return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
          }
          if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
            return this.sourcesContent[this._sources.indexOf("/" + aSource)];
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + aSource + '" is not in the SourceMap.');
        }
      }, "SourceMapConsumer_sourceContentFor");
      BasicSourceMapConsumer.prototype.generatedPositionFor = /* @__PURE__ */ __name(function SourceMapConsumer_generatedPositionFor(aArgs) {
        var source = util.getArg(aArgs, "source");
        if (this.sourceRoot != null) {
          source = util.relative(this.sourceRoot, source);
        }
        if (!this._sources.has(source)) {
          return {
            line: null,
            column: null,
            lastColumn: null
          };
        }
        source = this._sources.indexOf(source);
        var needle = {
          source,
          originalLine: util.getArg(aArgs, "line"),
          originalColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (mapping.source === needle.source) {
            return {
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            };
          }
        }
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }, "SourceMapConsumer_generatedPositionFor");
      exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
      function IndexedSourceMapConsumer(aSourceMap) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
        }
        var version = util.getArg(sourceMap, "version");
        var sections = util.getArg(sourceMap, "sections");
        if (version != this._version) {
          throw new Error("Unsupported version: " + version);
        }
        this._sources = new ArraySet();
        this._names = new ArraySet();
        var lastOffset = {
          line: -1,
          column: 0
        };
        this._sections = sections.map(function(s2) {
          if (s2.url) {
            throw new Error("Support for url field in sections not implemented.");
          }
          var offset = util.getArg(s2, "offset");
          var offsetLine = util.getArg(offset, "line");
          var offsetColumn = util.getArg(offset, "column");
          if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
            throw new Error("Section offsets must be ordered and non-overlapping.");
          }
          lastOffset = offset;
          return {
            generatedOffset: {
              generatedLine: offsetLine + 1,
              generatedColumn: offsetColumn + 1
            },
            consumer: new SourceMapConsumer(util.getArg(s2, "map"))
          };
        });
      }
      __name(IndexedSourceMapConsumer, "IndexedSourceMapConsumer");
      IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
      IndexedSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
        get: function() {
          var sources = [];
          for (var i = 0; i < this._sections.length; i++) {
            for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
              sources.push(this._sections[i].consumer.sources[j]);
            }
          }
          return sources;
        }
      });
      IndexedSourceMapConsumer.prototype.originalPositionFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        });
        var section = this._sections[sectionIndex];
        if (!section) {
          return {
            source: null,
            line: null,
            column: null,
            name: null
          };
        }
        return section.consumer.originalPositionFor({
          line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
          column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          bias: aArgs.bias
        });
      }, "IndexedSourceMapConsumer_originalPositionFor");
      IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this._sections.every(function(s2) {
          return s2.consumer.hasContentsOfAllSources();
        });
      }, "IndexedSourceMapConsumer_hasContentsOfAllSources");
      IndexedSourceMapConsumer.prototype.sourceContentFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var content = section.consumer.sourceContentFor(aSource, true);
          if (content) {
            return content;
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + aSource + '" is not in the SourceMap.');
        }
      }, "IndexedSourceMapConsumer_sourceContentFor");
      IndexedSourceMapConsumer.prototype.generatedPositionFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          if (section.consumer.sources.indexOf(util.getArg(aArgs, "source")) === -1) {
            continue;
          }
          var generatedPosition = section.consumer.generatedPositionFor(aArgs);
          if (generatedPosition) {
            var ret = {
              line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
              column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
            return ret;
          }
        }
        return {
          line: null,
          column: null
        };
      }, "IndexedSourceMapConsumer_generatedPositionFor");
      IndexedSourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var sectionMappings = section.consumer._generatedMappings;
          for (var j = 0; j < sectionMappings.length; j++) {
            var mapping = sectionMappings[j];
            var source = section.consumer._sources.at(mapping.source);
            if (section.consumer.sourceRoot !== null) {
              source = util.join(section.consumer.sourceRoot, source);
            }
            this._sources.add(source);
            source = this._sources.indexOf(source);
            var name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
            var adjustedMapping = {
              source,
              generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
              generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
              originalLine: mapping.originalLine,
              originalColumn: mapping.originalColumn,
              name
            };
            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === "number") {
              this.__originalMappings.push(adjustedMapping);
            }
          }
        }
        quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
        quickSort(this.__originalMappings, util.compareByOriginalPositions);
      }, "IndexedSourceMapConsumer_parseMappings");
      exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    }
  });

  // node_modules/stacktrace-gps/stacktrace-gps.js
  var require_stacktrace_gps = __commonJS({
    "node_modules/stacktrace-gps/stacktrace-gps.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define("stacktrace-gps", ["source-map", "stackframe"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(require_source_map_consumer(), require_stackframe());
        } else {
          root.StackTraceGPS = factory(root.SourceMap || root.sourceMap, root.StackFrame);
        }
      })(exports, function(SourceMap, StackFrame) {
        "use strict";
        function _xdr(url) {
          return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open("get", url);
            req.onerror = reject;
            req.onreadystatechange = /* @__PURE__ */ __name(function onreadystatechange() {
              if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 300 || url.substr(0, 7) === "file://" && req.responseText) {
                  resolve(req.responseText);
                } else {
                  reject(new Error("HTTP status: " + req.status + " retrieving " + url));
                }
              }
            }, "onreadystatechange");
            req.send();
          });
        }
        __name(_xdr, "_xdr");
        function _atob(b64str) {
          if (typeof window !== "undefined" && window.atob) {
            return window.atob(b64str);
          } else {
            throw new Error("You must supply a polyfill for window.atob in this environment");
          }
        }
        __name(_atob, "_atob");
        function _parseJson(string) {
          if (typeof JSON !== "undefined" && JSON.parse) {
            return JSON.parse(string);
          } else {
            throw new Error("You must supply a polyfill for JSON.parse in this environment");
          }
        }
        __name(_parseJson, "_parseJson");
        function _findFunctionName(source, lineNumber) {
          var syntaxes = [
            /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,
            /function\s+([^('"`]*?)\s*\(([^)]*)\)/,
            /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
            /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,
            /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/
          ];
          var lines = source.split("\n");
          var code = "";
          var maxLines = Math.min(lineNumber, 20);
          for (var i = 0; i < maxLines; ++i) {
            var line = lines[lineNumber - i - 1];
            var commentPos = line.indexOf("//");
            if (commentPos >= 0) {
              line = line.substr(0, commentPos);
            }
            if (line) {
              code = line + code;
              var len = syntaxes.length;
              for (var index = 0; index < len; index++) {
                var m = syntaxes[index].exec(code);
                if (m && m[1]) {
                  return m[1];
                }
              }
            }
          }
          return void 0;
        }
        __name(_findFunctionName, "_findFunctionName");
        function _ensureSupportedEnvironment() {
          if (typeof Object.defineProperty !== "function" || typeof Object.create !== "function") {
            throw new Error("Unable to consume source maps in older browsers");
          }
        }
        __name(_ensureSupportedEnvironment, "_ensureSupportedEnvironment");
        function _ensureStackFrameIsLegit(stackframe) {
          if (typeof stackframe !== "object") {
            throw new TypeError("Given StackFrame is not an object");
          } else if (typeof stackframe.fileName !== "string") {
            throw new TypeError("Given file name is not a String");
          } else if (typeof stackframe.lineNumber !== "number" || stackframe.lineNumber % 1 !== 0 || stackframe.lineNumber < 1) {
            throw new TypeError("Given line number must be a positive integer");
          } else if (typeof stackframe.columnNumber !== "number" || stackframe.columnNumber % 1 !== 0 || stackframe.columnNumber < 0) {
            throw new TypeError("Given column number must be a non-negative integer");
          }
          return true;
        }
        __name(_ensureStackFrameIsLegit, "_ensureStackFrameIsLegit");
        function _findSourceMappingURL(source) {
          var sourceMappingUrlRegExp = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/mg;
          var lastSourceMappingUrl;
          var matchSourceMappingUrl;
          while (matchSourceMappingUrl = sourceMappingUrlRegExp.exec(source)) {
            lastSourceMappingUrl = matchSourceMappingUrl[1];
          }
          if (lastSourceMappingUrl) {
            return lastSourceMappingUrl;
          } else {
            throw new Error("sourceMappingURL not found");
          }
        }
        __name(_findSourceMappingURL, "_findSourceMappingURL");
        function _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache) {
          return new Promise(function(resolve, reject) {
            var loc = sourceMapConsumer.originalPositionFor({
              line: stackframe.lineNumber,
              column: stackframe.columnNumber
            });
            if (loc.source) {
              var mappedSource = sourceMapConsumer.sourceContentFor(loc.source);
              if (mappedSource) {
                sourceCache[loc.source] = mappedSource;
              }
              resolve(new StackFrame({
                functionName: loc.name || stackframe.functionName,
                args: stackframe.args,
                fileName: loc.source,
                lineNumber: loc.line,
                columnNumber: loc.column
              }));
            } else {
              reject(new Error("Could not get original source for given stackframe and source map"));
            }
          });
        }
        __name(_extractLocationInfoFromSourceMapSource, "_extractLocationInfoFromSourceMapSource");
        return /* @__PURE__ */ __name(function StackTraceGPS(opts) {
          if (!(this instanceof StackTraceGPS)) {
            return new StackTraceGPS(opts);
          }
          opts = opts || {};
          this.sourceCache = opts.sourceCache || {};
          this.sourceMapConsumerCache = opts.sourceMapConsumerCache || {};
          this.ajax = opts.ajax || _xdr;
          this._atob = opts.atob || _atob;
          this._get = /* @__PURE__ */ __name(function _get(location2) {
            return new Promise(function(resolve, reject) {
              var isDataUrl = location2.substr(0, 5) === "data:";
              if (this.sourceCache[location2]) {
                resolve(this.sourceCache[location2]);
              } else if (opts.offline && !isDataUrl) {
                reject(new Error("Cannot make network requests in offline mode"));
              } else {
                if (isDataUrl) {
                  var supportedEncodingRegexp = /^data:application\/json;([\w=:"-]+;)*base64,/;
                  var match = location2.match(supportedEncodingRegexp);
                  if (match) {
                    var sourceMapStart = match[0].length;
                    var encodedSource = location2.substr(sourceMapStart);
                    var source = this._atob(encodedSource);
                    this.sourceCache[location2] = source;
                    resolve(source);
                  } else {
                    reject(new Error("The encoding of the inline sourcemap is not supported"));
                  }
                } else {
                  var xhrPromise = this.ajax(location2, { method: "get" });
                  this.sourceCache[location2] = xhrPromise;
                  xhrPromise.then(resolve, reject);
                }
              }
            }.bind(this));
          }, "_get");
          this._getSourceMapConsumer = /* @__PURE__ */ __name(function _getSourceMapConsumer(sourceMappingURL, defaultSourceRoot) {
            return new Promise(function(resolve) {
              if (this.sourceMapConsumerCache[sourceMappingURL]) {
                resolve(this.sourceMapConsumerCache[sourceMappingURL]);
              } else {
                var sourceMapConsumerPromise = new Promise(function(resolve2, reject) {
                  return this._get(sourceMappingURL).then(function(sourceMapSource) {
                    if (typeof sourceMapSource === "string") {
                      sourceMapSource = _parseJson(sourceMapSource.replace(/^\)\]\}'/, ""));
                    }
                    if (typeof sourceMapSource.sourceRoot === "undefined") {
                      sourceMapSource.sourceRoot = defaultSourceRoot;
                    }
                    resolve2(new SourceMap.SourceMapConsumer(sourceMapSource));
                  }, reject);
                }.bind(this));
                this.sourceMapConsumerCache[sourceMappingURL] = sourceMapConsumerPromise;
                resolve(sourceMapConsumerPromise);
              }
            }.bind(this));
          }, "_getSourceMapConsumer");
          this.pinpoint = /* @__PURE__ */ __name(function StackTraceGPS$$pinpoint(stackframe) {
            return new Promise(function(resolve, reject) {
              this.getMappedLocation(stackframe).then(function(mappedStackFrame) {
                function resolveMappedStackFrame() {
                  resolve(mappedStackFrame);
                }
                __name(resolveMappedStackFrame, "resolveMappedStackFrame");
                this.findFunctionName(mappedStackFrame).then(resolve, resolveMappedStackFrame)["catch"](resolveMappedStackFrame);
              }.bind(this), reject);
            }.bind(this));
          }, "StackTraceGPS$$pinpoint");
          this.findFunctionName = /* @__PURE__ */ __name(function StackTraceGPS$$findFunctionName(stackframe) {
            return new Promise(function(resolve, reject) {
              _ensureStackFrameIsLegit(stackframe);
              this._get(stackframe.fileName).then(/* @__PURE__ */ __name(function getSourceCallback(source) {
                var lineNumber = stackframe.lineNumber;
                var columnNumber = stackframe.columnNumber;
                var guessedFunctionName = _findFunctionName(source, lineNumber, columnNumber);
                if (guessedFunctionName) {
                  resolve(new StackFrame({
                    functionName: guessedFunctionName,
                    args: stackframe.args,
                    fileName: stackframe.fileName,
                    lineNumber,
                    columnNumber
                  }));
                } else {
                  resolve(stackframe);
                }
              }, "getSourceCallback"), reject)["catch"](reject);
            }.bind(this));
          }, "StackTraceGPS$$findFunctionName");
          this.getMappedLocation = /* @__PURE__ */ __name(function StackTraceGPS$$getMappedLocation(stackframe) {
            return new Promise(function(resolve, reject) {
              _ensureSupportedEnvironment();
              _ensureStackFrameIsLegit(stackframe);
              var sourceCache = this.sourceCache;
              var fileName = stackframe.fileName;
              this._get(fileName).then(function(source) {
                var sourceMappingURL = _findSourceMappingURL(source);
                var isDataUrl = sourceMappingURL.substr(0, 5) === "data:";
                var defaultSourceRoot = fileName.substring(0, fileName.lastIndexOf("/") + 1);
                if (sourceMappingURL[0] !== "/" && !isDataUrl && !/^https?:\/\/|^\/\//i.test(sourceMappingURL)) {
                  sourceMappingURL = defaultSourceRoot + sourceMappingURL;
                }
                return this._getSourceMapConsumer(sourceMappingURL, defaultSourceRoot).then(function(sourceMapConsumer) {
                  return _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache).then(resolve)["catch"](function() {
                    resolve(stackframe);
                  });
                });
              }.bind(this), reject)["catch"](reject);
            }.bind(this));
          }, "StackTraceGPS$$getMappedLocation");
        }, "StackTraceGPS");
      });
    }
  });

  // node_modules/stacktrace-js/stacktrace.js
  var require_stacktrace = __commonJS({
    "node_modules/stacktrace-js/stacktrace.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define("stacktrace", ["error-stack-parser", "stack-generator", "stacktrace-gps"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(require_error_stack_parser(), require_stack_generator(), require_stacktrace_gps());
        } else {
          root.StackTrace = factory(root.ErrorStackParser, root.StackGenerator, root.StackTraceGPS);
        }
      })(exports, /* @__PURE__ */ __name(function StackTrace2(ErrorStackParser, StackGenerator, StackTraceGPS) {
        var _options = {
          filter: function(stackframe) {
            return (stackframe.functionName || "").indexOf("StackTrace$$") === -1 && (stackframe.functionName || "").indexOf("ErrorStackParser$$") === -1 && (stackframe.functionName || "").indexOf("StackTraceGPS$$") === -1 && (stackframe.functionName || "").indexOf("StackGenerator$$") === -1;
          },
          sourceCache: {}
        };
        var _generateError = /* @__PURE__ */ __name(function StackTrace$$GenerateError() {
          try {
            throw new Error();
          } catch (err) {
            return err;
          }
        }, "StackTrace$$GenerateError");
        function _merge(first, second) {
          var target = {};
          [first, second].forEach(function(obj) {
            for (var prop in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                target[prop] = obj[prop];
              }
            }
            return target;
          });
          return target;
        }
        __name(_merge, "_merge");
        function _isShapedLikeParsableError(err) {
          return err.stack || err["opera#sourceloc"];
        }
        __name(_isShapedLikeParsableError, "_isShapedLikeParsableError");
        function _filtered(stackframes, filter) {
          if (typeof filter === "function") {
            return stackframes.filter(filter);
          }
          return stackframes;
        }
        __name(_filtered, "_filtered");
        return {
          get: /* @__PURE__ */ __name(function StackTrace$$get(opts) {
            var err = _generateError();
            return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
          }, "StackTrace$$get"),
          getSync: /* @__PURE__ */ __name(function StackTrace$$getSync(opts) {
            opts = _merge(_options, opts);
            var err = _generateError();
            var stack = _isShapedLikeParsableError(err) ? ErrorStackParser.parse(err) : StackGenerator.backtrace(opts);
            return _filtered(stack, opts.filter);
          }, "StackTrace$$getSync"),
          fromError: /* @__PURE__ */ __name(function StackTrace$$fromError(error, opts) {
            opts = _merge(_options, opts);
            var gps = new StackTraceGPS(opts);
            return new Promise(function(resolve) {
              var stackframes = _filtered(ErrorStackParser.parse(error), opts.filter);
              resolve(Promise.all(stackframes.map(function(sf) {
                return new Promise(function(resolve2) {
                  function resolveOriginal() {
                    resolve2(sf);
                  }
                  __name(resolveOriginal, "resolveOriginal");
                  gps.pinpoint(sf).then(resolve2, resolveOriginal)["catch"](resolveOriginal);
                });
              })));
            }.bind(this));
          }, "StackTrace$$fromError"),
          generateArtificially: /* @__PURE__ */ __name(function StackTrace$$generateArtificially(opts) {
            opts = _merge(_options, opts);
            var stackFrames = StackGenerator.backtrace(opts);
            if (typeof opts.filter === "function") {
              stackFrames = stackFrames.filter(opts.filter);
            }
            return Promise.resolve(stackFrames);
          }, "StackTrace$$generateArtificially"),
          instrument: /* @__PURE__ */ __name(function StackTrace$$instrument(fn, callback, errback, thisArg) {
            if (typeof fn !== "function") {
              throw new Error("Cannot instrument non-function object");
            } else if (typeof fn.__stacktraceOriginalFn === "function") {
              return fn;
            }
            var instrumented = (/* @__PURE__ */ __name(function StackTrace$$instrumented() {
              try {
                this.get().then(callback, errback)["catch"](errback);
                return fn.apply(thisArg || this, arguments);
              } catch (e) {
                if (_isShapedLikeParsableError(e)) {
                  this.fromError(e).then(callback, errback)["catch"](errback);
                }
                throw e;
              }
            }, "StackTrace$$instrumented")).bind(this);
            instrumented.__stacktraceOriginalFn = fn;
            return instrumented;
          }, "StackTrace$$instrument"),
          deinstrument: /* @__PURE__ */ __name(function StackTrace$$deinstrument(fn) {
            if (typeof fn !== "function") {
              throw new Error("Cannot de-instrument non-function object");
            } else if (typeof fn.__stacktraceOriginalFn === "function") {
              return fn.__stacktraceOriginalFn;
            } else {
              return fn;
            }
          }, "StackTrace$$deinstrument"),
          report: /* @__PURE__ */ __name(function StackTrace$$report(stackframes, url, errorMsg, requestOptions) {
            return new Promise(function(resolve, reject) {
              var req = new XMLHttpRequest();
              req.onerror = reject;
              req.onreadystatechange = /* @__PURE__ */ __name(function onreadystatechange() {
                if (req.readyState === 4) {
                  if (req.status >= 200 && req.status < 400) {
                    resolve(req.responseText);
                  } else {
                    reject(new Error("POST to " + url + " failed with status: " + req.status));
                  }
                }
              }, "onreadystatechange");
              req.open("post", url);
              req.setRequestHeader("Content-Type", "application/json");
              if (requestOptions && typeof requestOptions.headers === "object") {
                var headers = requestOptions.headers;
                for (var header in headers) {
                  if (Object.prototype.hasOwnProperty.call(headers, header)) {
                    req.setRequestHeader(header, headers[header]);
                  }
                }
              }
              var reportPayload = { stack: stackframes };
              if (errorMsg !== void 0 && errorMsg !== null) {
                reportPayload.message = errorMsg;
              }
              req.send(JSON.stringify(reportPayload));
            });
          }, "StackTrace$$report")
        };
      }, "StackTrace"));
    }
  });

  // helper.js
  var import_stacktrace_js = __toModule(require_stacktrace());

  // node_modules/kaboom/dist/kaboom.mjs
  var ht = Object.defineProperty;
  var Qr = Object.defineProperties;
  var Jr = Object.getOwnPropertyDescriptors;
  var mt = Object.getOwnPropertySymbols;
  var Hr = Object.prototype.hasOwnProperty;
  var Kr = Object.prototype.propertyIsEnumerable;
  var Ke = /* @__PURE__ */ __name((e, r, t) => r in e ? ht(e, r, { enumerable: true, configurable: true, writable: true, value: t }) : e[r] = t, "Ke");
  var ve = /* @__PURE__ */ __name((e, r) => {
    for (var t in r || (r = {}))
      Hr.call(r, t) && Ke(e, t, r[t]);
    if (mt)
      for (var t of mt(r))
        Kr.call(r, t) && Ke(e, t, r[t]);
    return e;
  }, "ve");
  var Be = /* @__PURE__ */ __name((e, r) => Qr(e, Jr(r)), "Be");
  var s = /* @__PURE__ */ __name((e, r) => ht(e, "name", { value: r, configurable: true }), "s");
  var N = /* @__PURE__ */ __name((e, r) => () => (e && (r = e(e = 0)), r), "N");
  var en = /* @__PURE__ */ __name((e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports), "en");
  var ft = /* @__PURE__ */ __name((e, r, t) => (Ke(e, typeof r != "symbol" ? r + "" : r, t), t), "ft");
  var pt = /* @__PURE__ */ __name((e, r, t) => new Promise((u, f) => {
    var v = /* @__PURE__ */ __name((b) => {
      try {
        w(t.next(b));
      } catch (C) {
        f(C);
      }
    }, "v"), g = /* @__PURE__ */ __name((b) => {
      try {
        w(t.throw(b));
      } catch (C) {
        f(C);
      }
    }, "g"), w = /* @__PURE__ */ __name((b) => b.done ? u(b.value) : Promise.resolve(b.value).then(v, g), "w");
    w((t = t.apply(e, r)).next());
  }), "pt");
  var Ut = (() => {
    for (var e = new Uint8Array(128), r = 0; r < 64; r++)
      e[r < 26 ? r + 65 : r < 52 ? r + 71 : r < 62 ? r - 4 : r * 4 - 205] = r;
    return (t) => {
      for (var u = t.length, f = new Uint8Array((u - (t[u - 1] == "=") - (t[u - 2] == "=")) * 3 / 4 | 0), v = 0, g = 0; v < u; ) {
        var w = e[t.charCodeAt(v++)], b = e[t.charCodeAt(v++)], C = e[t.charCodeAt(v++)], P = e[t.charCodeAt(v++)];
        f[g++] = w << 2 | b >> 4, f[g++] = b << 4 | C >> 2, f[g++] = C << 6 | P;
      }
      return f;
    };
  })();
  function Ve(e) {
    return e * Math.PI / 180;
  }
  __name(Ve, "Ve");
  function et(e) {
    return e * 180 / Math.PI;
  }
  __name(et, "et");
  function le(e, r, t) {
    return r > t ? le(e, t, r) : Math.min(Math.max(e, r), t);
  }
  __name(le, "le");
  function qe(e, r, t) {
    return e + (r - e) * t;
  }
  __name(qe, "qe");
  function Ie(e, r, t, u, f) {
    return u + (e - r) / (t - r) * (f - u);
  }
  __name(Ie, "Ie");
  function bt(e, r, t, u, f) {
    return le(Ie(e, r, t, u, f), u, f);
  }
  __name(bt, "bt");
  function l(...e) {
    if (e.length === 0)
      return l(0, 0);
    if (e.length === 1) {
      if (typeof e[0] == "number")
        return l(e[0], e[0]);
      if (_e(e[0]))
        return l(e[0].x, e[0].y);
      if (Array.isArray(e[0]) && e[0].length === 2)
        return l.apply(null, e[0]);
    }
    return { x: e[0], y: e[1], clone() {
      return l(this.x, this.y);
    }, add(...r) {
      let t = l(...r);
      return l(this.x + t.x, this.y + t.y);
    }, sub(...r) {
      let t = l(...r);
      return l(this.x - t.x, this.y - t.y);
    }, scale(...r) {
      let t = l(...r);
      return l(this.x * t.x, this.y * t.y);
    }, dist(...r) {
      let t = l(...r);
      return Math.sqrt((this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y));
    }, len() {
      return this.dist(l(0, 0));
    }, unit() {
      return this.scale(1 / this.len());
    }, normal() {
      return l(this.y, -this.x);
    }, dot(r) {
      return this.x * r.x + this.y * r.y;
    }, angle(...r) {
      let t = l(...r);
      return et(Math.atan2(this.y - t.y, this.x - t.x));
    }, lerp(r, t) {
      return l(qe(this.x, r.x, t), qe(this.y, r.y, t));
    }, toFixed(r) {
      return l(this.x.toFixed(r), this.y.toFixed(r));
    }, eq(r) {
      return this.x === r.x && this.y === r.y;
    }, str() {
      return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    } };
  }
  __name(l, "l");
  function $e(e) {
    let r = Ve(e);
    return l(Math.cos(r), Math.sin(r));
  }
  __name($e, "$e");
  function fe(e, r, t) {
    return { x: e, y: r, z: t, xy() {
      return l(this.x, this.y);
    } };
  }
  __name(fe, "fe");
  function _e(e) {
    return e !== void 0 && e.x !== void 0 && e.y !== void 0;
  }
  __name(_e, "_e");
  function yt(e) {
    return e !== void 0 && e.x !== void 0 && e.y !== void 0 && e.z !== void 0;
  }
  __name(yt, "yt");
  function De(e) {
    return e !== void 0 && e.r !== void 0 && e.g !== void 0 && e.b !== void 0 && e.a !== void 0;
  }
  __name(De, "De");
  function gt(e) {
    if (e !== void 0 && Array.isArray(e.m) && e.m.length === 16)
      return e;
  }
  __name(gt, "gt");
  function ce(...e) {
    if (e.length === 0)
      return Q();
    if (e.length === 1) {
      if (De(e[0]))
        return Q(e[0]);
      if (Array.isArray(e[0]) && e[0].length === 3)
        return ce.apply(null, e[0]);
    }
    return Q(e[0], e[1], e[2], 1);
  }
  __name(ce, "ce");
  function Q(...e) {
    var r;
    if (e.length === 0)
      return Q(255, 255, 255, 1);
    if (e.length === 1) {
      if (De(e[0]))
        return Q(e[0].r, e[0].g, e[0].b, e[0].a);
      if (Array.isArray(e[0]) && e[0].length === 3 || e[0].length === 4)
        return Q.apply(null, e[0]);
    }
    return { r: e[0], g: e[1], b: e[2], a: (r = e[3]) != null ? r : 1, clone() {
      return Q(this.r, this.g, this.b, this.a);
    }, lighten(t) {
      return Q(this.r + t, this.g + t, this.b + t, this.a);
    }, darken(t) {
      return this.lighten(-t);
    }, invert() {
      return Q(255 - this.r, 255 - this.g, 255 - this.b, this.a);
    }, isDark(t = 0.5) {
      return this.r + this.g + this.b < 3 * t;
    }, isLight(t = 0.5) {
      return this.r + this.g + this.b > 3 * t;
    }, eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.g && this.a === t.a;
    } };
  }
  __name(Q, "Q");
  function se(e, r, t, u) {
    return { x: e, y: r, w: t, h: u, scale(f) {
      return se(this.x + this.w * f.x, this.y + this.h * f.y, this.w * f.w, this.h * f.h);
    }, clone() {
      return se(this.x, this.y, this.w, this.h);
    }, eq(f) {
      return this.x === f.x && this.y === f.y && this.w === f.w && this.h === f.h;
    } };
  }
  __name(se, "se");
  function te(e) {
    return { m: e ? [...e] : [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], clone() {
      return te(this.m);
    }, mult(r) {
      let t = [];
      for (let u = 0; u < 4; u++)
        for (let f = 0; f < 4; f++)
          t[u * 4 + f] = this.m[0 * 4 + f] * r.m[u * 4 + 0] + this.m[1 * 4 + f] * r.m[u * 4 + 1] + this.m[2 * 4 + f] * r.m[u * 4 + 2] + this.m[3 * 4 + f] * r.m[u * 4 + 3];
      return te(t);
    }, multVec4(r) {
      return { x: r.x * this.m[0] + r.y * this.m[4] + r.z * this.m[8] + r.w * this.m[12], y: r.x * this.m[1] + r.y * this.m[5] + r.z * this.m[9] + r.w * this.m[13], z: r.x * this.m[2] + r.y * this.m[6] + r.z * this.m[10] + r.w * this.m[14], w: r.x * this.m[3] + r.y * this.m[7] + r.z * this.m[11] + r.w * this.m[15] };
    }, multVec3(r) {
      let t = this.multVec4({ x: r.x, y: r.y, z: r.z, w: 1 });
      return fe(t.x, t.y, t.z);
    }, multVec2(r) {
      return l(r.x * this.m[0] + r.y * this.m[4] + 0 * this.m[8] + 1 * this.m[12], r.x * this.m[1] + r.y * this.m[5] + 0 * this.m[9] + 1 * this.m[13]);
    }, translate(r) {
      return this.mult(te([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, r.x, r.y, 0, 1]));
    }, scale(r) {
      return this.mult(te([r.x, 0, 0, 0, 0, r.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    }, rotateX(r) {
      return r = Ve(r), this.mult(te([1, 0, 0, 0, 0, Math.cos(r), -Math.sin(r), 0, 0, Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1]));
    }, rotateY(r) {
      return r = Ve(r), this.mult(te([Math.cos(r), 0, -Math.sin(r), 0, 0, 1, 0, 0, Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1]));
    }, rotateZ(r) {
      return r = Ve(r), this.mult(te([Math.cos(r), -Math.sin(r), 0, 0, Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    }, invert() {
      let r = [], t = this.m[10] * this.m[15] - this.m[14] * this.m[11], u = this.m[9] * this.m[15] - this.m[13] * this.m[11], f = this.m[9] * this.m[14] - this.m[13] * this.m[10], v = this.m[8] * this.m[15] - this.m[12] * this.m[11], g = this.m[8] * this.m[14] - this.m[12] * this.m[10], w = this.m[8] * this.m[13] - this.m[12] * this.m[9], b = this.m[6] * this.m[15] - this.m[14] * this.m[7], C = this.m[5] * this.m[15] - this.m[13] * this.m[7], P = this.m[5] * this.m[14] - this.m[13] * this.m[6], S = this.m[4] * this.m[15] - this.m[12] * this.m[7], B = this.m[4] * this.m[14] - this.m[12] * this.m[6], T = this.m[5] * this.m[15] - this.m[13] * this.m[7], Y = this.m[4] * this.m[13] - this.m[12] * this.m[5], W = this.m[6] * this.m[11] - this.m[10] * this.m[7], G = this.m[5] * this.m[11] - this.m[9] * this.m[7], q = this.m[5] * this.m[10] - this.m[9] * this.m[6], L = this.m[4] * this.m[11] - this.m[8] * this.m[7], Z = this.m[4] * this.m[10] - this.m[8] * this.m[6], M = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      r[0] = this.m[5] * t - this.m[6] * u + this.m[7] * f, r[4] = -(this.m[4] * t - this.m[6] * v + this.m[7] * g), r[8] = this.m[4] * u - this.m[5] * v + this.m[7] * w, r[12] = -(this.m[4] * f - this.m[5] * g + this.m[6] * w), r[1] = -(this.m[1] * t - this.m[2] * u + this.m[3] * f), r[5] = this.m[0] * t - this.m[2] * v + this.m[3] * g, r[9] = -(this.m[0] * u - this.m[1] * v + this.m[3] * w), r[13] = this.m[0] * f - this.m[1] * g + this.m[2] * w, r[2] = this.m[1] * b - this.m[2] * C + this.m[3] * P, r[6] = -(this.m[0] * b - this.m[2] * S + this.m[3] * B), r[10] = this.m[0] * T - this.m[1] * S + this.m[3] * Y, r[14] = -(this.m[0] * P - this.m[1] * B + this.m[2] * Y), r[3] = -(this.m[1] * W - this.m[2] * G + this.m[3] * q), r[7] = this.m[0] * W - this.m[2] * L + this.m[3] * Z, r[11] = -(this.m[0] * G - this.m[1] * L + this.m[3] * M), r[15] = this.m[0] * q - this.m[1] * Z + this.m[2] * M;
      let d = this.m[0] * r[0] + this.m[1] * r[4] + this.m[2] * r[8] + this.m[3] * r[12];
      for (let K = 0; K < 4; K++)
        for (let ie = 0; ie < 4; ie++)
          r[K * 4 + ie] *= 1 / d;
      return te(r);
    } };
  }
  __name(te, "te");
  function xt(e, r, t) {
    return e + (Math.sin(t) + 1) / 2 * (r - e);
  }
  __name(xt, "xt");
  function rt(e) {
    return { seed: e, gen(...r) {
      if (r.length === 0)
        return this.seed = (tn * this.seed + rn) % vt, this.seed / vt;
      if (r.length === 1) {
        if (typeof r[0] == "number")
          return this.gen(0, r[0]);
        if (_e(r[0]))
          return this.gen(l(0, 0), r[0]);
        if (De(r[0]))
          return this.gen(Q(0, 0, 0, 0), r[0]);
      } else if (r.length === 2) {
        if (typeof r[0] == "number" && typeof r[1] == "number")
          return this.gen() * (r[1] - r[0]) + r[0];
        if (_e(r[0]) && _e(r[1]))
          return l(this.gen(r[0].x, r[1].x), this.gen(r[0].y, r[1].y));
        if (De(r[0]) && De(r[1]))
          return Q(this.gen(r[0].r, r[1].r), this.gen(r[0].g, r[1].g), this.gen(r[0].b, r[1].b), this.gen(r[0].a, r[1].a));
      }
    } };
  }
  __name(rt, "rt");
  function wt(e) {
    return e != null && (tt.seed = e), tt.seed;
  }
  __name(wt, "wt");
  function Fe(...e) {
    return tt.gen(...e);
  }
  __name(Fe, "Fe");
  function Et(e) {
    return Fe() <= e;
  }
  __name(Et, "Et");
  function Ct(e) {
    return e[Math.floor(Fe(e.length))];
  }
  __name(Ct, "Ct");
  function nt(e, r) {
    return e.p2.x >= r.p1.x && e.p1.x <= r.p2.x && e.p2.y >= r.p1.y && e.p1.y <= r.p2.y;
  }
  __name(nt, "nt");
  function Bt(e, r) {
    return e.p2.x > r.p1.x && e.p1.x < r.p2.x && e.p2.y > r.p1.y && e.p1.y < r.p2.y;
  }
  __name(Bt, "Bt");
  function Dt(e, r) {
    return r.x >= e.p1.x && r.x <= e.p2.x && r.y >= e.p1.y && r.y < e.p2.y;
  }
  __name(Dt, "Dt");
  var tn;
  var rn;
  var vt;
  var tt;
  var Se = N(() => {
    s(Ve, "deg2rad");
    s(et, "rad2deg");
    s(le, "clamp");
    s(qe, "lerp");
    s(Ie, "map");
    s(bt, "mapc");
    s(l, "vec2");
    s($e, "dir");
    s(fe, "vec3");
    s(_e, "isVec2");
    s(yt, "isVec3");
    s(De, "isColor");
    s(gt, "isMat4");
    s(ce, "rgb");
    s(Q, "rgba");
    s(se, "quad");
    s(te, "mat4");
    s(xt, "wave");
    tn = 1103515245, rn = 12345, vt = 2147483648, tt = rt(Date.now());
    s(rt, "rng");
    s(wt, "randSeed");
    s(Fe, "rand");
    s(Et, "chance");
    s(Ct, "choose");
    s(nt, "colRectRect");
    s(Bt, "overlapRectRect");
    s(Dt, "colRectPt");
  });
  function st(e, r) {
    let t = typeof e, u = typeof r;
    if (t !== u)
      return false;
    if (t === "object" && u === "object") {
      let f = Object.keys(e), v = Object.keys(r);
      if (f.length !== v.length)
        return false;
      for (let g of f) {
        let w = e[g], b = r[g];
        if (!(typeof w == "function" && typeof b == "function") && !st(w, b))
          return false;
      }
      return true;
    }
    return e === r;
  }
  __name(st, "st");
  var St = N(() => {
    s(st, "deepEq");
  });
  function Pe(e) {
    switch (e) {
      case "topleft":
        return l(-1, -1);
      case "top":
        return l(0, -1);
      case "topright":
        return l(1, -1);
      case "left":
        return l(-1, 0);
      case "center":
        return l(0, 0);
      case "right":
        return l(1, 0);
      case "botleft":
        return l(-1, 1);
      case "bot":
        return l(0, 1);
      case "botright":
        return l(1, 1);
      default:
        return e;
    }
  }
  __name(Pe, "Pe");
  function Tt(e, r) {
    let t = (() => {
      var z;
      let h = v(it, ot), p = f(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), y = (z = r.clearColor) != null ? z : Q(0, 0, 0, 1);
      e.clearColor(y.r / 255, y.g / 255, y.b / 255, y.a), e.enable(e.BLEND), e.enable(e.SCISSOR_TEST), e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
      let D = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, D), e.bufferData(e.ARRAY_BUFFER, je * 4, e.DYNAMIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, null);
      let k = e.createBuffer();
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, k), e.bufferData(e.ELEMENT_ARRAY_BUFFER, je * 2, e.DYNAMIC_DRAW), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null);
      let _ = f(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { drawCalls: 0, lastDrawCalls: 0, defProg: h, curProg: h, defTex: p, curTex: p, curUniform: {}, vbuf: D, ibuf: k, vqueue: [], iqueue: [], transform: te(), transformStack: [], clearColor: y, bgTex: _, width: r.width, height: r.height };
    })();
    function u(h) {
      return Math.log(h) / Math.log(2) % 1 == 0;
    }
    __name(u, "u");
    s(u, "powerOfTwo");
    function f(h, p = {}) {
      let y = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, y), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, h);
      let D = (() => {
        var _;
        switch ((_ = p.filter) != null ? _ : r.texFilter) {
          case "linear":
            return e.LINEAR;
          case "nearest":
            return e.NEAREST;
          default:
            return e.NEAREST;
        }
      })(), k = (() => {
        switch (p.wrap) {
          case "repeat":
            return e.REPEAT;
          case "clampToEdge":
            return e.CLAMP_TO_EDGE;
          default:
            return e.CLAMP_TO_EDGE;
        }
      })();
      return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, D), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, D), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, k), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, k), e.bindTexture(e.TEXTURE_2D, null), { width: h.width, height: h.height, bind() {
        e.bindTexture(e.TEXTURE_2D, y);
      }, unbind() {
        e.bindTexture(e.TEXTURE_2D, null);
      } };
    }
    __name(f, "f");
    s(f, "makeTex");
    function v(h = it, p = ot) {
      let y, D = nn.replace("{{user}}", h != null ? h : it), k = sn.replace("{{user}}", p != null ? p : ot), _ = e.createShader(e.VERTEX_SHADER), z = e.createShader(e.FRAGMENT_SHADER);
      if (e.shaderSource(_, D), e.shaderSource(z, k), e.compileShader(_), e.compileShader(z), y = e.getShaderInfoLog(_))
        throw new Error(y);
      if (y = e.getShaderInfoLog(z))
        throw new Error(y);
      let I = e.createProgram();
      if (e.attachShader(I, _), e.attachShader(I, z), e.bindAttribLocation(I, 0, "a_pos"), e.bindAttribLocation(I, 1, "a_uv"), e.bindAttribLocation(I, 2, "a_color"), e.linkProgram(I), (y = e.getProgramInfoLog(I)) && y !== `
`)
        throw new Error(y);
      return { bind() {
        e.useProgram(I);
      }, unbind() {
        e.useProgram(null);
      }, bindAttribs() {
        e.vertexAttribPointer(0, 3, e.FLOAT, false, Me * 4, 0), e.enableVertexAttribArray(0), e.vertexAttribPointer(1, 2, e.FLOAT, false, Me * 4, 12), e.enableVertexAttribArray(1), e.vertexAttribPointer(2, 4, e.FLOAT, false, Me * 4, 20), e.enableVertexAttribArray(2);
      }, send(A) {
        this.bind();
        for (let $ in A) {
          let X = A[$], j = e.getUniformLocation(I, $);
          typeof X == "number" ? e.uniform1f(j, X) : gt(X) ? e.uniformMatrix4fv(j, false, new Float32Array(X.m)) : De(X) ? e.uniform4f(j, X.r, X.g, X.b, X.a) : yt(X) ? e.uniform3f(j, X.x, X.y, X.z) : _e(X) && e.uniform2f(j, X.x, X.y);
        }
        this.unbind();
      } };
    }
    __name(v, "v");
    s(v, "makeProgram");
    function g(h, p, y, D) {
      let k = h.width / p, _ = h.height / y, z = 1 / k, I = 1 / _, A = {}, $ = D.split("").entries();
      for (let [X, j] of $)
        A[j] = l(X % k * z, Math.floor(X / k) * I);
      return { tex: h, map: A, qw: z, qh: I };
    }
    __name(g, "g");
    s(g, "makeFont");
    function w(h, p, y = t.defTex, D = t.defProg, k = {}) {
      y = y != null ? y : t.defTex, D = D != null ? D : t.defProg, (y !== t.curTex || D !== t.curProg || !st(t.curUniform, k) || t.vqueue.length + h.length * Me > je || t.iqueue.length + p.length > je) && b(), t.curTex = y, t.curProg = D, t.curUniform = k;
      let _ = p.map((I) => I + t.vqueue.length / Me), z = h.map((I) => {
        let A = B(t.transform.multVec2(I.pos.xy()));
        return [A.x, A.y, I.pos.z, I.uv.x, I.uv.y, I.color.r / 255, I.color.g / 255, I.color.b / 255, I.color.a];
      }).flat();
      _.forEach((I) => t.iqueue.push(I)), z.forEach((I) => t.vqueue.push(I));
    }
    __name(w, "w");
    s(w, "drawRaw");
    function b() {
      !t.curTex || !t.curProg || t.vqueue.length === 0 || t.iqueue.length === 0 || (t.curProg.send(t.curUniform), e.bindBuffer(e.ARRAY_BUFFER, t.vbuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(t.vqueue)), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.ibuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(t.iqueue)), t.curProg.bind(), t.curProg.bindAttribs(), t.curTex.bind(), e.drawElements(e.TRIANGLES, t.iqueue.length, e.UNSIGNED_SHORT, 0), t.curTex.unbind(), t.curProg.unbind(), e.bindBuffer(e.ARRAY_BUFFER, null), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null), t.iqueue = [], t.vqueue = [], t.drawCalls++);
    }
    __name(b, "b");
    s(b, "flush");
    function C() {
      e.clear(e.COLOR_BUFFER_BIT), r.clearColor || d({ width: Ue(), height: he(), quad: se(0, 0, Ue() * me() / Pt, he() * me() / Pt), tex: t.bgTex }), t.drawCalls = 0, t.transformStack = [], t.transform = te();
    }
    __name(C, "C");
    s(C, "frameStart");
    function P() {
      b(), t.lastDrawCalls = t.drawCalls;
    }
    __name(P, "P");
    s(P, "frameEnd");
    function S() {
      return t.lastDrawCalls;
    }
    __name(S, "S");
    s(S, "drawCalls");
    function B(h) {
      return l(h.x / Ue() * 2 - 1, -h.y / he() * 2 + 1);
    }
    __name(B, "B");
    s(B, "toNDC");
    function T(h) {
      t.transform = h.clone();
    }
    __name(T, "T");
    s(T, "pushMatrix");
    function Y(h) {
      !h || h.x === 0 && h.y === 0 || (t.transform = t.transform.translate(h));
    }
    __name(Y, "Y");
    s(Y, "pushTranslate");
    function W(h) {
      !h || h.x === 1 && h.y === 1 || (t.transform = t.transform.scale(h));
    }
    __name(W, "W");
    s(W, "pushScale");
    function G(h) {
      !h || (t.transform = t.transform.rotateX(h));
    }
    __name(G, "G");
    s(G, "pushRotateX");
    function q(h) {
      !h || (t.transform = t.transform.rotateY(h));
    }
    __name(q, "q");
    s(q, "pushRotateY");
    function L(h) {
      !h || (t.transform = t.transform.rotateZ(h));
    }
    __name(L, "L");
    s(L, "pushRotateZ");
    function Z() {
      t.transformStack.push(t.transform.clone());
    }
    __name(Z, "Z");
    s(Z, "pushTransform");
    function M() {
      t.transformStack.length > 0 && (t.transform = t.transformStack.pop());
    }
    __name(M, "M");
    s(M, "popTransform");
    function d(h = {}) {
      var j, ee;
      let p = h.width || 0, y = h.height || 0, D = h.pos || l(0, 0), _ = Pe(h.origin || Ne).scale(l(p, y).scale(-0.5)), z = l((j = h.scale) != null ? j : 1), I = h.rot || 0, A = h.quad || se(0, 0, 1, 1), $ = 1 - ((ee = h.z) != null ? ee : 0), X = h.color || ce();
      Z(), Y(D), L(I), W(z), Y(_), w([{ pos: fe(-p / 2, y / 2, $), uv: l(h.flipX ? A.x + A.w : A.x, h.flipY ? A.y : A.y + A.h), color: X }, { pos: fe(-p / 2, -y / 2, $), uv: l(h.flipX ? A.x + A.w : A.x, h.flipY ? A.y + A.h : A.y), color: X }, { pos: fe(p / 2, -y / 2, $), uv: l(h.flipX ? A.x : A.x + A.w, h.flipY ? A.y + A.h : A.y), color: X }, { pos: fe(p / 2, y / 2, $), uv: l(h.flipX ? A.x : A.x + A.w, h.flipY ? A.y : A.y + A.h), color: X }], [0, 1, 3, 1, 2, 3], h.tex, h.prog, h.uniform), M();
    }
    __name(d, "d");
    s(d, "drawQuad");
    function K(h, p = {}) {
      var z;
      let y = (z = p.quad) != null ? z : se(0, 0, 1, 1), D = h.width * y.w, k = h.height * y.h, _ = l(1);
      if (p.tiled) {
        let I = Math.ceil((p.width || D) / D), A = Math.ceil((p.height || k) / k), X = Pe(p.origin || Ne).add(l(1, 1)).scale(0.5).scale(I * D, A * k);
        for (let j = 0; j < I; j++)
          for (let ee = 0; ee < A; ee++)
            d(Be(ve({}, p), { pos: (p.pos || l(0)).add(l(D * j, k * ee)).sub(X), scale: _.scale(p.scale || l(1)), tex: h, quad: y, width: D, height: k, origin: "topleft" }));
      } else
        p.width && p.height ? (_.x = p.width / D, _.y = p.height / k) : p.width ? (_.x = p.width / D, _.y = _.x) : p.height && (_.y = p.height / k, _.x = _.y), d(Be(ve({}, p), { scale: _.scale(p.scale || l(1)), tex: h, quad: y, width: D, height: k }));
    }
    __name(K, "K");
    s(K, "drawTexture");
    function ie(h, p, y, D = {}) {
      d(Be(ve({}, D), { pos: h, width: p, height: y }));
    }
    __name(ie, "ie");
    s(ie, "drawRect");
    function pe(h, p, y, D = {}) {
      if (D.scale) {
        let $ = l(D.scale);
        p = p * $.x, y = y * $.y, D.scale = 1;
      }
      let k = Pe(D.origin || Ne).scale(l(p, y)).scale(0.5), _ = h.add(l(-p / 2, -y / 2)).sub(k), z = h.add(l(-p / 2, y / 2)).sub(k), I = h.add(l(p / 2, y / 2)).sub(k), A = h.add(l(p / 2, -y / 2)).sub(k);
      oe(_, z, D), oe(z, I, D), oe(I, A, D), oe(A, _, D);
    }
    __name(pe, "pe");
    s(pe, "drawRectStroke");
    function oe(h, p, y = {}) {
      let D = y.width || 1, k = h.dist(p), _ = 90 - h.angle(p);
      d(Be(ve({}, y), { pos: h.add(p).scale(0.5), width: D, height: k, rot: _, origin: "center" }));
    }
    __name(oe, "oe");
    s(oe, "drawLine");
    function de(h, p, y, D = {}) {
      let k = D.z, _ = D.color || ce();
      w([{ pos: fe(h.x, h.y, k), uv: l(0, 0), color: _ }, { pos: fe(p.x, p.y, k), uv: l(0, 0), color: _ }, { pos: fe(y.x, y.y, k), uv: l(0, 0), color: _ }], [0, 1, 2], t.defTex, D.prog, D.uniform);
    }
    __name(de, "de");
    s(de, "drawTri");
    function ae(h, p, y = {}) {
      let D = (h + "").split(""), k = p.qw * p.tex.width, _ = p.qh * p.tex.height, z = y.size || _, I = l(z / _).scale(l(y.scale || 1)), A = I.x * k, $ = I.y * _, X = 0, j = $, ee = 0, Re = [], ue = [], ye = null, we = 0;
      for (; we < D.length; ) {
        let re = D[we];
        re === `
` ? (j += $, X = 0, ye = null, Re.push(ue), ue = []) : (y.width ? X + A > y.width : false) && (j += $, X = 0, ye != null && (we -= ue.length - ye, re = D[we], ue = ue.slice(0, ye)), ye = null, Re.push(ue), ue = []), re !== `
` && (ue.push(re), X += A, re === " " && (ye = ue.length)), ee = Math.max(ee, X), we++;
      }
      Re.push(ue), y.width && (ee = y.width);
      let Le = [], Ye = l(y.pos || 0), Ee = Pe(y.origin || Ne).scale(0.5), Qe = -Ee.x * A - (Ee.x + 0.5) * (ee - A), Ze = -Ee.y * $ - (Ee.y + 0.5) * (j - $);
      return Re.forEach((re, ge) => {
        let Xe = (ee - re.length * A) * (Ee.x + 0.5);
        re.forEach((Ce, Je) => {
          let Ae = p.map[Ce], He = Je * A, ze = ge * $;
          Ae && Le.push({ tex: p.tex, quad: se(Ae.x, Ae.y, p.qw, p.qh), ch: Ce, pos: l(Ye.x + He + Qe + Xe, Ye.y + ze + Ze), color: y.color, origin: y.origin, scale: I, z: y.z });
        });
      }), { width: ee, height: j, chars: Le };
    }
    __name(ae, "ae");
    s(ae, "fmtText");
    function Te(h, p, y = {}) {
      R(ae(h, p, y));
    }
    __name(Te, "Te");
    s(Te, "drawText");
    function R(h) {
      for (let p of h.chars)
        d({ tex: p.tex, width: p.tex.width * p.quad.w, height: p.tex.height * p.quad.h, pos: p.pos, scale: p.scale, color: p.color, quad: p.quad, origin: "center", z: p.z });
    }
    __name(R, "R");
    s(R, "drawFmtText");
    function O() {
      if (r.width && r.height && r.stretch)
        if (r.letterbox) {
          let h = e.drawingBufferWidth / e.drawingBufferHeight, p = r.width / r.height;
          if (h > p) {
            t.width = r.height * h, t.height = r.height;
            let y = e.drawingBufferHeight * p, D = e.drawingBufferHeight, k = (e.drawingBufferWidth - y) / 2;
            e.scissor(k, 0, y, D), e.viewport(k, 0, e.drawingBufferWidth, e.drawingBufferHeight);
          } else {
            t.width = r.width, t.height = r.width / h;
            let y = e.drawingBufferWidth, D = e.drawingBufferWidth / p, k = (e.drawingBufferHeight - D) / 2;
            e.scissor(0, e.drawingBufferHeight - D - k, y, D), e.viewport(0, -k, e.drawingBufferWidth, e.drawingBufferHeight);
          }
        } else
          t.width = r.width, t.height = r.height;
      else
        t.width = e.drawingBufferWidth / me(), t.height = e.drawingBufferHeight / me();
    }
    __name(O, "O");
    s(O, "updateSize");
    function Ue() {
      return t.width;
    }
    __name(Ue, "Ue");
    s(Ue, "width");
    function he() {
      return t.height;
    }
    __name(he, "he");
    s(he, "height");
    function me() {
      var h;
      return (h = r.scale) != null ? h : 1;
    }
    __name(me, "me");
    s(me, "scale");
    function be() {
      return t.clearColor.clone();
    }
    __name(be, "be");
    return s(be, "clearColor"), O(), C(), P(), { width: Ue, height: he, scale: me, makeTex: f, makeProgram: v, makeFont: g, drawTexture: K, drawText: Te, drawFmtText: R, drawRect: ie, drawRectStroke: pe, drawLine: oe, drawTri: de, fmtText: ae, frameStart: C, frameEnd: P, pushTransform: Z, popTransform: M, pushMatrix: T, drawCalls: S, clearColor: be };
  }
  __name(Tt, "Tt");
  var Ne;
  var Me;
  var je;
  var Pt;
  var nn;
  var sn;
  var it;
  var ot;
  var Rt = N(() => {
    Se();
    St();
    Ne = "topleft", Me = 9, je = 65536, Pt = 64, nn = `
attribute vec3 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec3 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`, sn = `
precision mediump float;

varying vec3 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`, it = `
vec4 vert(vec3 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`, ot = `
vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
    s(Pe, "originPt");
    s(Tt, "gfxInit");
  });
  function At(e) {
    return e === "pressed" || e === "rpressed" ? "down" : e === "released" ? "up" : e;
  }
  __name(At, "At");
  function kt(e = {}) {
    var de, ae, Te;
    let r = (de = e.root) != null ? de : document.body, t = { canvas: (ae = e.canvas) != null ? ae : (() => {
      let R = document.createElement("canvas");
      return r.appendChild(R), R;
    })(), keyStates: {}, charInputted: [], mouseMoved: false, mouseState: "up", mousePos: l(0, 0), mouseDeltaPos: l(0, 0), time: 0, realTime: 0, skipTime: false, dt: 0, scale: (Te = e.scale) != null ? Te : 1, isTouch: false, loopID: null, stopped: false, fps: 0, fpsBuf: [], fpsTimer: 0 }, u = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" }, f = ["space", "left", "right", "up", "down", "tab", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11"];
    e.width && e.height && !e.stretch ? (t.canvas.width = e.width * t.scale, t.canvas.height = e.height * t.scale) : (t.canvas.width = r.offsetWidth, t.canvas.height = r.offsetHeight);
    let v = ["outline: none", "cursor: default"];
    e.crisp && (v.push("image-rendering: pixelated"), v.push("image-rendering: crisp-edges")), t.canvas.style = v.join(";"), t.canvas.setAttribute("tabindex", "0");
    let g = t.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    t.isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0, t.canvas.addEventListener("mousemove", (R) => {
      t.mousePos = l(R.offsetX, R.offsetY).scale(1 / t.scale), t.mouseDeltaPos = l(R.movementX, R.movementY).scale(1 / t.scale), t.mouseMoved = true;
    }), t.canvas.addEventListener("mousedown", () => {
      t.mouseState = "pressed";
    }), t.canvas.addEventListener("mouseup", () => {
      t.mouseState = "released";
    }), t.canvas.addEventListener("keydown", (R) => {
      let O = u[R.key] || R.key.toLowerCase();
      f.includes(O) && R.preventDefault(), O.length === 1 && t.charInputted.push(R.key), O === "space" && t.charInputted.push(" "), R.repeat ? t.keyStates[O] = "rpressed" : t.keyStates[O] = "pressed";
    }), t.canvas.addEventListener("keyup", (R) => {
      let O = u[R.key] || R.key.toLowerCase();
      t.keyStates[O] = "released";
    }), t.canvas.addEventListener("touchstart", (R) => {
      if (!e.touchToMouse)
        return;
      R.preventDefault();
      let O = R.touches[0];
      t.mousePos = l(O.clientX, O.clientY).scale(1 / t.scale), t.mouseState = "pressed";
    }), t.canvas.addEventListener("touchmove", (R) => {
      if (!e.touchToMouse)
        return;
      R.preventDefault();
      let O = R.touches[0];
      t.mousePos = l(O.clientX, O.clientY).scale(1 / t.scale), t.mouseMoved = true;
    }), t.canvas.addEventListener("touchend", (R) => {
      !e.touchToMouse || (t.mouseState = "released");
    }), t.canvas.addEventListener("touchcancel", (R) => {
      !e.touchToMouse || (t.mouseState = "released");
    }), document.addEventListener("visibilitychange", () => {
      var R, O;
      switch (document.visibilityState) {
        case "visible":
          t.skipTime = true, (R = e.audioCtx) == null || R.resume();
          break;
        case "hidden":
          (O = e.audioCtx) == null || O.suspend();
          break;
      }
    });
    function w() {
      return t.mousePos.clone();
    }
    __name(w, "w");
    s(w, "mousePos");
    function b() {
      return t.mouseDeltaPos.clone();
    }
    __name(b, "b");
    s(b, "mouseDeltaPos");
    function C() {
      return t.mouseState === "pressed";
    }
    __name(C, "C");
    s(C, "mouseClicked");
    function P() {
      return t.mouseState === "pressed" || t.mouseState === "down";
    }
    __name(P, "P");
    s(P, "mouseDown");
    function S() {
      return t.mouseState === "released";
    }
    __name(S, "S");
    s(S, "mouseReleased");
    function B() {
      return t.mouseMoved;
    }
    __name(B, "B");
    s(B, "mouseMoved");
    function T(R) {
      return t.keyStates[R] === "pressed";
    }
    __name(T, "T");
    s(T, "keyPressed");
    function Y(R) {
      return t.keyStates[R] === "pressed" || t.keyStates[R] === "rpressed";
    }
    __name(Y, "Y");
    s(Y, "keyPressedRep");
    function W(R) {
      return t.keyStates[R] === "pressed" || t.keyStates[R] === "rpressed" || t.keyStates[R] === "down";
    }
    __name(W, "W");
    s(W, "keyDown");
    function G(R) {
      return t.keyStates[R] === "released";
    }
    __name(G, "G");
    s(G, "keyReleased");
    function q() {
      return [...t.charInputted];
    }
    __name(q, "q");
    s(q, "charInputted");
    function L() {
      return t.dt;
    }
    __name(L, "L");
    s(L, "dt");
    function Z() {
      return t.time;
    }
    __name(Z, "Z");
    s(Z, "time");
    function M() {
      return t.fps;
    }
    __name(M, "M");
    s(M, "fps");
    function d() {
      return t.canvas.toDataURL();
    }
    __name(d, "d");
    s(d, "screenshot");
    function K(R) {
      return R && (t.canvas.style.cursor = R), t.canvas.style.cursor;
    }
    __name(K, "K");
    s(K, "cursor");
    function ie(R) {
      return document.fullscreenElement ? document.exitFullscreen() : t.canvas.requestFullscreen(), document.fullscreenElement != null;
    }
    __name(ie, "ie");
    s(ie, "fullscreen");
    function pe(R) {
      let O = s((Ue) => {
        K("default");
        let he = Ue / 1e3, me = he - t.realTime;
        t.realTime = he, t.skipTime || (t.dt = me, t.time += t.dt, t.fpsBuf.push(1 / t.dt), t.fpsTimer += t.dt, t.fpsTimer >= 1 && (t.fpsTimer = 0, t.fps = Math.round(t.fpsBuf.reduce((be, h) => be + h) / t.fpsBuf.length), t.fpsBuf = [])), t.skipTime = false, R();
        for (let be in t.keyStates)
          t.keyStates[be] = At(t.keyStates[be]);
        t.mouseState = At(t.mouseState), t.charInputted = [], t.mouseMoved = false, t.loopID = requestAnimationFrame(O);
      }, "frame");
      t.stopped = false, t.loopID = requestAnimationFrame(O);
    }
    __name(pe, "pe");
    s(pe, "run");
    function oe() {
      cancelAnimationFrame(t.loopID), t.stopped = true;
    }
    __name(oe, "oe");
    return s(oe, "quit"), { gl: g, mousePos: w, mouseDeltaPos: b, keyDown: W, keyPressed: T, keyPressedRep: Y, keyReleased: G, mouseDown: P, mouseClicked: C, mouseReleased: S, mouseMoved: B, charInputted: q, cursor: K, dt: L, time: Z, fps: M, screenshot: d, run: pe, quit: oe, focused: () => document.activeElement === t.canvas, focus: () => t.canvas.focus(), canvas: t.canvas, isTouch: t.isTouch, scale: t.scale, fullscreen: ie };
  }
  __name(kt, "kt");
  var Vt = N(() => {
    Se();
    s(At, "processBtnState");
    s(kt, "appInit");
  });
  var _t;
  var It = N(() => {
    _t = Ut("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  });
  function Gt() {
    let e = (() => {
      let v = new (window.AudioContext || window.webkitAudioContext)(), g = v.createGain(), w = g;
      return w.connect(v.destination), { ctx: v, gainNode: g, masterNode: w };
    })(), r;
    e.ctx.decodeAudioData(_t.buffer.slice(0), (v) => {
      r = v;
    }, () => {
      throw new Error("failed to make burp");
    });
    function t(v) {
      return v !== void 0 && (e.gainNode.gain.value = le(v, Xt, Wt)), e.gainNode.gain.value;
    }
    __name(t, "t");
    s(t, "volume");
    function u(v, g = { loop: false, volume: 1, speed: 1, detune: 0, seek: 0 }) {
      var Y;
      let w = false, b = e.ctx.createBufferSource();
      b.buffer = v, b.loop = !!g.loop;
      let C = e.ctx.createGain();
      b.connect(C), C.connect(e.masterNode);
      let P = (Y = g.seek) != null ? Y : 0;
      b.start(0, P);
      let S = e.ctx.currentTime - P, B = null, T = { stop() {
        w || (this.pause(), S = e.ctx.currentTime);
      }, play(W) {
        if (!w)
          return;
        let G = b;
        b = e.ctx.createBufferSource(), b.buffer = G.buffer, b.loop = G.loop, b.playbackRate.value = G.playbackRate.value, b.detune && (b.detune.value = G.detune.value), b.connect(C);
        let q = W != null ? W : this.time();
        b.start(0, q), S = e.ctx.currentTime - q, w = false, B = null;
      }, pause() {
        w || (b.stop(), w = true, B = e.ctx.currentTime);
      }, paused() {
        return w;
      }, stopped() {
        return w;
      }, speed(W) {
        return W !== void 0 && (b.playbackRate.value = le(W, an, un)), b.playbackRate.value;
      }, detune(W) {
        return b.detune ? (W !== void 0 && (b.detune.value = le(W, cn, dn)), b.detune.value) : 0;
      }, volume(W) {
        return W !== void 0 && (C.gain.value = le(W, Xt, Wt)), C.gain.value;
      }, loop() {
        b.loop = true;
      }, unloop() {
        b.loop = false;
      }, duration() {
        return v.duration;
      }, time() {
        return w ? B - S : e.ctx.currentTime - S;
      } };
      return T.speed(g.speed), T.detune(g.detune), T.volume(g.volume), T;
    }
    __name(u, "u");
    s(u, "play");
    function f(v) {
      return u(r, v);
    }
    __name(f, "f");
    return s(f, "burp"), { ctx: e.ctx, volume: t, play: u, burp: f };
  }
  __name(Gt, "Gt");
  var Xt;
  var Wt;
  var an;
  var un;
  var cn;
  var dn;
  var qt = N(() => {
    Se();
    It();
    Xt = 0, Wt = 3, an = 0, un = 3, cn = -1200, dn = 1200;
    s(Gt, "audioInit");
  });
  var Mt;
  var Ft = N(() => {
    Mt = "data:image/png;base64,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";
  });
  var Yt;
  var Lt = N(() => {
    Yt = "data:image/png;base64,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";
  });
  var zt;
  var Zt = N(() => {
    zt = "data:image/png;base64,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";
  });
  var $t;
  var Ot = N(() => {
    $t = "data:image/png;base64,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";
  });
  function jt(e) {
    let r = new Image();
    return r.src = e, r.crossOrigin = "anonymous", new Promise((t, u) => {
      r.onload = () => {
        t(r);
      }, r.onerror = () => {
        u(`failed to load ${e}`);
      };
    });
  }
  __name(jt, "jt");
  function Qt(e) {
    return e.startsWith("data:");
  }
  __name(Qt, "Qt");
  function Jt(e, r, t = {}) {
    let u = { lastLoaderID: 0, loadRoot: "", loaders: {}, sprites: {}, sounds: {}, fonts: {}, shaders: {} };
    function f(S) {
      var T;
      let B = u.lastLoaderID;
      u.loaders[B] = false, u.lastLoaderID++, S.catch((T = t.errHandler) != null ? T : console.error).finally(() => u.loaders[B] = true);
    }
    __name(f, "f");
    s(f, "load");
    function v() {
      let S = 0, B = 0;
      for (let T in u.loaders)
        S += 1, u.loaders[T] && (B += 1);
      return B / S;
    }
    __name(v, "v");
    s(v, "loadProgress");
    function g(S) {
      return S !== void 0 && (u.loadRoot = S), u.loadRoot;
    }
    __name(g, "g");
    s(g, "loadRoot");
    function w(S, B, T, Y, W = {}) {
      let G = new Promise((q, L) => {
        let Z = Qt(B) ? B : u.loadRoot + B;
        jt(Z).then((M) => {
          var K;
          let d = e.makeFont(e.makeTex(M, W), T, Y, (K = W.chars) != null ? K : at);
          S && (u.fonts[S] = d), q(d);
        }).catch(L);
      });
      return f(G), G;
    }
    __name(w, "w");
    s(w, "loadFont");
    function b(S, B, T = { sliceX: 1, sliceY: 1, anims: {} }) {
      function Y(G, q, L = { sliceX: 1, sliceY: 1, gridWidth: 0, gridHeight: 0, anims: {} }) {
        let Z = [], M = e.makeTex(q, L), d = L.sliceX || M.width / (L.gridWidth || M.width), K = L.sliceY || M.height / (L.gridHeight || M.height), ie = 1 / d, pe = 1 / K;
        for (let de = 0; de < K; de++)
          for (let ae = 0; ae < d; ae++)
            Z.push(se(ae * ie, de * pe, ie, pe));
        let oe = { tex: M, frames: Z, anims: L.anims || {} };
        return G && (u.sprites[G] = oe), oe;
      }
      __name(Y, "Y");
      s(Y, "loadRawSprite");
      let W = new Promise((G, q) => {
        if (!B)
          return q(`expected sprite src for "${S}"`);
        if (typeof B == "string") {
          let L = Qt(B) ? B : u.loadRoot + B;
          jt(L).then((Z) => {
            G(Y(S, Z, T));
          }).catch(q);
        } else
          G(Y(S, B, T));
      });
      return f(W), W;
    }
    __name(b, "b");
    s(b, "loadSprite");
    function C(S, B, T, Y = false) {
      function W(q, L, Z) {
        let M = e.makeProgram(L, Z);
        return q && (u.shaders[q] = M), M;
      }
      __name(W, "W");
      s(W, "loadRawShader");
      let G = new Promise((q, L) => {
        if (!B && !T)
          return L("no shader");
        function Z(M) {
          return M ? fetch(u.loadRoot + M).then((d) => {
            if (d.ok)
              return d.text();
            throw new Error(`failed to load ${M}`);
          }).catch(L) : new Promise((d) => d(null));
        }
        __name(Z, "Z");
        if (s(Z, "resolveUrl"), Y)
          Promise.all([Z(B), Z(T)]).then(([M, d]) => {
            q(W(S, M, d));
          }).catch(L);
        else
          try {
            q(W(S, B, T));
          } catch (M) {
            L(M);
          }
      });
      return f(G), G;
    }
    __name(C, "C");
    s(C, "loadShader");
    function P(S, B) {
      let T = u.loadRoot + B, Y = new Promise((W, G) => {
        if (!B)
          return G(`expected sound src for "${S}"`);
        typeof B == "string" && fetch(T).then((q) => {
          if (q.ok)
            return q.arrayBuffer();
          throw new Error(`failed to load ${T}`);
        }).then((q) => new Promise((L, Z) => {
          r.ctx.decodeAudioData(q, L, Z);
        })).then((q) => {
          S && (u.sounds[S] = q), W(q);
        }).catch(G);
      });
      return f(Y), Y;
    }
    __name(P, "P");
    return s(P, "loadSound"), w("apl386", Mt, 45, 74), w("apl386o", Yt, 45, 74), w("sink", zt, 6, 8, { chars: "\u2588\u263A\u263B\u2665\u2666\u2663\u2660\u25CF\u25CB\u25AA\u25A1\u25A0\u25D8\u266A\u266B\u2261\u25BA\u25C4\u2302\xDE\xC0\xDF\xD7\xA5\u2191\u2193\u2192\u2190\u25CC\u25CF\u25BC\u25B2 !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u03A7\u2591\u2592\u2593\u1E00\u1E01\u1E02\u2502\u252C\u2524\u250C\u2510\u1E03\u1E04\u253C\u1E05\u1E06\u1E07\u1E08\u1E09\u1E0A\u1E0B\u1E0C\u2500\u251C\u2534\u2514\u2518\u1E0D\u1E0E\u205E\u1E0F\u1E10\u1E11\u1E12\u1E13\u1E14\u1E15\u1E16\u1E17\u1E18\u2584\u1E19\u1E1A\u1E1B\u1E1C\u2026\u1E1D\u1E1E\u1E1F\u1E20\u1E21\u1E22\u1E23\u1E24\u1E25\u1E26\u258C\u2590\u1E27\u1E28\u1E29\u1E2A\u1E2B\u1E2C\u1E2D\u1E2E\u1E2F\u1E30\u1E31\u1E32\u1E33\u1E34\u1E35\u1E36\u1E37\u1E38\u1E39\u1E3A\u1E3B\u1E3C\u1E3D\u1E3E\u1E3F\u1E40\u1E41\u1E42\u1E43\u1E44\u1E45\u1E46\u1E47\u1E48\u1E49\u1E4A\u1E4B\u1E4C\u1E4D\u1E4E\u1E4F\u1E50\u1E51\u1E52\u1E53\u1E54\u1E55\u1E56\u1E57\u1E58\u1E59\u1E5A\u1E5B\u1E5C\u1E5D\u1E5E\u1E5F\u1E60\u1E61\u1E62\u1E63\u1E64\u1E65\u1E66\u1E67\u1E68\u1E69\u1E6A\u1E6B\u1E6C\u1E6D\u1E6E\u1E6F\u1E70\u1E71\u1E72\u1E73\u1E74\u1E75\u1E76\u1E77\u1E78\u1E79\u1E7A\u1E7B\u1E7C" }), w("sinko", $t, 8, 10), { loadRoot: g, loadSprite: b, loadSound: P, loadFont: w, loadShader: C, loadProgress: v, load: f, sprites: u.sprites, fonts: u.fonts, sounds: u.sounds, shaders: u.shaders };
  }
  __name(Jt, "Jt");
  var at;
  var Nt;
  var Ht = N(() => {
    Se();
    Ft();
    Lt();
    Zt();
    Ot();
    at = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", Nt = " \u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0";
    s(jt, "loadImg");
    s(Qt, "isDataUrl");
    s(Jt, "assetsInit");
  });
  function Kt(e, r, t = { max: 8 }) {
    var C;
    let u = [], f = (C = t.max) != null ? C : 8;
    function v() {
      u.length > f && (u = u.slice(0, f));
      let P = l(0, e.height());
      u.forEach((S, B) => {
        let T = Ie(B, 0, f, 1, 0.5), Y = Ie(B, 0, f, 0.8, 0.2), W = (() => {
          switch (S.type) {
            case "info":
              return Q(255, 255, 255, T);
            case "error":
              return Q(255, 0, 127, T);
          }
        })(), G = e.fmtText(S.msg, r.fonts.sink, { pos: P, origin: "botleft", color: W, size: pn / e.scale(), width: e.width() });
        e.drawRect(P, G.width, G.height, { origin: "botleft", color: Q(0, 0, 0, Y) }), e.drawFmtText(G), P.y -= G.height;
      });
    }
    __name(v, "v");
    s(v, "draw");
    function g(P) {
      u.unshift({ type: "error", msg: P });
    }
    __name(g, "g");
    s(g, "error");
    function w(P) {
      u.unshift({ type: "info", msg: P });
    }
    __name(w, "w");
    s(w, "info");
    function b() {
      u = [];
    }
    __name(b, "b");
    return s(b, "clear"), { info: w, error: g, draw: v, clear: b };
  }
  __name(Kt, "Kt");
  var pn;
  var er = N(() => {
    Se();
    pn = 16;
    s(Kt, "loggerInit");
  });
  function tr(e) {
    let r = {}, t = [], u = null;
    function f() {
      return u !== null && u.readyState === 1;
    }
    __name(f, "f");
    s(f, "connected");
    function v() {
      let C = new WebSocket(e);
      return new Promise((P, S) => {
        C.onopen = () => {
          P(C), u = C;
          for (let B of t)
            C.send(B);
        }, C.onerror = () => {
          S(`failed to connect to ${e}`);
        }, C.onmessage = (B) => {
          let T = JSON.parse(B.data);
          if (r[T.type])
            for (let Y of r[T.type])
              Y(T.id, T.data);
        };
      });
    }
    __name(v, "v");
    s(v, "connect");
    function g(C, P) {
      r[C] || (r[C] = []), r[C].push(P);
    }
    __name(g, "g");
    s(g, "recv");
    function w(C, P) {
      let S = JSON.stringify({ type: C, data: P });
      u ? u.send(S) : t.push(S);
    }
    __name(w, "w");
    s(w, "send");
    function b() {
      u && u.close();
    }
    __name(b, "b");
    return s(b, "close"), { connect: v, close: b, connected: f, recv: g, send: w };
  }
  __name(tr, "tr");
  var rr = N(() => {
    s(tr, "netInit");
  });
  var sr;
  var nr = N(() => {
    sr = "data:image/png;base64,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";
  });
  var ir;
  var or = N(() => {
    nr();
    ir = s((e) => {
      function r(t = "bean") {
        return e.loadSprite(t, sr);
      }
      __name(r, "r");
      return s(r, "loadBean"), { loadBean: r };
    }, "default");
  });
  var ar;
  var ur = N(() => {
    ar = s((e) => {
      function r(u) {
        let f = new Image();
        return f.src = u, f.crossOrigin = "anonymous", new Promise((v, g) => {
          f.onload = () => {
            v(f);
          }, f.onerror = () => {
            g(`failed to load ${u}`);
          };
        });
      }
      __name(r, "r");
      s(r, "loadImg");
      function t(u, f) {
        let v = new Promise((g, w) => {
          fetch(e.loadRoot() + f).then((b) => b.json()).then((b) => pt(this, null, function* () {
            let C = yield Promise.all(b.frames.map(r)), P = document.createElement("canvas");
            P.width = b.width, P.height = b.height * b.frames.length;
            let S = P.getContext("2d");
            return C.forEach((B, T) => {
              S.drawImage(B, 0, T * b.height);
            }), e.loadSprite(u, P, { sliceY: b.frames.length, anims: b.anims });
          })).then(g).catch(w);
        });
        return e.load(v), v;
      }
      __name(t, "t");
      return s(t, "loadPedit"), { loadPedit: t };
    }, "default");
  });
  var cr;
  var dr = N(() => {
    cr = s((e) => {
      function r(t, u, f) {
        let v = new Promise((g, w) => {
          let b = e.loadRoot() + f;
          e.loadSprite(t, u).then((C) => {
            fetch(b).then((P) => P.json()).then((P) => {
              let S = P.meta.size;
              C.frames = P.frames.map((B) => e.quad(B.frame.x / S.w, B.frame.y / S.h, B.frame.w / S.w, B.frame.h / S.h));
              for (let B of P.meta.frameTags)
                C.anims[B.name] = { from: B.from, to: B.to };
              g(C);
            }).catch(w);
          }).catch(w);
        });
        return e.load(v), v;
      }
      __name(r, "r");
      return s(r, "loadAseprite"), { loadAseprite: r };
    }, "default");
  });
  var hr;
  var lr = N(() => {
    hr = "data:image/png;base64,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";
  });
  var mr;
  var fr = N(() => {
    lr();
    mr = s((e) => {
      function r(t = "cga") {
        return e.loadFont(t, hr, 8, 8, { chars: e.CP437_CHARS });
      }
      __name(r, "r");
      return s(r, "loadCGA"), { loadCGA: r };
    }, "default");
  });
  var pr;
  var Ur = N(() => {
    pr = s((e) => {
      function r(u, f) {
        return { id: "grid", gridPos: f.clone(), setGridPos(v) {
          this.gridPos = v.clone(), this.pos = e.vec2(u.offset().x + this.gridPos.x * u.gridWidth(), u.offset().y + this.gridPos.y * u.gridHeight());
        }, moveLeft() {
          this.setGridPos(this.gridPos.add(e.vec2(-1, 0)));
        }, moveRight() {
          this.setGridPos(this.gridPos.add(e.vec2(1, 0)));
        }, moveUp() {
          this.setGridPos(this.gridPos.add(e.vec2(0, -1)));
        }, moveDown() {
          this.setGridPos(this.gridPos.add(e.vec2(0, 1)));
        } };
      }
      __name(r, "r");
      s(r, "grid");
      function t(u, f) {
        let v = [], g = e.vec2(f.pos || e.vec2(0)), w = 0, b = { offset() {
          return g.clone();
        }, gridWidth() {
          return f.width;
        }, gridHeight() {
          return f.height;
        }, getPos(...C) {
          let P = e.vec2(...C);
          return e.vec2(g.x + P.x * f.width, g.y + P.y * f.height);
        }, spawn(C, P) {
          let S = (() => {
            if (Array.isArray(C))
              return C;
            if (f[C]) {
              if (typeof f[C] == "function")
                return f[C]();
              if (Array.isArray(f[C]))
                return [...f[C]];
            } else if (f.any)
              return f.any(C);
          })();
          if (!S)
            return;
          S.push(e.pos(g.x + P.x * f.width, g.y + P.y * f.height));
          let B = e.add(S);
          return v.push(B), B.use(r(this, P)), B;
        }, width() {
          return w * f.width;
        }, height() {
          return u.length * f.height;
        }, destroy() {
          for (let C of v)
            e.destroy(C);
        } };
        return u.forEach((C, P) => {
          let S = C.split("");
          w = Math.max(S.length, w), S.forEach((B, T) => {
            b.spawn(B, e.vec2(T, P));
          });
        }), b;
      }
      __name(t, "t");
      return s(t, "addLevel"), { addLevel: t };
    }, "default");
  });
  var yr;
  var br = N(() => {
    yr = "data:image/png;base64,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";
  });
  var xr;
  var gr = N(() => {
    xr = "data:image/png;base64,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";
  });
  var vr;
  var wr = N(() => {
    br();
    gr();
    vr = s((e) => {
      function r(v = 2, g = 1) {
        let w = 0;
        return { id: "explode", require: ["scale"], update() {
          let b = Math.sin(w * v) * g;
          b < 0 && e.destroy(this), this.scale = e.vec2(b), w += e.dt();
        } };
      }
      __name(r, "r");
      s(r, "explode");
      let t = null, u = null;
      e.loadSprite(null, yr).then((v) => t = v), e.loadSprite(null, xr).then((v) => u = v);
      function f(v, g = {}) {
        let w = (g.speed || 1) * 5, b = g.scale || 1, C = e.add([e.pos(v), e.sprite(u), e.scale(0), e.stay(), e.origin("center"), r(w, b), ...e.getComps(g.boomComps)]), P = e.add([e.pos(v), e.sprite(t), e.scale(0), e.stay(), e.origin("center"), e.timer(0.4 / w, () => P.use(r(w, b))), ...e.getComps(g.kaComps)]);
        return { destroy() {
          e.destroy(P), e.destroy(C);
        } };
      }
      __name(f, "f");
      return s(f, "addKaboom"), { addKaboom: f };
    }, "default");
  });
  var xn = en((vs, Er) => {
    Se();
    Rt();
    Vt();
    qt();
    Ht();
    er();
    rr();
    or();
    ur();
    dr();
    fr();
    Ur();
    wr();
    var H = /* @__PURE__ */ __name(class extends Map {
      constructor(...r) {
        super(...r);
        ft(this, "_lastID");
        this._lastID = 0;
      }
      push(r) {
        let t = this._lastID;
        return this.set(t, r), this._lastID++, t;
      }
      pushd(r) {
        let t = this.push(r);
        return () => this.delete(t);
      }
    }, "H");
    s(H, "IDList");
    Er.exports = (e = {}) => {
      var lt;
      let r = Gt(), t = kt({ width: e.width, height: e.height, scale: e.scale, crisp: e.crisp, canvas: e.canvas, root: e.root, stretch: e.stretch, touchToMouse: (lt = e.touchToMouse) != null ? lt : true, audioCtx: r.ctx }), u = Tt(t.gl, { clearColor: e.clearColor ? Q(e.clearColor) : void 0, width: e.width, height: e.height, scale: e.scale, texFilter: e.texFilter, stretch: e.stretch, letterbox: e.letterbox }), { width: f, height: v } = u, g = Jt(u, r, { errHandler: (n) => {
        w.error(n);
      } }), w = Kt(u, g, { max: e.logMax }), b = e.connect ? tr(e.connect) : null, C = "apl386o", P = "sink";
      function S(n, i) {
        if (!b)
          throw new Error("not connected to any websockets");
        b.recv(n, (a, o) => {
          i(a, o);
        });
      }
      __name(S, "S");
      s(S, "recv");
      function B(n, i) {
        if (!b)
          throw new Error("not connected to any websockets");
        b.send(n, i);
      }
      __name(B, "B");
      s(B, "send");
      function T() {
        return t.dt() * J.timeScale;
      }
      __name(T, "T");
      s(T, "dt");
      function Y(n, i = {}) {
        let a = r.play(new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: 44100 }));
        return We(() => {
          let o = g.sounds[n];
          if (!o)
            throw new Error(`sound not found: "${n}"`);
          let U = r.play(o, i);
          for (let m in U)
            a[m] = U[m];
        }), a;
      }
      __name(Y, "Y");
      s(Y, "play");
      function W() {
        return t.mousePos();
      }
      __name(W, "W");
      s(W, "mousePos");
      function G() {
        return d.camMousePos;
      }
      __name(G, "G");
      s(G, "mouseWorldPos");
      function q(n, i = {}) {
        var U, m;
        let a = (() => typeof n == "string" ? g.sprites[n] : n)();
        if (!a)
          throw new Error(`sprite not found: "${n}"`);
        let o = a.frames[(U = i.frame) != null ? U : 0];
        if (!o)
          throw new Error(`frame not found: ${(m = i.frame) != null ? m : 0}`);
        u.drawTexture(a.tex, Be(ve({}, i), { quad: o.scale(i.quad || se(0, 0, 1, 1)) }));
      }
      __name(q, "q");
      s(q, "drawSprite");
      function L(n, i = {}) {
        var U;
        let a = (U = i.font) != null ? U : C, o = g.fonts[a];
        if (!o)
          throw new Error(`font not found: ${a}`);
        u.drawText(n, o, i);
      }
      __name(L, "L");
      s(L, "drawText");
      let Z = 980, M = "topleft", d = { loaded: false, events: {}, objEvents: {}, actions: new H(), renders: new H(), objs: new H(), timers: new H(), cam: { pos: l(f() / 2, v() / 2), scale: l(1, 1), angle: 0, shake: 0 }, camMousePos: t.mousePos(), camMatrix: te(), layers: {}, defLayer: null, gravity: Z, on(n, i) {
        return this.events[n] || (this.events[n] = new H()), this.events[n].pushd(i);
      }, trigger(n, ...i) {
        this.events[n] && this.events[n].forEach((a) => a(...i));
      }, scenes: {}, paused: false };
      function K(n, i) {
        n.forEach((a, o) => {
          d.layers[a] = o + 1;
        }), i && (d.defLayer = i);
      }
      __name(K, "K");
      s(K, "layers");
      function ie(...n) {
        return n.length > 0 && (d.cam.pos = l(...n)), d.cam.pos.clone();
      }
      __name(ie, "ie");
      s(ie, "camPos");
      function pe(...n) {
        return n.length > 0 && (d.cam.scale = l(...n)), d.cam.scale.clone();
      }
      __name(pe, "pe");
      s(pe, "camScale");
      function oe(n) {
        return n !== void 0 && (d.cam.angle = n), d.cam.angle;
      }
      __name(oe, "oe");
      s(oe, "camRot");
      function de(n) {
        d.cam.shake = n;
      }
      __name(de, "de");
      s(de, "shake");
      function ae(n) {
        return d.camMatrix.multVec2(n);
      }
      __name(ae, "ae");
      s(ae, "toScreen");
      function Te(n) {
        return d.camMatrix.invert().multVec2(n);
      }
      __name(Te, "Te");
      s(Te, "toWorld");
      let R = new Set(["id", "require"]), O = new Set(["add", "load", "update", "draw", "destroy", "inspect"]);
      function Ue(n) {
        let i = {}, a = {}, o = {}, U = [], m = { _id: null, hidden: false, paused: false, use(c) {
          if (!c)
            return;
          if (typeof c == "string") {
            U.push(c);
            return;
          }
          c.id && (this.unuse(c.id), i[c.id] = {});
          let x = c.id ? i[c.id] : a;
          x.cleanups = [];
          for (let E in c)
            if (!R.has(E)) {
              if (typeof c[E] == "function") {
                let F = c[E].bind(this);
                if (O.has(E)) {
                  x.cleanups.push(this.on(E, F));
                  continue;
                } else
                  x[E] = F;
              } else
                x[E] = c[E];
              this[E] === void 0 && Object.defineProperty(this, E, { get: () => x[E], set: (F) => x[E] = F, configurable: true, enumerable: true });
            }
          let V = s(() => {
            if (!!c.require) {
              for (let E of c.require)
                if (!this.c(E))
                  throw new Error(`comp '${c.id}' requires comp '${E}'`);
            }
          }, "checkDeps");
          this.exists() ? (c.add && c.add.call(this), c.load && We(() => c.load.call(this)), V()) : c.require && x.cleanups.push(this.on("add", () => {
            V();
          }));
        }, unuse(c) {
          if (i[c]) {
            i[c].cleanups.forEach((x) => x());
            for (let x in i[c])
              delete i[c][x];
          }
          i[c] = {};
        }, c(c) {
          return i[c];
        }, exists() {
          return this._id !== null;
        }, is(c) {
          if (c === "*")
            return true;
          if (Array.isArray(c)) {
            for (let x of c)
              if (!U.includes(x))
                return false;
            return true;
          }
          return U.includes(c);
        }, on(c, x) {
          return o[c] || (o[c] = new H()), o[c].pushd(x);
        }, action(c) {
          return this.on("update", c);
        }, trigger(c, ...x) {
          o[c] && o[c].forEach((E) => E.call(this, ...x));
          let V = d.objEvents[c];
          V && V.forEach((E) => {
            this.is(E.tag) && E.cb(this, ...x);
          });
        }, untag(c) {
          let x = U.indexOf(c);
          x > -1 && U.splice(x, 1);
        }, destroy() {
          !this.exists() || (this.trigger("destroy"), d.objs.delete(this._id), delete this._id);
        }, _inspect() {
          let c = [];
          if (o.inspect)
            for (let x of o.inspect.values()) {
              let V = x();
              V && c.push(V);
            }
          return { tags: U, info: c };
        } };
        for (let c of n)
          m.use(c);
        return m;
      }
      __name(Ue, "Ue");
      s(Ue, "make");
      function he(n) {
        let i = Ue(n);
        return i._id = d.objs.push(i), i.trigger("add"), We(() => i.trigger("load")), i;
      }
      __name(he, "he");
      s(he, "add");
      function me(n) {
        if (!!n.exists())
          return d.objs.delete(n._id), n._id = d.objs.push(n), n;
      }
      __name(me, "me");
      s(me, "readd");
      function be(n, ...i) {
        var a;
        return (a = typeof n == "function" ? n(...i) : n) != null ? a : [];
      }
      __name(be, "be");
      s(be, "getComps");
      function h(n, i, a) {
        return d.objEvents[n] || (d.objEvents[n] = new H()), d.objEvents[n].pushd({ tag: i, cb: a });
      }
      __name(h, "h");
      s(h, "on");
      function p(n, i) {
        if (typeof n == "function" && i === void 0)
          return d.actions.pushd(n);
        if (typeof n == "string")
          return h("update", n, i);
      }
      __name(p, "p");
      s(p, "action");
      function y(n, i) {
        if (typeof n == "function" && i === void 0)
          return d.renders.pushd(n);
        if (typeof n == "string")
          return h("update", n, i);
      }
      __name(y, "y");
      s(y, "render");
      function D(n, i, a) {
        return p(n, (o) => {
          o._checkCollisions(i, (U) => {
            a(o, U);
          });
        });
      }
      __name(D, "D");
      s(D, "collides");
      function k(n, i, a) {
        return p(n, (o) => {
          o._checkOverlaps(i, (U) => {
            a(o, U);
          });
        });
      }
      __name(k, "k");
      s(k, "overlaps");
      function _(n, i) {
        return p(n, (a) => {
          a.isClicked() && i(a);
        });
      }
      __name(_, "_");
      s(_, "clicks");
      function z(n, i, a) {
        return p(n, (o) => {
          o.isHovered() ? i(o) : a && a(o);
        });
      }
      __name(z, "z");
      s(z, "hovers");
      function I(n, i) {
        return new Promise((a) => {
          d.timers.push({ time: n, action: () => {
            i && i(), a();
          } });
        });
      }
      __name(I, "I");
      s(I, "wait");
      function A(n, i) {
        let a = false, o = s(() => {
          a || (i(), I(n, o));
        }, "newF");
        return o(), () => a = true;
      }
      __name(A, "A");
      s(A, "loop");
      function $(n, i) {
        if (Array.isArray(n)) {
          let a = n.map((o) => $(o, i));
          return () => a.forEach((o) => o());
        } else
          return d.on("input", () => t.keyDown(n) && i());
      }
      __name($, "$");
      s($, "keyDown");
      function X(n, i) {
        if (Array.isArray(n)) {
          let a = n.map((o) => X(o, i));
          return () => a.forEach((o) => o());
        } else
          return d.on("input", () => t.keyPressed(n) && i());
      }
      __name(X, "X");
      s(X, "keyPress");
      function j(n, i) {
        if (Array.isArray(n)) {
          let a = n.map((o) => j(o, i));
          return () => a.forEach((o) => o());
        } else
          return d.on("input", () => t.keyPressedRep(n) && i());
      }
      __name(j, "j");
      s(j, "keyPressRep");
      function ee(n, i) {
        if (Array.isArray(n)) {
          let a = n.map((o) => ee(o, i));
          return () => a.forEach((o) => o());
        } else
          return d.on("input", () => t.keyReleased(n) && i());
      }
      __name(ee, "ee");
      s(ee, "keyRelease");
      function Re(n) {
        return d.on("input", () => t.mouseDown() && n(W()));
      }
      __name(Re, "Re");
      s(Re, "mouseDown");
      function ue(n) {
        return d.on("input", () => t.mouseClicked() && n(W()));
      }
      __name(ue, "ue");
      s(ue, "mouseClick");
      function ye(n) {
        return d.on("input", () => t.mouseReleased() && n(W()));
      }
      __name(ye, "ye");
      s(ye, "mouseRelease");
      function we(n) {
        return d.on("input", () => t.mouseMoved() && n(W(), t.mouseDeltaPos()));
      }
      __name(we, "we");
      s(we, "mouseMove");
      function Le(n) {
        return d.on("input", () => t.charInputted().forEach((i) => n(i)));
      }
      __name(Le, "Le");
      s(Le, "charInput"), t.canvas.addEventListener("touchstart", (n) => {
        [...n.changedTouches].forEach((i) => {
          d.trigger("touchStart", i.identifier, l(i.clientX, i.clientY).scale(1 / t.scale));
        });
      }), t.canvas.addEventListener("touchmove", (n) => {
        [...n.changedTouches].forEach((i) => {
          d.trigger("touchMove", i.identifier, l(i.clientX, i.clientY).scale(1 / t.scale));
        });
      }), t.canvas.addEventListener("touchmove", (n) => {
        [...n.changedTouches].forEach((i) => {
          d.trigger("touchEnd", i.identifier, l(i.clientX, i.clientY).scale(1 / t.scale));
        });
      });
      function Ye(n) {
        return d.on("touchStart", n);
      }
      __name(Ye, "Ye");
      s(Ye, "touchStart");
      function Ee(n) {
        return d.on("touchMove", n);
      }
      __name(Ee, "Ee");
      s(Ee, "touchMove");
      function Qe(n) {
        return d.on("touchEnd", n);
      }
      __name(Qe, "Qe");
      s(Qe, "touchEnd");
      function Ze() {
        X("f1", () => {
          J.inspect = !J.inspect;
        }), X("f2", () => {
          J.clearLog();
        }), X("f8", () => {
          J.paused = !J.paused, w.info(`${J.paused ? "paused" : "unpaused"}`);
        }), X("f7", () => {
          J.timeScale = le(J.timeScale - 0.2, 0, 2), w.info(`time scale: ${J.timeScale.toFixed(1)}`);
        }), X("f9", () => {
          J.timeScale = le(J.timeScale + 0.2, 0, 2), w.info(`time scale: ${J.timeScale.toFixed(1)}`);
        }), X("f10", () => {
          J.stepFrame(), w.info("stepped frame");
        });
      }
      __name(Ze, "Ze");
      s(Ze, "regDebugInput");
      function re(n) {
        let i = [...d.objs.values()].sort((a, o) => {
          var c, x, V, E, F, ne;
          let U = (x = d.layers[(c = a.layer) != null ? c : d.defLayer]) != null ? x : 0, m = (E = d.layers[(V = o.layer) != null ? V : d.defLayer]) != null ? E : 0;
          return U == m ? ((F = a.z) != null ? F : 0) - ((ne = o.z) != null ? ne : 0) : U - m;
        });
        return n ? i.filter((a) => a.is(n)) : i;
      }
      __name(re, "re");
      s(re, "get");
      function ge(n, i) {
        if (typeof n == "function" && i === void 0)
          return re().map(n);
        if (typeof n == "string")
          return re(n).map(i);
      }
      __name(ge, "ge");
      s(ge, "every");
      function Xe(n, i) {
        if (typeof n == "function" && i === void 0)
          return re().reverse().map(n);
        if (typeof n == "string")
          return re(n).reverse().map(i);
      }
      __name(Xe, "Xe");
      s(Xe, "revery");
      function Ce(n) {
        n.destroy();
      }
      __name(Ce, "Ce");
      s(Ce, "destroy");
      function Je(n) {
        ge(n, Ce);
      }
      __name(Je, "Je");
      s(Je, "destroyAll");
      function Ae(n) {
        return n !== void 0 && (d.gravity = n), d.gravity;
      }
      __name(Ae, "Ae");
      s(Ae, "gravity");
      function He(n, i) {
      }
      __name(He, "He");
      s(He, "regCursor");
      function ze(n) {
        d.trigger("next"), delete d.events.next, (n || !J.paused) && (d.timers.forEach((m, c) => {
          m.time -= T(), m.time <= 0 && (m.action(), d.timers.delete(c));
        }), Xe((m) => {
          m.paused || m.trigger("update", m);
        }), d.actions.forEach((m) => m()));
        let a = l(f(), v()), o = d.cam, U = $e(Fe(0, 360)).scale(o.shake);
        o.shake = qe(o.shake, 0, 5 * T()), d.camMatrix = te().translate(a.scale(0.5)).scale(o.scale).rotateZ(o.angle).translate(a.scale(-0.5)).translate(o.pos.scale(-1).add(a.scale(0.5)).add(U)), ge((m) => {
          m.hidden || (u.pushTransform(), m.fixed || u.pushMatrix(d.camMatrix), m.trigger("draw"), u.popTransform());
        }), d.renders.forEach((m) => m());
      }
      __name(ze, "ze");
      s(ze, "gameFrame");
      function Cr() {
        var m;
        let n = null, i = g.fonts[P], a = Q((m = e.inspectColor) != null ? m : [0, 0, 255, 1]);
        function o(c, x, V) {
          let E = l(6).scale(1 / V), F = u.fmtText(x, i, { size: 16 / V, pos: c.add(l(E.x, E.y)), color: ce(0, 0, 0) });
          u.drawRect(c, F.width + E.x * 2, F.height + E.x * 2, { color: ce() }), u.drawRectStroke(c, F.width + E.x * 2, F.height + E.x * 2, { width: 2 / V, color: ce(0, 0, 0) }), u.drawFmtText(F);
        }
        __name(o, "o");
        s(o, "drawInspectTxt");
        function U(c, x) {
          let V = u.scale() * (c.fixed ? 1 : (d.cam.scale.x + d.cam.scale.y) / 2);
          c.fixed || (u.pushTransform(), u.pushMatrix(d.camMatrix)), x(V), c.fixed || u.popTransform();
        }
        __name(U, "U");
        s(U, "drawObj"), Xe((c) => {
          !c.area || c.hidden || U(c, (x) => {
            n || c.isHovered() && (n = c);
            let V = (n === c ? 8 : 4) / x, E = c.worldArea(), F = E.p2.x - E.p1.x, ne = E.p2.y - E.p1.y;
            u.drawRectStroke(E.p1, F, ne, { width: V, color: a });
          });
        }), n && U(n, (c) => {
          let x = n.fixed ? W() : G(), V = [], E = n._inspect();
          if (!(E.tags.length === 0 && E.info.length === 0)) {
            for (let F of E.tags)
              V.push(`"${F}"`);
            for (let F of E.info)
              for (let ne in F)
                V.push(`${ne}: ${F[ne]}`);
            o(x, V.join(`
`), c);
          }
        }), o(l(0), `FPS: ${t.fps()}`, u.scale());
      }
      __name(Cr, "Cr");
      s(Cr, "drawInspect");
      function Br(...n) {
        return { id: "pos", pos: l(...n), move(...i) {
          let a = l(...i), o = a.x * T(), U = a.y * T();
          this.pos.x += o, this.pos.y += U;
        }, moveTo(...i) {
          if (typeof i[0] == "number" && typeof i[1] == "number")
            return this.moveTo(l(i[0], i[1]), i[2]);
          let a = i[0], o = i[1];
          if (o === void 0) {
            this.pos = l(a);
            return;
          }
          let U = a.sub(this.pos);
          if (U.len() <= o) {
            this.pos = l(a);
            return;
          }
          this.pos = this.pos.add(U.unit().scale(o));
        }, screenPos() {
          return this.fixed ? this.pos : ae(this.pos);
        }, inspect() {
          return { pos: `(${~~this.pos.x}, ${~~this.pos.y})` };
        } };
      }
      __name(Br, "Br");
      s(Br, "pos");
      function ut(...n) {
        return n.length === 0 ? ut(1) : { id: "scale", scale: l(...n) };
      }
      __name(ut, "ut");
      s(ut, "scale");
      function Dr(n) {
        return { id: "rotate", angle: n != null ? n : 0 };
      }
      __name(Dr, "Dr");
      s(Dr, "rotate");
      function Sr(...n) {
        return { id: "color", color: Q(...n) };
      }
      __name(Sr, "Sr");
      s(Sr, "color");
      function Pr(n) {
        return { id: "origin", origin: n };
      }
      __name(Pr, "Pr");
      s(Pr, "origin");
      function Tr(n) {
        return { id: "layer", layer: n, inspect() {
          var i;
          return { layer: (i = this.layer) != null ? i : d.defLayer };
        } };
      }
      __name(Tr, "Tr");
      s(Tr, "layer");
      function Rr(n) {
        return { id: "z", z: n };
      }
      __name(Rr, "Rr");
      s(Rr, "z");
      function Ar(n, i) {
        let a = typeof n == "number" ? $e(n) : n.unit(), o = 0, U = 6;
        function m(c) {
          let x = false;
          return a.x < 0 ? x || (x = c.x < 0) : a.x > 0 && (x || (x = c.x > f())), a.y < 0 ? x || (x = c.y < 0) : a.y > 0 && (x || (x = c.y > f())), x;
        }
        __name(m, "m");
        return s(m, "isOut"), { id: "move", require: ["pos"], update() {
          var x;
          this.move(a.scale(i));
          let c = this.screenPos();
          if (m(c))
            if (this.width && this.height) {
              let V = this.width, E = this.height, F = (x = this.scale) != null ? x : l(1), ne = Pe(this.origin || M), Ge = c.sub(ne.sub(-1, -1).scale(0.5).scale(V, E).scale(F)), Oe = c.sub(ne.sub(1, 1).scale(0.5).scale(V, E).scale(F));
              m(Ge) && m(Oe) ? o += T() : o = 0;
            } else
              o += T();
          else
            o = 0;
          o >= U && Ce(this);
        } };
      }
      __name(Ar, "Ar");
      s(Ar, "move");
      function kr(n = {}) {
        let i = {}, a = {};
        return { id: "area", add() {
          this.area.cursor && this.hovers(() => {
            t.cursor(this.area.cursor);
          });
        }, area: n, areaWidth() {
          let { p1: o, p2: U } = this.worldArea();
          return U.x - o.x;
        }, areaHeight() {
          let { p1: o, p2: U } = this.worldArea();
          return U.y - o.y;
        }, isClicked() {
          return t.mouseClicked() && this.isHovered();
        }, isHovered() {
          let o = this.fixed ? W() : G();
          return t.isTouch ? t.mouseDown() && this.hasPt(o) : this.hasPt(o);
        }, isCollided(o) {
          if (!o.area)
            return false;
          let U = this.worldArea(), m = o.worldArea();
          return nt(U, m);
        }, isOverlapped(o) {
          if (!o.area)
            return false;
          let U = this.worldArea(), m = o.worldArea();
          return Bt(U, m);
        }, clicks(o) {
          this.action(() => {
            this.isClicked() && o();
          });
        }, hovers(o, U) {
          this.action(() => {
            this.isHovered() ? o() : U && U();
          });
        }, collides(o, U) {
          this.action(() => {
            this._checkCollisions(o, U);
          });
        }, overlaps(o, U) {
          this.action(() => {
            this._checkOverlaps(o, U);
          });
        }, hasPt(o) {
          let U = this.worldArea();
          return Dt({ p1: U.p1, p2: U.p2 }, o);
        }, pushOut(o) {
          if (o === this || !o.area)
            return null;
          let U = this.worldArea(), m = o.worldArea();
          if (!nt(U, m))
            return null;
          let c = U.p2.x - m.p1.x, x = m.p2.x - U.p1.x, V = U.p2.y - m.p1.y, E = m.p2.y - U.p1.y;
          switch (Math.min(c, x, V, E)) {
            case c:
              return this.pos.x -= c, { obj: o, side: "right", dis: -c };
            case x:
              return this.pos.x += x, { obj: o, side: "left", dis: x };
            case V:
              return this.pos.y -= V, { obj: o, side: "bottom", dis: -V };
            case E:
              return this.pos.y += E, { obj: o, side: "top", dis: E };
          }
          return null;
        }, pushOutAll() {
          return ge((o) => o.solid ? this.pushOut(o) : null).filter((o) => o != null);
        }, _checkCollisions(o, U) {
          ge(o, (m) => {
            this !== m && (i[m._id] || this.isCollided(m) && (U(m), i[m._id] = m));
          });
          for (let m in i) {
            let c = i[m];
            this.isCollided(c) || delete i[m];
          }
        }, _checkOverlaps(o, U) {
          ge(o, (m) => {
            this !== m && (a[m._id] || this.isOverlapped(m) && (U(m), a[m._id] = m));
          });
          for (let m in a) {
            let c = a[m];
            this.isOverlapped(c) || delete a[m];
          }
        }, worldArea() {
          var V, E;
          let o = { p1: this.area.p1, p2: this.area.p2 };
          if (!o.p1 && !o.p2) {
            let F = (V = this.area.width) != null ? V : this.width, ne = (E = this.area.height) != null ? E : this.height;
            if (!F || !ne)
              throw new Error("Auto area requires width and height from other comps (did you forget to add sprite / text / rect comp?)");
            let Ge = l(F, ne), Oe = Pe(this.origin || M).scale(Ge).scale(-0.5);
            o.p1 = Oe.sub(Ge.scale(0.5)), o.p2 = Oe.add(Ge.scale(0.5));
          }
          let U = this.pos || l(0), m = (this.scale || l(1)).scale(this.area.scale || l(1)), c = U.add(o.p1.scale(m)), x = U.add(o.p2.scale(m));
          return { p1: l(Math.min(c.x, x.x), Math.min(c.y, x.y)), p2: l(Math.max(c.x, x.x), Math.max(c.y, x.y)) };
        }, screenArea() {
          let o = this.worldArea();
          return this.fixed ? o : { p1: d.camMatrix.multVec2(o.p1), p2: d.camMatrix.multVec2(o.p2) };
        } };
      }
      __name(kr, "kr");
      s(kr, "area");
      function Vr(n, i = {}) {
        let a = null, o = null;
        function U(m, c, x, V) {
          let E = l(1, 1);
          return x && V ? (E.x = x / (m.width * c.w), E.y = V / (m.height * c.h)) : x ? (E.x = x / (m.width * c.w), E.y = E.x) : V && (E.y = V / (m.height * c.h), E.x = E.y), E;
        }
        __name(U, "U");
        return s(U, "calcTexScale"), { id: "sprite", width: 0, height: 0, animSpeed: i.animSpeed || 0.1, frame: i.frame || 0, quad: i.quad || se(0, 0, 1, 1), load() {
          if (typeof n == "string" ? a = g.sprites[n] : a = n, !a)
            throw new Error(`sprite not found: "${n}"`);
          let m = ve({}, a.frames[0]);
          i.quad && (m = m.scale(i.quad));
          let c = U(a.tex, m, i.width, i.height);
          this.width = a.tex.width * m.w * c.x, this.height = a.tex.height * m.h * c.y;
        }, draw() {
          q(a, { pos: this.pos, scale: this.scale, rot: this.angle, color: this.color, frame: this.frame, origin: this.origin, quad: this.quad, prog: g.shaders[this.shader], uniform: this.uniform, flipX: i.flipX, flipY: i.flipY, tiled: i.tiled, width: i.width, height: i.height });
        }, update() {
          if (!o)
            return;
          let m = a.anims[o.name];
          o.timer += T(), o.timer >= this.animSpeed && (this.frame++, this.frame > m.to && (o.loop ? this.frame = m.from : (this.frame--, this.stop())), o && (o.timer -= this.animSpeed));
        }, play(m, c = true) {
          if (!a) {
            We(() => {
              this.play(m, c);
            });
            return;
          }
          let x = a.anims[m];
          if (!x)
            throw new Error(`anim not found: ${m}`);
          o && this.stop(), o = { name: m, loop: c, timer: 0 }, this.frame = x.from, this.trigger("animPlay", m);
        }, stop() {
          if (!o)
            return;
          let m = o.name;
          o = null, this.trigger("animEnd", m);
        }, numFrames() {
          return a ? a.frames.length : 0;
        }, curAnim() {
          return o == null ? void 0 : o.name;
        }, flipX(m) {
          i.flipX = m;
        }, flipY(m) {
          i.flipY = m;
        }, inspect() {
          let m = {};
          return o && (m.curAnim = `"${o.name}"`), m;
        } };
      }
      __name(Vr, "Vr");
      s(Vr, "sprite");
      function Ir(n, i = {}) {
        function a() {
          var m, c, x, V;
          let o = g.fonts[(c = (m = this.font) != null ? m : e.font) != null ? c : C];
          if (!o)
            throw new Error(`font not found: "${o}"`);
          let U = u.fmtText(this.text + "", o, { pos: this.pos, scale: this.scale, rot: this.angle, size: i.size, origin: this.origin, color: this.color, width: i.width });
          return this.width = U.width / (((x = this.scale) == null ? void 0 : x.x) || 1), this.height = U.height / (((V = this.scale) == null ? void 0 : V.y) || 1), U;
        }
        __name(a, "a");
        return s(a, "update"), { id: "text", text: n, textSize: i.size, font: i.font, width: 0, height: 0, load() {
          a.call(this);
        }, draw() {
          let o = a.call(this);
          u.drawFmtText(o);
        } };
      }
      __name(Ir, "Ir");
      s(Ir, "text");
      function _r(n, i) {
        return { id: "rect", width: n, height: i, draw() {
          u.drawRect(this.pos, this.width, this.height, { scale: this.scale, rot: this.angle, color: this.color, origin: this.origin, prog: g.shaders[this.shader], uniform: this.uniform });
        } };
      }
      __name(_r, "_r");
      s(_r, "rect");
      function Xr(n = 1, i = ce(0, 0, 0)) {
        return { id: "outline", lineWidth: n, lineColor: i, draw() {
          if (this.width && this.height)
            u.drawRectStroke(this.pos || l(0), this.width, this.height, { width: this.lineWidth, color: this.lineColor, scale: this.scale, origin: this.origin, prog: g.shaders[this.shader], uniform: this.uniform });
          else if (this.area) {
            let a = this.worldArea(), o = a.p2.x - a.p1.x, U = a.p2.y - a.p1.y;
            u.drawRectStroke(a.p1, o, U, { width: n, color: i });
          }
        } };
      }
      __name(Xr, "Xr");
      s(Xr, "outline");
      function Wr(n, i) {
        let a = new H();
        return n && i && a.pushd({ time: n, action: i }), { id: "timer", wait(o, U) {
          return a.pushd({ time: o, action: U });
        }, update() {
          a.forEach((o, U) => {
            o.time -= T(), o.time <= 0 && (o.action.call(this), a.delete(U));
          });
        } };
      }
      __name(Wr, "Wr");
      s(Wr, "timer");
      let Gr = 480, qr = 65536;
      function Fr(n = {}) {
        var m, c;
        let i = 0, a = null, o = null, U = true;
        return { id: "body", require: ["area", "pos"], jumpForce: (m = n.jumpForce) != null ? m : Gr, weight: (c = n.weight) != null ? c : 1, update() {
          var E;
          this.move(0, i);
          let x = this.pushOutAll(), V = false;
          if (a && (!a.exists() || !this.isCollided(a) ? (this.trigger("fall", a), a = null, o = null, V = true) : o && a.pos && (this.pos = this.pos.add(a.pos.sub(o)), o = a.pos.clone())), !a) {
            i += Ae() * this.weight * T(), i = Math.min(i, (E = n.maxVel) != null ? E : qr);
            for (let F of x)
              F.side === "bottom" && i > 0 ? (a = F.obj, i = 0, a.pos && (o = a.pos.clone()), V || (this.trigger("ground", a), U = true)) : F.side === "top" && i < 0 && (i = 0, this.trigger("headbutt", F.obj));
          }
        }, curPlatform() {
          return a;
        }, grounded() {
          return a !== null;
        }, falling() {
          return i > 0;
        }, jump(x) {
          a = null, o = null, i = -x || -this.jumpForce;
        }, djump(x) {
          this.grounded() ? this.jump(x) : U && (U = false, this.jump(x), this.trigger("djump"));
        } };
      }
      __name(Fr, "Fr");
      s(Fr, "body");
      function Mr(n, i = {}) {
        let a = g.shaders[n];
        return { id: "shader", shader: n, uniform: i };
      }
      __name(Mr, "Mr");
      s(Mr, "shader");
      function Lr() {
        return { id: "solid", require: ["area"], solid: true };
      }
      __name(Lr, "Lr");
      s(Lr, "solid");
      function Yr() {
        return { id: "fixed", fixed: true };
      }
      __name(Yr, "Yr");
      s(Yr, "fixed");
      function Zr() {
        return { id: "stay", stay: true };
      }
      __name(Zr, "Zr");
      s(Zr, "stay");
      function zr(n) {
        if (n == null)
          throw new Error("health() requires the initial amount of hp");
        return { id: "health", hurt(i = 1) {
          this.setHP(n - i), this.trigger("hurt");
        }, heal(i = 1) {
          this.setHP(n + i), this.trigger("heal");
        }, hp() {
          return n;
        }, setHP(i) {
          n = i, n <= 0 && this.trigger("death");
        } };
      }
      __name(zr, "zr");
      s(zr, "health");
      function Or(n, i) {
        if (n == null)
          throw new Error("lifespan() requires time");
        let a = 0;
        return { id: "ilfespan", update() {
          a += T(), a >= n && (i && i.call(this), this.destroy());
        } };
      }
      __name(Or, "Or");
      s(Or, "lifespan");
      let J = { inspect: false, timeScale: 1, showLog: true, fps: t.fps, objCount() {
        return d.objs.size;
      }, stepFrame() {
        ze(true);
      }, drawCalls: u.drawCalls, clearLog: w.clear, log: w.info, error: w.error, get paused() {
        return d.paused;
      }, set paused(n) {
        d.paused = n, n ? r.ctx.suspend() : r.ctx.resume();
      } };
      function We(n) {
        d.loaded ? n() : d.on("load", n);
      }
      __name(We, "We");
      s(We, "ready");
      function $r(n, i) {
        d.scenes[n] = i;
      }
      __name($r, "$r");
      s($r, "scene");
      function Nr(n, ...i) {
        if (!d.scenes[n])
          throw new Error(`scene not found: ${n}`);
        d.on("next", () => {
          d.events = {}, d.objEvents = { add: new H(), update: new H(), draw: new H(), destroy: new H() }, d.actions = new H(), d.renders = new H(), d.objs.forEach((a) => {
            a.stay || Ce(a);
          }), d.timers = new H(), d.cam = { pos: dt(), scale: l(1, 1), angle: 0, shake: 0 }, d.camMousePos = t.mousePos(), d.camMatrix = te(), d.layers = {}, d.defLayer = null, d.gravity = Z, d.scenes[n](...i), e.debug !== false && Ze();
        });
      }
      __name(Nr, "Nr");
      s(Nr, "go");
      function jr(n, i) {
        try {
          return JSON.parse(window.localStorage[n]);
        } catch (a) {
          return i ? (ct(n, i), i) : null;
        }
      }
      __name(jr, "jr");
      s(jr, "getData");
      function ct(n, i) {
        window.localStorage[n] = JSON.stringify(i);
      }
      __name(ct, "ct");
      s(ct, "setData");
      function xe(n) {
        let i = n(ke);
        for (let a in i)
          ke[a] = i[a], e.global !== false && (window[a] = i[a]);
        return ke;
      }
      __name(xe, "xe");
      s(xe, "plug");
      function dt() {
        return l(f() / 2, v() / 2);
      }
      __name(dt, "dt");
      s(dt, "center");
      let ke = { loadRoot: g.loadRoot, loadSprite: g.loadSprite, loadSound: g.loadSound, loadFont: g.loadFont, loadShader: g.loadShader, load: g.load, width: f, height: v, center: dt, dt: T, time: t.time, screenshot: t.screenshot, focused: t.focused, focus: t.focus, cursor: t.cursor, regCursor: He, fullscreen: t.fullscreen, ready: We, isTouch: () => t.isTouch, layers: K, camPos: ie, camScale: pe, camRot: oe, shake: de, toScreen: ae, toWorld: Te, gravity: Ae, add: he, readd: me, destroy: Ce, destroyAll: Je, get: re, every: ge, revery: Xe, getComps: be, pos: Br, scale: ut, rotate: Dr, color: Sr, origin: Pr, layer: Tr, area: kr, sprite: Vr, text: Ir, rect: _r, outline: Xr, body: Fr, shader: Mr, timer: Wr, solid: Lr, fixed: Yr, stay: Zr, health: zr, lifespan: Or, z: Rr, move: Ar, on: h, action: p, render: y, collides: D, overlaps: k, clicks: _, hovers: z, keyDown: $, keyPress: X, keyPressRep: j, keyRelease: ee, mouseDown: Re, mouseClick: ue, mouseRelease: ye, mouseMove: we, charInput: Le, touchStart: Ye, touchMove: Ee, touchEnd: Qe, mousePos: W, mouseWorldPos: G, mouseDeltaPos: t.mouseDeltaPos, keyIsDown: t.keyDown, keyIsPressed: t.keyPressed, keyIsPressedRep: t.keyPressedRep, keyIsReleased: t.keyReleased, mouseIsDown: t.mouseDown, mouseIsClicked: t.mouseClicked, mouseIsReleased: t.mouseReleased, mouseIsMoved: t.mouseMoved, loop: A, wait: I, play: Y, volume: r.volume, burp: r.burp, audioCtx: r.ctx, rng: rt, rand: Fe, randSeed: wt, vec2: l, dir: $e, rgb: ce, rgba: Q, quad: se, choose: Ct, chance: Et, lerp: qe, map: Ie, mapc: bt, wave: xt, deg2rad: Ve, rad2deg: et, drawSprite: q, drawText: L, drawRect: u.drawRect, drawRectStroke: u.drawRectStroke, drawLine: u.drawLine, drawTri: u.drawTri, debug: J, scene: $r, go: Nr, getData: jr, setData: ct, plug: xe, ASCII_CHARS: at, CP437_CHARS: Nt, LEFT: l(-1, 0), RIGHT: l(1, 0), UP: l(0, -1), DOWN: l(0, 1), canvas: t.canvas };
      if (xe(ir), xe(ar), xe(cr), xe(mr), xe(pr), xe(vr), e.plugins && e.plugins.forEach(xe), e.global !== false)
        for (let n in ke)
          window[n] = ke[n];
      return t.run(() => {
        if (u.frameStart(), d.loaded)
          d.camMousePos = d.camMatrix.invert().multVec2(t.mousePos()), d.trigger("input"), ze(), J.inspect && Cr(), J.showLog && w.draw();
        else {
          let n = g.loadProgress();
          if (n === 1)
            d.loaded = true, d.trigger("load"), b && b.connect().catch(w.error);
          else {
            let i = f() / 2, a = 24 / u.scale(), o = l(f() / 2, v() / 2).sub(l(i / 2, a / 2));
            u.drawRect(l(0), f(), v(), { color: ce(0, 0, 0) }), u.drawRectStroke(o, i, a, { width: 4 / u.scale() }), u.drawRect(o, i * n, a);
          }
        }
        u.frameEnd();
      }), focus(), e.debug !== false && Ze(), window.addEventListener("error", (n) => {
        w.error(`Error: ${n.error.message}`), t.quit(), t.run(() => {
          g.loadProgress() === 1 && (u.frameStart(), w.draw(), u.frameEnd());
        });
      }), ke;
    };
  });
  var kaboom_default = xn();

  // helper.js
  window.kaboom = kaboom_default;
  window.addEventListener("error", (e) => {
    import_stacktrace_js.default.fromError(e.error).then((stack) => {
      fetch("/error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          msg: e.error.message,
          stack: stack.slice(0, 4).map((step) => {
            return __spreadProps(__spreadValues({}, step), {
              file: step.fileName.replace(location.origin + "/", ""),
              line: step.lineNumber,
              col: step.columnNumber
            });
          })
        })
      });
    }).catch(() => console.error("failed to parse err"));
  });
  var wsp = location.protocol === "https:" ? "wss" : "ws";
  var devws = new WebSocket(`${wsp}://${location.host}/devws`);
  devws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg === "REFRESH") {
      location.reload();
    }
  };
  window.replit = {
    user: null,
    getUser() {
      return fetch("/user").then((res) => res.json()).then((user) => {
        if (user) {
          this.user = user;
          return Promise.resolve(this.user);
        } else {
          return Promise.resolve(null);
        }
      });
    },
    authed() {
      return this.user !== null;
    },
    auth() {
      return new Promise((resolve, reject) => {
        if (this.authed()) {
          resolve(this.user);
          return;
        }
        const authComplete = /* @__PURE__ */ __name((e) => {
          if (e.data !== "auth_complete") {
            resolve(null);
            return;
          }
          window.removeEventListener("message", authComplete);
          authWindow.close();
          this.getUser().then(resolve);
        }, "authComplete");
        window.addEventListener("message", authComplete);
        const w = 320;
        const h = 480;
        const left = screen.width / 2 - w / 2;
        const top = screen.height / 2 - h / 2;
        const authWindow = window.open(`https://repl.it/auth_with_repl_site?domain=${location.host}`, "_blank", `modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`);
      });
    }
  };
  window.db = {
    getData(key, def) {
      return fetch(`/db/${key}`).then((res) => res.json()).then((val) => {
        if (val == null && def !== void 0) {
          return this.setData(key, def);
        }
        return Promise.resolve(val);
      });
    },
    setData(key, val) {
      return fetch(`/db/${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(val)
      }).then(() => Promise.resolve(val));
    }
  };
  replit.getUser();
})();
//# sourceMappingURL=helper.js.map
