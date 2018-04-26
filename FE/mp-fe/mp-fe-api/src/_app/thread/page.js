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
import { isDef , addParamsToUrl , searchToObject } from '../../util/index';

export function goPage(page , data){
    const params = {
        path : page,
        data : data
    }
    console.log('[api goPage] : ' + JSON.stringify(params))
    baseCall('goPage',params);
}
export function getPageData(){
    console.log('[api getPagedata] : ' + __page__data)
    return __page__data;
}

export function setSwipeRefresh( data ){
    console.log('[api setSwipeRefresh] : ' + JSON.stringify(data));
    baseCall('setSwipeRefresh',data);
    __thread__.event.removeBaseEvent('swipeRefreshed');
    __thread__.event.saveBaseEvent('swipeRefreshed',data.swipeRefreshed);
}
