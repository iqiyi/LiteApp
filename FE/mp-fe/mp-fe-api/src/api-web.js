import 'whatwg-fetch';
import * as qiyiApi from './_web/index';
import * as ui from './_app/webview/ui';
import { ctx } from './util/index';
import { extend } from './util/index';

ctx.__api__ = ctx.qiyiApi = qiyiApi;

window.__webview__ = window.__webview__ || {};
window.__webview__.__api__ = {}

extend(window.__webview__.__api__,ui);


