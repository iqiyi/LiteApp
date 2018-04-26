<template>
<div class="m-list" :style="style['m-list']">
    <div class="m-title" :style="style['m-title']">
        <span class="m-title_h" :style="style['m-title_h']">{{title}}</span>
        <div class="m-title_more" :style="style['m-title_more']" @click="lookMore">
            <span class="m-title_moreTx" :style="style['m-title_moreTx']">查看更多</span>
            <img class="c-icon-more" :style="style['c-icon-more']" :src="require('res/images/c-icon-arrow.png')"/>
        </div>
    </div>

    <div :class="is_channel_new_title ? 'm-list-horizontal_content' : 'm-list_content'" :style="style[is_channel_new_title ? 'm-list-horizontal_content' : 'm-list_content']">
        <channel_cell v-for="(item,index) in listData" :key="index" :cellData="item" :is_channel_new_title="is_channel_new_title"/>
    </div>
</div>
</template>

<script>
import channel_cell from './channel_cell.vue';

export default {
    props:['listTitle','listData','channel_new_title','channel_order'],
    data:function(){
        return {
            style:style
        }
    },
    computed:{
        title:function(){
            return new Object({ dianshiju: '电视剧', dianying: '电影', zongyi: '综艺', dongman: '动漫' })[''+this.listTitle];
        },
        is_channel_new_title:function(){
            console.log('channel_new_title',this.channel_new_title.hasOwnProperty(this.listTitle))
            return this.channel_new_title.hasOwnProperty(this.listTitle);
        }
    },
    components:{
        channel_cell:channel_cell,
    },
    methods:{
        lookMore : function(){
            qiyiApi.goPage('category',{
                categoryIndex : new Object({ dianshiju: 0, dianying: 1, zongyi: 2, dongman: 3 })[''+this.listTitle]
            })
        }
    }
}

const style = {
    'm-list':' width:100%; border-bottom:1px solid #f0f0f0; overflow-x:hidden; ',
    'm-title':' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h':' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-title_more':' display:block; text-align:right; ',
    'c-icon-more':' display:inline-block; width:1.5rem; height:1.5rem; vertical-align:middle; margin-top:-.05rem; ',
    'm-list_content':' display:flex; align-items:flex-start; flex-wrap:wrap; margin-left:-3rpx; ',
    'm-list-horizontal_content':' display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; margin-left:-2rpx; '
}
</script>
