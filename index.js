const Koa = require("koa");
const Router = require("koa-router")
const static = require("koa-static")
const views = require("koa-views")
// const pug = require("pug");

let app = new Koa()
let router = new Router()

app.use(views(__dirname + "/views"),{map:{html:"pug"}});
app.use(static(__dirname + "/static"));

router.get("/",async function(ctx,next){
    await ctx.render("index.pug");
});
app.use(router.routes())
app.listen(8887)