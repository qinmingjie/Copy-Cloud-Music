let http = require("http")
let fs = require("fs");
let url = require("url");
let path = require("path");
let server = http.createServer(function(req,res){
    let newurl = url.parse(req.url).pathname;
    let pageIndex = url.parse(req.url,true).query;
    let icon = path.extname(newurl);
    console.log(newurl)
    let txt = fs.readFileSync("./index.html").toString();
    let mime = JSON.parse(fs.readFileSync("./mime.json").toString());
    if(newurl == "/" || newurl == "/index"){
        res.writeHead(200,{"content-type":"text/html;charest=utf-8"});
        res.end(txt)
    }else if(newurl == "/favicon.ico"){
        res.end()
    }else{
        res.writeHead(200,{"content-type":`${mime[icon]}`});
        let resdata = fs.readFileSync("./" + newurl);
        res.end(resdata)
    }
})
server.listen(8889)