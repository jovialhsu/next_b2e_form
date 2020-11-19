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
export const order = {
    orderlist: '/api/orderlist',
    receivingInfo: '/api/receivingInfo',
    orderHandlerList: '/api/orderHandlerList',
    orderDetail: '/api/orderDetail',
    downloadOrderMail: '/api/downloadOrderMail',
    tripContract: '/api/tripContract',
    vacationContract: '/api/vacationContract',
    companyInfo: '/api/companyInfo',
    orderMessage: '/api/orderMessage',
    sendMessage: '/api/sendMessage',
    sendEmailMessage: '/api/sendEmailMessage',
    changeContact: '/api/changeContact',
    showBooking: '/api/showBooking',
    booking: '/api/booking',
    doCashRecSheet: '/api/doCashRecSheet',
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
export const memberEndpoint = {
    payment: (env, aesEncode) =>
        `${member(env)}member/payment/payflow?orderNo=${aesEncode}`,
};
