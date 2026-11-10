/* =====================================================================
   LE MOTEUR DE VISUAL NOVEL · 1 sur 5 · L'HISTOIRE ET SA MÉMOIRE

   Le moteur est commun à tous les visual novels du site. Il ne contient
   aucun texte d'histoire : il lit ce que les fichiers de l'histoire lui
   déclarent, puis il le joue. Pour écrire, on ne touche pas au moteur.

   Dans ce fichier :
     - les six mots pour écrire une histoire :
         VN.reglages   VN.personnage   VN.lieu   VN.ecran   VN.nuit   VN.scene
     - la mémoire : ce que le joueur a déjà fait, gardé dans le navigateur.

   Les autres fichiers du moteur :
     2-affichage.js   ce qu'on voit : la boîte de dialogue, le sprite, le papier, l'écran noir…
     3-lieux.js       les lieux, leurs objets cliquables, les écrans (les PC)
     4-scenes.js      le lecteur : il joue les scènes étape par étape et enchaîne les nuits
     5-atelier.js     l'aide pour écrire : vérifie l'histoire, mode atelier (#atelier)

   Le mode d'emploi est dans LISEZ-MOI.md, dans le dossier du dessus.
===================================================================== */

const VN = {

    // Les réglages. L'histoire change ceux qu'elle veut avec VN.reglages({ … }).
    config: {
        titre: "",                // le titre de l'onglet du navigateur
        sauvegarde: "histoire",   // le nom sous lequel le navigateur garde la progression
        heroine: "",              // le personnage qui parle quand une réplique ne dit pas qui parle
        taille: [1366, 768],      // la taille des images des lieux, en pixels (sert à placer les zones)
        musique: "",              // la musique de fond (un fichier .mp3), ou rien
        volume: 0.25,             // de 0 (muet) à 1 (à fond)
        entrer: "ENTER",          // le texte de l'écran d'accueil
        fin: "FIN",               // le texte de l'écran de fin
        compteur: null,           // facultatif : (m) => "le texte à afficher en haut de l'écran"

        // les petits textes de l'interface
        textes: {
            suite: "suite",
            reposer: "cliquer pour reposer",
            recommencer: "recommencer",
            changerEcran: "⇄ changer d'écran",
            eteindre: "⏻ éteindre"
        }
    },

    // Ce que l'histoire a déclaré, rangé par nom.
    personnages: {},
    lieux: {},
    ecrans: {},
    scenes: {},
    nuits: [],

    // Ce que le joueur a fait. Voir « LA MÉMOIRE », plus bas.
    memoire: { vues: {} },

    // Les erreurs trouvées dans l'histoire (affichées par 5-atelier.js).
    problemes: []
};

// Les pages affichées sur un écran (un PC) retrouvent l'histoire par ce nom-là : voir pont.js.
window.VN = VN;


/* =========================
   LES SIX MOTS POUR ÉCRIRE UNE HISTOIRE
   Chacun range ce qu'on lui donne dans le bon tiroir ; rien ne se joue encore.
   Le détail de ce qu'on peut mettre dans chaque fiche est dans LISEZ-MOI.md.
========================= */

// Les réglages de l'histoire : titre, musique, nom de la sauvegarde…
VN.reglages = function (reglages) {
    // les petits textes se changent un par un : ceux qu'on ne donne pas gardent leur valeur
    const textes = Object.assign({}, VN.config.textes, reglages.textes);
    Object.assign(VN.config, reglages, { textes });
};

// Un personnage : son portrait (la petite image de la boîte de dialogue)
// et ses sprites (les grandes images, une par humeur).
VN.personnage = function (nom, fiche) {
    ranger(VN.personnages, "Le personnage", nom, fiche || {});
};

// Un lieu : son image, ses objets cliquables, les lieux voisins.
VN.lieu = function (nom, fiche) {
    ranger(VN.lieux, "Le lieu", nom, fiche);
};

// Un écran : une page du site affichée en grand (un PC, un téléphone…).
VN.ecran = function (nom, fiche) {
    ranger(VN.ecrans, "L'écran", nom, fiche);
};

// Une scène : ce qui se dit et ce qui se passe. Voir 4-scenes.js.
VN.scene = function (nom, contenu) {
    ranger(VN.scenes, "La scène", nom, contenu);
};

// Une nuit : un chapitre de l'histoire. Elles se jouent dans l'ordre de leur numéro.
VN.nuit = function (numero, fiche) {
    fiche = fiche || {};
    fiche.numero = numero;
    if (VN.nuits.some((nuit) => nuit.numero === numero)) {
        VN.probleme(`La nuit ${numero} est déclarée deux fois.`);
    }
    VN.nuits.push(fiche);
    VN.nuits.sort((a, b) => a.numero - b.numero);
};

function ranger(tiroir, quoi, nom, fiche) {
    if (tiroir[nom]) {
        VN.probleme(`${quoi} « ${nom} » est déclaré deux fois : le deuxième remplace le premier.`);
    }
    tiroir[nom] = fiche;
}


/* =========================
   LA MÉMOIRE
   Un simple objet : VN.memoire. L'histoire y note ce qu'elle veut retenir,
   sous le nom qu'elle veut :  { note: "chatVu" }  →  VN.memoire.chatVu vaut true.

   Le moteur y garde aussi ses propres notes. Ces noms-là sont réservés :
     nuit     le numéro de la nuit en cours
     lieu     le lieu où l'on est
     vues     combien de fois chaque scène a été jouée : { chaise: 2, chat: 1 }
     debuts   les nuits dont la scène de début a déjà été jouée
     fini     vrai quand l'histoire est terminée

   La mémoire est gardée dans le navigateur (localStorage) : elle reste
   quand on ferme la page.
========================= */

function cleDeSauvegarde() {
    return "vn-" + VN.config.sauvegarde;
}

VN.charger = function () {
    let gardee = null;
    try {
        gardee = JSON.parse(localStorage.getItem(cleDeSauvegarde()));
    } catch (e) {
        // sauvegarde illisible ou navigation privée : on repart de zéro
    }
    VN.memoire = gardee || {};
    VN.memoire.vues = VN.memoire.vues || {};
};

VN.sauver = function () {
    try {
        localStorage.setItem(cleDeSauvegarde(), JSON.stringify(VN.memoire));
    } catch (e) {
        // navigation privée : la progression ne sera simplement pas gardée
    }
    // ce qui est affiché peut dépendre de la mémoire (un objet qui apparaît, le compteur…)
    if (VN.rafraichir) VN.rafraichir();
};

// VN.note("chatVu")  ou  VN.note("humeur", "sombre")
VN.note = function (nom, valeur = true) {
    VN.memoire[nom] = valeur;
    VN.sauver();
};

// VN.ajoute("rats") : compte 1, puis 2, puis 3…
VN.ajoute = function (nom, combien = 1) {
    VN.memoire[nom] = (VN.memoire[nom] || 0) + combien;
    VN.sauver();
};

VN.oublie = function (nom) {
    delete VN.memoire[nom];
    VN.sauver();
};

VN.sait = function (nom) {
    return VN.memoire[nom];
};

// efface toute la progression
VN.toutOublier = function () {
    try {
        localStorage.removeItem(cleDeSauvegarde());
    } catch (e) {}
    VN.memoire = { vues: {} };
};


/* =========================
   LES CONDITIONS
   Partout où l'histoire écrit « si » ou « finQuand », elle peut donner :
     "chatVu"                  vrai si chatVu est noté
     "!chatVu"                 vrai si chatVu n'est PAS noté
     ["chatVu", "!taie"]       vrai si tout est vrai en même temps
     (m) => m.rats >= 2        une vraie formule, pour compter ou comparer (m, c'est la mémoire)
========================= */

VN.estVrai = function (condition) {

    if (condition === undefined || condition === null) return true;

    if (typeof condition === "function") return Boolean(condition(VN.memoire));

    if (Array.isArray(condition)) return condition.every(VN.estVrai);

    if (typeof condition === "string" && condition.startsWith("!")) {
        return !VN.memoire[condition.slice(1).trim()];
    }

    return Boolean(VN.memoire[condition]);
};


/* =========================
   LES PROBLÈMES
   Quand l'histoire contient une erreur (une scène qui n'existe pas, une virgule
   oubliée…), le moteur le dit en français au lieu de se taire.
   Le message s'affiche dans la console du navigateur (F12), et à l'écran quand
   on travaille sur son ordinateur ou en mode atelier (voir 5-atelier.js).
========================= */

VN.probleme = function (message) {
    if (VN.problemes.includes(message)) return;
    VN.problemes.push(message);
    console.error("[visual novel] " + message);
    if (VN.montrerProblemes) VN.montrerProblemes();
};

// une erreur d'écriture dans un fichier (souvent une virgule ou un guillemet oublié)
window.addEventListener("error", (e) => {
    if (!e.filename) return;
    const fichier = e.filename.split("/").slice(-2).join("/");
    VN.fichierIllisible = true;
    VN.probleme(
        `Erreur dans ${fichier}, ligne ${e.lineno} : ${e.message}. ` +
        `Regarde cette ligne et celle d'avant : c'est souvent une virgule, un guillemet ou un crochet oublié. ` +
        `Tant que l'erreur est là, tout ce fichier est ignoré.`
    );
});

// un petit outil utilisé partout : attendre un moment (en millisecondes)
VN.attendre = function (duree) {
    return new Promise((ok) => setTimeout(ok, VN.passeVite ? Math.min(duree, 50) : duree));
};
