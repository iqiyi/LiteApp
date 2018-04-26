import _ from '../utils/util'

export default {
    ACCESS_TOKEN: "ACCESS_LOGIN_TOKEN",//本地存储的3rd_session_key
    agenttype: _.os.isIOS ? 237 : 236,
    ptid: _.os.isAndroid ? '02028001010000000000' : '02038001010000000000'
}