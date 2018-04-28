### 进阶使用
#### 扩展
##### api的扩展
api运行于JsCore，调用方式为__api__.xxx，所以api的扩展方式就很简单了。
1.normal api：直接在__api__注册即可
2.native api：在native进行注册（具体查看native端api开发相关文档），并使用triggerEvent的封装接口baseCall
```javascript
// base call for call native 
__api__.test = function(){
    baseCall(eventType , data);
}
```
##### 组件的扩展
由于运行于JsCore，有dom操作的组件无法使用（组件机制本身也不推荐操作dom）;
我们在vue实例上挂在了两个api以供组件的开发
* vm.\$nativeOn : 与普通组件不同，native组件使用$nativeOn注册事件
* vm.\$webviewCall(name) : 执行注册的window.\_\_webview__.\_\_component__[name]，this指向组件真实dom

1. normal 组件：可以基于Vue进行全局扩展，或是局部扩展
2. native 组件：在native端进行注册（具体查看native端组件开发相关文档），使用封装好的qy-native-base组件

```javascript
// 参数
export default {
  props : ['hover','nativeTag','nativeData'],
  name : 'QYNativeBase'
}

// 简单的输入框组件举例
<template>
  <qy-native-base :hover="hover" :nativeData="{src : this.src}" nativeTag="QiyiVideo" class="qy-video"/>
</template>
<script>
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

```
3.强交互组件（类似swipe等）：由于有微小的线程交互消耗(<40ms)，在tap等事件时毫无影响，但对于touchmove类需要实时响应的事件，我们需要在webview端就及时反馈。所以在组件开发上我们提供了webview与thread交互接口，使得组件更自由，call thread if i want
举个简单的swiper组件例子
```javascript
/* Swiper.vue */
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


/* swiper.webview.js */
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
```