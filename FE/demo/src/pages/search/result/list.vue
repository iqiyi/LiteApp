<template>
    <div  v-if="data && data.docinfos.length > 0"  class="m-content" :style="style['m-content']">
        <div class="searchResultBody" :style="style['searchResultBody']">
            <div v-for="(item,index) in data.docinfos">
                <cell_1 v-if="item.albumDocInfo.videoDocType == 1" :cellData="item" />
                <cell_2 v-else-if="item.albumDocInfo.videoDocType == 2" :cellData="item" />
            </div>
        </div>
    </div>
</template>
<script>
import cell_1 from './cell_1.vue';
import cell_2 from './cell_2.vue';
export default {
    props: ['data'],
    components : {
        cell_1 : cell_1,
        cell_2 : cell_2
    },
    data:function(){
        return {
            style : style
        }
    },
    methods: {
        "swiper_end": function(index) {
            console.log('swiper touchend ' + index, this)
            this.$emit('swiper_touchend', index);
        },
        "scroll_end":function(){
            this.$emit('scroll_end');
        }
    },
}

const style = {
    'm-content' : ' width:100%; ',
    'searchResultBody' : ' position:relative; overflow:hidden; box-flex:1; -webkit-box-flex:1; width:100%; '
}
</script>

