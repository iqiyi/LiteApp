<template>
    <div class="container" :style="style['container'] + (  search_show ? 'overflow:hidden;height:100%;' : '' )">

        <div class="m-box-search" :style="style['m-box-search']" @click="search_show_or_hide">
            <div class="m-from-search" :style="style['m-from-search']">
                <div class="m-from-search-box" :style="style['m-from-search-box']">
                    <div class="m-from-search-content" :style="style['m-from-search-content']">
                        <div class="c-icon-search-layer" :style="style['c-icon-search-layer']">
                            <img :src="require('res/images/icon-search-gray.png')"/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <result :data="data"></result>
            <div v-if="data" />
                <div v-if="loading" class="m-filmLibrary-loading" :style="style['m-filmLibrary-loading']">
                    <span>正在加载...</span>
                </div>

                <search :search_show="search_show" @search_show_or_hide="search_show_or_hide" :search="search" />

            </div>
        </template>
        <script>
import result from './result/list.vue';

import search from '../index/search/index.vue';
import { addParamsToUrl } from 'util';

const url = "https://search.video.iqiyi.com/o";
const params = {
    channel_name:'',
    if:'html5',
        pageNum:1,
    pageSize:20,
    limit:20,
    category:'',
    timeLength:0,
    releaseDate:'',
    key:'',
    start:1,
    sortKey:'',
    threeCategory:'',
    u:'2e863a57981f0db96612caf3f71e2341',
    qyid:'2e863a57981f0db96612caf3f71e2341',
    pu:'',
    video_allow_3rd:1,
    intent_result_number:10,
    intent_category_type:1,
    vfrm:'2-3-0-1',
    t:1503560307847,
    from:'weixin_mini_program'
}

export default {
    name: 'index',
    data: function() {
        return {
            style : style,
            input_value: '绝命毒师',
            search_show: false,
            data: false,
            loading : true
        };
    },
    components: {
        search: search,
        result: result
    },
    mounted:function(){
        let { searchKey } = qiyiApi.getPageData();
        searchKey && this.search(searchKey);

        // scroll bottom to loadmore
        //qiyiApi.addBodyEvent('scrollEnd',()=>{
            //this.searchMore( searchKey );
        //})
    },
    methods: {
        "search_show_or_hide": function() {
            this.search_show = !this.search_show;
        },
        "swiper_touchend": function(index) {
            this.bannerIndex = index;
        },
        "search": function(value) {
            params.key = value;
            this.data = false;
            this.loading = true;
            qiyiApi.request({
                url : addParamsToUrl(url,params),
                success : result => {
                    this.loading = false;
                    this.data = result.data;
                }
            })
            this.search_show = false;
        },
        "searchMore" : function(value){
            params.key = value;
            params.pageNum += 1;
            !this.loading && qiyiApi.request({
                url : addParamsToUrl(url,params),
                success : result => {
                    this.data.docinfos = this.data.docinfos.concat(result.data.docinfos);
                    this.$nextTick(()=>{
                        this.loading = false;
                    })
                }
            });
            this.search_show = false;
            this.loading = true;
        }
    },
}
const style = {
    'm-box-search' : ' position:static; width:100%; top:0; bottom:0; left:0; right:0; background-color:#fff; z-index:10; ',
    'm-from-search' : 'width:100%;height:5.4rem',
    'm-from-search-box' : ' position:fixed; top:0; width:100%; padding:1rem; box-sizing:border-box; display:flex; background-color:#fff; border-bottom:1px solid #f0f0f0; z-index:10; ',
    'm-from-search-content' : ' height:3.3rem; background-color:#f0f0f0; border-radius:3.3rem; box-sizing:border-box; position:relative; flex:1; padding-left:3.7rem; padding-right:2.8rem; line-height:3.3rem; min-height:3.3rem; padding-top:0; ',
    'c-icon-search-layer' : ' position:absolute; z-index:5; display:block; width:3rem; height:3rem;padding:.75rem;left:.75rem; top:50%; transform:translateY(-50%); ',
    'search-input' : 'width:100%; height:3.3rem; font-size:1.4rem; line-height:3.3rem; min-height:3.3rem; margin-top:0; padding-top:0; ',
    'm-filmLibrary-loading' : ' font-size:1.3rem; height:6rem; color:#999; line-height:6rem; text-align:center; '
}
</script>
