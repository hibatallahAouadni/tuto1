var http = require("http");
var fs = require("fs");

var mime = require("mime-types");

var connect = require("connect");

// middlewares
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");

var PORT = 80;

/* var sendFile = function(res, url) {

    console.log("send file: " + url);

    var path = __dirname + "/" + url;
    fs.stat(path, function(err, stats) {
        if(!err && stats.isFile()) {

            var flux = fs.createReadStream(path, {
                flags: "r",
                autoClose: true
            });

            var typeMime = mime.lookup(path);

            res.writeHead(200, {"Content-Type": typeMime});
            flux.pipe(res);

        } else {
            send404(res);
        }
    });

} */

/* var send404 = function(res) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("<h2>ERROR 404!!! <br>Page not found</h2>");
} */

var app = connect();

app.use(logger(":method :url"));
app.use(favicon(__dirname + "/favicon.ico"));
app.use("/tuto1/", serveStatic(__dirname + "/"));

/* app.use(function(req, res, next) {
    if(req.url == "/") {
        res.writeHead(301, { "Location": "/index.html"});
        res.end();
    } else {
        next();
    }
});

app.use(function(req, res) {
    sendFile(res, req.url);
}); */

http.createServer(app).listen(PORT);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

console.log("Serveur démarré sur le port " + PORT);