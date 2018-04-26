<template>
    <div class="m-play" :style="style['m-play']">
        <qy-video v-if="videoSrc" class="video" :style="style['video']" :src="videoSrc" autoplay controls hover /> 

        <floatLayer v-else />
    </div>
</template>
<script>
import floatLayer from './floatLayer.vue'

export default {
    props:['videoSrc'],
    data:function(){
        return {
            style : style,
        }
    },
    components:{
        floatLayer : floatLayer
    },
    updated:function(){
        console.log('video updated')
    }
}
const style = {
    'm-play' : ' position:fixed; width:100%;height:21.1rem;z-index:999;',
    'video' : ' width:100%;height:100%;display:inline-block; line-height:0; overflow:hidden; position:relative; '
}
</script>
