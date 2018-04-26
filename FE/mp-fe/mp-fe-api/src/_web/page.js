/* @flow */
import { isDef , addParamsToUrl , searchToObject } from '../util/index';

export function goPage(page , data){
  let arr = window.location.pathname.split(/\//);
  arr[arr.length-2] = page;
  let url = arr.join('/');
  window.location.href = addParamsToUrl(url , data);
}
export function getPageData(){
  let pageData = {};
  pageData = searchToObject();
  console.log('[api getPagedata] : ' + pageData)
  return pageData;
}
