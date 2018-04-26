# Introduction

<p align="center" >
  <img src="https://github.com/iqiyi/LiteApp/tree/master/Images/logo.png" alt="LiteApp" title="LiteApp">
</p>

**LiteApp is a high performance mobile cross-platform implementation, The realization of cross-platform functionality is base on webview and provides different ideas and solutions for improve webview performance.**

`LiteApp` dedicates to enable developers to use modern web development experience to build both Android and iOS  with a single codebase. In practice, you can use javascript and modern front-end frameworks to develop mobile apps by using our project.

`LiteApp` keep up with modern development technologies and platform capabilities both for web and native. Productivity and performance can coexist in LiteApp.in our project developer writing on web but  rendering  is close to rendering native.

The structure of LiteApp is decoupled, the render engines are separated from the syntax layer. LiteApp rely on [Vue.js](https://vuejs.org/) 

`LiteApp` is developing by [iQiYi ](https://www.iqiyi.com/) *Android architecture* team since June 2017 and After a period of development and testing, we decided to open source the project . Now we are actively using this solution in the company's business. We sincerely invite you to join our project . Welcome to try, report issues and submit pull requests. And pls feel free to contact us through **Github** or **Email**.

## Requirements

| Platform |        System        |       Notes        |
| :------: | :------------------: | :----------------: |
|   iOS    |   iOS 9.0 or later   | Xcode 9.0 or later |
| Andriod  | Andriod 4.0 or later |        n/a         |
|   Web    |         n/a          |        n/a         |

## Architecture

`系统架构图`

<div align=center>
<img src="https://github.com/iqiyi/LiteApp/tree/master/Images/Architecture.png" alt="Architecture"/>
</div>`

## 

## Demo Project

[ iOS Display ]() 

> <div align=center>
>
> <img src="https://github.com/iqiyi/LiteApp/tree/master/Images/iOS_Video.gif" width = "300" height = "300*16/9"  alt="iOS Demo"/>
>
> </div>`

[Android Display]() 

<div align=center>

<img src="https://github.com/iqiyi/LiteApp/tree/master/Images/Andriod_Video.gif" width = "300" height = "300*16/9" alt="Android Demo"/>
</div>`

## Features

- [x] **High Performance**: Writing on web, have the same performance as the native app
- [x] **Load Fast** Fast rendering  for all pages , especially for the first time
- [x] **Mobile Cross-platform**  Build both Android and iOS  with a single codebase
- [x] **Asynchronous Threads** the render engines are separated from the syntax layer 
- [x] **Simple Code**  Few code but powerful
- [x] **Expandable**   Proprietary API for extension and it can add more features
- [x] **Complete Documentation** Each section has a corresponding document and easy to understand

## How To Get Started

- [Download LiteApp](http://10.110.86.160/mc-web-panel/sto/iOS-lite-app.zip) and try out the included Mac and iPhone example apps
- Read the ["Getting Started" guide](http://gitlab.qiyi.domain/cross-team/lite-app/wikis/iOS-README), or [other articles on the Wiki](http://gitlab.qiyi.domain/cross-team/lite-app/wikis/home)
- Check out the [documentation](http://gitlab.qiyi.domain/cross-team/lite-app/wikis/home) for a comprehensive look at all of the APIs available in LiteApp

## Installation

```
$ git clone https://github.com/iqiyi/LiteApp.git
$ cd liteApp
```

## Communication

- If you **need help**, use [Email](zhangyanqiang@qiyi.com) or [Github](https://github.com/iqiyi/LiteApp) . (Tag 'LiteApp')
- If you'd like to **ask a general question**, use [Email](zhangyanqiang@qiyi.com) or [Github](https://github.com/iqiyi/LiteApp).
- If you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.

## Performance Test

`LiteApp VS H5 App 结果：首次加载时间减少70%，页面切换时60 FPS`

| Project   | Loading Time/ms |         Switch Page/fps          |
| :-------- | :-------------: | :------------------------------: |
| LiteApp   |   250-500 ms    |            Perfect/60            |
| HTML5 App |    > 1000ms     | White screen for a short time/53 |

`LiteApp`

> <div align=center>
>
> <img src="https://github.com/iqiyi/LiteApp/tree/master/Images/liteApp.gif" width = "300" height = "300*16/9"  alt="iOS Demo"/>
>
> </div>`

`HTML5 App`

<div align=center>

<img src="https://github.com/iqiyi/LiteApp/tree/master/Images/html5.gif" width = "300" height = "300*16/9" alt="Android Demo"/>
</div>`

## 

## Credits

LiteApp was originally created by [Guodong Chen]()  [Chen Zhang]()  [Jingyuan Zhou]()   [Yanqiang Zhang](https://github.com/Richard-zhang-iOS) .

LiteApp's logo was designed by [Guodong Chen]()

And most of all, thanks to LiteApp's Contributors

### Security Disclosure

If you believe you have identified a security vulnerability with LiteApp, you can contact  [Guodong Chen]() as soon as possible. Please do not post it to a public issue tracker.

## License

LiteApp is released under the Apache License, Version 2.0. See [LICENSE](http://gitlab.qiyi.domain/cross-team/lite-app/blob/master/LICENSE) for details.