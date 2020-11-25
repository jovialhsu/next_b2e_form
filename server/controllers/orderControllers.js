const axios = require('axios');
const config = require('../config');
const isProduction = config.nodeEnv === 'production';
const utils = require('../utils');
//const logger = utils.logger;
const {
    memberApi,
    orderApi,
    flightApi,
    contractUrl,
    paymentApi,
} = require('../config/uri/server');
const fs = require('fs');
//const FormData = require('form-data');
//const clamd = require('clamdjs');
//const scanner = clamd.createScanner('clamav-app-svc.default', 3310);

/**
 * @description api/orderMessage
 * @exports api 訂單往來訊息
 * @param {*} ctx
 * @returns {object} orderMessage
 */
exports.orderMessage = async (ctx, next) => {
    ctx.status = 200;
    const { orderNo } = ctx.request.body;
    //const decryptOrderNo = utils.decrypt(orderNo)
    console.log(orderNo);
    const options = {
        method: 'POST',
        url: orderApi.orderMessage(orderNo),
        timeout: 60 * 1000,
        data: { orderNo: 'ORD0000' },
    };
    try {
        const { data } = await utils.axiosHandler(options);
        // if (!utils.arrIsNotEmpty(data.items)) {
        //   ctx.response.body = noDataMessage
        //   return
        // }
        console.log(data);
        ctx.response.body = {
            status: 200,
            items: data,
        };
    } catch (error) {
        console.error(
            `network fetch error - ${options.url} - ${error.message}`
        );
    }
};

/**
 * @description api/orderDetail
 * orderNo是加密編號,且檢查訂單所有者checkOrderOwner=true
 * fetch getOrderDetail&getOrderContent
 * 組成一新物件orderDetail:orderHeader&orderProds&orderContent
 * @exports api
 * @param {string} aesOrderNo
 * @returns {object} orderDetail
 */
exports.orderDetail = async (ctx, next) => {
    ctx.status = 200;
    const { orderNo } = ctx.request.body;
    let decryptOrderNo = null;
    if (orderNo && orderNo.indexOf('ORD') !== 0) {
        decryptOrderNo = utils.decrypt(orderNo);
    }
    const getOrderProd = () => {
        const options = {
            method: 'POST',
            url: orderApi.orderProd,
            data: { orderNo: decryptOrderNo },
        };
        return utils.axiosHandler(options);
    };
    const getOrderContent = () => {
        const options = {
            method: 'POST',
            url: orderApi.orderContent,
            data: { orderNo: decryptOrderNo },
        };
        return utils.axiosHandler(options);
    };
    try {
        if (decryptOrderNo) {
            //是否訂單owner
            const checkOwner = await checkOrderOwner(ctx, decryptOrderNo);
            // const checkOwner = { isOrderOwner: 'true' }
            if (checkOwner.isOrderOwner === 'true') {
                const orderDetail = {
                    orderHeader: {},
                    orderProds: [],
                    orderContent: {},
                };
                await axios.all([getOrderProd(), getOrderContent()]).then(
                    axios.spread((prod, content) => {
                        if (
                            !utils.arrIsNotEmpty(prod.data.items) &&
                            !utils.arrIsNotEmpty(content.data.items)
                        ) {
                            ctx.response.body = noDataMessage;
                            return;
                        }
                        //orderHeader & orderProds
                        const {
                            orderHeader,
                            orderProds,
                            orderRecs,
                            orderSheets,
                        } = prod.data.items[0];
                        orderDetail.orderHeader = orderHeader;
                        //add aesOrderNo to orderHeader api data
                        orderDetail.orderHeader.aesOrderNo = orderNo;
                        orderDetail.orderProds = orderProds;
                        //orderContent
                        const {
                            memberOrderCustInfo: custInfo,
                            memberOrderFitProdInfo: fitProdInfo,
                            travelInfo,
                            fareRuleUrl,
                            airtwInfoMap,
                        } = content.data.items[0];
                        if (airtwInfoMap !== undefined) {
                            let temp = Object.keys(airtwInfoMap).map(
                                (infoKey) => airtwInfoMap[infoKey]
                            );
                            travelInfo.airtwInfoMap = temp;
                        }
                        orderDetail.orderContent = {
                            custInfo,
                            fitProdInfo,
                            travelInfo,
                            fareRuleUrl,
                            orderRecs,
                            orderSheets,
                        };
                    })
                );
                ctx.response.body = {
                    status: 200,
                    ...orderDetail,
                };
                console.info(`訂單詳細: ${decryptOrderNo}`);
            } else {
                ctx.response.body = {
                    status: -1,
                    msg: '無此訂單檢視權限，請於首頁登入或重新確認帳號',
                };
                console.info(
                    `訂單詳細: ${checkOwner.custNo} - 無訂單 ${decryptOrderNo} 檢視權限`
                );
            }
        } else {
            ctx.response.body = {
                status: -1,
                msg: '訂單編號錯誤，請重新確認',
            };
            console.warn(`訂單詳細: ${orderNo} - 訂單編號錯誤`);
        }
    } catch (error) {
        console.error(
            `network fetch error - ${options.url} - ${error.message}`
        );
        ctx.throw(500);
    }
};
