import config from '../../pages/library/common/config'
import util from '../utils/util'

export default {
    init: function(opt) {
        this.currentCid = opt.cid || 2;
        this.searchNum = opt.searchNum;
        this.imgH = opt.imgH;
    },
    getFormatData: function(json) {
        var _data = {};

        if (json && typeof json == "object") {
            if (json.result_num && json.result_num > 0 && json.docinfos) {
                _data.success = true;
                if (json.docinfos && json.docinfos.length === 0) {
                    _data.isFinal = true;
                } else if (json.docinfos && json.page_size && json.page_size > json.docinfos.length || json.result_num / json.page_size <= json.page_num) {
                    _data.isFinal = true;
                } else {
                    _data.isFinal = false;
                }
            } else {
                _data.success = false;
                _data.isFinal = true;
            }
        }
        var data = [];
        var that = this;
        json.docinfos && json.docinfos.forEach(function(item) {
            var formatData = that.dataFormat(item);
            if (formatData) {
                data.push(formatData);
            }
        });
        if (data.length == 0) {
            _data.isEmpty = true;
        } else if (data.length != json.docinfos.length) {
            //修正显示视频个数，防止页面空白。
            if (that.searchNum % 2 == 0) {
                data.length = data.length - data.length % 2;
            } else if (that.searchNum % 3 == 0) {
                data.length = data.length - data.length % 3;
            }
            if (data.length < 1) {
                _data.isEmpty = true;
            }
        }
        _data.results = data || {};
        _data.eventId = json.event_id;
        _data.bkt = json.bkt;
        _data.search_time = json.search_time;
        _data.docinfos = json.docinfos;
        _data.pageNum = json.page_num;
        return _data;
    },
    //数据格式化
    dataFormat: function(item) {
        var data = {};
        var item_docInfo = item.albumDocInfo;
        if (!Array.isArray(item_docInfo.videoinfos)) {
            return null;
        }
        //获取频道信息
        var category_infos = item_docInfo.channel.split(",");
        var category = category_infos[0];
        var categoryId = category_infos[1];
        item_docInfo.categoryId = categoryId;
        //common信息，发pingback时候用
        data.docId = item.doc_id;
        data.siteId = item_docInfo.siteId;
        data.channelId = categoryId;
        data.albumId = item_docInfo.albumId;
        data.pageUrl = item_docInfo.videoinfos[0] && item_docInfo.videoinfos[0].itemLink || item_docInfo.albumLink;
        //右上角图标信息
        data.isExclusive = item_docInfo.is_exclusive;
        data.isQiyiProduced = item_docInfo.is_qiyi_produced;
        data.isPaikeType = !!item_docInfo.special_content_type;
        //背景图片
        data.imageUrl = this.getImageUrl(item_docInfo, this.imgH);
        // data中增加以下字段：  右下角， 标题  、 右上角标信息
        let fData = Object.assign(data, this.getShowContent(item_docInfo), this.getTitles(item_docInfo, this.currentCid), this.getPayType(item_docInfo.paymark))
        return fData;
    },
    //获取显示信息，用于模板右下角标和标题
    getShowContent: function(itemInfo) {
        var rbContent, mainTitle, subTitle;
        var channelId = itemInfo.categoryId;
        //右下角标信息，主标题，副标题
        //开始按视频类型判断：
        var videoInfo = itemInfo.videoinfos[0];
        if (itemInfo.videoDocType == 1) {
            if (itemInfo.album_type == 1) {
                //带期数的
                rbContent = videoInfo.year ? (videoInfo.year + "").replace(/\d{4}(\d{2})(\d{2})/, '$1-$2') + "期" : "";
            } else if (itemInfo.album_type == 0 && itemInfo.series || itemInfo.series) {
                //剧集类的
                var newest_item_number = itemInfo.newest_item_number || videoInfo.itemNumber;
                if (newest_item_number != itemInfo.itemTotalNumber) {
                    rbContent = "更新至" + newest_item_number + "集";
                } else {
                    rbContent = newest_item_number + "集全";
                }
            } else {
                //如果是电影
                var score = (itemInfo.score == 0.0 || !itemInfo.score) ? 8.0 : itemInfo.score;
                rbContent = score == Math.floor(score) ? score + ".0" : Number(score).toFixed(1);
                var isMovie = true;
            }
        } else if (itemInfo.videoDocType == 2) {
            //其他短视频
            rbContent = util.time.formatSecond(videoInfo.timeLength);
        }
        //返回一个对象，包含模板中的文本信息
        return {
            rbContent: rbContent,
            isMovie: isMovie
        };
    },
    //根据频道获取正副标题
    getTitles: function(itemInfo, cid) {
        var mainTitle, subTitle, channelId = itemInfo.categoryId;
        var videoInfo = itemInfo.videoinfos[0];
        var that = this;
        if (itemInfo.videoDocType == 1) {
            if (itemInfo.album_type == 1) {
                //带期数的
                if (cid == config.channelMap.ZONG_YI || cid == config.channelMap.TUO_KOU_XIU) {
                    //如果是综艺或者脱口秀
                    mainTitle = itemInfo.albumTitle;
                } else {
                    mainTitle = videoInfo.itemshortTitle || videoInfo.itemTitle || itemInfo.albumTitle;
                }
                subTitle = videoInfo.itemshortTitle || videoInfo.itemTitle;
            } else if (itemInfo.album_type == 0 && itemInfo.series || itemInfo.series) {
                //剧集类的
                mainTitle = itemInfo.albumTitle;
                subTitle = videoInfo.subTitle || that.getThreeCategory(itemInfo.threeCategory, 2);
            } else {
                //如果是电影 
                mainTitle = itemInfo.albumTitle;
                subTitle = videoInfo.subtitle || that.getThreeCategory(itemInfo.threeCategory, 2);
            }
        } else if (itemInfo.videoDocType == 2) {
            //其他短视频
            if (channelId == 16) {
                mainTitle = videoInfo.itemshortTitle || videoInfo.itemTitle;
            } else {
                mainTitle = videoInfo.itemTitle || videoInfo.itemshortTitle;
            }
            subTitle = videoInfo.subTitle || that.getThreeCategory(itemInfo.threeCategory, 2);
        }
        if (cid != config.channelMap.ZONG_YI && cid != config.channelMap.TUO_KOU_XIU) {
            //如果不是综艺或者脱口秀
            subTitle = "";
        }
        return {
            'mainTitle': mainTitle,
            'subTitle': subTitle
        };
    },
    //根据搜索接口中的payMark获取 该视频的付费类型  1、vip 2、用券   3、付费   ,为模板右上角标提供数据
    getPayType: function(payMark) {
        if (!payMark)
            return;
        var o = {};
        if (payMark == 1) {
            o.isVip = true;
        } else if (payMark == 2) {
            o.isBill = true;
        } else if (payMark == 3) {
            o.isPaid = true;
        }
        return o;
    },
    //获取背景图片
    getImageUrl: function(itemInfo, imgH) {
        var imageUrl = "";
        var videoInfo = itemInfo.videoinfos[0];
        if (itemInfo.videoDocType == 1) {
            if (itemInfo.album_type == 1) {
                imageUrl = videoInfo.itemHImage;
            } else {
                imageUrl = itemInfo.albumImg;
            }
        } else if (itemInfo.videoDocType == 2) {
            //其他视频
            imageUrl = videoInfo.itemHImage;
        }
        if (!imgH) {
            imageUrl = this.fixImage(imageUrl, "_195_260");
        } else {
            imageUrl = this.fixImage(imageUrl, "_284_160");
        }
        return imageUrl;
    },
    //修正图片尺寸
    fixImage: function(url, fix_tail) {
        if (fix_tail && fix_tail.indexOf(".jpg") == -1) {
            fix_tail = fix_tail + ".jpg";
        }
        if (/_\d{3}_\d{3}\.jpg$/i.test(url)) {
            //如果url最后是_***_***.jpg结尾
            return url.replace(/_\d{3}_\d{3}\.jpg$/i, fix_tail);
        } else if (/\.jpg/i.test(url)) {
            //如果url最后不是以_***_***.jpg结尾
            return url.replace(/\.jpg/i, fix_tail);
        }
    },
    getThreeCategory: function(threeCategory, num) {
        if (typeof threeCategory != "string") {
            return "";
        }
        var categorys = threeCategory.split(" ");
        var categoryName = [];
        categorys.forEach(function(item) {
            var items = item ? item.split(",") : [];
            if (items.length > 0) {
                categoryName.push(items[0]);
            }
        });
        return categoryName.slice(0, num).join(" ");
    }
}