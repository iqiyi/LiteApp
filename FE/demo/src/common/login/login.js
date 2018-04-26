import config from 'config'
import constants from 'constant'
import session from 'session'
import rsaUtil from '../utils/RSA/rsaUtil'
import Promise from '../polyfill/promise'

const LOGIN_URL = `${config.host}/apis/thirdparty/weichat_program_login.action`; //登录服务
const GET_USERINFO_URL = `${config.host}/apis/user/info.action`; //获取用户信息

/**
 * 校验登录
 */
let checkLogin = (success, fail) => {
    let accessToken = session.Session.get(session.SESSION_AUTH_KEY);

    if (!accessToken) {
        typeof fail == "function" && fail();
    } else {
        wx.checkSession({
            success: function() {
                typeof success == "function" && success();
            },
            fail: function() {
                typeof fail == "function" && fail();
            }
        })
    }
}

/**
 * 登录
 */
let login = (isLogin_success , success, fail) => {
    checkLogin(() => {
        //DO NOTHING
        console.log("已登录");
        getWxUserInfo().then((data) => {
            return data
        }, (error) => {
            wx.showToast({
              title: '用户拒绝提供信息',
              icon: 'fail'
            });
        }).then((data)=>{
            typeof isLogin_success == "function" && isLogin_success(data);    
        })
    }, () => {
        remoteLogin(success, fail)
    });
}

/**
 * 服务端请求登录
 */
let remoteLogin = (success, fail) => {
    //调用登录接口
    wx_login().then((res) => {
        getWxUserInfo().then((data) => {
            return data
        }, (error) => {
            wx.showToast({
              title: '用户拒绝提供信息',
              icon: 'fail'
            });
        })
        .then((data) => {
            let params = {
                code: res.code,
                encryptedData: data.encryptedData,
                iv: data.iv
            };

            params.ptid = constants.ptid,
            params.agenttype = constants.agenttype;
            params.verifyPhone = 1;
            params.qd_sc = rsaUtil.getQiyiQtsc(params);

            wx.request({
                url: LOGIN_URL,
                data: params,
                method: 'POST',
                header: {
                      'content-type':'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    typeof success == "function" && success(res.data, data);
                },
                fail: function(error) {
                    typeof fail == "function" && fail(error);
                }
            });
        });
    },(error) => {typeof fail == "function" && fail(error)})
}

function wx_login() {
    return new Promise((resolve, reject) => {
                wx.login({
                        success: function(res) {
                            resolve(res)
                        },
                        fail: function(error) {
                            reject(error)
                        }
                })
            })
}

function getWxUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
                resolve(res)
            },
            fail: function(error) {
                reject(error)
            }
        })
    })
}

function authorize(cb) {
    setTimeout(()=> {
        wx.getSetting({
          success(res) {
              if (!res.authSetting['scope.userInfo']) {
                  wx.authorize({
                      scope: 'scope.userInfo',
                      success() {
                          console.log('用户同意授权')
                          cb && typeof cb == 'function' && cb()
                      },
                      fail(){
                          wx.showModal({
                                title: '获取用户信息授权',
                                content: '微信登录需要获取您的用户信息，请前往设置页打开用户信息授权',
                                confirmText: '去设置',
                                success: function(res) {
                                    if (res.confirm) {
                                        wx.openSetting({
                                          success:function(res){
                                            if (!res.authSetting["scope.userInfo"]) {
                                            }
                                          }
                                        })
                                    } else if (res.cancel) {

                                    }
                                }
                            })
                      }
                  })
              }
              else {
                cb && typeof cb == 'function' && cb()
              }
          }
      });
    }, 50)
}

function getUserInfo(params) {
    return new Promise(function(resolve, reject){
        wx.request({
            url: GET_USERINFO_URL,
            method: 'POST',
            header: {
                  'content-type':'application/x-www-form-urlencoded'
            },
            data: params,
            success: function(res) {
                resolve(res)
            },
            fail: function(error) {
                reject(error)
            }
        });
    })
}

export default{
    login: login,
    getWxUserInfo: getWxUserInfo,
    authorize: authorize,
    getUserInfo: getUserInfo
}
