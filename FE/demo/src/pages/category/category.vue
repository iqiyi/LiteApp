<template>
    <div class="container" :style="style['container']">

        <search_input @search_show_or_hide="search_show_or_hide"/>

        <nav_list :nav_init="nav_init" @nav_search="nav_search"/>

        <div class="filmLibraryBody" style="['filmLibraryBody']">

            <result_list v-for="(item,index) in data" :result_data="item.data" :channel_item="channel_item" :style="'display:' + (tabNow == index ? 'block' : 'none')"/>

        </div>
        <div v-if="loading" class="m-filmLibrary-loading" :style="style['m-filmLibrary-loading']">
            <span>正在加载...</span>
        </div>

        <search :search_show="search_show" @search_show_or_hide="search_show_or_hide" />
    </div>
</template>
<script>
import search_input from './search_input/search_input.vue';
import nav_list from './nav/list.vue';
import result_list from './result/list.vue';

import search from '../index/search/index.vue';

import config from './_config/config'
import { addParamsToUrl } from 'util';

const categoryUrl = 'https://search.video.iqiyi.com/o';
const categoryParams = {
    pageNum : 1,
    mode : 11,
    ctgName : '',
    threeCategory : '',
    pageSize : 36,
    type : 'list',
    "if" : 'html5',
    pos : 1,
    site : 'iqiyi',
    qyid : '',
    access_play_control_platform : 15,
    pu : '',
    u : '',
    from  : 'weixin_mini_program',
    ispurchase : ''
}
// three categoryArr make
const threeCategoryArr = [];
function threeCategoryMake (){
    let str = '';
    Array.isArray(threeCategoryArr) && threeCategoryArr.forEach((value , index)=>{
        str != '' && (str += ',');
        str += `${value};must`;
    })
    return str;
}
function categoryRequest(action){
    //if(action == 'loadmore'){
    //categoryParams.pageNum += 1;
    //}
    let tabData = this.data[this.tabNow].data;
    (!tabData || !this.loading) && qiyiApi.request({
        url : addParamsToUrl(categoryUrl,categoryParams),
        success : result => {
            console.log('get result' + typeof result + JSON.stringify(result));
            if(!result.data.docinfos){
                return;
            }
            if(!tabData){
                this.data[this.tabNow].data = result;
            }else{
                this.data[this.tabNow].data.data.docinfos = this.data[this.tabNow].data.data.docinfos.concat(result.data.docinfos);
            }
            categoryParams.pageNum += 1;

            console.log(this.data[this.tabNow].data)

        }
    })
}


export default {
    components:{
        search_input : search_input,
        nav_list : nav_list,
        result_list : result_list,
        search : search,
    },
    data:function(){
        return {
            tabNow : 0,
            data : [{
                pageNum : 1,
                data : false
            },{
                pageNum : 1,
                data : false
            },{
                pageNum : 1,
                data : false
            },{
                pageNum : 1,
                data : false
            }],
            style : style,
            search_show : false,
            nav_init : 0,
            channel_item : false,
            loading : true
        }
    },
    beforeMount:function(){
        let pageData = qiyiApi.getPageData();
        let categoryIndex = pageData && pageData.categoryIndex ? pageData.categoryIndex : 0;
        // update view
        this.nav_init = categoryIndex;
        // update data

        categoryParams.ctgName = config.channels[categoryIndex].cname;
        categoryRequest.call(this,'init');
    },
    // 下拉加载
    mounted:function(){
        //qiyiApi.addBodyEvent('scrollEnd',()=>{
            //this.data[this.tabNow].data && categoryRequest.call(this,'loadmore');
        //})
    },
    beforeUpdate(){
        console.log('beforeUpdate');
    },
    updated(){
        console.log('updated');
    },
    methods:{
        nav_search:function( channelItem ){
            this.channelItem = channelItem;
            this.tabNow = channelItem.nav_now;
            categoryParams.ctgName = channelItem.cname;
            if(!this.data[this.tabNow].data){
                categoryParams.pageNum = 1 ;
                categoryRequest.call(this);
            }
        },
        search_show_or_hide:function(){
            this.search_show = !this.search_show;
        }
    }
}

const style = {
    'container' : ' height:auto; background-color:#fff; width:100%; height:100%; display:box; display:-webkit-box; box-orient:vertical; -webkit-box-orient:vertical; ',
    'filmLibraryBody' : ' position:relative; overflow:hidden; box-flex:1; -webkit-box-flex:1; ',
    'm-filmLibrary-loading' : ' font-size:1.3rem; height:6rem; color:#999; line-height:6rem; text-align:center; '

}
</script>
