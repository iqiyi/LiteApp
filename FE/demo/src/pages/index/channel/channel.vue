<template>
    <div>
        <channel_list v-for="(item,index) in data.channel_order" :key="index" :channel_order="index" :listTitle="item" :listData="data[item]" :channel_new_title="data.channel_new_title" />
    </div>
</template>
<script>
import channel_list from './channel_list.vue';

export default {
    props:['data'],
    components:{
        channel_list:channel_list
    }
}
</script>
