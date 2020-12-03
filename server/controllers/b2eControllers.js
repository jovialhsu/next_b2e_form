const config = require('../config');
const isProduction = config.nodeEnv === 'production';
const utils = require('../utils');
//const logger = utils.logger;
const { b2eApi } = require('../config/uri/server');
// if no data response body
const noDataMessage = {
    status: -1,
    msg: '無資料',
};
exports.member = async (ctx, next) => {
    ctx.status = 200;
    const options = {
        method: 'POST',
        url: b2eApi.member,
        data: ctx.request.body,
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
