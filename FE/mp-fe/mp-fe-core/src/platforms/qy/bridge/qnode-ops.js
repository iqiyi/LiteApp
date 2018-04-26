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

import * as qnodeEvent from './bridge-event';
import { addDirect } from './bridge-patch';
import { isDef, isUndef } from 'core/util/index';

// filter qnode and send to patch direct
/*
 * -- params --
 *   _uid
 *   parent
 *   tag
 *   ref
 *   key
 *   val
 *   cls
 *   style
 *   text
 *   event
 *   capture
 *   passive
 *
 * --------------------------
 *
 * -- qnode bridge directs --
 *   appendCh
 *   removeCh
 *   insertBefore
 *   setAttr
 *   removeAttr
 *   setClass
 *   setStyle
 *   addEvent
 *   removeEvent
 *   setText
 */

export function appendCh( qnode : QNode ):void{
    const node = {
        _uid : qnode._uid,
        parent : {
            _uid : qnode.parentNode._uid,
            tag : qnode.parentNode.tagName,
        },
        tag : qnode.tagName
    }
    isDef(qnode.text) && ( node.text = qnode.text );
    isDef(qnode.ns) && ( node.ns = qnode.ns );
    isDef(qnode.parentNode.ns) && (node.parent.ns = qnode.parentNode.ns);
    addDirect( 'dom' , 'appendCh' , node );
}
export function removeCh( qnode : Qnode ):void{
    addDirect( 'dom' , 'removeCh' , {
        _uid : qnode._uid,
        parent : qnode.parentNode ? qnode.parentNode._uid : undefined
    })
}

export function insertBefore( 
    parentNode : QNode , 
    qnode : QNode , 
    referenceNode : QNode
){
    const node = {
        _uid : qnode._uid,
        tag : qnode.tagName,
        parent : {
            _uid : parentNode._uid,
            tag : parentNode.tagName
        }
    }
    // note that referenceNode maybe null
    isDef(referenceNode) && ( node.ref = {_uid:referenceNode._uid,tag:referenceNode.tagName} )

    isDef(qnode.text) && ( node.text = qnode.text );
    isDef(qnode.ns) && ( node.ns = qnode.ns );
    addDirect( 'dom' , 'insertBefore' , node )
}
export function setAttr( qnode , key , value ){
    addDirect( 'attr' , 'setAttr' , {
        _uid : qnode._uid,
        key : key,
        val : value
    })
}
export function removeAttr( qnode , key ){
    addDirect( 'attr' , 'removeAttr' , {
        _uid : qnode._uid,
        key : key,
    })
}

export function setClass( qnode , cls ){
    addDirect( 'attr' , 'setClass' , {
        _uid : qnode._uid,
        cls : cls,
    })
}
export function setStyle( qnode , style ){
    addDirect( 'attr' , 'setStyle' , {
        _uid : qnode._uid,
        style : style
    })
}
export function addEvent( qnode , event , handler ){
    
    qnodeEvent.saveEvent( qnode._uid , event , handler );

    addDirect( 'attr' , 'addEvent' , {
        _uid : qnode._uid,
        event : event
    } )
}

export function removeEvent( qnode , event , handler , capture , passive ){
    
    qnodeEvent.removeEvent( qnode._uid , event );

    addDirect( 'attr' , 'removeEvent' , {
        _uid : qnode._uid,
        event : event,
        capture ,
        passive
    })
}

export function setTextContent( qnode , text ){
    addDirect('dom','setText',{
        _uid : qnode._uid,
        text : text
    })
}

