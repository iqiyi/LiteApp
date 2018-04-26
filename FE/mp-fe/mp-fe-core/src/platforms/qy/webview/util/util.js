export const isApp = location.protocol.indexOf('http') === -1;
export const isBrowser = !isApp;
export const isIosApp = isApp && typeof window.webkit !== 'undefined';
export const isAndroidApp = isApp && !isIosApp;

export function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}
