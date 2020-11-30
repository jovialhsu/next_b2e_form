/**
 * 前端呼叫的api會被bundle進被瀏覽器載入的JS檔
 */
//apiUri
export const login = {
    otpk: '/api/otpk',
    checkLoginAuth: '/api/checkLoginAuth',
    logout: '/api/logout',
    recaptcha: '/api/recaptcha',
};

//Endpoint & staticUrl
const member = (env) => {
    switch (env) {
        case 'PRD':
            return 'https://member.eztravel.com.tw/';
        case 'WS':
            return 'https://mem-ws01.eztravel.com.tw/';
        case 'TEST':
        default:
            return '//mem00t-w01.eztravel.com.tw/';
    }
};
export const mainWeb = (env) => {
    switch (env) {
        case 'PROD':
            return 'https://hpapi.eztravel.com.tw/';
        case 'WS':
            return 'http://hpapi-ws01.eztravel.com.tw/';
        case 'TEST':
        default:
            return '//hpapi-t01.eztravel.com.tw/';
    }
};
