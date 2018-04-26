### 组件

组件的调用方式举例：
```javascript
// just use component like vue
<qy-video class="video" :src="videoSrc" autoplay controls hover /> 
```
组件参数分两种 v-bind( : ) , v-on( @ ) ，前者为参数( : )，后者为事件( @ )

##### 1.qy-input
输入框组件

参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
placeholder | placeholder | String | :
change | input变更事件 | Function | @
confirm | input完成事件 | Function | @

```javascript
<qy-input 
    @input="searchChange" 
    @confirm="searchConfirm" 
    class="search-input" 
    placeholder="请输入" 
    type="text" 
    :value="input_value" 
    focus 
    hover />
```

##### 2.qy-video
视频播放器组件

参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
src | 视频源地址 | String | 支持mp4，m3u8

```javascript
<qy-video class="video" :src="videoSrc" autoplay controls hover /> 
```

##### 3.qy-swiped & qy-swiped-group
滑动删除组件，需要配合使用

参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
无 | 无 | 无 | 无

```javascript
<qy-swiped-group >
    <li>
        <qy-swiped>
            <avatar :src="cellData.icon" />
            <div class="content">
                <span class="name">{{cellData.userName}}</span>
                <span class="des">{{cellData.des}}</span>
            </div>
            <handler :status="cellData.status" :agree="groupAgree" :deny="groupDeny"/>
            </handler>
        </qy-swiped>
        <div class="remove_icon" @tap="groupHide" />
    </li>
</qy-swiped-group>
```

##### 4. qy-listview & qy-listblock
listview组件，listviewArr不为空且listblock存在时，右侧显示快速定位条，可触摸快速定位，类似ios的通讯录

qy-listview参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
listviewArr | block列表 | Array<String> | 与listblock的blockIndex配合使用

qy-listblock参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
blockIndex | block标题 | String | 对应listview中的listviewArr

举例:
```javascript
<qy-listview :indexRightShowArr="listviewArr">
    <qy-listblock v-for="(item,index) in listviewArr" :key="index" :blockIndex="item">
      <cell v-for="(cellItem,cellIndex) in listviewData[item]" :key="cellIndex" :cellData="cellItem" />
    </qy-listblock>
  </qy-listview>
```

##### 5. qy-swiper & qy-swiper-item
滑动（轮播图）组件，目前只支持简易版

参数 | 参数描述 | 参数类型 | 备注
---|---|---|---
无 | 无 | 无 | 无

```javascript
<qy-swiper class="m-swiperList">
    <qy-swiper-item v-for="(item,index) in list" :key="index" class="m-swiperList_item" >
        <div>aaa</div>
    </qy-swiper-item>
</qy-swiper>
```

