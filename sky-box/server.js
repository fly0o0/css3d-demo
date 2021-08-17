const Koa = require("koa")
const c2k = require("koa-connect");
const internalIp = require("internal-ip");
const Router = require("koa-router");
const koaStatic = require("koa-static");
const path = require("path");

const router = new Router();
const app = new Koa();

const getHost = function () {
  let localIp = internalIp.v4.sync();
  return localIp;
};

const getPort = function () {
  return 8888;
};

const devServer = async () => {
  app.use(koaStatic(path.resolve(__dirname, "./")));
  app.use(router.routes());
  app.use(
    c2k((req, res, next) => {
      res.statusCode = 200;
      res.setHeader("content-type", "application/html");
      next();
    })
  );

  app.listen(getPort());

  let url = `http://${getHost()}:${getPort()}`;
  console.log(url);
};

devServer();
