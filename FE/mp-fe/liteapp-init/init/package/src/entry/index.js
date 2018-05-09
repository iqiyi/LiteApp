import index from '../pages/index/index.vue';

var app = new Vue({
    template:'<liteapp-index/>',
    components:{
        'liteapp-index':index,
    },
    mounted:function(){
        console.log('page mounted');
    }
})
app.$mount()

