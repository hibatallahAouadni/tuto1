angular.module("MailServiceMock", [])
.factory("mailService", function() {

    var dossiers = [
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
    ];

    return {
        getDossiers: function() {
            return dossiers;
        },
        getDossier: function(valDossier) {
            for(var i = 0; i < dossiers.length; i++) {
                if(dossiers[i].value == valDossier) {
                    return dossiers[i];
                }
            }
            return null;
        },
        getMail: function(valDossier, idMail) {
            var dossier = this.getDossier(valDossier);
            if(dossier) {
                for(var i = 0; i < dossier.emails.length; i++) {
                    var email = dossier.emails[i];
                    if(email.id == idMail) {
                        return email;
                    }
                }
            }
            return null;
        },
        envoiMail: function(mail) {
            var eltsSend = this.getDossier("ENVOYES");
            var lastIdMail = 0;
            eltsSend.emails.forEach(function(email) {
                if(lastIdMail < email.id) {
                    lastIdMail = email.id;
                }
            });
            mail.id = lastIdMail++;
            eltsSend.emails.push(mail);
        }
    }
})