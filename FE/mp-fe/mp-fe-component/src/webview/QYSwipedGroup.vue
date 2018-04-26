<template>
  <div class="qy-swiped-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name : 'qy-swiped-group',
  updated : function(){
    this.$webviewCall('swipeToDelete');
  }
}
</script>
