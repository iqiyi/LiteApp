<template>
  <qy-native-base :hover="hover" :nativeData="{src : this.src}" nativeTag="QiyiVideo" class="qy-video"/>
</template>
<script>
export default {
  name : 'QiyiVideo',
  props : ['src','hover'],
  computed : {
    getData : function(){
      return {
        src : this.src
      }
    }
  },
  updated : function(){
  }
}
</script>
<style>
.qy-video{
  background-color : #000000;
}
</style>
