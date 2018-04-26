import videoUtil from './videoUtil';
import tmts from '../tmts/tmts';
import _  from '../utils/util';
import Promise from '../polyfill/promise';

function addParamsToUrl(url, data) {
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

export function auth(qipuId, vid, rate = 1, nolimit) {
    if (!qipuId || !vid) return Promise.reject({code : 'A00001', 'data' : {}});
    let opts = {
        uid: '',
        platForm: 'h5',
        qyid: '',
        agenttype: _.os.isAndroid ? 236 : 237,
        ptid: _.os.isAndroid ? '02028001010000000000' : '02038001010000000000',
        type: videoUtil.videoFormat(),
        nolimit: nolimit,
        k_ft1: 8, //观影提示前贴片
        rate: rate,
        p: '',
        deviceid: '',
        codeflag: 1
    };
    return new Promise((resolve, reject) => {
        //鉴权参数拼接，防盗链
        opts = getTmtsVf(qipuId, vid, opts);
        let url = 'https://cache.m.iqiyi.com/tmts/' + qipuId + '/' + vid + '/';
        queueAuth(opts)().then((res) => {
            let data = res.data;

            if (data && data.code === 'A00000') {
                filterM3U(qipuId, data);
                resolve(data);
            } else {
                reject(data);
            }
        }, (error) => {
            console.log('tmts接口调用失败， retry');
            reject(error);
        });


        function queueAuth(opts) {
            let num_retry = 3;
            return () => {
                return new Promise((resolve, reject) => {
                    _auth();

                    function _auth() {
                        getSource(url, opts).then(function(data) {
                            resolve(data);
                        }, function(error) {
                            if (num_retry) {
                                _auth(opts);
                            } else {
                                reject(error);
                            }
                            num_retry--;
                        });
                    }
                })
            };
        }
    });
}

function filterM3U(qipuId, data) {
    let status = {
        A00012: '需要前端请求广告mixer接口',
        A00015: '会员鉴权成功',
        A00000: '不请求广告直接播放'
    };
    if (data.data && status[data.data.ds]) {
        data.src = _.qs.addQueryParam(data.data.m3u, 'qypid', `${qipuId}_31`);
        data.status = data.data.ds;
    }
}


function getSource(url, opts) {
    return new Promise((resolve, reject) => {
        qiyiApi.request({
            url : addParamsToUrl( url , opts ),
            success : resolve,
            error : err=>{
                console.log('tmts接口调用失败， url: , ' + JSON.stringify(url) + ' error: ' + error);
                reject(err);
            }
        })
    });
}

function getTmtsVf(qipuId, vid, param = {}) {
    let key = tmts.cmd5xtmts();
    //  02028001010000000000 02020031010000000000
    param = Object.assign(param, key, {src: '02028001010000000000'});
    let query = _.qs.stringify(param);
    let urlPara = `/tmts/${qipuId}/${vid}/?${query}`;
    param.vf = tmts.cmd5x(urlPara);
    return param;
}
