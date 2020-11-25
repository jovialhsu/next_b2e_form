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

exports.orderApi = {
    orderlist: `${ORDER_API}order/rest/v1/b2b/orderlist`,
    orderContent: `${ORDER_API}order/rest/v1/Order/getMemberOrderContent`,
    orderProd: `${ORDER_API}order/rest/v1/Order/getOrderProd`,
    orderMessage: () =>
        `http://ord00t-a01.eztravel.com.tw:8080/order/rest/v1/Order/getOrderProd`,
    //`${ORDER_API}order/v1/b2b/orders/${orderNo}/messages`,
};
