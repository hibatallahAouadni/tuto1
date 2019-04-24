angular.module("MailServiceHttp", [])
.factory("mailService", function($http) {
	console.log("MailServiceHttp");
	var URL_API = "http://localhost/api/";

	return {
		getDossiers: function() {
			var promesse = $http.get(URL_API + "dossiers");
			var result = [];

			promesse.then(function(response) {
				angular.extend(result, response.data);
			}, function(error) {
				alert("Erreur " + error.status + " dans la récupération des dossiers: " + error.data);
			});

			return result;
		},
		getDossier: function(valDossier) {
			var promesse = $http.get(URL_API + "dossiers/" + valDossier);
			var result = [];
			
			promesse.then(function(response) {
				angular.extend(result, response.data);
			}, function(error) {
				alert("Erreur " + error.status + " dans la récupération d'un dossier: " + error.data);
			});

			return result;
		},
		getMail: function(valDossier, idMail) {
			var promesse = $http.get(URL_API + "dossiers/" + valDossier + "/" + idMail);
			var result = {};
			
			promesse.then(function(reponse) {
				angular.extend(result, reponse.data);
			}, function(error) {
				alert("Erreur " + error.status + " lors de la récupération du mail " + idMail + " dans le dossier " + valDossier + " : " + error.data);
			});

			return result;
		},
		envoiMail: function(mail) {
			var promesse = $http.post(URL_API + "envoi", mail);

			promesse.error(function(error) {
				alert("Erreur " + error.status + " lors de l'envoi de mail : " + error.data);
			});
		}
	}
})