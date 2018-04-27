(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['api-app'] = global['api-app'] || {}, global['api-app'].thread = factory());
}(this, (function () { 'use strict';

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

/* @flow */

// base call for call native 

function baseCall( eventType , data){
  // do something here
  console.log(("[api triggerEvent] : " + eventType + " , " + (JSON.stringify(data))));
  __base__.triggerEvent( eventType , data);
}

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



var inApp = typeof window === 'undefined' && typeof global !== 'undefined' && typeof global.__base__ !== 'undefined';
var ctx = inApp ? global : window;

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


var webHost = "http://10.127.18.211:8003";
function addParamsToUrl(url, data) {
    //create params
    var params = [];
    var _url = url;
    for (var p in data) {
        if (data.hasOwnProperty(p)) {
            params.push(p + '=' + encodeURIComponent(data[p]));
        }
    }
    if (params.length > 0) {
        _url += _url.indexOf('?') == -1 ? '?' : '&';
        _url += params.join('&');
    }
    return _url
}

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




function isDef (v){
  return v !== undefined && v !== null
}

/**
 * Mix properties into target object.
 */

/* @flow */
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



function share( page , data ){
  var url = addParamsToUrl( (webHost + "/123/web/src/_html/" + page + ".html") , data );
  baseCall( 'share' , {url: url} );
}
function goBrowser( page , data ){
  var url = addParamsToUrl( (webHost + "/123/web/src/_html/" + page + ".html") , data );
  baseCall( 'goBrowser' , {url: url} );
}

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


function getAppData(){
    if(typeof __app__data !== 'undefined'){
        console.log('[thread api getAppData]' + JSON.stringify(__app__data));
        return __app__data;
    }else{
        throw new Error('[thread api getAppData] no __app__data')
    }
}

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


var NativePromise = Promise;
var nativePromiseSupported =
  NativePromise &&
  // Some of these methods are missing from
  // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
  // Older version of the spec had a resolver object
  // as the arg rather than a function
  (function(){
    var resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();

//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush(){
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++){
    asyncQueue[i][0](asyncQueue[i][1]);

  }

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
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
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;  
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      { resolve(promise, value); }

    if (settled === REJECTED)
      { reject(promise, value); }
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value)
      { throw new TypeError('A promises callback cannot return that same promise.'); }

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      var then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              { resolve(promise, val); }
            else
              { fulfill(promise, val); }
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      { reject(promise, e); }

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    { fulfill(promise, value); }
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
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

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver){
  if (typeof resolver !== 'function')
    { throw new TypeError('Promise constructor takes a function argument'); }

  if (this instanceof Promise === false)
    { throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.'); }

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function(onFulfillment, onRejection){
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED)
    {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    }
    else
    {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function(promises){
  var Class = this;

  if (!isArray(promises))
    { throw new TypeError('You must pass an array to Promise.all().'); }

  return new Class(function(resolve, reject){
    var results = [];
    var remaining = 0;

    function resolver(index){
      remaining++;
      return function(value){
        results[index] = value;
        if (!--remaining)
          { resolve(results); }
      };
    }

    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        { promise.then(resolver(i), reject); }
      else
        { results[i] = promise; }
    }

    if (!remaining)
      { resolve(results); }
  });
};

Promise.race = function(promises){
  var Class = this;

  if (!isArray(promises))
    { throw new TypeError('You must pass an array to Promise.race().'); }

  return new Class(function(resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        { promise.then(resolve, reject); }
      else
        { resolve(promise); }
    }
  });
};

Promise.resolve = function(value){
  var Class = this;

  if (value && typeof value === 'object' && value.constructor === Class)
    { return value; }

  return new Class(function(resolve){
    resolve(value);
  });
};

Promise.reject = function(reason){
  var Class = this;

  return new Class(function(resolve, reject){
    reject(reason);
  });
};

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

/* @flow */

var noop = function (){};
var defaultOptions = {
    method : 'GET',
    success : noop,
    fail : noop,
    complete : noop
};
function request(options){
    if ( options === void 0 ) options = defaultOptions;

    return requestHandler();
    function requestHandler(){
        // add data to url for GET
        if(options.method == 'GET' && isDef(options.params)){
            options.url = addParamsToUrl(options.url , options.params);
        }
        console.log('network start : ' + options.url);
        console.log('request start');

        // headers adaptor
        var headers = options.headers;
        var headersArray = [];
        if(headers){
            Object.keys(headers).map(function (v){
                var o = {
                    key : v,
                    value : headers[v]
                };
                headersArray.push(o);
            });
        }
        options.headers = headersArray;
        // json parse for native request
        var success = options.success;
        options.success = function( json ){
            success && success( JSON.parse(json) );
        };
        var fail = options.fail;
        options.fail = function( json ){
            fail && fail( JSON.parse(json) );
        };
        baseCall( 'request' , options );
    }
}

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


/* @flow */
function goPage(page , data){
    var params = {
        path : page,
        data : data
    };
    console.log('[api goPage] : ' + JSON.stringify(params));
    baseCall('goPage',params);
}
function getPageData(){
    console.log('[api getPagedata] : ' + __page__data);
    return __page__data;
}

function setSwipeRefresh( data ){
    console.log('[api setSwipeRefresh] : ' + JSON.stringify(data));
    baseCall('setSwipeRefresh',data);
    __thread__.event.removeBaseEvent('swipeRefreshed');
    __thread__.event.saveBaseEvent('swipeRefreshed',data.swipeRefreshed);
}

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


var confirm = {
  show : function (params) {
    var yes = __thread__.callback.saveCallback( params.yes );
    var no = __thread__.callback.saveCallback( params.no );

    __thread__.api.webviewCall('confirm.show',{
      content : params.content,
      buttons : params.buttons,
      yes : yes,
      no : no
    });
  }
};
var loading = {
  show : function (params) {
    console.log('loadingShow');
    baseCall('loading',{
      action : 'show'
    });
    //__thread__.api.webviewCall('loading.show',params)
  },
  hide : function (params) {
    console.log('loadingHide');
    baseCall('loading',{
      action : 'hide'
    });
    //__thread__.api.webviewCall('loading.hide',params)
  }
};

var toast = {
  show : function (params) {
    __thread__.api.webviewCall('toast.show',params);
  }
};

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


var bodyEvent = {};

function addBodyEvent( event , fn ){
    (bodyEvent[event] = bodyEvent[event] || []).push(fn);
    __thread__.api.webviewCall('addBodyEvent',event);
}

function triggerBodyEvent( event ){
    Array.isArray(bodyEvent[event]) && bodyEvent[event].forEach(function (fn) {
        isDef(fn) && fn.call(null);
    });
}

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


function goLogin(params){
    if ( params === void 0 ) params = {
    success : function (){},
    error : function (){}
};

    baseCall('goLogin',params);
}

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


function addLifecycle( lifecycle , callback ){
    __thread__.event.saveBaseEvent(lifecycle,callback);
}

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





var qiyiApi$1 = Object.freeze({
	baseCall: baseCall,
	share: share,
	goBrowser: goBrowser,
	getAppData: getAppData,
	request: request,
	goPage: goPage,
	getPageData: getPageData,
	setSwipeRefresh: setSwipeRefresh,
	confirm: confirm,
	loading: loading,
	toast: toast,
	addBodyEvent: addBodyEvent,
	triggerBodyEvent: triggerBodyEvent,
	goLogin: goLogin,
	addLifecycle: addLifecycle
});

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


/* @flow */

ctx.__api__ = ctx.qiyiApi = qiyiApi$1;

return qiyiApi$1;

})));
