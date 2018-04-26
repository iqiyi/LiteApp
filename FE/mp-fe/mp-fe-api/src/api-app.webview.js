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


import * as ui from './_app/webview/ui';
import * as body from './_app/webview/body';
import { extend } from './util/index';

window.__webview__ = window.__webview__ || {};
window.__webview__.api = {}

extend(window.__webview__.api,ui);
extend(window.__webview__.api,body);

