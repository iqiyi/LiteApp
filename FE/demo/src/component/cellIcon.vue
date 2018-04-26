<template>
    <!--vip icon-->
    <image :src="vipLogo ? vipLogo : '/resource/images/c-icon-vip.png'" :class="vipClass ? vipClass : 'c-picicon-red'" :style="style[vipClass ? vipClass : 'c-picicon-red']" width="22" height="13" mode="aspectFit" alt="vip" v-if="isVip"/>
    <!--vip用券 icon-->
    <image src="/resource/images/c-icon-coupons.png" class="c-picicon-red" :style="style['c-picicon-red']" width="22" height="13" mode="aspectFit" alt="用券" v-else-if="isCoupon"/>
    <!--vip付费 icon-->
    <image src="/resource/images/c-icon-pay.png" class="c-picicon-red" :style="style['c-picicon-red']" width="22" height="13" mode="aspectFit" alt="付费" v-else-if="isPaid"/>
    <!--自制 icon-->
    <image src="/resource/images/c-icon-zizhi.png" class="c-picicon-red" :style="style['c-picicon-red']" width="22" height="13" mode="aspectFit" alt="自制" v-else-if="isQiyiProduced"/>
    <!--独播 icon-->
    <image src="/resource/images/c-icon-dubo.png" class="c-picicon-red" :style="style['c-picicon-red']" width="22" height="13" mode="aspectFit" alt="独播" v-else-if="isExclusive"/>
    <!--新 icon-->
    <image src="/resource/images/c-icon-new-s.png" class="c-icon-new-s" :style="style['c-icon-new-s']" width="18" height="18" alt="新" v-else-if="isNew"/>
    <!--预 icon-->
    <image src="/resource/images/c-icon-ad-s.png" class="c-icon-ad-s" :style="style['c-icon-ad-s']" width="18" height="18" alt="预告片" v-else-if="isTrailer"/>
</template>
<script>
export default {
    props:['iconData'],
    data:function(){
        return {
            style:style
        }
    },
    computed:{
        isVip:function(){
            return this.iconData.isVip
        },
        vipClass:function(){
            return this.iconData.vipClass
        },
        vipLogo:function(){
            return this.iconData.vipLogo;
        },
        isCoupon:function(){
            return this.iconData.iconData;
        },
        isPaid:function(){
            return this.iconData.isPaid;
        },
        isQiyiProduced:function(){
            return this.iconData.isQiyiProduced;
        },
        isExclusive:function(){
            return this.iconData.isExclusive;
        },
        isNew:function(){
            return this.iconData.isNew;
        },
        isTrailer:function(){
            return this.iconData.isTrailer;
        }
    }
}
const style = {
    'c-picicon-red':' display:block; position:absolute; right:0; top:0; z-index:5; width:2.2rem; height:1.3rem; ',
    'c-icon-ad-s':' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; ' ,
    'c-icon-new-s':' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; ' ,
    'c-icon-vip-s':' position:absolute; top:0; right:0; z-index:5; width:1.8rem; height:1.8rem; ' ,
}
</script>
