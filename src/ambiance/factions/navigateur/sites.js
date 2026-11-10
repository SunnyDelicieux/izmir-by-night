/* =========================
   LES SITES « VIEUX WEB » D'IZMIR, visibles dans le navigateur d'Inga

   Ces sites sont de vraies pages HTML, rangées dans /ambiance/web/ (un dossier par site).
   Une fiche ici suffit pour qu'un site existe dans le navigateur : on peut alors taper
   son adresse, suivre un lien vers lui, ou le trouver avec Google.

     titre    le titre de l'onglet
     page     où est la vraie page
     mots     facultatif : les mots qui le font sortir dans une recherche Google (en minuscules)
     extrait  facultatif : le texte affiché sous le résultat

   Pour qu'un site apparaisse aussi sur la page « Nouvel onglet » ou dans l'historique d'Inga,
   ajouter son adresse dans historique.js (Nav.plusVisites, Nav.historique).
========================= */

Nav.site("izmirweb.net", {
    titre: "IZMIR.WEB - l'annuaire des sites d'Izmir",
    page: "/ambiance/web/",
    mots: ["annuaire", "izmir", "sites"],
    extrait: "L'annuaire des sites de la ville. 100 % gratuit, mis à jour quand on y pense."
});

Nav.site("carat-izmir.com.tr", {
    titre: "CAR'AT ~ Garage ~ Voitures de luxe et de collection",
    page: "/ambiance/web/carat/",
    mots: ["garage", "voiture", "car'at", "carat", "portière", "plaque"],
    extrait: "Bienvenue à Car'at ! Entretien, portières, cuirs, plaques. Ouvert tard sur rendez-vous. Discrétion assurée."
});

Nav.site("devourme-video.com", {
    titre: "DEVOUR ME vidéo ~ cassettes et DVD par correspondance",
    page: "/ambiance/web/devourme/",
    mots: ["cassette", "vhs", "dvd", "devour", "vidéo", "video", "film"],
    extrait: "Des films à petit budget dont on oublie le titre. Envoi discret, sous enveloppe kraft."
});

Nav.site("minuitmoinsune.tv", {
    titre: "MINUIT MOINS UNE ~ le talk-show de la nuit, avec Max",
    page: "/ambiance/web/max/",
    mots: ["minuit", "max", "talk", "émission", "emission", "actualité", "actualite", "news", "info"],
    extrait: "Tous les soirs, une minute avant minuit. Les invités, les titres de la nuit, les rediffusions."
});

Nav.site("mysteres-de-smyrne.izmirweb.net", {
    titre: "~*~ Les Mystères de Smyrne ~*~",
    page: "/ambiance/web/occulte/",
    mots: ["mystère", "mystere", "occulte", "légende", "legende", "rituel", "smyrne", "chant"],
    extrait: "Ce que la ville ne vous dit pas. Légendes, témoignages et phénomènes inexpliqués du golfe."
});
