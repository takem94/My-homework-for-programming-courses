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
(function (global){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _dnd = require("./modules/dnd");

var _getCookies = require("./modules/getCookies");

var _isMatching = require("./modules/isMatching");

function VkAuth(params) {
  return new Promise(function (resolve, reject) {
    global.VK.init({
      apiId: 6899585
    });
    global.VK.Auth.login(function (data) {
      if (data.session) {
        resolve(data);
      } else {
        reject(new Error('Не удалось авторизоваться.'));
      }
    }, params);
  });
}

function VkCallMethod(method, params) {
  return new Promise(function (resolve, reject) {
    params.v = '5.92';
    global.VK.api(method, params, function (response) {
      if (response.error) {
        reject(new Error('Ошибка вызова метода'));
      } else {
        resolve(response);
      }
    });
  });
}

function transformBtn(toRemove, toAdd) {
  return function (btn) {
    var _btn$classList, _btn$classList2;

    (_btn$classList = btn.classList).remove.apply(_btn$classList, (0, _toConsumableArray2.default)(toRemove));

    (_btn$classList2 = btn.classList).add.apply(_btn$classList2, (0, _toConsumableArray2.default)(toAdd));
  };
}

function load() {
  var loginBtn = document.getElementById('loginBtn');
  var bodyFriends = document.querySelector('.friends-filter__body');
  var allFriends = document.querySelector('#allFriends .simplebar-content');
  var favFriends = document.querySelector('#favoriteFriends .simplebar-content');
  var sourceElem = document.getElementById('friendsElem').innerHTML;
  var inputAll = document.getElementById('searchAll');
  var inputFav = document.getElementById('searchFav');
  var saveBtn = document.getElementById('btnSave');
  var savedElems = [];
  var cookiesFriends = (0, _getCookies.getCookies)();

  if (cookiesFriends['users_id']) {
    savedElems = JSON.parse(cookiesFriends['users_id']);
  } // Turn on DnD for favorite friends list


  var settingsDnD = {
    fromZone: allFriends,
    toZone: favFriends,
    fromId: 'allFriends',
    toId: 'favoriteFriends',
    elemClass: 'friends-list__elem',
    toWrapperClass: 'friends-filter__body-list',
    transformBtn: transformBtn(['friends-list__elem-action_add', 'cross_rotate'], ['friends-list__elem-action_rm'])
  };
  var favFriendsDnD = new _dnd.DnD(settingsDnD);
  favFriendsDnD.init(); // Turn on DnD for all friends list

  settingsDnD.fromZone = favFriends;
  settingsDnD.toZone = allFriends;
  settingsDnD.fromId = 'favoriteFriends';
  settingsDnD.toId = 'allFriends';
  settingsDnD.transformBtn = transformBtn(['friends-list__elem-action_rm'], ['friends-list__elem-action_add', 'cross_rotate']);
  var allFriendsDnd = new _dnd.DnD(settingsDnD);
  allFriendsDnd.init();

  function asyncVkInit() {
    return _asyncVkInit.apply(this, arguments);
  }

  function _asyncVkInit() {
    _asyncVkInit = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var result, userElem, userName, userImg, favList, i, elem, template;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return VkAuth(6);

            case 3:
              result = _context.sent;
              _context.next = 6;
              return VkCallMethod('users.get', {
                fields: ' photo_100'
              });

            case 6:
              result = _context.sent;
              userElem = document.querySelector('.header-content__user');
              userName = document.querySelector('.header-content__user-name');
              userImg = userElem.querySelector('img');
              userName.innerHTML = "".concat(result.response[0]['first_name'], " <span>").concat(result.response[0]['last_name'], "</span>");
              userImg.src = result.response[0]['photo_100'];
              userElem.classList.remove('hide');
              favList = {
                items: []
              };
              _context.next = 16;
              return VkCallMethod('friends.get', {
                fields: ' photo_100'
              });

            case 16:
              result = _context.sent;

              for (i = result.response.items.length - 1; i >= 0; --i) {
                elem = result.response.items[i];

                if (savedElems.includes(elem.id + '')) {
                  elem.rm = true;
                  favList.items.push(elem);
                  result.response.items.splice(i, 1);
                }
              }

              template = global.Handlebars.compile(sourceElem);
              allFriends.innerHTML = template(result.response);
              favFriends.innerHTML = template(favList);
              _context.next = 26;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0.message);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 23]]);
    }));
    return _asyncVkInit.apply(this, arguments);
  }

  loginBtn.addEventListener('click', function getFriends() {
    asyncVkInit();
    loginBtn.removeEventListener('click', getFriends);
    loginBtn.classList.add('hide');
  });

  function searchFriends(from) {
    return function (e) {
      var elems = from.querySelectorAll('.friends-list__elem');
      var searchValue = e.target.value;

      for (var key = 0; key < elems.length; ++key) {
        var item = elems[key];
        var itemValue = item.children[1].innerText;

        if ((0, _isMatching.isMatching)(itemValue, searchValue)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    };
  }

  inputAll.addEventListener('input', searchFriends(allFriends));
  inputFav.addEventListener('input', searchFriends(favFriends));

  function saveFriends() {
    var elems = favFriends.children;
    savedElems = [];

    for (var i = 0; i < elems.length; ++i) {
      if (elems[i].dataset.id) {
        savedElems.push(elems[i].dataset.id);
      }
    }

    if (savedElems.length) {
      window.alert('Нет друзей для сохранения');
      return null;
    }

    var expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
    expires = expires.toUTCString();
    var jsonString = JSON.stringify(savedElems);
    document.cookie = "users_id=".concat(jsonString, "; expires=").concat(expires, "; path=/");
    window.alert('Друзья сохранены в избранные');
  }

  saveBtn.addEventListener('click', saveFriends);

  function transferFriend(e) {
    var elem = e.target.parentNode;

    if (e.target.classList.contains('friends-list__elem-action_add')) {
      transformBtn(['friends-list__elem-action_add', 'cross_rotate'], ['friends-list__elem-action_rm'])(e.target);
      favFriends.appendChild(elem);
    } else if (e.target.classList.contains('friends-list__elem-action_rm')) {
      transformBtn(['friends-list__elem-action_rm'], ['friends-list__elem-action_add', 'cross_rotate'])(e.target);
      allFriends.appendChild(elem);
    }
  }

  bodyFriends.addEventListener('click', transferFriend);
}

(function () {
  window.addEventListener('DOMContentLoaded', load);
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./modules/dnd":13,"./modules/getCookies":14,"./modules/isMatching":15,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/interopRequireDefault":5,"@babel/runtime/helpers/toConsumableArray":8,"@babel/runtime/regenerator":11}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DnD = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DnD =
/*#__PURE__*/
function () {
  function DnD(settings) {
    (0, _classCallCheck2.default)(this, DnD);
    this.from = settings.fromZone;
    this.to = settings.toZone;
    this.fromId = settings.fromId;
    this.toId = settings.toId;
    this.elemClass = settings.elemClass;
    this.toWrapperClass = settings.toZoneWrapperClass;
    this.transformBtn = settings.transformBtn;
    this.clone = null;
    this.original = null;
    this.offsetY = null;
    this.offsetX = null;
  }

  (0, _createClass2.default)(DnD, [{
    key: "init",
    value: function init() {
      var that = this;
      this.from.addEventListener('mousedown', onDragStart); // Это не очень продуманный дизайн класса, изначально, я хотел сделать функции
      // связанные с DnD как методы объекты, но не учел проблему контекста, в данном
      // случае, частично это можно было решить с использованием bind, но тогда
      // возникала проблема с удалением событий с элементов DOM.
      // Также, я решил не использовать DnD HTML5, т.к. его реализация сильно отличается
      // в разных браузерах, особенно в FireFox, где событие "Drag" не имеет свойства
      // с кординатами курсора, в то время как Google Chrome это свойство имеет. Нужно это
      // для смещения клонированного элемента под курсором мыши.

      function onDragStart(e) {
        if (!e.target.classList.contains(that.elemClass)) {
          return;
        }

        var positionElem = e.target.getBoundingClientRect();
        that.offsetY = e.pageY - positionElem.top;
        that.offsetX = e.pageX - positionElem.left;
        that.clone = e.target.cloneNode(true);
        that.clone.classList.add('clone');
        that.clone.style.top = positionElem.top + 'px';
        that.clone.style.left = positionElem.left + 'px';
        document.body.appendChild(that.clone);
        that.original = e.target;
        that.original.style.opacity = 0;

        that.original.ondragstart = that.clone.ondragstart = function () {
          return false;
        };

        controlListeners('addEventListener');
      }

      function onDragMove(e) {
        var positionElem = that.clone.getBoundingClientRect();
        var offsetY = e.pageY - that.offsetY;
        var offsetX = e.pageX - that.offsetX;

        if (offsetY < 0) {
          offsetY = 0;
        } else if (offsetY + positionElem.height > window.innerHeight) {
          offsetY = window.innerHeight - positionElem.height;
        }

        if (offsetX < 0) {
          offsetX = 0;
        } else if (offsetX + positionElem.width > window.innerWidth) {
          offsetX = window.innerWidth - positionElem.width;
        }

        that.clone.style.top = offsetY + 'px';
        that.clone.style.left = offsetX + 'px';
      }

      function onDragEnd(e) {
        controlListeners('removeEventListener');
        that.original.style.opacity = 1;
        that.clone.outerHTML = '';
        that.clone = null;
        that.original = null;
      }

      function onOverDrop(e) {
        if (e.target.classList.contains(that.elemClass)) {
          e.target.style.borderTop = '60px solid white';
          e.target.addEventListener('mouseleave', onLeaveDrop);
        }
      }

      function onLeaveDrop(e) {
        if (e.target.classList.contains(that.elemClass)) {
          e.target.style.borderTop = '0 solid white';
          e.target.removeEventListener('mouseleave', onLeaveDrop);
        }
      }

      function onDrop(e) {
        var toZone = e.target === that.to;
        var elemContains = e.target.classList.contains(that.elemClass);
        var status = false;
        var target = e.target;

        if (elemContains) {
          while (!target.classList.contains(that.toWrapperClass)) {
            if (target.id && target.id === that.toId) {
              status = true;
              break;
            }

            target = target.parentElement;
          }
        }

        if (toZone || elemContains) {
          var btn = that.original.lastElementChild;
          that.transformBtn(btn);

          if (status) {
            var temp = e.target.style.transition;
            e.target.style.transition = 'border 0s';
            e.target.style.borderTop = '0px';
            e.target.offsetHeight;
            e.target.parentNode.insertBefore(that.original, e.target);
            e.target.style.transition = temp;
          } else {
            e.target.appendChild(that.original);
          }
        }
      }

      function controlListeners(action) {
        document[action]('mousemove', onDragMove);
        document[action]('mouseup', onDragEnd);
        that.to[action]('mouseover', onOverDrop);
        that.to[action]('mouseleave', onLeaveDrop);
        that.to[action]('mouseup', onDrop);
      }
    }
  }]);
  return DnD;
}();

exports.DnD = DnD;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookies = getCookies;

function getCookies() {
  var res = {};
  var cookies = document.cookie;

  if (cookies.length < 1) {
    return res;
  }

  cookies = cookies.split('; ');
  cookies.forEach(function (item) {
    var arr = item.split('=');
    res[arr[0]] = arr[1];
  });
  return res;
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatching = isMatching;

function isMatching(full, chunk) {
  return new RegExp(chunk, 'i').test(full);
}

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwic3JjL2pzL2FwcC5qcyIsInNyYy9qcy9tb2R1bGVzL2RuZC5qcyIsInNyYy9qcy9tb2R1bGVzL2dldENvb2tpZXMuanMiLCJzcmMvanMvbW9kdWxlcy9pc01hdGNoaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqdEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUFTLE1BQVQsQ0FBaUIsTUFBakIsRUFBeUI7QUFDdkIsU0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLElBQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxJQUFWLENBQWU7QUFDYixNQUFBLEtBQUssRUFBRTtBQURNLEtBQWY7QUFJQSxJQUFBLE1BQU0sQ0FBQyxFQUFQ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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgZGVmYXVsdDogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbn0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xuICB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJpbXBvcnQgeyBEbkQgfSBmcm9tICcuL21vZHVsZXMvZG5kJztcclxuaW1wb3J0IHsgZ2V0Q29va2llcyB9IGZyb20gJy4vbW9kdWxlcy9nZXRDb29raWVzJztcclxuaW1wb3J0IHsgaXNNYXRjaGluZyB9IGZyb20gJy4vbW9kdWxlcy9pc01hdGNoaW5nJztcclxuXHJcbmZ1bmN0aW9uIFZrQXV0aCAocGFyYW1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGdsb2JhbC5WSy5pbml0KHtcclxuICAgICAgYXBpSWQ6IDY4OTk1ODVcclxuICAgIH0pO1xyXG5cclxuICAgIGdsb2JhbC5WSy5BdXRoLmxvZ2luKChkYXRhKSA9PiB7XHJcbiAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcclxuICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LDQstGC0L7RgNC40LfQvtCy0LDRgtGM0YHRjy4nKSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHBhcmFtcyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFZrQ2FsbE1ldGhvZCAobWV0aG9kLCBwYXJhbXMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgcGFyYW1zLnYgPSAnNS45Mic7XHJcblxyXG4gICAgZ2xvYmFsLlZLLmFwaShtZXRob2QsIHBhcmFtcywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ9Ce0YjQuNCx0LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtQnRuICh0b1JlbW92ZSwgdG9BZGQpIHtcclxuICByZXR1cm4gKGJ0bikgPT4ge1xyXG4gICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoLi4udG9SZW1vdmUpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoLi4udG9BZGQpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWQgKCkge1xyXG4gIGNvbnN0IGxvZ2luQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luQnRuJyk7XHJcbiAgY29uc3QgYm9keUZyaWVuZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1maWx0ZXJfX2JvZHknKTtcclxuICBjb25zdCBhbGxGcmllbmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbEZyaWVuZHMgLnNpbXBsZWJhci1jb250ZW50Jyk7XHJcbiAgY29uc3QgZmF2RnJpZW5kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXZvcml0ZUZyaWVuZHMgLnNpbXBsZWJhci1jb250ZW50Jyk7XHJcbiAgY29uc3Qgc291cmNlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmllbmRzRWxlbScpLmlubmVySFRNTDtcclxuXHJcbiAgY29uc3QgaW5wdXRBbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoQWxsJyk7XHJcbiAgY29uc3QgaW5wdXRGYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoRmF2Jyk7XHJcblxyXG4gIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuU2F2ZScpO1xyXG5cclxuICBsZXQgc2F2ZWRFbGVtcyA9IFtdO1xyXG4gIGxldCBjb29raWVzRnJpZW5kcyA9IGdldENvb2tpZXMoKTtcclxuXHJcbiAgaWYgKGNvb2tpZXNGcmllbmRzWyd1c2Vyc19pZCddKSB7XHJcbiAgICBzYXZlZEVsZW1zID0gSlNPTi5wYXJzZShjb29raWVzRnJpZW5kc1sndXNlcnNfaWQnXSk7XHJcbiAgfVxyXG5cclxuICAvLyBUdXJuIG9uIERuRCBmb3IgZmF2b3JpdGUgZnJpZW5kcyBsaXN0XHJcbiAgbGV0IHNldHRpbmdzRG5EID0ge1xyXG4gICAgZnJvbVpvbmU6IGFsbEZyaWVuZHMsXHJcbiAgICB0b1pvbmU6IGZhdkZyaWVuZHMsXHJcbiAgICBmcm9tSWQ6ICdhbGxGcmllbmRzJyxcclxuICAgIHRvSWQ6ICdmYXZvcml0ZUZyaWVuZHMnLFxyXG4gICAgZWxlbUNsYXNzOiAnZnJpZW5kcy1saXN0X19lbGVtJyxcclxuICAgIHRvV3JhcHBlckNsYXNzOiAnZnJpZW5kcy1maWx0ZXJfX2JvZHktbGlzdCcsXHJcbiAgICB0cmFuc2Zvcm1CdG46IHRyYW5zZm9ybUJ0bihbJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fYWRkJywgJ2Nyb3NzX3JvdGF0ZSddLCBbJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fcm0nXSlcclxuICB9O1xyXG5cclxuICBsZXQgZmF2RnJpZW5kc0RuRCA9IG5ldyBEbkQoc2V0dGluZ3NEbkQpO1xyXG4gIGZhdkZyaWVuZHNEbkQuaW5pdCgpO1xyXG5cclxuICAvLyBUdXJuIG9uIERuRCBmb3IgYWxsIGZyaWVuZHMgbGlzdFxyXG4gIHNldHRpbmdzRG5ELmZyb21ab25lID0gZmF2RnJpZW5kcztcclxuICBzZXR0aW5nc0RuRC50b1pvbmUgPSBhbGxGcmllbmRzO1xyXG4gIHNldHRpbmdzRG5ELmZyb21JZCA9ICdmYXZvcml0ZUZyaWVuZHMnO1xyXG4gIHNldHRpbmdzRG5ELnRvSWQgPSAnYWxsRnJpZW5kcyc7XHJcbiAgc2V0dGluZ3NEbkQudHJhbnNmb3JtQnRuID0gdHJhbnNmb3JtQnRuKFsnZnJpZW5kcy1saXN0X19lbGVtLWFjdGlvbl9ybSddLCBbJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fYWRkJywgJ2Nyb3NzX3JvdGF0ZSddKTtcclxuXHJcbiAgbGV0IGFsbEZyaWVuZHNEbmQgPSBuZXcgRG5EKHNldHRpbmdzRG5EKTtcclxuICBhbGxGcmllbmRzRG5kLmluaXQoKTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gYXN5bmNWa0luaXQgKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IFZrQXV0aCg2KTtcclxuXHJcbiAgICAgIHJlc3VsdCA9IGF3YWl0IFZrQ2FsbE1ldGhvZCgndXNlcnMuZ2V0JywgeyBmaWVsZHM6ICcgcGhvdG9fMTAwJyB9KTtcclxuXHJcbiAgICAgIGxldCB1c2VyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItY29udGVudF9fdXNlcicpO1xyXG4gICAgICBsZXQgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWNvbnRlbnRfX3VzZXItbmFtZScpO1xyXG4gICAgICBsZXQgdXNlckltZyA9IHVzZXJFbGVtLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG5cclxuICAgICAgdXNlck5hbWUuaW5uZXJIVE1MID0gYCR7cmVzdWx0LnJlc3BvbnNlWzBdWydmaXJzdF9uYW1lJ119IDxzcGFuPiR7cmVzdWx0LnJlc3BvbnNlWzBdWydsYXN0X25hbWUnXX08L3NwYW4+YDtcclxuICAgICAgdXNlckltZy5zcmMgPSByZXN1bHQucmVzcG9uc2VbMF1bJ3Bob3RvXzEwMCddO1xyXG4gICAgICB1c2VyRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcblxyXG4gICAgICBsZXQgZmF2TGlzdCA9IHsgaXRlbXM6IFtdIH07XHJcbiAgICAgIHJlc3VsdCA9IGF3YWl0IFZrQ2FsbE1ldGhvZCgnZnJpZW5kcy5nZXQnLCB7IGZpZWxkczogJyBwaG90b18xMDAnIH0pO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IHJlc3VsdC5yZXNwb25zZS5pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgIGxldCBlbGVtID0gcmVzdWx0LnJlc3BvbnNlLml0ZW1zW2ldO1xyXG5cclxuICAgICAgICBpZiAoc2F2ZWRFbGVtcy5pbmNsdWRlcygoZWxlbS5pZCArICcnKSkpIHtcclxuICAgICAgICAgIGVsZW0ucm0gPSB0cnVlO1xyXG4gICAgICAgICAgZmF2TGlzdC5pdGVtcy5wdXNoKGVsZW0pO1xyXG4gICAgICAgICAgcmVzdWx0LnJlc3BvbnNlLml0ZW1zLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGdsb2JhbC5IYW5kbGViYXJzLmNvbXBpbGUoc291cmNlRWxlbSk7XHJcblxyXG4gICAgICBhbGxGcmllbmRzLmlubmVySFRNTCA9IHRlbXBsYXRlKHJlc3VsdC5yZXNwb25zZSk7XHJcbiAgICAgIGZhdkZyaWVuZHMuaW5uZXJIVE1MID0gdGVtcGxhdGUoZmF2TGlzdCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gZ2V0RnJpZW5kcyAoKSB7XHJcbiAgICBhc3luY1ZrSW5pdCgpO1xyXG5cclxuICAgIGxvZ2luQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0RnJpZW5kcyk7XHJcbiAgICBsb2dpbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHNlYXJjaEZyaWVuZHMgKGZyb20pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBsZXQgZWxlbXMgPSBmcm9tLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmRzLWxpc3RfX2VsZW0nKTtcclxuICAgICAgbGV0IHNlYXJjaFZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICBmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCBlbGVtcy5sZW5ndGg7ICsra2V5KSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBlbGVtc1trZXldO1xyXG4gICAgICAgIGxldCBpdGVtVmFsdWUgPSBpdGVtLmNoaWxkcmVuWzFdLmlubmVyVGV4dDtcclxuXHJcbiAgICAgICAgaWYgKGlzTWF0Y2hpbmcoaXRlbVZhbHVlLCBzZWFyY2hWYWx1ZSkpIHtcclxuICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlucHV0QWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2VhcmNoRnJpZW5kcyhhbGxGcmllbmRzKSk7XHJcbiAgaW5wdXRGYXYuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBzZWFyY2hGcmllbmRzKGZhdkZyaWVuZHMpKTtcclxuXHJcbiAgZnVuY3Rpb24gc2F2ZUZyaWVuZHMgKCkge1xyXG4gICAgbGV0IGVsZW1zID0gZmF2RnJpZW5kcy5jaGlsZHJlbjtcclxuXHJcbiAgICBzYXZlZEVsZW1zID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBpZiAoZWxlbXNbaV0uZGF0YXNldC5pZCkgeyBzYXZlZEVsZW1zLnB1c2goZWxlbXNbaV0uZGF0YXNldC5pZCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2F2ZWRFbGVtcy5sZW5ndGgpIHtcclxuICAgICAgd2luZG93LmFsZXJ0KCfQndC10YIg0LTRgNGD0LfQtdC5INC00LvRjyDRgdC+0YXRgNCw0L3QtdC90LjRjycpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZXhwaXJlcyA9IG5ldyBEYXRlKCk7XHJcbiAgICBleHBpcmVzLnNldFRpbWUoZXhwaXJlcy5nZXRUaW1lKCkgKyAoMzY1ICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG4gICAgZXhwaXJlcyA9IGV4cGlyZXMudG9VVENTdHJpbmcoKTtcclxuXHJcbiAgICBsZXQganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHNhdmVkRWxlbXMpO1xyXG5cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGB1c2Vyc19pZD0ke2pzb25TdHJpbmd9OyBleHBpcmVzPSR7ZXhwaXJlc307IHBhdGg9L2A7XHJcblxyXG4gICAgd2luZG93LmFsZXJ0KCfQlNGA0YPQt9GM0Y8g0YHQvtGF0YDQsNC90LXQvdGLINCyINC40LfQsdGA0LDQvdC90YvQtScpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVGcmllbmRzKTtcclxuXHJcbiAgZnVuY3Rpb24gdHJhbnNmZXJGcmllbmQgKGUpIHtcclxuICAgIGxldCBlbGVtID0gZS50YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmllbmRzLWxpc3RfX2VsZW0tYWN0aW9uX2FkZCcpKSB7XHJcbiAgICAgIHRyYW5zZm9ybUJ0bihbJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fYWRkJywgJ2Nyb3NzX3JvdGF0ZSddLCBbJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fcm0nXSkoZS50YXJnZXQpO1xyXG4gICAgICBmYXZGcmllbmRzLmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyaWVuZHMtbGlzdF9fZWxlbS1hY3Rpb25fcm0nKSkge1xyXG4gICAgICB0cmFuc2Zvcm1CdG4oWydmcmllbmRzLWxpc3RfX2VsZW0tYWN0aW9uX3JtJ10sIFsnZnJpZW5kcy1saXN0X19lbGVtLWFjdGlvbl9hZGQnLCAnY3Jvc3Nfcm90YXRlJ10pKGUudGFyZ2V0KTtcclxuICAgICAgYWxsRnJpZW5kcy5hcHBlbmRDaGlsZChlbGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJvZHlGcmllbmRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJhbnNmZXJGcmllbmQpO1xyXG59XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgbG9hZCk7XHJcbn0pKCk7XHJcbiIsImNsYXNzIERuRCB7XHJcbiAgY29uc3RydWN0b3IgKHNldHRpbmdzKSB7XHJcbiAgICB0aGlzLmZyb20gPSBzZXR0aW5ncy5mcm9tWm9uZTtcclxuICAgIHRoaXMudG8gPSBzZXR0aW5ncy50b1pvbmU7XHJcblxyXG4gICAgdGhpcy5mcm9tSWQgPSBzZXR0aW5ncy5mcm9tSWQ7XHJcbiAgICB0aGlzLnRvSWQgPSBzZXR0aW5ncy50b0lkO1xyXG5cclxuICAgIHRoaXMuZWxlbUNsYXNzID0gc2V0dGluZ3MuZWxlbUNsYXNzO1xyXG4gICAgdGhpcy50b1dyYXBwZXJDbGFzcyA9IHNldHRpbmdzLnRvWm9uZVdyYXBwZXJDbGFzcztcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybUJ0biA9IHNldHRpbmdzLnRyYW5zZm9ybUJ0bjtcclxuXHJcbiAgICB0aGlzLmNsb25lID0gbnVsbDtcclxuICAgIHRoaXMub3JpZ2luYWwgPSBudWxsO1xyXG4gICAgdGhpcy5vZmZzZXRZID0gbnVsbDtcclxuICAgIHRoaXMub2Zmc2V0WCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBpbml0ICgpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmZyb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25EcmFnU3RhcnQpO1xyXG5cclxuICAgIC8vINCt0YLQviDQvdC1INC+0YfQtdC90Ywg0L/RgNC+0LTRg9C80LDQvdC90YvQuSDQtNC40LfQsNC50L0g0LrQu9Cw0YHRgdCwLCDQuNC30L3QsNGH0LDQu9GM0L3Qviwg0Y8g0YXQvtGC0LXQuyDRgdC00LXQu9Cw0YLRjCDRhNGD0L3QutGG0LjQuFxyXG4gICAgLy8g0YHQstGP0LfQsNC90L3Ri9C1INGBIERuRCDQutCw0Log0LzQtdGC0L7QtNGLINC+0LHRitC10LrRgtGLLCDQvdC+INC90LUg0YPRh9C10Lsg0L/RgNC+0LHQu9C10LzRgyDQutC+0L3RgtC10LrRgdGC0LAsINCyINC00LDQvdC90L7QvFxyXG4gICAgLy8g0YHQu9GD0YfQsNC1LCDRh9Cw0YHRgtC40YfQvdC+INGN0YLQviDQvNC+0LbQvdC+INCx0YvQu9C+INGA0LXRiNC40YLRjCDRgSDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjQtdC8IGJpbmQsINC90L4g0YLQvtCz0LTQsFxyXG4gICAgLy8g0LLQvtC30L3QuNC60LDQu9CwINC/0YDQvtCx0LvQtdC80LAg0YEg0YPQtNCw0LvQtdC90LjQtdC8INGB0L7QsdGL0YLQuNC5INGBINGN0LvQtdC80LXQvdGC0L7QsiBET00uXHJcblxyXG4gICAgLy8g0KLQsNC60LbQtSwg0Y8g0YDQtdGI0LjQuyDQvdC1INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCBEbkQgSFRNTDUsINGCLtC6LiDQtdCz0L4g0YDQtdCw0LvQuNC30LDRhtC40Y8g0YHQuNC70YzQvdC+INC+0YLQu9C40YfQsNC10YLRgdGPXHJcbiAgICAvLyDQsiDRgNCw0LfQvdGL0YUg0LHRgNCw0YPQt9C10YDQsNGFLCDQvtGB0L7QsdC10L3QvdC+INCyIEZpcmVGb3gsINCz0LTQtSDRgdC+0LHRi9GC0LjQtSBcIkRyYWdcIiDQvdC1INC40LzQtdC10YIg0YHQstC+0LnRgdGC0LLQsFxyXG4gICAgLy8g0YEg0LrQvtGA0LTQuNC90LDRgtCw0LzQuCDQutGD0YDRgdC+0YDQsCwg0LIg0YLQviDQstGA0LXQvNGPINC60LDQuiBHb29nbGUgQ2hyb21lINGN0YLQviDRgdCy0L7QudGB0YLQstC+INC40LzQtdC10YIuINCd0YPQttC90L4g0Y3RgtC+XHJcbiAgICAvLyDQtNC70Y8g0YHQvNC10YnQtdC90LjRjyDQutC70L7QvdC40YDQvtCy0LDQvdC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L/QvtC0INC60YPRgNGB0L7RgNC+0Lwg0LzRi9GI0LguXHJcblxyXG4gICAgZnVuY3Rpb24gb25EcmFnU3RhcnQgKGUpIHtcclxuICAgICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhhdC5lbGVtQ2xhc3MpKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgbGV0IHBvc2l0aW9uRWxlbSA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgdGhhdC5vZmZzZXRZID0gZS5wYWdlWSAtIHBvc2l0aW9uRWxlbS50b3A7XHJcbiAgICAgIHRoYXQub2Zmc2V0WCA9IGUucGFnZVggLSBwb3NpdGlvbkVsZW0ubGVmdDtcclxuXHJcbiAgICAgIHRoYXQuY2xvbmUgPSBlLnRhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgIHRoYXQuY2xvbmUuY2xhc3NMaXN0LmFkZCgnY2xvbmUnKTtcclxuXHJcbiAgICAgIHRoYXQuY2xvbmUuc3R5bGUudG9wID0gcG9zaXRpb25FbGVtLnRvcCArICdweCc7XHJcbiAgICAgIHRoYXQuY2xvbmUuc3R5bGUubGVmdCA9IHBvc2l0aW9uRWxlbS5sZWZ0ICsgJ3B4JztcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhhdC5jbG9uZSk7XHJcblxyXG4gICAgICB0aGF0Lm9yaWdpbmFsID0gZS50YXJnZXQ7XHJcbiAgICAgIHRoYXQub3JpZ2luYWwuc3R5bGUub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICB0aGF0Lm9yaWdpbmFsLm9uZHJhZ3N0YXJ0ID0gdGhhdC5jbG9uZS5vbmRyYWdzdGFydCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb250cm9sTGlzdGVuZXJzKCdhZGRFdmVudExpc3RlbmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25EcmFnTW92ZSAoZSkge1xyXG4gICAgICBsZXQgcG9zaXRpb25FbGVtID0gdGhhdC5jbG9uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgIGxldCBvZmZzZXRZID0gZS5wYWdlWSAtIHRoYXQub2Zmc2V0WTtcclxuICAgICAgbGV0IG9mZnNldFggPSBlLnBhZ2VYIC0gdGhhdC5vZmZzZXRYO1xyXG5cclxuICAgICAgaWYgKG9mZnNldFkgPCAwKSB7XHJcbiAgICAgICAgb2Zmc2V0WSA9IDA7XHJcbiAgICAgIH0gZWxzZSBpZiAoKG9mZnNldFkgKyBwb3NpdGlvbkVsZW0uaGVpZ2h0KSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICAgIG9mZnNldFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBwb3NpdGlvbkVsZW0uaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob2Zmc2V0WCA8IDApIHtcclxuICAgICAgICBvZmZzZXRYID0gMDtcclxuICAgICAgfSBlbHNlIGlmICgob2Zmc2V0WCArIHBvc2l0aW9uRWxlbS53aWR0aCkgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgIG9mZnNldFggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHBvc2l0aW9uRWxlbS53aWR0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhhdC5jbG9uZS5zdHlsZS50b3AgPSBvZmZzZXRZICsgJ3B4JztcclxuICAgICAgdGhhdC5jbG9uZS5zdHlsZS5sZWZ0ID0gb2Zmc2V0WCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25EcmFnRW5kIChlKSB7XHJcbiAgICAgIGNvbnRyb2xMaXN0ZW5lcnMoJ3JlbW92ZUV2ZW50TGlzdGVuZXInKTtcclxuXHJcbiAgICAgIHRoYXQub3JpZ2luYWwuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgIHRoYXQuY2xvbmUub3V0ZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICB0aGF0LmNsb25lID0gbnVsbDtcclxuICAgICAgdGhhdC5vcmlnaW5hbCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25PdmVyRHJvcCAoZSkge1xyXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoYXQuZWxlbUNsYXNzKSkge1xyXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJvcmRlclRvcCA9ICc2MHB4IHNvbGlkIHdoaXRlJztcclxuICAgICAgICBlLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgb25MZWF2ZURyb3ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25MZWF2ZURyb3AgKGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGF0LmVsZW1DbGFzcykpIHtcclxuICAgICAgICBlLnRhcmdldC5zdHlsZS5ib3JkZXJUb3AgPSAnMCBzb2xpZCB3aGl0ZSc7XHJcbiAgICAgICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG9uTGVhdmVEcm9wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uRHJvcCAoZSkge1xyXG4gICAgICBjb25zdCB0b1pvbmUgPSBlLnRhcmdldCA9PT0gdGhhdC50bztcclxuICAgICAgY29uc3QgZWxlbUNvbnRhaW5zID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoYXQuZWxlbUNsYXNzKTtcclxuXHJcbiAgICAgIGxldCBzdGF0dXMgPSBmYWxzZTsgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgaWYgKGVsZW1Db250YWlucykge1xyXG4gICAgICAgIHdoaWxlICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGF0LnRvV3JhcHBlckNsYXNzKSkge1xyXG4gICAgICAgICAgaWYgKHRhcmdldC5pZCAmJiB0YXJnZXQuaWQgPT09IHRoYXQudG9JZCkge1xyXG4gICAgICAgICAgICBzdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0b1pvbmUgfHwgZWxlbUNvbnRhaW5zKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IHRoYXQub3JpZ2luYWwubGFzdEVsZW1lbnRDaGlsZDtcclxuXHJcbiAgICAgICAgdGhhdC50cmFuc2Zvcm1CdG4oYnRuKTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgbGV0IHRlbXAgPSBlLnRhcmdldC5zdHlsZS50cmFuc2l0aW9uO1xyXG5cclxuICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnRyYW5zaXRpb24gPSAnYm9yZGVyIDBzJztcclxuICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJvcmRlclRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgZS50YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoYXQub3JpZ2luYWwsIGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICBlLnRhcmdldC5zdHlsZS50cmFuc2l0aW9uID0gdGVtcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQodGhhdC5vcmlnaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29udHJvbExpc3RlbmVycyAoYWN0aW9uKSB7XHJcbiAgICAgIGRvY3VtZW50W2FjdGlvbl0oJ21vdXNlbW92ZScsIG9uRHJhZ01vdmUpO1xyXG4gICAgICBkb2N1bWVudFthY3Rpb25dKCdtb3VzZXVwJywgb25EcmFnRW5kKTtcclxuXHJcbiAgICAgIHRoYXQudG9bYWN0aW9uXSgnbW91c2VvdmVyJywgb25PdmVyRHJvcCk7XHJcbiAgICAgIHRoYXQudG9bYWN0aW9uXSgnbW91c2VsZWF2ZScsIG9uTGVhdmVEcm9wKTtcclxuICAgICAgdGhhdC50b1thY3Rpb25dKCdtb3VzZXVwJywgb25Ecm9wKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IERuRCB9O1xyXG4iLCJmdW5jdGlvbiBnZXRDb29raWVzICgpIHtcclxuICBsZXQgcmVzID0ge307XHJcblxyXG4gIGxldCBjb29raWVzID0gZG9jdW1lbnQuY29va2llO1xyXG5cclxuICBpZiAoY29va2llcy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgY29va2llcyA9IGNvb2tpZXMuc3BsaXQoJzsgJyk7XHJcblxyXG4gIGNvb2tpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgbGV0IGFyciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICByZXNbYXJyWzBdXSA9IGFyclsxXTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuZXhwb3J0IHsgZ2V0Q29va2llcyB9O1xuIiwiZnVuY3Rpb24gaXNNYXRjaGluZyAoZnVsbCwgY2h1bmspIHtcclxuICByZXR1cm4gKG5ldyBSZWdFeHAoY2h1bmssICdpJykpLnRlc3QoZnVsbCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGlzTWF0Y2hpbmcgfTtcbiJdfQ==
