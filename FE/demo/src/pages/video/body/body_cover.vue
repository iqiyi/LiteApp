<template>
    <div class="m-box-cover" :style="style['m-box-cover']">
        <img class="c-cover-loading" :style="style['c-cover-loading']" :src="require('res/images/c-icon-loading.gif')"></image>
    </div>
</template>
<script>
export default {
    data : function(){
        return {
            style : style
        }
    }
}

const style = {
    'm-box-cover' : ' width:100%; height:100%; top:0; left:0; right:0; bottom:0; z-index:50; background-color:#fff; overflow:hidden; transition:transform 1s cubic-bezier(0.075, 0.82, 0.165, 1); ',
    'c-cover-loading' : ' display:block; width:2rem; height:2rem; margin:50% auto; '
}
</script>
