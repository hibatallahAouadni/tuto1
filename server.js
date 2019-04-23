var http = require("http");
var fs = require("fs");

var mime = require("mime-types");

var express = require("express");

var serviceMails = require(__dirname + "/get-mails.js");

// middlewares
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

var PORT = 80;

serviceMails.genererMails();

var app = express();

app.use(logger(":method :url"));
app.use(favicon(__dirname + "/favicon.ico"));
app.use("/tuto1/", serveStatic(__dirname + "/"));

/* API */
var api = express();

// Get the folders list: GET  /api/folders
api.get("/folders", serviceMails.getFolders);

// Get a folder: GET  /api/folders/idFolder
api.get("/folders/:idFolder", serviceMails.getFolder);

// Get an email: GET  /api/folders/idFolder/idMail
api.get("/folders/:idFolder/:idMail", serviceMails.getMail);

app.use(bodyParser.json());

// Send an email: POST  /api/sendMail
api.post("/sendMail", serviceMails.sendMail);

app.use("/api", api);


http.createServer(app).listen(PORT);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

console.log("Serveur démarré sur le port " + PORT);