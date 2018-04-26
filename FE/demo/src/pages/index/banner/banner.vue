<template>
    <div class="m-banner" :style="style['m-banner']">
        <bannerImg :data="data" :bannerIndex="bannerIndex" :search_show_or_hide="search_show_or_hide" />
        <bannerSwiper v-if="data" :data="data" @swiper_end="swiper_end" />
    </div>
</template>
<script>

import bannerImg from './bannerImg.vue';
import bannerSwiper from './bannerSwiper.vue';

export default {
    props:['data','search_show_or_hide','bannerIndex','swiper_end'],
    data:function(){
        return {
            style:style
        }
    },
    components:{
        bannerImg:bannerImg,
        bannerSwiper:bannerSwiper
    }
}

const style = {
    'm-banner' : ' position:relative; width:100%; height:800rpx; '
}
</script>
