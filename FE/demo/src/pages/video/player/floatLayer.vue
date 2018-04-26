<template>
    <!-- floatLayers -->
    <div>
        <div class="m-floatLayer" :style="style['m-floatLayer']">
            <div class="m-floatLayer_content" :style="style['m-floatLayer_content']">
                <img class="c-loading_logo" :style="style['c-loading_logo']" :src="require('res/images/loading-logo.png')"></img>
                <div class="m-floatLayer_link" :style="style['m-floatLayer_link']">
                    <img class="c-icon-loading" :style="style['c-icon-loading']" :src="require('res/images/c-icon-loading-black.gif')"/>
                    <span>即将播放</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            style : style
        }
    }
}

const style = {
    'm-floatLayer' : ' position:absolute; top:0; left:0; width:100%; height:100%; background-color:rgb(30, 30, 30); ',
    'm-floatLayer_content' : ' position:absolute; left:50%; top:50%; width:90%; transform:translate(-50%,-50%); padding-top:1px; padding-bottom:1px; color:white; font-size:1.3rem; line-height:1.3rem; text-align:center; ',
    'c-loading_logo' : ' display:inline-block;width:17.5rem; height:5.9rem; margin-bottom:.35rem; ',
    'm-floatLayer_link' : ' margin-top:2rem; ',
    'c-icon-loading' : ' display:inline-block;margin-top:-.35rem; margin-right:.7rem; width:2rem; height:2rem; vertical-align:middle; '
}
</script>
