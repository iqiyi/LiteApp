

export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

export function escapeSymbol(source) {
    return String(source).replace(/[#%&+=\/\\\ \u3000\f\r\n\t]/g, function (all) {
        return '%' + (0x100 + all.charCodeAt()).toString(16).substring(1).toUpperCase();
    });
}

export function numToChinaNum(num) {
    if (!num || num <= 0) return 0;

    if (num < 100000) {
        return addSeparator(num, ',', 3);
    } else if (num < 1000000) {
        return (num / 10000).toFixed(1) + '万';
    } else if (num < 100000000) {
        return (num / 10000).toFixed(0) + '万';
    } else {
        return (num / 100000000).toFixed(1) + '亿';
    }
}

// 添加分割符
function addSeparator(num, sep, len) {
    var numStr = num.toString();
    var result = '';
    for (var i = numStr.length; i > 0; i = i - len) {
        var start = (i - len) < 0 ? 0 : (i - len);
        var end = i;
        result = sep + numStr.slice(start, i) + result;
    }
    return result.substring(1);
}

export function paopaoFormatCount(n, f) {
    if (n > 1e4) {
        n = (n / 1e4).toFixed(f) + '万';
    }
    return n;
}

export function getBirth(birth) {
        if (!birth) return '';
        return [birth.substring(0, 4), birth.substring(4, 6), birth.substring(6, 8)].join('-');
    }
export function formatYearALL(year) {
        return ('' + year).replace(/(\d{4})(\d{2})(\d{2})/g, function (a, y, m, d) {
            return [y,m, d].join('-');
        });
    }
export function formatYear(year) {
        return ('' + year).replace(/(\d{4})(\d{2})(\d{2})/g, function (a, y, m, d) {
            return [m, d].join('-');
        });
    }
