const config = require('../config');
const isProduction = config.nodeEnv === 'production';
const utils = require('../utils');
//const logger = utils.logger;
const { mainWebApi } = require('../config/uri/server');
// if no data response body
const noDataMessage = {
    status: -1,
    msg: '無資料',
};
exports.header = async (ctx, next) => {
    ctx.status = 200;
    const options = {
        method: 'GET',
        url: mainWebApi.header,
    };
    //console.log(options);
    try {
        const { data } = await utils.axiosHandler(options);
        if (!data) {
            ctx.response.body = noDataMessage;
            return;
        }
        ctx.response.body = data;
    } catch (error) {
        console.log(error);
    }
};

exports.footer = async (ctx, next) => {
    ctx.status = 200;
    const options = {
        method: 'GET',
        url: mainWebApi.footer,
    };
    try {
        const { data } = await utils.axiosHandler(options);
        if (!data) {
            ctx.response.body = noDataMessage;
            return;
        }
        ctx.response.body = data;
    } catch (error) {
        console.log(error);
    }
};
exports.EzJsCss = async (ctx, next) => {
    ctx.status = 200;
    const options = {
        method: 'GET',
        url: mainWebApi.EzJsCss,
    };
    try {
        const { data } = await utils.axiosHandler(options);
        if (!data) {
            ctx.response.body = noDataMessage;
            return;
        }
        ctx.response.body = data;
    } catch (error) {
        console.log(error);
    }
};
