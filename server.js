var http = require("http");
var PORT = 80;

http.createServer(function(req, res) {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);

    var tabMatch = new RegExp("^/hello/(.*)/?$", "gi").exec(req.url);
    if(tabMatch) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hello<h1> <h2>" + tabMatch[1] +" !!!<h2>");
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hello<h1> <h2>toto !!!<h2>");
    }
}).listen(PORT);

console.log("Serveur démarré sur le port " + PORT);