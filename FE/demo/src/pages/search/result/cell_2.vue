<template>
    <div class="m-topList" :style="style['m-topList']" @click="goVideo">
        <div class="m-topList_content" :style="style['m-topList_content']">
            <div class="m-topList_imgBox" :style="style['m-topList_imgBox']">
                <img mode="aspectFill" class="m-topList_img" :style="style['m-topList_img']" :src="computedData.img"/>
                <div class="m-list_c-rb" :style="style['m-list_c-rb']">
                    <span class="m-list_c-date" :style="style['m-list_c-date']">{{timeLengthFormat}}</span>
                </div>
            </div>
            <div class="m-topList_text" :style="style['m-topList_text']">
                <div class="m-topList_text_title" :style="style['m-topList_text_title']">{{computedData.title}}</div>
                <div class="m-topList_text_info" :style="style['m-topList_text_info']">
                    <span class="m-topList_text_c-info" :style="style['m-topList_text_c-info']">
                        发布时间：{{releaseDate}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['cellData'],
    computed:{
        computedData : function(){
            return {
                img : this.cellData.albumDocInfo.albumImg,
                title : this.cellData.albumDocInfo.albumTitle,
            }
        },
        timeLengthFormat : function(){
            let time = this.cellData.albumDocInfo.videoinfos[0].timeLength;
            return `${parseInt(time/60)}:${time%60 < 10 ? '0' + time%60 : time % 60}`;
        },
        releaseDate : function(){
            let date = this.cellData.albumDocInfo.releaseDate;
            return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
        }
    },
    methods:{
        goVideo : function(){
            qiyiApi.goPage('video',{
                tvid : this.cellData.albumDocInfo.videoinfos[0].tvId
            })
        }
    },
    data:function(){
        return {
            style : style
        }
    }
}

const style = {
    'm-topList' : ' width:100%; height:11.4rem; padding:2rem 1rem; border-bottom:1px solid #f0f0f0; box-sizing:border-box; ',
    'm-topList_content' : 'width:100%;display:flex;',
    'm-topList_imgBox' : ' width:12.9rem; height:7.3rem; position:relative; margin-right:1.5rem; ',
    'm-topList_img' : 'width:100%;height:100%;',
    'm-list_c-rb' : ' width:100%; height:4rem; position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); ',
    'm-list_c-date' : ' position:absolute; top:2.05rem; right:1rem; color:white; font-size:1.05rem; ',
    'm-topList_text' : ' flex:1; box-sizing:border-box; text-overflow:ellipsis; overflow:hidden; position:relative; ',
    'm-topList_text_title' : ' font-size:1.4rem; line-height:1.9rem; word-break:break-word; margin-top:.1rem; color:#333; max-height:3.8rem; margin-bottom:.55rem; display:-webkit-box; overflow:hidden; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-overflow:ellipsis; ',
    'm-topList_text_info' : ' font-size:1.1rem; line-height:1.4rem; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:#666; position:absolute; bottom:0; width:100%; ',
    'm-topList_text_c-info' : ' display:block; margin-top:.15rem; margin-bottom:.25rem; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; ',
}
</script>
<style>
.m-topList_img{width:100%;height:100%;object-fit:cover;}
</style>
