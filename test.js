const Koa = require("koa")
const Router = require("koa-router");
const static = require("koa-static");
const views = require("koa-views");
let app = new Koa();
console.log(Router)
let router = new Router()

app.use(views(__dirname+"/test/views"),{
    extension:"pug"
});
app.use(static(__dirname+"/test/static"));

router.get("/",async function(ctx,next){
    await ctx.render("./index.pug");
})

app.use(router.routes())
app.listen(4444)