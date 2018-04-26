<template>
    <div class="m-video_function" :style="style['m-video_function']">
        <div class="m-video_function-one" :style="style['m-video_function-one']">
            <div class="m-film_playAmount" :style="style['m-film_playAmount']">
                <img class="c-icon-playAmount" :style="style['c-icon-playAmount']" :src="require('res/images/c-icon-playAmount.png')"/>
                <span>{{playCount}}</span>
            </div>
            <div class="m-video_function-clarity" :style="style['m-video_function-clarity']">
                <span class="c-clarity c-text-green" :style="style['c-clarity'] + style['c-text-green']">高清</span>
            </div>
            <div class="m-video_function-share" :style="style['m-video_function-share']" @click="goShare">
                <img class="c-icon-share" :style="style['c-icon-share']" :src="require('res/images/c-icon-share.png')"></img>
                <span class="c-clarity" :style="style['c-clarity']">分享</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ['playInfo'],
    computed : {
        playCount : function(){
            if(this.playInfo.playCount > 100000000){
                return (this.playInfo.playCount/100000000).toFixed(1) + '亿';
            }else if(this.playInfo.playCount > 10000){
                return (this.playInfo.playCount/10000).toFixed(1) + '万';
            }else{
                return this.playInfo.playCount
            }
        }
    },
    data : function(){
        return {
            style : style
        }
    },
    methods:{
        goShare:function(){
            qiyiApi.goBrowser( 'video' , qiyiApi.getPageData() )
        }
    }
}

const style = {
    'm-video_function' : ' height:6.35rem; padding:1.5rem; box-sizing:border-box; position:relative; ',
    'm-video_function-one' : ' display:flex; flex-direction:row; justify-content:space-between; ',
    'm-film_playAmount' : ' font-size:1.4rem; line-height:3.35rem; color:#999; width:8.4rem; ',
    'c-icon-playAmount' : ' display:inline-block;width:1.2rem; height:1.2rem; margin:-.5rem .7rem .05rem 0; vertical-align:middle; ',
    'm-video_function-clarity' : ' font-size:1.3rem; height:2.3rem;line-height:1.3rem; border:.1rem solid #0bbe06; box-sizing:border-box; padding:.45rem 1.15rem .5rem; border-radius:1.15rem; margin:.5rem 16.95rem .5rem 0; ',
    'c-clarity' : '',
    'c-text-green' : 'color:rgb(11,190,6)',
    'm-video_function-share' : 'font-size:1rem;position:relative',
    'c-icon-share' : ' width:2rem; height:2rem; display:block; margin-bottom:.25rpx; ',
}
</script>
