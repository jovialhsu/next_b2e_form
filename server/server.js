const Koa = require('koa');
// const BodyParser = require('koa-bodyparser');
// const Router = require('koa-router');
// const Logger = require('koa-logger');
// const serve = require('koa-static');
// const mount = require('koa-mount');
// const cors = require('koa-cors');
const next = require('next'); // nextjs 作为中间件
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa(); // 声明一个 server

    /** 这是 Koa 的核心用法：中间件。通常给 use 里面写一个函数，这个函数就是中间件。
     * params:
     *  ctx: Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为请求上下文对象
     *  next: 调用后将执行流程转入下一个中间件，如果当前中间件中没有调用 next，整个中间件的执行流程则会在这里终止，后续中间件不会得到执行
     */

    // server.use(async (ctx, next) => {
    //     const start = Date.now();
    //     await next();
    //     const ms = Date.now() - start;
    //     ctx.set('X-Response-Time', `${ms}ms`);
    // });
    // server.use(async (ctx, next) => {
    //     const start = Date.now();
    //     await next();
    //     const ms = Date.now() - start;
    //     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    // });
    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.response = false;
        //console.log('hello world~~~~');
    });
    console.log(process.env.NODE_ENV);
    console.log(process.env.API_ENV);
    server.listen(3005);
});
