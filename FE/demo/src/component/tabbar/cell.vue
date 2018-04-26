<template>
    <Button @touchstart="goPage"
        style="z-index:99;display:block;position:fixed;width:50px;height:50px;background-size:contain;transition:all .3s ease-out;"
        :style="[style,image]">
    </Button>
</template>
<script>
export default {
    props:['cellData','show','index','cellImage'],
    computed:{
        style:function(){
            const showStyle = { top: 260 +  60 * this.index + 'px' , left:'80px' };
            const hideStyle = { top: '350px' , left:'10px' };
            return this.show ? showStyle : hideStyle;
        },
        image:function(){
            return {
                backgroundImage:this.cellImage
            }
        }
    },
    methods:{
        goPage:function(){
            qiyiApi.goPage(this.cellData.path);
        }
    }
}
</script>


