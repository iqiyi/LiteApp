/* @flow */
import { isDef , addParamsToUrl } from '../util/index';
import NativePromise from '../shared/polyfill/Promise';

const noop = ()=>{};
const defaultOptions = {
  method : 'GET',
  success : noop,
  fail : noop,
  complete : noop
}
export function request(options = defaultOptions){
  if(options.success){
    return requestHandler(options.success , options.fail);
  }else{
    // promise for request
    return new NativePromise(requestHandler)
  }
  function requestHandler(cbs_s,cbs_e){
    // fetch empty solution
    const _parseJSON = function(response) {
      return response.text().then(function(text) {
        return text ? JSON.parse(text) : {}
      })
    }

    // add data to url for GET
    if(options.method == 'GET' && isDef(options.params)){
      options.url = addParamsToUrl(options.url , options.params);
    }

    return fetch(options.url , options).then(json=>{
      console.log(json)
      return _parseJSON(json)
    })
    .then((res)=>{
      cbs_s && cbs_s.call(null,res)
    })
    .catch((err)=>{
      console.log(err)
      cbs_e && cbs_e.call(null,err)
    });

  }
}
export default {
  setPreCheck : (fn)=>{
  },
  get : (url,options)=>{
    options = options || {};
    options.method = 'get';
    // add data to get url
    if(isDef(options.data)){
      options.url = addParamsToUrl(url , options.data);
    }
    return request(options)
  }
}
