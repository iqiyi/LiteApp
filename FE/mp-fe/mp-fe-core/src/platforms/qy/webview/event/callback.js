/* @flow */

import { executeJS } from './bridge';

export function triggerCallback( callbackId : number ){
  let str = `__thread__.callback.triggerCallback( ${callbackId} )`;
  executeJS('thread',str);
}
