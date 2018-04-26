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

import { 
    getRealEvent,
    fireFakeEvent,
    attachEvent
} from './helper';

// tap and hover event handler
export function registerTap( options = {
    fingerMaxOffset : 11
} ){
    let coords = {};
    const handlers = {
        start: function(e) {
            e = getRealEvent(e);

            coords.start = [e.pageX, e.pageY];
            coords.offset = [0, 0];

        },

        move: function(e) {
            if (!coords.start && !coords.move) {
                return false;
            }

            e = getRealEvent(e);

            coords.move = [e.pageX, e.pageY];
            coords.offset = [
                Math.abs(coords.move[0] - coords.start[0]),
                Math.abs(coords.move[1] - coords.start[1])
            ];
            // move out
            if (coords.offset && (coords.offset[0] > options.fingerMaxOffset || coords.offset[1] > options.fingerMaxOffset)){
                coords = {};
            }
        },

        end: function(e) {
            e = getRealEvent(e);
            if (coords.offset && coords.offset[0] < options.fingerMaxOffset && coords.offset[1] < options.fingerMaxOffset){
                fireFakeEvent(e, 'tap');
            }
            coords = {};
        }
    }
    const init = function(){
        attachEvent(document.documentElement, 'touchstart', handlers['start']);
        attachEvent(document.documentElement, 'touchmove', handlers['move']);
        attachEvent(document.documentElement, 'touchend', handlers['end']);
    }
    attachEvent(window, 'load', init);
}




