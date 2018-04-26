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


export function FilteredEvent(event){
    // filter loop object in event , so that event can be stringify to JSON
    function TouchListFilter( touchList , allowed = [] ){
        let FilteredTouchList = []
        let i = event.changedTouches.length;
        while(i--){
            let cell = event.changedTouches[i];
            allowed.forEach((v)=>{
                (FilteredTouchList[i] = FilteredTouchList[i] || [])[v] = cell[v];
            })
        }
        return FilteredTouchList;
    }
    function TargetFilter( target , allowed = [] ){
        let FilteredTarget = {}
        allowed.forEach((v)=>{
            FilteredTarget[v] = target[v];
        })
        FilteredTarget._uid = target.getAttribute('_uid')
        return FilteredTarget;
    }
    if(event.type.indexOf('touch') > -1){
        this.changedTouches = TouchListFilter( event.changedTouches , ['clientX','clientY','pageX','pageY'] )
        this.touches = TouchListFilter( event.touches , ['clientX','clientY','identifier','pageX','pageY'] )
        this.realTarget = TargetFilter(
          document.elementFromPoint(this.touches[0].clientX, this.touches[0].clientY)
        )
    }
    this.currentTarget = TargetFilter( event.currentTarget , ['dataset','id','offsetLeft','offsetTop'] );
    this.detail = event.detail || { value : event.target.value };
    this.target = TargetFilter( event.target , ['dataset','id','offsetLeft','offsetTop'] );
    this.timeStamp = event.timeStamp;
}
