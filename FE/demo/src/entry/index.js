import index from '../pages/index/index.vue';

var app = new Vue({
    template:'<mp-index/>',
    components:{
        'mp-index':index,
    },
    mounted:function(){
        qiyiApi.share('index',qiyiApi.getPageData())
    }
})
app.$mount()
