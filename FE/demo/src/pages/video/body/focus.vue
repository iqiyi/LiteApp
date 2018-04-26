<template>
    <div class="m-box" :style="style['m-box']">
        <div class="m-title" :style="style['m-title']">
            <span class="m-title_h" :style="style['m-title_h']">精彩看点</span>
        </div>
        <div scroll-x class="m-scrollList" :style="style['m-scrollList']">
            <div class="m-scrollList-inner" :style="style['m-scrollList-inner']">
                <div v-for="(item,index) in baseViewsLimit" class="m-scrollList_item" :style="style['m-scrollList_item']" 
                    @click="changeVideo(item)">
                    <div class="m-scrollList_imgBox" :style="style['m-scrollList_imgBox']">
                        <img class="m-scrollList_img" :style="style['m-scrollList_img']" mode="aspectFill" :src="imgSrc(item)"></img>
                        <div class="m-scrollList_update" :style="style['m-scrollList_update']">
                            <span class="m-scrollList_updateTx" :style="style['m-scrollList_updateTx']">{{showContent(item)}}</span>
                        </div>
                    </div>
                    <div class="m-scrollList_title" :style="style['m-scrollList_title']">
                        <span>{{title(item)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['bestViews','recommendVideos'],
    computed:{
        baseViewsLimit : function(){
            console.log(this.bestViews,this.recommendVideos)
            return Array.isArray(this.bestViews) ? this.bestViews.splice(0,10) : 
                (Array.isArray(this.recommendVideos) ? this.recommendVideos.splice(0,10) : []);
        },
    },
    methods:{
        imgSrc : function(item){
            return item.vpic || item.aPicUrl || item.imageUrl
        },
        showContent : function(item){
            if(item.timeLength){
                return parseInt(item.timeLength/60) + ':' + item.timeLength%60;
            }else{
                return item.showContent;
            }
        },
        title : function(item){
            return item.vn || item.aName || item.mainTitle;
        },
        changeVideo : function(item){
            this.$emit('changeVideo',item.tvQipuId,item.vid);
        }
    },
    data : function(){
        return {
            style : style
        }
    }
}

const style = {
    'm-box' : ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-title' : ' width:100%; height:6rem; box-sizing:border-box; padding:2.25rem 1rem; display:-webkit-flex; display:flex; justify-content:space-between; font-size:1.5rem; line-height:1.5rem; color:#333; ',
    'm-title_h' : ' display:block; font-weight:700; -webkit-box-flex:1; box-flex:1; ',
    'm-scrollList-inner' : ' padding-left:1.5rem; ',
    'm-scrollList_item' : ' display:inline-block; width:13rem; max-height:100%; margin-right:1.5rem; vertical-align:top; overflow:hidden; ',
    'm-scrollList_imgBox' : ' position:relative; display:block; width:13rem; height:7.3rem; ',
    'm-scrollList_img' : 'width:100%;height:100%;',
    'm-scrollList_update' : ' width:13rem; height:4rem; box-sizing:border-box; padding-left:1rem; padding-right:1rem; position:absolute; bottom:0; left:0; background-image:-webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 100%); background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 100%); background-repeat:repeat-x; ',
    'm-scrollList_updateTx' : ' display:block; width:100%; height:2rem; margin-top:2rem; overflow:hidden; text-overflow:ellipsis; color:#fff; font-size:1.1rem; line-height:2rem; white-space:nowrap; text-align:right; ',
    'm-scrollList_title' : ' min-height:2.7rem; max-height:4.7rem; box-sizing:border-box; overflow:hidden; padding-top:.7rem; margin-bottom:1.2rem; font-size:1.4rem; line-height:2rem; white-space:normal; '
}
</script>
<style>
.m-scrollList{ width:100%; min-height:11.7rem; max-height:13.2rem; display:block; white-space:nowrap; overflow-x : auto;}
</style>
