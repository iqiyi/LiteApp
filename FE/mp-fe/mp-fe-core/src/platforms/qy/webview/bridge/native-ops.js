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


import { getElm } from './elm-ops';
import { callNativeEvent } from '../event/bridge';

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
    let data = {};
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
    let data = {};
    data.id = id;
    data.action = "delete";
    callNativeEvent("nativeBox",data);
}
function updateNativeBoxByID(id,el,type,hover,viewData){
    let data = {};
    data.id = id;
    data.action = "update";
    callNativeEvent("nativeBox",data);
}

export function createNative( qnode ){
    createNativeBox( qnode._uid , getElm(qnode) , qnode.nativeTag , qnode.hover , qnode.data );
}

export function removeNative( qnode ){
    deleteNativeBoxByID( qnode._uid );
}

export function updateNative( qnode ){
    deleteNativeBoxByID( qnode._uid );
}

