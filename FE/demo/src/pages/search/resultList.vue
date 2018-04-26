<template>
    <div class="m-content" :style="style['m-content']">
        <div class="searchResultBody" :style="style['searchResultBody']">
        <div v-for="(item,index) in data.docinfos" style="padding: 1rem;height: 20rem;">
            
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
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
</script>
