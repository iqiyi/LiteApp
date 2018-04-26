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

// keep the event data in thread ,so that webview can trigger event by _uid & event name

import { ctx } from './bridge-util';

const eventKeep = new Object();
const baseEventKeep = new Object();

export function saveEvent( 
    _uid : number ,
    event : string ,
    handler : Function 
) : void {
    eventKeep[_uid] || (eventKeep[_uid] = {});
    eventKeep[_uid][event] || (eventKeep[_uid][event] = []);
    eventKeep[_uid][event].push(handler);
}

export function saveBaseEvent(
    event : string , 
    handler : Function
) : void {
    baseEventKeep[event] || (baseEventKeep[event] = []);
    baseEventKeep[event].push(handler);
}

export function removeEvent( 
    _uid : number , 
    event : string
) : void {
    eventKeep[_uid] && eventKeep[_uid][event] && ( delete eventKeep[_uid][event] );
}

export function removeBaseEvent( 
    event : string
) : void {
    baseEventKeep[event] && ( delete baseEventKeep[event] );
}

export function triggerEvent( eventObj ) : void {
    let handlers;
    if(eventKeep[eventObj._uid] 
       && (handlers = eventKeep[eventObj._uid][eventObj.event])
        && handlers.length > 0){
            handlers.forEach(e=>{
                e.call(null,eventObj.params)
            })
    }
}

export function triggerBaseEvent( eventObj ) : void{
    let handlers;
    if( (handlers = baseEventKeep[eventObj.event]) && handlers.length > 0 ){
        handlers.forEach(e=>{
            e.call(null,eventObj.params)
        })
    }
}
export default eventKeep;


