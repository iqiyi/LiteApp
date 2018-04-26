<template>
  <div class="qy-swipe_to_delete" >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props : ['rightComponent'],
  name : 'qy-swiped'
}
</script>

