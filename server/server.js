const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
///const logger = require('koa-logger');
//const helmet = require('koa-helmet');
// const serve = require('koa-static');
// const mount = require('koa-mount');
//const cors = require('koa-cors');
const request = require('request');
const koaBody = require('koa-body');
const next = require('next'); // nextjs 作为中间件
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const mainWebControllers = require('./controllers/mainWebControllers');
const { mainWeb } = require('../config/uri/client');
const { mainWebApi } = require('./config/uri/server');

app.prepare().then(() => {
    const server = new Koa(); // 声明一个 server
    const router = new Router();

    router.get('/api/header', mainWebControllers.header);
    router.get('/api/footer', mainWebControllers.footer);

    server.use(
        bodyParser({
            multipart: true,
            formidable: {
                maxFileSize: 10 * 1024 * 1024,
            },
        })
    );
    router.get('(.*)', async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        await next;
    });

    server.use(router.routes());
    console.log(process.env.NODE_ENV);
    console.log(process.env.API_ENV);
    server.listen(3005);
});
