import { extend } from './util/util';

import QYInput from './native/QYInput.vue';
import QYVideo from './native/QYVideo.vue';
import QYNavigator from './native/QYNavigator.vue';
import QYPullToRefresh from './native/QYPullToRefresh.vue';

import QYActionSheet from './webview/QYActionSheet.vue';
import QYSwiped from './webview/QYSwiped.vue';
import QYSwipedGroup from './webview/QYSwipedGroup.vue';
import QYListview from './webview/QYListView/listview.vue';
import QYListblock from './webview/QYListView/listblock.vue';
import QYScrollView from './webview/QYScrollView.vue';
import QYSwiper from './webview/QYSwiper.vue';
import QYSwiperItem from './webview/QYSwiperItem.vue';



Vue.component('qy-swiped',QYSwiped);
Vue.component('qy-swipedgroup',QYSwipedGroup);
Vue.component('qy-listview',QYListview);
Vue.component('qy-listblock',QYListblock);
Vue.component('qy-input',QYInput);
Vue.component('qy-video',QYVideo);
Vue.component('qy-scrollview',QYScrollView);
Vue.component('qy-navigator',QYNavigator);
Vue.component('qy-pulltorefresh',QYPullToRefresh);
Vue.component('qy-actionsheet',QYActionSheet);
Vue.component('qy-swiper',QYSwiper);
Vue.component('qy-swiper-item',QYSwiperItem);



