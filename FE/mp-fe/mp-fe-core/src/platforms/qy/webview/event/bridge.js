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
