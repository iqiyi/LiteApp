### 如何开发

##### 1.在app.json中添加页面js引用
```json
{
    "name" : "gpad-integral",
    "version" : {
        "business" : "1.0",
        "base" : "1.1"
    },
    "src" : "./src",
    "res" : "./res",
    "target" : "./dist",
    "pages": [
        {
            "name": "index",
            "path": "/entry/index" 
        }
    ]，
    "index":"index"
}
```

##### 2.在引用js中进行vue初始化并mount
```javascript
import home from '../pages/home/home.vue';

var app = new Vue({
    template:'<home/>',
    components:{
        'home':home,
    }
});
app.$mount();
```

##### 3.使用vue sfc开发单文件组件
```html
<!-- home.vue -->
<template>
    <div class="container">Hello~ Genius~</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container{
    height:100px;line-height:100px;
    font-size:50px;
    text-align:center;
    color:green;
    background:blue;
}
</style>

```
##### 3.enjoy it 


### 语法支持情况
liteApp使用vue语法进行开发，具体文档移步
> https://cn.vuejs.org/index.html

功能 | 支持程度
---- | ---
ES6 | babel@latest
ES module | yes
Vue SFC |  yes
css | yes
scss | yes
less | yes
browser api | no
dom | no

##### 注意：
1. js运行环境并非浏览器，而是原生的javascriptCore，无法调用浏览器提供的诸如document,window等api
2. 请熟练运用数据驱动，获取dom的做法是不可取的