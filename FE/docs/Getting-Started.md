## Getting Started
--- 
### 1.初始化一个项目
```
mkdir my-project   #创建项目目录
cd my-project   #进入项目
npm init   #创建package.json
```

---
### 2.安装liteApp依赖
```
npm i --save @iqiyi/liteapp-base@0.0.1 @iqiyi/liteapp-cli@^0.0.1
```
在安装时可能会遇到node-sass安装失败问题，解决方法参考
> https://github.com/lmk123/blog/issues/28

---
### 3.配置app.json

> app.json具体参数与意义参见：
> TODO

---
### 4.开始开发

```
# 调试
lite-app --config ./app.json --env dev --target web
```
```
# 生产
lite-app --config ./app.json --env prod --target app
```

#### 查看页面 ： 
http://localhost:8080/pages/${bundleName}/web.html

---

##### 推荐将命令写入package.json - scripts以钩子形式调用
> tips : 直接运行cli命令会报错 [command not found in path]
> 参考package.json的cli功能 https://docs.npmjs.com/files/package.json#bin
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-app --config ./app.json --env dev --target web",
    "build": "lite-app --config ./app.json --env prod --target app"
  },
```
##### lite-app cli参数定义
* config : 配置文件地址
* env 
1.dev : 调试环境，不会生成具体文件，具备watch功能
2.prod : 打包，放置于app.json中定义的target目录中
* target 
1. app : app端运行（使用native api与组件）
2. web : web端运行，对native功能做了兼容处理
