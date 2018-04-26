import Promise from '../polyfill/promise';
const strategyDiver = '3'; // 命中策略 3
/**
 * 验证平台是否需要导流
 */
export function validPlatform(qipuId, vfm) {
    return getStrategy(qipuId, vfm).then((strategy) => {
        return new Promise((resolve, reject) => {
            if (strategy === strategyDiver) {
                reject();
            } else {
                resolve(strategy);
            }
        });
    });
}

let cache = {};
function getStrategy(qipuId = '', vfm = '') {
    return new Promise((resolve, reject) => {
        let strategy = cache[qipuId];
        if (strategy) {
            resolve(strategy);
            return;
        }
        wx.request({
            url: 'https://m.iqiyi.com/api/cloud/code',
            data: {
                _tv_id_: qipuId,
                vfm: vfm
            },
            method: 'GET',
            success: (res) => {
                if (res.statusCode == '200') {
                    let strategy =  res.data ? res.data.strategy : '';
                    resolve(strategy);
                    cache[qipuId] = strategy;
                } else {
                    reject();
                }
            },
            fail: reject
        });
    });
}
