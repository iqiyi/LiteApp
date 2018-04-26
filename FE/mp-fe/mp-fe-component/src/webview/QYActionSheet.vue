<template>
  <div class="mp-actionsheet"> 
    <div class="fade-in"></div>
    <div class="slide-up">
      <div class="menu"> 
        <div v-for="(item,index) in menu" class="cell" @tap="item.callback">{{item.label}}</div> 
      </div>
      <div class="action"> 
        <div v-for="(item,index) in action" class="cell" @tap="item.callback">{{item.label}}</div> 
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  props : ['menu','action','isShow']
}
</script>
<style lang="scss">
@import "base";

.mp-actionsheet{
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,.2);
}

</style>

