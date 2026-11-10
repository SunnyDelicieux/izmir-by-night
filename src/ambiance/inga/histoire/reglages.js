/* =====================================================================
   INGA · LES RÉGLAGES ET LES PERSONNAGES

   L'histoire d'Inga est rangée dans ce dossier :
     reglages.js   ce fichier : le titre, la musique, les personnages
     lieux.js      l'appartement (les deux vues) et les deux PC
     nuit-1.js     la première nuit : le chat, les PC, la lettre
     nuit-2.js     la nuit suivante : le réveil, l'appel de Zacharias, la sortie
     nuit-3.js     une troisième nuit, proposée mais pas encore branchée

   Le moteur qui joue tout ça est dans /ambiance/vn/ : on n'y touche pas pour écrire.
   Le mode d'emploi : /ambiance/vn/LISEZ-MOI.md
===================================================================== */

VN.reglages({

    titre: "Inga",

    // le nom de la sauvegarde dans le navigateur (à changer pour chaque nouvelle histoire)
    sauvegarde: "inga",

    // celle qui parle quand une réplique ne dit pas qui parle
    heroine: "Inga",

    // la taille des images de l'appartement, en pixels
    taille: [1366, 768],

    musique: "bg.mp3",
    volume: 0.25,

    entrer: "ENTER",
    fin: "FIN — pour l'instant.",

    // le petit texte en haut de l'écran : « rats : 1 / 2 », tant qu'Inga a des rats
    // et que le chat n'a pas mangé (un texte vide "" le cache)
    compteur: (m) => (m.rats && !m.chatSorti ? `rats : ${m.rats} / 2` : ""),

    textes: {
        reposer: "cliquer pour reposer la lettre",
        changerEcran: "⇄ changer de PC"
    }
});


/* =========================
   LES PERSONNAGES
     portrait : la petite image dans la boîte de dialogue
     sprites  : les grandes images, une par humeur. « base » est celle par défaut ;
                les autres se demandent dans une réplique : "(degoutee) Beurk."
========================= */

VN.personnage("Inga", {
    portrait: "https://i.postimg.cc/Zn8ZdS2Q/image-2026-09-03-100531968.png",
    sprites: {
        base: "inga-base.webp",
        degoutee: "inga-degoutee.webp"   // dégoûtée ou surprise
    }
});

// Zacharias n'a pas de sprite : quand il parle (au téléphone), Inga reste à l'écran,
// et c'est son portrait à lui qui s'affiche dans la boîte.
VN.personnage("Zacharias", {
    portrait: "/img/wiki/tremere/zacharias.png"
});
