<template>
    <div class="videoBody" :style="style['videoBody']">
        <div v-if="data" scroll-y >
            <info :playInfo="data.playInfo" />
            <des :playInfo="data.playInfo"/>
            <series v-if="data.videoList" :playInfo="data.playInfo" :videoList="data.videoList" :vid="vid" @changeVideo="changeVideo"/>
            <focus :bestViews="data.bestViews" :recommendVideos="data.recommendVideos" @changeVideo="changeVideo" />
            <foot />
        </div>
        <body_cover v-else />
    </div>
</template>
<script>
import info from './info.vue';
import des from './des.vue';
import series from './series.vue';
import focus from './focus.vue';
import footer from '../../../component/footer.vue';

import body_cover from './body_cover.vue'

export default {
    props:['data','vid'],
    data:function(){
        return {
            style : style
        }
    },
    methods:{
        changeVideo : function(){
            console.log('changeVideo',...arguments)
            this.$emit('changeVideo',...arguments)
        }
    },
    components : {
        info : info,
        des : des,
        series : series,
        focus : focus,
        foot : footer,

        body_cover : body_cover
    }
}

const style = {
    'videoBody' : ' position:relative; overflow:hidden; box-flex:1; -webkit-box-flex:1; '
}
</script>
