<template>
    <View class="tabbar">
    <Button style="z-index:100;position:fixed;top:350px;left:10px;width:50px;height:50px;background-image:url(http://www.qiyipic.com/common/fix/h5-v3/logoH5_addDesk-2x.png);background-size:contain;"
        @touchstart="showCell">
    </Button>
        <View>
            <cell v-for="(item,index) in tabbar.items" :cellData="item" :show="show" :key="index" :index="index" :cellImage="cellImage[index]" />
        </View>
    </View>
</template>
<script>
import cell from './cell.vue';
import manifest from 'app/package/conf/manifest.json';

export default {
    data:function(){
        return {
            tabbar : manifest.tabbar,
            show : false,
            cellImage : [
                'url(http://pic1.qiyipic.com/common/lego/20151217/a3e6bfa4c96a4e80bd1ad30be4169d34.png)',
                'url(http://pic2.qiyipic.com/common/lego/20151201/0a6df475b10c4057850e1743a964959f.png)',
                'url(http://pic8.qiyipic.com/common/lego/20151201/4d18a190d6f642458cf6e3de44034085.png)',
                'url(http://m.qiyipic.com/common/lego/20161202/a46f26845ed142b3ba960444f82e775a.png)',
                'url(http://pic8.qiyipic.com/common/lego/20151201/71817a629e254ec680b90feca93f2d7b.png)'
            ]
        }
    },
    methods:{
        showCell:function(){
            this.show = !this.show;
        }
    },
    components:{
        cell:cell
    },
    mounted:function(){
        console.log('tabbar')
    }
}
</script>

