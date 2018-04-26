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

