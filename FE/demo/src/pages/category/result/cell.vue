<template>
    <div class="m-list_item" :style="style['m-list_item']" @click="goVideo">
        <div class="m-list_item-pic" :style="style['m-list_item-pic']">
            <img mode="aspectFill" :src="cellData.albumDocInfo.albumImg" class="m-list_item-pic_image" :style="style['m-list_item-pic_image']"/>
            <div class="m-list_c-rb" :style="style['m-list_c-rb']">
                <span class="m-list_c-date" :style="style['m-list_c-date']">{{cellData.albumDocInfo.score}}</span>
            </div>
        </div>
        <div class="m-list-picTitle" :style="style['m-list-picTitle']">
            <span>{{cellData.albumDocInfo.albumTitle}}</span>
        </div>
    </div>
</template>

<script>
import cell from './cell.vue';
export default {
    props:['cellData'],
    data:function(){
        return {
            style : style
        }
    },
    components:{
        cell:cell
    },
    methods:{
        goVideo : function(){
            qiyiApi.goPage('video',{
                tvid : this.cellData.albumDocInfo.videoinfos[0].tvId
            })
        }
    }
}

const style = {
    'm-list_item' : ' padding-left:.15rem; width:33.3333%; box-sizing:border-box; ',
    'm-list_item-pic' : ' position:relative; width:100%; height:16.5rem; overflow:hidden; ',
    'm-list_item-pic_image' : 'width:100%;height:100%;',
    'm-list_c-rb' : ' width:100%; height:4rem; position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); ',
    'm-list_c-date' : ' position:absolute; top:2.05rem; right:1rem; color:white; font-size:1.05rem; ',
    'm-list-picTitle' : ' max-height:3.8rem; overflow:hidden; font-size:1.4rem; line-height:1.9rem; margin:1rem 1rem 1.75rem 1rem; '
}
</script>

