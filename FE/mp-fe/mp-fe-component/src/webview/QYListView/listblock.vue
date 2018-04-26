<template>
  <li class="qy-list_block" :blockIndex="blockIndex">
    <header>
      {{blockIndex}} 
    </header>
    <slot></slot>
  </li>
</template>
<script>
export default {
  props : ['blockIndex'],
  name : 'qy-listblock'
}
</script>
<style lang="scss">
.qy-list_block{
  header{
    display:block;
    height:3rem;line-height:3rem;
    padding-left:1.6rem;
    background:#f5f5f5;
    font-size:1.6rem;
    color:#666;
  }
}
</style>
