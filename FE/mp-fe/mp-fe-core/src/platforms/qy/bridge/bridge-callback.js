/* @flow */

import { isFunction } from '../util/index';
import bridge from './bridge';
let callbackId = 0;
const callbackKeep = {};
export function triggerCallback( callbackId ){
  console.log('triggerCallback id : ' + callbackId);
  isFunction(callbackKeep[callbackId]) && callbackKeep[callbackId]();
  // because callback may not change diff , patch immediately so that callback can be rendered
  bridge.readyToPatch();
}
export function saveCallback( fn : Function ){
  callbackId ++ ;
  callbackKeep[callbackId] = fn;
  return callbackId;
}
