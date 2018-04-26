<template>
    <div class="m-from-search-before" :style="style['m-from-search-before']" @click="search_show_or_hide">
        <div class="m-from-search-before-box" :style="style['m-from-search-before-box']">
            <div class="m-from-search-before-content" :style="style['m-from-search-before-content']">
                <img :src="require('res/images/icon-search-gray.png')" class="c-icon-search-center" :style="style['c-icon-search-center']"></img>
                <div class="search-before-input" :style="style['search-before-input']">网红魅影</div>
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
        search_show_or_hide : function(){
            this.$emit('search_show_or_hide')
        }
    }
}

const style = {
    'm-from-search-before' : ' width:100%; height:4.3rem; ',
    'm-from-search-before-box' : ' padding:1rem; box-sizing:border-box; position:fixed; top:0; width:100%; background-color:#fff; z-index:10; ',
    'm-from-search-before-content' : ' height:3.3rem; background-color:#f0f0f0; border-radius:3.3rem; box-sizing:border-box; position:relative; text-align:center; ',
    'c-icon-search-center' : ' z-index:5; display:inline-block; width:1.5rem; height:1.5rem; margin-right:.65rem; vertical-align:middle; ',
    'search-before-input' : ' height:3.3rem; font-size:1.4rem; min-height:1.5rem; border-radius:1.5rem; color:#999; line-height:3.3rem; display:inline-block; '
}
</script>

