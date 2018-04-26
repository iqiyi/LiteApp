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


import QYSwipedGroup from './webview/QYSwipedGroup.webview';
import QYSwiper from './webview/QYSwiper.webview';
import QYListview from './webview/QYListview/listview.webview';
import { extend } from './util/util';

window.__webview__ = window.__webview__ || {};
window.__webview__.component = {};

[QYSwipedGroup,QYSwiper,QYListview].map(v=>{
  extend(window.__webview__.component,v);
})

