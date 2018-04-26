<template>
    <div :style="{ display : search_display }"
          style="position:absolute;left:0;top:0;width:100%;height:100%;background:#fff;z-index:2;">
        <header @search="search"/>
        <search_history/>
        <search_hot/>
    </div>
</template>
<script>
    import header from './header.vue';
    import search_history from './search_history.vue';
    import search_hot from './search_hot.vue';

    export default {
        props: ['search_show'],
        computed: {
            search_display: function() {
                return this.search_show ? 'block' : 'none'
            }
        },
        components: {
            header: header,
            search_history: search_history,
            search_hot: search_hot
        },
        mounted: function() {
            console.log('search init', this)
        },
        updated: function(vnode) {
            console.log(vnode, this)
        },
        methods: {
            search: function(value) {
                this.$emit('search', value);
            }
        }
    }
</script>
