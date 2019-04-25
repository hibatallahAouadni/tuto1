angular.module("MailServiceRest", [ "ngResource" ])
.factory("mailService", function($resource) {
	console.log("MailServiceRest");
    var URL_API = "http://localhost/api/";

    // var resourceGetMail = $resource(URL_API + "dossiers/:idDossier/:idMail");
    // var resourceSendMail = $resource(URL_API + "envoi");

    var resourceMail = $resource(URL_API + "dossiers", null, {
        "getDossiers": { method: "GET", isArray: true },
        "getDossier": { method: "GET", isArray: false, url: URL_API + "dossiers/:idDossier" },
        "getMail": { method: "GET", isArray: false, url: URL_API + "dossiers/:idDossier/:idMail" },
        "envoiMail": { method: "POST", url: URL_API + "envoi" }
    })
    
    return {
		getDossiers: function() {
            // return resourceGetMail.query();
            return resourceMail.getDossiers();
		},
		getDossier: function(valDossier) {
            // return resourceGetMail.get({ idDossier: valDossier });
            return resourceMail.getDossier({ idDossier: valDossier });
		},
		getMail: function(valDossier, idMail) {
            // return resourceGetMail.get({ idDossier: valDossier, idMail: idMail });
            return resourceMail.getMail({ idDossier: valDossier, idMail: idMail });
		},
		envoiMail: function(mail) {
            // resourceSendMail.save(mail, function(response) {
            resourceMail.envoiMail(mail, function(response) {
                alert("Le mail a bien été envoyé !");
            }, function(response) {
				alert("Erreur " + response.status + " lors de l'envoi de mail : " + response.data);
            });
		}
	}
});