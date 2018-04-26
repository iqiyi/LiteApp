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


export const confirm = {
  show : params => {
    let yes = __thread__.callback.saveCallback( params.yes )
    let no = __thread__.callback.saveCallback( params.no )

    __thread__.api.webviewCall('confirm.show',{
      content : params.content,
      buttons : params.buttons,
      yes : yes,
      no : no
    })
  }
}
export const loading = {
  show : params => {
    console.log('loadingShow');
    __thread__.api.webviewCall('loading.show',params)
  },
  hide : params => {
    console.log('loadingHide');
    __thread__.api.webviewCall('loading.hide',params)
  }
}

export const toast = {
  show : params => {
    __thread__.api.webviewCall('toast.show',params);
  }
}

