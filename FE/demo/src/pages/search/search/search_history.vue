<template>
<div>
    <div style="width:100%;height:50px;line-height:50px;padding:0 10px;border-bottom:1px solid #e7e7e7;">
        <span style="font-size:14px;font-weight:600;">搜索历史</span>
        <view style="font-size:13px;color:red;float:right;height:50px;" @click="clear_history">清空历史</view>
    </div>
    <div>
        <span style="display:block;padding:0 10px;height:40px;line-height:40px;font-size:13px;" v-for="item in search_history">{{item}}</span>
    </div>
</div>
</template>
<script>
export default {
    methods:{
        clear_history:function(){
            this.search_history = [];
        }
    },
    data:function(){
        return {
            search_history:[
                '我们的少年时代','我的前半生','楚乔传' 
            ]
        }
    },
    updated:function(){
        console.log('updated',this)
    }
}
</script>
