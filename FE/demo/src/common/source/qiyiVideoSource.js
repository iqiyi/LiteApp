import _ from '../utils/util';
import videoUtil from './videoUtil';
import { auth } from './sourceAuth';
import Promise from '../polyfill/promise';


export function getVideoSource(opts) {
  opts = getOpts(opts);
  return getVideoList(opts);
}

function getOpts(opts) {
  let _opts = {};
  _opts.vfrm = opts.vfrm || '';
  _opts.aid = opts.aid;
  _opts.vid = opts.vid;
  _opts.player = opts.player;
  _opts.qipuId = opts.qipuId;
  _opts.publicLevel = opts.publicLevel;
  _opts.rate = opts.rate;
  return _opts;
}

function getVideoList(params) {
  let qipuId = params.qipuId;
  let vid = params.vid;
  let rate = params.rate || 2;
  let nolimit = 0;
  return auth(qipuId, vid, rate, nolimit).then((data) => {
    return successHandler(data, params);
  }, (data) => {
    return failureHandler(data, params);
  });

}

function buildVideo(data, info, params) {
  let result = {};
  result.src = data.src;
  result.pubLevel = params.pubLevel;
  result.info = info;
  result.rate = params.rate || 1;
  result.qipuId = params.qipuId;
  result.vid = params.vid;
  result.duration = info.duration
  result.prv = info.prv === "1";
  result.previewType = info.previewType === "2" ? 'whole' : '6min';
  result.formatType = videoUtil.videoFormat();
  return result;
}

function message(content, msg, videos) {
  return {
    content: content,
    msg: msg,
    videos: videos
  };
}

function successHandler(data = {}, params) {
  let info = data.data || {};

  return new Promise((resolve, reject) => {
    let errorMessage = isNotNormalVideo(info) || isValidVip(info);
    if (errorMessage) {
      reject(errorMessage);
    }
    let video = buildVideo(data, info, params);

    if (data.status === 'A00000' || data.status === 'A00015') {

    }
    if (data.status === 'A00012') {
      console.log('tmts接口调用完毕，需要请求广告sdk');
      video.isPlayAD = true;
    }

    if (!data.src && data.status !== 'A00012') {
      console.log('tmts接口调用失败!');
      reject(message('noSrc'));
    } else {
      console.log('tmts接口调用成功');
      resolve(video);
    }
  });
}

function failureHandler(data = {}, params) {
  var info = data.data || {};
  return new Promise((resolve, reject) => {
    resolve(data)
  });
}

// 如果是全景直播，则导流到APP.1:普通视频，2:360全景，3:180全景,4:广角视频
function isNotNormalVideo(info) {
  if (info && info.pano && info.pano.type && info.pano.type != 1) {
    return message('isPanoSource');
  }
}

// 验证是否为有效的vip
function isValidVip(info) {
  if (info.vipInfo) {
    let vipInfo = info.vipInfo;
    let vipStatus = vipInfo.status;
    if (vipStatus === 'A10001') {
      // 并发错误
      return message('concurrentTip', {
        param: vipInfo.keepalive,
        text: vipInfo.text
      });

    } else if (vipStatus === 'A10002') {
      // 封禁错误
      return message('forbidTip', {
        param: vipInfo.unfeeze_times,
        text: vipInfo.text
      });
    }
  }
}

function isValidCode(data) {
  let codeMap = {
    A00001: 'noSrc',
    A00002: 'noSrc',
    A00003: 'noSrc',
    A00004: (data) => {
      let info = data.data || {};
      if (info.prv !== '1') {
        return 'offline';
      } else {
        return 'preNotSrc';
      }
    },
    A00011: 'vipckfail',
    A00013: 'oversea',
    Q00201: 'offline',
    Q00202: 'offline',
    Q00203: 'offline',
    A00101: 'mtexpire',
    A00110: 'platformLimit',
    A00111: (data) => {
      if (data.ctl && data.ctl.area == 301) {
        return 'oversea';
      } else {
        return 'domestic';
      }
    },
    A00113: 'ugcUnpass',
    A00114: 'playerForbidden',
    A00115: 'playerForbidden',
    A00301: 'private',
    A00302: 'private',
    A00116: 'drmLimit',
    A00117: 'drmLimit',
    A02602: () => {}

  };

  let state = codeMap[data.code];
  state = (state && _.isFunction(state)) ? state(data) : state;
  state = state || 'defaultTmtsErr';
  return message(state, {
    code: data.code
  });
}
