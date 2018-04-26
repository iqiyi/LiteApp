<template>
  <div class="qy-listview">
    <ul>
      <slot></slot>
    </ul>

    <!-- indexRight -->
    <ul ref="block_index_list" class="qy-listview-block_index_list">
      <li v-for="(item,index) in indexRightShowArr" :rightIndexBlock="item">
        {{item}}
      </li>
    </ul>

    <div class="center_tip" ></div>

  </div>
</template>
<script>
import listblock from './listblock.vue';

export default {
  props : ['indexRightShowArr'],
  name : 'qy-listview',
  components : {
    listblock
  },
  mounted : function(){
    if(this.indexRightShowArr && Array.isArray(this.indexRightShowArr)){
      this.$webviewCall('listview_showRightIndex',this.indexRightShowArr);
    }
  }
}
</script>
<style lang="scss">
@import "base";
.qy-listview{
  .qy-listview-block_index_list{
    position:fixed;right:0;
    top:50%;
    transform:translate(0,-50%);
    li{
      padding:.4rem 1rem;
    }
  }
  .center_tip{
    display:none;
    position:fixed;
    @extend %transformMiddle;
    width:6rem;height:6rem;line-height:6rem;
    border-radius:50%;
    text-align:center;
    background:rgba(0,0,0,.2);
  }
}
</style>
