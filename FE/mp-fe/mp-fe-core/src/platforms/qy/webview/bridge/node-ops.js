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

import {
  getRoot,
  setElm,
  removeElm,
  createElm,
  getElm,
  getParentElm,
  getRefElm
} from './elm-ops';
export * from './native-ops';
export * from './event-ops';
export * from './api-ops';
export * from './component-ops';


// 操作相关
export function init(){
  const page = document.getElementById('page');
  if(!page.children || page.children.length === 0 ){
    let root = getRoot();
    if(root){
      document.getElementById('page').appendChild( root );
    }
  }
}
export function appendCh( qnode ){
  let child = getElm( qnode );
  let parent = getParentElm( qnode )
  parent.appendChild( child );
}
export function removeCh( qnode ){
  let child = getElm( qnode )
  if( child ){
    child.parentNode.removeChild( child );
  }
}
export function insertBefore( qnode ){
  let parent = getParentElm( qnode );
  let child = getElm( qnode );
  let ref = getRefElm( qnode );
  parent.insertBefore( child , ref );
}
export function setAttr( qnode ){
  let elm = getElm( qnode );
  // set value
  if(elm.tagName === 'INPUT' && qnode.key === 'value'){
    elm.value = qnode.val;
  }else{
    elm.setAttribute( qnode.key , qnode.val );
  }
}
export function removeAttr( qnode ){
  let elm = getElm( qnode );
  elm.removeAttribute( qnode.key );
}

export function setClass( qnode ){
  let elm = getElm( qnode );
  elm.className =  qnode.cls ;
}
export function setStyle( qnode ){
  let elm = getElm( qnode );
  Object.assign(elm.style,qnode.style);
}


export function setText( qnode ){
  let elm = getElm( qnode );
  elm.textContent = qnode.text;
}

