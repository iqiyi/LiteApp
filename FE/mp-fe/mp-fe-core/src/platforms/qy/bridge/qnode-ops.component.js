/* @flow */
import { addDirect } from './bridge-patch';

export function webviewCall(
  _uid : number,
  fnName : string , 
  params ?: string|number|Object
){
  addDirect('com','webviewComCall',{
    _uid : _uid,
    fn : fnName,
    params : params
  })
}
