<template>
    <div class="m-banner_toplogo" :style="style['m-banner_toplogo']">
        <img class="c-icon-bannerLogo" :src="require('res/images/logo-white.png')" :style="style['c-icon-bannerLogo']"></img>
        <div class="m-from-search-home" data-rseat="wx_sy_searchButton" :style="style['m-from-search-home']">
            <div class="m-from-search-home-content" :style="style['m-from-search-home-content']" @click="search_click">
                <img class="c-icon-search-center" :src="require('res/images/icon-search-gray3.png')" :style="style['c-icon-search-center']"></img>
                <div class="search-home-input" :style="style['search-home-input']">网红魅影</div>
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
    },
    methods:{
        search_click:function(){
            console.log('search_click')
            this.$emit('search_show_or_hide');
        },
        request_data:function(){
            this.$emit('request_data');
        }
    }
}
const style = {
    "m-banner_toplogo":" position:absolute; top:0; left:0; right:0; z-index:5; display:flex; padding:0 1.5rem;",
    "c-icon-bannerLogo":"width:7.3rem; height:2.4rem; margin-top:1rem; margin-right:1.7rem;",
    "m-from-search-home":" height:2.8rem; flex:1; line-height:2.8rem; font-size:1.3rem; margin-top:0.8rem; color:#333;",
    "m-from-search-home-content":" flex:1; height:100%; background-color:rgba(255, 255, 255, 0.7); border-radius:2.8rem; box-sizing:border-box; position:relative; text-align:center;",
    "c-icon-search-center":" z-index:5; display:inline-block; width:1.3rem; height:1.3rem; margin-right:0.7rem;",
    "search-home-input":" height:100%; min-height:1.5rem; border-radius:1.5rem; display:inline-block; "
}
</script>
