import video from '../pages/video/video.vue';

var app = new Vue({
    template:'<mp-video/>',
    components:{
        'mp-video':video,
    },
    mounted:function(){
        qiyiApi.share('video',qiyiApi.getPageData())
    }
})
app.$mount()

