/* @flow */
import {
  getElm
} from './elm-ops';
import { isFunction } from '../util/util';

// qnode : { _uid , fn , params }
export function webviewComCall( qnode ){
  const __component__ = window.__webview__.__component__;
  if(!__component__){
    console.log('__component__ is not ready')
    return false;
  }

  if(!isFunction(__component__[qnode.fn])){
    console.log(`__component__ ${qnode.fn} is not registered`)
    return false;
  }

  __component__[qnode.fn].call(getElm(qnode),qnode.params)
}
