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




