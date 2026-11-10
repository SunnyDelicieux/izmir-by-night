/* =====================================================================
   INGA · LES LIEUX ET LES ÉCRANS

   L'appartement a deux vues : « entree » (la porte, la fenêtre, le chat)
   et « bureau » (les ordinateurs, le tas, les oreillers).

   Un lieu :
     image    l'image de fond
     voisins  les flèches : de quel côté on va où
     objets   ce qu'on peut cliquer. Pour chacun :
                zone   x1, y1, x2, y2 en pixels de l'image (coin haut-gauche, coin bas-droit)
                scene  la scène jouée quand on clique (elles sont dans nuit-1.js, nuit-2.js…)
                ecran  ou bien : l'écran à allumer
              Si deux zones se chevauchent, la dernière de la liste passe au-dessus.

   Pour trouver les nombres d'une zone : ouvrir /ambiance/inga/#atelier,
   puis Maj + glisser sur l'image. La zone à recopier s'écrit en bas à droite.
===================================================================== */

VN.lieu("entree", {
    image: "1.png",
    voisins: { droite: "bureau" },
    objets: {
        chaise:  { zone: [361, 159, 456, 262],   scene: "chaise" },
        fenetre: { zone: [712, 14, 805, 126],    scene: "fenetre" },
        chat:    { zone: [1020, 510, 1126, 594], scene: "chat" },
        poster:  { zone: [1216, 15, 1322, 178],  scene: "poster" }
    }
});

VN.lieu("bureau", {
    image: "2.png",
    voisins: { gauche: "entree" },
    objets: {
        papiers:      { zone: [1068, 33, 1336, 291],  scene: "travail" },
        pc2:          { zone: [682, 193, 842, 340],   ecran: "pc2" },
        pc1:          { zone: [439, 176, 582, 279],   ecran: "pc1" },
        papiersDuBas: { zone: [46, 399, 208, 681],    scene: "travail" },
        archivage:    { zone: [998, 30, 1094, 131],   scene: "archivage" },
        oreillers:    { zone: [1047, 552, 1201, 700], scene: "oreillers" },
        tas:          { zone: [1257, 282, 1341, 414], scene: "tas" }
    }
});


/* =========================
   LES ÉCRANS : les deux PC d'Inga
     titre        le texte de l'onglet
     page         la page affichée (elles sont dans /ambiance/factions/)
     enEteignant  la scène jouée quand on éteint : ce qu'Inga dit du PC qu'elle vient de regarder

   Ces pages parlent à l'histoire avec /ambiance/vn/pont.js : par exemple, ouvrir le dossier
   Anarch sur le PC 1 fait jouer la scène « anarch ».
========================= */

VN.ecran("pc1", {
    titre: "PC 1 · bureau",
    page: "/ambiance/factions/",
    enEteignant: "pc1"
});

VN.ecran("pc2", {
    titre: "PC 2 · ???",
    page: "/ambiance/factions/terminal.html",
    enEteignant: "pc2"
});
