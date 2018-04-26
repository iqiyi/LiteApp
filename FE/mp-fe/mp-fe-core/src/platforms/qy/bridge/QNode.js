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


