import { extend } from './util/util';

import QYInput from './webview/QYInput.vue';
import QYVideo from './webview/QYVideo.vue';
import QYSwiped from './webview/QYSwiped.vue';
import QYSwipedGroup from './webview/QYSwipedGroup.vue';
import QYListview from './webview/QYListView/listview.vue';
import QYListblock from './webview/QYListView/listblock.vue';
import QYScrollView from './webview/QYScrollView.vue';
import QYSwiper from './webview/QYSwiper.vue';
import QYSwiperItem from './webview/QYSwiperItem.vue';

import QYSwipedGroup_webview from './webview/QYSwipedGroup.webview';
import QYSwiper_webview from './webview/QYSwiper.webview';
import QYListview_webview from './webview/QYListview/listview.webview';

Vue.component('qy-swiped',QYSwiped);
Vue.component('qy-swipedgroup',QYSwipedGroup);
Vue.component('qy-listview',QYListview);
Vue.component('qy-listblock',QYListblock);
Vue.component('qy-input',QYInput);
Vue.component('qy-video',QYVideo);
Vue.component('qy-scrollview',QYScrollView);
Vue.component('qy-swiper',QYSwiper);
Vue.component('qy-swiper-item',QYSwiperItem);

window.__webview__ = window.__webview__ || {};
window.__webview__.__component__ = {};

[QYSwipedGroup_webview,QYSwiper_webview,QYListview_webview].map(v=>{
  extend(window.__webview__.__component__,v);
})



