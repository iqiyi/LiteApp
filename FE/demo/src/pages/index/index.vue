<template>
    <div :style="searchShow ? 'overflow:hidden;height:100%;' : '' ">
        <banner :data="data" :search_show_or_hide="search_show_or_hide" :swiper_end="swiper_end" :bannerIndex="bannerIndex"/>
        <channel v-if="data" :data="data"/>
        <search :search_show="searchShow" @search_show_or_hide="search_show_or_hide" />
        <foot />
    </div>
</template>
<script>
import banner from './banner/banner.vue';
import search from './search/index.vue';
import channel from './channel/channel.vue';
import footer from '../../component/footer.vue';

export default {
    name:'index',

    data:function(){
        return {
            bannerIndex : 0,
            searchShow : false,
            data : false
        };
    },
    components:{
        banner:banner,
        search:search,
        channel:channel,
        foot:footer
    },
    methods:{
        "swiper_end":function(index){
            this.bannerIndex = index;
        },
        "search_show_or_hide":function(){
            this.searchShow = !this.searchShow;
        } 
    },
    mounted:function(){
        qiyiApi.request({
            url : 'https://pub.m.iqiyi.com/h5/mina/index/',
            success : (res)=>{
                console.log('[home data]:'+JSON.stringify(res))
                this.data = res.data
            }
        })
    },
    updated:function(){
        console.log('updated');
    }
}
</script>
