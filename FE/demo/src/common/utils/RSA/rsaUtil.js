import RSA from 'index'
import _ from '../util'

export default {
    getQiyiQtsc: function(params) {
        var SECRET_KEY = 'w0JD89dhtS7BdPLU2';
        var sign = '';
        //所有key按升序排列
        var sortedKeys = this.keys(params).sort();
        for (var i = 0, len = sortedKeys.length; i < len; i++) {
            sign += sortedKeys[i] + '=' + params[sortedKeys[i]] + '&';
        }
        //去掉最后一个&，并拼接上默认的SECRET_KEY值
        sign = sign.slice(0,-1) + SECRET_KEY;
        //将返回值做md5编码
        return _.md5(unescape(encodeURIComponent(sign)));
    },
    //获取所有参数名称，返回一个数组
    keys: function(params) {
        var keyArray = [], i = 0;
        for (keyArray[i++] in params);
        return keyArray;
    },
    //RSA加密
    RSAEncryption: function(proclaimedCode) {
        var EXPONENT_KEY = '10001';
        var MODULUS_KEY = 'ab86b6371b5318aaa1d3c9e612a9f1264f372323c8c0f19875b5fc3b3fd3afcc1e5bec527aa94bfa85bffc157e4245aebda05389a5357b75115ac94f074aefcd';

        //参数1为公钥的exponent(hex),参数2请留空,参数3为公钥的modulus(hex)
        var RSA_key = RSA.getKeyPair(EXPONENT_KEY, '', MODULUS_KEY);
        //要加密的字符必须encode编码,replace是因为如果要加密的字符过长自动分段和后台商定用'-'分割
        var result = RSA.encryptedString(RSA_key, encodeURIComponent(proclaimedCode)).replace(/\s/g, '-');
        return result;
    }
 }