export const errorConfig = [{
  type: 'platformLimit',
  contentA: '很抱歉，该平台无法观看本视频',
  contentB: '下载爱奇艺APP观看海量高清视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'oversea',
  contentA: '很抱歉，由于版权限制，',
  contentB: '该视频暂时只对中国大陆地区提供服务',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'mtexpire',
  contentB: '浏览器或应用播放视频出错了，去客户端试试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'offline',
  contentA: '很抱歉',
  contentB: '您所查看的视频已下线',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'ugcUnpass',
  contentA: '很抱歉',
  contentB: '该视频尚未通过审核，暂时无法观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'playerForbidden',
  contentA: '很抱歉',
  contentB: '由于视频版权限制，你无法观看该视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'private',
  contentA: '很抱歉',
  contentB: '该视频为私密视频，仅上传者可见',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'noData',
  contentA: '很抱歉',
  contentB: '当前视频暂时无法播放，请您稍后再试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'noSrc',
  contentA: '很抱歉',
  contentB: '您所查看的视频不存在',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'domestic',
  contentA: '很抱歉，由于版权限制',
  contentB: '您所在的地区暂时无法观看该视频',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'forceDiversion',
  contentA: '很抱歉',
  contentB: '该视频仅支持APP专享，望您谅解',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'drmLimit',
  contentA: '很抱歉',
  contentB: '应版权方要求，当前节目只能在客户端观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'isPanoSource',
  contentA: '很抱歉',
  contentB: '当前节目只能在客户端观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'forbidTip',
  contentB: '检测到您的帐号被严重分享,请设置重试',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'concurrentTip',
  contentB: '您的账号在多台设备同时播放视频，存在安全风险，请尽快退登其他设备或立即修改密码',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'vipckfail',
  contentA: '本片为VIP影片',
  contentB: '开通黄金VIP会员可观看所有VIP影片',
  buttonText: '开通VIP会员方法',
  buttonclick: goToVipGuide
}, {
  type: 'vipckPurchaseFail',
  contentA: '本片为VIP付费影片',
  contentB: '请在爱奇艺客户端观看',
  buttonText: '观看本片精彩看点',
  buttonclick: null
}, {

  type: 'vipckTicketFail',
  contentA: '本片为VIP用券影片',
  contentB: '请在爱奇艺客户端观看',
  buttonText: '观看本片精彩看点',
  buttonclick: null
}, {
  type: 'preNotSrc',
  contentB: '本片仅限VIP用户观看',
  buttonText: '看看其他视频~',
  buttonclick: goToIndex
}, {
  type: 'anonymousLayer',
  contentA: '本片为VIP影片',
  contentB: 'VIP会员请在登录后观看',
  buttonText: '微信登录',
}, {
  type: 'defaultTmtsErr',
  contentA: '很抱歉，当前视频暂时无法播放',
  buttonText: '看看其他视频~',
  buttonclick: null
}];

function goToIndex() {
  wx.switchTab({
    url: '/pages/home/home'
  })
}

function goToLogin() {
  wx.switchTab({
    url: '/pages/my/my'
  })
}

function goToVipGuide() {
  wx.navigateTo({
    url: '/pages/vipGuide/vipGuide'
  })
}
