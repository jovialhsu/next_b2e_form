const config = require('../config');
const isProduction = config.nodeEnv === 'production';
const utils = require('../utils');
const Router = require('koa-router');
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
        console.log('##', ctx.status);
        if (ctx.status !== 200 && ctx.status !== 201) {
            await next();
        } else {
            const router = new Router();
            console.log('發送成功');
            // ctx.app.use(
            //     router.get('/finish', async (ctx) => {
            //         console.log(ctx);
            //     })
            // );
        }
    } catch (error) {
        //console.log('錯誤', error);
        ctx.app.emit('error', error, ctx);
    }
};
