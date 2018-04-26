/* @flow */
import { addDirect } from './bridge-patch';
import bridge from './bridge';

export function webviewCall(
  fnName : string , 
  params ?: string|number|Object
){
  addDirect('api','webviewApiCall',{
    fn : fnName,
    params : params
  })
  bridge.readyToPatch();
}

