console.log("page2 started");
// var somePatch = "pageString='page3';";
// var somePatch = somePatch +"clickString='bridge.goPage(\"' + pageString + '\")';";
// var somePatch = somePatch + "changeInnerHtml('" +
//  '<p>click button open page 3 :</p>' + "<button onclick=\"bridge.executeJS(clickString);\">click jump to page 3</button>" +
//  "');";
// halberd.bridge.postPatch(somePatch)
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 奇艺api对象，调用方式：qiyi.request()

var noop = function noop() {};
var qiyiApi = {
    request: function request(url, options, cbs_success, cbs_error) {
        fetch(url, options).then(function (json) {
            return json.json();
        }).then(cbs_success || noop).catch(cbs_error || noop);
    }
};
/* unused harmony default export */ var _unused_webpack_default_export = (qiyiApi);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer = false;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = false &&  global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

    /**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However when passing down props,
     * we don't want to force conversion because the value may be a nested value
     * under a frozen data structure. Converting it would defeat the optimization.
     */
var observerState = {
    shouldConvert: true,
    isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
        var augment = hasProto
            ? protoAugment
            : copyAugment;
            augment(value, arrayMethods, arrayKeys);
            this.observeArray(value);
    } else {
        this.walk(value);
    }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i], obj[keys[i]]);
    }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
    }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        def(target, key, src[key]);
    }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
    if (!isObject(value)) {
        return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else if (
        observerState.shouldConvert &&
        !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
                Object.isExtensible(value) &&
                    !value._isVue
    ) {
        ob = new Observer(value);
    }
    if (asRootData && ob) {
        ob.vmCount++;
    }
    return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter
) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;

    var childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            var value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
                if (Array.isArray(value)) {
                    dependArray(value);
                }
            }
            return value
        },
        set: function reactiveSetter (newVal) {
            var value = getter ? getter.call(obj) : val;
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            /* eslint-enable no-self-compare */
            if (false) {
                customSetter();
            }
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            childOb = observe(newVal);
            dep.notify();
        }
    });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
    if (Array.isArray(target) && (typeof key === 'number' || /^\d+$/.test(key))) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val
    }
    if (hasOwn(target, key)) {
        target[key] = val;
        return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        "production" !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.'
        );
        return val
    }
    if (!ob) {
        target[key] = val;
        return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
    if (Array.isArray(target) && typeof key === 'number') {
        target.splice(key, 1);
        return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        "production" !== 'production' && warn(
            'Avoid deleting properties on a Vue instance or its root $data ' +
                '- just set it to null.'
        );
        return
    }
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key];
    if (!ob) {
        return
    }
    ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}

/*  */

var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

/* not type checking this file because flow doesn't play well with Proxy */

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent;
        }
        parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        var vm = this;
        if (vm._isMounted) {
            callHook(vm, 'beforeUpdate');
        }
        var prevEl = vm.$el;
        var prevVnode = vm._vnode;
        var prevActiveInstance = activeInstance;
        activeInstance = vm;
        vm._vnode = vnode;
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        if (!prevVnode) {
            // initial render
            vm.$el = vm.__patch__(
                vm.$el, vnode, hydrating, false /* removeOnly */,
                vm.$options._parentElm,
                vm.$options._refElm
            );
            // no need for the ref nodes after initial patch
            // this prevents keeping a detached DOM tree in memory (#5851)
            vm.$options._parentElm = vm.$options._refElm = null;
        } else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode);
        }
        activeInstance = prevActiveInstance;
        // update __vue__ reference
        // mp : delete __vue__ circular to enable JSON.stringify
        //if (prevEl) {
            //prevEl.__vue__ = null
        //}
        //if (vm.$el) {
            //vm.$el.__vue__ = vm
        //}
        // if parent is an HOC, update its $el as well
        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el;
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
        var vm = this;
        if (vm._watcher) {
            vm._watcher.update();
        }
    };

    Vue.prototype.$destroy = function () {
        var vm = this;
        if (vm._isBeingDestroyed) {
            return
        }
        callHook(vm, 'beforeDestroy');
        vm._isBeingDestroyed = true;
        // remove self from parent
        var parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove(parent.$children, vm);
        }
        // teardown watchers
        if (vm._watcher) {
            vm._watcher.teardown();
        }
        var i = vm._watchers.length;
        while (i--) {
            vm._watchers[i].teardown();
        }
        // remove reference from data ob
        // frozen object may not have observer.
        if (vm._data.__ob__) {
            vm._data.__ob__.vmCount--;
        }
        // call the last hook...
        vm._isDestroyed = true;
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null);
        // fire destroyed hook
        callHook(vm, 'destroyed');
        // turn off all instance listeners.
        vm.$off();
        // remove __vue__ reference
        if (vm.$el) {
            vm.$el.__vue__ = null;
        }
    };
}

function mountComponent (
    vm,
    el,
    hydrating
) {
    vm.$el = el;
    if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode;

    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    if (false) {
        updateComponent = function () {
            var name = vm._name;
            var id = vm._uid;
            var startTag = "vue-perf-start:" + id;
            var endTag = "vue-perf-end:" + id;

            mark(startTag);
            var vnode = vm._render();
            mark(endTag);
            measure((name + " render"), startTag, endTag);

            mark(startTag);
            vm._update(vnode, hydrating);
            mark(endTag);
            measure((name + " patch"), startTag, endTag);
        };
    } else {
        updateComponent = function () {
            vm._update(vm._render(), hydrating);
        };
    }

    vm._watcher = new Watcher(vm, updateComponent, noop);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook(vm, 'mounted');
    }
    return vm
}

function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
) {
    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren
    var hasChildren = !!(
        renderChildren ||               // has new static slots
            vm.$options._renderChildren ||  // has old static slots
                parentVnode.data.scopedSlots || // has new scoped slots
                    vm.$scopedSlots !== emptyObject // has old scoped slots
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
        vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update props
    if (propsData && vm.$options.props) {
        observerState.shouldConvert = false;
        var props = vm._props;
        var propKeys = vm.$options._propKeys || [];
        for (var i = 0; i < propKeys.length; i++) {
            var key = propKeys[i];
            props[key] = validateProp(key, vm.$options.props, propsData, vm);
        }
        observerState.shouldConvert = true;
        vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
        var oldListeners = vm.$options._parentListeners;
        vm.$options._parentListeners = listeners;
        updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
    }
}

function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive) { return true }
    }
return false
}

function activateChildComponent (vm, direct) {
    if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
            return
        }
    } else if (vm._directInactive) {
        return
    }
    if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (var i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'activated');
    }
}

function deactivateChildComponent (vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (var i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'deactivated');
    }
}

function callHook (vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm);
            } catch (e) {
                handleError(e, vm, (hook + " hook"));
            }
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options
) {
    this.vm = vm;
    vm._watchers.push(this);
    // options
    if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
    } else {
        this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = '';
        // parse expression for getter
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
                this.getter = function () {};
                "production" !== 'production' && warn(
                    "Failed watching path: \"" + expOrFn + "\" " +
                        'Watcher only accepts simple dot-delimited paths. ' +
                            'For full control, use a function instead.',
                            vm
                );
            }
        }
        this.value = this.lazy
            ? undefined
            : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    if (this.user) {
        try {
            value = this.getter.call(vm, vm);
        } catch (e) {
            handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
        }
    } else {
        value = this.getter.call(vm, vm);
    }
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
        traverse(value);
    }
    popTarget();
    this.cleanupDeps();
    return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
            dep.addSub(this);
        }
    }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
        var this$1 = this;

    var i = this.deps.length;
    while (i--) {
        var dep = this$1.deps[i];
        if (!this$1.newDepIds.has(dep.id)) {
            dep.removeSub(this$1);
        }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true;
    } else if (this.sync) {
        this.run();
    } else {
        queueWatcher(this);
    }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
    if (this.active) {
        var value = this.get();
        if (
            value !== this.value ||
            // Deep watchers and watchers on Object/Arrays should fire even
            // when the value is the same, because the value may
            // have mutated.
            isObject(value) ||
                this.deep
        ) {
            // set new value
            var oldValue = this.value;
            this.value = value;
            if (this.user) {
                try {
                    this.cb.call(this.vm, value, oldValue);
                } catch (e) {
                    handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
                }
            } else {
                this.cb.call(this.vm, value, oldValue);
            }
        }
    }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
        var this$1 = this;

    var i = this.deps.length;
    while (i--) {
        this$1.deps[i].depend();
    }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
        var this$1 = this;

    if (this.active) {
        // remove self from vm's watcher list
        // this is a somewhat expensive operation so we skip it
        // if the vm is being destroyed.
        if (!this.vm._isBeingDestroyed) {
            remove(this.vm._watchers, this);
        }
        var i = this.deps.length;
        while (i--) {
            this$1.deps[i].removeSub(this$1);
        }
        this.active = false;
    }
};

var seenObjects = new _Set();
function traverse (val) {
    seenObjects.clear();
    _traverse(val, seenObjects);
}

function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
        return
    }
    if (val.__ob__) {
        var depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return
        }
        seen.add(depId);
    }
    if (isA) {
        i = val.length;
        while (i--) { _traverse(val[i], seen); }
    } else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--) { _traverse(val[keys[i]], seen); }
    }
}

/*  */

var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};

function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
        if (opts.methods) { initMethods(vm, opts.methods); }
            if (opts.data) {
                initData(vm);
            } else {
                observe(vm._data = {}, true /* asRootData */);
            }
            if (opts.computed) { initComputed(vm, opts.computed); }
                if (opts.watch) { initWatch(vm, opts.watch); }
}

function checkOptionType (vm, name) {
    var option = vm.$options[name];
    if (!isPlainObject(option)) {
        warn(
            ("component option \"" + name + "\" should be an object."),
            vm
        );
    }
}

function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function ( key ) {
        keys.push(key);
        var value = validateProp(key, propsOptions, propsData, vm);
        /* istanbul ignore else */
        {
            defineReactive$$1(props, key, value);
        }
        // static props are already proxied on the component's prototype
        // during Vue.extend(). We only need to proxy props defined at
        // instantiation here.
        if (!(key in vm)) {
            proxy(vm, "_props", key);
        }
    };

    for (var key in propsOptions) loop( key );
    observerState.shouldConvert = true;
}

function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {};
        if (!isPlainObject(data)) {
            data = {};
            "production" !== 'production' && warn(
                'data functions should return an object:\n' +
                    'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
                    vm
            );
        }
        // proxy data on instance
        var keys = Object.keys(data);
        var props = vm.$options.props;
        var methods = vm.$options.methods;
        var i = keys.length;
        while (i--) {
            var key = keys[i];
            if (props && hasOwn(props, key)) {
                "production" !== 'production' && warn(
                    "The data property \"" + key + "\" is already declared as a prop. " +
                        "Use prop default value instead.",
                        vm
                );
            } else if (!isReserved(key)) {
                proxy(vm, "_data", key);
            }
        }
        // observe data
        observe(data, true /* asRootData */);
}

function getData (data, vm) {
    try {
        return data.call(vm)
    } catch (e) {
        handleError(e, vm, "data()");
        return {}
    }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
    "production" !== 'production' && checkOptionType(vm, 'computed');
    var watchers = vm._computedWatchers = Object.create(null);

    for (var key in computed) {
        var userDef = computed[key];
        var getter = typeof userDef === 'function' ? userDef : userDef.get;
        watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        if (!(key in vm)) {
            defineComputed(vm, key, userDef);
        } else {}
    }
}

function defineComputed (target, key, userDef) {
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key);
        sharedPropertyDefinition.set = noop;
    } else {
        sharedPropertyDefinition.get = userDef.get
            ? userDef.cache !== false
            ? createComputedGetter(key)
            : userDef.get
                : noop;
                sharedPropertyDefinition.set = userDef.set
                    ? userDef.set
                    : noop;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
    return function computedGetter () {
        var watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate();
            }
            if (Dep.target) {
                watcher.depend();
            }
            return watcher.value
        }
    }
}

function initMethods (vm, methods) {
    "production" !== 'production' && checkOptionType(vm, 'methods');
    var props = vm.$options.props;
    for (var key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm);

    }
}

function initWatch (vm, watch) {
    "production" !== 'production' && checkOptionType(vm, 'watch');
    for (var key in watch) {
        var handler = watch[key];
        if (Array.isArray(handler)) {
            for (var i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        } else {
            createWatcher(vm, key, handler);
        }
    }
}

function createWatcher (
    vm,
    keyOrFn,
    handler,
    options
) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
    }
    if (typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
        expOrFn,
        cb,
        options
    ) {
        var vm = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {};
        options.user = true;
        var watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            cb.call(vm, watcher.value);
        }
        return function unwatchFn () {
            watcher.teardown();
        }
    };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        var vm = this;
        // a uid
        vm._uid = uid$1++;

            var startTag, endTag;
            /* istanbul ignore if */
            if (false) {
                startTag = "vue-perf-init:" + (vm._uid);
                endTag = "vue-perf-end:" + (vm._uid);
                mark(startTag);
            }

            // a flag to avoid this being observed
            vm._isVue = true;
            // merge options
            if (options && options._isComponent) {
                // optimize internal component instantiation
                // since dynamic options merging is pretty slow, and none of the
                // internal component options needs special treatment.
                initInternalComponent(vm, options);
            } else {
                vm.$options = mergeOptions(
                    resolveConstructorOptions(vm.constructor),
                    options || {},
                    vm
                );
            }
            /* istanbul ignore else */
            {
                vm._renderProxy = vm;
            }
            // expose real self
            vm._self = vm;
            initLifecycle(vm);
            initEvents(vm);
            initRender(vm);
            callHook(vm, 'beforeCreate');
            initInjections(vm); // resolve injections before data/props
            initState(vm);
            initProvide(vm); // resolve provide after data/props
            callHook(vm, 'created');

            /* istanbul ignore if */
            if (false) {
                vm._name = formatComponentName(vm, false);
                mark(endTag);
                measure(((vm._name) + " init"), startTag, endTag);
            }

            if (vm.$options.el) {
                vm.$mount(vm.$options.el);
            }
    };
}

function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    opts._parentElm = options._parentElm;
    opts._refElm = options._refElm;
    if (options.render) {
        opts.render = options.render;
        opts.staticRenderFns = options.staticRenderFns;
    }
}

function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
        var superOptions = resolveConstructorOptions(Ctor.super);
        var cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions;
            // check if there are any late-modified/attached options (#4976)
            var modifiedOptions = resolveModifiedOptions(Ctor);
            // update base extend options
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions);
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
            if (options.name) {
                options.components[options.name] = Ctor;
            }
        }
    }
    return options
}

function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var extended = Ctor.extendOptions;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
        if (latest[key] !== sealed[key]) {
            if (!modified) { modified = {}; }
            modified[key] = dedupe(latest[key], extended[key], sealed[key]);
        }
    }
    return modified
}

function dedupe (latest, extended, sealed) {
    // compare latest and sealed to ensure lifecycle hooks won't be duplicated
    // between merges
    if (Array.isArray(latest)) {
        var res = [];
        sealed = Array.isArray(sealed) ? sealed : [sealed];
        extended = Array.isArray(extended) ? extended : [extended];
        for (var i = 0; i < latest.length; i++) {
            // push original options and not sealed options to exclude duplicated options
            if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
                res.push(latest[i]);
            }
        }
        return res
    } else {
        return latest
    }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
  console.log('vue_constructor');
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var cid = this.cid;
    if (!plugin._installed) {
      plugin._installed = {};
    }
    if (plugin._installed[cid]) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin._installed[cid] = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.3';

var eventArr = {};

var qiyinode_uid = 0;

var QiyiNode = function QiyiNode( config){
    if ( config === void 0 ) config = {
    _uid : Number,
    tagName : String,
    children : Array,
    data : Object,
    attrs : {},
    events:[],
    domAction:[],
    attrAction:[],
    text:String
};

    this._uid = config._uid || qiyinode_uid ++ ;
    this.tagName = config.tagName;
    this.children = config.children;
    this.data = config.data;
    this.attrs = config.attrs;
    this.events = config.events;
    this.domAction = config.domAction;
    this.attrAction = config.attrAction;
    this.text = config.text;
};
QiyiNode.prototype.hasChildNodes = function hasChildNodes (){
    return Array.isArray(this.children) && this.children.length !== 0 ;
};

/**/

var diff = {
    diffElms:{},
    lifeCycle:''
};
function diffElmSet(qiyiNode){
    if(isDef(qiyiNode) && isDef(qiyiNode._uid) && isUndef(diff.diffElms[qiyiNode._uid])){
        diff.diffElms[qiyiNode._uid] = qiyiNode;
    }
}
function diffUpdate(_uid,key,value){
    diff.diffElms[_uid] = diff.diffElms[_uid] || new QiyiNode({_uid:_uid});
    diff.diffElms[_uid][key] = value;
}
function addAttrOp( _uid , attrObj){
    if ( attrObj === void 0 ) attrObj = { op : '' , key : '' , value : '' };

    // startup attrAction
    diff.diffElms[_uid] || (diff.diffElms[_uid] = new QiyiNode({_uid:_uid,attrAction:[]}));
    diff.diffElms[_uid].attrAction || (diff.diffElms[_uid].attrAction = []);
    // set attrAction
    diff.diffElms[_uid].attrAction.push(attrObj);
}
function addEventOp( _uid , eventObj){
    if ( eventObj === void 0 ) eventObj = { op : '' , event : '' };

    // startup attrAction
    diff.diffElms[_uid] || (diff.diffElms[_uid] = new QiyiNode({_uid:_uid,eventAction:[]}));
    diff.diffElms[_uid].eventAction || (diff.diffElms[_uid].eventAction = []);
    // set attrAction
    diff.diffElms[_uid].eventAction.push(eventObj);
}
function getDiffJson(){
    return JSON.stringify(diff);
}
function isDiffEmpty(){
    return Object.keys(diff.diffElms).length === 0;
}
function clearDiff(){
    diff.diffElms = {};
    diff.lifeCycle = '';
}
function setDiffLifeCycle(lifeCycle){
    diff.lifeCycle = lifeCycle;
}

var QiyiBridge = new Object({
    bridgeDoPatch:function (){
        if(isDiffEmpty()){
            return;
        }
        console.log('[diff json] : ' + getDiffJson());
        var patch_command = '__bridge__.on_recv_patch_command(' + getDiffJson() + ')';
        try{
            __bridge__ && window.__bridge__.on_recv_patch_command(diff);
        }catch(e){

        }
        try{
            __base__.commit(patch_command);
        }catch(e){

        }
        // clear data after patch;
        clearDiff();
    },
    /*
     * eventObj : { _uid,event }
     */
    bridgeDoMount:function (){
        setDiffLifeCycle('mounted');
        QiyiBridge.bridgeDoPatch();
    },
    bridgeGetEvent:function (eventObj){
        eventArr[eventObj._uid] && eventArr[eventObj._uid][eventObj.event] && eventArr[eventObj._uid][eventObj.event].call(null,eventObj.params);
        setDiffLifeCycle('updated');
        nextTick(QiyiBridge.bridgeDoPatch);
    }

});

/*  */

var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */



var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
    return false;
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

function query (el) {
    return undefined;
}

/*  */

function createElement$1 (tagName, vnode) {
    var qiyi_node = new QiyiNode({
        tagName : tagName,
        children : [],
        data : vnode.data,
        attrs : {},
        events:[],
        attrAction:[],
        domAction:[]
    });
    diffElmSet(qiyi_node);
    return qiyi_node;
}

function createElementNS (namespace, tagName) {
    return ;
    //return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
    var qiyi_text_node = new QiyiNode({
        tagName : 'text',
        text : text
    });
    return qiyi_text_node;
}

function createComment (text) {
    var qiyi_comment_node = new QiyiNode({
        tagName : 'comment',
        text : text
    });
    return qiyi_comment_node;
}

function insertBefore (parentNode, newNode, referenceNode) {
    console.log('[insertBefore] : ',parentNode,newNode,referenceNode);
    return ;
    parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
    child.parent = node._uid;
    child.action = 'removeChild';
    diffElmSet(child);
}

function appendChild (node, child) {
    child.parent = node._uid;
    child.action = 'appendChild';
    node && node.children && node.children.push(child._uid);
    diffElmSet(child);
}

function parentNode (node) {
    return node.parent;
}

function nextSibling (node) {
    return ;
    return node.nextSibling
}

function tagName (node) {
    return node.tagName
}

function setTextContent (node, text) {
    node.text = text;
    diffUpdate( node.parent , 'text' , text );
}

function setAttribute (node, key, val) {
    addAttrOp( node._uid , {
        op : 'setAttribute',
        key : key,
        value : val
    });
}
function removeAttribute( node , key ){
    node.attrAction = node.attrAction || [];
    node.attrAction.push({
        op : 'removeAttribute',
        key : key
    });
    node && node.attrs && ( delete node.attrs[key] );
}
function removeAttributeNS( node , key ){
    node && node.attrs && ( delete node.attrs[key] );
}
function addDomAction( node , action ){
    node.domAction = node.domAction || [];
    node.domAction.push( action );
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute,
	removeAttribute: removeAttribute,
	removeAttributeNS: removeAttributeNS,
	addDomAction: addDomAction
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
    return (
        a.key === b.key && (
            (
                a.tag === b.tag &&
                    a.isComment === b.isComment &&
                        isDef(a.data) === isDef(b.data) &&
                            sameInputType(a, b)
            ) || (
            isTrue(a.isAsyncPlaceholder) &&
                a.asyncFactory === b.asyncFactory &&
                    isUndef(b.asyncFactory.error)
            )
        )
    )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
        var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) { map[key] = i; }
    }
return map
}

function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
                cbs[hooks[i]].push(modules[j][hooks[i]]);
            }
        }
    }

    function emptyNodeAt (elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
        function remove$$1 () {
            if (--remove$$1.listeners === 0) {
                removeNode(childElm);
            }
        }
        remove$$1.listeners = listeners;
        return remove$$1
    }

    function removeNode (el) {
        var parent = nodeOps.parentNode(el);
        // element may have already been removed due to v-html / v-text
        if (isDef(parent)) {
            nodeOps.removeChild(parent, el);
        }
    }

    var inPre = 0;
    function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
        vnode.isRootInsert = !nested; // for transition enter check
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return
        }

        var data = vnode.data;
        var children = vnode.children;
        var tag = vnode.tag;
        if (isDef(tag)) {
            vnode.elm = vnode.ns
                ? nodeOps.createElementNS(vnode.ns, tag)
                : nodeOps.createElement(tag, vnode);
                setScope(vnode);

                /* istanbul ignore if */
                {
                    createChildren(vnode, children, insertedVnodeQueue);
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue);
                    }
                    insert(parentElm, vnode.elm, refElm);
                }

                if (false) {
                    inPre--;
                }
        } else if (isTrue(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text);
            console.log('isComment');
            insert(parentElm, vnode.elm, refElm);
        } else {
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        var i = vnode.data;
        if (isDef(i)) {
            var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
            if (isDef(i = i.hook) && isDef(i = i.init)) {
                i(vnode, false /* hydrating */, parentElm, refElm);
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            if (isDef(vnode.componentInstance)) {
                initComponent(vnode, insertedVnodeQueue);
                if (isTrue(isReactivated)) {
                    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                }
                return true
            }
        }
    }

    function initComponent (vnode, insertedVnodeQueue) {
        if (isDef(vnode.data.pendingInsert)) {
            insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
            vnode.data.pendingInsert = null;
        }
        vnode.elm = vnode.componentInstance.$el;
        if (isPatchable(vnode)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            setScope(vnode);
        } else {
            // empty component root.
            // skip all element-related modules except for ref (#3455)
            registerRef(vnode);
            // make sure to invoke the insert hook
            insertedVnodeQueue.push(vnode);
        }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        var i;
        // hack for #4339: a reactivated component with inner transition
        // does not trigger because the inner node's created hooks are not called
        // again. It's not ideal to involve module-specific logic in here but
        // there doesn't seem to be a better way to do it.
        var innerNode = vnode;
        while (innerNode.componentInstance) {
            innerNode = innerNode.componentInstance._vnode;
            if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
                for (i = 0; i < cbs.activate.length; ++i) {
                    cbs.activate[i](emptyNode, innerNode);
                }
                insertedVnodeQueue.push(innerNode);
                break
            }
        }
        // unlike a newly created component,
        // a reactivated keep-alive component doesn't insert itself
        insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
        if (isDef(parent)) {
            if (isDef(ref$$1)) {
                if (ref$$1.parentNode === parent) {
                    nodeOps.insertBefore(parent, elm, ref$$1);
                }
            } else {
                nodeOps.appendChild(parent, elm);
            }
        }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; ++i) {
                createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
            }
        } else if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
        }
    }

    function isPatchable (vnode) {
        while (vnode.componentInstance) {
            vnode = vnode.componentInstance._vnode;
        }
        return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
        for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
            cbs.create[i$1](emptyNode, vnode);
        }
        i = vnode.data.hook; // Reuse variable
        if (isDef(i)) {
            if (isDef(i.create)) { i.create(emptyNode, vnode); }
                if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
        }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
        var i;
        var ancestor = vnode;
        while (ancestor) {
            if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
                nodeOps.setAttribute(vnode.elm, i, '');
            }
            ancestor = ancestor.parent;
        }
        // for slot content they should also get the scopeId from the host instance.
        if (isDef(i = activeInstance) &&
            i !== vnode.context &&
            isDef(i = i.$options._scopeId)
           ) {
               nodeOps.setAttribute(vnode.elm, i, '');
           }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
        }
    }

    function invokeDestroyHook (vnode) {
        var i, j;
        var data = vnode.data;
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
                for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
        }
        if (isDef(i = vnode.children)) {
            for (j = 0; j < vnode.children.length; ++j) {
                invokeDestroyHook(vnode.children[j]);
            }
        }
    }

    function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.tag)) {
                    removeAndInvokeRemoveHook(ch);
                    invokeDestroyHook(ch);
                } else { // Text node
                    removeNode(ch.elm);
                }
            }
        }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
        if (isDef(rm) || isDef(vnode.data)) {
            var i;
            var listeners = cbs.remove.length + 1;
            if (isDef(rm)) {
                // we have a recursively passed down rm callback
                // increase the listeners count
                rm.listeners += listeners;
            } else {
                // directly removing
                rm = createRmCb(vnode.elm, listeners);
            }
            // recursively invoke hooks on child component root node
            if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
                removeAndInvokeRemoveHook(i, rm);
            }
            for (i = 0; i < cbs.remove.length; ++i) {
                cbs.remove[i](vnode, rm);
            }
            if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
                i(vnode, rm);
            } else {
                rm();
            }
        } else {
            removeNode(vnode.elm);
        }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        var oldStartIdx = 0;
        var newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx, idxInOld, elmToMove, refElm;

        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        var canMove = !removeOnly;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            } else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
                    idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
                if (isUndef(idxInOld)) { // New element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } else {
                    elmToMove = oldCh[idxInOld];
                    /* istanbul ignore if */
                    if (false) {
                        warn(
                            'It seems there are duplicate keys that is causing an update error. ' +
                                'Make sure each v-for item has a unique key.'
                        );
                    }
                    if (sameVnode(elmToMove, newStartVnode)) {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                        newStartVnode = newCh[++newStartIdx];
                    } else {
                        // same key but different element. treat as new element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
                        newStartVnode = newCh[++newStartIdx];
                    }
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }

    function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
        if (oldVnode === vnode) {
            return
        }

        var elm = vnode.elm = oldVnode.elm;

        if(elm._uid == 103){
            console.log(elm);
        }

        if (isTrue(oldVnode.isAsyncPlaceholder)) {
            if (isDef(vnode.asyncFactory.resolved)) {
                hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
            } else {
                vnode.isAsyncPlaceholder = true;
            }
            return
        }

        // reuse element for static trees.
        // note we only do this if the vnode is cloned -
        // if the new node is not cloned it means the render functions have been
        // reset by the hot-reload-api and we need to do a proper re-render.
        if (isTrue(vnode.isStatic) &&
            isTrue(oldVnode.isStatic) &&
            vnode.key === oldVnode.key &&
                (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
           ) {
               vnode.componentInstance = oldVnode.componentInstance;
               return
           }

           var i;
           var data = vnode.data;
           if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
               i(oldVnode, vnode);
           }

           var oldCh = oldVnode.children;
           var ch = vnode.children;
           if (isDef(data) && isPatchable(vnode)) {
               for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
               if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
           }
       if (isUndef(vnode.text)) {
           if (isDef(oldCh) && isDef(ch)) {
               if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
           } else if (isDef(ch)) {
               if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
                   addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
           } else if (isDef(oldCh)) {
               removeVnodes(elm, oldCh, 0, oldCh.length - 1);
           } else if (isDef(oldVnode.text)) {
               nodeOps.setTextContent(elm, '');
           }
       } else if (oldVnode.text !== vnode.text) {
           nodeOps.setTextContent(elm, vnode.text);
       }
       if (isDef(data)) {
           if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
       }
    }

    function invokeInsertHook (vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) && isDef(vnode.parent)) {
            vnode.parent.data.pendingInsert = queue;
        } else {
            for (var i = 0; i < queue.length; ++i) {
                queue[i].data.hook.insert(queue[i]);
            }
        }
    }

    var bailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue) {
        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
            vnode.elm = elm;
            vnode.isAsyncPlaceholder = true;
            return true
        }
        vnode.elm = elm;
        var tag = vnode.tag;
        var data = vnode.data;
        var children = vnode.children;
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
                if (isDef(i = vnode.componentInstance)) {
                    // child component. it should have hydrated its own tree.
                    initComponent(vnode, insertedVnodeQueue);
                    return true
                }
        }
        if (isDef(tag)) {
            if (isDef(children)) {
                // empty element, allow client to pick up and populate children
                if (!elm.hasChildNodes()) {
                    createChildren(vnode, children, insertedVnodeQueue);
                } else {
                    var childrenMatch = true;
                    var childNode = elm.firstChild;
                    for (var i$1 = 0; i$1 < children.length; i$1++) {
                        if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                            childrenMatch = false;
                            break
                        }
                        childNode = childNode.nextSibling;
                    }
                    // if childNode is not null, it means the actual childNodes list is
                    // longer than the virtual children list.
                    if (!childrenMatch || childNode) {
                        if (false
                           ) {
                               bailed = true;
                               console.warn('Parent: ', elm);
                               console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                           }
                           return false
                    }
                }
            }
            if (isDef(data)) {
                for (var key in data) {
                    if (!isRenderedModule(key)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue);
                        break
                    }
                }
            }
        } else if (elm.data !== vnode.text) {
            elm.data = vnode.text;
        }
        return true
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        if (isUndef(vnode)) {
            if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
                return
        }

        var isInitialPatch = false;
        var insertedVnodeQueue = [];

        if (isUndef(oldVnode)) {
            // empty mount (likely as component), create new root element
            isInitialPatch = true;
            createElm(vnode, insertedVnodeQueue, parentElm, refElm);
        } else {
            var isRealElement = isDef(oldVnode.nodeType);
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
                // patch existing root node
                patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
            } else {
                if (isRealElement) {
                    // mounting to a real element
                    // check if this is server-rendered content and if we can perform
                    // a successful hydration.
                    if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                        oldVnode.removeAttribute(SSR_ATTR);
                        hydrating = true;
                    }
                    if (isTrue(hydrating)) {
                        if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                            invokeInsertHook(vnode, insertedVnodeQueue, true);
                            return oldVnode
                        } else {}
                    }
                    // either not server-rendered, or hydration failed.
                    // create an empty node and replace it
                    oldVnode = emptyNodeAt(oldVnode);
                }
                // replacing existing element
                var oldElm = oldVnode.elm;
                var parentElm$1 = nodeOps.parentNode(oldElm);
                createElm(
                    vnode,
                    insertedVnodeQueue,
                    // extremely rare edge case: do not insert if old element is in a
                    // leaving transition. Only happens when combining transition +
                    // keep-alive + HOCs. (#4590)
                    oldElm._leaveCb ? null : parentElm$1,
                    nodeOps.nextSibling(oldElm)
                );

                if (isDef(vnode.parent)) {
                    // component root element replaced.
                    // update parent placeholder node element, recursively
                    var ancestor = vnode.parent;
                    while (ancestor) {
                        ancestor.elm = vnode.elm;
                        ancestor = ancestor.parent;
                    }
                    if (isPatchable(vnode)) {
                        for (var i = 0; i < cbs.create.length; ++i) {
                            cbs.create[i](emptyNode, vnode.parent);
                        }
                    }
                }

                if (isDef(parentElm$1)) {
                    removeVnodes(parentElm$1, [oldVnode], 0, 0);
                } else if (isDef(oldVnode.tag)) {
                    invokeDestroyHook(oldVnode);
                }
            }
        }

        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm
    }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
        return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
        attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            setAttr(elm, key, cur);
        }
    }
    for (key in oldAttrs) {
        if (isUndef(attrs[key])) {
            if (isXlink(key)) {
                elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
            } else if (!isEnumeratedAttr(key)) {
                removeAttribute(elm,key);
            }
        }
    }
}

// qiyiSetAttr
function setAttr (el, key, value) {
    if (isBooleanAttr(key)) {
        // set attribute for blank value
        // e.g. <option disabled>Select one</option>
        if (isFalsyAttrValue(value)) {
            removeAttribute(el,value);
        } else {
            setAttribute(el,key,key);
        }
    } else if (isEnumeratedAttr(key)) {
        setAttribute(el,key,isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
    } else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    } else {
        if (isFalsyAttrValue(value)) {
            removeAttribute(el,value);
        } else {
            setAttribute(el,key,value);
        }
    }
}

var attrs = {
    create: updateAttrs,
    update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
        isUndef(data.staticClass) &&
        isUndef(data.class) && (
            isUndef(oldData) || (
                isUndef(oldData.staticClass) &&
                    isUndef(oldData.class)
            )
        )
    ) {
        return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
    }
    // set the class
    if (cls !== el._prevClass) {
        el.class = cls;
        el._prevClass = cls;
    }
    //由于updateClass晚于createElement，故提供更新操作
    diffUpdate( el._uid ,'class',cls);
}

var klass = {
    create: updateClass,
    update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
    el,
    dir,
    _warn
) {
    warn$1 = _warn;
    var value = dir.value;
    var modifiers = dir.modifiers;
    var tag = el.tag;
    var type = el.attrsMap.type;

    if (tag === 'select') {
        genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false
    } else {}

    // ensure runtime directive metadata
    return true
}

function genCheckboxModel (
    el,
    value,
    modifiers
) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(el, 'checked',
            "Array.isArray(" + value + ")" +
                "?_i(" + value + "," + valueBinding + ")>-1" + (
                    trueValueBinding === 'true'
                        ? (":(" + value + ")")
                        : (":_q(" + value + "," + trueValueBinding + ")")
                )
           );
           addHandler(el, CHECKBOX_RADIO_TOKEN,
                      "var $$a=" + value + "," +
                          '$$el=$event.target,' +
                              "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
                                  'if(Array.isArray($$a)){' +
                                      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
                                          '$$i=_i($$a,$$v);' +
                                              "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
                                                  "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
                                                      "}else{" + (genAssignmentCode(value, '$$c')) + "}",
                                                      null, true
                     );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
    addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
    addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
    var number = modifiers && modifiers.number;
    var selectedVal = "Array.prototype.filter" +
        ".call($event.target.options,function(o){return o.selected})" +
            ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
                "return " + (number ? '_n(val)' : 'val') + "})";

                var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
                var code = "var $$selectedVal = " + selectedVal + ";";
                code = code + " " + (genAssignmentCode(value, assignment));
                addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
    el,
    value,
    modifiers
) {
    var type = el.attrsMap.type;
    var ref = modifiers || {};
    var lazy = ref.lazy;
    var number = ref.number;
    var trim = ref.trim;
    var needCompositionGuard = !lazy && type !== 'range';
    var event = lazy
        ? 'change'
        : type === 'range'
            ? RANGE_TOKEN
            : 'input';

            var valueExpression = '$event.target.value';
            if (trim) {
                valueExpression = "$event.target.value.trim()";
            }
            if (number) {
                valueExpression = "_n(" + valueExpression + ")";
            }

            var code = genAssignmentCode(value, valueExpression);
            if (needCompositionGuard) {
                code = "if($event.target.composing)return;" + code;
            }

            addProp(el, 'value', ("(" + value + ")"));
            addHandler(el, event, code, null, true);
            if (trim || number || type === 'number') {
                addHandler(el, 'blur', '$forceUpdate()');
            }
}

/*  */

function normalizeEvents (on) {
    var event;
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
        // IE input[type=range] only supports `change` event
        event = isIE ? 'change' : 'input';
        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
        delete on[RANGE_TOKEN];
    }
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        // Chrome fires microtasks in between click/change, leads to #4521
        event = isChrome ? 'click' : 'change';
        on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
        delete on[CHECKBOX_RADIO_TOKEN];
    }
}

var target$1;

function add$1 (
    event,
    handler,
    once$$1,
    capture,
    passive
) {
    if (once$$1) {
        var oldHandler = handler;
        var _target = target$1; // save current target element in closure
        handler = function (ev) {
            var res = arguments.length === 1
                ? oldHandler(ev)
                : oldHandler.apply(null, arguments);
                if (res !== null) {
                    remove$2(event, handler, capture, _target);
                }
        };
    }
    // set events to elm
    addEventOp(target$1._uid,{
        op : 'addEventListener',
        event : event,
    });
    // save eventCallback
    eventArr[target$1._uid] || (eventArr[target$1._uid] = {});
    eventArr[target$1._uid][event] || (eventArr[target$1._uid][event] = handler);

    //console.log('[eventCallback]',target,event,eventCallback)
}

function remove$2 (
    event,
    handler,
    capture,
    _target
) {
    addEventOp((_target || target$1)._uid,{
        op : 'removeEventListener',
        event : event,
    });
}

function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
        return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
        return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
        props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
        if (isUndef(props[key])) {
            elm[key] = '';
        }
    }
    for (key in props) {
        cur = props[key];
        // ignore children if the node has textContent or innerHTML,
        // as these will throw away existing DOM nodes and cause removal errors
        // on subsequent patches (#3360)
        if (key === 'textContent' || key === 'innerHTML') {
            if (vnode.children) { vnode.children.length = 0; }
                if (cur === oldProps[key]) { continue }
        }

if (key === 'value') {
    // store value as _value as well since
    // non-string values will be stringified
    elm._value = cur;
    // avoid resetting cursor position when value is the same
    var strCur = isUndef(cur) ? '' : String(cur);
    if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
    }
} else {
    elm[key] = cur;
}
    }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
    elm,
    vnode,
    checkVal
) {
    return (!elm.composing && (
        vnode.tag === 'option' ||
            isDirty(elm, checkVal) ||
                isInputChanged(elm, checkVal)
    ))
}

function isDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
        return toNumber(value) !== toNumber(newVal)
    }
    if (isDef(modifiers) && modifiers.trim) {
        return value.trim() !== newVal.trim()
    }
    return value !== newVal
}

var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
        el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
        el.style.setProperty(name, val.replace(importantRE, ''), 'important');
    } else {
        var normalizedName = normalize(name);
        if (Array.isArray(val)) {
            // Support values array created by autoprefixer, e.g.
            // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
            // Set them one by one, and the browser will only set those it can recognize
            for (var i = 0, len = val.length; i < len; i++) {
                el.style || (el.style = {});
                el.style[normalizedName] = val[i];
            }
        } else {
            el.style || (el.style = {});
            el.style[normalizedName] = val;
        }
        diffUpdate(el._uid,'style',el.style);
    }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || {};
    prop = camelize(prop);
    // limit style tag here by use prop in styleTags
    if (prop !== 'filter' ) {
        return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
        var name = vendorNames[i] + capName;
        if (name in emptyStyle) {
            return name
        }
    }
});

function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
        isUndef(oldData.staticStyle) && isUndef(oldData.style)
       ) {
           return
       }

       var cur, name;
       var el = vnode.elm;
       var oldStaticStyle = oldData.staticStyle;
       var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

       // if static style exists, stylebinding already merged into it when doing normalizeStyleData
       var oldStyle = oldStaticStyle || oldStyleBinding;

       var style = normalizeStyleBinding(vnode.data.style) || {};

       // store normalized style under a different key for next diff
       // make sure to clone it if it's reactive, since the user likley wants
       // to mutate it.
       vnode.data.normalizedStyle = isDef(style.__ob__)
           ? extend({}, style)
           : style;

           var newStyle = getStyle(vnode, true);

           for (name in oldStyle) {
               if (isUndef(newStyle[name])) {
                   setProp(el, name, '');
               }
           }
           for (name in newStyle) {
               cur = newStyle[name];
               if (cur !== oldStyle[name]) {
                   // ie9 setting to null has no effect, must use empty string
                   setProp(el, name, cur == null ? '' : cur);
               }
           }

}

var style = {
    create: updateStyle,
    update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var isTextInputType = makeMap('text,password,search,email,tel,url');

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1 && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1 && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
        return vnode
    }
}

function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
        data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
        data[camelize(key$1)] = listeners[key$1];
    }
    return data
}

function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
            props: rawChild.componentOptions.propsData
        })
    }
}

function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
        if (vnode.data.transition) {
            return true
        }
    }
}

function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
}

function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
}

var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
        var this$1 = this;

        var children = this.$options._renderChildren;
        if (!children) {
            return
        }

        // filter out text nodes (possible whitespaces)
        children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
        /* istanbul ignore if */
        if (!children.length) {
            return
        }

        // warn multiple elements
        if (false) {
            warn(
                '<transition> can only be used on a single element. Use ' +
                    '<transition-group> for lists.',
                    this.$parent
            );
        }

        var mode = this.mode;

        // warn invalid mode
        if (false
           ) {
               warn(
                   'invalid <transition> mode: ' + mode,
                   this.$parent
               );
           }

           var rawChild = children[0];

           // if this is a component root node and the component's
           // parent container node also has transition, skip.
           if (hasParentTransition(this.$vnode)) {
               return rawChild
           }

           // apply transition data to child
           // use getRealChild() to ignore abstract components e.g. keep-alive
           var child = getRealChild(rawChild);
           /* istanbul ignore if */
           if (!child) {
               return rawChild
           }

           if (this._leaving) {
               return placeholder(h, rawChild)
           }

           // ensure a key that is unique to the vnode type and to this transition
           // component instance. This key will be used to remove pending leaving nodes
           // during entering.
           var id = "__transition-" + (this._uid) + "-";
           child.key = child.key == null
               ? child.isComment
               ? id + 'comment'
               : id + child.tag
                   : isPrimitive(child.key)
                       ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
                       : child.key;

                       var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
                       var oldRawChild = this._vnode;
                       var oldChild = getRealChild(oldRawChild);

                       // mark v-show
                       // so that the transition module can hand over the control to the directive
                       if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
                           child.data.show = true;
                       }

                       if (
                           oldChild &&
                           oldChild.data &&
                               !isSameChild(child, oldChild) &&
                                   !isAsyncPlaceholder(oldChild)
                       ) {
                           // replace old child transition data with fresh one
                           // important for dynamic transitions!
                           var oldData = oldChild && (oldChild.data.transition = extend({}, data));
                           // handle transition mode
                           if (mode === 'out-in') {
                               // return placeholder node and queue update when leave finishes
                               this._leaving = true;
                               mergeVNodeHook(oldData, 'afterLeave', function () {
                                   this$1._leaving = false;
                                   this$1.$forceUpdate();
                               });
                               return placeholder(h, rawChild)
                           } else if (mode === 'in-out') {
                               if (isAsyncPlaceholder(child)) {
                                   return oldRawChild
                               }
                               var delayedLeave;
                               var performLeave = function () { delayedLeave(); };
                               mergeVNodeHook(data, 'afterEnter', performLeave);
                               mergeVNodeHook(data, 'enterCancelled', performLeave);
                               mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
                           }
                       }

                       return rawChild
    }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
    tag: String,
    moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
    props: props,

    render: function render (h) {
        var tag = this.tag || this.$vnode.data.tag || 'span';
        var map = Object.create(null);
        var prevChildren = this.prevChildren = this.children;
        var rawChildren = this.$slots.default || [];
        var children = this.children = [];
        var transitionData = extractTransitionData(this);

        for (var i = 0; i < rawChildren.length; i++) {
            var c = rawChildren[i];
            if (c.tag) {
                if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                    children.push(c);
                    map[c.key] = c
                    ;(c.data || (c.data = {})).transition = transitionData;
                } else {}
            }
        }

        if (prevChildren) {
            var kept = [];
            var removed = [];
            for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
                var c$1 = prevChildren[i$1];
                c$1.data.transition = transitionData;
                c$1.data.pos = c$1.elm.getBoundingClientRect();
                if (map[c$1.key]) {
                    kept.push(c$1);
                } else {
                    removed.push(c$1);
                }
            }
            this.kept = h(tag, null, kept);
            this.removed = removed;
        }

        return h(tag, null, children)
    },

    beforeUpdate: function beforeUpdate () {
        // force removing pass
        this.__patch__(
            this._vnode,
            this.kept,
            false, // hydrating
            true // removeOnly (!important, avoids unnecessary moves)
        );
        this._vnode = this.kept;
    },

    updated: function updated () {
        var children = this.prevChildren;
        var moveClass = this.moveClass || ((this.name || 'v') + '-move');
        if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
            return
        }

        // we divide the work into three loops to avoid mixing DOM reads and writes
        // in each iteration - which helps prevent layout thrashing.
        children.forEach(callPendingCbs);
        children.forEach(recordPosition);
        children.forEach(applyTranslation);

        // force reflow to put everything in position
        var body = document.body;
        var f = body.offsetHeight; // eslint-disable-line

        children.forEach(function (c) {
            if (c.data.moved) {
                var el = c.elm;
                var s = el.style;
                addTransitionClass(el, moveClass);
                s.transform = s.WebkitTransform = s.transitionDuration = '';
                el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
                    if (!e || /transform$/.test(e.propertyName)) {
                        el.removeEventListener(transitionEndEvent, cb);
                        el._moveCb = null;
                        removeTransitionClass(el, moveClass);
                    }
                });
            }
        });
    },

    methods: {
        hasMove: function hasMove (el, moveClass) {
            /* istanbul ignore if */
            if (!hasTransition) {
                return false
            }
            if (this._hasMove != null) {
                return this._hasMove
            }
            // Detect whether an element with the move class applied has
            // CSS transitions. Since the element may be inside an entering
            // transition at this very moment, we make a clone of it and remove
            // all other transition classes applied to ensure only the move class
            // is applied.
            var clone = el.cloneNode();
            if (el._transitionClasses) {
                el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
            }
            addClass(clone, moveClass);
            clone.style.display = 'none';
            this.$el.appendChild(clone);
            var info = getTransitionInfo(clone);
            this.$el.removeChild(clone);
            return (this._hasMove = info.hasTransform)
        }
    }
};

function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
        c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
        c.elm._enterCb();
    }
}

function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
        c.data.moved = true;
        var s = c.elm.style;
        s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
        s.transitionDuration = '0s';
    }
}

/*  */
var View = {
    template:'<div><slot></slot></div>',
    name:'View'
};

var Text = {
    name:'Text',
    template:"<span><slot></slot></span>",
};

var Image = {
    props:['src'],
    name:'Image',
    template:"<img :src=\"src\" style=\"display:block;width:100%;\" />"
};

var Swiper = {
    name:'Swiper',
    template:"<div @swiper_end=\"swiper_end\" class=\"swiper\">\n                <slot></slot>\n            </div>",
    methods:{
        swiper_end:function(index){
            this.$emit('swiper_end',index);
        },
    }
};

var SwiperItem = {
    name:'SwiperItem',
    template:'<div class="item" style="width:100%;height:100%;display:inline-block;"><slot></slot></div>',
    updated:function(){
        //console.log('swiperitem updated')
    }
};

var ScrollView = {
    template : '<ul class="scroll-view-x"><slot></slot></ul>'
};

var Button = {
    name:'Button',
    template:'<div @touchstart="button_touchstart" @click="button_click"><slot></slot></div>',
    methods:{
        button_click:function(){
            console.log('button clicked');
            this.$emit('click');
        },
        button_touchstart:function(){
            console.log('button touchstarted');
            this.$emit('touchstart');
        }
    }
};

var QiyiInput = {
    name:'QiyiInput',
    template:'<input @change="input_onchange" :value="input_value" class="111"></input>',
    data:function(){
        return {
            input_value : ''
        }
    },
    methods:{
        input_onchange:function(value){
            this.input_value = value;
            this.$emit('change',value);
        }
    }
};

var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup,
    View: View,
    ScrollView: ScrollView,
    Swiper: Swiper,
    SwiperItem: SwiperItem,
    Image: Image,
    Text: Text,
    Button: Button,
    QiyiInput: QiyiInput
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);
//extend(Vue.options,{mounted:[]})
//extend(Vue.options,{updated:[]})
//extend(Vue.options,{beforeUpdate:[]})

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (
    el,
    hydrating
) {
    el = el || undefined;
    return mountComponent(this, el, hydrating)
};


Vue$3.nextTick(QiyiBridge.bridgeDoMount);




//切入修改init方法
//Function.prototype.before = function(beforefn){
    //var __self=this;
    //return function(){
        //beforefn.apply(this,arguments);
        //return __self.apply(this,arguments);
    //}
//}
//Function.prototype.after = function(afterfn){
    //var __self=this;
    //return function(){
        //var ret=__self.apply(this,arguments);
        //afterfn.apply(this,arguments);
        //return ret;
    //}
//}

//修改Vue构造函数，使得自定义事件可以被插入数组
//Vue.prototype._init = Vue.prototype._init.before(function(options){
    //console.log('mount_init')
    //if(options && !options.mounted){
         //options.mounted = [];
    //}
//})
//自定义方法构造器
//function mergeHookMake (
    //customVal : ?Function | ?Array<Function>
//): ?Function {
    //return (
        //parentVal: ?Array<Function>,
        //childVal: ?Function | ?Array<Function>
    //)=>{
        //let coreVal = childVal
            //? parentVal
            //? parentVal.concat(childVal)
            //: Array.isArray(childVal)
                //? childVal
                //: [childVal]
                    //: parentVal
                    //coreVal.concat();
        //return coreVal.concat(customVal) || customVal;
    //}
//}
//自定义方法
//Vue.config.optionMergeStrategies['mounted'] = mergeHookMake(function(){
    //console.log('自定义mounted事件，现已加入callhook哈',this.$el)
    //console.log('diff数据更新完成，ready to doPatch');
    //QiyiBridge.bridgeDoMount();
//});
//

/*  */

function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
    var warn = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, 'class');
    if (false) {
        var expression = parseText(staticClass, options.delimiters);
        if (expression) {
            warn(
                "class=\"" + staticClass + "\": " +
                    'Interpolation inside attributes has been removed. ' +
                        'Use v-bind or the colon shorthand instead. For example, ' +
                            'instead of <div class="{{ val }}">, use <div :class="val">.'
            );
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass);
    }
    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
        el.classBinding = classBinding;
    }
}

function genData (el) {
    var data = '';
    if (el.staticClass) {
        data += "staticClass:" + (el.staticClass) + ",";
    }
    if (el.classBinding) {
        data += "class:" + (el.classBinding) + ",";
    }
    return data
}

var klass$1 = {
    staticKeys: ['staticClass'],
    transformNode: transformNode,
    genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var baseOptions = {
    expectHTML: true,
    modules: modules$1,
    directives: directives$1,
    isPreTag: isPreTag,
    isUnaryTag: isUnaryTag,
    mustUseProp: mustUseProp,
    canBeLeftOpenTag: canBeLeftOpenTag,
    isReservedTag: isReservedTag,
    getTagNamespace: getTagNamespace,
    staticKeys: genStaticKeys(modules$1)
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
      return html;
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
    template,
    options
) {
    warn$2 = options.warn || baseWarn;

    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;

    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

    delimiters = options.delimiters;

    var stack = [];
    var preserveWhitespace = options.preserveWhitespace !== false;
    var root;
    var currentParent;
    var inVPre = false;
    var inPre = false;
    var warned = false;

    function endPre (element) {
        // check pre state
        if (element.pre) {
            inVPre = false;
        }
        if (platformIsPreTag(element.tag)) {
            inPre = false;
        }
    }

    parseHTML(template, {
        warn: warn$2,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        start: function start (tag, attrs, unary) {
            // check namespace.
            // inherit parent ns if there is one
            var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

            // handle IE svg bug
            /* istanbul ignore if */
            if (isIE && ns === 'svg') {
                attrs = guardIESVGBug(attrs);
            }

            var element = {
                type: 1,
                tag: tag,
                attrsList: attrs,
                attrsMap: makeAttrsMap(attrs),
                parent: currentParent,
                children: []
            };
            if (ns) {
                element.ns = ns;
            }

            if (isForbiddenTag(element) && !isServerRendering()) {
                element.forbidden = true;
                "production" !== 'production' && warn$2(
                    'Templates should only be responsible for mapping the state to the ' +
                        'UI. Avoid placing tags with side-effects in your templates, such as ' +
                            "<" + tag + ">" + ', as they will not be parsed.'
                );
            }

            // apply pre-transforms
            for (var i = 0; i < preTransforms.length; i++) {
                preTransforms[i](element, options);
            }

            if (!inVPre) {
                processPre(element);
                if (element.pre) {
                    inVPre = true;
                }
            }
            if (platformIsPreTag(element.tag)) {
                inPre = true;
            }
            if (inVPre) {
                processRawAttrs(element);
            } else {
                processFor(element);
                processIf(element);
                processOnce(element);
                processKey(element);

                // determine whether this is a plain element after
                // removing structural attributes
                element.plain = !element.key && !attrs.length;

                processRef(element);
                processSlot(element);
                processComponent(element);
                for (var i$1 = 0; i$1 < transforms.length; i$1++) {
                    transforms[i$1](element, options);
                }
                processAttrs(element);
            }

            function checkRootConstraints (el) {

            }

            // tree management
            if (!root) {
                root = element;
                checkRootConstraints(root);
            } else if (!stack.length) {
                // allow root elements with v-if, v-else-if and v-else
                if (root.if && (element.elseif || element.else)) {
                    checkRootConstraints(element);
                    addIfCondition(root, {
                        exp: element.elseif,
                        block: element
                    });
                } else {}
            }
            if (currentParent && !element.forbidden) {
                if (element.elseif || element.else) {
                    processIfConditions(element, currentParent);
                } else if (element.slotScope) { // scoped slot
                    currentParent.plain = false;
                    var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
                } else {
                    currentParent.children.push(element);
                    element.parent = currentParent;
                }
            }
            if (!unary) {
                currentParent = element;
                stack.push(element);
            } else {
                endPre(element);
            }
            // apply post-transforms
            for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
                postTransforms[i$2](element, options);
            }
        },

        end: function end () {
            // remove trailing whitespace
            var element = stack[stack.length - 1];
            var lastNode = element.children[element.children.length - 1];
            if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
                element.children.pop();
            }
            // pop stack
            stack.length -= 1;
            currentParent = stack[stack.length - 1];
            endPre(element);
        },

        chars: function chars (text) {
            if (!currentParent) {
                return
            }
            // IE textarea placeholder bug
            /* istanbul ignore if */
            if (isIE &&
                currentParent.tag === 'textarea' &&
                currentParent.attrsMap.placeholder === text
               ) {
                   return
               }
               var children = currentParent.children;
               text = inPre || text.trim()
                   ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
                   // only preserve whitespace if its not right after a starting tag
                       : preserveWhitespace && children.length ? ' ' : '';
                       if (text) {
                           var expression;
                           if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
                               children.push({
                                   type: 2,
                                   expression: expression,
                                   text: text
                               });
                           } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
                               children.push({
                                   type: 3,
                                   text: text
                               });
                           }
                       }
        }
    });
    return root
}

function processPre (el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
        el.pre = true;
    }
}

function processRawAttrs (el) {
    var l = el.attrsList.length;
    if (l) {
        var attrs = el.attrs = new Array(l);
        for (var i = 0; i < l; i++) {
            attrs[i] = {
                name: el.attrsList[i].name,
                value: JSON.stringify(el.attrsList[i].value)
            };
        }
    } else if (!el.pre) {
        // non root node in pre blocks with no attributes
        el.plain = true;
    }
}

function processKey (el) {
    var exp = getBindingAttr(el, 'key');
    if (exp) {
        if (false) {
            warn$2("<template> cannot be keyed. Place the key on real elements instead.");
        }
        el.key = exp;
    }
}

function processRef (el) {
    var ref = getBindingAttr(el, 'ref');
    if (ref) {
        el.ref = ref;
        el.refInFor = checkInFor(el);
    }
}

function processFor (el) {
    var exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        var inMatch = exp.match(forAliasRE);
        if (!inMatch) {
            "production" !== 'production' && warn$2(
                ("Invalid v-for expression: " + exp)
            );
            return
        }
        el.for = inMatch[2].trim();
            var alias = inMatch[1].trim();
        var iteratorMatch = alias.match(forIteratorRE);
        if (iteratorMatch) {
            el.alias = iteratorMatch[1].trim();
            el.iterator1 = iteratorMatch[2].trim();
            if (iteratorMatch[3]) {
                el.iterator2 = iteratorMatch[3].trim();
            }
        } else {
            el.alias = alias;
        }
    }
}

function processIf (el) {
    var exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
        el.if = exp;
            addIfCondition(el, {
                exp: exp,
                block: el
            });
    } else {
        if (getAndRemoveAttr(el, 'v-else') != null) {
            el.else = true;
        }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
        el.elseif = elseif;
    }
    }
}

function processIfConditions (el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        });
    } else {}
}

function findPrevElement (children) {
    var i = children.length;
    while (i--) {
        if (children[i].type === 1) {
            return children[i]
        } else {
            if (false) {
                warn$2(
                    "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
                        "will be ignored."
                );
            }
            children.pop();
        }
    }
}

function addIfCondition (el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}

function processOnce (el) {
    var once$$1 = getAndRemoveAttr(el, 'v-once');
    if (once$$1 != null) {
        el.once = true;
    }
}

function processSlot (el) {
    if (el.tag === 'slot') {
        el.slotName = getBindingAttr(el, 'name');
        if (false) {
            warn$2(
                "`key` does not work on <slot> because slots are abstract outlets " +
                    "and can possibly expand into multiple elements. " +
                        "Use the key on a wrapping element instead."
            );
        }
    } else {
        var slotTarget = getBindingAttr(el, 'slot');
        if (slotTarget) {
            el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
        }
        if (el.tag === 'template') {
            el.slotScope = getAndRemoveAttr(el, 'scope');
        }
    }
}

function processComponent (el) {
    var binding;
    if ((binding = getBindingAttr(el, 'is'))) {
        el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
        el.inlineTemplate = true;
    }
}

function processAttrs (el) {
    var list = el.attrsList;
    var i, l, name, rawName, value, modifiers, isProp;
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (dirRE.test(name)) {
            // mark element as dynamic
            el.hasBindings = true;
            // modifiers
            modifiers = parseModifiers(name);
            if (modifiers) {
                name = name.replace(modifierRE, '');
            }
            if (bindRE.test(name)) { // v-bind
                name = name.replace(bindRE, '');
                value = parseFilters(value);
                isProp = false;
                if (modifiers) {
                    if (modifiers.prop) {
                        isProp = true;
                        name = camelize(name);
                        if (name === 'innerHtml') { name = 'innerHTML'; }
                    }
                if (modifiers.camel) {
                    name = camelize(name);
                }
                if (modifiers.sync) {
                    addHandler(
                        el,
                        ("update:" + (camelize(name))),
                        genAssignmentCode(value, "$event")
                    );
                }
                }
                if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                    addProp(el, name, value);
                } else {
                    addAttr(el, name, value);
                }
            } else if (onRE.test(name)) { // v-on
                name = name.replace(onRE, '');
                addHandler(el, name, value, modifiers, false, warn$2);
            } else { // normal directives
                name = name.replace(dirRE, '');
                // parse arg
                var argMatch = name.match(argRE);
                var arg = argMatch && argMatch[1];
                if (arg) {
                    name = name.slice(0, -(arg.length + 1));
                }
                addDirective(el, name, rawName, value, arg, modifiers);
                if (false) {
                    checkForAliasModel(el, value);
                }
            }
        } else {
            // literal attribute
            addAttr(el, name, JSON.stringify(value));
        }
    }
}

function checkInFor (el) {
    var parent = el;
    while (parent) {
        if (parent.for !== undefined) {
            return true
        }
        parent = parent.parent;
    }
    return false
}

function parseModifiers (name) {
    var match = name.match(modifierRE);
    if (match) {
        var ret = {};
        match.forEach(function (m) { ret[m.slice(1)] = true; });
        return ret
    }
}

function makeAttrsMap (attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
        if (
            false
        ) {
            warn$2('duplicate attribute: ' + attrs[i].name);
        }
        map[attrs[i].name] = attrs[i].value;
    }
    return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
    return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
    return (
        el.tag === 'style' ||
            (el.tag === 'script' && (
                !el.attrsMap.type ||
                    el.attrsMap.type === 'text/javascript'
            ))
    )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
    var res = [];
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (!ieNSBug.test(attr.name)) {
            attr.name = attr.name.replace(ieNSPrefix, '');
            res.push(attr);
        }
    }
    return res
}

function checkForAliasModel (el, value) {
    var _el = el;
    while (_el) {
        if (_el.for && _el.alias === value) {
            warn$2(
                "<" + (el.tag) + " v-model=\"" + value + "\">: " +
                    "You are binding v-model directly to a v-for iteration alias. " +
                        "This will not be able to modify the v-for source array because " +
                            "writing to the alias is like modifying a function local variable. " +
                                "Consider using an array of objects and use v-model on an object property instead."
            );
        }
        _el = _el.parent;
    }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (false
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el, state) || 'void 0'
      : genElement(el, state)) + "}}"
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

var createCompiler = createCompilerCreator(function baseCompile (
    template,
    options
) {
    var ast = parse(template.trim(), options);
    optimize(ast, options);
    var code = generate(ast, options);
    return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */
typeof global === 'undefined' && (window.QiyiBridge = QiyiBridge);
typeof global !== 'undefined' && (global.QiyiBridge = QiyiBridge);

var idToTemplate = cached(function (id) {
    var el = query(id);
    return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
    el,
    hydrating
) {
    el = el && query(el);

    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
        var template = options.template;
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template);
                    /* istanbul ignore if */
                    if (false) {
                        warn(
                            ("Template element not found or is empty: " + (options.template)),
                            this
                        );
                    }
                }
            } else if (template.nodeType) {
                template = template.innerHTML;
            } else {
                return this
            }
        } else if (el) {
            template = getOuterHTML(el);
        }
        if (template) {
            /* istanbul ignore if */
            if (false) {
                mark('compile');
            }

            var ref = compileToFunctions(template, {
                shouldDecodeNewlines: shouldDecodeNewlines,
                delimiters: options.delimiters
            }, this);
            var render = ref.render;
            var staticRenderFns = ref.staticRenderFns;
            options.render = render;
            options.staticRenderFns = staticRenderFns;

            /* istanbul ignore if */
            if (false) {
                mark('compile end');
                measure(((this._name) + " compile"), 'compile', 'compile end');
            }
        }
    }
    return mount.call(this, el, hydrating)
};


/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML
    }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(38)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(37),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['imgSrc'],
    mounted: function mounted() {
        console.log('bannerImg mounted', this);
    },
    updated: function updated() {
        console.log('bannerImg updated', this.imgSrc);
    },
    beforeCreate: function beforeCreate() {
        console.log('bannerImg beforeCreatea', this);
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel_list_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__channel_list_vue__);
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['data'],
    components: {
        channel_list: __WEBPACK_IMPORTED_MODULE_0__channel_list_vue___default.a
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['cellData', 'is_channel_new_title'],
    computed: {
        style: function style() {
            return this.is_channel_new_title ? { width: '50%', paddingTop: '21%' } : { width: '33.3%', paddingTop: '50%' };
        },
        tag: function tag() {
            return this.cellData.isExclusive ? '独家' : '';
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel_cell_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel_cell_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__channel_cell_vue__);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['listTitle', 'listData', 'channel_new_title'],
    components: {
        channel_cell: __WEBPACK_IMPORTED_MODULE_0__channel_cell_vue___default.a
    },
    mounted: function mounted() {
        console.log(this);
    },
    computed: {
        is_channel_new_title: function is_channel_new_title() {
            return this.channel_new_title.hasOwnProperty(this.listTitle);
        }
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        search_click: function search_click() {
            this.$emit('search_show_or_hide');
        }
    }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mock_index_json__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mock_index_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mock_index_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__header_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bannerImg_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bannerImg_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__bannerImg_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__swiperImg_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__swiperImg_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__swiperImg_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_index_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__search_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__channel_channel_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__channel_channel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__channel_channel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_qiyiApi__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'index',
    data: function data() {
        return {
            bannerIndex: 0,
            searchShow: false,
            data: __WEBPACK_IMPORTED_MODULE_0__mock_index_json___default.a.data
        };
    },
    components: {
        'bannerImg': __WEBPACK_IMPORTED_MODULE_2__bannerImg_vue___default.a,
        'swiperImg': __WEBPACK_IMPORTED_MODULE_3__swiperImg_vue___default.a,
        'header': __WEBPACK_IMPORTED_MODULE_1__header_vue___default.a,
        'search': __WEBPACK_IMPORTED_MODULE_4__search_index_vue___default.a,
        'channel': __WEBPACK_IMPORTED_MODULE_5__channel_channel_vue___default.a
    },
    methods: {
        "swiper_touchend": function swiper_touchend(index) {
            console.log('parent touchend');
            this.bannerIndex = index;
        },
        "search_show_or_hide": function search_show_or_hide() {
            console.log('search_show true');
            this.searchShow = !this.searchShow;
        }
    },
    mounted: function mounted() {
        console.log('ready to request');
        //qiyiApi.request('https://pub.m.iqiyi.com/h5/mina/index/',{},(result)=>{
        //console.log('fetch finish')
        //this.data = result.data;
        //})
    },
    updated: function updated() {
        console.log('updated');
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        search_hide: function search_hide() {
            this.$emit('search_show_or_hide');
        }
    }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__header_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_history_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_history_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__search_history_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_hot_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_hot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__search_hot_vue__);
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['search_show'],
    computed: {
        search_display: function search_display() {
            return this.search_show ? 'block' : 'none';
        }
    },
    components: {
        header: __WEBPACK_IMPORTED_MODULE_0__header_vue___default.a,
        search_history: __WEBPACK_IMPORTED_MODULE_1__search_history_vue___default.a,
        search_hot: __WEBPACK_IMPORTED_MODULE_2__search_hot_vue___default.a
    },
    mounted: function mounted() {
        console.log('search init', this);
    },
    updated: function updated(vnode) {
        console.log(vnode, this);
    },
    methods: {
        search_show_or_hide: function search_show_or_hide() {
            this.$emit('search_show_or_hide');
        }
    }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        clear_history: function clear_history() {
            this.search_history = [];
        }
    },
    data: function data() {
        return {
            search_history: ['我们的少年时代', '我的前半生', '楚乔传']
        };
    },
    updated: function updated() {
        console.log('updated', this);
    }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            hot_list: [1, 2, 3, 4, 5, 6]
        };
    }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['data'],
    updated: function updated() {
        console.log('swiperImg updated');
    },
    methods: {
        "swiper_end": function swiper_end(index) {
            console.log('swiper touchend ' + index, this);
            this.$emit('swiper_touchend', index);
        }
    }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QiyiMP_vue_dist_vue_esm_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qiyi_qiyi_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_index_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_index_vue__);





//window.qiyi = qiyi;
//
//console.log = function () {};
var i = 0;
var app = new __WEBPACK_IMPORTED_MODULE_0__QiyiMP_vue_dist_vue_esm_js__["a" /* default */]({
    template: '<View><index></index></View>',
    components: {
        'index': __WEBPACK_IMPORTED_MODULE_2__index_index_vue___default.a
    }
});
app.$mount(app);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
	"code": "A00000",
	"data": {
		"dianshiju": [
			{
				"qipuId": 204938601,
				"albumId": 204938601,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "热血冒险探秘巨制",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/db3310ee87a048cb9ff8f2b6f88ed3a1.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr80lv9c.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 1,
				"period": "20170703",
				"sets": "",
				"follow": 10,
				"tvid": 714622700,
				"vid": "2eb716bce12d2f962f198b4a66f147a0",
				"issueTime": "2016-10-17 15:49",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至10集",
				"score": "",
				"count": "",
				"mainTitle": "鬼吹灯之牧野诡事",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "王大陆,金晨,王栎鑫,张博宇,张鑫,李世鹏,虎虎,曾梦雪,许奕,刘羽琦",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周一、二20点各更新1集；VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 203965201,
				"albumId": 203965201,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "乱世少女厮杀成长传奇",
				"imageUrl": "http://m.qiyipic.com/image/20170715/13/1c/a_100024820_m_601_m6_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr700mq0.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170605",
				"sets": "",
				"follow": 65,
				"tvid": 692992100,
				"vid": "a4ed205fddd518521e39c3066e6f3c71",
				"issueTime": "2016-05-03 11:50",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至65集",
				"score": "",
				"count": "",
				"mainTitle": "楚乔传",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "赵丽颖,林更新,窦骁,李沁,邓伦,王彦霖,牛骏峰,黄梦莹,金士杰,田小洁,孙宁,金瀚,朱圣祎,李若嘉,邢昭林",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周日至周二24:00 更新一集",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 206302301,
				"albumId": 206302301,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "津门天团水下探奇案",
				"imageUrl": "http://pic4.qiyipic.com/image/20170718/84/10/a_100048036_m_601_m1_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7hix8s.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170719",
				"sets": "",
				"follow": 8,
				"tvid": 728855200,
				"vid": "e855550c60037a60e40b0361ef991dc1",
				"issueTime": "2017-03-29 09:42",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至8集",
				"score": "",
				"count": "",
				"mainTitle": "河神",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "李现,张铭恩,王紫璇CiCi,陈芋米,苇青,唐以诺,杨曙铭,陈剑,梁国荣,郭九龙",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周三、四20点免费更新2集；VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 208370401,
				"albumId": 208370401,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "培育指挥型军官的故事",
				"imageUrl": "http://m.qiyipic.com/image/20170728/d6/2f/a_100058971_m_601_m2_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8fsiic.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170727",
				"sets": "",
				"follow": 7,
				"tvid": 740240600,
				"vid": "0500706522b4828892510f8dd1378dc3",
				"issueTime": "2017-07-27 15:07",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至7集",
				"score": "",
				"count": "",
				"mainTitle": "深海利剑",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "王强,高旻睿,刘璐,王阳,徐洋,金禹伯,周放,王佳宇,韩宇辰,袁布,张家鼎",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周日至周五24点2集;周六24点1集",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 205400701,
				"albumId": 205400701,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "刘诗诗陈伟霆古装权谋",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170721/cb5d166f3dfd4d0e9ac98fa3b0938555.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7lg1b0.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170713",
				"sets": "",
				"follow": 12,
				"tvid": 722857200,
				"vid": "170875134b4d9708c2c3963601f07bcb",
				"issueTime": "2017-07-14 17:34",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至12集",
				"score": "",
				"count": "",
				"mainTitle": "醉玲珑",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "刘诗诗,陈伟霆,徐海乔,韩雪,黄梦莹,刘奕君,韩栋,曾黎,李呈媛,高一清",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周四周五24:00 两集连播",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 205028701,
				"albumId": 205028701,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "TFBOYS演绎少年时代",
				"imageUrl": "http://pic1.qiyipic.com/image/20170715/94/71/a_100035411_m_601_m4_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7xr25c.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170709",
				"sets": "",
				"follow": 37,
				"tvid": 720279500,
				"vid": "70040199fa2cf6345cd506e5a07f14ff",
				"issueTime": "2016-10-28 17:31",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至37集",
				"score": "",
				"count": "",
				"mainTitle": "我们的少年时代",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "王俊凯,王源,易烊千玺,薛之谦,李小璐,唐禹哲,李菲儿,都金翰,程砚秋,张子枫",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周日至周四24点2集;周五,六1集",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			}
		],
		"zongyi": [
			{
				"qipuId": 734901300,
				"albumId": 206548001,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "吴亦凡公演炸屏来袭",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170729/739bd8010fc64de1803d1098223b398a.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7ow1g8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 1,
				"period": "20170729",
				"sets": "",
				"follow": "",
				"tvid": 734901300,
				"vid": "e029272d42b4253192d965c396694ca8",
				"issueTime": "2017-07-29 19:37",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-29期",
				"score": "",
				"count": "",
				"mainTitle": "吴亦凡潘玮柏公演震撼升级",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "中国有嘻哈",
				"updateStrategy": "每周六晚20:00",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 742611000,
				"albumId": 205994601,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "林更新直播尬聊狂掉粉",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/0206daaecdce4b9ca106ff668d55f277.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8dg5zo.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170730",
				"sets": "",
				"follow": "",
				"tvid": 742611000,
				"vid": "15a052c507df573feab31faaaf97b22b",
				"issueTime": "2017-07-30 23:37",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-30期",
				"score": "",
				"count": "",
				"mainTitle": "第4期 林更新直播唱歌秒掉粉",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "极限挑战第3季",
				"updateStrategy": "",
				"hosts": "黄渤,孙红雷,黄磊,王迅,罗志祥,张艺兴",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 741508200,
				"albumId": 207600401,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "杰伦忆学生时代谈撩妹",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/56ffd13a9a3e4d5191827c84a0977956.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8e4xz8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170728",
				"sets": "",
				"follow": "",
				"tvid": 741508200,
				"vid": "daf443345cce7cbb401f68f93b7e7ed5",
				"issueTime": "2017-07-28 23:05",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-28期",
				"score": "",
				"count": "",
				"mainTitle": "第3期 周杰伦自曝撩妹套路",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "中国新歌声第2季",
				"updateStrategy": "每周五晚",
				"hosts": "华少",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 739971300,
				"albumId": 204671601,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "张小乙夜宿范府吓尿裤",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170730/e83848bbcf284cfa93f690b496ec7c11.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8fn4w8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170730",
				"sets": "",
				"follow": "",
				"tvid": 739971300,
				"vid": "0603e31f31f5e04377c4c363464cbdcd",
				"issueTime": "2017-07-30 07:57",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-30期",
				"score": "",
				"count": "",
				"mainTitle": "张小乙下南京（十八）枕头师哥",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "坑王驾到",
				"updateStrategy": "",
				"hosts": "郭德纲",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 742237700,
				"albumId": 205994201,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "海涛\"尝粪\"吓呆麦迪娜",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170729/abf9563f8a1c450fa5315ae056c18061.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8eheg8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170729",
				"sets": "",
				"follow": "",
				"tvid": 742237700,
				"vid": "dc12738041359ccd771b631c003faa17",
				"issueTime": "2017-07-29 23:19",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-29期",
				"score": "",
				"count": "",
				"mainTitle": "海涛非洲式刷牙洗脑全队",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "我们的征途",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 741461600,
				"albumId": 206638201,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "谢依霖发飙拒提昆凌",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170729/2cd3a1afc976454593e27cdac750fff5.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8e0eto.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170729",
				"sets": "",
				"follow": "",
				"tvid": 741461600,
				"vid": "a11e0850e689324e90870b0b85d0b2a9",
				"issueTime": "2017-07-29 11:30",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-29期",
				"score": "",
				"count": "",
				"mainTitle": "第4期：谢依霖曝周董写歌真相",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "了不起的孩子第2季",
				"updateStrategy": "每周六12:00",
				"hosts": "孟非,谢依霖",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			}
		],
		"dongman": [
			{
				"qipuId": 202861101,
				"albumId": 202861101,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "草帽路飞的伟大冒险",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/b9b1d2f375ac46498ceabacf83c31e47.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rrok4nt0.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "19991020",
				"sets": "",
				"follow": 799,
				"tvid": 385274600,
				"vid": "e59fa071d268247291f7737c72ea37f8",
				"issueTime": "2017-02-15 10:32",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至799集",
				"score": "",
				"count": "",
				"mainTitle": "航海王",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "每周日中午12点更新1集，VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 208266401,
				"albumId": 208266401,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "友情！努力！洁癖？",
				"imageUrl": "http://m.qiyipic.com/image/20170630/2a/09/a_100058459_m_601_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr815huo.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170703",
				"sets": "",
				"follow": 5,
				"tvid": 713457100,
				"vid": "ce0a3a5f979be3f3bb7c81f2888aff4d",
				"issueTime": "2017-06-30 12:37",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至5集",
				"score": "",
				"count": "",
				"mainTitle": "洁癖男子！青山君",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "每周一00:00更新1集，VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 208265801,
				"albumId": 208265801,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "十九世纪少女特工物语",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/e8dd9492156743c186e617291f8c6ad4.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7xai2k.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170709",
				"sets": "",
				"follow": 4,
				"tvid": 719667600,
				"vid": "2aed225bc248f0d8b883b41cd7b99939",
				"issueTime": "2017-06-30 12:36",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至4集",
				"score": "",
				"count": "",
				"mainTitle": "Princess Principal",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "每周日22:30更新1集，VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 202783001,
				"albumId": 202783001,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "新的敌人即将来袭",
				"imageUrl": "http://m.qiyipic.com/image/20170205/76/18/a_100013208_m_601_m8_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rroopiy0.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20150705",
				"sets": "",
				"follow": 101,
				"tvid": 378303300,
				"vid": "cc50681ecce45fed9edc17aeb304aa8e",
				"issueTime": "2016-12-19 16:34",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至101集",
				"score": "",
				"count": "",
				"mainTitle": "龙珠超",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 208262601,
				"albumId": 208262601,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "自我的证明！",
				"imageUrl": "http://m.qiyipic.com/image/20170630/d6/fc/a_100058440_m_601_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7ya6ew.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170701",
				"sets": "",
				"follow": 4,
				"tvid": 719121300,
				"vid": "2401b36fdd046cf89bca3ddbd10f27a4",
				"issueTime": "2017-06-30 09:22",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至4集",
				"score": "",
				"count": "",
				"mainTitle": "捷德奥特曼",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "每周六10:00更新一集，VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 206303001,
				"albumId": 206303001,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 4,
				"shortTitle": "",
				"desc": "",
				"focus": "夏安安闪耀归来",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170630/4d77e502e7e94d9ca0801ee883fa0365.gif",
				"pageUrl": "http://m.iqiyi.com/v_19rrbcxb7k.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 3,
				"period": "20170329",
				"sets": "",
				"follow": 34,
				"tvid": 646305900,
				"vid": "4d18e48a68e27a63ab534e10eaaa7949",
				"issueTime": "2017-03-29 11:54",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至34集",
				"score": "",
				"count": "",
				"mainTitle": "小花仙 第3季 守护天使",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			}
		],
		"hotQuery": "[\"龙珠超\",\"我们的少年时代\",\"我的前半生\",\"战狼\",\"封神榜\",\"极限挑战第3季\"]",
		"channel_order": [
			"zongyi",
			"dianshiju",
			"dongman",
			"dianying"
		],
		"focus": [
			{
				"qipuId": 742161700,
				"albumId": 206548001,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "《中国有嘻哈》吴亦凡《6》",
				"focus": "吴制作人公演炸裂",
				"imageUrl": "http://m.qiyipic.com/image/20170729/e5/78/v_112965705_m_601_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8ehw08.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170729",
				"sets": "",
				"follow": "",
				"tvid": 742161700,
				"vid": "284d39cb22efc0dc5834999b13324076",
				"issueTime": "2017-07-29 19:00",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-29期",
				"score": "",
				"count": "",
				"mainTitle": "吴亦凡《6》",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "http://m.qiyipic.com/common/lego/20170731/3c9677536f7e4c0eb43205a5ee4fc3f3.jpg",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "中国有嘻哈",
				"updateStrategy": "每周六晚20:00",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 206302301,
				"albumId": 206302301,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "津门天团水下探奇案",
				"imageUrl": "http://pic4.qiyipic.com/image/20170718/84/10/a_100048036_m_601_m1_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7hix8s.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170719",
				"sets": "",
				"follow": 8,
				"tvid": 728855200,
				"vid": "e855550c60037a60e40b0361ef991dc1",
				"issueTime": "2017-03-29 09:42",
				"playTime": "",
				"pubStr": "",
				"showContent": "更新至8集",
				"score": "",
				"count": "",
				"mainTitle": "河神",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "http://m.qiyipic.com/common/lego/20170720/5b84a00c3a4440049a326fb6d473f87b.jpg",
				"mainActors": "李现,张铭恩,王紫璇CiCi,陈芋米,苇青,唐以诺,杨曙铭,陈剑,梁国荣,郭九龙",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周三、四20点免费更新2集；VIP会员抢先看一周",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 205416101,
				"albumId": 205416101,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 2,
				"shortTitle": "",
				"desc": "",
				"focus": "靳东马伊琍半途相见",
				"imageUrl": "http://m.qiyipic.com/image/20170715/fc/08/a_100039200_m_601_m2_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr80hvpc.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 0,
				"period": "20170704",
				"sets": "",
				"follow": 42,
				"tvid": 714550700,
				"vid": "eafc86f360b47ef0b9f37fa15006d240",
				"issueTime": "2016-12-14 16:21",
				"playTime": "",
				"pubStr": "",
				"showContent": "42集全",
				"score": "",
				"count": "",
				"mainTitle": "我的前半生",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "http://m.qiyipic.com/common/lego/20170712/62b49afe4bc6457297ca91615cae7c85.jpg",
				"mainActors": "靳东,马伊琍,袁泉,雷佳音,吴越,陈道明,许娣,张龄心,栾元晖,侯岩松,郑罗茜,啜妮,是安",
				"directors": "",
				"showTime": "",
				"isSource": false,
				"sourceName": "",
				"updateStrategy": "周日至周五24点2集;周六24点1集",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 206548001,
				"albumId": 206548001,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "中国有嘻哈",
				"imageUrl": "http://m.qiyipic.com/image/20170623/82/48/a_100049869_m_601_m5_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7ow1g8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": true,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 1,
				"period": "20170624",
				"sets": "",
				"follow": 1,
				"tvid": 734901300,
				"vid": "e029272d42b4253192d965c396694ca8",
				"issueTime": "2017-04-20 09:05",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-29期",
				"score": "",
				"count": "",
				"mainTitle": "中国有嘻哈之吴亦凡潘玮柏公演战 选手获反选权",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "http://m.qiyipic.com/common/lego/20170623/ca33f6362be3444eb6beec1eda24007a.jpg",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "中国有嘻哈",
				"updateStrategy": "每周六晚20:00",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 207600401,
				"albumId": 207600401,
				"videoId": "",
				"resourceType": 0,
				"name": "",
				"cid": "",
				"channelId": 6,
				"shortTitle": "",
				"desc": "",
				"focus": "中国新歌声第2季",
				"imageUrl": "http://pic1.qiyipic.com/image/20170612/69/74/a_100055125_m_601_m2.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr8e4xz8.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": false,
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": "",
				"season": 2,
				"period": "20170714",
				"sets": "",
				"follow": 1,
				"tvid": 741508200,
				"vid": "daf443345cce7cbb401f68f93b7e7ed5",
				"issueTime": "2017-06-06 08:28",
				"playTime": "",
				"pubStr": "",
				"showContent": "07-28期",
				"score": "",
				"count": "",
				"mainTitle": "中国新歌声2之周董曝撩妹套路 E神现场再清唱",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "http://m.qiyipic.com/common/lego/20170717/d630ced407a74adc9cb8300a03e248ab.jpg",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": true,
				"sourceName": "中国新歌声第2季",
				"updateStrategy": "每周五晚",
				"hosts": "华少",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			}
		],
		"pingback": {
			"area": "h_rose",
			"event_id": "f412517e-53b2-4fa6-869c-3602ca90f144",
			"bkt": "h_rose_main"
		},
		"dianying": [
			{
				"qipuId": 728185500,
				"albumId": 728185500,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 1,
				"shortTitle": "",
				"desc": "",
				"focus": "娇柔师妹服药变僵尸",
				"imageUrl": "http://m.qiyipic.com/common/lego/20170731/b9c6561891104826961928b8acef4c8b.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7ie7zk.html",
				"isSiteOut": "",
				"isExclusive": true,
				"isQiyiProduced": "",
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170731",
				"sets": "",
				"follow": "",
				"tvid": 728185500,
				"vid": "40392de65c6174395da808a18157e48c",
				"issueTime": "2017-07-31 15:30",
				"playTime": "",
				"pubStr": "",
				"showContent": "6.2",
				"score": "",
				"count": "",
				"mainTitle": "生化药尸",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": "",
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 723851500,
				"albumId": 723851500,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 1,
				"shortTitle": "",
				"desc": "",
				"focus": "三个杨幂狠斗霍建华",
				"imageUrl": "http://pic7.qiyipic.com/common/20170728/180236-nishiyingjiu(1).gif",
				"pageUrl": "http://m.iqiyi.com/v_19rr7kthts.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": "",
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170629",
				"sets": "",
				"follow": "",
				"tvid": 723851500,
				"vid": "b9e57c254a58d3213263f78f476facf5",
				"issueTime": "2017-07-29 23:00",
				"playTime": "",
				"pubStr": "",
				"showContent": "8.0",
				"score": "",
				"count": "",
				"mainTitle": "逆时营救",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": "",
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 684283500,
				"albumId": 684283500,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 1,
				"shortTitle": "",
				"desc": "",
				"focus": "中国版速度与激情",
				"imageUrl": "http://m.qiyipic.com/image/20170729/96/1e/v_112379763_m_601_m2_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr7epxq8.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": "",
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170523",
				"sets": "",
				"follow": "",
				"tvid": 684283500,
				"vid": "8dfd8bc91dc26173670c3b84801495f1",
				"issueTime": "2017-07-29 15:30",
				"playTime": "",
				"pubStr": "",
				"showContent": "7.5",
				"score": "",
				"count": "",
				"mainTitle": "甩尾王",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": "",
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 688990700,
				"albumId": 688990700,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 1,
				"shortTitle": "",
				"desc": "",
				"focus": "黄渤段奕宏脑内追凶",
				"imageUrl": "http://m.qiyipic.com/image/20170724/eb/b5/v_112428330_m_601_m1_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rr71aw74.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": "",
				"isVip": true,
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20170428",
				"sets": "",
				"follow": "",
				"tvid": 688990700,
				"vid": "38d9a291fae617f5d0f6bdbbc3d18a51",
				"issueTime": "2017-07-24 15:30",
				"playTime": "",
				"pubStr": "",
				"showContent": "7.9",
				"score": "",
				"count": "",
				"mainTitle": "记忆大师",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": "",
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			},
			{
				"qipuId": 301272700,
				"albumId": 301272700,
				"videoId": "",
				"resourceType": "",
				"name": "",
				"cid": "",
				"channelId": 1,
				"shortTitle": "",
				"desc": "",
				"focus": "张震刘诗诗口碑爆棚",
				"imageUrl": "http://m.qiyipic.com/image/20160511/46/d3/v_108547605_m_601_m5_195_260.jpg",
				"pageUrl": "http://m.iqiyi.com/v_19rrmm2vbk.html",
				"isSiteOut": "",
				"isExclusive": false,
				"isQiyiProduced": "",
				"isVip": "",
				"isPaid": "",
				"isCoupon": "",
				"isPaidLive": "",
				"isLive": "",
				"isPaikeType": "",
				"isTheme": false,
				"target": "",
				"order": "",
				"pubTime": "",
				"isSeries": "",
				"isSd": false,
				"season": 0,
				"period": "20140807",
				"sets": "",
				"follow": "",
				"tvid": 301272700,
				"vid": "f71f19bed2bf5e80734b2016d7eb6114",
				"issueTime": "2015-06-15 15:53",
				"playTime": "",
				"pubStr": "",
				"showContent": "8.0",
				"score": "",
				"count": "",
				"mainTitle": "绣春刀",
				"subtitle": "",
				"sourceId": "",
				"videoCount": "",
				"bgimg": "",
				"mainActors": "",
				"directors": "",
				"showTime": "",
				"isSource": "",
				"sourceName": "",
				"updateStrategy": "",
				"hosts": "",
				"pubType": "",
				"isPreview": false,
				"isTrailer": false,
				"isFocusPic": ""
			}
		],
		"channel_new_title": {
			"zongyi": "综艺"
		},
		"tagSetSize": 6,
		"tags": [
			{
				"tagName": "爱奇艺出品",
				"tagSet": "iqiyi_tv",
				"order": 2,
				"themeId": "",
				"pageUrl": "",
				"sourceId": "",
				"showList": [
					{
						"qipuId": 728855200,
						"albumId": 206302301,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "津门天团水下探奇案",
						"imageUrl": "http://pic4.qiyipic.com/image/20170718/84/10/a_100048036_m_601_m1_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rr7hix8s.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20170719",
						"sets": "",
						"follow": "",
						"tvid": 728855200,
						"vid": "e855550c60037a60e40b0361ef991dc1",
						"issueTime": "2017-07-19 19:30",
						"playTime": "",
						"pubStr": "",
						"showContent": "更新至8集",
						"score": "",
						"count": 343873280,
						"mainTitle": "河神",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "周三、四20点免费更新2集；VIP会员抢先看一周",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 256372900,
						"albumId": 200809601,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "不羁男神恋上清纯校花",
						"imageUrl": "http://m.qiyipic.com/image/20170715/f0/00/a_100005950_m_601_m7_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrhj8vd4.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": "",
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20140718",
						"sets": "",
						"follow": "",
						"tvid": 256372900,
						"vid": "2704cf850a6415ab1853df32e383801c",
						"issueTime": "2014-12-30 19:21",
						"playTime": "",
						"pubStr": "",
						"showContent": "23集全",
						"score": "",
						"count": 395162527,
						"mainTitle": "白衣校花与大长腿",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 714622700,
						"albumId": 204938601,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "热血冒险探秘巨制",
						"imageUrl": "http://m.qiyipic.com/image/20170719/72/88/a_100034513_m_601_m7_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rr80lv9c.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 1,
						"period": "20170703",
						"sets": "",
						"follow": "",
						"tvid": 714622700,
						"vid": "2eb716bce12d2f962f198b4a66f147a0",
						"issueTime": "2017-07-03 19:36",
						"playTime": "",
						"pubStr": "",
						"showContent": "更新至10集",
						"score": "",
						"count": 844747780,
						"mainTitle": "鬼吹灯之牧野诡事",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "周一、二20点各更新1集；VIP会员抢先看一周",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 567592700,
						"albumId": 205087301,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "杨蓉白宇甜虐升级",
						"imageUrl": "http://m.qiyipic.com/image/20161110/10/0c/a_100035995_m_601_m3_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rr9bx0uo.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 2,
						"period": "20161113",
						"sets": "",
						"follow": "",
						"tvid": 567592700,
						"vid": "66491ef1ce10935446089d2c690b0a89",
						"issueTime": "2016-11-15 21:48",
						"playTime": "",
						"pubStr": "",
						"showContent": "12集全",
						"score": "",
						"count": 996317422,
						"mainTitle": "美人为馅2",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 385739800,
						"albumId": 202635601,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "全能高手花式戏校花",
						"imageUrl": "http://m.qiyipic.com/image/20170715/ab/ec/a_100011758_m_601_m10_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrokbgc4.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 1,
						"period": "20150810",
						"sets": "",
						"follow": "",
						"tvid": 385739800,
						"vid": "1916a3147787c78747ff8e6d4b141dba",
						"issueTime": "2015-08-28 10:39",
						"playTime": "",
						"pubStr": "",
						"showContent": "24集全",
						"score": "",
						"count": 1709022458,
						"mainTitle": "校花的贴身高手",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 399667700,
						"albumId": 202989601,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "卧底特警血战毒枭",
						"imageUrl": "http://m.qiyipic.com/image/20170715/ab/6f/a_100015251_m_601_m4_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrob7ixk.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": true,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20150929",
						"sets": "",
						"follow": "",
						"tvid": 399667700,
						"vid": "ca8842f6389442c9d7fcaa8c7cd36ca0",
						"issueTime": "2015-09-29 19:00",
						"playTime": "",
						"pubStr": "",
						"showContent": "12集全",
						"score": "",
						"count": 361456136,
						"mainTitle": "活着再见",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					}
				],
				"reasonList": "",
				"updateSize": ""
			},
			{
				"tagName": "网络剧精选",
				"tagSet": "networkmovie_tv",
				"order": 3,
				"themeId": "",
				"pageUrl": "",
				"sourceId": "",
				"showList": [
					{
						"qipuId": 721901300,
						"albumId": 208591001,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "守土安疆 匹夫有责",
						"imageUrl": "http://m.qiyipic.com/image/20170724/1b/31/a_100060074_m_601_m2_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rr7m4tqw.html",
						"isSiteOut": "",
						"isExclusive": false,
						"isQiyiProduced": false,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20121205",
						"sets": "",
						"follow": "",
						"tvid": 721901300,
						"vid": "82f94187193ee5fd392b3124bdc9aa3d",
						"issueTime": "2017-07-19 11:30",
						"playTime": "",
						"pubStr": "",
						"showContent": "48集全",
						"score": "",
						"count": 32391243,
						"mainTitle": "南少林荡倭英豪",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 637779400,
						"albumId": 206188401,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "樊野演绎不老禁欲男神",
						"imageUrl": "http://m.qiyipic.com/image/20170421/54/ca/a_100046902_m_601_m2_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrb7uuuc.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": false,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20170321",
						"sets": "",
						"follow": "",
						"tvid": 637779400,
						"vid": "b554ca6a4d0a5b2d1973e464fadcd4fe",
						"issueTime": "2017-04-06 12:00",
						"playTime": "",
						"pubStr": "",
						"showContent": "10集全",
						"score": "",
						"count": 43771912,
						"mainTitle": "异能录之齐鸣诡案",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 657965000,
						"albumId": 206531601,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "寻找火焰后的真相",
						"imageUrl": "http://m.qiyipic.com/image/20170508/ba/db/a_100049787_m_601_m1_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rraw5g2s.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": false,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 3,
						"period": "20170419",
						"sets": "",
						"follow": "",
						"tvid": 657965000,
						"vid": "a8601c7370ef484c2035302a02eabcf2",
						"issueTime": "2017-05-10 12:00",
						"playTime": "",
						"pubStr": "",
						"showContent": "12集全",
						"score": "",
						"count": 13488463,
						"mainTitle": "穿梭恋人第3季",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 647088200,
						"albumId": 206366201,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "马可、许媛媛相爱相杀",
						"imageUrl": "http://m.qiyipic.com/image/20170421/6e/2d/a_100048676_m_601_m2_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrbc54pw.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": false,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 1,
						"period": "20170406",
						"sets": "",
						"follow": "",
						"tvid": 647088200,
						"vid": "ebb95f2fe5e7d91680cf86bac13f652b",
						"issueTime": "2017-04-17 12:00",
						"playTime": "",
						"pubStr": "",
						"showContent": "12集全",
						"score": "",
						"count": 82836304,
						"mainTitle": "霸道总裁的野蛮女友",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "4月17日起每周一12:00更新1集",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 690400400,
						"albumId": 207489801,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "余罪下的暗黑者",
						"imageUrl": "http://m.qiyipic.com/image/20170620/0d/ee/a_100054572_m_601_m5_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rr70yxvg.html",
						"isSiteOut": "",
						"isExclusive": true,
						"isQiyiProduced": false,
						"isVip": true,
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 0,
						"period": "20170601",
						"sets": "",
						"follow": "",
						"tvid": 690400400,
						"vid": "3a0ea93c7d354b08482f6ad370a772e1",
						"issueTime": "2017-06-20 11:30",
						"playTime": "",
						"pubStr": "",
						"showContent": "28集全",
						"score": "",
						"count": 84609472,
						"mainTitle": "刑警战记",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "2017年6月20日起每周五中午12:00转免2集",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					},
					{
						"qipuId": 433766700,
						"albumId": 203382401,
						"videoId": "",
						"resourceType": "",
						"name": "",
						"cid": "",
						"channelId": 2,
						"shortTitle": "",
						"desc": "",
						"focus": "史上最颠覆的爱情公寓",
						"imageUrl": "http://m.qiyipic.com/image/20170715/5d/ef/a_100019138_m_601_m1_195_260.jpg",
						"pageUrl": "http://m.iqiyi.com/v_19rrkfp8hs.html",
						"isSiteOut": "",
						"isExclusive": false,
						"isQiyiProduced": false,
						"isVip": "",
						"isPaid": "",
						"isCoupon": "",
						"isPaidLive": "",
						"isLive": "",
						"isPaikeType": "",
						"isTheme": false,
						"target": "",
						"order": "",
						"pubTime": "",
						"isSeries": "",
						"isSd": true,
						"season": 2,
						"period": "20151224",
						"sets": "",
						"follow": "",
						"tvid": 433766700,
						"vid": "c5bdbce2eaf7f03fc9e8e7cbc452d487",
						"issueTime": "2015-12-24 22:00",
						"playTime": "",
						"pubStr": "",
						"showContent": "4集全",
						"score": "",
						"count": 430028321,
						"mainTitle": "爱情公寓番外篇第二季",
						"subtitle": "",
						"sourceId": "",
						"videoCount": "",
						"bgimg": "",
						"mainActors": "",
						"directors": "",
						"showTime": "",
						"isSource": false,
						"sourceName": "",
						"updateStrategy": "",
						"hosts": "",
						"pubType": "",
						"isPreview": false,
						"isTrailer": false,
						"isFocusPic": ""
					}
				],
				"reasonList": "",
				"updateSize": ""
			}
		]
	},
	"timestamp": "20170731172559"
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(27),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(32),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(33),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(30),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(29),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(28),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(31),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(34),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(35),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(36),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Image', {
    staticClass: "img_src",
    attrs: {
      "src": _vm.imgSrc
    }
  })
},staticRenderFns: []}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', {
    staticStyle: {
      "padding": "10px 80px 10px 10px",
      "position": "relative",
      "border-bottom": "1px solid #e7e7e7"
    }
  }, [_c('Input', {
    staticStyle: {
      "width": "100%",
      "height": "30px"
    },
    attrs: {
      "placeholder": "我的前半生"
    }
  }), _vm._v(" "), _c('Button', {
    staticStyle: {
      "position": "absolute",
      "right": "10px",
      "top": "10px",
      "width": "70px",
      "height": "30px",
      "line-height": "30px",
      "text-align": "center"
    },
    on: {
      "click": _vm.search_hide
    }
  }, [_vm._v("取消")])], 1)
},staticRenderFns: []}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('Image', {
    staticStyle: {
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "width": "80px",
      "height": "30px"
    },
    attrs: {
      "src": "http://www.qiyipic.com/common/fix/h5-v3/iqiyi-logo.png"
    }
  }), _vm._v(" "), _c('Button', {
    staticStyle: {
      "position": "absolute",
      "right": "10px",
      "top": "10px",
      "height": "30px",
      "line-height": "30px",
      "color": "#fff"
    },
    on: {
      "click": _vm.search_click
    }
  }, [_vm._v("搜索")])], 1)
},staticRenderFns: []}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', [_c('Text', {
    staticStyle: {
      "display": "block",
      "height": "50px",
      "line-height": "50px",
      "fonr-size": "15px",
      "font-weight": "600",
      "padding-left": "10px"
    }
  }, [_vm._v(_vm._s(_vm.listTitle))]), _vm._v(" "), _vm._l((_vm.listData), function(item) {
    return _c('channel_cell', {
      attrs: {
        "cellData": item,
        "is_channel_new_title": _vm.is_channel_new_title
      }
    })
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', {
    staticStyle: {
      "position": "absolute",
      "left": "0",
      "top": "0",
      "width": "100%",
      "height": "100%",
      "background": "#fff",
      "z-index": "2"
    },
    style: ({
      display: _vm.search_display
    })
  }, [_c('header', {
    on: {
      "search_show_or_hide": _vm.search_show_or_hide
    }
  }), _vm._v(" "), _c('search_history'), _vm._v(" "), _c('search_hot')], 1)
},staticRenderFns: []}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', _vm._l((_vm.data.channel_order), function(item) {
    return _c('channel_list', {
      attrs: {
        "listTitle": item,
        "listData": _vm.data[item],
        "channel_new_title": _vm.data.channel_new_title
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', {
    staticStyle: {
      "padding-top": "50%",
      "display": "inline-block",
      "position": "relative"
    },
    style: (_vm.style)
  }, [_c('Image', {
    staticStyle: {
      "position": "absolute",
      "left": "0",
      "top": "0",
      "right": "0",
      "bottom": "0",
      "max-width": "100%",
      "max-height": "100%"
    },
    attrs: {
      "src": _vm.cellData.imageUrl
    }
  }), _vm._v(" "), _c('Text', {
    staticStyle: {
      "display": "block",
      "padding": "0 10px",
      "height": "30px",
      "line-height": "30px",
      "overflow": "hidden"
    }
  }, [_vm._v(_vm._s(_vm.cellData.mainTitle))]), _vm._v(" "), _c('Text', {
    staticStyle: {
      "position": "absolute",
      "right": "0",
      "top": "0",
      "background": "red",
      "color": "white",
      "font-size": "12px"
    }
  }, [_vm._v(_vm._s(_vm.tag))])])
},staticRenderFns: []}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', [_c('View', {
    staticStyle: {
      "width": "100%",
      "height": "50px",
      "line-height": "50px",
      "padding": "0 10px",
      "border-bottom": "1px solid #e7e7e7"
    }
  }, [_c('Text', {
    staticStyle: {
      "font-size": "14px",
      "font-weight": "600"
    }
  }, [_vm._v("搜索历史")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "font-size": "13px",
      "color": "red",
      "float": "right",
      "height": "50px"
    },
    on: {
      "click": _vm.clear_history
    }
  }, [_vm._v("清空历史")])], 1), _vm._v(" "), _c('View', _vm._l((_vm.search_history), function(item) {
    return _c('Text', {
      staticStyle: {
        "display": "block",
        "padding": "0 10px",
        "height": "40px",
        "line-height": "40px",
        "font-size": "13px"
      }
    }, [_vm._v(_vm._s(item))])
  }))])
},staticRenderFns: []}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', [_c('View', {
    staticStyle: {
      "width": "100%",
      "height": "50px",
      "line-height": "50px",
      "padding": "0 10px",
      "border-bottom": "1px solid #e7e7e7"
    }
  }, [_c('Text', [_vm._v("热门搜索")])]), _vm._v(" "), _c('View', _vm._l((_vm.hot_list), function(item) {
    return _c('View', {
      staticStyle: {
        "display": "inline-block",
        "width": "50%",
        "height": "30px",
        "line-height": "30px",
        "font-size": "13px",
        "padding": "0 10px"
      }
    }, [_c('Text', {
      staticStyle: {
        "display": "inline-block",
        "width": "20px",
        "height": "20px",
        "line-height": "20px",
        "text-align": "center",
        "background": "red",
        "vertical-align": "middle",
        "margin-top": "-2px",
        "color": "#fff"
      }
    }, [_vm._v(_vm._s(item))]), _vm._v(" "), _c('Text', [_vm._v("\n                这是我的搜索结果" + _vm._s(item) + "\n            ")])])
  }))])
},staticRenderFns: []}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Swiper', {
    staticStyle: {
      "width": "100%",
      "height": "170px",
      "position": "absolute",
      "top": "200px",
      "left": "0",
      "z-index": "1"
    },
    on: {
      "swiper_end": _vm.swiper_end
    }
  }, _vm._l((_vm.data.focus), function(item) {
    return _c('SwiperItem', {
      staticStyle: {
        "padding": "20px"
      }
    }, [_c('View', {
      staticStyle: {
        "width": "100%",
        "height": "130px",
        "position": "relative",
        "background": "white",
        "border-radius": "6px",
        "padding": "5px 5px 5px 90px",
        "overflow": "hidden"
      }
    }, [_c('Image', {
      staticStyle: {
        "position": "absolute",
        "top": "5px",
        "left": "5px",
        "width": "80px",
        "height": "120px"
      },
      attrs: {
        "src": item.imageUrl
      }
    }), _vm._v(" "), _c('Text', {
      staticStyle: {
        "display": "block"
      }
    }, [_vm._v(_vm._s(item.focus))]), _vm._v(" "), _c('Text', {
      staticStyle: {
        "display": "block"
      }
    }, [_vm._v(_vm._s(item.updateStrategy))]), _vm._v(" "), _c('Text', {
      staticStyle: {
        "display": "block"
      }
    }, [_vm._v("主持人：" + _vm._s(item.hosts))]), _vm._v(" "), _c('Text', {
      staticStyle: {
        "display": "block"
      }
    }, [_vm._v(_vm._s(item.mainTitle))])])])
  }))
},staticRenderFns: []}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('View', [_c('View', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('header', {
    on: {
      "search_show_or_hide": _vm.search_show_or_hide
    }
  }), _vm._v(" "), (_vm.data) ? _c('bannerImg', {
    attrs: {
      "imgSrc": _vm.data.focus[_vm.bannerIndex].bgimg
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data) ? _c('swiperImg', {
    attrs: {
      "data": _vm.data
    },
    on: {
      "swiper_touchend": _vm.swiper_touchend
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data) ? _c('channel', {
    attrs: {
      "data": _vm.data
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('search', {
    attrs: {
      "search_show": _vm.searchShow
    },
    on: {
      "search_show_or_hide": _vm.search_show_or_hide
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=test.js.map