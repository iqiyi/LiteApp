export const webHost = "http://10.127.18.211:8003";
export function addParamsToUrl(url, data) {
    //create params
    let params = [];
    let _url = url;
    for (let p in data) {
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
export function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}
