/* @flow */
import { baseCall } from './base';
import { addParamsToUrl , searchToObject , isDef , extend } from '../../util/index';
import NativePromise from '../../shared/polyfill/Promise';

const noop = ()=>{};
const defaultOptions = {
  method : 'GET',
  success : noop,
  fail : noop,
  complete : noop
}
export function request(options = defaultOptions){
  if(options.success){
      return requestHandler(
          json=>{ options.success(JSON.parse(json)) },
          json=>{ options.fail(JSON.parse(json))}
      )
  }else{
    // promise for request
    return new NativePromise(requestHandler).then(json=>json ? JSON.parse(json) : {})
  }
  function requestHandler(cbs_s,cbs_e){
      // add data to url for GET
      if(options.method == 'GET' && isDef(options.params)){
        options.url = addParamsToUrl(options.url , options.params);
      }
      console.log('network start : ' + options.url);
      console.log('request start');
      network.get(options.url,options,cbs_s,cbs_e);
  }
}
