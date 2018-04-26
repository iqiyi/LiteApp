<template>
<div :class="is_channel_new_title ? 'm-list-horizontal_item' : 'm-list_item'" :style="style[is_channel_new_title ? 'm-list-horizontal_item' : 'm-list_item']" @click="goTv">
    <div :class="is_channel_new_title ? 'm-list-horizontal_item-pic' : 'm-list_item-pic'" :style="style[is_channel_new_title ? 'm-list-horizontal_item-pic' : 'm-list_item-pic']">
        <img mode="aspectFill" class="m-list_item-pic_image" :style="style['m-list_item-pic_image']" :src="cellData.imageUrl" />
        <div class="m-list_c-rb" :style="style['m-list_c-rb']">
            <span class="m-list_c-date" :style="style['m-list_c-date']">{{cellData.showContent}}</span>
        </div>
        <cellIcon :iconData="cellData"/>
    </div>
    <div class="m-list-picTitle" :style="style['m-list-picTitle']">
        <span>{{cellData.mainTitle}}</span>
    </div>
</div>
</template>
<script>
import cellIcon from '../../../component/cellIcon.vue';
export default {
    props:['cellData','is_channel_new_title'],
    data:function(){
        return {
            style:style
        }
    },
    methods:{
        goTv:function(){
            qiyiApi.goPage('video',{
                tvid : this.cellData.tvid
            });
        }
    },
    components:{
        cellIcon:cellIcon
    }
}
const style = {
    'm-list_item':' padding-left:.15rem; width:33.3333%; box-sizing:border-box; ',
    'm-list-horizontal_item':' width:18.65rem; margin-left:.01rem; ',
    'm-list_item-pic':' position:relative; width:100%; height:16.5rem; overflow:hidden; ',
    'm-list-horizontal_item-pic':' position:relative; width:100%; height:10.55rem; overflow:hidden; ',
    'm-list_item-pic_image':' width:100%; height:100%;objectFit:cover; ',
    'm-list_c-rb':' width:100%; height:4rem; position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); ',
    'm-list_c-date':' position:absolute; top:2.05rem; right:1rem; color:white; font-size:1.05rem; ',
    'm-list-picTitle':' max-height:3.8rem; overflow:hidden; font-size:1.4rem; line-height:1.9rem; margin:1rem 1rem 1.75rem 1rem; '
}
</script>

