/* @flow */
import { nextTick } from 'core/util/index';
import { inApp , inWeb , ctx } from '../util/index';
import bridgePatch from './bridge-patch';
import * as api from './qnode-ops.api';
import * as component from './qnode-ops.component';
import { triggerEvent } from './bridge-event';
import * as callback from './bridge-callback';

const bridge = new Object({
  api,
  component,
  callback,
  wait : false,
  // patch to webview , patchData is the main carrie
  readyToPatch : ():void=>{
    if(!bridge.wait){
      bridge.wait = true;
      nextTick(()=>{
        bridge.doPatch()
        bridge.wait = false
      })
    }
  },
  doPatch : ():void =>{
    if(bridgePatch.isEmpty()){
      return;
    }
    if( inApp ){
      const patchJson = JSON.stringify(bridgePatch.patchData);
      global.__base__.postPatch(`__bridge__.on_recv_patch_command(${patchJson})`);
    }
    if( inWeb ){
      // if webview is not ready
      if(typeof window.__bridge__ === 'undefined'){
        window.__patchQueue__ = (window.patchQueue||[]).push(bridgePatch.patchData);
      }else{
        window.__bridge__.on_recv_patch_command(bridgePatch.patchData:object);
      }
    }        
    bridgePatch.clear();
  },
  // get event call from webview
  getEvent : (eventObj):void=>{
    typeof console !== 'undefined' && console.log(eventObj)
    triggerEvent( eventObj );
  }
})

export default bridge;




