/* @flow */

// native component's bridge ops
import { saveEvent } from './bridge-event';
import { addDirect } from './bridge-patch';
import { isDef, isUndef } from 'core/util/index';

export function createNative( nativeCom : Object ){
  // judge nativeCom here
  
  addDirect( 'native' , 'createNative' , nativeCom)
}

export function removeNative( nativeCom : Object ){
  // judge nativeCom here
  
  addDirect( 'native' , 'removeNative' , nativeCom)
}
