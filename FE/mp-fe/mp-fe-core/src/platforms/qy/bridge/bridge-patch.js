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


