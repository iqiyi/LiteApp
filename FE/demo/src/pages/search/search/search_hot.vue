<template>
<div>
    <div style="width:100%;height:50px;line-height:50px;padding:0 10px;border-bottom:1px solid #e7e7e7;">
        <span>热门搜索</span>
    </div>
    <div>
        <div v-for="item in hot_list" style="display:inline-block;width:50%;height:30px;line-height:30px;font-size:13px;padding:0 10px;">
            <span style="display:inline-block;width:20px;height:20px;line-height:20px;text-align:center;background:red;vertical-align:middle;margin-top:-2px;color:#fff;">{{item}}</span>
            <span>
                这是我的搜索结果{{item}}
            </span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data:function(){
        return {
            hot_list:[1,2,3,4,5,6]
        }
    }
}
</script>
