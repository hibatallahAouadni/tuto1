var app = angular.module("Webmail", [ "ngSanitize", "ngRoute" ]);

/* Webmail Controller */
app.controller("WebmailCtrl", function($scope, $location, WebmailFactory/*, $filter*/) {
    $scope.dossiers = WebmailFactory.getDossiers();

    $scope.dossierCourant = null;
    $scope.emailSelectionne = null;

    $scope.versEmail = function(dossier, email) {
        $location.path("/" + dossier.value + "/" + email.id);
    }

    $scope.selectionDossier = function(dossier) {
        $scope.dossierCourant = dossier;
        $scope.emailSelectionne = null;
    }
    
    $scope.selectionEmail = function(email) {
        $scope.emailSelectionne = email;
    }

    /* tri methods */
    $scope.champTri = null;
    $scope.triDescendant = false;
    $scope.triEmails = function(champ) {
        if($scope.champTri == champ) {
            $scope.triDescendant = !$scope.triDescendant;
        } else {
            $scope.champTri = champ;
            $scope.triDescendant = false;
        }
    }
    $scope.cssChevronsTri = function(champ) {
        return { 
            glyphicon: $scope.champTri == champ,
            'glyphicon-chevron-up': $scope.champTri == champ && !$scope.triDescendant,
            'glyphicon-chevron-down': $scope.champTri == champ && $scope.triDescendant 
        };
    }

    /* Search method */
    $scope.query = null;
    $scope.razSearch = function() {
        $scope.query = null;
    }

    /* Filter method --- pas trop efficase car la méthode est appellé multiple fois*/
    /* $scope.getDossiersFilter = function() {
        return $filter("filter")($scope.dossierCourant.emails, $scope.query);
    } */

    $scope.$watch(function() {
        return $location.path();
    }, function(newPath) {
        console.log("newPath: " + newPath);
        var tabPath = newPath.split("/");
        if(tabPath.length > 1) {
            var valDossier = tabPath[1];
            $scope.dossiers.forEach(function(item) {
                if(item.value == valDossier) {
                    $scope.selectionDossier(item);
                }
            });
            if(tabPath.length > 2) {
                var idMail = tabPath[2];
                $scope.dossierCourant.emails.forEach(function(item) {
                    if(item.id == idMail) {
                        $scope.selectionEmail(item);
                    }
                });
            }
        }
    });

});

/* Filter */
app.filter("highlightingSearch", function() {
    return function(input, query) {
        if(query) {
            return input.replace(new RegExp("(" + query + ")", "gi"), "<span class='highlightingSearch'>$1</span>");
        }
        return input;
    }
});

/* Routes config */
app.config(function($routeProvider){
    console.log('coco!');
    $routeProvider
        .when('/', {templateUrl: 'partiels/listEmails.html'})
        .when('/newEmail', {templateUrl: 'partiels/newEmail.html'})
        .otherwise({redirectTo : '/'});
});

/* New Email Controller --notComplete-- */
app.controller("NewEmail", function($scope, WebmailService) {
    $scope.NewEmail = {};

    $scope.addEmail = function() {
        $scope.emails.push($scope.NewEmail);
        WebmailService.add($scope.NewEmail).then(function(){
            console.log('toto');
        }, function() {
            alert("votre email n\'a pas pu envoyé")
        })
        $scope.NewEmail = {};
    }
});

/* Webmail Factory returns the function's return value */
app.factory('WebmailFactory', function() {
    var factory = {
        dossiers: [
            { value: "RECEPTION", label: 'Boite de réception', emails: [
                { id:1, from: "Albator", to: "Hiba", subject: "Je reviens", date: new Date(2019, 2, 20, 21, 14), content: "Je reviens, <b>Je reviens</b>"},
                { id:2, from: "Loulou", to: "Hiba", subject: "Bisous", date: new Date(2018, 2, 20, 8, 14), content: "Bisous!!!"},
                { id:3, from: "Pikatchu", to: "Hiba", subject: "Pika pika!", date: new Date(2019, 5, 12, 21, 14), content: "Pika pika! Pika pika! Pika pika!"},
                { id:4, from: "Barbapapa", to: "Hiba", subject: "Hulahup", date: new Date(2018, 2, 20, 22, 22), content: "Lorem ipsum dolor sit amet!"}
            ]},
            { value: "ARCHIVES", label: 'Archives', emails: [
                { id:5, from: "Candy", to: "Hiba", subject: "Bon anniversaire", date: new Date(2019, 2, 20, 21, 14), content: "Bon anniversaire!!!"},
                { id:6, from: "Hiro", to: "Hiba", subject: "Konichiwa", date: new Date(2018, 7, 18, 20, 20), content: "Lorem ipsum dolor sit amet!"},
                { id:7, from: "Asuka", to: "Hiba", subject: "Ca va chier", date: new Date(2019, 11, 20, 13, 25), content: "Ca va chier, Ca va chier. Ca va chier."}
            ]},
            { value: "ENVOYES", label: 'Envoyés', emails: [
                { id:8, from: "Hiba", to: "Albator", subject: "Bien la famille?", date: new Date(2019, 0, 20, 14, 15), content: "Bien la famille?Bien la famille?Bien la famille?"},
                { id:9, from: "Hiba", to: "Loulou", subject: "Hulahup Konichiwa", date: new Date(2019, 2, 17, 22, 11), content: "Hulahup Konichiwa. Hulahup Konichiwa, Hulahup Konichiwa! Hulahup Konichiwa"}
            ]},
            { value: "SPAM", label: 'Courier indésirable', emails: [
                { id:10, from: "Rue de discount", to: "Hiba", subject: "Envie d'un nouveau frigo?", date: new Date(2019, 2, 20, 7, 14), content: "Envie d'un nouveau frigo?Envie d'un nouveau frigo?"},
                { id:11, from: "Sofinnoga", to: "Hiba", subject: "Besoin d'argent?", date: new Date(2019, 2, 20, 14, 21), content: "Besoin d'argent?Besoin d'argent?Besoin d'argent?"}
            ]},
        ],
        getDossiers: function() {
            return factory.dossiers;
        },
        getDossier: function(id) {
            return factory.dossiers[id];
        },
    }
    return factory;
});

/* Webmail Service returns the actual function */
app.service('WebmailService', function() {
    that = this;
    that.dossiers = [
        { value: "RECEPTION", label: 'Boite de réception', emails: [
            { id:1, from: "Albator", to: "Hiba", subject: "Je reviens", date: "20/03/2019", content: "Je reviens, <b>Je reviens</b>"},
            { id:2, from: "Loulou", to: "Hiba", subject: "Bisous", date: "18/03/2019", content: "Bisous!!!"},
            { id:3, from: "Pikatchu", to: "Hiba", subject: "Pika pika!", date: "15/03/2019", content: "Pika pika! Pika pika! Pika pika!"},
            { id:4, from: "Barbapapa", to: "Hiba", subject: "Hulahup", date: "13/03/2019", content: "Lorem ipsum dolor sit amet!"}
        ]},
        { value: "ARCHIVES", label: 'Archives', emails: [
            { id:5, from: "Candy", to: "Hiba", subject: "Bon anniversaire", date: "20/03/2019", content: "Bon anniversaire!!!"},
            { id:6, from: "Hiro", to: "Hiba", subject: "Konichiwa", date: "18/03/2019", content: "Lorem ipsum dolor sit amet!"},
            { id:7, from: "Asuka", to: "Hiba", subject: "Ca va chier", date: "20/03/2019", content: "Ca va chier, Ca va chier. Ca va chier."}
        ]},
        { value: "ENVOYES", label: 'Envoyés', emails: [
            { id:8, from: "Hiba", to: "Albator", subject: "Bien la famille?", date: "20/03/2019", content: "Bien la famille?Bien la famille?Bien la famille?"},
            { id:9, from: "Hiba", to: "Loulou", subject: "Hulahup Konichiwa", date: "18/03/2019", content: "Hulahup Konichiwa. Hulahup Konichiwa, Hulahup Konichiwa! Hulahup Konichiwa"}
        ]},
        { value: "SPAM", label: 'Courier indésirable', emails: [
            { id:10, from: "Rue de discount", to: "Hiba", subject: "Envie d'un nouveau frigo?", date: "20/03/2019", content: "Envie d'un nouveau frigo?Envie d'un nouveau frigo?"},
            { id:11, from: "Sofinnoga", to: "Hiba", subject: "Besoin d'argent?", date: "18/03/2019", content: "Besoin d'argent?Besoin d'argent?Besoin d'argent?"}
        ]},
    ];
    that.getDossiers = function() {
        return that.dossiers;
    };
    that.getDossier = function(id) {
        return that.dossiers[id];
    };
});