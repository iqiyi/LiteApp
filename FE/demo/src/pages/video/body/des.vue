<template>
<div class="m-film" :style="style['m-film']">
    <div @click="showDetail">
        <div class="m-film_title" :style="style['m-film_title']">
            <span>{{playInfo.shortTitle}}</span>
            <image class="c-icon-bottom" :style="style['c-icon-bottom']" :src="require('res/images/c-icon-bottom.png')"></image>
        </div>
        <div class="m-film_update" :style="style['m-film_update']">
            <span>{{playInfo.updateStrategy}}</span>
        </div>

        <!-- 详情 -->
        <div v-if="isDetailShow" class="m-film_details" :style="style['m-film_details']">
            <div>
                <span>{{showContent}}</span>
            </div>
            <div>
                <span>看点：{{playInfo.tags}}</span>
            </div>
            <div class="m-film_intro" :style="style['m-film_intro']">
                <span>{{playInfo.desc}}</span>
            </div>
        </div>
        <div v-else />

    </div>
</div>
</template>
<script>
export default {
    props:['playInfo'],
    data:function(){

        let video = this.playInfo;
        let videoType = getVideoTemplate(video);
        let showContent = '';

        if (videoType == 'album') {
            showContent = video.mainActors ? '主演：' + video.mainActors : ''
        } else if (videoType == 'source') {
            showContent =  video.hosts ? '主持人：' + video.hosts : ''
        } else if (videoType == 'movie') {
            showContent = video.mainActors ? '主演：' + video.mainActors : ''
        }
        return {
            style:style,
            showContent:showContent,
            isDetailShow : false
        }
    },
    methods:{
        showDetail : function(){
            this.$set(this,'isDetailShow',!this.isDetailShow);
            //this.isDetailShow = !this.isDetailShow;
            console.log('isDetailShow',this.isDetailShow);
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

const style = {
    'm-film' : ' width:100%; padding:0 1.5rem 1.7rem 1.5rem; box-sizing:border-box; border-bottom:1rpx solid rgb(230, 230, 230);white-space:initial;border-bottom:.05rem solid #e6e6e6;',
    'm-film_title' : ' position:relative; font-size:1.8rem; font-weight:700; color:#333; line-height:2.5rem; max-height:5rem; overflow:hidden; padding-right:2rem; ',
    'c-icon-bottom' : ' position:absolute; top:0; left:32.85rem; width:1.7rem; height:.9rem margin-top:.6rem ',
    'm-film_update' : ' margin:.5rem 0 0 0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:1.4rem; line-height:2.4rem; color:#999; ',
    'm-film_details' : ' font-size:1.4rem; line-height:2.4rem; color:#999; ',
    'm-film_intro' : ' margin-top:1rem; text-align:justify; '
}
</script>
