<template>
    <div style="padding:10px 80px 10px 10px;position:relative;border-bottom:1px solid #e7e7e7;">
        <qy-input placeholder="我的前半生" @change="updateValue" :value="input_value" style="width:100%;height:30px;"/>
        <div @click="search" style="position:absolute;right:10px;top:10px;width:70px;height:30px;line-height:30px;text-align:center;">
            搜索
        </div>
    </div>
</template>
<script>

    export default {
        data: function() {
            return {
                input_value: "绝命"
            }
        },
        methods: {
            updateValue() {
                this.input_value = "aaaaaa"
            },
            search: function() {
                console.log("%c" + this.input_value, "color:green");
                this.input_value = "绝命毒师";
                this.$emit('search', this.input_value);
            }
        }
    }
</script>
