<template>
    <div class="m-box" :style="style['m-box']">
        <div style="position:relative;width:100%;height:50px;" />
        <div class="m-subTab-channel" :style="style['m-subTab-channel']" style="position:fixed;top:43px;z-index:10;background:#fff;">
            <div class="m-subTab-channel-scroll" :style="style['m-subTab-channel-scroll']">
                <span v-for="(item,index) in channels" :key="index" 
                    class="m-subTab-channel_item selected" :style="style['m-subTab-channel_item'] + ( nav_now == index ? style['selected'] : '' )"
                    @click="nav_search(item,index)">
                    {{item.cname}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>

import config from '../_config/config';
export default {
    props : ['nav_init'],
    data:function(){
        console.log('nav_init',this.nav_init)
        return {
            nav_now : this.nav_init,
            channels:config.channels,
            style : style
        }
    },
    methods:{
        nav_search : function( item,index ){
            this.nav_now = index;
            item.nav_now = index;
            this.$emit('nav_search',item);
        }
    }
}

const style = {
    'm-box' : ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-subTab-channel' : ' width:100%; ',
    'm-subTab-channel-scroll' : ' width:100%; ',
    'm-subTab-channel_item' : ' font-size:1.6rem; line-height:5rem; width:25%; text-align:center; height:5rem; box-sizing:border-box; float:left; position:relative; ',
    'selected' : ' color:#0bbe06;border-bottom:.25rem solid #00c000; ',

}
</script>
