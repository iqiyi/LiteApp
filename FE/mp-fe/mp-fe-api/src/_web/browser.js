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
import { isDef , addParamsToUrl , webHost } from '../util/index';

export function share( page , data ){
  let url = addParamsToUrl( `${webHost}/123/web/src/_html/${page}.html` , data );
  this.baseCall( 'share' , {url} );
};
export function goBrowser( page , data ){
  let url = addParamsToUrl( `${webHost}/123/web/src/_html/${page}.html` , data );
  this.baseCall( 'goBrowser' , {url} );
}
