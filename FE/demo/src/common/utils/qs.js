var _ = require('./object');

export function parse(url) {
    var query = url.substr(url.lastIndexOf('?') + 1), params = query.split('&'), len = params.length, result = {}, i = 0, key, value,        item, param;

    for (; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        param = params[i].split('=');
        key = param.shift();
        value = param.join('=');

        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (_.isArray(item)) {
            item.push(value);
        } else {
            result[key] = [item, value];
        }
    }

    return result;
}

export function stringify(param = {}, replacer_opt) {
    var result = [], itemLen, replacer = replacer_opt ||
        function (value) {
            return _.escapeSymbol(value);
        };

    for (let key in param) {
        let item = param[key];
        if (_.isArray(item)) {
            itemLen = item.length;
            while (itemLen--) {
                result.push(key + '=' + replacer(item[itemLen], key));
            }
        } else {
            result.push(key + '=' + replacer(item, key));
        }
    }

    return result.join('&');
}

export function addQueryParam(url, name, value) {
    if (!name) return;
    let prefix = url.indexOf('?') !== -1 ? '&' : '?';
    return `${url}${prefix}${name}=${value}`;
}
