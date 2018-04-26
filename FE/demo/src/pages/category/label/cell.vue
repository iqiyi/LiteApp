<template>
    <div style="display:inline-block;padding:20px;height:20px;line-height:20px;" @click="search">
        <span>{{cell_title}}</span>
    </div>
</template>
<script>
export default {
    props:['cell_title','label_list_index','label_search'],
    methods:{
        search:function(){
             this.label_search(1,2);
        }
    },
}
</script>

