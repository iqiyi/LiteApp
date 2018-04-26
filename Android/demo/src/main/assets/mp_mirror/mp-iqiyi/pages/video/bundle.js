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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
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
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
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
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qs__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__os__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__object__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__md5__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base64__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__time__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__string__ = __webpack_require__(51);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









/* harmony default export */ __webpack_exports__["a"] = (_extends({}, { qs: __WEBPACK_IMPORTED_MODULE_0__qs__ }, { os: __WEBPACK_IMPORTED_MODULE_1__os__["a" /* default */] }, { md5: __WEBPACK_IMPORTED_MODULE_3__md5__["a" /* default */] }, { base64: __WEBPACK_IMPORTED_MODULE_4__base64__["a" /* default */] }, { time: __WEBPACK_IMPORTED_MODULE_5__time__ }, { string: __WEBPACK_IMPORTED_MODULE_6__string__ }, __WEBPACK_IMPORTED_MODULE_2__object__));

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isArray"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["isFunction"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["isObject"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["escapeSymbol"] = escapeSymbol;
/* harmony export (immutable) */ __webpack_exports__["numToChinaNum"] = numToChinaNum;
/* harmony export (immutable) */ __webpack_exports__["paopaoFormatCount"] = paopaoFormatCount;
/* harmony export (immutable) */ __webpack_exports__["getBirth"] = getBirth;
/* harmony export (immutable) */ __webpack_exports__["formatYearALL"] = formatYearALL;
/* harmony export (immutable) */ __webpack_exports__["formatYear"] = formatYear;


function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
}

function escapeSymbol(source) {
    return String(source).replace(/[#%&+=\/\\\ \u3000\f\r\n\t]/g, function (all) {
        return '%' + (0x100 + all.charCodeAt()).toString(16).substring(1).toUpperCase();
    });
}

function numToChinaNum(num) {
    if (!num || num <= 0) return 0;

    if (num < 100000) {
        return addSeparator(num, ',', 3);
    } else if (num < 1000000) {
        return (num / 10000).toFixed(1) + '万';
    } else if (num < 100000000) {
        return (num / 10000).toFixed(0) + '万';
    } else {
        return (num / 100000000).toFixed(1) + '亿';
    }
}

// 添加分割符
function addSeparator(num, sep, len) {
    var numStr = num.toString();
    var result = '';
    for (var i = numStr.length; i > 0; i = i - len) {
        var start = i - len < 0 ? 0 : i - len;
        var end = i;
        result = sep + numStr.slice(start, i) + result;
    }
    return result.substring(1);
}

function paopaoFormatCount(n, f) {
    if (n > 1e4) {
        n = (n / 1e4).toFixed(f) + '万';
    }
    return n;
}

function getBirth(birth) {
    if (!birth) return '';
    return [birth.substring(0, 4), birth.substring(4, 6), birth.substring(6, 8)].join('-');
}
function formatYearALL(year) {
    return ('' + year).replace(/(\d{4})(\d{2})(\d{2})/g, function (a, y, m, d) {
        return [y, m, d].join('-');
    });
}
function formatYear(year) {
    return ('' + year).replace(/(\d{4})(\d{2})(\d{2})/g, function (a, y, m, d) {
        return [m, d].join('-');
    });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export is6minVideo */
/* unused harmony export getError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__videoConfig__ = __webpack_require__(52);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var VIDEO_TEMPLATE = { // 视频模板
    ALBUM: 'album', // 专辑类 剧集类
    SOURCE: 'source', // 来源类
    MOVIE: 'movie', // 电影
    SHORT: 'short' //  短视频
};

/* harmony default export */ __webpack_exports__["a"] = ({
    videoFormat: videoFormat,
    error: error,
    log: log,
    getVideoTemplate: getVideoTemplate,
    getLrCorner: getLrCorner,
    is6minVideo: is6minVideo
});

function videoFormat() {
    return 'mp4';
    return isAndroid ? 'mp4' : 'm3u8';
}

function error(message) {
    console.error(message);
}

function log(message) {
    console.log(message);
}

// 判断视频种类
function getVideoTemplate(_ref) {
    var isSolo = _ref.isSolo,
        isSource = _ref.isSource,
        channelId = _ref.channelId,
        cid = _ref.cid;

    var videoTemplate = VIDEO_TEMPLATE;
    var template = '';
    cid = cid || channelId || '';

    if (cid && cid == 1) {
        template = videoTemplate.MOVIE;
    } else if (!isSource && isSolo) {
        template = videoTemplate.SHORT;
    } else if (!isSource && !isSolo) {
        template = videoTemplate.ALBUM;
    } else {
        template = videoTemplate.SOURCE;
    }

    return template;
}

// 获取右下角标
function getLrCorner(template, score, isFinish, episode, period, duration) {
    var content = '';
    var videoTemplate = VIDEO_TEMPLATE;
    if (template === videoTemplate.MOVIE) {
        if (score) score = score.toFixed(1);
        content = score;
    } else if (template === videoTemplate.ALBUM) {
        content = isFinish === 1 ? episode + '集全' : '更新至' + episode + '集';
    } else if (template === videoTemplate.SOURCE) {
        content = period && period.length === 8 ? period.slice(0, 4) + '-' + period.slice(4, 6) + '-' + period.slice(6, 8) + '期' : '';
    } else {
        content = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].time.formatSecondOmit(duration);
    }
    return content;
}

function is6minVideo(info) {
    return info.prv && info.previewType === '6min' || info.prv === "1" && info.previewType !== "2";
}

function getError(data) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var error = void 0;
    __WEBPACK_IMPORTED_MODULE_1__videoConfig__["a" /* errorConfig */].forEach(function (config) {
        if (config.type === data.content) {
            error = config;
            error.code = data.msg ? data.msg.code : '';
        }
    });
    return _extends({}, error, opts);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var NativePromise = Promise;
var nativePromiseSupported = NativePromise &&
// Some of these methods are missing from
// Firefox/Chrome experimental implementations
'resolve' in NativePromise && 'reject' in NativePromise && 'all' in NativePromise && 'race' in NativePromise &&
// Older version of the spec had a resolver object
// as the arg rather than a function
function () {
  var resolve;
  new NativePromise(function (r) {
    resolve = r;
  });
  return typeof resolve === 'function';
}();

//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function NOOP() {};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
//var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncSetTimer = setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush() {
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++) {
    asyncQueue[i][0](asyncQueue[i][1]);
  } // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg) {
  asyncQueue.push([callback, arg]);

  if (!asyncTimer) {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}

function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch (e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber) {
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function') {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch (e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value)) {
    if (settled === FULFILLED) resolve(promise, value);

    if (settled === REJECTED) reject(promise, value);
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value) throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
      var then = value.then; // then should be retrived only once

      if (typeof then === 'function') {
        then.call(value, function (val) {
          if (!resolved) {
            resolved = true;

            if (value !== val) resolve(promise, val);else fulfill(promise, val);
          }
        }, function (reason) {
          if (!resolved) {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved) reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value) {
  if (promise === value || !handleThenable(promise, value)) fulfill(promise, value);
}

function fulfill(promise, value) {
  if (promise.state_ === PENDING) {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason) {
  if (promise.state_ === PENDING) {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  var callbacks = promise.then_;
  promise.then_ = undefined;

  for (var i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise) {
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise) {
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver) {
  if (typeof resolver !== 'function') throw new TypeError('Promise constructor takes a function argument');

  if (this instanceof Promise === false) throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function then(onFulfillment, onRejection) {
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED) {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    } else {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function (promises) {
  var Class = this;

  if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.all().');

  return new Class(function (resolve, reject) {
    var results = [];
    var remaining = 0;

    function resolver(index) {
      remaining++;
      return function (value) {
        results[index] = value;
        if (! --remaining) resolve(results);
      };
    }

    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];

      if (promise && typeof promise.then === 'function') promise.then(resolver(i), reject);else results[i] = promise;
    }

    if (!remaining) resolve(results);
  });
};

Promise.race = function (promises) {
  var Class = this;

  if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.race().');

  return new Class(function (resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];

      if (promise && typeof promise.then === 'function') promise.then(resolve, reject);else resolve(promise);
    }
  });
};

Promise.resolve = function (value) {
  var Class = this;

  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Class) return value;

  return new Class(function (resolve) {
    resolve(value);
  });
};

Promise.reject = function (reason) {
  var Class = this;

  return new Class(function (resolve, reject) {
    reject(reason);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (nativePromiseSupported ? NativePromise : Promise);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_video_video_vue__ = __webpack_require__(6);


var app = new Vue({
    template: '<div><qy-video/></div>',
    components: {
        'qy-video': __WEBPACK_IMPORTED_MODULE_0__pages_video_video_vue__["a" /* default */]
    },
    mounted: function mounted() {
        qiyiApi.share('video', qiyiApi.getPageData());
    }
});
app.$mount();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_video_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ca04a4d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_video_vue__ = __webpack_require__(55);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_video_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ca04a4d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_video_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_player_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__body_body_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_source_qiyiVideoSource__ = __webpack_require__(45);
//
//
//
//
//
//
//
//
//






function getVideoSrc(_ref) {
    var _this = this;

    var qipuId = _ref.qipuId,
        vid = _ref.vid,
        payMark = _ref.payMark;

    if (qipuId && vid) {
        if (payMark == 1) {
            this.videoSrc = ' ';
            this.vipNeed = true;
            this.vid = vid;
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_2__common_source_qiyiVideoSource__["a" /* getVideoSource */])({ qipuId: qipuId, vid: vid }).then(function (videoInfo) {
                if (videoInfo && videoInfo.m3u) {
                    _this.videoSrc = videoInfo.m3u;
                    _this.vid = vid;
                    _this.vipNeed = false;
                    console.log('videoInfo', videoInfo);
                }
            }).catch(function (data) {
                console.log(data);
                _this.videoSrc = data.m3u;
            });
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        player: __WEBPACK_IMPORTED_MODULE_0__player_player_vue__["a" /* default */],
        videoBody: __WEBPACK_IMPORTED_MODULE_1__body_body_vue__["a" /* default */]
    },
    data: function data() {
        return {
            style: style,
            data: false,
            qipuId: false,
            vid: false,
            videoSrc: false,
            vipNeed: false
        };
    },
    mounted: function mounted() {
        var _this2 = this;

        var _qiyiApi$getPageData = qiyiApi.getPageData(),
            tvid = _qiyiApi$getPageData.tvid;

        qiyiApi.request('https://pub.m.iqiyi.com/h5/mina/' + tvid + '/', {}, function (result) {
            _this2.data = result.data;
            getVideoSrc.call(_this2, { qipuId: _this2.data.playInfo.qipuId, vid: _this2.data.playInfo.vid });
        });
    },
    methods: {
        changeVideo: function changeVideo(item) {
            getVideoSrc.call(this, item);
        }
    }
});

var style = {
    'container': ' background-color:#fff; width:100%; height:100%;box-sizing:border-box; ',
    'm-play-placeholder': 'position:relative; width:100%;height:21.1rem; '
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_player_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e1afd14a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_player_vue__ = __webpack_require__(15);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_player_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e1afd14a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_player_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__floatLayer_vue__ = __webpack_require__(10);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['videoSrc', 'vipNeed'],
    data: function data() {
        return {
            style: style
        };
    },
    components: {
        floatLayer: __WEBPACK_IMPORTED_MODULE_0__floatLayer_vue__["a" /* default */]
    },
    updated: function updated() {
        console.log('video updated');
    }
});
var style = {
    'm-play': ' position:fixed; width:100%;height:21.1rem;z-index:999;',
    'video': ' width:100%;height:100%;display:inline-block; line-height:0; overflow:hidden; position:relative; '
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_floatLayer_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_348aa559_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_floatLayer_vue__ = __webpack_require__(12);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_floatLayer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_348aa559_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_floatLayer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            style: style
        };
    }
});

var style = {
    'm-floatLayer': ' position:absolute; top:0; left:0; width:100%; height:100%; background-color:rgb(30, 30, 30); ',
    'm-floatLayer_content': ' position:absolute; left:50%; top:50%; width:90%; transform:translate(-50%,-50%); padding-top:1px; padding-bottom:1px; color:white; font-size:1.3rem; line-height:1.3rem; text-align:center; ',
    'c-loading_logo': ' display:inline-block;width:17.5rem; height:5.9rem; margin-bottom:.35rem; ',
    'm-floatLayer_link': ' margin-top:2rem; ',
    'c-icon-loading': ' display:inline-block;margin-top:-.35rem; margin-right:.7rem; width:2rem; height:2rem; vertical-align:middle; '
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"m-floatLayer",style:(_vm.style['m-floatLayer'])},[_c('div',{staticClass:"m-floatLayer_content",style:(_vm.style['m-floatLayer_content'])},[_c('image',{staticClass:"c-loading_logo",style:(_vm.style['c-loading_logo']),attrs:{"src":__webpack_require__(13)}}),_vm._v(" "),_c('div',{staticClass:"m-floatLayer_link",style:(_vm.style['m-floatLayer_link'])},[_c('img',{staticClass:"c-icon-loading",style:(_vm.style['c-icon-loading']),attrs:{"src":__webpack_require__(14)}}),_vm._v(" "),_c('span',[_vm._v("即将播放")])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/loading-logo.png?b8013af8856906ed9096bfd09a09de65";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-loading-black.gif?664053630d2a5b2b94fc1da645c99ac4";

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-play",style:(_vm.style['m-play'])},[(_vm.videoSrc)?_c('qy-video',{staticClass:"video",style:(_vm.style['video']),attrs:{"src":_vm.videoSrc,"vipNeed":_vm.vipNeed,"autoplay":"","controls":"","hover":""}}):_c('floatLayer')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_body_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f58af59a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_body_vue__ = __webpack_require__(44);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_body_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f58af59a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_body_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__info_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__des_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__series_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__focus_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_component_footer_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__body_cover_vue__ = __webpack_require__(40);
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









/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['data', 'vid'],
    data: function data() {
        return {
            style: style
        };
    },
    methods: {
        changeVideo: function changeVideo() {
            var _console;

            (_console = console).log.apply(_console, ['changeVideo'].concat(Array.prototype.slice.call(arguments)));
            this.$emit.apply(this, ['changeVideo'].concat(Array.prototype.slice.call(arguments)));
        }
    },
    components: {
        info: __WEBPACK_IMPORTED_MODULE_0__info_vue__["a" /* default */],
        des: __WEBPACK_IMPORTED_MODULE_1__des_vue__["a" /* default */],
        series: __WEBPACK_IMPORTED_MODULE_2__series_vue__["a" /* default */],
        focus: __WEBPACK_IMPORTED_MODULE_3__focus_vue__["a" /* default */],
        videoFooter: __WEBPACK_IMPORTED_MODULE_4_component_footer_vue__["a" /* default */],

        body_cover: __WEBPACK_IMPORTED_MODULE_5__body_cover_vue__["a" /* default */]
    }
});

var style = {
    'videoBody': ' position:relative; overflow:hidden; box-flex:1; -webkit-box-flex:1; '
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27013950_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_info_vue__ = __webpack_require__(20);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27013950_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_info_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['playInfo'],
    computed: {
        playCount: function playCount() {
            if (this.playInfo.playCount > 100000000) {
                return (this.playInfo.playCount / 100000000).toFixed(1) + '亿';
            } else if (this.playInfo.playCount > 10000) {
                return (this.playInfo.playCount / 10000).toFixed(1) + '万';
            } else {
                return this.playInfo.playCount;
            }
        }
    },
    data: function data() {
        return {
            style: style
        };
    },
    methods: {
        goShare: function goShare() {
            qiyiApi.goBrowser('video', qiyiApi.getPageData());
        }
    }
});

var style = {
    'm-video_function': ' height:6.35rem; padding:1.5rem; box-sizing:border-box; position:relative; ',
    'm-video_function-one': ' display:flex; flex-direction:row; justify-content:space-between; ',
    'm-film_playAmount': ' font-size:1.4rem; line-height:3.35rem; color:#999; width:8.4rem; ',
    'c-icon-playAmount': ' display:inline-block;width:1.2rem; height:1.2rem; margin:-.5rem .7rem .05rem 0; vertical-align:middle; ',
    'm-video_function-clarity': ' font-size:1.3rem; height:2.3rem;line-height:1.3rem; border:.1rem solid #0bbe06; box-sizing:border-box; padding:.45rem 1.15rem .5rem; border-radius:1.15rem; margin:.5rem 18.95rem .5rem 0; ',
    'c-clarity': '',
    'c-text-green': 'color:rgb(11,190,6)',
    'm-video_function-share': 'font-size:1rem;position:relative',
    'c-icon-share': ' width:2rem; height:2rem; display:block; margin-bottom:.25rpx; '
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-video_function",style:(_vm.style['m-video_function'])},[_c('div',{staticClass:"m-video_function-one",style:(_vm.style['m-video_function-one'])},[_c('div',{staticClass:"m-film_playAmount",style:(_vm.style['m-film_playAmount'])},[_c('img',{staticClass:"c-icon-playAmount",style:(_vm.style['c-icon-playAmount']),attrs:{"src":__webpack_require__(21)}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.playCount))])]),_vm._v(" "),_c('div',{staticClass:"m-video_function-clarity",style:(_vm.style['m-video_function-clarity'])},[_c('span',{staticClass:"c-clarity c-text-green",style:(_vm.style['c-clarity'] + _vm.style['c-text-green'])},[_vm._v("高清")])]),_vm._v(" "),_c('div',{staticClass:"m-video_function-share",style:(_vm.style['m-video_function-share']),on:{"tap":_vm.goShare}},[_c('img',{staticClass:"c-icon-share",style:(_vm.style['c-icon-share']),attrs:{"src":__webpack_require__(22)}}),_vm._v(" "),_c('span',{staticClass:"c-clarity",style:(_vm.style['c-clarity'])},[_vm._v("分享")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-playAmount.png?43db1c128a914f10d2d2ec36383e8b61";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-share.png?adad3d475609dfe7f43c21e9e898a210";

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_des_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37aaee69_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_des_vue__ = __webpack_require__(25);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_des_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37aaee69_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_des_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['playInfo'],
    data: function data() {

        var video = this.playInfo;
        var videoType = getVideoTemplate(video);
        var showContent = '';

        if (videoType == 'album') {
            showContent = video.mainActors ? '主演：' + video.mainActors : '';
        } else if (videoType == 'source') {
            showContent = video.hosts ? '主持人：' + video.hosts : '';
        } else if (videoType == 'movie') {
            showContent = video.mainActors ? '主演：' + video.mainActors : '';
        }
        return {
            style: style,
            showContent: showContent,
            isDetailShow: false
        };
    },
    methods: {
        showDetail: function showDetail() {
            this.$set(this, 'isDetailShow', !this.isDetailShow);
            //this.isDetailShow = !this.isDetailShow;
            console.log('isDetailShow', this.isDetailShow);
        }
    }
    // 判断视频种类
});function getVideoTemplate(_ref) {
    var isSolo = _ref.isSolo,
        isSource = _ref.isSource,
        channelId = _ref.channelId,
        cid = _ref.cid;

    var VIDEO_TEMPLATE = { // 视频模板
        ALBUM: 'album', // 专辑类 剧集类
        SOURCE: 'source', // 来源类
        MOVIE: 'movie', // 电影
        SHORT: 'short' //  短视频
    };
    var videoTemplate = VIDEO_TEMPLATE;
    var template = '';
    cid = cid || channelId || '';

    if (cid && cid == 1) {
        template = videoTemplate.MOVIE;
    } else if (!isSource && isSolo) {
        template = videoTemplate.SHORT;
    } else if (!isSource && !isSolo) {
        template = videoTemplate.ALBUM;
    } else {
        template = videoTemplate.SOURCE;
    }

    return template;
}

var style = {
    'm-film': ' width:100%; padding:0 1.5rem 1.7rem 1.5rem; box-sizing:border-box; border-bottom:1rpx solid rgb(230, 230, 230);white-space:initial;border-bottom:.05rem solid #e6e6e6;',
    'm-film_title': ' position:relative; font-size:1.8rem; font-weight:700; color:#333; line-height:2.5rem; max-height:5rem; overflow:hidden; padding-right:2rem; ',
    'c-icon-bottom': ' position:absolute; top:0; left:32.85rem; width:1.7rem; height:.9rem margin-top:.6rem ',
    'm-film_update': ' margin:.5rem 0 0 0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:1.4rem; line-height:2.4rem; color:#999; ',
    'm-film_details': ' font-size:1.4rem; line-height:2.4rem; color:#999; ',
    'm-film_intro': ' margin-top:1rem; text-align:justify; '
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-film",style:(_vm.style['m-film'])},[_c('div',{on:{"tap":_vm.showDetail}},[_c('div',{staticClass:"m-film_title",style:(_vm.style['m-film_title'])},[_c('span',[_vm._v(_vm._s(_vm.playInfo.shortTitle))]),_vm._v(" "),_c('img',{staticClass:"c-icon-bottom",style:(_vm.style['c-icon-bottom']),attrs:{"src":__webpack_require__(26)}})]),_vm._v(" "),_c('div',{staticClass:"m-film_update",style:(_vm.style['m-film_update'])},[_c('span',[_vm._v(_vm._s(_vm.playInfo.updateStrategy))])]),_vm._v(" "),(_vm.isDetailShow)?_c('div',{staticClass:"m-film_details",style:(_vm.style['m-film_details'])},[_c('div',[_c('span',[_vm._v(_vm._s(_vm.showContent))])]),_vm._v(" "),_c('div',[_c('span',[_vm._v("看点："+_vm._s(_vm.playInfo.tags))])]),_vm._v(" "),_c('div',{staticClass:"m-film_intro",style:(_vm.style['m-film_intro'])},[_c('span',[_vm._v(_vm._s(_vm.playInfo.desc))])])]):_c('div')])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-bottom.png?06642a9b69997820007a45d7384114cd";

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_series_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f185244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_series_vue__ = __webpack_require__(29);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_series_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f185244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_series_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['playInfo', 'videoList', 'vid'],
    data: function data() {
        return {
            style: style
        };
    },
    methods: {
        changeVideo: function changeVideo(item) {
            console.log('changeVideo');
            this.$emit('changeVideo', item);
        }
    }
});

var style = {
    'm-box': ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-title': ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h': ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-title_more': ' display:block; text-align:right; ',
    'm-title_moreTx': ' display:inline-block; vertical-align:middle; font-size:1.4rem; line-height:1.5rem; color:#666; ',
    'c-icon-more': ' display:inline-block; width:1.5rem; height:1.5rem; vertical-align:middle; margin-top:-.05rem; ',
    'm-scrollList-series': ' width:100%; height:6.5rem; margin-bottom:1rem; white-space:nowrap; ',
    'm-scrollList-series-inner': ' padding-left:2rem; ',
    'm-scrollList-series_item': ' position:relative; display:inline-block; vertical-align:top; width:5.5rem; height:5.5rem; margin-bottom:1rem; margin-right:1.5rem; margin-left:-.5rem; background-color:#f5f5f5; ',
    'c-icon-play-s': ' display:block; position:absolute; top:50%; left:50%; z-index:5; width:1.8rem; height:1.8rem; -webkit-transform:translate(-50%,-50%); transform:translate(-50%,-50%); ',
    'c-series_item': ' display:block; width:5.5rem; height:5.5rem; line-height:5.5rem; color:#333; text-align:center; font-size:1.5rem; font-weight:700; ',
    'c-icon-vip-s': ' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; ',
    'c-icon-ad-s': ' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; '

};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-box",style:(_vm.style['m-box'])},[_c('div',{staticClass:"m-title",style:(_vm.style['m-title'])},[_c('span',{staticClass:"m-title_h",style:(_vm.style['m-title_h'])},[_vm._v("剧集")]),_vm._v(" "),_c('div',{staticClass:"m-title_more",style:(_vm.style['m-title_more'])},[_c('span',{staticClass:"m-title_moreTx",style:(_vm.style['m-title_moreTx'])},[_vm._v(_vm._s(_vm.videoList.showContent))]),_vm._v(" "),_c('img',{staticClass:"c-icon-more",style:(_vm.style['c-icon-more']),attrs:{"src":__webpack_require__(30)}})])]),_vm._v(" "),_c('qy-scrollview',{staticClass:"m-scrollList-series",style:(_vm.style['m-scrollList-series']),attrs:{"scroll-x":""}},[_c('div',{staticClass:"m-scrollList-series-inner",style:(_vm.style['m-scrollList-series-inner'])},_vm._l((_vm.videoList.videos),function(item,index){return _c('div',{key:index,staticClass:"m-scrollList-series_item",style:(_vm.style['m-scrollList-series_item']),on:{"tap":function($event){_vm.changeVideo(item)}}},[(_vm.vid == item.vid)?_c('img',{staticClass:"c-icon-play-s",style:(_vm.style['c-icon-play-s']),attrs:{"src":__webpack_require__(31)}}):_c('span',{staticClass:"c-series_item",style:(_vm.style['c-series_item'])},[_vm._v(_vm._s(item.pd || (index + 1)))]),_vm._v(" "),(item.payMark == 1)?_c('img',{staticClass:"c-icon-vip-s",style:(_vm.style['c-icon-vip-s']),attrs:{"mode":"aspectFit","src":__webpack_require__(32)}}):(item.type == 3)?_c('img',{staticClass:"c-icon-ad-s",style:(_vm.style['c-icon-ad-s']),attrs:{"src":__webpack_require__(33)}}):_vm._e()])}))])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-arrow.png?c271240a57fa4a3ed676a6fa8e5f6499";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-play-s.png?8f8b278f0a8cd45368bbe21790fb518c";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-vip-s.png?d12397d90effafb46c3b4b00a96e392b";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-ad-s.png?94addc16192ab7067e3fe3527e91b5b1";

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_focus_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5f90dc4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_focus_vue__ = __webpack_require__(36);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_focus_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5f90dc4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_focus_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['bestViews', 'recommendVideos'],
    computed: {
        baseViewsLimit: function baseViewsLimit() {
            console.log(this.bestViews, this.recommendVideos);
            return Array.isArray(this.bestViews) ? this.bestViews.splice(0, 10) : Array.isArray(this.recommendVideos) ? this.recommendVideos.splice(0, 10) : [];
        }
    },
    methods: {
        imgSrc: function imgSrc(item) {
            return (item.vpic || item.aPicUrl || item.imageUrl).replace('http', 'https');
        },
        showContent: function showContent(item) {
            if (item.timeLength) {
                return parseInt(item.timeLength / 60) + ':' + item.timeLength % 60;
            } else {
                return item.showContent;
            }
        },
        title: function title(item) {
            return item.vn || item.aName || item.mainTitle;
        },
        changeVideo: function changeVideo(item) {
            this.$emit('changeVideo', item);
        }
    },
    data: function data() {
        return {
            style: style
        };
    }
});

var style = {
    'm-box': ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-title': ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h': ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-scrollList': ' width:100%; min-height:11.7rem; max-height:13.2rem; display:block; white-space:nowrap; ',
    'm-scrollList-inner': ' padding-left:1.5rem; ',
    'm-scrollList_item': ' display:inline-block; width:13rem; max-height:100%; margin-right:1.5rem; vertical-align:top; overflow:hidden; ',
    'm-scrollList_imgBox': ' position:relative; display:block; width:13rem; height:7.3rem; ',
    'm-scrollList_img': 'width:100%;height:100%;',
    'm-scrollList_update': ' width:13rem; height:4rem; box-sizing:border-box; padding-left:1rem; padding-right:1rem; position:absolute; bottom:0; left:0; background-image:-webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 100%); background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 100%); background-repeat:repeat-x; ',
    'm-scrollList_updateTx': ' display:block; width:100%; height:2rem; margin-top:2rem; overflow:hidden; text-overflow:ellipsis; color:#fff; font-size:1.1rem; line-height:2rem; white-space:nowrap; text-align:right; ',
    'm-scrollList_title': ' min-height:2.7rem; max-height:4.7rem; box-sizing:border-box; overflow:hidden; padding-top:.7rem; margin-bottom:1.2rem; font-size:1.4rem; line-height:2rem; white-space:normal; '
};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-box",style:(_vm.style['m-box'])},[_c('div',{staticClass:"m-title",style:(_vm.style['m-title'])},[_c('span',{staticClass:"m-title_h",style:(_vm.style['m-title_h'])},[_vm._v("精彩看点")])]),_vm._v(" "),_c('qy-scrollview',{staticClass:"m-scrollList",style:(_vm.style['m-scrollList']),attrs:{"scroll-x":""}},[_c('div',{staticClass:"m-scrollList-inner",style:(_vm.style['m-scrollList-inner'])},_vm._l((_vm.baseViewsLimit),function(item,index){return _c('div',{staticClass:"m-scrollList_item",style:(_vm.style['m-scrollList_item']),on:{"tap":function($event){_vm.changeVideo(item)}}},[_c('div',{staticClass:"m-scrollList_imgBox",style:(_vm.style['m-scrollList_imgBox'])},[_c('img',{staticClass:"m-scrollList_img",style:(_vm.style['m-scrollList_img']),attrs:{"mode":"aspectFill","src":_vm.imgSrc(item)}}),_vm._v(" "),_c('div',{staticClass:"m-scrollList_update",style:(_vm.style['m-scrollList_update'])},[_c('span',{staticClass:"m-scrollList_updateTx",style:(_vm.style['m-scrollList_updateTx'])},[_vm._v(_vm._s(_vm.showContent(item)))])])]),_vm._v(" "),_c('div',{staticClass:"m-scrollList_title",style:(_vm.style['m-scrollList_title'])},[_c('span',[_vm._v(_vm._s(_vm.title(item)))])])])}))])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_footer_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_051a74ec_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_footer_vue__ = __webpack_require__(39);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_footer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_051a74ec_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_footer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            style: style
        };
    }
});
var style = {
    'footer': ' width:100%; height:8.5rem; padding:2.75rem; box-sizing:border-box; text-align:center; ',
    'footer-logo': 'display:inline-block; width:10rem; height:3rem; '
};

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('view',{staticClass:"footer",style:(_vm.style['footer'])},[_c('image',{staticClass:"footer-logo",style:(_vm.style['footer-logo']),attrs:{"src":"/resource/images/footer.png"}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_body_cover_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20ecde9e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_body_cover_vue__ = __webpack_require__(42);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_body_cover_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20ecde9e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_body_cover_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            style: style
        };
    }
});

var style = {
    'm-box-cover': ' width:100%; height:100%; top:0; left:0; right:0; bottom:0; z-index:50; background-color:#fff; overflow:hidden; transition:transform 1s cubic-bezier(0.075, 0.82, 0.165, 1); ',
    'c-cover-loading': ' display:block; width:2rem; height:2rem; margin:50% auto; '
};

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-box-cover",style:(_vm.style['m-box-cover'])},[_c('img',{staticClass:"c-cover-loading",style:(_vm.style['c-cover-loading']),attrs:{"src":__webpack_require__(43)}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "res/images/c-icon-loading.gif?10d22bd383940edf7fd867a8266441f2";

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"videoBody",style:(_vm.style['videoBody'])},[(_vm.data)?_c('div',{attrs:{"scroll-y":""}},[_c('info',{attrs:{"playInfo":_vm.data.playInfo}}),_vm._v(" "),_c('des',{attrs:{"playInfo":_vm.data.playInfo}}),_vm._v(" "),(_vm.data.videoList)?_c('series',{attrs:{"playInfo":_vm.data.playInfo,"videoList":_vm.data.videoList,"vid":_vm.vid},on:{"changeVideo":_vm.changeVideo}}):_vm._e(),_vm._v(" "),_c('focus',{attrs:{"bestdivs":_vm.data.bestdivs,"recommendVideos":_vm.data.recommendVideos},on:{"changeVideo":_vm.changeVideo}}),_vm._v(" "),_c('videoFooter')],1):_c('body_cover')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getVideoSource;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__videoUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sourceAuth__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__ = __webpack_require__(4);





function getVideoSource(opts) {
  opts = getOpts(opts);
  return getVideoList(opts);
}

function getOpts(opts) {
  var _opts = {};
  _opts.vfrm = opts.vfrm || '';
  _opts.aid = opts.aid;
  _opts.vid = opts.vid;
  _opts.player = opts.player;
  _opts.qipuId = opts.qipuId;
  _opts.publicLevel = opts.publicLevel;
  _opts.rate = opts.rate;
  return _opts;
}

function getVideoList(params) {
  var qipuId = params.qipuId;
  var vid = params.vid;
  var rate = params.rate || 2;
  var nolimit = 0;
  return Object(__WEBPACK_IMPORTED_MODULE_2__sourceAuth__["a" /* auth */])(qipuId, vid, rate, nolimit).then(function (data) {
    return successHandler(data, params);
  }, function (data) {
    return failureHandler(data, params);
  });
}

function buildVideo(data, info, params) {
  var result = {};
  result.src = data.src;
  result.pubLevel = params.pubLevel;
  result.info = info;
  result.rate = params.rate || 1;
  result.qipuId = params.qipuId;
  result.vid = params.vid;
  result.duration = info.duration;
  result.prv = info.prv === "1";
  result.previewType = info.previewType === "2" ? 'whole' : '6min';
  result.formatType = __WEBPACK_IMPORTED_MODULE_1__videoUtil__["a" /* default */].videoFormat();
  return result;
}

function message(content, msg, videos) {
  return {
    content: content,
    msg: msg,
    videos: videos
  };
}

function successHandler() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments[1];

  var info = data.data || {};

  return new __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */](function (resolve, reject) {
    var errorMessage = isNotNormalVideo(info) || isValidVip(info);
    if (errorMessage) {
      reject(errorMessage);
    }
    var video = buildVideo(data, info, params);

    if (data.status === 'A00000' || data.status === 'A00015') {}
    if (data.status === 'A00012') {
      console.log('tmts接口调用完毕，需要请求广告sdk');
      video.isPlayAD = true;
    }

    if (!data.src && data.status !== 'A00012') {
      console.log('tmts接口调用失败!');
      reject(message('noSrc'));
    } else {
      console.log('tmts接口调用成功');
      resolve(video);
    }
  });
}

function failureHandler() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments[1];

  var info = data.data || {};
  return new __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */](function (resolve, reject) {
    resolve(data);
  });
}

// 如果是全景直播，则导流到APP.1:普通视频，2:360全景，3:180全景,4:广角视频
function isNotNormalVideo(info) {
  if (info && info.pano && info.pano.type && info.pano.type != 1) {
    return message('isPanoSource');
  }
}

// 验证是否为有效的vip
function isValidVip(info) {
  if (info.vipInfo) {
    var vipInfo = info.vipInfo;
    var vipStatus = vipInfo.status;
    if (vipStatus === 'A10001') {
      // 并发错误
      return message('concurrentTip', {
        param: vipInfo.keepalive,
        text: vipInfo.text
      });
    } else if (vipStatus === 'A10002') {
      // 封禁错误
      return message('forbidTip', {
        param: vipInfo.unfeeze_times,
        text: vipInfo.text
      });
    }
  }
}

function isValidCode(data) {
  var codeMap = {
    A00001: 'noSrc',
    A00002: 'noSrc',
    A00003: 'noSrc',
    A00004: function A00004(data) {
      var info = data.data || {};
      if (info.prv !== '1') {
        return 'offline';
      } else {
        return 'preNotSrc';
      }
    },
    A00011: 'vipckfail',
    A00013: 'oversea',
    Q00201: 'offline',
    Q00202: 'offline',
    Q00203: 'offline',
    A00101: 'mtexpire',
    A00110: 'platformLimit',
    A00111: function A00111(data) {
      if (data.ctl && data.ctl.area == 301) {
        return 'oversea';
      } else {
        return 'domestic';
      }
    },
    A00113: 'ugcUnpass',
    A00114: 'playerForbidden',
    A00115: 'playerForbidden',
    A00301: 'private',
    A00302: 'private',
    A00116: 'drmLimit',
    A00117: 'drmLimit',
    A02602: function A02602() {}

  };

  var state = codeMap[data.code];
  state = state && __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].isFunction(state) ? state(data) : state;
  state = state || 'defaultTmtsErr';
  return message(state, {
    code: data.code
  });
}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["stringify"] = stringify;
/* harmony export (immutable) */ __webpack_exports__["addQueryParam"] = addQueryParam;
var _ = __webpack_require__(2);

function parse(url) {
    var query = url.substr(url.lastIndexOf('?') + 1),
        params = query.split('&'),
        len = params.length,
        result = {},
        i = 0,
        key,
        value,
        item,
        param;

    for (; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        param = params[i].split('=');
        key = param.shift();
        value = param.join('=');

        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (_.isArray(item)) {
            item.push(value);
        } else {
            result[key] = [item, value];
        }
    }

    return result;
}

function stringify() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var replacer_opt = arguments[1];

    var result = [],
        itemLen,
        replacer = replacer_opt || function (value) {
        return _.escapeSymbol(value);
    };

    for (var key in param) {
        var item = param[key];
        if (_.isArray(item)) {
            itemLen = item.length;
            while (itemLen--) {
                result.push(key + '=' + replacer(item[itemLen], key));
            }
        } else {
            result.push(key + '=' + replacer(item, key));
        }
    }

    return result.join('&');
}

function addQueryParam(url, name, value) {
    if (!name) return;
    var prefix = url.indexOf('?') !== -1 ? '&' : '?';
    return '' + url + prefix + name + '=' + value;
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var system = 'iOS';
/* harmony default export */ __webpack_exports__["a"] = ({
    isAndroid: system.indexOf('Android') !== -1,
    isIOS: system.indexOf('iOS') !== -1
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = md5;

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safeAdd(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
        output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
    }
    return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
    }
    return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hexTab.charAt(x >>> 4 & 0x0F) + hexTab.charAt(x & 0x0F);
    }
    return output;
}

/*
* Encode a string as utf-8
*/
function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
    return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
}

function md5(string, key, raw) {
    if (!key) {
        if (!raw) {
            return hexMD5(string);
        }
        return rawMD5(string);
    }
    if (!raw) {
        return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*--------------------------------------------------------------------------*/

var InvalidCharacterError = function InvalidCharacterError(message) {
    this.message = message;
};
InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

var error = function error(message) {
    // Note: the error messages used throughout this file match those used by
    // the native `atob`/`btoa` implementation in Chromium.
    throw new InvalidCharacterError(message);
};

var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// http://whatwg.org/html/common-microsyntaxes.html#space-character
var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

// `decode` is designed to be fully compatible with `atob` as described in the
// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
// The optimized base64-decoding algorithm used is based on @atk’s excellent
// implementation. https://gist.github.com/atk/1020396
var decode = function decode(input) {
    input = String(input).replace(REGEX_SPACE_CHARACTERS, '');
    var length = input.length;
    if (length % 4 == 0) {
        input = input.replace(/==?$/, '');
        length = input.length;
    }
    if (length % 4 == 1 ||
    // http://whatwg.org/C#alphanumeric-ascii-characters
    /[^+a-zA-Z0-9/]/.test(input)) {
        error('Invalid character: the string to be decoded is not correctly encoded.');
    }
    var bitCounter = 0;
    var bitStorage;
    var buffer;
    var output = '';
    var position = -1;
    while (++position < length) {
        buffer = TABLE.indexOf(input.charAt(position));
        bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
        // Unless this is the first of a group of 4 characters…
        if (bitCounter++ % 4) {
            // …convert the first 8 bits to a single ASCII character.
            output += String.fromCharCode(0xFF & bitStorage >> (-2 * bitCounter & 6));
        }
    }
    return output;
};

// `encode` is designed to be fully compatible with `btoa` as described in the
// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
var encode = function encode(input) {
    input = String(input);
    if (/[^\0-\xFF]/.test(input)) {
        // Note: no need to special-case astral symbols here, as surrogates are
        // matched, and the input is supposed to only contain ASCII anyway.
        error('The string to be encoded contains characters outside of the ' + 'Latin1 range.');
    }
    var padding = input.length % 3;
    var output = '';
    var position = -1;
    var a;
    var b;
    var c;
    var d;
    var buffer;
    // Make sure any padding is handled outside of the loop.
    var length = input.length - padding;

    while (++position < length) {
        // Read three bytes, i.e. 24 bits.
        a = input.charCodeAt(position) << 16;
        b = input.charCodeAt(++position) << 8;
        c = input.charCodeAt(++position);
        buffer = a + b + c;
        // Turn the 24 bits into four chunks of 6 bits each, and append the
        // matching character for each of them to the output.
        output += TABLE.charAt(buffer >> 18 & 0x3F) + TABLE.charAt(buffer >> 12 & 0x3F) + TABLE.charAt(buffer >> 6 & 0x3F) + TABLE.charAt(buffer & 0x3F);
    }

    if (padding == 2) {
        a = input.charCodeAt(position) << 8;
        b = input.charCodeAt(++position);
        buffer = a + b;
        output += TABLE.charAt(buffer >> 10) + TABLE.charAt(buffer >> 4 & 0x3F) + TABLE.charAt(buffer << 2 & 0x3F) + '=';
    } else if (padding == 1) {
        buffer = input.charCodeAt(position);
        output += TABLE.charAt(buffer >> 2) + TABLE.charAt(buffer << 4 & 0x3F) + '==';
    }

    return output;
};

/* harmony default export */ __webpack_exports__["a"] = ({ encode: encode, decode: decode });

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["formatSecond"] = formatSecond;
/* harmony export (immutable) */ __webpack_exports__["formatSecondOmit"] = formatSecondOmit;
/* harmony export (immutable) */ __webpack_exports__["secondOmit"] = secondOmit;
/* harmony export (immutable) */ __webpack_exports__["format"] = format;
/* harmony export (immutable) */ __webpack_exports__["createTimeTip"] = createTimeTip;

function formatSecond(sec) {
    var h = Math.floor(sec / 3600),
        m = Math.floor(sec % 3600 / 60),
        s = Math.floor(sec % 60);

    h = h >= 10 ? h : '0' + h;
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;

    return [h, m, s].join(':');
}

function formatSecondOmit(date) {
    var formatDate = this.formatSecond(date);
    return this.secondOmit(formatDate);
}

function secondOmit(formatDate) {
    if (formatDate && formatDate.substring(0, 3) === '00:') {
        return formatDate.substring(3);
    } else {
        return formatDate;
    }
}

function format(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1, //月份 
        'd+': date.getDate(), //日 
        'h+': date.getHours(), //小时 
        'm+': date.getMinutes(), //分 
        's+': date.getSeconds(), //秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
        'S': date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }return fmt;
}

function createTimeTip(uploadTime, serverTime) {
    if (/Invalid /ig.test(new Date(uploadTime))) {
        uploadTime = uploadTime.replace(/-/g, '/');
    }
    uploadTime = new Date(uploadTime);
    if (/Invalid /ig.test(new Date(serverTime))) {
        serverTime = serverTime.replace(/-/g, '/');
    }
    serverTime = new Date(serverTime);
    var interval = (serverTime - uploadTime) / 1000;
    var createTimeTip = '';
    if (!uploadTime) {
        createTimeTip = '';
    } else if (interval < 10) {
        createTimeTip = '刚刚';
    } else if (interval < 60) {
        createTimeTip = interval + '秒前';
    } else if (interval < 60 * 60) {
        createTimeTip = Math.floor(interval / 60) + '分钟前';
    } else if (interval < 60 * 60 * 2) {
        createTimeTip = '一小时前';
    } else if (uploadTime.getDay() === serverTime.getDay() && interval < 60 * 60 * 24) {
        createTimeTip = $.date.format(uploadTime, 'H点mm分');
    } else if ((uploadTime.getDay() + 1) % 7 === serverTime.getDay() && interval < 60 * 60 * 48) {
        createTimeTip = '昨天';
    } else if ((uploadTime.getDay() + 2) % 7 === serverTime.getDay() && interval < 60 * 60 * 72) {
        createTimeTip = '前天';
    } else {
        if (new Date().getFullYear() === uploadTime.getFullYear()) {
            createTimeTip = $.date.format(uploadTime, 'M月d日');
        } else {
            createTimeTip = $.date.format(uploadTime, 'yyyy年M月d日');
        }
    }
    return createTimeTip;
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["slice"] = slice;
function slice(str, beginIndex, endIndex, prefix) {
  if (!str) return str;
  if (prefix) {
    return str.split(prefix).slice(beginIndex, endIndex).join(prefix);
  } else {
    return str.slice(beginIndex, endIndex);
  }
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return errorConfig; });
var errorConfig = [{
  type: 'platformLimit',
  contentA: '很抱歉，该平台无法观看本视频',
  contentB: '下载爱奇艺APP观看海量高清视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'oversea',
  contentA: '很抱歉，由于版权限制，',
  contentB: '该视频暂时只对中国大陆地区提供服务',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'mtexpire',
  contentB: '浏览器或应用播放视频出错了，去客户端试试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'offline',
  contentA: '很抱歉',
  contentB: '您所查看的视频已下线',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'ugcUnpass',
  contentA: '很抱歉',
  contentB: '该视频尚未通过审核，暂时无法观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'playerForbidden',
  contentA: '很抱歉',
  contentB: '由于视频版权限制，你无法观看该视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'private',
  contentA: '很抱歉',
  contentB: '该视频为私密视频，仅上传者可见',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'noData',
  contentA: '很抱歉',
  contentB: '当前视频暂时无法播放，请您稍后再试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'noSrc',
  contentA: '很抱歉',
  contentB: '您所查看的视频不存在',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'domestic',
  contentA: '很抱歉，由于版权限制',
  contentB: '您所在的地区暂时无法观看该视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'forceDiversion',
  contentA: '很抱歉',
  contentB: '该视频仅支持APP专享，望您谅解',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'drmLimit',
  contentA: '很抱歉',
  contentB: '应版权方要求，当前节目只能在客户端观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'isPanoSource',
  contentA: '很抱歉',
  contentB: '当前节目只能在客户端观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'forbidTip',
  contentB: '检测到您的帐号被严重分享,请设置重试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'concurrentTip',
  contentB: '您的账号在多台设备同时播放视频，存在安全风险，请尽快退登其他设备或立即修改密码',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'vipckfail',
  contentA: '本片为VIP影片',
  contentB: '开通黄金VIP会员可观看所有VIP影片',
  buttonText: '开通VIP会员方法',
  buttonclick: goToVipGuide
}, {
  type: 'vipckPurchaseFail',
  contentA: '本片为VIP付费影片',
  contentB: '请在爱奇艺客户端观看',
  buttonText: '观看本片精彩看点',
  buttonclick: null
}, {

  type: 'vipckTicketFail',
  contentA: '本片为VIP用券影片',
  contentB: '请在爱奇艺客户端观看',
  buttonText: '观看本片精彩看点',
  buttonclick: null
}, {
  type: 'preNotSrc',
  contentB: '本片仅限VIP用户观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'anonymousLayer',
  contentA: '本片为VIP影片',
  contentB: 'VIP会员请在登录后观看',
  buttonText: '微信登录'
}, {
  type: 'defaultTmtsErr',
  contentA: '很抱歉，当前视频暂时无法播放',
  buttonText: '看看其他视频~',
  buttonclick: null
}];

function goToIndex() {
  wx.switchTab({
    url: '/pages/home/home'
  });
}

function goToLogin() {
  wx.switchTab({
    url: '/pages/my/my'
  });
}

function goToVipGuide() {
  wx.navigateTo({
    url: '/pages/vipGuide/vipGuide'
  });
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = auth;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__videoUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tmts_tmts__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






function addParamsToUrl(url, data) {
    //create params
    var params = [];
    var _url = url;
    for (var p in data) {
        if (data.hasOwnProperty(p)) {
            params.push(p + '=' + encodeURIComponent(data[p]));
        };
    }
    if (params.length > 0) {
        _url += _url.indexOf('?') == -1 ? '?' : '&';
        _url += params.join('&');
    }
    return _url;
}

function auth(qipuId, vid) {
    var rate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var nolimit = arguments[3];

    if (!qipuId || !vid) return __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */].reject({ code: 'A00001', 'data': {} });
    var opts = {
        uid: '',
        platForm: 'h5',
        qyid: '',
        agenttype: __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].os.isAndroid ? 236 : 237,
        ptid: __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].os.isAndroid ? '02028001010000000000' : '02038001010000000000',
        type: __WEBPACK_IMPORTED_MODULE_0__videoUtil__["a" /* default */].videoFormat(),
        nolimit: nolimit,
        k_ft1: 8, //观影提示前贴片
        rate: rate,
        p: '',
        deviceid: '',
        codeflag: 1
    };
    return new __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */](function (resolve, reject) {
        //鉴权参数拼接，防盗链
        opts = getTmtsVf(qipuId, vid, opts);
        var url = 'https://cache.m.iqiyi.com/tmts/' + qipuId + '/' + vid + '/';
        queueAuth(opts)().then(function (res) {
            var data = res.data;

            if (data && data.code === 'A00000') {
                filterM3U(qipuId, data);
                resolve(data);
            } else {
                reject(data);
            }
        }, function (error) {
            console.log('tmts接口调用失败， retry');
            reject(error);
        });

        function queueAuth(opts) {
            var num_retry = 3;
            return function () {
                return new __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */](function (resolve, reject) {
                    _auth();

                    function _auth() {
                        getSource(url, opts).then(function (data) {
                            resolve(data);
                        }, function (error) {
                            if (num_retry) {
                                _auth(opts);
                            } else {
                                reject(error);
                            }
                            num_retry--;
                        });
                    }
                });
            };
        }
    });
}

function filterM3U(qipuId, data) {
    var status = {
        A00012: '需要前端请求广告mixer接口',
        A00015: '会员鉴权成功',
        A00000: '不请求广告直接播放'
    };
    if (data.data && status[data.data.ds]) {
        data.src = __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].qs.addQueryParam(data.data.m3u, 'qypid', qipuId + '_31');
        data.status = data.data.ds;
    }
}

function getSource(url, opts) {
    return new __WEBPACK_IMPORTED_MODULE_3__polyfill_promise__["a" /* default */](function (resolve, reject) {
        qiyiApi.request(addParamsToUrl(url, opts), {}, resolve, function (error) {
            console.log('tmts接口调用失败， url: , ' + JSON.stringify(url) + ' error: ' + error);
            reject(error);
        });
    });
}

function getTmtsVf(qipuId, vid) {
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var key = __WEBPACK_IMPORTED_MODULE_1__tmts_tmts__["a" /* default */].cmd5xtmts();
    //  02028001010000000000 02020031010000000000
    param = _extends(param, key, { src: '02028001010000000000' });
    var query = __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].qs.stringify(param);
    var urlPara = '/tmts/' + qipuId + '/' + vid + '/?' + query;
    param.vf = __WEBPACK_IMPORTED_MODULE_1__tmts_tmts__["a" /* default */].cmd5x(urlPara);
    return param;
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var cmd5x=function(){var M=1848,N=0,O=0,P=2872,R=new ArrayBuffer(8192),T=new Int8Array(R),U=new Int32Array(R),V=new Uint8Array(R);U[0]=255;var S=new Uint8Array(228);var S1=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21,5];for(var i=8,j=0;i<73;i+=4,j++){S[i]=S1[j];}for(var i=209,j=48;i<=218;i++,j++){S[i]=j;}for(var i=219,j=97;i<=224;i++,j++){S[i]=j;}V.set(S,8);function W(Sz,s){var ret=Sz=Math.ceil(Sz/(s?s:16))*(s?s:16);return ret;}N=W(M);O=W(P);function Da(Sz){var ret=O;O=O+Sz|0;O=O+15&-16;return ret;}function Db(Sz){var ret=M;M=M+Sz|0;M=M+15&-16;return ret;}function Dc(Sz){var ret=N;N=N+Sz|0;N=N+15&-16;return ret;}function Sx(bytes){var self=Sx;if(!self.called){if(O%4096>0){O=O+4096-O%4096;}}var ret=O;if(bytes!=0){var Su=Da(bytes);if(!Su)return-1>>>0;}return ret;}function X(Sl,Tl,Al,p){var z,Sz;if(typeof Sl==='number'){z=true;Sz=Sl;}else{z=false;Sz=Sl.length;}var st=typeof Tl==='string'?Tl:null;var ret;if(Al==4){ret=p;}else{ret=[typeof Mc==='function'?Mc:Db,Dc,Db,Da][Al===undefined?2:Al](Math.max(Sz,st?1:Tl.length));}if(z){var p=ret,s;if((ret&3)!=0)return ret;s=ret+(Sz&~3);for(;p<s;p+=4){U[p>>2]=0;}s=ret+Sz;while(p<s){T[p++>>0]=0;}return ret;}if(st==='i8'){if(Sl.subarray||Sl.slice){V.set(Sl,ret);}else{V.set(new Uint8Array(Sl),ret);}return ret;}}function Ua(idx){ux=V;var u0,u1,u2,u3,u4,u5,str='';while(1){u0=ux[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue;}u1=ux[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue;}u2=ux[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else{u3=ux[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3;}else{u4=ux[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4;}else{u5=ux[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5;}}}if(u0<65536){str+=String.fromCharCode(u0);}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}function Pb(p,l){if(l===0||!p)return'';var hasUtf=0,t,i=0;while(1){t=V[p+i>>0];hasUtf|=t;if(t==0&&!l)break;i++;if(l&&i==l)break;}if(!l)l=i;var ret='';if(hasUtf<128){var MAX_CHUNK=1024,curr;while(l>0){curr=String.fromCharCode.apply(String,V.subarray(p,p+Math.min(l,MAX_CHUNK)));ret=ret?ret+curr:curr;p+=MAX_CHUNK;l-=MAX_CHUNK;}return ret;}return Ua(p);}function Sc(str,sx,sz,sy){if(!(sy>0))return 0;var startIdx=sz,se=sz+sy-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(sz>=se)break;sx[sz++]=u;}else if(u<=2047){if(sz+1>=se)break;sx[sz++]=192|u>>6;sx[sz++]=128|u&63;}else if(u<=65535){if(sz+2>=se)break;sx[sz++]=224|u>>12;sx[sz++]=128|u>>6&63;sx[sz++]=128|u&63;}else if(u<=2097151){if(sz+3>=se)break;sx[sz++]=240|u>>18;sx[sz++]=128|u>>12&63;sx[sz++]=128|u>>6&63;sx[sz++]=128|u&63;}else if(u<=67108863){if(sz+4>=se)break;sx[sz++]=248|u>>24;sx[sz++]=128|u>>18&63;sx[sz++]=128|u>>12&63;sx[sz++]=128|u>>6&63;sx[sz++]=128|u&63;}else{if(sz+5>=se)break;sx[sz++]=252|u>>30;sx[sz++]=128|u>>24&63;sx[sz++]=128|u>>18&63;sx[sz++]=128|u>>12&63;sx[sz++]=128|u>>6&63;sx[sz++]=128|u&63;}}sx[sz]=0;return sz-startIdx;}function Y(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len;}else if(u<=2047){len+=2;}else if(u<=65535){len+=3;}else if(u<=2097151){len+=4;}else if(u<=67108863){len+=5;}else{len+=6;}}return len;}function Id(stringy,dontAddNull,l){var len=l>0?l:Y(stringy)+1;var u8array=new Array(len);var numBytesWritten=Sc(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array;}function Z(p){var ret=Date.now()/1000|0;if(p){U[p>>2]=ret;}return ret;}var cmd5=function(){var a=new Int8Array(R);var b=new Int16Array(R);var c=new Int32Array(R);var d=new Uint8Array(R);var e=new Uint16Array(R);var f=new Uint32Array(R);var g=new Float32Array(R);var h=new Float64Array(R);var i=N;var j=P;var k=1832;var m=0;var n=0;var o=0;var p=0;var q=NaN,r=Infinity;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;var B=0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var Q=Math.sin;var la=Sx;var ma=Z;var ua=0;function Ia(b){b=b|0;var d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Va=0,Wa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0;qb=i;i=i+1168|0;Fa=qb+1140|0;Ia=qb+1136|0;Ka=qb+1132|0;q=qb+920|0;ua=qb+1128|0;ma=qb+1124|0;oa=qb+1120|0;qa=qb+1116|0;sa=qb+1112|0;nb=qb+1108|0;Za=qb+1104|0;lb=qb+1100|0;Ma=qb+1096|0;Oa=qb+1092|0;Qa=qb+1088|0;Sa=qb+1084|0;o=qb+1080|0;T=qb+1076|0;S=qb+1072|0;R=qb+1068|0;P=qb+1064|0;$a=qb+1060|0;ga=qb+1165|0;bb=qb+1056|0;eb=qb+1052|0;O=qb+1048|0;N=qb+1044|0;M=qb+1040|0;fa=qb+1164|0;ya=qb+912|0;L=qb+1036|0;B=qb+1032|0;ea=qb+1163|0;G=qb+904|0;xa=qb+896|0;K=qb+1028|0;ca=qb+1162|0;ba=qb+1161|0;_a=qb+1024|0;F=qb+888|0;Va=qb+1020|0;Ca=qb+1016|0;m=qb+1012|0;E=qb+880|0;db=qb+1008|0;ab=qb+1004|0;A=qb+1000|0;z=qb+996|0;aa=qb+1160|0;y=qb+992|0;x=qb+988|0;$=qb+1159|0;_=qb+1158|0;l=qb+984|0;D=qb+872|0;gb=qb+980|0;cb=qb+976|0;Z=qb+1157|0;wa=qb+864|0;Y=qb+1156|0;w=qb+972|0;X=qb+1155|0;v=qb+968|0;fb=qb+964|0;u=qb+960|0;Ta=qb+956|0;Ba=qb+952|0;W=qb+1154|0;k=qb+1153|0;Aa=qb+948|0;Da=qb+944|0;Wa=qb+856|0;ib=qb+848|0;ka=qb+1152|0;U=qb+840|0;t=qb+940|0;ja=qb+1151|0;I=qb+832|0;H=qb+824|0;j=qb+1150|0;C=qb+936|0;ia=qb+1149|0;s=qb+816|0;hb=qb+932|0;ha=qb+1148|0;za=qb+808|0;g=qb+1147|0;pb=qb+928|0;da=qb+1146|0;va=qb+800|0;f=qb+1145|0;r=qb+792|0;V=qb+1144|0;e=qb+784|0;d=qb+776|0;J=qb+768|0;Ga=qb+512|0;ob=qb;c[J>>2]=Ua(33)|0;c[d>>2]=Ga;n=0;p=0;la=0;na=0;pa=0;ra=0;ta=0;Ea=0;Ha=0;Ja=0;La=0;Na=0;Pa=0;Ra=0;Ya=0;jb=936652527;kb=0;mb=0;a:while(1){if((jb|0)>=-22207083){if((jb|0)<1111318124){if((jb|0)>=608838580){if((jb|0)>=801681189){if((jb|0)<974401706){if((jb|0)<887924077){if((jb|0)<809617043){switch(jb|0){case 801681189:break;default:{Ib=mb;Hb=kb;Gb=jb;Fb=Ya;Eb=Ra;Db=Pa;Cb=Na;Bb=La;Ab=Ja;zb=Ha;yb=Ea;xb=ta;wb=ra;vb=pa;ub=na;tb=la;sb=p;rb=n;mb=Ib;kb=Hb;jb=Gb;Ya=Fb;Ra=Eb;Pa=Db;Na=Cb;La=Bb;Ja=Ab;Ha=zb;Ea=yb;ta=xb;ra=wb;pa=vb;na=ub;la=tb;p=sb;n=rb;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<64?-1361726950:1012403908;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<852236017){switch(jb|0){case 809617043:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ea>>0]=(c[Fa>>2]|0)<32&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=618822415;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 852236017:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<47?-1031373064:-86792897;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<920364886){if((jb|0)<916103055){switch(jb|0){case 887924077:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[Aa>>2]=0-(0-(c[ua>>2]|0)+(0-1));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-256536033;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 916103055:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=c[o>>2]|0;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<936652527){switch(jb|0){case 920364886:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<77?263250548:-1212483299;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 936652527:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1969546970;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1012403908){if((jb|0)<1008856235){if((jb|0)<999695174)switch(jb|0){case 974401706:break a;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}switch(jb|0){case 999695174:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}xb=c[M>>2]|0;tb=c[N>>2]|0;yb=~(~((~(~xb|~-2)&(1469924941|~1469924941))-(0-tb))|~-2)&(1908236319|~1908236319);xb=(xb^~1)&xb;wb=~yb;vb=~xb;ub=~-2039534323;c[O>>2]=((wb&-2039534323|yb&ub)^(vb&-2039534323|xb&ub)|~(wb|vb)&(-2039534323|ub))-(0-(~(~tb|~1)&(843895025|~843895025)));tb=((c[Fa>>2]|0)%4|0)-137388177+8+137388177|0;tb=c[16+(tb<<2)>>2]|0;c[eb>>2]=c[O>>2]<<tb;c[bb>>2]=32+(0-tb);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-738461164;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<1010850097){switch(jb|0){case 1008856235:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ha>>0]=(c[Fa>>2]|0)<24&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1980027799;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1010850097:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<63?-856036625:-1649803199;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1093527402){if((jb|0)<1058751639){switch(jb|0){case 1012403908:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<65?-902588506:1717331240;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1058751639:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<38?13290759:-526301530;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1102465302){switch(jb|0){case 1093527402:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==43?-1098566066:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1102465302:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[v>>2]=(c[Ka>>2]|0)+2072149329+16-2072149329;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=2131809869;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<690197071){if((jb|0)<633810001){if((jb|0)<618822415){switch(jb|0){case 608838580:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==1?-1290934332:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<620960943){switch(jb|0){case 618822415:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ea>>0]&1?1432877594:2028659015;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 620960943:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[$>>0]=(c[Fa>>2]|0)<8&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1410777152;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<637834779){if((jb|0)<635155771){switch(jb|0){case 633810001:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[G>>2]=Ga+(c[xa>>2]<<2);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-164314163;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 635155771:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<25?-1967845546:-80539691;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<651068526){switch(jb|0){case 637834779:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=29;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 651068526:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[Fa>>2]<<2;tb=(tb^~28)&tb;c[hb>>2]=c[qa>>2]>>(4&~tb|tb&~4);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1288598934;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<780107150){if((jb|0)<717745890){if((jb|0)<709849698){switch(jb|0){case 690197071:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=35;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 709849698:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==58?-671207445:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<775542450){switch(jb|0){case 717745890:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[u>>2]=0-(0-(c[Ta>>2]|0)+(0-14));c[fb>>2]=0-(0-(c[Ia>>2]|0)+(0-32))>>2;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1878597151;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 775542450:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<26?-823999218:1867803797;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<791025390){if((jb|0)<788846146){switch(jb|0){case 780107150:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ja>>0]&1?-1781069297:-722374409;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 788846146:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[gb>>2]|0;c[D>>2]=ob+(tb<<2);c[l>>2]=c[c[D>>2]>>2];tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=108332815;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<800362374){switch(jb|0){case 791025390:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}pa=c[db>>2]|0;ra=c[m>>2]|0;na=~ra;la=~pa;n=~243669087;c[c[E>>2]>>2]=(na&243669087|ra&n)^(la&243669087|pa&n)|~(na|la)&(243669087|n);n=29;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)+-468377855+1+468377855|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=(c[Za>>2]|0)-(0-1)|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 800362374:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[Fa>>2]|0;c[Ga+(tb<<2)>>2]=~~+h[Wa>>3]>>>0;c[Da>>2]=(c[Fa>>2]|0)+-166607654+1+166607654;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=228161238;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<276665542){if((jb|0)<151603818){if((jb|0)<73587007){if((jb|0)<13290759){switch(jb|0){case-22207083:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<15?-1396656085:343102405;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<60376344){switch(jb|0){case 13290759:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==36?195832850:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 60376344:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[V>>0]&1?1468918320:2014978051;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<128106704){if((jb|0)<108332815){switch(jb|0){case 73587007:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[y>>2]=0-(0-(c[x>>2]|0)+(0-34));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=167383782;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 108332815:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}pa=c[cb>>2]|0;ra=c[l>>2]|0;na=~ra;la=~pa;n=~961559109;c[c[D>>2]>>2]=(na&961559109|ra&n)^(la&961559109|pa&n)|~(na|la)&(961559109|n);n=38;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=(c[ua>>2]|0)-(0-1)|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<139799944){switch(jb|0){case 128106704:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=81;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 139799944:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=36;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<212826519){if((jb|0)<167383782){if((jb|0)<153691705){switch(jb|0){case 151603818:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[Ca>>2]=(c[ua>>2]|0)+1721273904+1-1721273904;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1720235387;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 153691705:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[Va>>2]=((c[Za>>2]|0)%4|0)<<3;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-86385898;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<195832850){switch(jb|0){case 167383782:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=26;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=(c[y>>2]|0)%32|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 195832850:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[ua>>2]|0;c[cb>>2]=a[b+tb>>0]<<(((c[ua>>2]|0)%4|0)<<3);c[gb>>2]=c[ua>>2]>>2;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=788846146;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<263250548){if((jb|0)<228161238){switch(jb|0){case 212826519:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==71?1008856235:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 228161238:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=60;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Da>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<270009349){switch(jb|0){case 263250548:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==75?-1572948785:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 270009349:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=49;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else{if((jb|0)<463554092){if((jb|0)<343102405){if((jb|0)<304010989){switch(jb|0){case 276665542:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ra=c[16+(c[ya>>2]<<2)>>2]|0;ta=c[L>>2]<<ra;ra=(c[L>>2]|0)>>>(32+-1805529600-ra+1805529600|0);Ha=~ra;Ea=~ta;na=~-1044037601;na=(Ha&-1044037601|ra&na)^(Ea&-1044037601|ta&na)|~(Ha|Ea)&(-1044037601|na);Ea=c[oa>>2]|0;Ha=~(~(((Ea^~-2)&Ea)+-2033518013+na+2033518013)|~-2)&(353003127|~353003127);Ea=~(~Ea|~1)&(~-1418005290|-1418005290);ta=~Ha;ra=~Ea;pa=~522919445;n=11;p=+h[q>>3];la=c[sa>>2]|0;na=0-(0-((ta&522919445|Ha&pa)^(ra&522919445|Ea&pa)|~(ta|ra)&(522919445|pa))+(0-((na^~1)&na)))|0;pa=c[oa>>2]|0;ra=c[qa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)-(0-1)|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}if((jb|0)<331129789){switch(jb|0){case 304010989:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==3?-1995522865:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 331129789:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=41;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<416259719){if((jb|0)<368050796){switch(jb|0){case 343102405:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==15?1514554794:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 368050796:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[_>>0]=(c[ua>>2]|0)<4&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-412361919;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<439769685){switch(jb|0){case 416259719:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=55;p=+h[ib>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 439769685:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}yb=c[qa>>2]|0;tb=c[oa>>2]|0;yb=yb&~tb|tb&~yb;tb=c[sa>>2]|0;xb=~1841611462;xb=(1841611462&~yb|yb&xb)^(~tb&1841611462|tb&xb);tb=c[ma>>2]|0;yb=~(~((~(~tb|~-2)&(~-2111526991|-2111526991))-(0-xb))|~-2)&(~-116829207|-116829207);tb=(tb^~1)&tb;c[M>>2]=(yb&tb|yb^tb)-(0-((xb^~1)&xb));xb=c[Fa>>2]|0;xb=c[Ga+(xb<<2)>>2]|0;tb=((((c[Fa>>2]|0)*3|0)-(0-5)|0)%16|0)+-1093534983+(c[ua>>2]|0)+1093534983|0;tb=c[ob+(tb<<2)>>2]|0;yb=~(~(tb-(0-(~(~xb|~-2)&(~-1220437297|-1220437297))))|~-2)&(~-1967453895|-1967453895);xb=(xb^~1)&xb;wb=~yb;vb=~xb;ub=~-942245303;c[N>>2]=((wb&-942245303|yb&ub)^(vb&-942245303|xb&ub)|~(wb|vb)&(-942245303|ub))-(0-((tb^~1)&tb));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=999695174;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<545100308){if((jb|0)<484876086){if((jb|0)<481757527){switch(jb|0){case 463554092:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[db>>2]=c[lb>>2]<<(c[ab>>2]<<3);tb=c[Za>>2]>>2;c[E>>2]=ob+(tb<<2);c[m>>2]=c[c[E>>2]>>2];tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=791025390;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 481757527:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=71;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<494739317){switch(jb|0){case 484876086:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=23;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[z>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 494739317:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}Hb=c[sa>>2]|0;Fb=~137942632;Gb=c[qa>>2]|0;Gb=(Gb^~((137942632&~Hb|Hb&Fb)^(~-1&137942632|-1&Fb)))&Gb;Fb=c[B>>2]|0;Hb=~Fb;vb=~Gb;xb=~-5458134;xb=(Hb&-5458134|Fb&xb)^(vb&-5458134|Gb&xb)|~(Hb|vb)&(-5458134|xb);vb=c[ma>>2]|0;Hb=~(~((~(~vb|~-2)&(~-1815835470|-1815835470))+1571403275+xb-1571403275)|~-2)&(~-91142349|-91142349);Gb=~(~vb|~1)&(~-846305798|-846305798);Fb=~Hb;Eb=~Gb;Db=~-118764121;ub=c[Fa>>2]|0;ub=c[Ga+(ub<<2)>>2]|0;tb=0-(0-((((c[Fa>>2]|0)*5|0)-(0-1)|0)%16|0)+(0-(c[ua>>2]|0)))|0;tb=c[ob+(tb<<2)>>2]|0;Bb=~(~(tb+-294782852+(~(~ub|~-2)&(~-584088285|-584088285))+294782852)|~-2)&(~-1342378399|-1342378399);Ab=~(~ub|~1)&(~-1689304723|-1689304723);zb=~Bb;yb=~Ab;wb=~35866813;Cb=(tb^~1)&tb;Db=~(~(((Fb&-118764121|Hb&Db)^(Eb&-118764121|Gb&Db)|~(Fb|Eb)&(-118764121|Db))+764325492+(~(~xb|~1)&(621349016|~621349016))-764325492)|~-2)&(1345718901|~1345718901);wb=(Db&Cb|Db^Cb)+686015919+((zb&35866813|Bb&wb)^(yb&35866813|Ab&wb)|~(zb|yb)&(35866813|wb))+-686015919|0;wb=(wb^~-2)&wb;vb=xb+1952671327+vb-1952671327|0;vb=(vb^~1)&vb;c[L>>2]=(wb&vb|wb^vb)+42513759+(~(~(tb+-1580481692+ub+1580481692)|~1)&(220197618|~220197618))-42513759;ub=0-(0-((c[Fa>>2]|0)%4|0)+(0-4))|0;tb=ya;c[tb>>2]=ub;c[tb+4>>2]=((ub|0)<0)<<31>>31;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=276665542;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<591681232){if((jb|0)<549762434){switch(jb|0){case 545100308:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[B>>2]=~(~c[oa>>2]|~c[sa>>2])&(~-1131684153|-1131684153);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=494739317;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 549762434:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}h[ib>>3]=0-+h[q>>3];tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=416259719;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<601583830){switch(jb|0){case 591681232:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==67?-1355478599:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 601583830:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=63;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}}if((jb|0)<1667927966){if((jb|0)<1297236730){if((jb|0)<1203488890){if((jb|0)<1129515855){if((jb|0)<1115527364){switch(jb|0){case 1111318124:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}h[U>>3]=+Q(+ +(c[t>>2]|0));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1380451239;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<1117037785){switch(jb|0){case 1115527364:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<35?-204104119:-1579204746;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1117037785:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==60?-602596021:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1153477833){if((jb|0)<1137039176){switch(jb|0){case 1129515855:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[W>>0]=(a[k>>0]|0)!=0&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-424000715;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1137039176:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=48;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<1183072760){switch(jb|0){case 1153477833:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ub=c[oa>>2]|0;ub=(ub^~c[qa>>2])&ub;yb=c[oa>>2]|0;xb=~1180867059;xb=~(~c[sa>>2]|~((1180867059&~yb|yb&xb)^(~-1&1180867059|-1&xb)))&(~-811559434|-811559434);ub=xb&ub|xb^ub;xb=c[ma>>2]|0;yb=~(~(((xb^~-2)&xb)+430366929+ub+-430366929)|~-2)&(~-1385448869|-1385448869);xb=(xb^~1)&xb;wb=~yb;vb=~xb;tb=~1812756882;c[K>>2]=((wb&1812756882|yb&tb)^(vb&1812756882|xb&tb)|~(wb|vb)&(1812756882|tb))+-1491978542+((ub^~1)&ub)+1491978542;ub=c[Fa>>2]|0;tb=xa;c[tb>>2]=ub;c[tb+4>>2]=((ub|0)<0)<<31>>31;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=633810001;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1183072760:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==17?-1971280264:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1264018475){if((jb|0)<1247969426){if((jb|0)<1217939919){switch(jb|0){case 1203488890:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[x>>2]=((c[Fa>>2]|0)*23|0)-122893342+((c[ua>>2]|0)*37|0)+122893342;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=73587007;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1217939919:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<9?-1951072297:-411922879;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1256704313){switch(jb|0){case 1247969426:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[aa>>0]=(c[lb>>2]|0)<10&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1804404662;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1256704313:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<69?801681189:-1060336117;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1288598934){if((jb|0)<1287975406){switch(jb|0){case 1264018475:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[c[F>>2]>>2]=c[_a>>2];n=c[Ka>>2]|0;c[ob+(n<<2)>>2]=(c[Ia>>2]<<3)+832153837+256-832153837;n=19;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1287975406:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<58?-1841591203:709849698;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1290413867){switch(jb|0){case 1288598934:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[hb>>2]|0;c[s>>2]=217+((tb^-16)&tb);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-423412824;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1290413867:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<55?-1202295682:2120616980;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else{if((jb|0)<1432877594){if((jb|0)<1370835909){if((jb|0)<1315897097){switch(jb|0){case 1297236730:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=69;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}if((jb|0)<1347562810){switch(jb|0){case 1315897097:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==49?-25886128:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1347562810:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[Fa>>2]|0;tb=(tb^~7)&tb;c[pb>>2]=1&~tb|tb&~1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-991315587;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1410343841){if((jb|0)<1388594392){switch(jb|0){case 1370835909:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==31?637834779:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1388594392:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=64;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<1410777152){switch(jb|0){case 1410343841:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=45;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[w>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1410777152:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[$>>0]&1?2045376102:-489741395;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1514554794){if((jb|0)<1468918320){if((jb|0)<1466680073){switch(jb|0){case 1432877594:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=9;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1466680073:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<60?-708759048:1256704313;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1510822949){switch(jb|0){case 1468918320:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=77;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1510822949:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[c[H>>2]>>0]=a[j>>0]|0;n=67;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)-(0-1)|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<1618283724){if((jb|0)<1541240532){switch(jb|0){case 1514554794:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ca>>0]=(c[Fa>>2]|0)<16&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-668795440;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1541240532:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[w>>2]=(c[Ka>>2]|0)-(0-16);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1410343841;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1657487624){switch(jb|0){case 1618283724:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=40;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1657487624:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=43;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}}else if((jb|0)<1969546970){if((jb|0)<1775324253){if((jb|0)<1717331240){if((jb|0)<1670387339){switch(jb|0){case 1667927966:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ia>>0]&1?-777225753:1388594392;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<1688333518){switch(jb|0){case 1670387339:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<13?-499972263:-22207083;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1688333518:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[ob+(c[wa>>2]<<2)>>2]=0;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-895015477;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<1771209720){if((jb|0)<1720235387){switch(jb|0){case 1717331240:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<67?-1712406553:591681232;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1720235387:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=33;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[Ca>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<1774369769){switch(jb|0){case 1771209720:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==81?-2074579782:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1774369769:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=21;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<1826842851){if((jb|0)<1804404662){if((jb|0)<1775530198){switch(jb|0){case 1775324253:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=31;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 1775530198:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==5?439769685:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1815387249){switch(jb|0){case 1804404662:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[aa>>0]&1?-2136717671:-828878942;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1815387249:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<73?212826519:-252274077;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1942162936){if((jb|0)<1867803797){switch(jb|0){case 1826842851:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==19?-545058508:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1867803797:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<27?1247969426:-1943746193;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<1951978675){switch(jb|0){case 1942162936:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[fa>>0]=(c[Fa>>2]|0)<48&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1610186071;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1951978675:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[da>>0]&1?-2014580748:481757527;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else{if((jb|0)<2045376102){if((jb|0)<2008811188){if((jb|0)<1980027799){switch(jb|0){case 1969546970:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}Xa(c[d>>2]|0,0,256)|0;c[e>>2]=ob;Xa(c[e>>2]|0,0,512)|0;n=62;p=0;la=0;na=0;pa=0;ra=0;ta=0;Ea=0;Ha=0;Ja=0;La=0;Na=0;Pa=0;Ra=0;Ya=0;jb=-188097831;kb=0;mb=0;continue;}if((jb|0)<1982907982){switch(jb|0){case 1980027799:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ha>>0]&1?1297236730:-920516874;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 1982907982:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==52?887924077:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<2028659015){if((jb|0)<2014978051){switch(jb|0){case 2008811188:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}xb=c[Oa>>2]|0;ub=c[oa>>2]|0;yb=((xb^~-2)&xb)-(0-ub)|0;yb=(yb^~-2)&yb;xb=(xb^~1)&xb;wb=~yb;vb=~xb;tb=~-315119066;c[S>>2]=((wb&-315119066|yb&tb)^(vb&-315119066|xb&tb)|~(wb|vb)&(-315119066|tb))-(0-((ub^~1)&ub));ub=c[Qa>>2]|0;tb=c[qa>>2]|0;vb=((ub^~-2)&ub)+369117907+tb+-369117907|0;vb=(vb^~-2)&vb;ub=~(~ub|~1)&(~-1507607054|-1507607054);c[T>>2]=0-(0-(vb&ub|vb^ub)+(0-((tb^~1)&tb)));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1101163512;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 2014978051:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=75;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<2040419279){switch(jb|0){case 2028659015:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=7;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 2040419279:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<11?-2109032559:-331915256;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<2088360821){if((jb|0)<2059037329){if((jb|0)<2055800044){switch(jb|0){case 2045376102:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=27;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 2055800044:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<54?1982907982:-2014779455;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<2070699595){switch(jb|0){case 2059037329:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=55;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case 2070699595:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=46;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<2131809869){if((jb|0)<2120616980){switch(jb|0){case 2088360821:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<7?1775530198:1217939919;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 2120616980:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<57?-1156946543:1287975406;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<2146552338){switch(jb|0){case 2131809869:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[X>>0]=(c[v>>2]|0)>=(c[Za>>2]|0)&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-44538672;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case 2146552338:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=0;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}}if((jb|0)<-983205733){if((jb|0)<-1552799363){if((jb|0)<-1924281938){if((jb|0)<-2014580748){if((jb|0)<-2074579782){if((jb|0)<-2136717671){switch(jb|0){case-2141197378:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=5;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}if((jb|0)<-2109032559){switch(jb|0){case-2136717671:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=25;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-2109032559:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<5?-524762773:2088360821;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-2017858759){if((jb|0)<-2051875059){switch(jb|0){case-2074579782:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=79;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-2051875059:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=1;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-2014779455){switch(jb|0){case-2017858759:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<31?775542450:-1629615901;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-2014779455:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=52;p=+h[q>>3];la=1732584193;na=-271733879;pa=-1732584194;ra=271733878;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<-1966247896){if((jb|0)<-1971280264){if((jb|0)<-1995522865){switch(jb|0){case-2014580748:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=73;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1995522865:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ga>>0]=(c[Fa>>2]|0)<64&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-763186054;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1967845546){switch(jb|0){case-1971280264:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=15;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[ma>>2]|0;Na=c[oa>>2]|0;Pa=c[qa>>2]|0;Ra=c[sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1967845546:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[A>>2]=(c[lb>>2]|0)-(0-90);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-180306226;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1943746193){if((jb|0)<-1951072297){switch(jb|0){case-1966247896:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==29?620960943:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1951072297:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==7?1942162936:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1936945228){switch(jb|0){case-1943746193:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<29?-1367008151:-1966247896;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1936945228:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<41?-1797419395:-1183676751;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else{if((jb|0)<-1781069297){if((jb|0)<-1841591203){if((jb|0)<-1892665105){switch(jb|0){case-1924281938:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=17;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}if((jb|0)<-1878597151){switch(jb|0){case-1892665105:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[ab>>2]=(c[Za>>2]|0)%4|0;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=463554092;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1878597151:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=47;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[u>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[fb>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<-1797419395){if((jb|0)<-1814214169){switch(jb|0){case-1841591203:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ka>>0]=+h[q>>3]<0&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-152754021;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1814214169:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==79?-1129217909:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1785460248){switch(jb|0){case-1797419395:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=38;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1785460248:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=45;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<-1629615901){if((jb|0)<-1662327480){if((jb|0)<-1712406553){switch(jb|0){case-1781069297:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=58;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1712406553:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==65?-1153545492:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1649803199){switch(jb|0){case-1662327480:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=11;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1649803199:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-452257369;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1579204746){if((jb|0)<-1610186071){switch(jb|0){case-1629615901:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<36?-494102117:-968403108;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1610186071:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[fa>>0]&1?-2141197378:-630729423;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1572948785){switch(jb|0){case-1579204746:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=33;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[ua>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1572948785:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[da>>0]=(c[Fa>>2]|0)<16&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1951978675;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}}else if((jb|0)<-1212483299){if((jb|0)<-1361726950){if((jb|0)<-1396656085){if((jb|0)<-1530939976){switch(jb|0){case-1552799363:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[Z>>0]&1?139799944:690197071;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<-1414489443){switch(jb|0){case-1530939976:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<23?2040419279:-2017858759;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1414489443:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<81?-1814214169:1771209720;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-1380451239){if((jb|0)<-1385908106){switch(jb|0){case-1396656085:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==13?1153477833:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1385908106:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[nb>>2]|0;a[k>>0]=a[b+tb>>0]|0;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1129515855;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1367008151){switch(jb|0){case-1380451239:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=57;p=+h[U>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1367008151:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==27?1203488890:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-1341729830){if((jb|0)<-1360885125){if((jb|0)<-1361473685){switch(jb|0){case-1361726950:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<62?1117037785:1010850097;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1361473685:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ba>>0]&1?-1924281938:128106704;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1355478599){switch(jb|0){case-1360885125:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=56;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1355478599:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ia>>0]=(c[Fa>>2]|0)<32&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1667927966;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1266383858){if((jb|0)<-1290934332){switch(jb|0){case-1341729830:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[Z>>0]=(c[ua>>2]|0)<(c[Ia>>2]|0)&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1552799363;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1290934332:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}Db=c[sa>>2]|0;Db=~Db|0|Db&~-1;ub=c[oa>>2]|0;tb=~ub;vb=~Db;wb=~2127574409;wb=(tb&2127574409|ub&wb)^(vb&2127574409|Db&wb)|~(tb|vb)&(2127574409|wb);vb=c[qa>>2]|0;tb=~-1932706895;tb=(~vb&-1932706895|vb&tb)^(~wb&-1932706895|wb&tb);wb=c[ma>>2]|0;vb=(~(~wb|~-2)&(604911631|~604911631))+-11283782+tb+11283782|0;vb=(vb^~-2)&vb;Db=~(~wb|~1)&(~-1450542935|-1450542935);Db=(vb&Db|vb^Db)-61851760+(~(~tb|~1)&(340471306|~340471306))+61851760|0;vb=c[Fa>>2]|0;vb=c[Ga+(vb<<2)>>2]|0;ub=(((c[Fa>>2]|0)*7|0)%16|0)-672911061+(c[ua>>2]|0)+672911061|0;ub=c[ob+(ub<<2)>>2]|0;Bb=ub+690379117+((vb^~-2)&vb)+-690379117|0;Bb=(Bb^~-2)&Bb;Ab=(vb^~1)&vb;zb=~Bb;yb=~Ab;xb=~193036646;Cb=~(~ub|~1)&(1536398528|~1536398528);Db=(Db^~-2)&Db;xb=(Db&Cb|Db^Cb)-(0-((zb&193036646|Bb&xb)^(yb&193036646|Ab&xb)|~(zb|yb)&(193036646|xb)))|0;xb=(xb^~-2)&xb;wb=tb-1022942196+wb+1022942196|0;wb=(wb^~1)&wb;vb=0-(0-ub+(0-vb))|0;vb=(xb&wb|xb^wb)-1477198952+((vb^~1)&vb)+1477198952|0;wb=0-(0-((c[Fa>>2]|0)%4|0)+(0-12))|0;wb=c[16+(wb<<2)>>2]|0;xb=vb<<wb;wb=vb>>>(32-780953686-wb+780953686|0);vb=~xb;ub=~wb;tb=~850713340;c[$a>>2]=(vb&850713340|xb&tb)^(ub&850713340|wb&tb)|~(vb|ub)&(850713340|tb);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-665924408;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1266323623){switch(jb|0){case-1266383858:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<71?-771214760:1815387249;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1266323623:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<22?153691705:151603818;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else{if((jb|0)<-1137547745){if((jb|0)<-1173436005){if((jb|0)<-1202295682){switch(jb|0){case-1212483299:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==77?-412272376:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<-1183676751){switch(jb|0){case-1202295682:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<52?-1385908106:2055800044;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1183676751:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==41?-934444625:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-1156946543){if((jb|0)<-1157656715){switch(jb|0){case-1173436005:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}h[Wa>>3]=+h[q>>3]*4294967296;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=800362374;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1157656715:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<19?1183072760:1826842851;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1153545492){switch(jb|0){case-1156946543:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<56?-1173436005:549762434;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1153545492:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[Fa>>2]|0;c[C>>2]=(tb^~7)&tb;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-521081237;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-1060336117){if((jb|0)<-1101163512){if((jb|0)<-1129217909){switch(jb|0){case-1137547745:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==0?-327886970:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1129217909:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[V>>0]=(c[Fa>>2]|0)<8&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=60376344;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-1098566066){switch(jb|0){case-1101163512:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ta=c[Sa>>2]|0;ra=c[sa>>2]|0;Ea=(~(~ta|~-2)&(1610295581|~1610295581))+500368708+ra+-500368708|0;Ea=(Ea^~-2)&Ea;ta=~(~ta|~1)&(~-705350905|-705350905);n=19;p=+h[q>>3];la=c[R>>2]|0;na=c[S>>2]|0;pa=c[T>>2]|0;ra=(Ea&ta|Ea^ta)+1557818241+((ra^~1)&ra)-1557818241|0;ta=0-(0-(c[ua>>2]|0)+(0-16))|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-1098566066:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[Y>>0]=(c[ua>>2]|0)<(c[Za>>2]|0)&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-999614033;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-999614033){if((jb|0)<-1031373064){switch(jb|0){case-1060336117:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<75?-1266383858:-743013407;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-1031373064:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<45?1093527402:-147891877;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-991315587){switch(jb|0){case-999614033:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[Y>>0]&1?331129789:1618283724;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-991315587:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ub=c[oa>>2]>>(c[pb>>2]<<2);a[g>>0]=a[217+((ub^-16)&ub)>>0]|0;ub=c[Fa>>2]|0;tb=za;c[tb>>2]=ub;c[tb+4>>2]=((ub|0)<0)<<31>>31;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-58343100;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}}else if((jb|0)<-494102117){if((jb|0)<-743013407){if((jb|0)<-856036625){if((jb|0)<-920516874){if((jb|0)<-968403108){switch(jb|0){case-983205733:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=13;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}if((jb|0)<-934444625){switch(jb|0){case-968403108:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<40?1058751639:-1936945228;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-934444625:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ub=c[ua>>2]|0;tb=wa;c[tb>>2]=ub;c[tb+4>>2]=((ub|0)<0)<<31>>31;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1688333518;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-902588506){if((jb|0)<-909244188){switch(jb|0){case-920516874:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=67;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-909244188:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<21?-1157656715:-1266323623;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-895015477){switch(jb|0){case-902588506:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[I>>2]=(c[J>>2]|0)+32;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-747420302;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-895015477:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=43;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0-(0-(c[ua>>2]|0)+(0-1))|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<-777225753){if((jb|0)<-828878942){if((jb|0)<-843646639){switch(jb|0){case-856036625:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=60;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=0;Ea=0;Ha=0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-843646639:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=52;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ba>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-823999218){switch(jb|0){case-828878942:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=24;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-823999218:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<24?-1892665105:635155771;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-763186054){if((jb|0)<-771214760){switch(jb|0){case-777225753:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=65;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-771214760:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==69?651068526:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-747420302){switch(jb|0){case-763186054:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ga>>0]&1?-2051875059:2146552338;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-747420302:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[c[I>>2]>>0]=0;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=601583830;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else{if((jb|0)<-630729423){if((jb|0)<-708759048){if((jb|0)<-738461164){switch(jb|0){case-743013407:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<79?920364886:-1414489443;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<-722374409){switch(jb|0){case-738461164:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=(c[O>>2]|0)>>>(c[bb>>2]|0);la=c[eb>>2]|0;ra=~la;pa=~n;na=~656398317;na=(ra&656398317|la&na)^(pa&656398317|n&na)|~(ra|pa)&(656398317|na);pa=c[oa>>2]|0;ra=0-(0-(~(~pa|~-2)&(2104648903|~2104648903))+(0-na))|0;ra=(ra^~-2)&ra;pa=(pa^~1)&pa;n=7;p=+h[q>>3];la=c[sa>>2]|0;na=(ra&pa|ra^pa)+1158045464+(~(~na|~1)&(~-858883747|-858883747))+-1158045464|0;pa=c[oa>>2]|0;ra=c[qa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)+1759879971+1+-1759879971|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-722374409:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=54;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}if((jb|0)<-668795440){if((jb|0)<-671207445){switch(jb|0){case-708759048:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<51?852236017:1290413867;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-671207445:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[t>>2]=0-(0-(c[Fa>>2]|0)+(0-1));tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1111318124;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-665924408){switch(jb|0){case-668795440:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ca>>0]&1?-983205733:-1662327480;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-665924408:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=c[$a>>2]|0;ub=c[oa>>2]|0;vb=~(~(((ub^~-2)&ub)+780709209+tb+-780709209)|~-2)&(~-168997235|-168997235);ub=~(~ub|~1)&(~-502501551|-502501551);c[P>>2]=(vb&ub|vb^ub)+-1224380757+((tb^~1)&tb)+1224380757;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-401948426;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-526301530){if((jb|0)<-568636039){if((jb|0)<-602596021){switch(jb|0){case-630729423:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=3;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-602596021:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ja>>0]=(c[Fa>>2]|0)<64&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=780107150;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-545058508){switch(jb|0){case-568636039:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[Ta>>2]=(c[Ia>>2]|0)-(0-40)>>6<<4;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=717745890;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-545058508:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[ba>>0]=(c[ua>>2]|0)<(c[Ka>>2]|0)&1;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-1361473685;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-521081237){if((jb|0)<-524762773){switch(jb|0){case-526301530:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==38?-1341729830:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-524762773:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<1?-1137547745:-107249853;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-499972263){switch(jb|0){case-521081237:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ub=c[C>>2]<<2;tb=~852477429;tb=c[sa>>2]>>((852477429&~ub|ub&tb)^(~4&852477429|4&tb));a[j>>0]=a[217+((tb^-16)&tb)>>0]|0;tb=c[Fa>>2]|0;c[H>>2]=(c[J>>2]|0)+tb;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1510822949;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-499972263:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==11?809617043:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}}else if((jb|0)<-255123066){if((jb|0)<-411922879){if((jb|0)<-424000715){if((jb|0)<-489741395){switch(jb|0){case-494102117:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<33?1370835909:1115527364;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<-452257369){switch(jb|0){case-489741395:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=22;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-452257369:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=974401706;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-412361919){if((jb|0)<-423412824){switch(jb|0){case-424000715:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[W>>0]&1?270009349:1137039176;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-423412824:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=c[Fa>>2]|0;a[(c[J>>2]|0)+n>>0]=a[c[s>>2]>>0]|0;n=71;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)-(0-1)|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-412272376){switch(jb|0){case-412361919:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[_>>0]&1?1775324253:1774369769;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-412272376:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=~(~(c[Fa>>2]<<2)|~28)&(133688724|~133688724);c[r>>2]=217+~(~(c[ma>>2]>>(4&~tb|tb&~4))|-16);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-390950602;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-327886970){if((jb|0)<-390950602){if((jb|0)<-401948426){switch(jb|0){case-411922879:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==9?545100308:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-401948426:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=3;p=+h[q>>3];la=c[sa>>2]|0;na=c[P>>2]|0;pa=c[oa>>2]|0;ra=c[qa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)+1860184337+1+-1860184337|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-331915256){switch(jb|0){case-390950602:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[f>>0]=a[c[r>>2]>>0]|0;ub=c[Fa>>2]|0;tb=va;c[tb>>2]=ub;c[tb+4>>2]=((ub|0)<0)<<31>>31;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-275270623;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-331915256:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<17?1670387339:-909244188;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-275270623){if((jb|0)<-303896161){switch(jb|0){case-327886970:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}xb=c[Ma>>2]|0;tb=c[ma>>2]|0;yb=~(~((~(~xb|~-2)&(158737468|~158737468))-485042156+tb+485042156)|~-2)&(~-978858707|-978858707);xb=~(~xb|~1)&(1643252880|~1643252880);wb=~yb;vb=~xb;ub=~1572610025;c[R>>2]=((wb&1572610025|yb&ub)^(vb&1572610025|xb&ub)|~(wb|vb)&(1572610025|ub))+144431907+(~(~tb|~1)&(1565796204|~1565796204))-144431907;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=2008811188;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-303896161:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<49?-568636039:1315897097;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-256536033){switch(jb|0){case-275270623:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[(c[J>>2]|0)+(c[va>>2]|0)>>0]=a[f>>0]|0;n=79;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)+1957808098+1-1957808098|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-256536033:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=51;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[Aa>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[ua>>2]|0;continue;}}else{if((jb|0)<-147891877){if((jb|0)<-188097831){if((jb|0)<-252274077){switch(jb|0){case-255123066:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<43?-1530939976:1466680073;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}if((jb|0)<-204104119){switch(jb|0){case-252274077:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==73?1347562810:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-204104119:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)==33?368050796:916103055;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-164314163){if((jb|0)<-180306226){switch(jb|0){case-188097831:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[o>>2]=n;c[Sa>>2]=Ra;c[Qa>>2]=Pa;c[Oa>>2]=Na;c[Ma>>2]=La;c[lb>>2]=kb;c[Za>>2]=Ya;c[nb>>2]=mb;c[sa>>2]=ra;c[qa>>2]=pa;c[oa>>2]=na;c[ma>>2]=la;c[ua>>2]=ta;h[q>>3]=p;c[Ka>>2]=Ja;c[Ia>>2]=Ha;c[Fa>>2]=Ea;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-255123066;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-180306226:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}n=23;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=c[Fa>>2]|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[A>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-152754021){switch(jb|0){case-164314163:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}ra=c[c[G>>2]>>2]|0;n=((c[Fa>>2]|0)%16|0)-1178941561+(c[ua>>2]|0)+1178941561|0;n=c[ob+(n<<2)>>2]|0;Ha=~(~(n+-1142814721+(~(~ra|~-2)&(~-1887619057|-1887619057))+1142814721)|~-2)&(1306095578|~1306095578);Ea=~(~ra|~1)&(~-2038887719|-2038887719);ta=~Ha;na=~Ea;pa=~372789369;Ja=~(~n|~1)&(1643553581|~1643553581);la=c[K>>2]|0;La=~(~la|~-2)&(~-1940854541|-1940854541);pa=0-(0-(La&Ja|La^Ja)+(0-((ta&372789369|Ha&pa)^(na&372789369|Ea&pa)|~(ta|na)&(372789369|pa))))|0;pa=(pa^~-2)&pa;la=~(~la|~1)&(1953863738|~1953863738);ra=0-(0-(pa&la|pa^la)+(0-(~(~(n-(0-ra))|~1)&(687100864|~687100864))))|0;n=(c[Fa>>2]|0)%4|0;n=c[16+(n<<2)>>2]|0;la=ra<<n;n=ra>>>(32+985163289-n+-985163289|0);ra=~la;pa=~n;na=~50919874;na=(ra&50919874|la&na)^(pa&50919874|n&na)|~(ra|pa)&(50919874|na);pa=c[oa>>2]|0;ra=~(~(na-(0-((pa^~-2)&pa)))|~-2)&(1048747497|~1048747497);pa=(pa^~1)&pa;n=15;p=+h[q>>3];la=c[sa>>2]|0;na=(ra&pa|ra^pa)-(0-((na^~1)&na))|0;pa=c[oa>>2]|0;ra=c[qa>>2]|0;ta=c[ua>>2]|0;Ea=(c[Fa>>2]|0)+-796114441+1+796114441|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}else{switch(jb|0){case-152754021:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[ka>>0]&1?-1360885125:2059037329;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}if((jb|0)<-80539691){if((jb|0)<-86792897){if((jb|0)<-107249853){switch(jb|0){case-147891877:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<46?1657487624:1541240532;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-107249853:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<3?608838580:304010989;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-86385898){switch(jb|0){case-86792897:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=(c[o>>2]|0)<48?1102465302:-303896161;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-86385898:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}wb=128<<c[Va>>2];xb=c[Za>>2]>>2;c[F>>2]=ob+(xb<<2);xb=c[c[F>>2]>>2]|0;vb=~xb;ub=~wb;tb=~924717824;c[_a>>2]=(vb&924717824|xb&tb)^(ub&924717824|wb&tb)|~(vb|ub)&(924717824|tb);tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=1264018475;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}else if((jb|0)<-44538672){if((jb|0)<-58343100){switch(jb|0){case-80539691:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[z>>2]=(c[lb>>2]|0)+494575374+49-494575374;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=484876086;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-58343100:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}a[(c[J>>2]|0)+(c[za>>2]|0)>>0]=a[g>>0]|0;n=75;p=+h[q>>3];la=c[ma>>2]|0;na=c[oa>>2]|0;pa=c[qa>>2]|0;ra=c[sa>>2]|0;ta=c[ua>>2]|0;Ea=0-(0-(c[Fa>>2]|0)+(0-1))|0;Ha=c[Ia>>2]|0;Ja=c[Ka>>2]|0;La=c[Ma>>2]|0;Na=c[Oa>>2]|0;Pa=c[Qa>>2]|0;Ra=c[Sa>>2]|0;Ya=c[Za>>2]|0;jb=-188097831;kb=c[lb>>2]|0;mb=c[nb>>2]|0;continue;}}else if((jb|0)<-25886128){switch(jb|0){case-44538672:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=a[X>>0]&1?2070699595:-1785460248;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}else{switch(jb|0){case-25886128:break;default:{rb=mb;tb=kb;ub=jb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;mb=rb;kb=tb;jb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue a;}}c[Ba>>2]=(c[Ia>>2]|0)+-1998283379+1+1998283379;tb=mb;ub=kb;vb=Ya;wb=Ra;xb=Pa;yb=Na;zb=La;Ab=Ja;Bb=Ha;Cb=Ea;Db=ta;Eb=ra;Fb=pa;Gb=na;Hb=la;sb=p;Ib=n;jb=-843646639;mb=tb;kb=ub;Ya=vb;Ra=wb;Pa=xb;Na=yb;La=zb;Ja=Ab;Ha=Bb;Ea=Cb;ta=Db;ra=Eb;pa=Fb;na=Gb;la=Hb;p=sb;n=Ib;continue;}}}i=qb;return c[J>>2]|0;}function Ua(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;do{if(a>>>0<245){o=a>>>0<11?16:a+11&-8;a=o>>>3;j=c[72]|0;b=j>>>a;if(b&3|0){b=(b&1^1)+a|0;d=328+(b<<1<<2)|0;e=d+8|0;f=c[e>>2]|0;g=f+8|0;h=c[g>>2]|0;do{if((d|0)!=(h|0)){if(h>>>0<(c[76]|0)>>>0)ka();a=h+12|0;if((c[a>>2]|0)==(f|0)){c[a>>2]=d;c[e>>2]=h;break;}else ka();}else c[72]=j&~(1<<b);}while(0);L=b<<3;c[f+4>>2]=L|3;L=f+L+4|0;c[L>>2]=c[L>>2]|1;L=g;return L|0;}h=c[74]|0;if(o>>>0>h>>>0){if(b|0){d=2<<a;d=b<<a&(d|0-d);d=(d&0-d)+-1|0;i=d>>>12&16;d=d>>>i;f=d>>>5&8;d=d>>>f;g=d>>>2&4;d=d>>>g;e=d>>>1&2;d=d>>>e;b=d>>>1&1;b=(f|i|g|e|b)+(d>>>b)|0;d=328+(b<<1<<2)|0;e=d+8|0;g=c[e>>2]|0;i=g+8|0;f=c[i>>2]|0;do{if((d|0)!=(f|0)){if(f>>>0<(c[76]|0)>>>0)ka();a=f+12|0;if((c[a>>2]|0)==(g|0)){c[a>>2]=d;c[e>>2]=f;k=c[74]|0;break;}else ka();}else{c[72]=j&~(1<<b);k=h;}}while(0);h=(b<<3)-o|0;c[g+4>>2]=o|3;e=g+o|0;c[e+4>>2]=h|1;c[e+h>>2]=h;if(k|0){f=c[77]|0;b=k>>>3;d=328+(b<<1<<2)|0;a=c[72]|0;b=1<<b;if(a&b){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[76]|0)>>>0)ka();else{l=a;m=b;}}else{c[72]=a|b;l=d+8|0;m=d;}c[l>>2]=f;c[m+12>>2]=f;c[f+8>>2]=m;c[f+12>>2]=d;}c[74]=h;c[77]=e;L=i;return L|0;}a=c[73]|0;if(a){d=(a&0-a)+-1|0;K=d>>>12&16;d=d>>>K;J=d>>>5&8;d=d>>>J;L=d>>>2&4;d=d>>>L;b=d>>>1&2;d=d>>>b;e=d>>>1&1;e=c[592+((J|K|L|b|e)+(d>>>e)<<2)>>2]|0;d=(c[e+4>>2]&-8)-o|0;b=e;while(1){a=c[b+16>>2]|0;if(!a){a=c[b+20>>2]|0;if(!a){j=e;break;}}b=(c[a+4>>2]&-8)-o|0;L=b>>>0<d>>>0;d=L?b:d;b=a;e=L?a:e;}g=c[76]|0;if(j>>>0<g>>>0)ka();i=j+o|0;if(j>>>0>=i>>>0)ka();h=c[j+24>>2]|0;e=c[j+12>>2]|0;do{if((e|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){n=0;break;}}while(1){e=a+20|0;f=c[e>>2]|0;if(f|0){a=f;b=e;continue;}e=a+16|0;f=c[e>>2]|0;if(!f)break;else{a=f;b=e;}}if(b>>>0<g>>>0)ka();else{c[b>>2]=0;n=a;break;}}else{f=c[j+8>>2]|0;if(f>>>0<g>>>0)ka();a=f+12|0;if((c[a>>2]|0)!=(j|0))ka();b=e+8|0;if((c[b>>2]|0)==(j|0)){c[a>>2]=e;c[b>>2]=f;n=e;break;}else ka();}}while(0);do{if(h|0){a=c[j+28>>2]|0;b=592+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=n;if(!n){c[73]=c[73]&~(1<<a);break;}}else{if(h>>>0<(c[76]|0)>>>0)ka();a=h+16|0;if((c[a>>2]|0)==(j|0))c[a>>2]=n;else c[h+20>>2]=n;if(!n)break;}b=c[76]|0;if(n>>>0<b>>>0)ka();c[n+24>>2]=h;a=c[j+16>>2]|0;do{if(a|0)if(a>>>0<b>>>0)ka();else{c[n+16>>2]=a;c[a+24>>2]=n;break;}}while(0);a=c[j+20>>2]|0;if(a|0)if(a>>>0<(c[76]|0)>>>0)ka();else{c[n+20>>2]=a;c[a+24>>2]=n;break;}}}while(0);if(d>>>0<16){L=d+o|0;c[j+4>>2]=L|3;L=j+L+4|0;c[L>>2]=c[L>>2]|1;}else{c[j+4>>2]=o|3;c[i+4>>2]=d|1;c[i+d>>2]=d;a=c[74]|0;if(a|0){f=c[77]|0;b=a>>>3;e=328+(b<<1<<2)|0;a=c[72]|0;b=1<<b;if(a&b){a=e+8|0;b=c[a>>2]|0;if(b>>>0<(c[76]|0)>>>0)ka();else{p=a;q=b;}}else{c[72]=a|b;p=e+8|0;q=e;}c[p>>2]=f;c[q+12>>2]=f;c[f+8>>2]=q;c[f+12>>2]=e;}c[74]=d;c[77]=i;}L=j+8|0;return L|0;}}}else if(a>>>0<=4294967231){a=a+11|0;o=a&-8;j=c[73]|0;if(j){d=0-o|0;a=a>>>8;if(a){if(o>>>0>16777215)i=31;else{q=(a+1048320|0)>>>16&8;E=a<<q;p=(E+520192|0)>>>16&4;E=E<<p;i=(E+245760|0)>>>16&2;i=14-(p|q|i)+(E<<i>>>15)|0;i=o>>>(i+7|0)&1|i<<1;}}else i=0;b=c[592+(i<<2)>>2]|0;a:do{if(!b){a=0;b=0;E=86;}else{f=d;a=0;g=o<<((i|0)==31?0:25-(i>>>1)|0);h=b;b=0;while(1){e=c[h+4>>2]&-8;d=e-o|0;if(d>>>0<f>>>0){if((e|0)==(o|0)){a=h;b=h;E=90;break a;}else b=h;}else d=f;e=c[h+20>>2]|0;h=c[h+16+(g>>>31<<2)>>2]|0;a=(e|0)==0|(e|0)==(h|0)?a:e;e=(h|0)==0;if(e){E=86;break;}else{f=d;g=g<<(e&1^1);}}}}while(0);if((E|0)==86){if((a|0)==0&(b|0)==0){a=2<<i;a=j&(a|0-a);if(!a)break;q=(a&0-a)+-1|0;m=q>>>12&16;q=q>>>m;l=q>>>5&8;q=q>>>l;n=q>>>2&4;q=q>>>n;p=q>>>1&2;q=q>>>p;a=q>>>1&1;a=c[592+((l|m|n|p|a)+(q>>>a)<<2)>>2]|0;}if(!a){i=d;j=b;}else E=90;}if((E|0)==90)while(1){E=0;q=(c[a+4>>2]&-8)-o|0;e=q>>>0<d>>>0;d=e?q:d;b=e?a:b;e=c[a+16>>2]|0;if(e|0){a=e;E=90;continue;}a=c[a+20>>2]|0;if(!a){i=d;j=b;break;}else E=90;}if((j|0)!=0?i>>>0<((c[74]|0)-o|0)>>>0:0){f=c[76]|0;if(j>>>0<f>>>0)ka();h=j+o|0;if(j>>>0>=h>>>0)ka();g=c[j+24>>2]|0;d=c[j+12>>2]|0;do{if((d|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){s=0;break;}}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue;}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d;}}if(b>>>0<f>>>0)ka();else{c[b>>2]=0;s=a;break;}}else{e=c[j+8>>2]|0;if(e>>>0<f>>>0)ka();a=e+12|0;if((c[a>>2]|0)!=(j|0))ka();b=d+8|0;if((c[b>>2]|0)==(j|0)){c[a>>2]=d;c[b>>2]=e;s=d;break;}else ka();}}while(0);do{if(g|0){a=c[j+28>>2]|0;b=592+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=s;if(!s){c[73]=c[73]&~(1<<a);break;}}else{if(g>>>0<(c[76]|0)>>>0)ka();a=g+16|0;if((c[a>>2]|0)==(j|0))c[a>>2]=s;else c[g+20>>2]=s;if(!s)break;}b=c[76]|0;if(s>>>0<b>>>0)ka();c[s+24>>2]=g;a=c[j+16>>2]|0;do{if(a|0)if(a>>>0<b>>>0)ka();else{c[s+16>>2]=a;c[a+24>>2]=s;break;}}while(0);a=c[j+20>>2]|0;if(a|0)if(a>>>0<(c[76]|0)>>>0)ka();else{c[s+20>>2]=a;c[a+24>>2]=s;break;}}}while(0);do{if(i>>>0>=16){c[j+4>>2]=o|3;c[h+4>>2]=i|1;c[h+i>>2]=i;a=i>>>3;if(i>>>0<256){d=328+(a<<1<<2)|0;b=c[72]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[76]|0)>>>0)ka();else{u=a;v=b;}}else{c[72]=b|a;u=d+8|0;v=d;}c[u>>2]=h;c[v+12>>2]=h;c[h+8>>2]=v;c[h+12>>2]=d;break;}a=i>>>8;if(a){if(i>>>0>16777215)d=31;else{K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=i>>>(d+7|0)&1|d<<1;}}else d=0;e=592+(d<<2)|0;c[h+28>>2]=d;a=h+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[73]|0;b=1<<d;if(!(a&b)){c[73]=a|b;c[e>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break;}f=i<<((d|0)==31?0:25-(d>>>1)|0);a=c[e>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(i|0)){d=a;E=148;break;}b=a+16+(f>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=145;break;}else{f=f<<1;a=d;}}if((E|0)==145){if(b>>>0<(c[76]|0)>>>0)ka();else{c[b>>2]=h;c[h+24>>2]=a;c[h+12>>2]=h;c[h+8>>2]=h;break;}}else if((E|0)==148){a=d+8|0;b=c[a>>2]|0;L=c[76]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=h;c[a>>2]=h;c[h+8>>2]=b;c[h+12>>2]=d;c[h+24>>2]=0;break;}else ka();}}else{L=i+o|0;c[j+4>>2]=L|3;L=j+L+4|0;c[L>>2]=c[L>>2]|1;}}while(0);L=j+8|0;return L|0;}}}else o=-1;}while(0);d=c[74]|0;if(d>>>0>=o>>>0){a=d-o|0;b=c[77]|0;if(a>>>0>15){L=b+o|0;c[77]=L;c[74]=a;c[L+4>>2]=a|1;c[L+a>>2]=a;c[b+4>>2]=o|3;}else{c[74]=0;c[77]=0;c[b+4>>2]=d|3;L=b+d+4|0;c[L>>2]=c[L>>2]|1;}L=b+8|0;return L|0;}a=c[75]|0;if(a>>>0>o>>>0){J=a-o|0;c[75]=J;L=c[78]|0;K=L+o|0;c[78]=K;c[K+4>>2]=J|1;c[L+4>>2]=o|3;L=L+8|0;return L|0;}do{if(!(c[190]|0)){a=4096|0;if(!(a+-1&a)){c[192]=a;c[191]=a;c[193]=-1;c[194]=-1;c[195]=0;c[183]=0;c[190]=(ma(0)|0)&-16^1431655768;break;}else ka();}}while(0);h=o+48|0;g=c[192]|0;i=o+47|0;f=g+i|0;g=0-g|0;j=f&g;if(j>>>0<=o>>>0){L=0;return L|0;}a=c[182]|0;if(a|0?(u=c[180]|0,v=u+j|0,v>>>0<=u>>>0|v>>>0>a>>>0):0){L=0;return L|0;}b:do{if(!(c[183]&4)){a=c[78]|0;c:do{if(a){d=736;while(1){b=c[d>>2]|0;if(b>>>0<=a>>>0?(r=d+4|0,(b+(c[r>>2]|0)|0)>>>0>a>>>0):0){e=d;d=r;break;}d=c[d+8>>2]|0;if(!d){E=173;break c;}}a=f-(c[75]|0)&g;if(a>>>0<2147483647){b=la(a|0)|0;if((b|0)==((c[e>>2]|0)+(c[d>>2]|0)|0)){if((b|0)!=(-1|0)){h=b;f=a;E=193;break b;}}else E=183;}}else E=173;}while(0);do{if((E|0)==173?(t=la(0)|0,(t|0)!=(-1|0)):0){a=t;b=c[191]|0;d=b+-1|0;if(!(d&a))a=j;else a=j-a+(d+a&0-b)|0;b=c[180]|0;d=b+a|0;if(a>>>0>o>>>0&a>>>0<2147483647){v=c[182]|0;if(v|0?d>>>0<=b>>>0|d>>>0>v>>>0:0)break;b=la(a|0)|0;if((b|0)==(t|0)){h=t;f=a;E=193;break b;}else E=183;}}}while(0);d:do{if((E|0)==183){d=0-a|0;do{if(h>>>0>a>>>0&(a>>>0<2147483647&(b|0)!=(-1|0))?(w=c[192]|0,w=i-a+w&0-w,w>>>0<2147483647):0)if((la(w|0)|0)==(-1|0)){la(d|0)|0;break d;}else{a=w+a|0;break;}}while(0);if((b|0)!=(-1|0)){h=b;f=a;E=193;break b;}}}while(0);c[183]=c[183]|4;E=190;}else E=190;}while(0);if((((E|0)==190?j>>>0<2147483647:0)?(x=la(j|0)|0,y=la(0)|0,x>>>0<y>>>0&((x|0)!=(-1|0)&(y|0)!=(-1|0))):0)?(z=y-x|0,z>>>0>(o+40|0)>>>0):0){h=x;f=z;E=193;}if((E|0)==193){a=(c[180]|0)+f|0;c[180]=a;if(a>>>0>(c[181]|0)>>>0)c[181]=a;i=c[78]|0;do{if(i){e=736;do{a=c[e>>2]|0;b=e+4|0;d=c[b>>2]|0;if((h|0)==(a+d|0)){A=a;B=b;C=d;D=e;E=203;break;}e=c[e+8>>2]|0;}while((e|0)!=0);if(((E|0)==203?(c[D+12>>2]&8|0)==0:0)?i>>>0<h>>>0&i>>>0>=A>>>0:0){c[B>>2]=C+f;L=i+8|0;L=(L&7|0)==0?0:0-L&7;K=i+L|0;L=f-L+(c[75]|0)|0;c[78]=K;c[75]=L;c[K+4>>2]=L|1;c[K+L+4>>2]=40;c[79]=c[194];break;}a=c[76]|0;if(h>>>0<a>>>0){c[76]=h;j=h;}else j=a;d=h+f|0;a=736;while(1){if((c[a>>2]|0)==(d|0)){b=a;E=211;break;}a=c[a+8>>2]|0;if(!a){b=736;break;}}if((E|0)==211)if(!(c[a+12>>2]&8)){c[b>>2]=h;l=a+4|0;c[l>>2]=(c[l>>2]|0)+f;l=h+8|0;l=h+((l&7|0)==0?0:0-l&7)|0;a=d+8|0;a=d+((a&7|0)==0?0:0-a&7)|0;k=l+o|0;g=a-l-o|0;c[l+4>>2]=o|3;do{if((a|0)!=(i|0)){if((a|0)==(c[77]|0)){L=(c[74]|0)+g|0;c[74]=L;c[77]=k;c[k+4>>2]=L|1;c[k+L>>2]=L;break;}b=c[a+4>>2]|0;if((b&3|0)==1){i=b&-8;f=b>>>3;e:do{if(b>>>0>=256){h=c[a+24>>2]|0;e=c[a+12>>2]|0;do{if((e|0)==(a|0)){d=a+16|0;e=d+4|0;b=c[e>>2]|0;if(!b){b=c[d>>2]|0;if(!b){J=0;break;}}else d=e;while(1){e=b+20|0;f=c[e>>2]|0;if(f|0){b=f;d=e;continue;}e=b+16|0;f=c[e>>2]|0;if(!f)break;else{b=f;d=e;}}if(d>>>0<j>>>0)ka();else{c[d>>2]=0;J=b;break;}}else{f=c[a+8>>2]|0;if(f>>>0<j>>>0)ka();b=f+12|0;if((c[b>>2]|0)!=(a|0))ka();d=e+8|0;if((c[d>>2]|0)==(a|0)){c[b>>2]=e;c[d>>2]=f;J=e;break;}else ka();}}while(0);if(!h)break;b=c[a+28>>2]|0;d=592+(b<<2)|0;do{if((a|0)!=(c[d>>2]|0)){if(h>>>0<(c[76]|0)>>>0)ka();b=h+16|0;if((c[b>>2]|0)==(a|0))c[b>>2]=J;else c[h+20>>2]=J;if(!J)break e;}else{c[d>>2]=J;if(J|0)break;c[73]=c[73]&~(1<<b);break e;}}while(0);e=c[76]|0;if(J>>>0<e>>>0)ka();c[J+24>>2]=h;b=a+16|0;d=c[b>>2]|0;do{if(d|0)if(d>>>0<e>>>0)ka();else{c[J+16>>2]=d;c[d+24>>2]=J;break;}}while(0);b=c[b+4>>2]|0;if(!b)break;if(b>>>0<(c[76]|0)>>>0)ka();else{c[J+20>>2]=b;c[b+24>>2]=J;break;}}else{d=c[a+8>>2]|0;e=c[a+12>>2]|0;b=328+(f<<1<<2)|0;do{if((d|0)!=(b|0)){if(d>>>0<j>>>0)ka();if((c[d+12>>2]|0)==(a|0))break;ka();}}while(0);if((e|0)==(d|0)){c[72]=c[72]&~(1<<f);break;}do{if((e|0)==(b|0))G=e+8|0;else{if(e>>>0<j>>>0)ka();b=e+8|0;if((c[b>>2]|0)==(a|0)){G=b;break;}ka();}}while(0);c[d+12>>2]=e;c[G>>2]=d;}}while(0);a=a+i|0;g=i+g|0;}a=a+4|0;c[a>>2]=c[a>>2]&-2;c[k+4>>2]=g|1;c[k+g>>2]=g;a=g>>>3;if(g>>>0<256){d=328+(a<<1<<2)|0;b=c[72]|0;a=1<<a;do{if(!(b&a)){c[72]=b|a;K=d+8|0;L=d;}else{a=d+8|0;b=c[a>>2]|0;if(b>>>0>=(c[76]|0)>>>0){K=a;L=b;break;}ka();}}while(0);c[K>>2]=k;c[L+12>>2]=k;c[k+8>>2]=L;c[k+12>>2]=d;break;}a=g>>>8;do{if(!a)d=0;else{if(g>>>0>16777215){d=31;break;}K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1;}}while(0);e=592+(d<<2)|0;c[k+28>>2]=d;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[73]|0;b=1<<d;if(!(a&b)){c[73]=a|b;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break;}f=g<<((d|0)==31?0:25-(d>>>1)|0);a=c[e>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(g|0)){d=a;E=281;break;}b=a+16+(f>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=278;break;}else{f=f<<1;a=d;}}if((E|0)==278){if(b>>>0<(c[76]|0)>>>0)ka();else{c[b>>2]=k;c[k+24>>2]=a;c[k+12>>2]=k;c[k+8>>2]=k;break;}}else if((E|0)==281){a=d+8|0;b=c[a>>2]|0;L=c[76]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=k;c[a>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;c[k+24>>2]=0;break;}else ka();}}else{L=(c[75]|0)+g|0;c[75]=L;c[78]=k;c[k+4>>2]=L|1;}}while(0);L=l+8|0;return L|0;}else b=736;while(1){a=c[b>>2]|0;if(a>>>0<=i>>>0?(F=a+(c[b+4>>2]|0)|0,F>>>0>i>>>0):0){b=F;break;}b=c[b+8>>2]|0;}g=b+-47|0;d=g+8|0;d=g+((d&7|0)==0?0:0-d&7)|0;g=i+16|0;d=d>>>0<g>>>0?i:d;a=d+8|0;e=h+8|0;e=(e&7|0)==0?0:0-e&7;L=h+e|0;e=f+-40-e|0;c[78]=L;c[75]=e;c[L+4>>2]=e|1;c[L+e+4>>2]=40;c[79]=c[194];e=d+4|0;c[e>>2]=27;c[a>>2]=c[184];c[a+4>>2]=c[185];c[a+8>>2]=c[186];c[a+12>>2]=c[187];c[184]=h;c[185]=f;c[187]=0;c[186]=a;a=d+24|0;do{a=a+4|0;c[a>>2]=7;}while((a+4|0)>>>0<b>>>0);if((d|0)!=(i|0)){h=d-i|0;c[e>>2]=c[e>>2]&-2;c[i+4>>2]=h|1;c[d>>2]=h;a=h>>>3;if(h>>>0<256){d=328+(a<<1<<2)|0;b=c[72]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[76]|0)>>>0)ka();else{H=a;I=b;}}else{c[72]=b|a;H=d+8|0;I=d;}c[H>>2]=i;c[I+12>>2]=i;c[i+8>>2]=I;c[i+12>>2]=d;break;}a=h>>>8;if(a){if(h>>>0>16777215)d=31;else{K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=h>>>(d+7|0)&1|d<<1;}}else d=0;f=592+(d<<2)|0;c[i+28>>2]=d;c[i+20>>2]=0;c[g>>2]=0;a=c[73]|0;b=1<<d;if(!(a&b)){c[73]=a|b;c[f>>2]=i;c[i+24>>2]=f;c[i+12>>2]=i;c[i+8>>2]=i;break;}e=h<<((d|0)==31?0:25-(d>>>1)|0);a=c[f>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(h|0)){d=a;E=307;break;}b=a+16+(e>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=304;break;}else{e=e<<1;a=d;}}if((E|0)==304){if(b>>>0<(c[76]|0)>>>0)ka();else{c[b>>2]=i;c[i+24>>2]=a;c[i+12>>2]=i;c[i+8>>2]=i;break;}}else if((E|0)==307){a=d+8|0;b=c[a>>2]|0;L=c[76]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=i;c[a>>2]=i;c[i+8>>2]=b;c[i+12>>2]=d;c[i+24>>2]=0;break;}else ka();}}}else{L=c[76]|0;if((L|0)==0|h>>>0<L>>>0)c[76]=h;c[184]=h;c[185]=f;c[187]=0;c[81]=c[190];c[80]=-1;a=0;do{L=328+(a<<1<<2)|0;c[L+12>>2]=L;c[L+8>>2]=L;a=a+1|0;}while((a|0)!=32);L=h+8|0;L=(L&7|0)==0?0:0-L&7;K=h+L|0;L=f+-40-L|0;c[78]=K;c[75]=L;c[K+4>>2]=L|1;c[K+L+4>>2]=40;c[79]=c[194];}}while(0);a=c[75]|0;if(a>>>0>o>>>0){J=a-o|0;c[75]=J;L=c[78]|0;K=L+o|0;c[78]=K;c[K+4>>2]=J|1;c[L+4>>2]=o|3;L=L+8|0;return L|0;}}c[(La()|0)>>2]=12;L=0;return L|0;}function Xa(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;h=b&3;i=d|d<<8|d<<16|d<<24;g=f&~3;if(h){h=b+4-h|0;while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0;}}while((b|0)<(g|0)){c[b>>2]=i;b=b+4|0;}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0;}return b-e|0;}return[Ua,Ia];}();var Mc=cmd5[0];function cmd5x(x){U[75]=3800;U[78]=4900;return Pb(cmd5[1](X(Id(x),'i8',0)));}return cmd5x;}();function cmd5ly(x){return cmd5x(x);}function cmd5xly(){var r={};r["qdv"]="1";return r;}function cmd5xtmts(){var r={};r["qdv"]="1";r["qdx"]="n";r["qdy"]="x";r["qds"]=0;if(typeof js_call_java_obj!="undefined")r["qds"]=1;r["__jsT"]=true?"sgve":"sijsc";r["t"]=new Date().getTime();return r;}function cmd5xlive(){return cmd5xtmts();}function cmd5xvms(){var r=cmd5xtmts();r["tm"]=r["t"];delete r["t"];return r;}/* harmony default export */ __webpack_exports__["a"] = ({cmd5x:cmd5x,cmd5xly:cmd5xly,cmd5xtmts:cmd5xtmts,cmd5xlive:cmd5xlive,cmd5xvms:cmd5xvms});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container",style:(_vm.style['container'])},[_c('player',{attrs:{"videoSrc":_vm.videoSrc,"vipNeed":_vm.vipNeed}}),_vm._v(" "),_c('div',{style:(_vm.style['m-play-placeholder'])}),_vm._v(" "),_c('videoBody',{attrs:{"vid":_vm.vid,"data":_vm.data},on:{"changeVideo":_vm.changeVideo}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);