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


import { extend } from '../../util/index';

export const confirm = {
  show : params => {
    console.info('confirm',params)
  }
}
export const loading = {
  show(params = {}){
    extend(
      (
        window.loadingDom = window.loadingDom || document.createElement('div')
      ),
      {
        className : `${params.className || 'qy-loading'}`,
        textContent : params.content || '',
      }
    )
    document.body.appendChild(window.loadingDom);
  },
  hide(params){
    console.log('loadingHide');
    if(window.loadingDom){
      window.loadingDom.parentNode.removeChild(window.loadingDom);
      window.loadingDom = null;
    }
  }
}

export const toast = {
  show : params => {
    extend(
      (
        window.toastDom = window.toastDom || document.createElement('div')
      ),
      {
        className : `${params.className || 'qy-toast'}`,
        textContent : params.content || '',
      }
    )
    document.body.appendChild(window.toastDom);

    setTimeout(()=>{
      window.toastDom.parentNode.removeChild(window.toastDom); 
    },params.duration || 3000)
  }
}
