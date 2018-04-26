import QYSwipedGroup from './webview/QYSwipedGroup.webview';
import QYSwiper from './webview/QYSwiper.webview';
import QYListview from './webview/QYListview/listview.webview';
import { extend } from './util/util';

window.__webview__ = window.__webview__ || {};
window.__webview__.__component__ = {};

[QYSwipedGroup,QYSwiper,QYListview].map(v=>{
  extend(window.__webview__.__component__,v);
})

