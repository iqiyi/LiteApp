import constants from './constant'

var SESSION_AUTH_KEY = 'weapp_session_auth_' + constants.ACCESS_TOKEN;

var SESSION_INFO_KEY = 'weapp_session_info_' + constants.ACCESS_TOKEN;

var Session = {
    get: function (sessionName) {
        return wx.getStorageSync(sessionName) || null;
    },

    set: function (sessionName, info) {
        wx.setStorageSync(sessionName, info);
    },

    clear: function () {
        wx.removeStorageSync(SESSION_AUTH_KEY);
        wx.removeStorageSync(SESSION_INFO_KEY);
    }
};

export default  {
	Session,
	SESSION_AUTH_KEY,
	SESSION_INFO_KEY
};
