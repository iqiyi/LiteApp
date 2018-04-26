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

import { isDef, isUndef, isObject } from 'shared/util';

const patchData = {
  // set root for root element
  direct_dom : [],
  direct_attr : [],
  direct_api : [],
  direct_com : [],
  direct_native : []
};

export function addDirect(
  type : string ,
  op : string , 
  filteredNode : object
) : void {
  /* istanbul ignore if */
  if(!patchData[`direct_${type}`]){
    if( process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' ){
      console.error(`[qy error] : type ${type} error `)
    }
  }else{
    patchData[`direct_${type}`].push({ op , val : filteredNode })
  }
}

export function isEmpty() : boolean{
  for(let i in patchData){
    if(patchData[i].length !== 0){
      return false
    }
  }
  return true;
}
export function clear() : void{
  for(let i in patchData){
    patchData[i].length = 0 ;
  }
}

export default {
  addDirect,
  isEmpty,
  clear,
  patchData
};


