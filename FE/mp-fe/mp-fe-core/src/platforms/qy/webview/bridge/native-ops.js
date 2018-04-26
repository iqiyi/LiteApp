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

