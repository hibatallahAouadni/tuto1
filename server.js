var http = require("http");
var fs = require("fs");

var mime = require("mime-types");

var express = require("express");

// middlewares
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

var PORT = 80;

var app = express();

app.use(logger(":method :url"));
app.use(favicon(__dirname + "/favicon.ico"));
app.use("/tuto1/", serveStatic(__dirname + "/"));

/* API */
var api = express();

// Get the folders list: GET  /api/folders
api.get("/folders", function(req, res) {
    res.send([
        { value: "RECEPTION", label: 'Boite de réception'},
        { value: "ARCHIVES", label: 'Archives'},
        { value: "ENVOYES", label: 'Envoyés'},
        { value: "SPAM", label: 'Courier indésirable'}
    ]);
});

// Get a folder: GET  /api/folders/idFolder
api.get("/folders/:idFolder", function(req, res) {
    res.send([
        { id:1, from: "Albator", to: "Hiba", subject: "Je reviens", date: new Date(2019, 2, 20, 21, 14), content: "Je reviens, <b>Je reviens</b>"},
        { id:2, from: "Loulou", to: "Hiba", subject: "Bisous", date: new Date(2018, 2, 20, 8, 14), content: "Bisous!!!"},
        { id:3, from: "Pikatchu", to: "Hiba", subject: "Pika pika!", date: new Date(2019, 5, 12, 21, 14), content: "Pika pika! Pika pika! Pika pika!"},
        { id:4, from: "Barbapapa", to: "Hiba", subject: "Hulahup", date: new Date(2018, 2, 20, 22, 22), content: "Lorem ipsum dolor sit amet!"}
    ]);
});

// Get an email: GET  /api/folders/idFolder/idMail
api.get("/folders/:idFolder/:idMail", function(req, res) {
    res.send([
        { id:1, from: "Albator", to: "Hiba", subject: "Je reviens", date: new Date(2019, 2, 20, 21, 14), content: "Je reviens, <b>Je reviens</b>"},
    ]);
});

app.use(bodyParser.json());

// Send an email: POST  /api/sendMail
api.post("/sendMail", function(req, res) {
    res.send({ succes: true, email: req.body});
});

app.use("/api", api);


http.createServer(app).listen(PORT);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

console.log("Serveur démarré sur le port " + PORT);