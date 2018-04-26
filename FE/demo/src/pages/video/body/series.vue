<template>
    <div class="m-box" :style="style['m-box']">
        <div class="m-title" :style="style['m-title']">
            <span class="m-title_h" :style="style['m-title_h']">剧集</span>
            <div class="m-title_more" :style="style['m-title_more']">
                <span class="m-title_moreTx" :style="style['m-title_moreTx']">{{videoList.showContent}}</span>
                <img class="c-icon-more" :style="style['c-icon-more']" :src="require('res/images/c-icon-arrow.png')"></img>
            </div>
        </div>
        <div scroll-x class="m-scrollList-series" :style="style['m-scrollList-series']">
            <div class="m-scrollList-series-inner" :style="style['m-scrollList-series-inner']">
                <div v-for="(item,index) in videoList.videos" :key="index" class="m-scrollList-series_item" :style="style['m-scrollList-series_item']"
                    @click="changeVideo(item)" >
                    <img v-if="vid == item.vid" class="c-icon-play-s" :style="style['c-icon-play-s']" :src="require('res/images/c-icon-play-s.png')"></img>
                    <span v-else class="c-series_item" :style="style['c-series_item']">{{item.pd || (index + 1)}}</span>
                    <img v-if="item.payMark == 1" class="c-icon-vip-s" :style="style['c-icon-vip-s']" mode="aspectFit" :src="require('res/images/c-icon-vip-s.png')"></img>
                    <img v-else-if="item.type == 3" class="c-icon-ad-s" :style="style['c-icon-ad-s']" :src="require('res/images/c-icon-ad-s.png')"></img>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['playInfo','videoList','vid'],
    data : function(){
        return {
            style : style
        }
    },
    methods:{
        changeVideo:function( item ){
            console.log('changeVideo')
            this.$emit('changeVideo',item.qipuId,item.vid)
        }
    }
}

const style = {
    'm-box' : ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-title' : ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h' : ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-title_more' : ' display:block; text-align:right; ',
    'm-title_moreTx' : ' display:inline-block; vertical-align:middle; font-size:1.4rem; line-height:1.5rem; color:#666; ',
    'c-icon-more' : ' display:inline-block; width:1.5rem; height:1.5rem; vertical-align:middle; margin-top:-.05rem; ',
    'm-scrollList-series-inner' : ' padding-left:2rem; ',
    'm-scrollList-series_item' : ' position:relative; display:inline-block; vertical-align:top; width:5.5rem; height:5.5rem; margin-bottom:1rem; margin-right:1.5rem; margin-left:-.5rem; background-color:#f5f5f5; ',
    'c-icon-play-s' : ' display:block; position:absolute; top:50%; left:50%; z-index:5; width:1.8rem; height:1.8rem; -webkit-transform:translate(-50%,-50%); transform:translate(-50%,-50%); ',
    'c-series_item' : ' display:block; width:5.5rem; height:5.5rem; line-height:5.5rem; color:#333; text-align:center; font-size:1.5rem; font-weight:700; ',
    'c-icon-vip-s' : ' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; ',
    'c-icon-ad-s' : ' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; '

}
</script>
<style>
.m-scrollList-series{
    width:100%;height:6.5rem;margin-bottom:1rem;white-space:nowrap;
    overflow-x:auto;
}
</style>
