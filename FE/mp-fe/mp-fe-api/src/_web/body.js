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


import { isDef } from '../util/index';

const bodyEvent = {
    scrollEnd : {
        add : function(fn){
            window.addEventListener('scroll',function(){
                if(document.body.scrollHeight - window.scrollY < window.screen.availHeight + 100 ) {
                     isDef(fn) && fn.call(null);
                }
            })
        }
    }
}

export function addBodyEvent( event , fn ){
    bodyEvent[event].add(fn);
}
