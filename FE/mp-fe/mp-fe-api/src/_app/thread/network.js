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
    return requestHandler();
    function requestHandler(){
        // add data to url for GET
        if(options.method == 'GET' && isDef(options.params)){
            options.url = addParamsToUrl(options.url , options.params);
        }
        console.log('network start : ' + options.url);
        console.log('request start');

        // headers adaptor
        let headers = options.headers;
        let headersArray = [];
        if(headers){
            Object.keys(headers).map(v=>{
                let o = {
                    key : v,
                    value : headers[v]
                };
                headersArray.push(o)
            })
        }
        options.headers = headersArray;
        // json parse for native request
        let success = options.success;
        options.success = function( json ){
            success && success( JSON.parse(json) );
        }
        let fail = options.fail;
        options.fail = function( json ){
            fail && fail( JSON.parse(json) );
        }
        baseCall( 'request' , options );
    }
}
