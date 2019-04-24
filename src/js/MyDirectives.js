angular.module("MyDirectives", [])
.directive("mailContent", function() {
    return {
        restrict: "E",
        template: '<div class="well"> \
            <h1>{{emailSelectionne.subject}}</h1> \
            <p><label>De: <span>{{emailSelectionne.from}}</span></label></p> \
            <p><label>&Agrave;: <span>{{emailSelectionne.to}}</span></label></p> \
            <p><label>Date: <span>{{emailSelectionne.date | date:\'dd/MM/yyyy HH:mm\'}}</span></label></p> \
        </div> \
        <p ng-bind-html="emailSelectionne.content"></p>',
        scope: {
            emailSelectionne: "=email"
        }
    };
})
.directive("newMail", function() {
    return {
        restrict: "E",
        template: '<form id="formNewEmail" class="spacer" name="$parent.formNewEmail"> \
            <div class="form-group"> \
            <label for="email">destinataires</label> \
            <input type="email" class="form-control" id="email" placeholder="à" ng-model="newEmail.to" required> \
            </div> \
            <div class="form-group"> \
                <label for="objet">objet</label> \
                <input type="text" class="form-control" id="objet" placeholder="objet" ng-model="newEmail.subject"> \
            </div> \
            <div class="form-group"> \
                <label for="message">message</label> \
                <textarea ui-tinymce="optionsTinyMce" class="form-control" id="message" rows="5" ng-model="newEmail.content"></textarea> \
            </div> \
            <div class="spacer"> \
            <pre>{{newEmail | json}}</pre> \
            </div> \
            <div class="spacer text-center"> \
                <button type="submit" class="btn btn-success" ng-click="clickSendMail()">Envoyer</button> \
                <span class="hspacer"></span> \
                <button class="btn btn-warning" ng-disabled="formNewEmail.$pristine" ng-click="razMail()">Effacer la saisie</button> \
            </div> \
        </form>',
        scope: {
            envoiMail: "&"
        },
        controller: function($scope) {
            /* tinyMCE */
            $scope.optionsTinyMce = {
                language: "fr_FR",
                statusbar: false,
                menubar: false
            };
            /* RAZ Mail */
            $scope.newEmail = null;
            $scope.razMail = function() {
                $scope.newEmail = {
                    from: "Hiba",
                    date: new Date()
                };
                if(tinyMCE.activeEditor) {
                    tinyMCE.activeEditor.setContent("");
                    console.log("setContent");
                }
                if($scope.formNewEmail) {
                    $scope.formNewEmail.$setPristine();
                    console.log("setPristine");
                }
            };

            $scope.razMail();
            
            /* SendMail */
            $scope.clickSendMail = function() {
                var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,4}$", "gi");
                console.log("clickSendMail");

                if(!$scope.newEmail.to || !$scope.newEmail.to.match(regExpValidEmail)) {
                    window.alert("Erreur \n\nMerci de vérifier l'adresse e-mail saisie.");
                    return;
                }

                if(!$scope.newEmail.subject) {
                    if( !window.confirm("Confirmation\n\nEtes-vous certain de vouloir envoyer un mail sans objet?")) {
                        return;
                    }
                }

                $scope.envoiMail({newEmail: $scope.newEmail});
            };
        }
    };
});