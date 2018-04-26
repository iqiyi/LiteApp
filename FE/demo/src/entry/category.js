import category from '../pages/category/category.vue';

var app = new Vue({
    template:'<mp-category/>',
    components:{
        'mp-category':category,
    },
    mounted:function(){
        qiyiApi.share('category',qiyiApi.getPageData())
    }
})
app.$mount()
