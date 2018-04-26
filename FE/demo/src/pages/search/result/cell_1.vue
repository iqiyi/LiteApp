<template>
    <div class="m-box" :style="style['m-box']" @click="goVideo">
        <div class="m-pic-text" :style="style['m-pic-text']">
            <div class="m-pic-text-content" :style="style['m-pic-text-content']">
                <div class="m-pic-text-content-img" :style="style['m-pic-text-content-img']">
                    <img class="m-pic-text-content-img_image" :style="style['m-pic-text-content-img_image']" :src="computedData.img"/>
                </div>
                <div class="m-pic-text-content-details" :style="style['m-pic-text-content-details']">
                    <div class="m-pic-text-content-details_title" :style="style['m-pic-text-content-details_title']">
                        <span>{{computedData.title}}</span>
                        <div class="c-rt" :style="style['c-rt']">
                            <div class="c-date-score" :style="style['c-date-score']">
                                <span class="score-item" :style="style['score-item']">{{computedData.score}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="m-pic-text-content-details_info" :style="style['m-pic-text-content-details_info']">
                        <span>{{computedData.desc}}</span>
                    </div>
                    <div class="m-pic-text-content-details_info" :style="style['m-pic-text-content-details_info']">导演：{{computedData.director}}</div>
                    <div class="m-pic-text-content-details_info" :style="style['m-pic-text-content-details_info']">主演：{{computedData.star}}</div>
                    <div class="m-pic-text-content-details_info" :style="style['m-pic-text-content-details_info']">类型：{{computedData.category}}</div>
                    <div class="m-pic-text-content-details_btn" :style="style['m-pic-text-content-details_btn']">
                        <img class="c-playarrow" :style="style['c-playarrow']" :src="require('res/images/c-playarrow.png')"/>
                        <span>立即播放</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['cellData'],
    data:function(){
        return {
            style : style
        }
    },
    computed:{
        computedData: function(){
            return {
                img : this.cellData.albumDocInfo.albumVImage,
                title: this.cellData.albumDocInfo.albumTitle,
                score:this.cellData.albumDocInfo.score,
                desc: [this.cellData.albumDocInfo.releaseDate.slice(0,4), this.cellData.albumDocInfo.channel, this.cellData.albumDocInfo.region, this.cellData.albumDocInfo.video_lib_meta.language].join(' '),
                director : this.cellData.albumDocInfo.director,
                star: this.cellData.albumDocInfo.star,
                category: this.cellData.albumDocInfo.video_lib_meta.category
            }
        }
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
    'm-box' : ' display:block; width:100%; border-bottom:.05rem solid #e6e6e6; ',
    'm-pic-text' : ' padding:2rem 1rem; width:100%; box-sizing:border-box; ',
    'm-pic-text-content' : ' display:flex; width:100%; box-sizing:border-box; ',
    'm-pic-text-content-img' : ' width:11.5rem; height:15.035rem; margin-right:1rem; position:relative; ',
    'm-pic-text-content-img_image' : 'width:11.5rem;height:15.035rem',
    'm-pic-text-content-details' : ' flex:1; position:relative; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:2.25rem; ',
    'm-pic-text-content-details_title' : ' font-size:1.4rem; margin-bottom:.4rem; line-height:1.4rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ',
    'c-rt' : ' position:absolute; right:0; top:0; ',
    'c-date-score' : ' color:#ff4e00; padding:0 .3rem; ',
    'score-item' : 'display:inline-block;',
    'm-pic-text-content-details_info' : ' font-size:1.1rem; color:#555; line-height:1.6rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ',
    'm-pic-text-content-details_btn' : ' font-size:1.2rem; color:#fff; line-height:3.5rem; padding:0 1.7rem; background-color:#00c000; width:9.5rem; box-sizing:border-box; border-radius:3.5rem; position:absolute; bottom:0; ',
    'c-playarrow' : 'display:inline-block; width:1rem; height:1.2rem; vertical-align:-2px; margin-right:.3rem; '
}
</script>
