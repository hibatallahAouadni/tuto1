var Imap = require("browserbox");
var propertiesReader = require("properties-reader");

var props = propertiesReader(__dirname + "/.properties");

var imap = new Imap(props.get("imap.host"), props.get("imap.port"), {
    auth: {
        user: props.get("imap.user"),
        pass: props.get("imap.password")
    },
    useSecureTransport: props.get("imap.secure")
});

imap.onauth = function() {
    console.log("Authentification réussie!!!");
};

imap.onerror = function(error) {
    console.log("Erreur: " + error);
};

imap.onclose = function() {
    console.log("Fin de la connexion");
};

imap.onupdate = function(type, value) {
    console.log("");
};

imap.connect();
