/**
 * server use api uri
 */
const config = require('../../config');
//DEV endpoint & docker container TEST/WS/PRD endpoint
const MEMBER = `${config.memPlayScheme}://member.eztravel.com.tw/`;
const MEMBER_API =
    config.env === 'DEV' ? 'http://member-api:8080/' : 'http://member-api/';
const ORDER_API =
    config.env === 'DEV' ? 'http://order-api:8080/' : 'http://order-api/';
const FLIGHT_API =
    config.env === 'DEV' ? 'http://flight-api:8080/' : 'http://flight-api/';
const PAYMENT_API =
    config.env === 'DEV' ? 'http://payment-api:8080/' : 'http://payment-api/';

exports.loginApi = {
    otpk: (userId) => `${MEMBER}auth/otpk/${userId}?type=json`,
    loginAuth: `${MEMBER}auth/loginAuth?type=json`,
    logout: `${MEMBER}auth/clearLoginCookie`,
    recaptcha: (secret, response) =>
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
};
exports.memberApi = {
    checkLogin: `${MEMBER_API}member/rest/v1/Member/checkLogin`,
    sendMessage: (orderNo) =>
        `${MEMBER_API}member/v1/b2b/orders/${orderNo}/messages`,
    checkOwner: (orderNo) =>
        `${MEMBER_API}member/v1/ownership/orders/${orderNo}/check`,
};
exports.orderApi = {
    orderlist: `${ORDER_API}order/rest/v1/b2b/orderlist`,
    orderContent: `${ORDER_API}order/rest/v1/Order/getMemberOrderContent`,
    orderProd: `${ORDER_API}order/rest/v1/Order/getOrderProd`,
    companyInfo: (compNo) =>
        `${ORDER_API}order/rest/v1/b2b/getCompanyInfo?compNo=${compNo}`,
    orderHandlerList: (compNo) =>
        `${ORDER_API}order/rest/v1/b2b/getOrderHandlerList?compNo=${compNo}`,
    orderMail: (orderNo) =>
        `${ORDER_API}order/rest/v1/Order/viewOrderMail/${orderNo}`,
    orderMessage: (orderNo) =>
        `${ORDER_API}order/v1/b2b/orders/${orderNo}/messages`,
    changeContact: (orderNo) =>
        `${ORDER_API}order/v1/b2b/orders/${orderNo}/contactinfo`,
    receivingInfo: (compNo) =>
        `${ORDER_API}/order/v1/b2b/${compNo}/receivinginfo`,
};
exports.flightApi = {
    showBooking: (orderNo) =>
        `${FLIGHT_API}mpflight/rest/b2f/showBooking/${orderNo}`,
    booking: (orderNo) => `${FLIGHT_API}mpflight/rest/b2f/booking/${orderNo}`,
};
exports.paymentApi = {
    doCashRecSheet: `${PAYMENT_API}payment/rest/v1/Rec/doCashRecSheet`,
};

//旅遊契約書
const TRIP = `${config.tripPlayScheme}://trip.eztravel.com.tw/`;
const VACATION = `${config.vacationPlayScheme}://vacation.eztravel.com.tw/`;

exports.contractUrl = {
    trip: (orderNo) => `${TRIP}domestic/contract/internal/${orderNo}`,
    vacation: (orderNo) =>
        `${VACATION}pkgfrn/contractByOrderNoWithEncodeInternal/${orderNo}`,
};
