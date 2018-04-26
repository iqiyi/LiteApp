<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props : ['enabled','color','background'],
  mounted : function(){
    __api__.baseCall('setSwipeRefresh',this.$options.propsData);
  }
}
</script>
