<template>
    <div class="qy-swiper">
        <div class="qy-swiper-wrap" >
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name : 'qy-swiper',
    mounted : function(){
        this.$webviewCall('swiperStart');
    }
}
</script>

<style>
/*!
 * iswiper - swiper.js
 * @version v1.4.1
 * @link https://github.com/weui/swiper.git
 * @license MIT
 */
.qy-swiper{
    overflow:hidden;
}
.swiper {
  height: 100%;
  overflow: hidden;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.item {
  height: 100%;
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  float: left;
}
.item.active .animated {
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  opacity: 1;
}
.item:not(.active) .animated {
  -webkit-animation: none;
          animation: none;
  opacity: 0;
}

</style>
