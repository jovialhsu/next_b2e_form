const config = require('../config');
const isProduction = config.nodeEnv === 'production';
const utils = require('../utils');
const { b2eApi } = require('../config/uri/server');
// if no data response body
const noDataMessage = {
    status: -1,
    msg: '無資料',
};
exports.member = async (ctx, next) => {
    //ctx.status = 200;
    const options = {
        method: 'POST',
        url: b2eApi.member,
        data: ctx.request.body,
    };
    try {
        ctx.response.body = await utils.axiosHandler(options);
        console.log('回應的狀態', ctx.response.body);
        ctx.status = ctx.response.body.status;
        if (ctx.status !== 200) await next();
    } catch (error) {
        console.log(error);
        ctx.app.emit('error', error, ctx);
    }
};
