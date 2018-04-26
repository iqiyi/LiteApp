/* @flow */

import { isDef } from 'core/util/index'
import { setStyle , setAttr , removeAttr , addEvent , removeEvent } from './qnode-ops';

let qnode_uid = 0;


export default class QNode{
    constructor( tagName : string , vnode : VNode ) : void{
        this._uid = qnode_uid++ ;
        this.tagName = tagName;
        this.children = [];
        this.data = {};
        this.attrs = {};
        this.style = new Style();
        this.text = '';
        if(vnode){
            if(vnode.text){this.text = vnode.text};
            if(vnode.data){this.data = vnode.data};
            if(vnode.ns){this.ns = vnode.ns};
        }
    }
    setStyle():void{
        if(this.style){
            setStyle(this,this.style);
        }
    }
    hasAttribute( key : string ) : boolean{
        return !!this.attrs[key];
    }
    setAttribute( key : string , value : string ) : void{
        setAttr(this,key,value);
    }
    removeAttribute( key : string ):void{
        removeAttr( key );
    }
    addEventListener(
        event : string,
        handler : Function,
        capture : boolean,
        passive : boolean
    ):void{
        addEvent( this , event , handler , capture , passive )
    }
    removeEventListener(
        event : string,
        handler : Function,
        capture : boolean
    ):void{
        removeEvent( this , event , capture )
    }
}

class Style{
    constructor(){

    }
    setProperty(name,value,type){
        this[name] = value;
    }
}


