<template>
<qy-swiper data-qipu-id="722857200" class="m-swiperList" @swiper_end.native="swiper_end">
    <bannerSwiperItem :itemData="item" v-for="(item,index) in data.focus" :key="index"/>
</qy-swiper>
</template>
<script>
import bannerSwiperItem from './bannerSwiperItem.vue';
export default {
    props:['data'],
    updated:function(){
        console.log('swiperImg updated');
    },
    methods:{
        "swiper_end":function(e){
            console.log('swiper_end' + e.detail.index)
            this.$emit('swiper_end',e.detail.index);
        }
    },
    components:{
        bannerSwiperItem:bannerSwiperItem
    }
}


</script>
<style>
.m-swiperList{
    position:absolute; left:0; bottom:-1.5rem; z-index:5; width:100%; height:15.5rem;
}
</style>
