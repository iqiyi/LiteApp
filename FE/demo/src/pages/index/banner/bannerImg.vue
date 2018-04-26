<template>
    <div class="m-banner_imageBox" :style="style['m-banner_imageBox']" >
        <div class="m-banner_image-cover" :style="style['m-banner_image-cover']"></div>
        <div class="m-banner_image-cover-top" :style="style['m-banner_image-cover-top']"></div>
        <header_top @search_show_or_hide="search_show_or_hide" />
        <img v-if="data" :src="data.focus[bannerIndex].bgimg" class="m-banner_image" :style="style['m-banner_image']" @click="goVideo(data.focus[bannerIndex].tvid)" />
        <img mode="aspectFit" class="c-icon-play" :style="style['c-icon-play']" :src="require('res/images/c-icon-play.png')" @click="goVideo(data.focus[bannerIndex].tvid)" />
    </div>
</template>
<script>
import header from './header.vue';
import bannerImg from './bannerImg.vue';

export default {
    props:['data','search_show_or_hide','bannerIndex'],
    data:function(){
        return {
            style:style
        }
    },
    methods:{
        goVideo : function( tvid ){
            console.log('goVideo',tvid)
            qiyiApi.goPage( 'video',{tvid:tvid} )
        }
    },
    components:{
        header_top:header,
        bannerImg:bannerImg
    }
}

const style = {
    'm-banner_imageBox':' width:100%; height:37.5rem;',
    'm-banner_image-cover':' width:100%; height:7.5rem; position:absolute; left:0; bottom:0; z-index:1; background-image:-webkit-linear-gradient(top, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 100%); background-image:linear-gradient(to bottom,rgba(250,250,250,0) 0%, rgba(250,250,250,1) 100%); background-repeat:repeat-x; ',
    'm-banner_image-cover-top':' width:100%; height:7rem; position:absolute; left:0; top:0; z-index:1; background-image:-webkit-linear-gradient(top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%); background-image:linear-gradient(to bottom,rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%); background-repeat:repeat-x; ',
    'm-banner_image':'width:100%;height:100%;',
    'c-icon-play':' display:block; position:absolute; top:10.25rem; left:50%; z-index:5; width:5.5rem; height:5.5rem; -webkit-transform:translateX(-50%); transform:translateX(-50%); border-radius:50%; '
}
</script>
