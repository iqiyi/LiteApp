/* @flow */

import { isFunction } from '../util/util';

// qnode : { _uid , fn , params }
// functon may be a.b
export function webviewApiCall( qnode ){
  if(!__webview__ || !__webview__.__api__){
    console.log('api is not ready')
    return false;
  }

  let fn = __webview__.__api__;
  // get currect function
  qnode.fn.split('.').map(v=>{
    fn = fn[v];
    if(!fn){
      console.log(`__webview__.__api__ ${fn} is not registered`)
      return false;
    }
  })
  if(!isFunction(fn)){
    console.log(`__webview__.__api__ ${fn} is not a function`)
    return false;
  }

  fn(qnode.params)
}

