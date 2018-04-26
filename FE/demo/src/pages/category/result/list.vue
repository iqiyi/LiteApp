<template>
    <div class="m-list" :style="style['m-list']">
        <div v-if="result_data != false" class="m-list_content" :style="style['m-list_content']">
            <cell v-for="(item,index) in result_data.data.docinfos" :key="`${channel_item.cid}_${index}`" :cellData="item" />
        </div>
    </div>
</template>
<script>
import cell from './cell.vue';

export default {
    props:['result_data','channel_item'],
    components:{
        cell:cell
    },
    data:function(){
        return {
            style : style
        }
    },
    mounted:function(){
        console.log(this.data)
    },
    updated:function(){
        console.log('[upated result]',this.data,this.$el.children)
    }
}

const style = {
    'm-list' : ' width:100%; border-bottom:.05rem solid #f0f0f0; overflow-x:hidden; ',
    'm-list_content' : ' display:flex; align-items:flex-start; flex-wrap:wrap; margin-left:-.15rem; ',
}
</script>
