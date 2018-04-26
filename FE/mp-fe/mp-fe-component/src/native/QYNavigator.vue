<template>
  <div class="qy-navigator">
  </div>
</template>
<script>

//packageId | 小程序包名 | String | 主要在获取本地图片起作用，会到这个包中获取。
//isShowTitle | 是否显示title | boolean | 
//text | 标题名 | String | 默认显示“爱奇艺”
//color | 标题的背景颜色 | int | 黑色：0xff000000
//logoPath | logo的path | String | 显示在指示器与text之间，默认不显示（只有在packageId配置的情况下path才会起作用）
//isShowIndicator | 是否显示指示器 | boolean | 指示器默认为回退按钮
//mode | 显示的方式 | int | 0为MenuList弹框显示，1为单个MenuItem显示(mode=1最多显示3个)
//MenuList | 要添加菜单的数组 | JsonArray | 默认有两个条目：创建快捷方式，分享小程序。

//id | 条目唯一标识 | String | id不可重复，主要作用是给JS传触发事件
//text | 菜单描述 | String | 
//icon | 菜单的图标path | String | 只有在packageId配置的情况下才会起作用

export default {
  props : ['isShowTitle','text','color','logoPath','isShowIndicator','mode','MenuList'],
  mounted : function(){
    __api__.baseCall('setTitle', this.$options.propsData);
  
  }
}
</script>
