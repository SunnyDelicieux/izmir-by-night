/* =====================================================================
   UN VISUAL NOVEL À COPIER

   Le plus petit visual novel possible qui utilise toutes les mécaniques :
   deux lieux, des objets, la mémoire, un choix, une lettre, deux nuits.

   POUR COMMENCER UNE NOUVELLE HISTOIRE
     1. copier ce dossier « modele » et lui donner un nom : /ambiance/mon-histoire/
     2. dans les réglages ci-dessous, changer « sauvegarde » (sinon deux histoires
        partageraient la même progression)
     3. remplacer les lieux, les personnages et les scènes par les siens
     4. ouvrir /ambiance/mon-histoire/#atelier pour tester

   Le mode d'emploi complet : /ambiance/vn/LISEZ-MOI.md
===================================================================== */

VN.reglages({
    titre: "Mon visual novel",
    sauvegarde: "modele",      // À CHANGER : un nom par histoire
    heroine: "Elle",           // celle qui parle quand une réplique ne dit pas qui parle
    taille: [1366, 768],       // la taille des images des lieux, en pixels
    musique: "",               // "musique.mp3", ou rien
    entrer: "ENTRER",
    fin: "FIN"
});


/* =========================
   LES PERSONNAGES
   Sans image, seul le nom s'affiche. Avec des images :
     VN.personnage("Elle", {
         portrait: "elle-portrait.png",
         sprites: { base: "elle.png", surprise: "elle-surprise.png" }
     });
========================= */

VN.personnage("Elle");
VN.personnage("La voix");


/* =========================
   LES LIEUX
   Ici ils n'ont pas d'image : ajouter  image: "salon.png"  à chacun.
   Les zones se mesurent en mode atelier : Maj + glisser sur l'image.
========================= */

VN.lieu("salon", {
    voisins: { droite: "couloir" },
    objets: {
        fauteuil: { zone: [200, 380, 480, 680], scene: "fauteuil" },
        lettre:   { zone: [700, 300, 860, 420], scene: "lettre" }
    }
});

VN.lieu("couloir", {
    voisins: { gauche: "salon" },
    objets: {
        porte:     { zone: [560, 120, 800, 700], scene: "porte" },
        // « si » sur un objet : il n'apparaît que quand la condition est vraie
        telephone: { zone: [1000, 400, 1120, 520], scene: "telephone", si: "lettreLue" }
    }
});


/* =========================
   LA NUIT 1
   Elle se termine quand « appelFait » est noté ; la scène « coucher » se joue,
   puis la nuit 2 commence.
========================= */

VN.nuit(1, {
    lieu: "salon",
    debut: "arrivee",
    finQuand: "appelFait",
    fin: "coucher"
});

// une scène simple : une liste d'étapes, jouée de haut en bas
VN.scene("arrivee", [
    "* La maison est silencieuse.",
    "Bon. Me voilà.",
    "Autant faire le tour."
]);

// un objet qu'on peut recliquer : « premiere » la première fois, puis une réplique de « ensuite » à chaque clic
VN.scene("fauteuil", {
    premiere: [
        "Un vieux fauteuil.",
        "Il a encore la forme de quelqu'un."
    ],
    ensuite: [
        "Je ne m'assois pas.",
        "Pas ce soir."
    ]
});

// un papier à lire, et la mémoire : { note: "…" } retient que c'est fait
VN.scene("lettre", [
    "Une lettre, posée là.",
    { papier: `Si tu lis ceci, c'est que tu es revenue.

Le téléphone est dans le couloir.
Appelle.` },
    { note: "lettreLue" },
    "… Le téléphone."
]);

// un aiguillage : la première condition vraie gagne
VN.scene("porte", [
    { si: "!lettreLue", va: "porteFermee" },
    "Je pourrais partir.",
    "Mais pas avant d'avoir appelé."
]);

VN.scene("porteFermee", {
    premiere: ["Fermée à clé. De l'intérieur."],
    ensuite: ["Toujours fermée."]
});

// un choix : chaque texte mène à une liste d'étapes, ou au nom d'une autre scène
VN.scene("telephone", [
    "* Une tonalité. Puis quelqu'un décroche.",
    "La voix : Tu as mis le temps.",
    { choix: {
        "S'excuser": [
            "Pardon. Je ne savais pas si je devais.",
            "La voix : Tu devais.",
            { note: "polie" }
        ],
        "Raccrocher": "raccrocher"
    } },
    { note: "appelFait" }
]);

VN.scene("raccrocher", [
    "* Elle repose le combiné.",
    "Non. Pas encore."
]);

VN.scene("coucher", [
    "* Dehors, le ciel pâlit.",
    "Demain."
]);


/* =========================
   LA NUIT 2
   Une nuit qui se déroule toute seule : sa scène de début finit par { nuit: "suivante" }.
   Comme il n'y a pas de nuit 3, c'est l'écran de fin.
========================= */

VN.nuit(2, {
    titre: "Le lendemain soir.",
    lieu: "couloir",
    debut: "depart"
});

VN.scene("depart", [
    { voile: true },
    { si: "polie", alors: ["La voix avait raison. Je devais."], sinon: ["Je rappellerai. Un jour."] },
    "* Elle ouvre la porte.",
    { nuit: "suivante" }
]);
