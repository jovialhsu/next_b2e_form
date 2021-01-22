/**
 * 前端呼叫的api會被bundle進被瀏覽器載入的JS檔
 */
//apiUri
exports.mainApi = {
    header: '/join/api/header',
    footer: '/join/api/footer',
    EzJsCss: '/join/api/EzJsCss',
};
exports.b2e = {
    member: '/join/api/b2eMember',
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
