(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
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



var inApp = typeof window === 'undefined' && typeof global !== 'undefined' && typeof global.__base__ !== 'undefined';

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






/**
 * Mix properties into target object.
 */
function extend (to, _from){
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
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
    console.info('confirm',params);
  }
};
var loading = {
  show: function show(params){
    if ( params === void 0 ) params = {};

    extend(
      (
        window.loadingDom = window.loadingDom || document.createElement('div')
      ),
      {
        className : ("" + (params.className || 'qy-loading')),
        textContent : params.content || '',
      }
    );
    document.body.appendChild(window.loadingDom);
  },
  hide: function hide(params){
    console.log('loadingHide');
    if(window.loadingDom){
      window.loadingDom.parentNode.removeChild(window.loadingDom);
      window.loadingDom = null;
    }
  }
};

var toast = {
  show : function (params) {
    extend(
      (
        window.toastDom = window.toastDom || document.createElement('div')
      ),
      {
        className : ("" + (params.className || 'qy-toast')),
        textContent : params.content || '',
      }
    );
    document.body.appendChild(window.toastDom);

    setTimeout(function (){
      window.toastDom.parentNode.removeChild(window.toastDom); 
    },params.duration || 3000);
  }
};


var ui = Object.freeze({
	confirm: confirm,
	loading: loading,
	toast: toast
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


var bodyEvent = {
    scrollEnd : {
        add : function(){
            window.addEventListener('scroll',function(){
                if(document.body.scrollHeight - window.scrollY < window.screen.availHeight + 100 ) {
                    var evalStr = "__api__.triggerBodyEvent('scrollEnd')";
                    __webview__.bridge.executeJS('thread',evalStr);
                }
            });
        }
    }
};

function addBodyEvent( event ){
    bodyEvent[event] && bodyEvent[event].add();
}


var body = Object.freeze({
	addBodyEvent: addBodyEvent
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


window.__webview__ = window.__webview__ || {};
window.__webview__.api = {};

extend(window.__webview__.api,ui);
extend(window.__webview__.api,body);

})));
