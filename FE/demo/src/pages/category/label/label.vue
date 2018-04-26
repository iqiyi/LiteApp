<template>
<view class="m-box" :style="style['m-box']">
    <view class="m-sortList" :style="style['m-sortList']">
        <list v-for="( item , index ) in condition_cell" :class="`${channel_item.cid}_${index}`" :key="`${channel_item.cid}_${index}`" :condition_cell_index="index" :condition_cell_item="item" @label_search="label_search" :channel_item="channel_item" />
    </view>
</view>
</template>
<script>
import config from '../_config/config';
import list from './list.vue';

export default {
    props : ['channel_item','condition_cell'],
    data : function(){
        return {
            conditionCell : config.conditions[this.channel_item.cid],
            style : style
        }
    },
    components:{
        list : list
    },
    methods:{
        label_search : function(conditionItem){
            this.$emit('label_search',conditionItem)
        }
    },
    updated:function(){
        console.log('label.vue',this.conditionCell,config.conditions[this.channel_item.cid])
        //this.$set(this,'conditionCell',config.conditions[this.channel_item.cid])
    }
}

const style = {
    'm-box' : ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-sortList' : ' padding:.09rem 0; '
}
</script>


