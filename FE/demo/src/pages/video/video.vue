<template>
    <div class="container" :style="style['container']">

        <player :videoSrc="videoSrc" />
        <div :style="style['m-play-placeholder']" />

        <mp-body :vid="vid" :data="data" @changeVideo="changeVideo" />
    </div>
</template>
<script>
import player from './player/player.vue';
import body from './body/body.vue';

import { getVideoSource } from '../../common/source/qiyiVideoSource';

function getVideoSrc(qipuId,vid){
    if( qipuId && vid ){
        getVideoSource({ qipuId : qipuId , vid : vid }).then(videoInfo=>{
            if(videoInfo && videoInfo.m3u){
                this.videoSrc = videoInfo.m3u;
                this.vid = vid;
                console.log('videoInfo',videoInfo)
            }
        }).catch((data)=>{
            console.log(data);
            this.videoSrc = data.m3u;
        });
    }
}
export default {
    components:{
        player : player,
        mpBody : body,
    },
    data:function(){
        return {
            style : style,
            data : false,
            qipuId : false,
            vid : false,
            videoSrc : false
        }
    },
    mounted:function(){
        let { tvid } = qiyiApi.getPageData();
        qiyiApi.request({
            url : `https://pub.m.iqiyi.com/h5/mina/${tvid}/`,
                success : result => {
                    this.data = result.data;
                    getVideoSrc.call(this,this.data.playInfo.qipuId,this.data.playInfo.vid)
                }
        });
    },
    methods:{
        changeVideo : function(qipuId,vid){
            getVideoSrc.call(this,qipuId,vid)
        }
    }
}

const style = {
    'container' : ' background-color:#fff; width:100%; height:100%;box-sizing:border-box; ',
    'm-play-placeholder' : 'position:relative; width:100%;height:21.1rem; ',
}
</script>
