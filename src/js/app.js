var app = angular.module("Webmail", [ "ngSanitize", "ngRoute", "ui.tinymce", "MailServiceHttp", "MyFilters", "MyDirectives" ]);

/* Webmail Controller */
app.controller("WebmailCtrl", function($scope, $location, mailService) {
    $scope.dossiers = mailService.getDossiers();

    $scope.dossierCourant = null;
    $scope.emailSelectionne = null;

    $scope.versEmail = function(dossier, email) {
        $location.path("/" + dossier.value + "/" + email.id);
    }

    $scope.selectionDossier = function(valDossier) {
        $scope.dossierCourant = mailService.getDossier(valDossier);
        $scope.emailSelectionne = null;
    }
    
    $scope.selectionEmail = function(valDossier, idMail) {
        $scope.emailSelectionne = mailService.getMail(valDossier, idMail);
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

    /* Create emails */
    
    $scope.displayNewMail = false;
    
    $scope.envoiMail = function (newEmail) {
        mailService.envoiMail(newEmail);
        $location.path("/");
    }


    /* navigation */
    $scope.$watch(function() {
        return $location.path();
    }, function(newPath) {
        var tabPath = newPath.split("/");
        if(tabPath.length > 1) {
            if(tabPath[1] == "newEmail") {
                $scope.displayNewMail = true;
                $scope.selectionDossier(null);
            } else {
                var valDossier = tabPath[1];
                if(valDossier) {
                    $scope.selectionDossier(valDossier);
                }
                if(tabPath.length > 2) {
                    var idMail = tabPath[2];
                    if(idMail) {
                        $scope.selectionEmail(valDossier, idMail);
                    }
                }
            }
        }
    });

});

/* Routes config */
app.config(['$routeProvider', function($routeProvider){
    console.log('routeProvider');
    $routeProvider
        .when('/', {templateUrl: 'partiels/listEmails.html'})
        .when('/newEmail', {templateUrl: 'partiels/newEmail.html'})
        .otherwise({redirectTo : '/'});
}]);