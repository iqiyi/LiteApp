正如上面提到的，我们的代码运行于jscore并无法调用浏览器api。所以native在运行环境中注入了一些基本的定义后的api，经过框架封装，我们可以直接调用


#### api调用
```javascript
//调用方式
__api__.getPageData();// 获取页面参数
__api__.request({ // 请求接口
    url : 'https://pub.m.iqiyi.com/h5/mina/index/',
    success : res => {
        console.log('[data]:'+JSON.stringify(res))
        this.data = res.data
    }
}) 
```

#### api列表

##### 1. 数据请求 
\_\_api__.request({ url,method,headers,body,success,fail })

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
url | 请求路径 | String | 必填
method | 请求方式 | String | 默认值：GET
headers | 头部 | Array 
body | 请求体 | Object 
success | 成功回调 | Function 
fail | 失败回调 | Function 

```javascript
__api__.request({ url , options , success , fail})
```

##### 2. 页面跳转
\_\_api__.goPage(page,data)

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
page | 页面名称 | String | app.json中定义的页面名称
data | 传递参数 | Object

```javascript
__api__.goPage('video',{tvid : 1111111111})
```

##### 3.获取页面参数
\_\_api.getPageData()
与goPage配合使用，返回值即goPage传递的data

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
无 | 无 | 无 | 无

```javascript
var pageData = __api__.getPageData()
```

##### 4.Loading
\_\_api__.loading.show()
\_\_api__.loading.hide()

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
无 | 无 | 无 | 无

```javascript
__api__.loading.show()
__api__.loading.hide()
```

##### 5.Toast
\_\_api__.toast.show()

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
text | 无 | 无 | 无

```javascript
__api__.toast.show();
```

##### 6.分享
\_\_api__.share()

参数 | 参数描述 | 参数类型 | 备注
-- | ---- | ---- | --
page | 页面名称 | String | app.json中定义的页面名称
data | 页面名称 | Object | 参数会带在链接后面

```javascript
__api__.share('video',{tvid:11111})
```

##### 7.下拉刷新
\_\_api__.setSwipeRefresh();

参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
enable | 是否起作用 | boolean | 默认为false
color | 转动箭头颜色 | int | 
background | 转动箭头的背景颜色 | int | 
refresh| 下拉后的回调事件|function|

```javascript
__api__.setSwipeRefresh({
    enable : true,
    color : '#000000',
    background : '#ffffff',
    refresh : function(){
        __api__.toast.show('下拉刷新回调')
    }
})
```