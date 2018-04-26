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
import { nextTick } from 'core/util/index';
import { inApp , inWeb , ctx } from '../util/index';
import bridgePatch from './bridge-patch';
import * as api from './qnode-ops.api';
import * as component from './qnode-ops.component';
import * as event from './bridge-event';
import * as callback from './bridge-callback';

const bridge = new Object({
  api,
  component,
  callback,
  wait : false,
  event,
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
    event.triggerEvent( eventObj );
  },
  getBaseEvent : (eventObj) : void =>{
    typeof console !== 'undefined' && console.log(eventObj)
    event.triggerBaseEvent( eventObj );
  }
})

export default bridge;




