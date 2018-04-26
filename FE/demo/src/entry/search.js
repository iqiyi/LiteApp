import search from '../pages/search/index.vue';

var app = new Vue({
    template:'<search/>',
    components:{
        'search':search,
    },
    mounted:function(){
        qiyiApi.share('search',qiyiApi.getPageData())
    }
});
app.$mount();
