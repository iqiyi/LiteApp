/* @flow */

import { registerBridge , finishConstruct , renderQueueDirect } from './bridge/bridge';
import { registerEvent } from './event/event';
import { isApp , isBrowser } from './util/util';

import * as callback from './event/callback';

// webview start
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    isBrowser && renderQueueDirect();
    registerBridge();
    // tell native that page ready
    isApp && finishConstruct();
    registerEvent();
  }, false);
}

// window.__webview__ register
window.__webview__ = window.__webview__ || {};
window.__webview__.callback = callback;
