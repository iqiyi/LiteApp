/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome, nextTick } from 'core/util/index'

import { ctx } from '../util/index'
import bridge from '../bridge/bridge'
import { saveEvent } from '../bridge/bridge-event'

import {
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from '../util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = patch

// public mount method
Vue.prototype.$mount = function (
  hydrating?: boolean
): Component {
  // regist mount patch for root
  bridge.readyToPatch();
  return mountComponent(this, undefined, hydrating)
}

// regist update patch
const _update = Vue.prototype._update;
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  _update.call(this,vnode,hydrating);
  bridge.readyToPatch();
}

// devtools global hook
/* istanbul ignore next */
Vue.nextTick(() => {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue)
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      `You are running Vue in development mode.\n` +
      `Make sure to turn on production mode when deploying for production.\n` +
      `See more tips at https://vuejs.org/guide/deployment.html`
    )
  }
}, 0)

// set native $on for native Component
/* if inApp */
Vue.prototype.$nativeOn = function (
  event: string | Array<string>,
  fn: Function
): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
            vm.$nativeOn(event[i], fn)
        }
    } else {
        saveEvent( vm._vnode.elm._uid , event , fn );
    }
    return vm
}


// call webview component custom function
Vue.prototype.$webviewCall = function(
  fnName : string , 
  params ?: string|number|Object
) : Component{
  const vm: Component = this
  bridge.component.webviewCall(vm._vnode.elm._uid,fnName , params);
  return vm;
}

// set global api and bridge
ctx.__thread__ = bridge;
// hack for isServerRendering in core/util/env
ctx.process = {
  env : {
    NODE_ENV : process.env.NODE_ENV
  }
};

//polyfill for log
const oldLog = console.log;
console.log = function(log){
  oldLog(log);
}
export default Vue
