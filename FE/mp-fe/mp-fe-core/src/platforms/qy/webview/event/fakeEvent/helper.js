/* @flow */

export function attachEvent(
    element : documentElement,
    eventName : string,
    callback ?: Function
):void {
    if ('addEventListener' in window) {
        return element.addEventListener(eventName, callback, false);
    }
}
export function fireFakeEvent (
    e : documentEvent ,
    eventName : string
):void{
    if (document.createEvent) {
        console.log(`[${eventName}] fired`)
        return e.target.dispatchEvent(createEvent(eventName));
    }
}
export function createEvent (name:string):void{
    if (document.createEvent) {
        var evnt = window.document.createEvent('HTMLEvents');

        evnt.initEvent(name, true, true);
        evnt.eventName = name;

        return evnt;
    }
}
export function getRealEvent (e:documentEvent):void{
    if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
        return e.originalEvent.touches[0];
    } else if (e.touches && e.touches.length) {
        return e.touches[0];
    }
    return e;
}
