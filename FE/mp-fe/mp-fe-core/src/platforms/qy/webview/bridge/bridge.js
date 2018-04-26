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
import * as nodeOps from './node-ops';
import { isApp , isAndroidApp , isIosApp, isBrowser } from '../util/util';

// tell app that webview is ready - inApp
export function finishConstruct(){
  isIosApp && window.webkit.messageHandlers.finish_construct.postMessage(0);
  if(isAndroidApp){
    const event = {
      type:"bridgeLoadFinish",
      data:{finished:true},
      intercept:false
    }
    console.log("hal:" + JSON.stringify(event));
  }
}
export function registerBridge(){
  // regist patch receiver
  window.__bridge__ = {
    on_recv_patch_command : patch=>{
      directJsonToDom(patch);
    }
  }
}

// queue patch  inBrowser
export function renderQueueDirect(){
  if(window.__patchQueue__ && Array.isArray(window.__patchQueue__)){
    window.__patchQueue__.forEach(patch=>{
      directJsonToDom(patch);
    })
  }
}

const directSort = ['direct_dom','direct_attr','direct_api','direct_com','direct_native'];
function directJsonToDom(patch:string):void{
  directSort.forEach(key =>{
    patch[key].forEach(direct=>{
      nodeOps[direct.op].call(null,direct.val)
    })
    if(key === 'direct_dom'){
      nodeOps.init();
    }
  })
}

