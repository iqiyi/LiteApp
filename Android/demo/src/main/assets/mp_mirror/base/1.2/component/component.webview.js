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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
/* unused harmony export isUndef */
/* harmony export (immutable) */ __webpack_exports__["b"] = isDef;
/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_Swiped__ = __webpack_require__(28);


/* harmony default export */ __webpack_exports__["a"] = ({
  swipeToDelete: function swipeToDelete() {
    console.log('swipeToDeleteInit');
    if (window.swiped) {
      return;
    }
    window.swiped = __WEBPACK_IMPORTED_MODULE_0__scripts_Swiped__["a" /* default */].init({
      query: '.qy-swiped-group .qy-swipe_to_delete',
      list: true,
      left: 0,
      right: 80
    });
  }
});

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var msPointer = window.navigator.msPointerEnabled;

var touch = {
  start: msPointer ? 'MSPointerDown' : 'touchstart',
  move: msPointer ? 'MSPointerMove' : 'touchmove',
  end: msPointer ? 'MSPointerUp' : 'touchend'
};

var prefix = function () {
  var styles = window.getComputedStyle(document.documentElement, '');
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

  return '-' + pre + '-';
}();

var transitionEvent = function () {
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}();

var cssProps = {
  'transition': prefix + 'transition',
  'transform': prefix + 'transform'
};

function delegate(event, cbName) {
  document.addEventListener(event, function (e) {
    Swiped._elems.forEach(function (Swiped) {
      var target = e.target;

      while (target) {
        if (target === Swiped.elem) {
          Swiped[cbName](e);

          return false;
        }
        target = target.parentNode;
      }

      return false;
    });
  });
}

function extend() {
  var current = [].shift.call(arguments);
  var options = arguments[0];

  for (var i in options) {
    if (options.hasOwnProperty(i)) {
      current[i] = options[i];
    }
  }

  return current;
}

var fn = function fn() {};

var Swiped = function Swiped(o) {
  var defaultOptions = {
    duration: 200,
    tolerance: 50,
    time: 200,
    dir: 1,
    right: 0,
    left: 0
  };

  o = extend(defaultOptions, o || {});

  this.duration = o.duration;
  this.tolerance = o.tolerance;
  this.time = o.time;
  this.width = o.left || o.right;
  this.elem = o.elem;
  this.list = o.list;
  this.dir = o.dir;
  this.group = o.group;
  this.id = Swiped.elemId++;

  this.onOpen = typeof o.onOpen === 'function' ? o.onOpen : fn;
  this.onClose = typeof o.onClose === 'function' ? o.onClose : fn;

  this.right = o.right;
  this.left = o.left;

  if (o.right > 0 && o.tolerance > o.right || o.left > 0 && o.tolerance > o.left) {
    console.warn('tolerance must be less then left and right');
  }
};

Swiped._elems = [];
Swiped.groupCounter = 0;
Swiped.elemId = 0;

Swiped.init = function (o) {
  Swiped.group = o.group || Swiped.groupCounter++;

  var elems = document.querySelectorAll(o.query);
  var group = [];

  delete o.query;

  [].forEach.call(elems, function (elem) {
    var option = extend({ elem: elem, group: Swiped.groupCounter }, o);

    group.push(new Swiped(option));
  });

  Swiped._bindEvents();
  Swiped._elems = Swiped._elems.concat(group);

  if (group.length === 1) {
    return group[0];
  }

  return group;
};

Swiped._closeAll = function (groupNumber) {
  Swiped._elems.forEach(function (Swiped) {
    if (Swiped.group === groupNumber) {
      Swiped.close(true);
    }
  });
};

Swiped.prototype.transitionEnd = function (node, cb) {
  var that = this;

  function trEnd() {
    cb.call(that);
    node.removeEventListener(transitionEvent, trEnd);
  }

  node.addEventListener(transitionEvent, trEnd);
};

/**
 * swipe.x - initial coordinate Х
 * swipe.y - initial coordinate Y
 * swipe.delta - distance
 * swipe.startSwipe - swipe is starting
 * swipe.startScroll - scroll is starting
 * swipe.startTime - necessary for the short swipe
 * swipe.touchId - ID of the first touch
 */

Swiped.prototype.touchStart = function (e) {
  var touch = e.changedTouches[0];

  if (e.touches.length !== 1) {
    return;
  }

  this.touchId = touch.identifier;
  this.x = touch.pageX;
  this.y = touch.pageY;
  this.startTime = new Date();

  this.resetValue();

  if (this.list) {
    Swiped._closeAll(this.group);
  } else {
    this.close(true);
  }
};

Swiped.prototype.touchMove = function (e) {
  var touch = e.changedTouches[0];

  // touch of the other finger
  if (!this.isValidTouch(e)) {
    return;
  }

  this.delta = touch.pageX - this.x;

  this.dir = this.delta < 0 ? -1 : 1;
  this.width = this.delta < 0 ? this.right : this.left;

  this.defineUserAction(touch);

  if (this.startSwipe) {
    this.move();

    //prevent scroll
    e.preventDefault();
  }
};

Swiped.prototype.touchEnd = function (e) {
  if (!this.isValidTouch(e, true) || !this.startSwipe) {
    return;
  }

  // if swipe is more then 150px or time is less then 150ms
  if (this.dir * this.delta > this.tolerance || new Date() - this.startTime < this.time) {
    this.open();
  } else {
    this.close();
  }

  e.stopPropagation();
  e.preventDefault();
};

/**
 * Animation of the opening
 */
Swiped.prototype.open = function (isForce) {
  this.animation(this.dir * this.width);
  this.swiped = true;

  if (!isForce) {
    this.transitionEnd(this.elem, this.onOpen);
  };

  this.resetValue();
};

/**
 * Animation of the closing
 */
Swiped.prototype.close = function (isForce) {
  this.animation(0);
  this.swiped = false;

  if (!isForce) {
    this.transitionEnd(this.elem, this.onClose);
  }

  this.resetValue();
};

Swiped.prototype.toggle = function () {
  if (this.swiped) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * reset to initial values
 */
Swiped.prototype.resetValue = function () {
  this.startSwipe = false;
  this.startScroll = false;
  this.delta = 0;
};

Swiped._bindEvents = function () {
  if (Swiped.eventBinded) {
    return false;
  }

  delegate(touch.move, 'touchMove');
  delegate(touch.end, 'touchEnd');
  delegate(touch.start, 'touchStart');

  Swiped.eventBinded = true;
};

/**
 * detect of the user action: swipe or scroll
 */
Swiped.prototype.defineUserAction = function (touch) {
  var DELTA_X = 10;
  var DELTA_Y = 10;

  if (Math.abs(this.y - touch.pageY) > DELTA_Y && !this.startSwipe) {
    this.startScroll = true;
  } else if (Math.abs(this.delta) > DELTA_X && !this.startScroll) {
    this.startSwipe = true;
  }
};

/**
 * Which of the touch was a first, if it's a multitouch
 * touchId saved on touchstart
 * @param {object} e - event
 * @returns {boolean}
 */
Swiped.prototype.isValidTouch = function (e, isTouchEnd) {
  // take a targetTouches because need events on this node
  // targetTouches is empty in touchEnd, therefore take a changedTouches
  var touches = isTouchEnd ? 'changedTouches' : 'targetTouches';

  return e[touches][0].identifier === this.touchId;
};

Swiped.prototype.move = function () {
  if (this.dir > 0 && (this.delta < 0 || this.left === 0) || this.dir < 0 && (this.delta > 0 || this.right === 0)) {
    return false;
  }

  var deltaAbs = Math.abs(this.delta);

  if (deltaAbs > this.width) {
    // linear deceleration
    this.delta = this.dir * (this.width + (deltaAbs - this.width) / 8);
  }

  this.animation(this.delta, 0);
};

Swiped.prototype.animation = function (x, duration) {
  duration = duration === undefined ? this.duration : duration;

  this.elem.style.cssText = cssProps.transition + ':' + cssProps.transform + ' ' + duration + 'ms; ' + cssProps.transform + ':' + 'translate3d(' + x + 'px, 0px, 0px)';
};

Swiped.prototype.destroy = function (isRemoveNode) {
  var id = this.id;

  Swiped._elems.forEach(function (elem, i) {
    if (elem.id === id) {
      Swiped._elems.splice(i, 1);
    }
  });

  if (isRemoveNode) {
    this.elem.parentNode.removeChild(this.elem);
  }
};

// expose Swiped
/* harmony default export */ __webpack_exports__["a"] = (Swiped);

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_Swiper__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_Swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scripts_Swiper__);


/* harmony default export */ __webpack_exports__["a"] = ({
    swiperStart: function swiperStart() {
        var _this = this;

        var mySwiper = new __WEBPACK_IMPORTED_MODULE_0__scripts_Swiper___default.a({
            container: '.qy-swiper-wrap',
            item: '.qy-swiper-item',
            direction: 'horizontal'
        });
        mySwiper.$container.addEventListener('touchend', function (index) {
            _this.dispatchEvent(new CustomEvent('swiper_end', { detail: { index: mySwiper._current } }));
        });
    }
});

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * iswiper - swiper.js
 * @version v1.4.1
 * @link https://github.com/weui/swiper.git
 * @license MIT
 */

(function (name, definition) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this[name] = definition();
    }
})('Swiper', function () {

    /**
     *
     * @param options
     * @constructor
     */
    function Swiper(options) {
        this.version = '1.4.1';
        this._default = { container: '.swiper', item: '.item', direction: 'vertical', activeClass: 'active', threshold: 50, duration: 300 };
        this._options = extend(this._default, options);
        this._start = {};
        this._move = {};
        this._end = {};
        this._prev = 0;
        this._current = 0;
        this._offset = 0;
        this._goto = -1;
        this._eventHandlers = {};

        this.$container = document.querySelector(this._options.container);
        this.$items = this.$container.querySelectorAll(this._options.item);
        this.count = this.$items.length;

        this._width = this.$container.offsetWidth;
        this._height = this.$container.offsetHeight;

        this._init();
        this._bind();
    }

    /**
     * initial
     * @private
     */
    Swiper.prototype._init = function () {
        var me = this;
        var width = me._width;
        var height = me._height;

        var w = width;
        var h = height * me.count;

        if (me._options.direction === 'horizontal') {
            w = width * me.count;
            h = height;
        }

        me.$container.style.width = w + 'px';
        me.$container.style.height = h + 'px';

        Array.prototype.forEach.call(me.$items, function ($item, key) {
            $item.style.width = width + 'px';
            $item.style.height = height + 'px';
        });

        me._activate(0);
    };

    /**
     * bind event listener
     * @private
     */
    Swiper.prototype._bind = function () {
        var me = this;

        this.$container.addEventListener('touchstart', function (e) {
            me._start.x = e.changedTouches[0].pageX;
            me._start.y = e.changedTouches[0].pageY;

            me.$container.style['-webkit-transition'] = 'none';
            me.$container.style.transition = 'none';
        }, false);

        this.$container.addEventListener('touchmove', function (e) {
            me._move.x = e.changedTouches[0].pageX;
            me._move.y = e.changedTouches[0].pageY;

            var distance = me._move.y - me._start.y;
            var transform = 'translate3d(0, ' + (distance - me._offset) + 'px, 0)';

            if (me._options.direction === 'horizontal') {
                distance = me._move.x - me._start.x;
                transform = 'translate3d(' + (distance - me._offset) + 'px, 0, 0)';
            }

            me.$container.style['-webkit-transform'] = transform;
            me.$container.style.transform = transform;

            e.preventDefault();
        }, false);

        this.$container.addEventListener('touchend', function (e) {
            me._end.x = e.changedTouches[0].pageX;
            me._end.y = e.changedTouches[0].pageY;

            var distance = me._end.y - me._start.y;
            if (me._options.direction === 'horizontal') {
                distance = me._end.x - me._start.x;
            }

            me._prev = me._current;
            if (distance > me._options.threshold) {
                me._current = me._current === 0 ? 0 : --me._current;
                e.preventDefault();
            } else if (distance < -me._options.threshold) {
                me._current = me._current < me.count - 1 ? ++me._current : me._current;
                e.preventDefault();
            }

            me._show(me._current);
        }, false);
    };

    /**
     * show
     * @param index
     * @private
     */
    Swiper.prototype._show = function (index) {
        this._offset = index * this._height;
        var transform = 'translate3d(0, -' + this._offset + 'px, 0)';
        var me = this;

        if (this._options.direction === 'horizontal') {
            this._offset = index * this._width;
            transform = 'translate3d(-' + this._offset + 'px, 0, 0)';
        }

        var duration = this._options.duration + 'ms';

        this.$container.style['-webkit-transition'] = duration;
        this.$container.style.transition = duration;
        this.$container.style['-webkit-transform'] = transform;
        this.$container.style.transform = transform;

        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () {
            if (me._current != me._prev || me._timeout !== null || me._goto > -1) {
                me._activate(me._current);
                var cb = me._eventHandlers.swiped || noop;
                cb.apply(me, [me._prev, me._current]);
                me._goto = -1;
                me._timeout = null;
            }
        }, this._options.duration);
    };

    /**
     * activate
     * @param index
     * @private
     */
    Swiper.prototype._activate = function (index) {
        var clazz = this._options.activeClass;
        Array.prototype.forEach.call(this.$items, function ($item, key) {
            $item.classList.remove(clazz);
            if (index === key) {
                $item.classList.add(clazz);
            }
        });
    };

    /**
     * goto x page
     */
    Swiper.prototype.go = function (index) {
        if (index < 0 || index > this.count - 1 || index === this._current) {
            return;
        }

        if (index === 0) {
            this._current = 0;
            this._prev = 0;
        } else {
            this._current = index;
            this._prev = index - 1;
        }

        this._goto = index;
        this._show(this._current);

        return this;
    };

    /**
     * show next page
     */
    Swiper.prototype.next = function () {
        if (this._current >= this.count - 1) {
            return;
        }
        this._prev = this._current;
        this._show(++this._current);
        return this;
    };

    /**
     *
     * @param {String} event
     * @param {Function} callback
     */
    Swiper.prototype.on = function (event, callback) {
        if (this._eventHandlers[event]) {
            throw new Error('event ' + event + ' is already register');
        }
        if (typeof callback !== 'function') {
            throw new Error('parameter callback must be a function');
        }

        this._eventHandlers[event] = callback;

        return this;
    };

    /**
     * simple `extend` method
     * @param target
     * @param source
     * @returns {*}
     */
    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }

        return target;
    }

    /**
     * noop
     */
    function noop() {}

    /**
     * export
     */
    return Swiper;
});

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  listview_showRightIndex: function listview_showRightIndex() {
    var blockIndexWrap = this.querySelector('.qy-listview-block_index_list');
    var centerEl = this.querySelector('.center_tip');
    var indexNow = void 0;
    var handler = function handler(e) {
      e.stopPropagation();
      e.preventDefault();
      var index = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).getAttribute('rightindexblock');
      if (!index) return;
      if (index === indexNow) return;
      indexNow = index;
      showCenter(centerEl, index);
      var block = document.querySelector('[blockindex=' + index + ']');
      window.scrollTo(0, getOffset(block).top);
    };
    blockIndexWrap.addEventListener('touchmove', handler);
    blockIndexWrap.addEventListener('touchstart', handler);
  }
});

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    hoverLeft: el.left,
    hoverTop: el.top,
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  };
}

function showCenter(centerEl, index) {
  if (!centerEl) return;
  centerEl.textContent = index;
  centerEl.style.display = 'block';
  setTimeout(function () {
    centerEl.style.display = 'none';
  }, 1000);
}

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webview_QYSwipedGroup_webview__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webview_QYSwiper_webview__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webview_QYListview_listview_webview__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_util__ = __webpack_require__(1);
/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */






window.__webview__ = window.__webview__ || {};
window.__webview__.component = {};

[__WEBPACK_IMPORTED_MODULE_0__webview_QYSwipedGroup_webview__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__webview_QYSwiper_webview__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__webview_QYListview_listview_webview__["a" /* default */]].map(function (v) {
  Object(__WEBPACK_IMPORTED_MODULE_3__util_util__["a" /* extend */])(window.__webview__.component, v);
});

/***/ })

/******/ });