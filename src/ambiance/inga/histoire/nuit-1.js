/* =====================================================================
   INGA · NUIT 1 · « Pas ce soir. »

   Inga n'est pas sortie depuis des mois. On visite l'appartement, on allume les PC.

   Ce qu'il y a à faire cette nuit-là :

     LA QUÊTE DU CHAT
       1. regarder le chat (entrée) : il a faim et se cache                → note « chatVu »
       2. fouiller le tas qui couine (bureau) : impossible à mains nues
       3. prendre une taie dans le tas d'oreillers (bureau)                → note « taie »
       4. retourner au tas : un clic, un rat ; un autre clic, le deuxième  → compte « rats »
       5. retourner voir le chat : il mange, il sort, il laisse une lettre → note « chatSorti »

     LE LOG       la lettre demande un log : il s'écrit sur le PC 2
                  (ashugh > logs > log_04.txt)                             → note « logEcrit »

     LES SETITES  finir la conversation de vermine.exe, sur le PC 1        → note « setitesVus »

   Quand ces trois choses sont notées (finQuand), le soleil se lève (la scène « aube »),
   puis la nuit 2 commence.

   RAPPEL · une réplique s'écrit entre guillemets, avec une virgule après chacune :
     "…"                      Inga parle
     "(degoutee) …"           Inga, avec son sprite dégoûté
     "* …"                    de la narration (à la 3e personne, au présent : « Elle raccroche. »)
     "Zacharias : …"          quelqu'un d'autre parle
===================================================================== */

VN.nuit(1, {
    lieu: "bureau",
    finQuand: ["chatSorti", "logEcrit", "setitesVus"],
    fin: "aube"
});


/* =========================
   L'ENTRÉE
   Les objets qu'on peut recliquer ont deux parties :
     premiere : le premier clic, un dialogue plus long ;
     ensuite  : les clics suivants, une seule réplique à chaque fois, chacune son tour.
   Facultatif : image (l'objet en gros plan pendant qu'Inga en parle).
========================= */

VN.scene("fenetre", {
    premiere: [
        "La porte. Enfin, ce qu'on en devine derrière la pile.",
        "Ça fait si longtemps que je suis pas sortie que les fringues ont formé une sorte de barrière. Ça, et l'armoire que j'ai déplacée devant pour la coincer.",
        "Le carton sur la fenêtre date de… 2008 ? 2009 ? Le scotch a jauni, le carton a gondolé.",
        "Je devrais probablement sortir bientôt. Tout est quasiment mort ici, et la faim commence à me déchirer le crâne.",
        "… Bon. Pas ce soir."
    ],
    ensuite: [
        "Pas ce soir.",
        "Non."
    ]
});

VN.scene("chaise", {
    premiere: [
        "Ma chaise. Achetée avec l'argent de l'héritage, quand j'ai emménagé.",
        "Mes parents m'ont laissé une maison vide, des dettes, et un carton de manuscrits que personne voulait lire.",
        "J'ai gardé le carton. J'ai acheté une chaise. Grosse journée.",
        "Je m'assois jamais dessus et personne vient ici pour l'utiliser, alors elle sert de stockage."
    ],
    ensuite: [
        "Si tu es le genre d'objet avec une conscience, je suis désolée pour toi."
    ]
});

VN.scene("poster", {
    image: "https://i.postimg.cc/C5LqKScr/image.png",
    premiere: [
        "Le dernier poster survivant. Les autres ont moisi un par un, comme dans un slasher pour papier.",
        "Quelqu'un me l'a filé la dernière fois que je suis sortie.",
        "C'est un rare cadeau qui ne m'a pas été fait pour se moquer de moi.",
        "Je l'ai accroché près de la fenêtre. C'est l'endroit le plus sec de l'appart. C'est là que je mets les trucs que je veux garder.",
        "Y en a pas beaucoup."
    ],
    ensuite: [
        "2012. Une bonne année. Pour les posters.",
        "Je devrais peut-être réfléchir à un cadeau en retour."
    ]
});


/* =========================
   LA QUÊTE DU CHAT
   Une scène peut être un aiguillage : une liste de « si… va… », lue de haut en bas.
   La première condition vraie gagne ; si aucune ne l'est, on arrive à la dernière ligne.
========================= */

// le chat (entrée)
VN.scene("chat", [
    { si: "chatSorti", va: "lettre" },                // la quête est finie : on relit la lettre
    { si: (m) => m.rats >= 2, va: "nourrirLeChat" },  // Inga a les deux rats
    { note: "chatVu" },                               // sinon : elle le regarde, et sait qu'il a faim
    { va: "chatCache" }
]);

VN.scene("chatCache", {
    image: "https://i.postimg.cc/yx3hXVzt/image.png",
    premiere: [
        "Le chat blanc. T'es toujours en vie, toi ?",
        "Tu me regardes comme si j'allais te bouffer. Vu le contexte, c'est une lecture assez lucide de la situation.",
        "Il a faim. Moi aussi. J'ai rien à lui donner.",
        "Faudrait trouver un truc. N'importe quoi qui bouge encore dans cet appart."
    ],
    ensuite: [
        "Il veut pas sortir. Je le comprends.",
        "Psst. Le chat. … Ouais, non. Il viendra pas."
    ]
});

// le tas qui couine (bureau)
VN.scene("tas", [
    { si: "chatSorti", va: "tasVide" },
    { si: (m) => m.rats >= 2, va: "tasVide" },
    { si: "!chatVu", va: "tasDegoutant" },    // tant qu'elle n'a pas vu que le chat a faim, aucune raison d'y plonger les bras
    { si: "!taie", va: "tasMainsNues" },
    { si: "!rats", va: "premierRat" },
    { va: "deuxiemeRat" }
]);

VN.scene("tasDegoutant", {
    premiere: [
        "(degoutee) Je suis à peu près sûre qu'il y a des boîtes de 2009 là-dessous.",
        "(degoutee) Ça couine, aussi. Faiblement. Comme si le tas avait un avis sur la question.",
        "(degoutee) J'ai pas envie d'y mettre les bras. Même morte, j'ai des limites."
    ],
    ensuite: [
        "(degoutee) Ça couine toujours.",
        "(degoutee) Non."
    ]
});

// après avoir vu le chat, mais sans rien pour attraper les rats
VN.scene("tasMainsNues", {
    premiere: [
        "Allez. Pour le chat.",
        "* Elle plonge le bras dans le tas. Un truc lui file entre les doigts. Puis un deuxième.",
        "Ils sont rapides, ces cons.",
        "À mains nues, j'y arriverai jamais. Faudrait un sac. Un piège. Un truc."
    ],
    ensuite: [
        "Il me faut un sac.",
        "Pas à mains nues. Pas deux fois."
    ]
});

// avec la taie d'oreiller : un rat à chaque fois (le compteur « rats : 1 / 2 » est dans reglages.js)
VN.scene("premierRat", [
    { ajoute: "rats" },
    "* Elle enfonce la taie dans le tas et la referme d'un coup.",
    "… Un.",
    "Il gigote. Encore un et c'est bon."
]);

VN.scene("deuxiemeRat", [
    { ajoute: "rats" },
    "* Elle recommence. La taie se tortille un peu plus.",
    "Deux. Un pour lui, un pour moi.",
    "Sûrement les derniers de l'appart. Après eux, plus rien couinera ici. Même pas moi.",
    "(degoutee) Ils sentent le linge mouillé et la poubelle. Je vais pas réfléchir à ce qu'ils ont mangé."
]);

// une fois les rats attrapés
VN.scene("tasVide", {
    premiere: [
        "Plus rien couine là-dedans."
    ],
    ensuite: [
        "Silence radio.",
        "Faudrait faire le ménage. Un jour."
    ]
});

// le tas d'oreillers (bureau) : la taie, une fois qu'Inga sait qu'il lui faut un sac
VN.scene("oreillers", [
    { si: ["chatVu", "!taie", "!chatSorti"], va: "taie" },
    { va: "lit" }
]);

VN.scene("taie", [
    { note: "taie" },
    "* Elle tire une taie de sous les oreillers et la secoue.",
    "Nebetta a payé une fortune pour que ça finisse en sac à rats.",
    "Ça me fait plaisir d'une façon que je vais pas analyser."
]);

VN.scene("lit", {
    premiere: [
        "Mon lit. Enfin, mon tas d'oreillers. La moitié vient de l'Élysium.",
        "Certains ont été volés, la majorité, c'est Nebetta qui me les a gentiment donnés après ma visite.",
        "Qu'elle est gentille, et puis, ça n'a rien à voir avec le fait qu'elle ne voulait pas garder quelque chose que j'ai touché.",
        "Mine de rien, ils sentent encore l'encens et le parfum de riche. Ça couvre un peu le reste.",
        "Faudrait que je m'achète un vrai lit. Mais il faudrait qu'un livreur monte, qu'il voie l'appart, qu'il voie ma tête. Non merci."
    ],
    ensuite: [
        "Plus tard, la torpeur.",
        "Je peux tenir encore un peu."
    ]
});

// retour au chat, avec les deux rats
VN.scene("nourrirLeChat", [
    "Viens. Doucement. Celui-là est pour toi.",
    "* Le chat hésite. Puis il mord.",
    "… Bien.",
    "(degoutee) Et celui-là, c'est pour moi.",
    "(degoutee) C'est immonde. Le goût est de plus en plus fade, presque comme boire de l'eau croupie.",
    "Plus de rats, plus qu'un seul chat, et personne est venu ici depuis des lustres.",
    "Faudra que je me débrouille pour en trouver d'autres. Pour sortir, surtout.",
    "Peut-être que je pourrais Le voir. Peut-être qu'Il viendrait à ma rencontre.",
    "(degoutee) Mais non. Il préfère aller voir les autres… sous prétexte qu'ils sont amis.",
    "Je lui suis utile. C'est censé être mieux. Tellement mieux.",
    ". . .",
    "* Ça remue sous la pile de linge.",
    ". . . ?",
    "* Le chat sort enfin de sa cachette, laissant une carcasse derrière lui. Il y a quelque chose de coincé là-dessous.",
    "… Une lettre ?",
    { note: "chatSorti" },
    { va: "lettre" }
]);

// la lettre trouvée derrière le chat. Entre deux accents graves ` `, les retours à la ligne sont gardés.
VN.scene("lettre", [
    { papier: `Inga,

9 mois sans nouvelles. Est-ce que tu travailles encore sur les manuscrits ? J'espère que tu n'as pas oublié, je sais que c'est important pour toi.

Ce qui compte, c'est que tu gardes le moral, et que tu puisses continuer à nous donner des informations, c'est le seul moyen qu'on a de t'aider, tu sais.

Quand tu auras le temps, fais un log sur le pc, vraiment n'importe quoi pour l'instant, histoire qu'on sache que tu es en vie.
Ensuite, tu pourras reprendre plus sérieusement, on a pas mal de choses à te montrer, et le combat continue même sans toi.

Nourris ton chat, débile.

DeadDogs` }
]);


/* =========================
   LE BUREAU
========================= */

VN.scene("travail", {
    premiere: [
        "Il y a une pile de papier sur laquelle je travaille depuis un moment. J'arrive à rien.",
        "Les choses fonctionnent mieux en système de trois, mais je ne crois pas non plus au principe d'alchimie. Il y a quelque chose d'autre.",
        "Nous avons trop évolué pour ne pas impliquer la machine dans le concept même du monde. L'idée de quelque chose qui suit un but, et qui cherche à briser les limites sans les comprendre.",
        "Je me demande si Il pourrait m'aider.",
        "… Le jour où Il viendra me voir."
    ],
    ensuite: [
        "Pas maintenant.",
        "Trois. Pourquoi toujours trois."
    ]
});

VN.scene("archivage", {
    premiere: [
        "La demande d'archivage. Encore.",
        "Ils veulent que je stocke les données des archives. Des copies de copies réparties sur trois serveurs, avec chacun deux sauvegardes et un disque dur dans un coffre, au cas où.",
        "Je sais pas pour qui ça reste un secret à la fin, mais si Il le demande, c'est que ce sera utile plus tard.",
        "J'ai vraiment pas envie de m'y mettre."
    ],
    ensuite: [
        "Ça peut attendre encore quelques mois.",
        "Demain. Peut-être."
    ]
});


/* =========================
   LES PC
   « pc1 » et « pc2 » : ce qu'Inga dit en éteignant chaque PC (enEteignant, dans lieux.js).

   Les scènes suivantes sont lancées par les pages des PC (avec Pont.joue, voir /ambiance/vn/pont.js).
   Elles n'ont qu'une « premiere », sans « ensuite » : elles ne se jouent donc qu'une seule fois.
========================= */

VN.scene("pc1", {
    premiere: [
        "Ça fait un moment que j'ai pas eu de problème informatique à régler pour les autres.",
        "Personne a cliqué sur une pièce jointe louche et mis en ligne ses brisures de Mascarade. Personne m'a demandé de pirater son ex.",
        "Soit la ville est devenue adulte, soit elle a trouvé quelqu'un d'autre. Je me demande lequel des deux autres s'y colle.",
        "Hm. Ça arrange mes affaires, en soi."
    ],
    ensuite: [
        "Encore une partie. Une seule.",
        "Faudrait nourrir le chat."
    ]
});

VN.scene("pc2", {
    premiere: [
        "L'autre machine. Branchée sur rien. Pas de réseau, pas de wifi, rien.",
        "La seule chose dans cet appart que la Camarilla pourra jamais lire. Je suis pas conne, je sais qu'ils peuvent savoir pour le reste.",
        "Façon de parler."
    ],
    ensuite: [
        "Je laisse pas ces fichiers ouverts trop longtemps.",
        "Débranchée. Comme il faut."
    ]
});

// PC 1 : à la fin de la conversation setite de vermine.exe (lancée par factions/vermine-cercle.html)
VN.scene("vermine", {
    premiere: [
        { note: "setitesVus" },
        "(degoutee) Un humain m'a filé une clé USB avec ce truc dessus. Il avait l'air fier de lui.",
        "(degoutee) C'est nul à chier. Les Setites recrutent avec un site codé en 2001 par un prof de yoga.",
        "(degoutee) Et le pire, c'est que ça marche. Les gens veulent tellement qu'on leur dise que leurs désirs sont une forme de liberté.",
        "Pas moyen de remonter à celui qui l'a fait. Pistes brouillées, proxys, tout le tralala. Presque respectable.",
        "Mais il a quand même laissé une <div> soup. Personne d'aussi prudent code aussi mal par accident. Le côté moche, c'est voulu. Ça fait « accessible ».",
        "… Ça fait aussi un peu 2004. Presque nostalgique."
    ]
});

// PC 1 : en ouvrant le dossier Anarch (lancée par factions/index.html)
VN.scene("anarch", {
    premiere: [
        "Le blog des Anarchs. De ce que j'en tire, c'est leur cinquième.",
        "Ils vivent comme s'ils étaient encore humains, comme si de rien n'était.",
        "Et entre deux engueulades, un truc comme ça : des infos sur le Sabbat, la mort de gens dont on a jamais entendu parler.",
        "Ils voient des trucs que la Cour verra jamais.",
        "Ils savent pas que je les lis. Ou ils savent, et ils s'en foutent. Je sais pas ce qui est le plus vexant."
    ]
});

// PC 1 : quand on tape « zacharias » dans la discussion Steam (lancée par factions/script.js)
VN.scene("zacharias", {
    premiere: [
        "Il râle, mais il n'a bloqué que quatre de mes cinq comptes…",
        "Je devrais pouvoir récupérer ce que je cherche bientôt, s'il reste aussi peu méfiant.",
        "Reste à savoir ce que lui cherche, en continuant à me répondre.",
        "… Ou il répond juste parce que personne d'autre lui écrit non plus."
    ]
});

// PC 2 : en ouvrant les logs du groupe, ashugh\logs (lancée par factions/terminal.html)
VN.scene("log", {
    premiere: [
        "Les logs. Ils servent à pas mal de choses, mais c'est surtout un moyen pour les autres de savoir qu'on est pas mort.",
        "Quand on fait notre boulot, ça peut arriver à n'importe quel moment.",
        "Dernier log : il y a plus d'un an. Avant, c'était toutes les semaines.",
        "Ils m'écrivent encore. Pas souvent. Une lettre tous les six mois, glissée sous la porte, que je trouve trois mois plus tard sous un carton.",
        "C'est pas grave. Ils sont occupés. Moi aussi.",
        "… Enfin. Je crois."
    ]
});

// PC 2 : une fois le log écrit (factions/terminal.html note « logEcrit », puis lance cette scène)
VN.scene("logEcrit", {
    premiere: [
        "Voilà. DUMBF0UNDED est en vie.",
        "Trois lignes, une date. Et quelque part, quatre personnes vont se dire « ah, elle est pas morte » avant de retourner à leur vie.",
        "Rendez-vous dans un an."
    ]
});


/* =========================
   LA FIN DE LA NUIT
   Jouée toute seule quand la lettre est trouvée, le log écrit et la conversation setite
   terminée (finQuand, tout en haut). Ensuite : la nuit 2.
========================= */

VN.scene("aube", [
    "* La lumière passe sous le carton de la fenêtre. Faible, lointaine, mais présente tout de même.",
    "Il doit bien être sept heures, et j'ai trop repoussé la torpeur.",
    "Mes paupières pèsent des tonnes.",
    "J'ai rien fait aujourd'hui encore, et je pense pas faire plus demain.",
    "* La torpeur la prend avant qu'elle atteigne les oreillers. Elle s'effondre sur le sol."
]);
