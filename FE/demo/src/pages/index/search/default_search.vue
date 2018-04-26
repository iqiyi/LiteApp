<template>
    <div class="defaultSearch">
        <!-- 搜索历史 -->
        <div class="m-title" :style="style['m-title']">
            <span class="m-title_h" :style="style['m-title_h']">搜索历史</span>
            <div class="m-title_clear" :style="style['m-title_clear']" @click="clear_history">
                <span class="m-title_clearTx" :style="style['m-title_clearTx']">清空历史</span>
            </div>
        </div>
        <div class="search-layer-list" :style="style['search-layer-list']">
            <div class="search-layer-list-content" :style="style['search-layer-list-content']">
                <div v-for="(item,index) in search_history" :key="index" class="search-layer-list-items" :style="style['search-layer-list-items']"
                    @click="goSearch(item)">
                    <span>{{item}}</span>
                </div>
            </div>
        </div>

        <!-- 热门搜索 -->
        <div class="m-title" :style="style['m-title']">
            <span class="m-title_h" :style="style['m-title_h']">热门搜索</span>
        </div>
        <div class="search-layer-list" :style="style['search-layer-list']">
            <div class="search-layer-list-content" :style="style['search-layer-list-content']">
                <div v-for="(item,index) in search_hot" :key="index" class="search-layer-list-items" :style="style['search-layer-list-items']"
                    @click="goSearch(item)">
                    <span class="search-layer-list-items-num" :style="style['search-layer-list-items-num'] + 'background-color:' + numStyle[index]">{{index+1}}</span>
                    <span>{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['search'],
    methods:{
        clear_history:function(){
            this.search_history = [];
        },
        goSearch:function(searchKey){
            if(this.search){
                this.search(searchKey)
            }else{
                qiyiApi.goPage('search',{
                    searchKey : searchKey
                })
            }
        }
    },
    data:function(){
        return {
            search_history:[
                '我们的少年时代','我的前半生','楚乔传' 
            ],
            search_hot:[
                '西游记','网红魅影','龙珠超','爱情公寓','我的前半生','河神'
            ],
            style:style,
            numStyle:['#ff443f','#ff903b','#ffc535','#d9d9d9','#d9d9d9','#d9d9d9']
        }
    }
}
const style = {
    'm-title' : ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h' : ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-title_clear' : ' display:block; text-align:right; ',
    'm-title_clearTx' : ' display:inline-block; vertical-align:middle; font-size:1.4rem; line-height:1.5rem; color:#fc3d39; ',
    'search-layer-list' : ' padding:0 1rem; width:100%; box-sizing:border-box; ',
    'search-layer-list-content' : ' border-top:1px solid #f0f0f0; padding:.75rem 0 1.4rem; ',
    'search-layer-list-items' : ' font-size:1.4rem; color:#333; height:3.8rem; padding:1.2rem 0; box-sizing:border-box; display:inline-block; width:50%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ',
    'search-layer-list-items-num' : ' font-size:1.2rem; background-color:#ff443f; display:inline-block; width:1.4rem; height:1.4rem; line-height:1.4rem; padding:.1rem 0; box-sizing:border-box; text-align:center; margin-right:.7rem; color:#fff; '
}
</script>
