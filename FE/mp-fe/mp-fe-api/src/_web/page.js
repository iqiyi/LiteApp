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
import { isDef , addParamsToUrl , searchToObject } from '../util/index';
import { baseCall } from './base';

export function goPage(page , data){
  let arr = window.location.pathname.split(/\//);
  arr[arr.length-2] = page;
  let url = arr.join('/');
  window.location.href = addParamsToUrl(url , data);
}
export function popPage(page , data){
    history.go(-1);
}
export function getPageData(){
  let pageData = {};
  pageData = searchToObject();
  console.log('[api getPagedata] : ' + pageData)
  return pageData;
}

export function setSwipeRefresh( data ){
    console.log('[api setSwipeRefresh] : ' + JSON.stringify(data));
    baseCall('setSwipeRefresh',data);
    __thread__.event.removeBaseEvent('swipeRefreshed');
    __thread__.event.saveBaseEvent('swipeRefreshed',data.swipeRefreshed);
}
