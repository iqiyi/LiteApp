<template>
    <input @input="eInput" @confirm="eConfirm" @change="eChange" class="qy-input"  />
</template>

<script>
export default {
    props : ['input','confirm','change'],
    name : 'qy-input',
    //props:['placeholder','type','value','hover','focus'],
    mounted : function(){

    },
    methods : {
        'eInput' : function(){
            this.input && this.$emit('input')
        },
        'eConfirm' : function(){
            this.confirm && this.$emit('confirm')
        },
        'eChange' : function(){
            this.change && this.$emit('change')
        },
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
    -webkit-appearance: none;
}
</style>
