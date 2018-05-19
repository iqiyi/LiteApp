# Introduction

<p align="center" >
  <img src="https://github.com/iqiyi/LiteApp/blob/master/Images/logo.png?raw=true" alt="LiteApp" title="LiteApp">
</p>

**LiteApp is a high performance mobile cross-platform framework. The implementation of its cross-platform functionality is based on webview but improved with novel ideas and solutions for better performance.**

`LiteApp` dedicates to enable developers to use modern web development technology to build applications on both Android and iOS with a single codebase. More specifically, you can use javascript and modern front-end framework Vue.js to develop mobile apps by using LiteApp, with which, productivity and performance can coexist ,application you build will be running on web with performance close to native. We achieve this by decoupling the render engine from the syntax layer, see more detail below.

The structure of LiteApp is decoupled, the render engines are separated from the syntax layer. LiteApp rely on [Vue.js](https://vuejs.org/) 

`LiteApp` is developing by [iQiYi ](https://www.iqiyi.com/) *Android architecture* team since June 2017 and After a period of development and testing, we decided to open source the project . Now we are actively using this solution in the company's business. We sincerely invite you to join our project . Welcome to try, report issues and submit pull requests. And pls feel free to contact us through **Github** or **Email**.

## Requirements

| Platform |        System        |       Notes        |
| :------: | :------------------: | :----------------: |
|   iOS    |   iOS 9.0 or later   | Xcode 9.0 or later |
| Android  | Android 4.0 or later |        n/a         |
|   Web    |         n/a          |        n/a         |

## Architecture

`系统架构图`

<div align=center>
<img src="https://github.com/iqiyi/LiteApp/blob/master/Images/Architecture.png?raw=true" alt="Architecture"/>
</div>`

## 

## Demo Project

[ iOS Display ]() 

> <div align=center>
>
> <img src="https://github.com/iqiyi/LiteApp/blob/master/Images/iOS_Video.gif?raw=true" width = "300" height = "300*16/9"  alt="iOS Demo"/>
>
> </div>`

[Android Display]() 

<div align=center>

<img src="https://github.com/iqiyi/LiteApp/blob/master/Images/Andriod_Video.gif?raw=true" width = "300" height = "300*16/9" alt="Android Demo"/>
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

- [Download LiteApp](https://github.com/iqiyi/LiteApp/wiki/common-Download-LiteApp) and try out the included Mac and iPhone example apps
- Read the ["Getting Started" guide](https://github.com/iqiyi/LiteApp/wiki/common-How-To-Get-Started), or [other articles on the Wiki](https://github.com/iqiyi/LiteApp/wiki/home)
- Check out the [documentation](https://github.com/iqiyi/LiteApp/wiki/common-Documents) for a comprehensive look at all of the APIs available in LiteApp

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

`LiteApp VS H5 App Results：70% reduction in first load time，Switch Page is 60 FPS`

| Project   | Loading Time/ms |         Switch Page/fps          |
| :-------- | :-------------: | :------------------------------: |
| LiteApp   |   250-500 ms    |            Perfect/60            |
| HTML5 App |    > 1000ms     | White screen for a short time/53 |

`LiteApp`

> <div align=center>
>
> <img src="https://github.com/iqiyi/LiteApp/blob/master/Images/liteApp.gif?raw=true" width = "300" height = "300*16/9"  alt="iOS Demo"/>
>
> </div>`

`HTML5 App`

<div align=center>

<img src="https://github.com/iqiyi/LiteApp/blob/master/Images/html5.gif?raw=true" width = "300" height = "300*16/9" alt="Android Demo"/>
</div>`

## 

## Credits

LiteApp was originally created by [Guodong Chen](www.breakerror.com)  [Chen Zhang](https://github.com/zhch0633)  [Jingyuan Zhou](https://github.com/pricelesss)   [Yanqiang Zhang](https://github.com/Richard-zhang-iOS) .

LiteApp's logo was designed by [Guodong Chen](www.breakerror.com)

And most of all, thanks to LiteApp's Contributors

### Security Disclosure

If you believe you have identified a security vulnerability with LiteApp, you can contact  [Guodong Chen](www.breakerror.com) as soon as possible. Please do not post it to a public issue tracker.

## License

LiteApp is released under the Apache License, Version 2.0. See [LICENSE](http://gitlab.qiyi.domain/cross-team/lite-app/blob/master/LICENSE) for details.
