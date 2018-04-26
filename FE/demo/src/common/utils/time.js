
export function formatSecond(sec) {
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = Math.floor(sec % 60);

    h = h >= 10 ? h : ('0' + h);
    m = m >= 10 ? m : ('0' + m);
    s = s >= 10 ? s : ('0' + s);

    return [h, m, s].join(':');
}

export function formatSecondOmit(date) {
    var formatDate = this.formatSecond(date);
    return this.secondOmit(formatDate);
}

export function secondOmit(formatDate) {
    if (formatDate && formatDate.substring(0, 3) === '00:') {
        return formatDate.substring(3);
    } else {
        return formatDate;
    }
}

export function format(date, fmt) {  
    var o = {
        'M+': date.getMonth() + 1, //月份 
        'd+': date.getDate(), //日 
        'h+': date.getHours(), //小时 
        'm+': date.getMinutes(), //分 
        's+': date.getSeconds(), //秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
        'S': date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}

export function createTimeTip(uploadTime, serverTime) {
        if ((/Invalid /ig).test(new Date(uploadTime))) {
            uploadTime = uploadTime.replace(/-/g, '/');
        }
        uploadTime = new Date(uploadTime);
        if ((/Invalid /ig).test(new Date(serverTime))) {
            serverTime = serverTime.replace(/-/g, '/');
        }
        serverTime = new Date(serverTime);
        var interval = (serverTime - uploadTime) / 1000;
        var createTimeTip = '';
        if (!uploadTime) {
            createTimeTip = '';
        } else if (interval < 10) {
            createTimeTip = '刚刚';
        } else if (interval < 60) {
            createTimeTip = interval + '秒前';
        } else if (interval < 60 * 60) {
            createTimeTip = Math.floor(interval / 60) + '分钟前';
        } else if (interval < 60 * 60 * 2) {
            createTimeTip = '一小时前';
        } else if ((uploadTime.getDay() === serverTime.getDay()) && (interval < 60 * 60 * 24)) {
            createTimeTip = $.date.format(uploadTime, 'H点mm分');
        } else if (((uploadTime.getDay() + 1) % 7 === serverTime.getDay()) && (interval < 60 * 60 * 48)) {
            createTimeTip = '昨天';
        } else if (((uploadTime.getDay() + 2) % 7 === serverTime.getDay()) && (interval < 60 * 60 * 72)) {
            createTimeTip = '前天';
        } else {
            if (new Date().getFullYear() === uploadTime.getFullYear()) {
                createTimeTip = $.date.format(uploadTime, 'M月d日');
            } else {
                createTimeTip = $.date.format(uploadTime, 'yyyy年M月d日');
            }
        }
        return createTimeTip;
    }