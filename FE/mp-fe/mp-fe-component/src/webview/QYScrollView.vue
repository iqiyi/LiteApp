<template>
  <div class="qy-scrollview" :style="computedOverflow">
    <slot></slot>
  </div>
</template>
<script>
import { isDef, isUndef} from 'util';

export default {
  props : ['scroll-x','scroll-y'],
  computed : {
    computedOverflow : function(){
      let style = {};
      if( isDef(this.scrollX) ){
        style.overflowX = 'scroll'
      }else{
        style.overflowX = 'hidden';
      }
      if( isDef(this.scrollY) ){
        style.overflowY = 'scroll'
      }else{
        style.overflowY = 'hidden';
      };
      return style;
    }
  },
  name : 'qy-scrollview'
}
</script>
<style>
.qy-scrollview{
  width:100%;
  height:100%;
  whiteSpace: nowrap;
}
</style>
