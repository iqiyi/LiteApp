import * as ui from './_app/webview/ui';
import { extend } from './util/index';

window.__webview__ = window.__webview__ || {};
window.__webview__.__api__ = {}

extend(window.__webview__.__api__,ui);

