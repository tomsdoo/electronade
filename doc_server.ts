import Koa from "koa";
// @ts-expect-error
import Router from "koa-router";
// @ts-expect-error
import serve from "koa-static-server";
import * as path from "path";
import * as fs from "fs";

const app = new Koa();
const router = new Router();

(async () => {
  ///

  const port = Number(process.env.PORT ?? 3000);

  async function indexhtml(ctx: Koa.Context): Promise<any> {
    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.response.body = await fs.promises.readFile(
      path.join(__dirname, "./docs/index.html"),
      "utf8"
    );
  }

  router.get("/", indexhtml);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(
    serve({
      rootDir: path.join(__dirname, "./docs"),
    })
  );

  app.listen(port, () => {
    console.log(`listening ${port}`);
  });

  ///
})()
  .then(() => {})
  .catch(() => {});
