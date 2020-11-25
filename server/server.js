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
const orderControllers = require('./controllers/orderControllers');

app.prepare().then(() => {
    const server = new Koa(); // 声明一个 server
    const router = new Router();

    router.get('/order-management-rec', async (ctx) => {
        ctx.status = 200;
        let { orderNo } = ctx.query;
        console.log(ctx.query);
        //const loginInfo = await loginControllers.checkAuth(ctx);
        //if (loginInfo && loginInfo.checkRole) {
        const query = Object.assign({}, ctx.query, { decryptOrderNo: orderNo });
        await app.render(ctx.req, ctx.res, '/orderRecDetail', query);
        // } else {
        // ctx.status = 302;
        // ctx.redirect('/');
        // return;
        //}
        ctx.respond = false;
    });

    router.get('(.*)', async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        await next;
    });

    router.post('/article', (ctx) => {
        // 把資料分別存在 title、body、author 等變數
        const { title } = ctx.request.body;
        const { body } = ctx.request.body;
        const { author } = ctx.request.body;

        if (title && body && author) {
            // 如果必填資料都有，就塞進 articles 裡面。然後依照文件回傳 201
            articles.push({
                id: ++lastId,
                title,
                body,
                author,
                time: new Date(),
            });
            ctx.status = 201;
            ctx.body = lastId;
        } else {
            // 如果有欄位沒有填，就依照文件回傳 400
            console.log('ll');
            ctx.status = 400;
        }
    });

    router.post('/api/orderMessage', orderControllers.orderMessage);
    server.use(
        bodyParser({
            multipart: true,
            formidable: {
                maxFileSize: 10 * 1024 * 1024,
            },
        })
    );
    server.use(router.routes(), router.allowedMethods());
    console.log(process.env.NODE_ENV);
    console.log(process.env.API_ENV);
    server.listen(3005);
});
