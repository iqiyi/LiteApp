import _ from '../utils/util';
import * as videoConfig from './videoConfig';

const VIDEO_TEMPLATE = { // 视频模板
    ALBUM: 'album', // 专辑类 剧集类
    SOURCE: 'source', // 来源类
    MOVIE: 'movie', // 电影
    SHORT: 'short' //  短视频
};

export default {
    videoFormat,
    error,
    log,
    getVideoTemplate,
    getLrCorner,
    is6minVideo
};

function videoFormat() {
    return 'mp4';
    return isAndroid ? 'mp4' : 'm3u8';
}

function error(message) {
    console.error(message);
}

function log(message) {
    console.log(message);
}

// 判断视频种类
function getVideoTemplate({isSolo, isSource,  channelId, cid }) {
    var videoTemplate = VIDEO_TEMPLATE;
    var template = '';
    cid = cid || channelId || '';

    if (cid && cid == 1) {
        template = videoTemplate.MOVIE;
    } else if (!isSource && isSolo) {
        template = videoTemplate.SHORT;
    } else if (!isSource && !isSolo) {
        template = videoTemplate.ALBUM;
    } else {
        template = videoTemplate.SOURCE;
    }

    return template;
}

// 获取右下角标
function getLrCorner(template, score, isFinish, episode, period, duration) {
    var content = '';
    var videoTemplate = VIDEO_TEMPLATE;
    if (template === videoTemplate.MOVIE) {
        if (score) score = score.toFixed(1);
        content = score;
    } else if (template === videoTemplate.ALBUM) {
        content = (isFinish === 1) ? (episode + '集全') : ('更新至' + episode + '集');
    } else if (template === videoTemplate.SOURCE) {
        content = period && period.length === 8 ? (period.slice(0, 4) + '-' + period.slice(4, 6) + '-' + period.slice(6, 8) + '期') : '';
    } else {
        content = _.time.formatSecondOmit(duration);
    }
    return content;
}

export function is6minVideo(info) {
  return (info.prv && info.previewType === '6min') || (info.prv === "1" && info.previewType !== "2");
}

export function getError(data, opts = {}) {
    let error;
    videoConfig.errorConfig.forEach((config) => {
        if (config.type === data.content) {
            error = config;
            error.code = data.msg ? data.msg.code : '';
        }
    });
    return Object.assign({}, error, opts);
}
