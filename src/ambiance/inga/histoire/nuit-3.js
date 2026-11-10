/* =====================================================================
   INGA · NUIT 3 · UNE PROPOSITION (pas encore branchée)

   Ce fichier n'est pas chargé : tant que sa ligne reste en commentaire dans index.html,
   l'histoire s'arrête après la nuit 2, comme avant. Pour l'essayer, enlever les flèches
   de commentaire autour de  <script src="histoire/nuit-3.js"></script>  dans index.html.

   TOUS LES TEXTES D'ICI SONT DES BROUILLONS À RÉÉCRIRE. Ils ne reprennent que ce qui existe
   déjà sur le site (la fiche d'Inga, le blog anarch, le portail du Sabbat, vermine.exe,
   le fil du port sur ege-chan), sauf quatre inventions à valider ou à jeter :
   la page de manuscrit, la lettre de DeadDogs, « le Conseil m'attend » et les trois nuits dehors.

   À quoi sert cette nuit : montrer comment chaque sujet du visual novel trouve sa place
   sans nouvelle image, en rebranchant les objets de l'appartement (voir « objets » ci-dessous).

     les autres sectes ......... les papiers : le dossier pour le Conseil, avec un choix
                                 (Anarchs, Sabbat, Setites : ce qu'Inga a tiré de ses blogs)
     la mémoire arménienne ..... la chaise : le carton des manuscrits de son père (un papier à lire)
     les hackers, la censure ... la porte : une lettre de DeadDogs (un papier à lire)
     sa vie ..................... la cachette du chat, vide

   La nuit se termine quand les trois chemises du dossier sont relues, la page de manuscrit
   lue et la lettre trouvée.
===================================================================== */

VN.nuit(3, {

    titre: "Trois nuits plus tard.",
    lieu: "entree",
    debut: "retour",

    // Ce que les objets font de différent cette nuit-là. Ceux qui ne sont pas dans la liste
    // gardent leur scène habituelle (celle de lieux.js) ; « false » retirerait un objet.
    objets: {
        papiers: "dossier",
        papiersDuBas: "dossier",
        chaise: "carton",
        fenetre: "sousLaPorte",
        chat: "cachetteVide"
    },

    finQuand: ["anarchsRelus", "sabbatRelu", "setitesRelus", "manuscritLu", "lettreDeadDogs"],
    fin: "aube3"
});


VN.scene("retour", [
    "* La porte ne ferme plus. Elle a repoussé l'armoire devant, à peu près.",
    "Trois nuits dehors. J'avais oublié que la ville faisait autant de bruit.",
    "Le Conseil m'attend. Pas ce soir, mais bientôt.",
    "Si je dois leur parler, autant savoir de quoi."
]);


/* =========================
   LE DOSSIER POUR LE CONSEIL (les papiers, dans le bureau)
   Un choix : chaque bouton joue une scène, puis on revient ici.
   Chaque scène note qu'elle a été lue ; le dossier est prêt quand les trois le sont.
========================= */

VN.scene("dossier", [
    { si: ["anarchsRelus", "sabbatRelu", "setitesRelus"], va: "dossierPret" },
    "Le dossier pour le Conseil. Trois chemises, classées par ordre de qui me fatigue le moins.",
    { choix: {
        "Les Anarchs": "dossierAnarchs",
        "Le Sabbat": "dossierSabbat",
        "Les Setites": "dossierSetites",
        "Plus tard": ["Ça peut attendre encore un peu."]
    } }
]);

VN.scene("dossierPret", {
    premiere: [
        "Trois chemises. C'est maigre, mais c'est plus que ce que la Cour a lu en dix ans.",
        "Reste à savoir laquelle ils voudront que j'ouvre en premier."
    ],
    ensuite: [
        "C'est prêt. Autant que ça peut l'être.",
        "Je relirai demain. Peut-être."
    ]
});

// d'après le blog anarch du PC 1 (factions/ANARCH/)
VN.scene("dossierAnarchs", [
    { note: "anarchsRelus" },
    "Les Anarchs. Ils en sont à leur cinquième blog, parce que Lil clique sur tout ce qui brille.",
    "Ils ont un Baron, et il veut pas qu'ils mettent les pieds côté Camarilla. Kostas a essayé quand même. Il s'est fait corriger trois fois dans la même nuit, dont deux par son propre camp.",
    "Rollin tient un tableau des terrains de chasse et des patrouilles. Codé par couleur. C'est le document le plus sérieux que j'aie lu cette année, toutes sectes confondues.",
    "Ils ont repéré un type en costard vers le métro de Konak, sortie B. Il regarde depuis un bar, il fait rien. Pas un homme du Sheriff, d'après eux.",
    "Et ils comptent les cadavres du port. Six. « C'est toujours six, puis plus rien. »"
]);

// d'après le portail du Sabbat du PC 2 (factions/sabbat/) et le fil du port sur ege-chan
VN.scene("dossierSabbat", [
    { note: "sabbatRelu" },
    "Le Sabbat. Les Infants de Scylla, comme ils disent.",
    "Baran l'a noté avant moi : ils attaquent jamais de front. La Cour a tué leur évêque en 1920, et ils sont restés. Sous l'eau.",
    "Deux groupes. Les Sirènes attirent les mortels vers la mer. Les Monstres s'occupent du reste.",
    "Comme preuves : des corps rejetés sur les plages, des vieilles qui parlent de choses sous les vagues. Et le quai 3, à Alsancak. « Presque pas de sang par terre. »",
    "(degoutee) Il paraît que ceux qui entendent leur chant une fois continuent de l'entendre pendant des années. Je vais éviter le bord de mer.",
    "Les Anarchs les évitent aussi. Là où il y a du Sabbat, y a pas d'Anarch. C'est presque une carte."
]);

// d'après vermine.exe, sur le PC 1 (factions/vermine.html)
VN.scene("dossierSetites", [
    { note: "setitesRelus" },
    "Les Setites. Le Cercle du Jardin, « développement personnel et lâcher-prise ».",
    "Un site de 2004, des ateliers gratuits le jeudi à la tombée de la nuit, un thé dont personne sait ce qu'il y a dedans.",
    "Ils forcent personne. Ils trouvent ce qui te tient, et ils tirent dessus. Les gens appellent ça se libérer.",
    "Je sais toujours pas qui l'a codé. Je sais juste qu'une mère a écrit dans leur livre d'or parce que son fils ne répondait plus.",
    "(degoutee) « Votre fils est libre. » Avec un cœur."
]);


/* =========================
   LE CARTON DES MANUSCRITS (la chaise, dans l'entrée)
   D'après la fiche d'Inga : son père, les manuscrits saisis, la copie posée sur la tombe.
   La page elle-même est inventée : à réécrire.
========================= */

VN.scene("carton", {
    premiere: [
        "Le carton, sur la chaise. Les manuscrits de mon père.",
        "Les originaux ont été saisis, interdits, ou perdus. Ce que j'ai, c'est la copie que quelqu'un a posée sur leur tombe, le lendemain de l'enterrement.",
        "Avec un mot. « La mémoire survivra aussi longtemps que moi. »",
        "Il signe jamais. Il a pas besoin.",
        { papier: `Le dimanche, on déjeunait sous l'olivier de la cour. Ma mère sortait la table, et mon cousin riait avant la fin des histoires. On l'entendait depuis la rue.

Je note son rire parce qu'aucun registre ne le notera. Les registres disent « un quartier », « un incendie », « des pertes ». Ils ne disent pas que l'olivier donnait mal, ni que mon cousin trichait aux cartes.

Je n'écris pas pour accuser. J'écris pour qu'on sache qu'ils ont été là : des gens, avec une cour, un arbre et un dimanche.

Septembre 1922. Après, il n'y a plus eu de quartier.` },
        { note: "manuscritLu" },
        "Je la connais par cœur, celle-là.",
        "Il voulait pas qu'on les plaigne. Il voulait qu'on sache qu'ils avaient une table et un dimanche.",
        "Je numérise une page par nuit, quand j'y arrive. À ce rythme, j'aurai fini avant la fin du monde. De peu."
    ],
    ensuite: [
        "Une page par nuit.",
        "Pas celle-là. Pas deux fois dans la même nuit."
    ]
});


/* =========================
   LA LETTRE DE DEADDOGS (la porte et la fenêtre, dans l'entrée)
   La lutte entre hackers de plusieurs pays, la censure, le 24 avril : vus par le groupe d'Inga.
   La lettre est inventée : à réécrire.
========================= */

VN.scene("sousLaPorte", {
    premiere: [
        "* Une enveloppe dépasse sous la porte. Elle n'y était pas hier.",
        "Six mois d'avance sur leur rythme habituel. Le log a dû les réveiller.",
        { papier: `Inga,

Vu ton log. Tu es vivante, c'est noté.

Puisque tu as raté un an, l'état des lieux.

Avril approche. Comme chaque année avant le 24, ceux d'Ankara font le ménage : des sites de la diaspora remplacés par un drapeau, des forums fermés pour « contenu inapproprié », la liste de blocage qui s'allonge.
En face, Athènes répond en défaçant un ministère. Bakou s'en mêle. Chacun plante son drapeau sur la page de l'autre, et trois jours plus tard il n'en reste rien.

Nous, on ne plante rien. On copie. Ce qu'ils effacent, on le garde : des registres, des photos, des témoignages. Trois miroirs, hors du pays.

Il nous manque toujours les manuscrits. Les tiens.

Nourris ton chat.

DeadDogs` },
        { note: "lettreDeadDogs" },
        "« Nourris ton chat. »",
        "(degoutee) … Trop tard.",
        "En 2001, je trouvais ça héroïque, de faire tomber un site du gouvernement pendant une nuit. Le lendemain, il était revenu.",
        "Eux, ils se battent à coups de drapeaux sur des pages d'accueil. Nous, on fait des copies. C'est pas glorieux. C'est juste ce qui reste, à la fin."
    ],
    ensuite: [
        "Rien d'autre sous la porte.",
        "Faudra leur répondre. Et leur donner les pages."
    ]
});


/* =========================
   LA CACHETTE DU CHAT (dans l'entrée)
========================= */

VN.scene("cachetteVide", {
    premiere: [
        "* La cachette du chat est vide.",
        "(degoutee) … Ouais.",
        "Faudra que je change le fond d'écran du PC."
    ],
    ensuite: [
        "Non.",
        "J'en reprendrai pas."
    ]
});


/* =========================
   LA FIN DE LA NUIT
========================= */

VN.scene("aube3", [
    "* Le carton de la fenêtre pâlit sur les bords.",
    "Trois chemises pour le Conseil. Une page pour mon père. Une réponse à écrire aux autres.",
    "C'est la nuit la plus remplie que j'aie eue depuis… longtemps.",
    "(degoutee) Faut pas que ça devienne une habitude."
]);
