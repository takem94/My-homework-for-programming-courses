(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],2:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],4:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],5:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],6:[function(require,module,exports){
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],7:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],8:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":1,"./iterableToArray":6,"./nonIterableSpread":7}],9:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":10}],10:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],11:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":9}],12:[function(require,module,exports){
"use strict";

var _ControllerMap = require("./modules/ControllerMap");

function load() {
  var mapController = new _ControllerMap.ControllerMap();
  mapController.init().then(function () {
    mapController.initListeners();
    mapController.initData();
  });
}

window.addEventListener('DOMContentLoaded', load);

},{"./modules/ControllerMap":13}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControllerMap = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ModelMap = require("./ModelMap");

var _ViewMap = require("./ViewMap");

var ControllerMap =
/*#__PURE__*/
function () {
  function ControllerMap() {
    (0, _classCallCheck2.default)(this, ControllerMap);
    this.data = null;
    this.ModelMap = new _ModelMap.ModelMap();
    this.ViewMap = new _ViewMap.ViewMap();
  }

  (0, _createClass2.default)(ControllerMap, [{
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.ViewMap.initYmap().then(function () {
          _this.ViewMap.init(_this.ModelMap.createMap());
        }).then(function () {
          _this.ModelMap.createClusterer(_this.ViewMap.getClustererContentLayout());

          _this.ModelMap.addClusterer(_this.ViewMap.map);

          resolve();
        });
      });
    }
  }, {
    key: "initListeners",
    value: function initListeners() {
      this.ViewMap.setEvenOnYmapClick(this.ViewMap.map, this.onMapClick.bind(this));
      this.ViewMap.setEventOnElemClick(this.ViewMap.modalCloseBtn, this.onModalCloseClick.bind(this));
      this.ViewMap.setEventOnElemClick(this.ViewMap.formAddBtn, this.onReviewAdd.bind(this));
      this.ViewMap.setEvenOnYmapClick(this.ModelMap.clusterer, this.onClusterClick.bind(this));
      this.ViewMap.setEventOnElemClick('', this.onLinkBalloonClick.bind(this));
      this.ViewMap.setEventOnElemClick('#saveDataBtn', this.onSaveClick.bind(this));
      this.ViewMap.setEventOnElemClick('#delDataBtn', this.onDelClick.bind(this));
    }
  }, {
    key: "initData",
    value: function initData() {
      var _this2 = this;

      var data = this.ModelMap.getSavedData();
      data.forEach(function (elem) {
        _this2.ModelMap.addCluster(_this2.ViewMap.getPointData(elem), elem.coords);
      });
    }
  }, {
    key: "onMapClick",
    value: function () {
      var _onMapClick = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(e) {
        var _this$ViewMap, addressResult;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.ViewMap.modalStatus) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", null);

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return this.ModelMap.getGeoAddress(this.ModelMap.getGeoCoordsFromEvent(e));

              case 5:
                addressResult = _context.sent;
                this.ViewMap.closeAllBallons(this.ModelMap.clusterer);
                this.ViewMap.changeAddress(addressResult);

                (_this$ViewMap = this.ViewMap).changeModalPosition.apply(_this$ViewMap, (0, _toConsumableArray2.default)(e.get('clientPixels')));

                this.ViewMap.renderReviews();
                this.ViewMap.changeModalState('disable', 'remove', true);
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                console.error('Ошибка при обработке клика.');
                console.error(_context.t0.message);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 13]]);
      }));

      function onMapClick(_x) {
        return _onMapClick.apply(this, arguments);
      }

      return onMapClick;
    }()
  }, {
    key: "onSaveClick",
    value: function onSaveClick() {
      this.ModelMap.saveData();
    }
  }, {
    key: "onDelClick",
    value: function onDelClick() {
      this.ModelMap.cleanData();
    }
  }, {
    key: "onModalCloseClick",
    value: function onModalCloseClick() {
      this.ViewMap.changeModalState('enable', 'add', false);
    }
  }, {
    key: "onReviewAdd",
    value: function onReviewAdd() {
      var review = this.ModelMap.getDataFromForm(this.ViewMap.inputList);
      this.ModelMap.addCluster(this.ViewMap.getPointData(review));
      this.ViewMap.renderReview(review);
      this.ModelMap.saveData();
    }
  }, {
    key: "onClusterClick",
    value: function onClusterClick(e) {
      this.ViewMap.changeModalState('enable', 'add', false);
      var data = this.ModelMap.getGeoObjectsFromEvent(e);
      this.ModelMap.getDataFromGeoObjects(data);
    }
  }, {
    key: "onLinkBalloonClick",
    value: function onLinkBalloonClick(e) {
      if (e.target.classList.contains('ballon-link')) {
        e.preventDefault();
        this.ModelMap.filterDataByCoords(parseInt(e.target.dataset.idCluster));
        this.ViewMap.closeAllBallons(this.ModelMap.clusterer);
        this.ViewMap.renderReviews({
          items: this.ModelMap.lastData
        });
        this.ViewMap.changeAddress(this.ModelMap.lastAddress);
        this.ViewMap.changeModalPosition(e.pageX, e.pageY);
        this.ViewMap.changeModalState('disable', 'remove', true);
      }
    }
  }]);
  return ControllerMap;
}();

exports.ControllerMap = ControllerMap;

},{"./ModelMap":14,"./ViewMap":15,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5,"@babel/runtime/helpers/toConsumableArray":8,"@babel/runtime/regenerator":11}],14:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelMap = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ModelMap =
/*#__PURE__*/
function () {
  function ModelMap() {
    (0, _classCallCheck2.default)(this, ModelMap);
    this.clusterer = null;
    this.lastCoords = null;
    this.lastAddress = null;
    this.lastData = null;
  }

  (0, _createClass2.default)(ModelMap, [{
    key: "createMap",
    value: function createMap() {
      return new global.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        behaviors: ['default', 'scrollZoom'],
        controls: []
      });
    }
  }, {
    key: "createClusterer",
    value: function createClusterer(contentLayout) {
      this.clusterer = new global.ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: contentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterBalloonPagerSize: 5,
        clusterBalloonContentLayoutHeight: 250,
        clusterBalloonContentLayoutWidth: 250,
        gridSize: 80
      });
      return this.clusterer;
    }
  }, {
    key: "addClusterer",
    value: function addClusterer(map) {
      map.geoObjects.add(this.clusterer);
    }
  }, {
    key: "addCluster",
    value: function addCluster(data, coords) {
      coords = coords || this.lastCoords;
      this.clusterer.add(new global.ymaps.Placemark(coords, data, this.getPointOptions()));
    }
  }, {
    key: "getDataFromForm",
    value: function getDataFromForm(inputs) {
      var status = 0;
      var dateStamp = new Date();
      var data = {
        time: dateStamp.toLocaleDateString() + ' ' + dateStamp.toLocaleTimeString(),
        address: this.lastAddress,
        coords: this.lastCoords
      };
      inputs.forEach(function (input) {
        if (input.value.length > 2) {
          data[input.name] = input.value;
          status++;
        }
      });

      if (status === inputs.length) {
        inputs.forEach(function (input) {
          input.value = '';
        });
        return data;
      } else {
        window.alert('Заполните все поля!');
      }
    }
  }, {
    key: "getPointOptions",
    value: function getPointOptions() {
      return {
        preset: 'islands#violetIcon'
      };
    }
  }, {
    key: "getGeoObjectsFromEvent",
    value: function getGeoObjectsFromEvent(event) {
      this.lastData = event.get('target');
      var geoObjects = this.lastData.properties.get('geoObjects'); // Check on balloons collection or single place-mark.

      this.lastData = geoObjects || [this.lastData];
      return this.lastData;
    }
  }, {
    key: "getDataFromGeoObjects",
    value: function getDataFromGeoObjects(geoObjects) {
      var dataArray = []; // Fill array by inner data of each element

      for (var i = 0; i < geoObjects.length; ++i) {
        dataArray.push(geoObjects[i].properties.get('clusterData'));
      }

      this.lastData = dataArray;
      return this.lastData;
    }
  }, {
    key: "getGeoCoordsFromEvent",
    value: function getGeoCoordsFromEvent(event) {
      this.lastCoords = event.get('coords');
      return this.lastCoords;
    }
  }, {
    key: "getGeoAddress",
    value: function getGeoAddress(coords) {
      var _this = this;

      return new Promise(function (resolve) {
        global.ymaps.geocode(coords).then(function (data) {
          _this.lastAddress = data.geoObjects.get(0).properties.get('text');
          resolve(_this.lastAddress);
        });
      });
    }
  }, {
    key: "filterDataByCoords",
    value: function filterDataByCoords(id) {
      var data = this.lastData;
      var newData = [];
      var coords;
      var title;

      for (var i = 0; i < this.lastData.length; ++i) {
        if (!title && data[i].id === id) {
          title = data[i].address;
          coords = data[i].coords;
          i = 0;
        }

        if (coords && coords[0] === data[i].coords[0] && coords[1] === data[i].coords[1]) {
          newData.push(data[i]);
        }
      }

      this.lastData = newData;

      if (title && coords) {
        this.lastAddress = title;
        this.lastCoords = coords;
      }

      return this.lastData;
    }
  }, {
    key: "saveData",
    value: function saveData() {
      var tempData = this.lastData;
      var allData = this.clusterer.getGeoObjects();
      this.getDataFromGeoObjects(allData);
      global.localStorage['mapBalloonsData'] = JSON.stringify(this.lastData);
      this.lastData = tempData;
    }
  }, {
    key: "cleanData",
    value: function cleanData() {
      global.localStorage['mapBalloonsData'] = '';
      this.clusterer.removeAll();
    }
  }, {
    key: "getSavedData",
    value: function getSavedData() {
      return global.localStorage['mapBalloonsData'] ? JSON.parse(global.localStorage['mapBalloonsData']) : [];
    }
  }]);
  return ModelMap;
}();

exports.ModelMap = ModelMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5}],15:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewMap = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ViewMap =
/*#__PURE__*/
function () {
  function ViewMap() {
    (0, _classCallCheck2.default)(this, ViewMap);
    this.modalStatus = false; // false = hidden, true = shown

    this.idCounter = 0;
    this.modalElem = null;
    this.modalCloseBtn = null;
    this.modalAddress = null;
    this.formAddBtn = null;
    this.inputList = null;
    this.map = null;
    this._reviewContainer = null;
    this._reviewsTemplate = null;
  }

  (0, _createClass2.default)(ViewMap, [{
    key: "init",
    value: function init(map) {
      this.map = map;
      this.createModalTemplate();
      this.createReviewsTemplate();
    }
  }, {
    key: "initYmap",
    value: function initYmap() {
      return new Promise(function (resolve) {
        global.ymaps.ready(resolve);
      });
    }
  }, {
    key: "createModalTemplate",
    value: function createModalTemplate() {
      var temp = document.querySelector('#modalTemplate');
      temp = global.Handlebars.compile(temp.innerHTML);
      this.modalElem = document.querySelector('#modal');
      this.modalElem.innerHTML += temp();
      this.modalElem = this.modalElem.firstElementChild;
      this.inputList = this.modalElem.querySelectorAll('input, textarea');
      this.formAddBtn = this.modalElem.querySelector('.review-modal__body-form-btn');
      this.modalCloseBtn = this.modalElem.querySelector('.review-modal__header-close');
      this.modalAddress = this.modalElem.querySelector('#modalAddress');
      this._reviewContainer = this.modalElem.querySelector('.reviews-list__container');
    }
  }, {
    key: "createReviewsTemplate",
    value: function createReviewsTemplate() {
      this._reviewsTemplate = document.querySelector('#reviewListTemplate');
      this._reviewsTemplate = global.Handlebars.compile(this._reviewsTemplate.innerHTML);
    }
  }, {
    key: "renderReviews",
    value: function renderReviews(items) {
      this._reviewContainer.innerHTML = this._reviewsTemplate(items);
      this.scrollReviewsToBottom();
    }
  }, {
    key: "renderReview",
    value: function renderReview(item) {
      if (this._reviewContainer.querySelector('.reviews-list__empty')) {
        this.renderReviews({
          items: [item]
        });
      } else {
        this._reviewContainer.innerHTML += this._reviewsTemplate({
          items: [item]
        });
        this.scrollReviewsToBottom();
      }
    }
  }, {
    key: "getClustererContentLayout",
    value: function getClustererContentLayout() {
      return global.ymaps.templateLayoutFactory.createClass('<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' + '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' + '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>');
    }
  }, {
    key: "getPointData",
    value: function getPointData(data) {
      data.id = this.idCounter;
      return {
        balloonContentHeader: "<font size=3><b>".concat(data.place, "</b></font>"),
        balloonContentBody: "<p style=\"margin: 0;\"><a href=\"#\" data-id-cluster=\"".concat(this.idCounter++, "\" class=\"ballon-link\">").concat(data.address, "</a></p><br>") + "<p style=\"margin: 0; word-break: break-word;\">".concat(data.message, "</p>"),
        balloonContentFooter: "<font size=2><div style=\"position: relative; height: 18px;\"><span style=\"position: absolute; right: 0;\">".concat(data.time, "</span></div></font>"),
        clusterData: data
      };
    }
  }, {
    key: "scrollReviewsToBottom",
    value: function scrollReviewsToBottom() {
      this._reviewContainer.parentElement.scrollTop = this._reviewContainer.parentElement.scrollHeight;
    }
  }, {
    key: "setEventOnElemClick",
    value: function setEventOnElemClick(elem, func) {
      if (elem === '') {
        elem = document.body;
      } else if (typeof elem === 'string' && elem.length > 0) {
        elem = document.querySelector(elem);
      }

      elem.addEventListener('click', func);
    }
  }, {
    key: "setEvenOnYmapClick",
    value: function setEvenOnYmapClick(ymap, func) {
      ymap.events.add('click', func);
    }
  }, {
    key: "changeAddress",
    value: function changeAddress(string) {
      this.modalAddress.innerText = string;
    }
  }, {
    key: "changeMapBehavior",
    value: function changeMapBehavior(on) {
      this.map.behaviors[on](['drag', 'scrollZoom', 'dblClickZoom']);
    }
  }, {
    key: "changeModalState",
    value: function changeModalState(changeBehavior, changeClass, changeStatus) {
      if (this.modalStatus !== changeStatus) {
        this.changeMapBehavior(changeBehavior);
        this.modalElem.classList[changeClass]('hide');
        this.modalStatus = changeStatus;
      }
    }
  }, {
    key: "changeModalPosition",
    value: function changeModalPosition(x, y) {
      var modal = this.modalElem;
      var coordsModalY = modal.clientHeight + y;
      var coordsModalX = modal.clientWidth + x;

      if (coordsModalX > window.innerWidth) {
        coordsModalX = window.innerWidth - modal.clientWidth - 10;
      } else {
        coordsModalX = x;
      }

      if (coordsModalY > window.innerHeight) {
        coordsModalY = window.innerHeight - modal.clientHeight - 10;
      } else {
        coordsModalY = y;
      }

      modal.style.left = coordsModalX + 'px';
      modal.style.top = coordsModalY + 'px';
    }
  }, {
    key: "closeAllBallons",
    value: function closeAllBallons(clusterer) {
      this.map.balloon.close();
      clusterer.balloon.close();
    }
  }]);
  return ViewMap;
}();

exports.ViewMap = ViewMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwic3JjL2pzL2FwcC5qcyIsInNyYy9qcy9tb2R1bGVzL0NvbnRyb2xsZXJNYXAuanMiLCJzcmMvanMvbW9kdWxlcy9Nb2RlbE1hcC5qcyIsInNyYy9qcy9tb2R1bGVzL1ZpZXdNYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFqQjtBQUVBLFVBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFOLEdBQXFCLENBQXhDO0FBQ0EsVUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFdBQU4sR0FBb0IsQ0FBdkM7O0FBRUEsVUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQTFCLEVBQXNDO0FBQ3BDLFFBQUEsWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLEtBQUssQ0FBQyxXQUExQixHQUF3QyxFQUF2RDtBQUNELE9BRkQsTUFFTztBQUNMLFFBQUEsWUFBWSxHQUFHLENBQWY7QUFDRDs7QUFFRCxVQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBMUIsRUFBdUM7QUFDckMsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsS0FBSyxDQUFDLFlBQTNCLEdBQTBDLEVBQXpEO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsUUFBQSxZQUFZLEdBQUcsQ0FBZjtBQUNEOztBQUVELE1BQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFaLEdBQW1CLFlBQVksR0FBRyxJQUFsQztBQUNBLE1BQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEdBQWtCLFlBQVksR0FBRyxJQUFqQztBQUNEOzs7b0NBRWdCLFMsRUFBVztBQUMxQixXQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLEtBQWpCO0FBQ0EsTUFBQSxTQUFTLENBQUMsT0FBVixDQUFrQixLQUFsQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIGRlZmF1bHQ6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbiAgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiaW1wb3J0IHsgQ29udHJvbGxlck1hcCB9IGZyb20gJy4vbW9kdWxlcy9Db250cm9sbGVyTWFwJztcclxuXHJcbmZ1bmN0aW9uIGxvYWQgKCkge1xuICBsZXQgbWFwQ29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyTWFwKCk7XHJcblxyXG4gIG1hcENvbnRyb2xsZXJcclxuICAgIC5pbml0KClcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgbWFwQ29udHJvbGxlci5pbml0TGlzdGVuZXJzKCk7XHJcbiAgICAgIG1hcENvbnRyb2xsZXIuaW5pdERhdGEoKTtcclxuICAgIH0pO1xufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBsb2FkKTtcbiIsImltcG9ydCB7IE1vZGVsTWFwIH0gZnJvbSAnLi9Nb2RlbE1hcCc7XHJcbmltcG9ydCB7IFZpZXdNYXAgfSBmcm9tICcuL1ZpZXdNYXAnO1xyXG5cclxuY2xhc3MgQ29udHJvbGxlck1hcCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLk1vZGVsTWFwID0gbmV3IE1vZGVsTWFwKCk7XHJcbiAgICB0aGlzLlZpZXdNYXAgPSBuZXcgVmlld01hcCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuVmlld01hcC5pbml0WW1hcCgpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLlZpZXdNYXAuaW5pdCh0aGlzLk1vZGVsTWFwLmNyZWF0ZU1hcCgpKTsgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLk1vZGVsTWFwLmNyZWF0ZUNsdXN0ZXJlcih0aGlzLlZpZXdNYXAuZ2V0Q2x1c3RlcmVyQ29udGVudExheW91dCgpKTtcclxuICAgICAgICAgIHRoaXMuTW9kZWxNYXAuYWRkQ2x1c3RlcmVyKHRoaXMuVmlld01hcC5tYXApO1xyXG5cclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdExpc3RlbmVycyAoKSB7XHJcbiAgICB0aGlzLlZpZXdNYXAuc2V0RXZlbk9uWW1hcENsaWNrKHRoaXMuVmlld01hcC5tYXAsIHRoaXMub25NYXBDbGljay5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuVmlld01hcC5zZXRFdmVudE9uRWxlbUNsaWNrKHRoaXMuVmlld01hcC5tb2RhbENsb3NlQnRuLCB0aGlzLm9uTW9kYWxDbG9zZUNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5WaWV3TWFwLnNldEV2ZW50T25FbGVtQ2xpY2sodGhpcy5WaWV3TWFwLmZvcm1BZGRCdG4sIHRoaXMub25SZXZpZXdBZGQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLlZpZXdNYXAuc2V0RXZlbk9uWW1hcENsaWNrKHRoaXMuTW9kZWxNYXAuY2x1c3RlcmVyLCB0aGlzLm9uQ2x1c3RlckNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5WaWV3TWFwLnNldEV2ZW50T25FbGVtQ2xpY2soJycsIHRoaXMub25MaW5rQmFsbG9vbkNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5WaWV3TWFwLnNldEV2ZW50T25FbGVtQ2xpY2soJyNzYXZlRGF0YUJ0bicsIHRoaXMub25TYXZlQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLlZpZXdNYXAuc2V0RXZlbnRPbkVsZW1DbGljaygnI2RlbERhdGFCdG4nLCB0aGlzLm9uRGVsQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBpbml0RGF0YSAoKSB7XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuTW9kZWxNYXAuZ2V0U2F2ZWREYXRhKCk7XHJcbiAgICBkYXRhLmZvckVhY2goZWxlbSA9PiB7IHRoaXMuTW9kZWxNYXAuYWRkQ2x1c3Rlcih0aGlzLlZpZXdNYXAuZ2V0UG9pbnREYXRhKGVsZW0pLCBlbGVtLmNvb3Jkcyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25NYXBDbGljayAoZSkge1xyXG4gICAgaWYgKHRoaXMuVmlld01hcC5tb2RhbFN0YXR1cykgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBhZGRyZXNzUmVzdWx0ID0gYXdhaXQgdGhpcy5Nb2RlbE1hcC5nZXRHZW9BZGRyZXNzKHRoaXMuTW9kZWxNYXAuZ2V0R2VvQ29vcmRzRnJvbUV2ZW50KGUpKTtcclxuXHJcbiAgICAgIHRoaXMuVmlld01hcC5jbG9zZUFsbEJhbGxvbnModGhpcy5Nb2RlbE1hcC5jbHVzdGVyZXIpO1xyXG5cclxuICAgICAgdGhpcy5WaWV3TWFwLmNoYW5nZUFkZHJlc3MoYWRkcmVzc1Jlc3VsdCk7XHJcbiAgICAgIHRoaXMuVmlld01hcC5jaGFuZ2VNb2RhbFBvc2l0aW9uKC4uLmUuZ2V0KCdjbGllbnRQaXhlbHMnKSk7XHJcblxyXG4gICAgICB0aGlzLlZpZXdNYXAucmVuZGVyUmV2aWV3cygpO1xyXG4gICAgICB0aGlzLlZpZXdNYXAuY2hhbmdlTW9kYWxTdGF0ZSgnZGlzYWJsZScsICdyZW1vdmUnLCB0cnVlKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCfQntGI0LjQsdC60LAg0L/RgNC4INC+0LHRgNCw0LHQvtGC0LrQtSDQutC70LjQutCwLicpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2F2ZUNsaWNrICgpIHtcclxuICAgIHRoaXMuTW9kZWxNYXAuc2F2ZURhdGEoKTtcclxuICB9XHJcblxyXG4gIG9uRGVsQ2xpY2sgKCkge1xyXG4gICAgdGhpcy5Nb2RlbE1hcC5jbGVhbkRhdGEoKTtcclxuICB9XHJcblxyXG4gIG9uTW9kYWxDbG9zZUNsaWNrICgpIHtcclxuICAgIHRoaXMuVmlld01hcC5jaGFuZ2VNb2RhbFN0YXRlKCdlbmFibGUnLCAnYWRkJywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgb25SZXZpZXdBZGQgKCkge1xyXG4gICAgbGV0IHJldmlldyA9IHRoaXMuTW9kZWxNYXAuZ2V0RGF0YUZyb21Gb3JtKHRoaXMuVmlld01hcC5pbnB1dExpc3QpO1xyXG5cclxuICAgIHRoaXMuTW9kZWxNYXAuYWRkQ2x1c3Rlcih0aGlzLlZpZXdNYXAuZ2V0UG9pbnREYXRhKHJldmlldykpO1xyXG4gICAgdGhpcy5WaWV3TWFwLnJlbmRlclJldmlldyhyZXZpZXcpO1xyXG5cclxuICAgIHRoaXMuTW9kZWxNYXAuc2F2ZURhdGEoKTtcclxuICB9XHJcblxyXG4gIG9uQ2x1c3RlckNsaWNrIChlKSB7XHJcbiAgICB0aGlzLlZpZXdNYXAuY2hhbmdlTW9kYWxTdGF0ZSgnZW5hYmxlJywgJ2FkZCcsIGZhbHNlKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuTW9kZWxNYXAuZ2V0R2VvT2JqZWN0c0Zyb21FdmVudChlKTtcclxuICAgIHRoaXMuTW9kZWxNYXAuZ2V0RGF0YUZyb21HZW9PYmplY3RzKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rQmFsbG9vbkNsaWNrIChlKSB7XHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYWxsb24tbGluaycpKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHRoaXMuTW9kZWxNYXAuZmlsdGVyRGF0YUJ5Q29vcmRzKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaWRDbHVzdGVyKSk7XHJcblxyXG4gICAgICB0aGlzLlZpZXdNYXAuY2xvc2VBbGxCYWxsb25zKHRoaXMuTW9kZWxNYXAuY2x1c3RlcmVyKTtcclxuXHJcbiAgICAgIHRoaXMuVmlld01hcC5yZW5kZXJSZXZpZXdzKHsgaXRlbXM6IHRoaXMuTW9kZWxNYXAubGFzdERhdGEgfSk7XHJcblxyXG4gICAgICB0aGlzLlZpZXdNYXAuY2hhbmdlQWRkcmVzcyh0aGlzLk1vZGVsTWFwLmxhc3RBZGRyZXNzKTtcclxuICAgICAgdGhpcy5WaWV3TWFwLmNoYW5nZU1vZGFsUG9zaXRpb24oZS5wYWdlWCwgZS5wYWdlWSk7XHJcbiAgICAgIHRoaXMuVmlld01hcC5jaGFuZ2VNb2RhbFN0YXRlKCdkaXNhYmxlJywgJ3JlbW92ZScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29udHJvbGxlck1hcCB9O1xyXG4iLCJjbGFzcyBNb2RlbE1hcCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy5jbHVzdGVyZXIgPSBudWxsO1xyXG4gICAgdGhpcy5sYXN0Q29vcmRzID0gbnVsbDtcclxuICAgIHRoaXMubGFzdEFkZHJlc3MgPSBudWxsO1xyXG4gICAgdGhpcy5sYXN0RGF0YSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNYXAgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBnbG9iYWwueW1hcHMuTWFwKCdtYXAnLCB7XHJcbiAgICAgIGNlbnRlcjogWzU1Ljc2LCAzNy42NF0sXHJcbiAgICAgIHpvb206IDEwLFxyXG4gICAgICBiZWhhdmlvcnM6IFsnZGVmYXVsdCcsICdzY3JvbGxab29tJ10sXHJcbiAgICAgIGNvbnRyb2xzOiBbXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDbHVzdGVyZXIgKGNvbnRlbnRMYXlvdXQpIHtcclxuICAgIHRoaXMuY2x1c3RlcmVyID0gbmV3IGdsb2JhbC55bWFwcy5DbHVzdGVyZXIoe1xyXG4gICAgICBwcmVzZXQ6ICdpc2xhbmRzI2ludmVydGVkVmlvbGV0Q2x1c3Rlckljb25zJyxcclxuICAgICAgY2x1c3RlckJhbGxvb25Db250ZW50TGF5b3V0OiAnY2x1c3RlciNiYWxsb29uQ2Fyb3VzZWwnLFxyXG4gICAgICBjbHVzdGVyQmFsbG9vbkl0ZW1Db250ZW50TGF5b3V0OiBjb250ZW50TGF5b3V0LFxyXG4gICAgICBjbHVzdGVyQmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcclxuICAgICAgZ3JvdXBCeUNvb3JkaW5hdGVzOiBmYWxzZSxcclxuICAgICAgY2x1c3RlckRpc2FibGVDbGlja1pvb206IHRydWUsXHJcbiAgICAgIGNsdXN0ZXJIaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxyXG4gICAgICBnZW9PYmplY3RIaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxyXG4gICAgICBjbHVzdGVyQmFsbG9vblBhZ2VyU2l6ZTogNSxcclxuICAgICAgY2x1c3RlckJhbGxvb25Db250ZW50TGF5b3V0SGVpZ2h0OiAyNTAsXHJcbiAgICAgIGNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dFdpZHRoOiAyNTAsXHJcbiAgICAgIGdyaWRTaXplOiA4MFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY2x1c3RlcmVyO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2x1c3RlcmVyIChtYXApIHtcclxuICAgIG1hcC5nZW9PYmplY3RzLmFkZCh0aGlzLmNsdXN0ZXJlcik7XHJcbiAgfVxyXG5cclxuICBhZGRDbHVzdGVyIChkYXRhLCBjb29yZHMpIHtcclxuICAgIGNvb3JkcyA9IGNvb3JkcyB8fCB0aGlzLmxhc3RDb29yZHM7XHJcbiAgICB0aGlzLmNsdXN0ZXJlci5hZGQobmV3IGdsb2JhbC55bWFwcy5QbGFjZW1hcmsoY29vcmRzLCBkYXRhLCB0aGlzLmdldFBvaW50T3B0aW9ucygpKSk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhRnJvbUZvcm0gKGlucHV0cykge1xyXG4gICAgbGV0IHN0YXR1cyA9IDA7XHJcbiAgICBsZXQgZGF0ZVN0YW1wID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICB0aW1lOiBkYXRlU3RhbXAudG9Mb2NhbGVEYXRlU3RyaW5nKCkgKyAnICcgKyBkYXRlU3RhbXAudG9Mb2NhbGVUaW1lU3RyaW5nKCksXHJcbiAgICAgIGFkZHJlc3M6IHRoaXMubGFzdEFkZHJlc3MsXHJcbiAgICAgIGNvb3JkczogdGhpcy5sYXN0Q29vcmRzXHJcbiAgICB9O1xyXG5cclxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgICAgaWYgKGlucHV0LnZhbHVlLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICBkYXRhW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgc3RhdHVzKys7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09IGlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4geyBpbnB1dC52YWx1ZSA9ICcnOyB9KTtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuYWxlcnQoJ9CX0LDQv9C+0LvQvdC40YLQtSDQstGB0LUg0L/QvtC70Y8hJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludE9wdGlvbnMgKCkge1xyXG4gICAgcmV0dXJuIHsgcHJlc2V0OiAnaXNsYW5kcyN2aW9sZXRJY29uJyB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0R2VvT2JqZWN0c0Zyb21FdmVudCAoZXZlbnQpIHtcclxuICAgIHRoaXMubGFzdERhdGEgPSBldmVudC5nZXQoJ3RhcmdldCcpO1xyXG5cclxuICAgIGxldCBnZW9PYmplY3RzID0gdGhpcy5sYXN0RGF0YS5wcm9wZXJ0aWVzLmdldCgnZ2VvT2JqZWN0cycpO1xyXG4gICAgLy8gQ2hlY2sgb24gYmFsbG9vbnMgY29sbGVjdGlvbiBvciBzaW5nbGUgcGxhY2UtbWFyay5cclxuICAgIHRoaXMubGFzdERhdGEgPSBnZW9PYmplY3RzIHx8IFt0aGlzLmxhc3REYXRhXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXN0RGF0YTtcclxuICB9XHJcblxyXG4gIGdldERhdGFGcm9tR2VvT2JqZWN0cyAoZ2VvT2JqZWN0cykge1xyXG4gICAgbGV0IGRhdGFBcnJheSA9IFtdO1xyXG4gICAgLy8gRmlsbCBhcnJheSBieSBpbm5lciBkYXRhIG9mIGVhY2ggZWxlbWVudFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZW9PYmplY3RzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGRhdGFBcnJheS5wdXNoKGdlb09iamVjdHNbaV0ucHJvcGVydGllcy5nZXQoJ2NsdXN0ZXJEYXRhJykpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXN0RGF0YSA9IGRhdGFBcnJheTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXN0RGF0YTtcclxuICB9XHJcblxyXG4gIGdldEdlb0Nvb3Jkc0Zyb21FdmVudCAoZXZlbnQpIHtcclxuICAgIHRoaXMubGFzdENvb3JkcyA9IGV2ZW50LmdldCgnY29vcmRzJyk7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0Q29vcmRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0R2VvQWRkcmVzcyAoY29vcmRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGdsb2JhbC55bWFwcy5nZW9jb2RlKGNvb3JkcykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMubGFzdEFkZHJlc3MgPSBkYXRhLmdlb09iamVjdHMuZ2V0KDApLnByb3BlcnRpZXMuZ2V0KCd0ZXh0Jyk7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmxhc3RBZGRyZXNzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZpbHRlckRhdGFCeUNvb3JkcyAoaWQpIHtcclxuICAgIGxldCBkYXRhID0gdGhpcy5sYXN0RGF0YTsgbGV0IG5ld0RhdGEgPSBbXTsgbGV0IGNvb3JkczsgbGV0IHRpdGxlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXN0RGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICBpZiAoIXRpdGxlICYmIGRhdGFbaV0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgdGl0bGUgPSBkYXRhW2ldLmFkZHJlc3M7XHJcbiAgICAgICAgY29vcmRzID0gZGF0YVtpXS5jb29yZHM7XHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb29yZHMgJiYgY29vcmRzWzBdID09PSBkYXRhW2ldLmNvb3Jkc1swXSAmJiBjb29yZHNbMV0gPT09IGRhdGFbaV0uY29vcmRzWzFdKSB7XHJcbiAgICAgICAgbmV3RGF0YS5wdXNoKGRhdGFbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXN0RGF0YSA9IG5ld0RhdGE7XHJcblxyXG4gICAgaWYgKHRpdGxlICYmIGNvb3Jkcykge1xyXG4gICAgICB0aGlzLmxhc3RBZGRyZXNzID0gdGl0bGU7XHJcbiAgICAgIHRoaXMubGFzdENvb3JkcyA9IGNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXN0RGF0YTtcclxuICB9XHJcblxyXG4gIHNhdmVEYXRhICgpIHtcclxuICAgIGxldCB0ZW1wRGF0YSA9IHRoaXMubGFzdERhdGE7XHJcblxyXG4gICAgbGV0IGFsbERhdGEgPSB0aGlzLmNsdXN0ZXJlci5nZXRHZW9PYmplY3RzKCk7XHJcbiAgICB0aGlzLmdldERhdGFGcm9tR2VvT2JqZWN0cyhhbGxEYXRhKTtcclxuICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2VbJ21hcEJhbGxvb25zRGF0YSddID0gSlNPTi5zdHJpbmdpZnkodGhpcy5sYXN0RGF0YSk7XHJcblxyXG4gICAgdGhpcy5sYXN0RGF0YSA9IHRlbXBEYXRhO1xyXG4gIH1cclxuXHJcbiAgY2xlYW5EYXRhICgpIHtcclxuICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2VbJ21hcEJhbGxvb25zRGF0YSddID0gJyc7XHJcbiAgICB0aGlzLmNsdXN0ZXJlci5yZW1vdmVBbGwoKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVkRGF0YSAoKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmxvY2FsU3RvcmFnZVsnbWFwQmFsbG9vbnNEYXRhJ10gPyBKU09OLnBhcnNlKGdsb2JhbC5sb2NhbFN0b3JhZ2VbJ21hcEJhbGxvb25zRGF0YSddKSA6IFtdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTW9kZWxNYXAgfTtcclxuIiwiY2xhc3MgVmlld01hcCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy5tb2RhbFN0YXR1cyA9IGZhbHNlOyAvLyBmYWxzZSA9IGhpZGRlbiwgdHJ1ZSA9IHNob3duXHJcbiAgICB0aGlzLmlkQ291bnRlciA9IDA7XHJcblxyXG4gICAgdGhpcy5tb2RhbEVsZW0gPSBudWxsO1xyXG4gICAgdGhpcy5tb2RhbENsb3NlQnRuID0gbnVsbDtcclxuICAgIHRoaXMubW9kYWxBZGRyZXNzID0gbnVsbDtcclxuICAgIHRoaXMuZm9ybUFkZEJ0biA9IG51bGw7XHJcbiAgICB0aGlzLmlucHV0TGlzdCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5tYXAgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX3Jldmlld0NvbnRhaW5lciA9IG51bGw7XHJcbiAgICB0aGlzLl9yZXZpZXdzVGVtcGxhdGUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgaW5pdCAobWFwKSB7XHJcbiAgICB0aGlzLm1hcCA9IG1hcDtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU1vZGFsVGVtcGxhdGUoKTtcclxuICAgIHRoaXMuY3JlYXRlUmV2aWV3c1RlbXBsYXRlKCk7XHJcbiAgfVxyXG5cclxuICBpbml0WW1hcCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGdsb2JhbC55bWFwcy5yZWFkeShyZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTW9kYWxUZW1wbGF0ZSAoKSB7XHJcbiAgICBsZXQgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbFRlbXBsYXRlJyk7XHJcbiAgICB0ZW1wID0gZ2xvYmFsLkhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wLmlubmVySFRNTCk7XHJcblxyXG4gICAgdGhpcy5tb2RhbEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKTtcclxuICAgIHRoaXMubW9kYWxFbGVtLmlubmVySFRNTCArPSB0ZW1wKCk7XHJcbiAgICB0aGlzLm1vZGFsRWxlbSA9IHRoaXMubW9kYWxFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuICAgIHRoaXMuaW5wdXRMaXN0ID0gdGhpcy5tb2RhbEVsZW0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHRleHRhcmVhJyk7XHJcblxyXG4gICAgdGhpcy5mb3JtQWRkQnRuID0gdGhpcy5tb2RhbEVsZW0ucXVlcnlTZWxlY3RvcignLnJldmlldy1tb2RhbF9fYm9keS1mb3JtLWJ0bicpO1xyXG4gICAgdGhpcy5tb2RhbENsb3NlQnRuID0gdGhpcy5tb2RhbEVsZW0ucXVlcnlTZWxlY3RvcignLnJldmlldy1tb2RhbF9faGVhZGVyLWNsb3NlJyk7XHJcbiAgICB0aGlzLm1vZGFsQWRkcmVzcyA9IHRoaXMubW9kYWxFbGVtLnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbEFkZHJlc3MnKTtcclxuICAgIHRoaXMuX3Jldmlld0NvbnRhaW5lciA9IHRoaXMubW9kYWxFbGVtLnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzLWxpc3RfX2NvbnRhaW5lcicpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmV2aWV3c1RlbXBsYXRlICgpIHtcclxuICAgIHRoaXMuX3Jldmlld3NUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXZpZXdMaXN0VGVtcGxhdGUnKTtcclxuICAgIHRoaXMuX3Jldmlld3NUZW1wbGF0ZSA9IGdsb2JhbC5IYW5kbGViYXJzLmNvbXBpbGUodGhpcy5fcmV2aWV3c1RlbXBsYXRlLmlubmVySFRNTCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJSZXZpZXdzIChpdGVtcykge1xyXG4gICAgdGhpcy5fcmV2aWV3Q29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuX3Jldmlld3NUZW1wbGF0ZShpdGVtcyk7XHJcbiAgICB0aGlzLnNjcm9sbFJldmlld3NUb0JvdHRvbSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyUmV2aWV3IChpdGVtKSB7XHJcbiAgICBpZiAodGhpcy5fcmV2aWV3Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzLWxpc3RfX2VtcHR5JykpIHtcclxuICAgICAgdGhpcy5yZW5kZXJSZXZpZXdzKHsgaXRlbXM6IFtpdGVtXSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3Jldmlld0NvbnRhaW5lci5pbm5lckhUTUwgKz0gdGhpcy5fcmV2aWV3c1RlbXBsYXRlKHsgaXRlbXM6IFtpdGVtXSB9KTtcclxuICAgICAgdGhpcy5zY3JvbGxSZXZpZXdzVG9Cb3R0b20oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENsdXN0ZXJlckNvbnRlbnRMYXlvdXQgKCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC55bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICAgICc8aDIgY2xhc3M9YmFsbG9uX2hlYWRlcj57eyBwcm9wZXJ0aWVzLmJhbGxvb25Db250ZW50SGVhZGVyfHJhdyB9fTwvaDI+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPWJhbGxvbl9ib2R5Pnt7IHByb3BlcnRpZXMuYmFsbG9vbkNvbnRlbnRCb2R5fHJhdyB9fTwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1iYWxsb25fZm9vdGVyPnt7IHByb3BlcnRpZXMuYmFsbG9vbkNvbnRlbnRGb290ZXJ8cmF3IH19PC9kaXY+J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFBvaW50RGF0YSAoZGF0YSkge1xyXG4gICAgZGF0YS5pZCA9IHRoaXMuaWRDb3VudGVyO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOiBgPGZvbnQgc2l6ZT0zPjxiPiR7ZGF0YS5wbGFjZX08L2I+PC9mb250PmAsXHJcbiAgICAgIGJhbGxvb25Db250ZW50Qm9keTogYDxwIHN0eWxlPVwibWFyZ2luOiAwO1wiPjxhIGhyZWY9XCIjXCIgZGF0YS1pZC1jbHVzdGVyPVwiJHt0aGlzLmlkQ291bnRlcisrfVwiIGNsYXNzPVwiYmFsbG9uLWxpbmtcIj4ke2RhdGEuYWRkcmVzc308L2E+PC9wPjxicj5gICtcclxuICAgICAgICAgICAgYDxwIHN0eWxlPVwibWFyZ2luOiAwOyB3b3JkLWJyZWFrOiBicmVhay13b3JkO1wiPiR7ZGF0YS5tZXNzYWdlfTwvcD5gLFxyXG4gICAgICBiYWxsb29uQ29udGVudEZvb3RlcjogYDxmb250IHNpemU9Mj48ZGl2IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBoZWlnaHQ6IDE4cHg7XCI+PHNwYW4gc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHJpZ2h0OiAwO1wiPiR7ZGF0YS50aW1lfTwvc3Bhbj48L2Rpdj48L2ZvbnQ+YCxcclxuICAgICAgY2x1c3RlckRhdGE6IGRhdGFcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzY3JvbGxSZXZpZXdzVG9Cb3R0b20gKCkge1xyXG4gICAgdGhpcy5fcmV2aWV3Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5fcmV2aWV3Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRPbkVsZW1DbGljayAoZWxlbSwgZnVuYykge1xyXG4gICAgaWYgKGVsZW0gPT09ICcnKSB7IGVsZW0gPSBkb2N1bWVudC5ib2R5OyB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtID09PSAnc3RyaW5nJyAmJiBlbGVtLmxlbmd0aCA+IDApIHsgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbSk7IH1cclxuXHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuYyk7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVuT25ZbWFwQ2xpY2sgKHltYXAsIGZ1bmMpIHtcclxuICAgIHltYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUFkZHJlc3MgKHN0cmluZykge1xyXG4gICAgdGhpcy5tb2RhbEFkZHJlc3MuaW5uZXJUZXh0ID0gc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWFwQmVoYXZpb3IgKG9uKSB7XHJcbiAgICB0aGlzLm1hcC5iZWhhdmlvcnNbb25dKFsnZHJhZycsICdzY3JvbGxab29tJywgJ2RibENsaWNrWm9vbSddKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU1vZGFsU3RhdGUgKGNoYW5nZUJlaGF2aW9yLCBjaGFuZ2VDbGFzcywgY2hhbmdlU3RhdHVzKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFN0YXR1cyAhPT0gY2hhbmdlU3RhdHVzKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlTWFwQmVoYXZpb3IoY2hhbmdlQmVoYXZpb3IpO1xyXG5cclxuICAgICAgdGhpcy5tb2RhbEVsZW0uY2xhc3NMaXN0W2NoYW5nZUNsYXNzXSgnaGlkZScpO1xyXG4gICAgICB0aGlzLm1vZGFsU3RhdHVzID0gY2hhbmdlU3RhdHVzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlTW9kYWxQb3NpdGlvbiAoeCwgeSkge1xyXG4gICAgbGV0IG1vZGFsID0gdGhpcy5tb2RhbEVsZW07XHJcblxyXG4gICAgbGV0IGNvb3Jkc01vZGFsWSA9IG1vZGFsLmNsaWVudEhlaWdodCArIHk7XHJcbiAgICBsZXQgY29vcmRzTW9kYWxYID0gbW9kYWwuY2xpZW50V2lkdGggKyB4O1xyXG5cclxuICAgIGlmIChjb29yZHNNb2RhbFggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICBjb29yZHNNb2RhbFggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIG1vZGFsLmNsaWVudFdpZHRoIC0gMTA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb29yZHNNb2RhbFggPSB4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb29yZHNNb2RhbFkgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgY29vcmRzTW9kYWxZID0gd2luZG93LmlubmVySGVpZ2h0IC0gbW9kYWwuY2xpZW50SGVpZ2h0IC0gMTA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb29yZHNNb2RhbFkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsLnN0eWxlLmxlZnQgPSBjb29yZHNNb2RhbFggKyAncHgnO1xyXG4gICAgbW9kYWwuc3R5bGUudG9wID0gY29vcmRzTW9kYWxZICsgJ3B4JztcclxuICB9XHJcblxyXG4gIGNsb3NlQWxsQmFsbG9ucyAoY2x1c3RlcmVyKSB7XHJcbiAgICB0aGlzLm1hcC5iYWxsb29uLmNsb3NlKCk7XHJcbiAgICBjbHVzdGVyZXIuYmFsbG9vbi5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVmlld01hcCB9O1xyXG4iXX0=
