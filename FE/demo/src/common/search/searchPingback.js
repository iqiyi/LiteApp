import config from '../../pages/library/common/config'
import util from '../utils/util'
import user from '../../common/user/user'

let eventId = null;
let bkt = null;
let list = {};
export default function searchPingback() {
    return {
        //发送pingback
        send: function(opt) {
            let json = {
                t: 5,
                pf: 2,
                p: 20,
                p1: util.os.isIOS ? '2_24_241' : '2_24_242',
                p2: '',
                s1: 1,
                s2: '',
                rt: 18,
                u: user.getAnonymousUid() || '',
                pu: user.getUid() || '',
                rn: new Date().getTime(),
                ref: ''
            };

            for (let i in opt) {
                json[i] = opt[i];
            }
            let t = [];
            for (let i in json) {
                if (json[i] === 0) {
                    json[i] = "0";
                }
                t.push(i + "=" + encodeURIComponent(json[i] || ""));
            }

            wx.request({
                url: 'https://msg.iqiyi.com/v5/alt/act'+ '?' + t.join("&"),
                method: 'GET'
            });
        },
        //展示搜索结果以后
        fireAfterSearch: function(data, option) {
            eventId = data.results['eventId'];
            bkt = data.bkt;

            let docs = data.docs;
            let docIDStr;
            let docIDs = [];
            let docIDsStr;

            data.docinfos && data.docinfos.forEach(function(item) {
                let docIdStr = item.docId + ',' + item.siteId + ',' + item.channelId;
                docIDs.push(docIdStr);
            });
            docIDsStr = docIDs.join(';');

            list[data.page] = data.results.list;

            // 发送搜索接口pingback
            this.send({
                t: 9,
                page: data.page,
                tag: data.tag,
                mode: data.mod, //
                e: eventId,
                c1: option.channelId || -1,
                time: data.time,
                docIDs: docIDsStr,
                bkt: bkt,
                docs: data.docs,
                search_time: data.search_time,
                from: "weixin_mini_program"
            });
        },
        //点击pingback
        clickPingback: function(opt) {
            let that = this;
            let pageList = list[opt.page];
            if (pageList.length) {
                for (let i = pageList.length; i--;) {
                    let listItem = pageList[i];
                    if (listItem) {
                        if (opt.albumId == listItem.albumId) {
                            opt.pos = i;
                        }
                    }

                }
            }
            that.send({
                e: eventId,
                c1: opt.channelId,
                ptype: 1,
                site: opt.siteId,
                bkt: bkt,
                pos: opt.pos + 1,
                target: opt.docId, // albumId,
                a: 0,
                page: opt.page,
                from: "weixin_mini_program"
            });
        }
    }
}
