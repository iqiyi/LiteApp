/*!
 * Vue.js v2.5.0
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*  */

// html element 操作相关
var elms = new Object();

function createElm( qnode ){
  var elm;
  if(qnode.tag == 'text'){
    elm = document.createTextNode(qnode.text);
  }else if( qnode.tag == 'comment' ){
    elm = document.createComment( qnode.text || qnode._uid );
  }else{
    if(qnode.ns){
      elm = document.createElementNS(qnode.ns,qnode.tag);
    }else{
      elm = document.createElement( qnode.tag );
    }
    elm.setAttribute( '_uid',qnode._uid );
  }
  setElm( qnode._uid , elm );
  return elm;
}

function setElm( _uid , elm ){
  elms[_uid] = elm;
}

function getElm( qnode ){
  return elms[qnode._uid] || createElm( qnode );
}
function getRoot(){
  if(elms[0]){
    return elms[0]
  }else{
    console.error("[qy webview] error at getRoot ");
  }
}
function getParentElm( qnode ){
  return elms[qnode.parent._uid] || createElm(qnode.parent)
}


function getRefElm( qnode ){
  if(!qnode.ref){
    return null;
  }else{
    return elms[qnode.ref._uid] || createElm({
      _uid : qnode.ref._uid,
      tag : qnode.ref.tag
    })
  }
}

var isApp = location.protocol.indexOf('http') === -1;
var isBrowser = !isApp;
var isIosApp = isApp && typeof window.webkit !== 'undefined';
var isAndroidApp = isApp && !isIosApp;

function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}

/*  */
function callNativeEvent(
    typeContent,
    dataContent
){
    var event = {
        type:typeContent,
        data:dataContent
    };
    executeJS('native',JSON.stringify(event));
}

function callThreadEvent(
    qnode ,
    event ,
    params 
){
    var str = '__thread__.getEvent({';
    if(qnode){
        str += "_uid:" + (qnode._uid);
    }
    if(event){
        str += ",event:'" + event + "'";
    }
    if(params){
        str += ",params:" + (JSON.stringify(params));
    }
    str += '})';

    executeJS('thread',str);
}

function executeJS(target,scriptContent){
    console.log(("[executeJS] target : " + target + " ; scriptContent : " + scriptContent));
    if(target === 'thread'){
        isIosApp && window.webkit.messageHandlers.emit.postMessage(scriptContent);
        isAndroidApp && console.log("execute:" + scriptContent);
        isBrowser && (new Function(scriptContent))();
    }else if(target === 'native'){
        isIosApp && window.webkit.messageHandlers.native_call.postMessage(scriptContent);
        isAndroidApp && console.log("hal:" + scriptContent);
        isBrowser && console.log('[webview] error : native call ' + scriptContent);
    }
}

function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
        hoverLeft : el.left,
        hoverTop : el.top,
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    }
}

function createNativeBox(id,el,type,hover,viewData) {
    //create a native box on a element that has
    var data = {};
    data.top = hover ? getOffset(el).hoverTop : getOffset(el).top;
    data.left = hover ? getOffset(el).hoverLeft : getOffset(el).left;
    data.height = el.offsetHeight;
    data.width = el.offsetWidth;
    data.type = type;
    data.viewData = viewData;
    data.hover = hover;
    data.id = id;
    data.action = "create";
    callNativeEvent("nativeBox",data);
}

function deleteNativeBoxByID(id){
    var data = {};
    data.id = id;
    data.action = "delete";
    callNativeEvent("nativeBox",data);
}
function createNative( qnode ){
    createNativeBox( qnode._uid , getElm(qnode) , qnode.nativeTag , qnode.hover , qnode.data );
}

function removeNative( qnode ){
    deleteNativeBoxByID( qnode._uid );
}

function updateNative( qnode ){
    deleteNativeBoxByID( qnode._uid );
}

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining








/**
 * Check if value is primitive
 */


/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


/**
 * Get the raw type string of a value e.g. [object Object]
 */


/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */




/**
 * Check if val is a valid array index.
 */


/**
 * Convert a value to a string that is actually rendered.
 */


/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */


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
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */


/**
 * Check whether the object has the property.
 */


/**
 * Create a cached version of a pure function.
 */


/**
 * Camelize a hyphen-delimited string.
 */


/**
 * Capitalize a string.
 */


/**
 * Hyphenate a camelCase string.
 */


/**
 * Simple bind, faster than native
 */


/**
 * Convert an Array-like object to a real Array.
 */


/**
 * Mix properties into target object.
 */


/**
 * Merge an Array of Objects into a single Object.
 */


/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */


/**
 * Always return false.
 */


/**
 * Return same value
 */


/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */




/**
 * Ensure a function is called only once.
 */

function FilteredEvent(event){
    // filter loop object in event , so that event can be stringify to JSON
    function TouchListFilter( touchList , allowed ){
        if ( allowed === void 0 ) allowed = [];

        var FilteredTouchList = [];
        var i = event.changedTouches.length;
        var loop = function () {
            var cell = event.changedTouches[i];
            allowed.forEach(function (v){
                (FilteredTouchList[i] = FilteredTouchList[i] || [])[v] = cell[v];
            });
        };

        while(i--)loop();
        return FilteredTouchList;
    }
    function TargetFilter( target , allowed ){
        if ( allowed === void 0 ) allowed = [];

        var FilteredTarget = {};
        allowed.forEach(function (v){
            FilteredTarget[v] = target[v];
        });
        FilteredTarget._uid = target.getAttribute('_uid');
        return FilteredTarget;
    }
    if(event.type.indexOf('touch') > -1){
        this.changedTouches = TouchListFilter( event.changedTouches , ['clientX','clientY','pageX','pageY'] );
        this.touches = TouchListFilter( event.touches , ['clientX','clientY','identifier','pageX','pageY'] );
        this.realTarget = TargetFilter(
          document.elementFromPoint(this.touches[0].clientX, this.touches[0].clientY)
        );
    }
    this.currentTarget = TargetFilter( event.currentTarget , ['dataset','id','offsetLeft','offsetTop'] );
    this.detail = event.detail || { value : event.target.value };
    this.target = TargetFilter( event.target , ['dataset','id','offsetLeft','offsetTop'] );
    this.timeStamp = event.timeStamp;
}

/*  */
function addEvent( qnode ){
  var elm = getElm( qnode );
  var callbackHandler = function(e){
    callThreadEvent(qnode,qnode.event,new FilteredEvent(e));
  };
  elm.addEventListener( qnode.event , callbackHandler );
}

function removeEvent( qnode , event  ){
  var elm = getElm( qnode );
  //elm.removeEventListener( event );
}

/*  */

function webviewApiCall( qnode ){
  if(!__webview__ || !__webview__.api){
    console.log('api is not ready');
    return false;
  }

  var fn = __webview__.api;
  // get currect function
  qnode.fn.split('.').map(function (v){
    fn = fn[v];
    if(!fn){
      console.log(("__webview__.api " + fn + " is not registered"));
      return false;
    }
  });
  if(!isFunction(fn)){
    console.log(("__webview__.api " + fn + " is not a function"));
    return false;
  }

  fn(qnode.params);
}

/*  */
function webviewComCall( qnode ){
  var component = window.__webview__.component;
  if(!component){
    console.log('__component__ is not ready');
    return false;
  }

  if(!isFunction(component[qnode.fn])){
    console.log(("component " + (qnode.fn) + " is not registered"));
    return false;
  }

  component[qnode.fn].call(getElm(qnode),qnode.params);
}

/*  */

function init(){
  var page = document.getElementById('page');
  if(!page.children || page.children.length === 0 ){
    var root = getRoot();
    if(root){
      document.getElementById('page').appendChild( root );
    }
  }
}
function appendCh( qnode ){
  var child = getElm( qnode );
  var parent = getParentElm( qnode );
  parent.appendChild( child );
}
function removeCh( qnode ){
  var child = getElm( qnode );
  if( child ){
    child.parentNode.removeChild( child );
  }
}
function insertBefore( qnode ){
  var parent = getParentElm( qnode );
  var child = getElm( qnode );
  var ref = getRefElm( qnode );
  parent.insertBefore( child , ref );
}
function setAttr( qnode ){
  var elm = getElm( qnode );
  // set value
  if(elm.tagName === 'INPUT' && qnode.key === 'value'){
    elm.value = qnode.val;
  }else{
    elm.setAttribute( qnode.key , qnode.val );
  }
}
function removeAttr( qnode ){
  var elm = getElm( qnode );
  elm.removeAttribute( qnode.key );
}

function setClass( qnode ){
  var elm = getElm( qnode );
  elm.className =  qnode.cls ;
}
function setStyle( qnode ){
  var elm = getElm( qnode );
  Object.assign(elm.style,qnode.style);
}


function setText( qnode ){
  var elm = getElm( qnode );
  elm.textContent = qnode.text;
}



var nodeOps = Object.freeze({
	init: init,
	appendCh: appendCh,
	removeCh: removeCh,
	insertBefore: insertBefore,
	setAttr: setAttr,
	removeAttr: removeAttr,
	setClass: setClass,
	setStyle: setStyle,
	setText: setText,
	createNative: createNative,
	removeNative: removeNative,
	updateNative: updateNative,
	addEvent: addEvent,
	removeEvent: removeEvent,
	webviewApiCall: webviewApiCall,
	webviewComCall: webviewComCall
});

/*  */
function finishConstruct(){
  isIosApp && window.webkit.messageHandlers.finish_construct.postMessage(0);
  if(isAndroidApp){
    var event = {
      type:"bridgeLoadFinish",
      data:{finished:true},
      intercept:false
    };
    console.log("hal:" + JSON.stringify(event));
  }
}
function registerBridge(){
  // regist patch receiver
  window.__bridge__ = {
    on_recv_patch_command : function (patch){
      directJsonToDom(patch);
    }
  };
}

// queue patch  inBrowser
function renderQueueDirect(){
  if(window.__patchQueue__ && Array.isArray(window.__patchQueue__)){
    window.__patchQueue__.forEach(function (patch){
      directJsonToDom(patch);
    });
  }
}

var directSort = ['direct_dom','direct_attr','direct_api','direct_com','direct_native'];
function directJsonToDom(patch){
  directSort.forEach(function (key) {
    patch[key].forEach(function (direct){
      nodeOps[direct.op].call(null,direct.val);
    });
    if(key === 'direct_dom'){
      init();
    }
  });
}

/*  */

function attachEvent(
    element ,
    eventName ,
    callback 
) {
    if ('addEventListener' in window) {
        return element.addEventListener(eventName, callback, false);
    }
}
function fireFakeEvent (
    e  ,
    eventName 
){
    if (document.createEvent) {
        console.log(("[" + eventName + "] fired"));
        return e.target.dispatchEvent(createEvent(eventName));
    }
}
function createEvent (name){
    if (document.createEvent) {
        var evnt = window.document.createEvent('HTMLEvents');

        evnt.initEvent(name, true, true);
        evnt.eventName = name;

        return evnt;
    }
}
function getRealEvent (e){
    if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
        return e.originalEvent.touches[0];
    } else if (e.touches && e.touches.length) {
        return e.touches[0];
    }
    return e;
}

/*  */

function registerTap( options ){
    if ( options === void 0 ) options = {
    fingerMaxOffset : 11
};

    var coords = {};
    var handlers = {
        start: function(e) {
            e = getRealEvent(e);

            coords.start = [e.pageX, e.pageY];
            coords.offset = [0, 0];

        },

        move: function(e) {
            if (!coords.start && !coords.move) {
                return false;
            }

            e = getRealEvent(e);

            coords.move = [e.pageX, e.pageY];
            coords.offset = [
                Math.abs(coords.move[0] - coords.start[0]),
                Math.abs(coords.move[1] - coords.start[1])
            ];
            // move out
            if (coords.offset && (coords.offset[0] > options.fingerMaxOffset || coords.offset[1] > options.fingerMaxOffset)){
                coords = {};
            }
        },

        end: function(e) {
            e = getRealEvent(e);
            if (coords.offset && coords.offset[0] < options.fingerMaxOffset && coords.offset[1] < options.fingerMaxOffset){
                fireFakeEvent(e, 'tap');
            }
            coords = {};
        }
    };
    var init = function(){
        attachEvent(document.documentElement, 'touchstart', handlers['start']);
        attachEvent(document.documentElement, 'touchmove', handlers['move']);
        attachEvent(document.documentElement, 'touchend', handlers['end']);
    };
    attachEvent(window, 'load', init);
}

/*  */
function registerEvent(){
  registerTap();
}

/*  */

function triggerCallback( callbackId  ){
  var str = "__thread__.callback.triggerCallback( " + callbackId + " )";
  executeJS('thread',str);
}


var callback = Object.freeze({
	triggerCallback: triggerCallback
});

/*  */

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    isBrowser && renderQueueDirect();
    registerBridge();
    // tell native that page ready
    isApp && finishConstruct();
    registerEvent();
  }, false);
}

// window.__webview__ register
window.__webview__ = window.__webview__ || {};
window.__webview__.bridge = {
    executeJS: executeJS
};
window.__webview__.callback = callback;

})));
