const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const config = require("./config");
///const logger = require('koa-logger');
//const helmet = require('koa-helmet');
// const serve = require('koa-static');
// const mount = require('koa-mount');
//const cors = require('koa-cors');
const compression = require("compression");
const koaConnect = require("koa-connect");
//const request = require('request');
//const koaBody = require('koa-body');
const next = require("next"); // nextjs
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const mainWebControllers = require("./controllers/mainWebControllers");
const b2eControllers = require("./controllers/b2eControllers");
// const { mainWeb } = require('../config/uri/client');
// const { mainWebApi } = require('./config/uri/server');

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(koaConnect(compression()));
  router.get("/api/header", mainWebControllers.header);
  router.get("/api/footer", mainWebControllers.footer);
  router.get("/api/EzJsCss", mainWebControllers.EzJsCss);
  router.post("/api/b2eMember", b2eControllers.member);
  //router.get('/finish', b2eControllers.member);
  server.use(
    bodyParser({
      multipart: true,
      formidable: {
        maxFileSize: 10 * 1024 * 1024,
      },
    })
  );
  router.get("(.*)", async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    console.log("process pid =>", process.pid);
    await next;
  });

  server.use(router.routes());
  console.log(process.env.NODE_ENV);
  console.log(process.env.API_ENV);
  server.listen(config.port, () => {
    console.info(`server start on port:${config.port}`);
  });
});
