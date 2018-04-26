<template>
<div class="m-sortList-wrap" :style="style['m-sortList-wrap']">
    <div v-for="(item,index) in condition_cell_item.items" :key="`${channel_item.cid}_${condition_cell_index}_${index}` "
        class="m-sortList_item" :style="style['m-sortList_item'] + ( label_now == index ? style['select'] : '' )"
        @click="label_search( item , index )">
        <span>{{item}}</span>
    </div>
</div>
</template>

<script>
export default {
    props:['condition_cell_index','condition_cell_item','channel_item'],
    data:function(){
        return {
            label_now : 0,
            style : style
        }
    },
    methods:{
        label_search : function( item , index ){
            this.label_now = index;
            this.$emit( 'label_search' , this.condition_cell_item , item )
        }
    }
}

const style = {
    'm-sortList-wrap' : ' background-color:#fff; white-space:nowrap; padding:.6rem 0; box-sizing:border-box; ',
    'm-sortList_item' : ' font-size:1.3rem; color:#333; padding:0 1.3rem; background-color:#fff; border-radius:2.5rem; display:inline-block; height:2.5rem; line-height:2.5rem; box-sizing:border-box; ',
    'select' : ' color:#0bbe06; background-color:#f7f7f7; '
}
</script>

