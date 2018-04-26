import user from '../pages/user/user.vue';

var app = new Vue({
    template:'<user/>',
    components:{
        'user':user,
    },
    mounted:function(){
        qiyiApi.share('user',qiyiApi.getPageData())
    }
});
app.$mount();

