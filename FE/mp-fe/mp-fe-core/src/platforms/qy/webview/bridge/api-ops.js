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

import { isFunction } from '../util/util';

// qnode : { _uid , fn , params }
// functon may be a.b
export function webviewApiCall( qnode ){
  if(!__webview__ || !__webview__.api){
    console.log('api is not ready')
    return false;
  }

  let fn = __webview__.api;
  // get currect function
  qnode.fn.split('.').map(v=>{
    fn = fn[v];
    if(!fn){
      console.log(`__webview__.api ${fn} is not registered`)
      return false;
    }
  })
  if(!isFunction(fn)){
    console.log(`__webview__.api ${fn} is not a function`)
    return false;
  }

  fn(qnode.params)
}

