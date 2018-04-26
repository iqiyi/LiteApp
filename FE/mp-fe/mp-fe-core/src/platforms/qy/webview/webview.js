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

import { registerBridge , finishConstruct , renderQueueDirect } from './bridge/bridge';
import { registerEvent } from './event/event';
import { executeJS } from './event/bridge';
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
window.__webview__.bridge = {
    executeJS
};
window.__webview__.callback = callback;

