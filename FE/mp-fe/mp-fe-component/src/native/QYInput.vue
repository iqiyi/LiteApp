<template>
    <qy-native-base :hover="hover" :nativeData="nativeData" nativeTag="QiyiInput" 
        @bindinput=""/>
</template>

<script>
export default {
  props : ['placeholder','hover'],
  name : 'qy-input',
  //props:['placeholder','type','value','hover','focus'],
  data : function(){
    return {
      nativeData : {
        placeholder : this.placeholder
      }
    }
  },
  mounted : function(){
      this.$nativeOn('bindinput',params => {
          this.$emit('change',params)
          console.log('[qy-input] params : ' + params)
      })
      this.$nativeOn('bindconfirm',params => {
          this.$emit('confirm',params)
          console.log('[qy-input] params : ' + params)
      })
  }
}
</script>

<style>
.qy-input{
  display : block;
  height : 1.4rem;
  text-overflow : clip;
  overflow : hidden;
  white-space : nowrap;
  font-family : UICTFontTextStyleBody;
  min-height : 1.4rem;
  border:0;
  background-color:initial;
}
</style>
