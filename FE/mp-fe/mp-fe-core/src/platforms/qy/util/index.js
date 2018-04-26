/* @flow */

import { warn } from 'core/util/index'

export * from './attrs'
export * from './class'
export * from './element'
export * from './env'

export function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}
