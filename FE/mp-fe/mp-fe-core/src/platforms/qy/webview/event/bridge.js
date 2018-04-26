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
    isApp, 
    isIosApp, 
    isAndroidApp, 
    isBrowser 
} from '../util/util';

export function callNativeEvent(
    typeContent,
    dataContent
):void{
    const event = {
        type:typeContent,
        data:dataContent
    }
    executeJS('native',JSON.stringify(event))
}

export function callThreadEvent(
    qnode : Object,
    event : string,
    params ?: Object
):void{
    let str = '__thread__.getEvent({';
    if(qnode){
        str += `_uid:${qnode._uid}`
    }
    if(event){
        str += `,event:'${event}'`
    }
    if(params){
        str += `,params:${JSON.stringify(params)}`
    }
    str += '})';

    executeJS('thread',str);
}

export function executeJS(target:string,scriptContent:string){
    console.log(`[executeJS] target : ${target} ; scriptContent : ${scriptContent}`);
    if(target === 'thread'){
        isIosApp && window.webkit.messageHandlers.emit.postMessage(scriptContent);
        isAndroidApp && console.log("execute:" + scriptContent);
        isBrowser && (new Function(scriptContent))();
    }else if(target === 'native'){
        isIosApp && window.webkit.messageHandlers.native_call.postMessage(scriptContent);
        isAndroidApp && console.log("hal:" + scriptContent);
        isBrowser && console.log('[webview] error : native call ' + scriptContent);
    }
}
