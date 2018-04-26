<template>
    <div>
        <div v-if="search_show" class="m-box-search" :style="style['m-box-search']">
            <search-header @search_show_or_hide="search_show_or_hide" :search="search"/>
            <default_search :search="search" />
        </div>
    </div>
</template>
<script>
import header from './header.vue';
import default_search from './default_search.vue'

export default {
    props:['search_show','search'],
    data:function(){
        return {
            style : style
        }
    },
    components:{
        searchHeader:header,
        default_search:default_search
    },
    mounted:function(){
        console.log('search init',this)
    },
    updated:function(vnode){
        console.log(vnode,this)
    },
    methods:{
        search_show_or_hide:function(){
            this.$emit('search_show_or_hide');
        }
    }
}
const style = {
    'm-box-search' : ' position:fixed; top:0; bottom:0; left:0; right:0; background-color:#fff; z-index:10; ',

}
</script>
