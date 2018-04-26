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

// html element 操作相关
const elms = new Object();

export function createElm( qnode ){
  let elm;
  if(qnode.tag == 'text'){
    elm = document.createTextNode(qnode.text)
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

export function setElm( _uid , elm ){
  elms[_uid] = elm;
}
export function removeElm( _uid ){
  delete elms[_uid];
}
export function getElm( qnode ){
  return elms[qnode._uid] || createElm( qnode );
}
export function getRoot(){
  if(elms[0]){
    return elms[0]
  }else{
    console.error(`[qy webview] error at getRoot `)
  }
}
export function getParentElm( qnode ){
  return elms[qnode.parent._uid] || createElm(qnode.parent)
}

export function getElmByUid( _uid ){
  return elms[_uid];
}
export function getRefElm( qnode ){
  if(!qnode.ref){
    return null;
  }else{
    return elms[qnode.ref._uid] || createElm({
      _uid : qnode.ref._uid,
      tag : qnode.ref.tag
    })
  }
}
export default elms;

