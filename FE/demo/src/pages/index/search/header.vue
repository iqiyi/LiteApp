<template>
<div class="m-from-search" :style="style['m-from-search']">
    <div class="m-from-search-box" :style="style['m-from-search-box']">
        <div class="m-from-search-content" :style="style['m-from-search-content']">
            <div class="c-icon-search-layer" :style="style['c-icon-search-layer']" @click="searchGo" >
                <img :src="require('res/images/icon-search-gray.png')" />
            </div>

            <qy-input @input="searchChange" @confirm="searchConfirm" class="search-input" :style="style['search-input']" placeholder="网红魅影" type="text" :value="input_value" focus hover />


        </div>
        <div class="m-from-search-text" :style="style['m-from-search-text']" @click="search_hide">
            <span>取消</span>
        </div>
    </div>
</div>
</template>
<script>

export default {
    props:['search'],
    data:function(){
        return {
            style : style,
            input_value : ''
        }
    },
    methods:{
        search_hide:function(){
            this.$emit('search_show_or_hide');
        },
        searchChange:function(e){
            console.log('search on change ', e.params.detail.value);
            this.input_value = e.detail.value
        },
        searchConfirm:function(params){
            this.input_value = params;
            this.searchGo();
        },
        searchGo:function(){
            if(this.search){
                this.search(this.input_value)
            }else{
                qiyiApi.goPage('search',{
                    searchKey : this.input_value
                })
            }
        }
    }
}

const style = {
    'm-from-search' : 'width:100%;height:5.4rem;',
    'm-from-search-box' : ' position:fixed; top:0; width:100%; padding:1rem; box-sizing:border-box; display:flex; background-color:#fff; border-bottom:1px solid #f0f0f0; z-index:10; ',
    'm-from-search-content' : ' height:3.3rem; background-color:#f0f0f0; border-radius:3.3rem; box-sizing:border-box; position:relative; flex:1; padding-left:3.7rem; padding-right:2.8rem; line-height:3.3rem; min-height:3.3rem; padding-top:0; ',
    'c-icon-search-layer' : ' position:absolute; z-index:5; display:block; width:3rem; height:3rem; padding:.75rem; left:.75rem; top:50%; transform:translateY(-50%); ',
    'search-input' : 'width: 100%; height:3.3rem; font-size:1.4rem; line-height:3.3rem; min-height:3.3rem; margin-top:0; padding-top:0; ',
    'm-from-search-text' : ' font-size:1.4rem; color:#333; line-height:3.3rem; padding:0 .65rem 0 1.65rem; '
}
</script>
<style>
.c-icon-search-layer img{
    width:100%;height:100%;
    display:block;
}
</style>
