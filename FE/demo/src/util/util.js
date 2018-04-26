export function addParamsToUrl(url,data){
    //create params
    let params = [];
    let _url = url;
    for(let p in data) {
        if (data.hasOwnProperty(p)) {
            params.push(p + '=' + encodeURIComponent(data[p]));
        };
    }
    if (params.length > 0) {
        _url += _url.indexOf('?') == -1 ? '?' : '&';
        _url += params.join('&');
    }
    return _url
}

export const inBrowser = typeof window !== 'undefined';
