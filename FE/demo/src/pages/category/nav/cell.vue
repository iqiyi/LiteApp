<template>
    <div style="display:inline-block;width:25%;text-align:center;" @click="nav_search">
        <span>{{cell_title}}</span>
    </div>
</template>
<script>
export default {
    props:['cell_title','index'],
    methods:{
        nav_search:function(){
            console.log('nav cell clicked : ' + this.cell_title);
            this.$emit('nav_search',this.cell_title);
        }
    }
}
</script>
