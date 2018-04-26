import Swiper from './scripts/Swiper';

export default {
    swiperStart : function(){
        var mySwiper = new Swiper({
            container : '.qy-swiper-wrap',
            item : '.qy-swiper-item',
            direction: 'horizontal',
        });
        mySwiper.$container.addEventListener('touchend',(index)=>{
            this.dispatchEvent(new CustomEvent('swiper_end',{detail : {index : mySwiper._current}}))
        })
    }
}

