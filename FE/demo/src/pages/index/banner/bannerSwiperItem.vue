<template>
    <qy-swiper-item class="m-swiperList_item" >
        <div class="m-swiperList_item-wrap" >
            <div class="m-swiperList_cover" >
                <img :src="itemData.imageUrl" class="m-swiperList_img"/>
            </div>
            <div class="m-swiperList_info" >
                <span class="m-swiperList_info-h2">{{showContent.contentA}}</span>
                <span class="m-swiperList_info-p">{{showContent.contentB}}</span>
                <span class="m-swiperList_info-p">{{showContent.contentC}}</span>
                <span class="m-swiperList_info-p">{{showContent.contentD}}</span>
            </div>
        </div>
    </qy-swiper-item>
</template>
<script>
export default {
    props:['itemData'],
    data:function(){

        let video = this.itemData;
        let videoType = getVideoTemplate(video);
        let showContent = {};

        if (videoType == 'album') {
            showContent = {
                qipuId: video.tvid,
                contentA: video.mainTitle,
                contentB: video.showContent,
                contentC: video.mainActors ? '主演：' + video.mainActors : '',
                contentD: video.focus
            }
        } else if (videoType == 'source') {
            showContent = {
                qipuId: video.tvid,
                contentA: video.sourceName,
                contentB: video.updateStrategy,
                contentC: video.hosts ? '主持人：' + video.hosts : '',
                contentD: video.mainTitle
            }
        } else if (videoType == 'movie') {
            showContent = {
                qipuId: video.tvid,
                contentA: video.mainTitle,
                contentB: video.directors ? '导演：' + video.directors : '',
                contentC: video.mainActors ? '主演：' + video.mainActors : '',
                contentD: video.focus,
                isMovie: true
            }
        }
        return {
            showContent:showContent
        }
    }
}
// 判断视频种类
function getVideoTemplate({isSolo, isSource,  channelId, cid }) {
    const VIDEO_TEMPLATE = { // 视频模板
        ALBUM: 'album', // 专辑类 剧集类
        SOURCE: 'source', // 来源类
        MOVIE: 'movie', // 电影
        SHORT: 'short' //  短视频
    };
    var videoTemplate = VIDEO_TEMPLATE;
    var template = '';
    cid = cid || channelId || '';

    if (cid && cid == 1) {
        template = videoTemplate.MOVIE;
    } else if (!isSource && isSolo) {
        template = videoTemplate.SHORT;
    } else if (!isSource && !isSolo) {
        template = videoTemplate.ALBUM;
    } else {
        template = videoTemplate.SOURCE;
    }

    return template;
}
</script>
<style>
.m-swiperList_item{
    display:inline-block; overflow:hidden;
}
.m-swiperList_item-wrap{ display:-webkit-box; display:box; width:34.5rem; height:14rem; margin-left:auto; margin-right:auto; padding:2rem; box-sizing:border-box; border-radius:.5rem; text-align:center; background-color:#fff; color:#666; -webkit-box-shadow:0 .2rem 1.2rem rgba(90,90,90,.1); box-shadow:0 .2rem 1.25rem rgba(90,90,90,.1);}
.m-swiperList_cover{float:left; position:relative; width:7.5rem; height:10rem; margin-right:2rem; overflow:hidden; }
.m-swiperList_info{ -webkit-box-flex:1; box-flex:1; font-size:1.5rem; line-height:2.5rem; text-align:left; position:relative;}
.m-swiperList_info-h2{ font-size:1.8rem; color:#333; font-weight:700; display:block; width:20rem; height:2.5rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.m-swiperList_info-p{ display:block; width:21rem; height:2.5rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:1.4rem; }
.m-swiperList_img{width:100%;height:100%;display:block;object-fit:fill;}
</style>
