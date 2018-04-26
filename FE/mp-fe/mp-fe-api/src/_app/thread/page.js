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
