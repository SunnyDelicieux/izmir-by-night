const dialogues = {

    // ===== SCÈNE 1 =====

    window: {
        first: [
            "La porte. Enfin, ce qu'on en devine derrière la pile.",
            "Ça fait si longtemps que je suis pas sortie que les fringues ont formé une sorte de barrière. Ca, et l'armoire que j'ai déplacé devant pour coincer.",
            "Le carton sur la fenêtre date de… 2008 ? 2009 ? Le scotch a jauni, le carton a gondolé.",
            "Je devrais probablement sortir bientôt. Tout est quasiment mort ici, et la faim commence à me déchirer le crâne.",
            "… Bon. Pas ce soir."
        ],
        repeat: [
            "Pas ce soir.",
            "Non."
        ]
    },

    chat: {
        image: "https://i.postimg.cc/yx3hXVzt/image.png",
        first: [
            "Le chat blanc. T'es toujours en vie toi ?",
            "Tu me regardes comme si j'allais te bouffer. Vu le contexte, c'est une lecture assez lucide de la situation.",
            "Il a faim. Moi aussi. J'ai rien à lui donner.",
            "Faudrait trouver un truc. N'importe quoi qui bouge encore dans cet appart."
        ],
        repeat: [
            "Il veut pas sortir. Je le comprends.",
            "Psst. Le chat. … Ouais, non. Il viendra pas."
        ]
    },

    chair: {
        first: [
            "Ma chaise. Achetée avec l'argent de l'héritage, quand j'ai emménagé.",
            "Mes parents m'ont laissé une maison vide, des dettes, et un carton de manuscrits que personne voulait lire.",
            "J'ai gardé le carton. J'ai acheté une chaise. Grosse journée.",
            "Je m'assois jamais dessus et personne vient ici pour l'utiliser, alors elle sert de stockage."
        ],
        repeat: [
            "Si tu es le genre d'objet avec une conscience, je suis désolé pour toi."
        ]
    },

    poster: {
        image: "https://i.postimg.cc/C5LqKScr/image.png",
        first: [
            "Le dernier poster survivant. Les autres ont moisi un par un, comme dans un slasher pour papier.",
            "Quelqu'un me l'a filé la dernière fois que je suis sortie.",
            "C'est un rare cadeau qui ne m'a pas été fait pour se moquer de moi.",
            "Je l'ai accroché près de la fenêtre. C'est l'endroit le plus sec de l'appart. C'est là que je mets les trucs que je veux garder.",
            "Y en a pas beaucoup."
        ],
        repeat: [
            "2012. Une bonne année. Pour les posters.",
            "Je devrais peut etre reflechir à un cadeau en retour."
        ]
    },


    // ===== SCÈNE 2 =====

    holy: {
        humeur: "degoutee",
        first: [
            "Je suis à peu près sûre qu'il y a des boîtes de 2009 là-dessous.",
            "Ça couine, aussi. Faiblement. Comme si le tas avait un avis sur la question.",
            "J'ai pas envie d'y mettre les bras. Même morte, j'ai des limites."
        ],
        repeat: [
            "Ça couine toujours.",
            "Non."
        ]
    },

    flesh: {
        first: [
            "Mon lit. Enfin, mon tas d'oreillers. La moitié vient de l'Élysium.",
            "Certains ont été volé, la majorité c'est Nebetta qui me les a gentiment donné après ma visite.",
            "Qu'elle est gentille, et puis, ça n'a rien à voir avec le fait qu'elle ne voulait pas garder quelque chose que j'ai touché."
            "Mine de rien ils sentent encore l'encens et le parfum de riche. Ça couvre un peu le reste.",
            "Faudrait que je m'achète un vrai lit. Mais il faudrait qu'un livreur monte, qu'il voie l'appart, qu'il voie ma tête. Non merci."
        ],
        repeat: [
            "Plus tard, la torpeur.",
            "Je peut tenir encore un peu."
        ]
    },

    code: {
        first: [
            "La demande d'archivage. Encore.",
            "Ils veulent que je stocke les données des archives. Des copies de copies répartis sur trois serveurs, avec chacun deux sauvegardes et un disque dur dans un coffre, au cas où.",
            "Je sais pas pour qui ça reste un secret à la fin, mais si Il le demande, c'est que ce sera utile plus tard.",
            "J'ai vraiment pas envie de m'y mettre."
        ],
        repeat: [
            "Ça peut attendre encore quelques mois.",
            "Demain. Peut-être."
        ]
    },

    travail: {
        first: [
            "Il y a une pile de papier sur laquelle je travaille depuis un moment. J'arrive à rien.",
            "Les choses fonctionnent mieux en système de trois, mais je ne crois pas non plus au principe d'alchimie. Il y a quelque chose d'autre.",
            "Nous avons trop évolué pour ne pas impliquer la machine dans le concept même du monde. L'idée de quelque chose qui suit un but, et qui cherche à briser les limites sans les comprendre.",
            "Je me demande si Il pourrait m'aider.",
            "… Le jour on Il viendra me voir."
        ],
        repeat: [
            "Pas maintenant.",
            "Trois. Pourquoi toujours trois."
        ]
    },

    // ce qu'Inga dit en éteignant un PC (voir « ordinateurs » dans room.js)
    pc1: {
        first: [
            "Ça fait un moment que j'ai pas eu de problème informatique à régler pour les autres.",
            "Personne a cliqué sur une pièce jointe louche et mis en ligne ses brisures de mascarades. Personne m'a demandé de pirater son ex.",
            "Soit la ville est devenue adulte, soit elle a trouvé quelqu'un d'autre. Je me demande lequel des deux autres s'y collent.",
            "Hm. Ça arrange mes affaires, en soi."
        ],
        repeat: [
            "Encore une partie. Une seule.",
            "Faudrait nourrir le chat."
        ]
    },

    pc2: {
        first: [
            "L'autre machine. Branchée sur rien. Pas de réseau, pas de wifi, rien.",
            "La seule chose dans cet appart que la Camarilla pourra jamais lire. Je suis pas conne, je sais qu'ils peuvent savoir pour le reste.",
            "Façon de parler."
        ],
        repeat: [
            "Je laisse pas ces fichiers ouverts trop longtemps.",
            "Débranchée. Comme il faut."
        ]
    },


    // ===== LES RÉACTIONS (une seule fois chacune, voir reactionUnique dans quete.js) =====

    // PC 1 : à la fin de la conversation setite de vermine.exe
    vermine: {
        humeur: "degoutee",
        lignes: [
            "Un humain m'a filé une clé USB avec ce truc dessus. Il avait l'air fier de lui.",
            "C'est nul à chier. Les Setites recrutent avec un site codé en 2001 par un prof de yoga.",
            "Et le pire, c'est que ça marche. Les gens veulent tellement qu'on leur dise que leurs désirs sont une forme de liberté.",
            { texte: "Pas moyen de remonter à celui qui l'a fait. Pistes brouillées, proxys, tout le tralala. Presque respectable.", humeur: "base" },
            { texte: "Mais il a quand même laissé une <div> soup. Personne d'aussi prudent code aussi mal par accident. Le côté moche, c'est voulu. Ça fait « accessible ».", humeur: "base" },
            { texte: "… Ça fait aussi un peu 2004. Presque nostalgique.", humeur: "base" }
        ]
    },

    // PC 1 : en ouvrant le dossier Anarch
    anarch: {
        lignes: [
            "Le blog des Anarchs, de ce que j'en tire c'est leur cinuième.",
            "Ils vivent comme s'ils étaient encore humains, comme si de rien était.",
            "Et entre deux engueulades, un truc comme ça : des infos sur le sabbat, la mort de gens dont on a jamais entendu parler.",
            "Ils voient des trucs que la Cour verra jamais.",
            "Ils savent pas que je les lis. Ou ils savent, et ils s'en foutent. Je sais pas ce qui est le plus vexant."
        ]
    },

    // PC 1 : quand on tape « zacharias » dans la discussion Steam
    zacharias: {
        lignes: [
            "Il râle, mais il n'a bloqué que quatre de mes cinq comptes…",
            "Je devrais pouvoir récupérer ce que je cherche bientôt, s'il reste aussi peu méfiant.",
            "Reste à savoir ce que lui cherche, en continuant à me répondre.",
            "… Ou il répond juste parce que personne d'autre lui écrit non plus."
        ]
    },

    // PC 2 : en ouvrant les logs du groupe (ashugh\logs)
    log: {
        lignes: [
            "Les logs. Ils servent à pas mal de choses, mais c'est surtout un moyen pour les autres de savoir qu'on est pas mort.",
            "Quand on fait notre boulot, ça peut arriver à n'importe quel moment.",
            "Dernier log : il y a plus d'un an. Avant, c'était toutes les semaines.",
            "Ils m'écrivent encore. Pas souvent. Une lettre tous les six mois, glissée sous la porte, que je trouve trois mois plus tard sous un carton.",
            "C'est pas grave. Ils sont occupés. Moi aussi.",
            "… Enfin. Je crois."
        ]
    },

    // PC 2 : une fois le log écrit
    logEcrit: {
        lignes: [
            "Voilà. DUMBF0UNDED est en vie.",
            "Trois lignes, une date. Et quelque part, quatre personnes vont se dire « ah, elle est pas morte » avant de retourner à leur vie.",
            "Rendez-vous dans un an."
        ]
    },


    // ===== LA QUÊTE DU CHAT (voir quete.js) =====

    // le tas, après avoir vu le chat, mais sans rien pour attraper les rats
    tasMainsNues: {
        first: [
            "Allez. Pour le chat.",
            { texte: "Elle plonge le bras dans le tas. Un truc lui file entre les doigts. Puis un deuxième.", qui: "" },
            "Ils sont rapides, ces cons.",
            "À mains nues, j'y arriverai jamais. Faudrait un sac. Un piège. Un truc."
        ],
        repeat: [
            "Il me faut un sac.",
            "Pas à mains nues. Pas deux fois."
        ]
    },

    // dans le tas d'oreillers, une fois qu'Inga sait qu'il lui faut un sac
    taie: {
        lignes: [
            { texte: "Elle tire une taie de sous les oreillers et la secoue.", qui: "" },
            "Nebetta a payé une fortune pour que ça finisse en sac à rats.",
            "Ça me fait plaisir d'une façon que je vais pas analyser."
        ]
    },

    // les rats attrapés avec la taie, dans le tas
    rat1: {
        lignes: [
            { texte: "Elle enfonce la taie dans le tas et la referme d'un coup.", qui: "" },
            "… Un.",
            "Il gigote. Encore un et c'est bon."
        ]
    },

    rat2: {
        lignes: [
            { texte: "Elle recommence. La taie se tortille un peu plus.", qui: "" },
            "Deux. Un pour lui, un pour moi.",
            "Sûrement les derniers de l'appart. Après eux, plus rien couinera ici. Même pas moi.",
            { texte: "Ils sentent le linge mouillé et la poubelle. Je vais pas réfléchir à ce qu'ils ont mangé.", humeur: "degoutee" }
        ]
    },

    // quand on retourne voir le chat avec les rats
    nourrir: {
        lignes: [
            "Viens. Doucement. Celui-là est pour toi.",
            { texte: "Le chat hésite. Puis il mord.", qui: "" },
            "… Bien.",
            { texte: "Et celui-là, c'est pour moi.", humeur: "degoutee" },
            { texte: "C'est immonde. Le goût est de plus en plus fade, presque comme boire de l'eau croupie.", humeur: "degoutee" },
            "Plus de rats, plus qu'un seul chat, et personne est venu ici depuis des lustres.",
            "Faudra que je me débrouille pour en trouver d'autres. Pour sortir, surtout.",
            "Peut-être que je pourrais Le voir. Peut-être qu'Il viendrait à ma rencontre.",
            { texte: "Mais non. Il préfère aller voir les autres… sous prétexte qu'ils sont amis.", humeur: "degoutee" },
            "Je lui suis utile. C'est censé être mieux. Tellement mieux.",
            ". . .",
            { texte: "Ça remue sous la pile de linge.", qui: "" },
            ". . . ?",
            { texte: "Le chat sort enfin de sa cachette, laissant une carcasse derrière lui. Il y a quelque chose de coincé là-dessous.", qui: "" },
            "… Une lettre ?"
        ]
    },

    // le tas, une fois les rats attrapés
    tasVide: {
        first: [
            "Plus rien couine là-dedans.",
        ],
        repeat: [
            "Silence radio.",
            "Faudrait faire le ménage. Un jour."
        ]
    },

    // la lettre trouvée derrière le chat (les retours à la ligne sont gardés)
    lettre: `Inga,

9 mois sans nouvelles. Est-ce que tu travailles encore sur les manuscrits ? J'espère que tu n'as pas oublié, je sais que c'est important pour toi.

Ce qui compte, c'est que tu gardes le moral, et que tu puisses continuer à nous donner des informations, c'est le seul moyen qu'on a de t'aider, tu sais.

Quand tu auras le temps, fais un log sur le pc, vraiment n'importe quoi pour l'instant, histoire qu'on sache que tu es en vie.
Ensuite, tu pourras reprendre plus sérieusement, on a pas mal de choses à te montrer, et le combat continue même sans toi.

Nourris ton chat, débile.

DeadDogs`,


    // ===== LA FIN (voir quete.js) =====
    // Elle se lance quand la lettre est récupérée, le log écrit et la conversation setite terminée.

    // le soleil se lève
    aube: {
        lignes: [
            { texte: "La lumière passe sous le carton de la fenêtre. Faible, lointaine, mais présente tout de même.", qui: "" },
            "Il doit bien être sept heures, et j'ai trop repoussé la torpeur.",
            "Mes paupières pèsent des tonnes.",
            "J'ai rien fait aujourd'hui encore, et je pense pas faire plus demain.",
            { texte: "La torpeur la prend avant qu'elle atteigne les oreillers. Elle s'effondre sur le sol.", qui: "" }
        ]
    },

    // le texte sur l'écran noir, entre les deux nuits
    nuitSuivante: "La nuit suivante.",

    // La nuit suivante se joue en quatre moments, l'un après l'autre (voir jouerLaFin dans quete.js) :
    // le réveil, le repas, l'appel de Zacharias, la sortie.

    // 1. le réveil : Zacharias a appelé
    lendemain: {
        lignes: [
            { texte: "Un bourdonnement contre le carrelage. Un des téléphones sonne, vu la sonnerie, c'est celui destiné aux communications avec les Tremere.", qui: "" },
            "Hm.",
            { texte: "Elle s'est endormie là où elle est tombée, la joue sur le carrelage, entre deux boîtes de nouilles. Le soleil est couché depuis trois heures.", qui: "" },
            { texte: "Elle attrape le téléphone.", qui: "" },
            "Cinq appels manqués. Zacharias.",
            "La dernière fois qu'il a appelé, c'était… juin ? Quatre mois. Et là, cinq appels en une journée.",
            "Soit quelqu'un est mort, soit il croit que c'est moi.",
            "Il attendra. J'ai faim."
        ]
    },

    // 2. le repas : le chat
    repas: {
        lignes: [
            "Le rat a pas suffi. Celui d'hier non plus. Il m'avait prévenue que ça durerait pas.",
            { texte: "Le chat est roulé en boule contre elle. Il a dormi là toute la journée, contre la seule chose de l'appart qui ne bougeait pas.", qui: "" },
            "Il me fait confiance. C'est mignon. C'est con.",
            { texte: ". . .", humeur: "degoutee" },
            "Je peux pas sortir comme ça. Si la Bête se réveille dans le couloir, c'est la voisine du dessous qui paye.",
            "Désolée, petit chat.",
            { texte: "Elle le soulève doucement. Il ne se débat pas, et l'observe avec de grands yeux.", qui: "" },
            { texte: "Le sang est chaud, le gout est meilleur que celui du rongeur, bien qu'il reste quelque peu fade.", humeur: "degoutee" },
            { texte: "Il était clair que tout ça n'avait encore rien de naturel pour elle.", humeur: "degoutee" }
        ]
    },

    // 3. l'appel : Inga rappelle Zacharias. Ils jouent à se taper sur les nerfs, sans haine.
    //    Lore utilisé : la lettre de Zacharias à Esen sur les Anarchs (leurs deux méthodes, le jeu),
    //    le blog anarch du PC 1, le titre qu'Inga refuse, Dimitrios, Atam et le Régent.
    appel: {
        telephone: true,   // le téléphone s'affiche pendant la conversation (telephone.png)
        lignes: [
            "Bon. Rappelons-le, avant qu'il n'annonce ma mort",
            { texte: "Une sonnerie. Il décroche avant la deuxième.", qui: "" },
            { texte: "Cinq appels, Inga. Cinw. J'avais commencé à rédiger ta nécrologie.", qui: "Zacharias" }
             "Et tu l'écrivais comment ?",
             { texte: "Elle était sobre, élégante et légèrement condescendante.", qui: "Zacharias" }
            "Tu aurais dû la publier. J'aurais adoré corriger tes fautes.",
            { texte: "Je ne fais pas de fautes.", qui: "Zacharias" },
            "C'est ce que disent tous les gens qui font des fautes.",
            { texte: "Quatre mois, Inga.", qui: "Zacharias" },
            "Je n'avais rien à te dire.",
            { texte: "Tu n'as jamais rien à dire. D'habitude, ça ne t'empêche pas de parler.", qui: "Zacharias" },
            { texte: "Bref. Les Anarchs ont encore migré. Nouveau blog, nouveau serveur, et ils semblent commencer à apprendre les bases de la sécurité informatique.", qui: "Zacharias" },
            "Je sais. Lil a cliqué sur un lien qu'il aurait pas dû. Ils ont tout déménagé en une nuit.",
            "C'était presque attendrissant.",
            { texte: "Il nous a fallut quatre jour pour les retrouver, ce qui reste court, mais ça risque d'etre plus difficile plus tard.", qui: "Zacharias" },
            { texte: "Le problème n'est pas de les retrouver. C'est ce qu'on remonte dans le filet.", qui: "Zacharias" },
            { texte: "Plus de scripts, plus de goules, plus de nuits passées à trier. Chaque migration nous coûte un peu plus.", qui: "Zacharias" },
            { texte: "Et qu'est-ce qu'on récupère ? Des anniversaires. Des recommandations de films. Un tableau des terrains de chasse.", qui: "Zacharias" },
            "Le tableau est super, j'ai rien à redire sur le tableau.",
            { texte: "Ce n'est pas rien. Mais c'est noyé dans tout le reste. On creuse trop large, on ramasse tout et n'importe quoi.", qui: "Zacharias" },
            "On a juste à resserer un peu, se concentrer sur un truc.",
            { texte: "Sur quoi ? Le port ? Konak ? Le Baron ? Ce n'est pas à nous de choisir. En théorie, c'est le Conseil qui décide de ce qui compte pour la ville..", qui: "Zacharias" },
            "En théorie oui. Après ils savent pas ce que ça implique",
            { texte: "Et c'est là que tu interviens. Parle leur. Demande-leur sur quoi ils veulent qu'on se concentre.", qui: "Zacharias" },
            "Moi ? C'est toi qui à un primogène, fais le toi meme.",
            { texte: "Ils t'écoutent. Ils ne t'aiment pas, mais ils t'écoutent. La Cour t'a même proposé un titre, si je me souviens bien.", qui: "Zacharias" },
            "Et j'ai dit non. J'ai pas que ça à faire. Leur titre, c'était juste un moyen de me forcer à leur faire des faveurs en échange.",
            { texte: "Soit. Reste dans ton coin pour toujours. Mais ça reste à toi de le faire.", qui: "Zacharias" },
            { texte: "Moi, si j'apporte ça, ils me demanderont comment je l'ai obtenu. Avec quelles ressources, et sur ordre de qui. Ça pourrait compliquer les choses.", qui: "Zacharias" },
            { texte: "Pour moi, pour toi, et pour mon sire.", qui: "Zacharias" },
            { texte: "Donc le grand génie de la Fondation a peur de se faire gronder par Dimitrios.", humeur: "degoutee" },
            { texte: "J'ai le sens de la hiérarchie. C'est une notion qui t'échappe, je sais.", qui: "Zacharias" },
            "Bon. Je leur parlerai. C'est mon projet de toute façon, tu n'as fait que l'améliorer.",
            { texte: "« Améliorer ». Je note que tu l'as dit.", qui: "Zacharias" },
            { texte: "Ne t'habitue pas.", humeur: "degoutee" },
            "Et Il sera au courant, de toute façon, par moi ou quelqu'un d'autre.",
            { texte: "Atam fera ce qu'Atam fait. Je ne prétends pas comprendre ton sire, et je n'ai pas l'intention d'essayer. Ce n'est pas mon domaine.", qui: "Zacharias" },
            "Personne le comprend. C'est un peu le principe.",
            { texte: "Il voit le Régent plus souvent que nous tous réunis. Ça me suffit, comme mystère.", qui: "Zacharias" },
            "Tu m'en diras des nouvelles, oui."
            { texte: "Bonne nuit, Inga. Ne meurs pas avant d'avoir parlé au Conseil. Ta nécrologie n'est pas finie.", qui: "Zacharias" },
            "Bonne nuit, Zacharias. Garde-la au chaud.",
            { texte: "Elle raccroche.", qui: "" }
        ]
    },

    // 4. la sortie
    sortie: {
        lignes: [
            "Si je dois parler aux primogènes, ce sera le ventre plein. Un rat et un chat, c'est pas un repas. Et une Nosferatu affamée au téléphone avec le Conseil, ça finit mal pour tout le monde.",
            "Avec cette force en plus, je peux enfin bouger la pile qui bloque l'entrée.",
            { texte: "Elle pousse. Le bois craque avant de se briser.", qui: "" },
            { texte: "L'air du couloir est froid. Silencieux. Ça sent la javel et le chou des voisins.", qui: "" },
            { texte: "Je serai sûrement pas la seule dehors ce soir. Pourvu que je croise personne qui me reconnaisse…", humeur: "degoutee" },
            { texte: "Louées soient les villes où les souterrains appartiennent aux Nosferatu seuls, et pas à absolument tout le monde.", humeur: "degoutee" },
            "Je sors enfin. J'ai à faire."
        ]
    },

    // l'écran de fin
    fin: "FIN — pour l'instant."

};


// les autres personnages qui parlent (« qui » dans une bulle) : leur icône
const interlocuteurs = {
    "Zacharias": "/img/wiki/tremere/zacharias.png"
};
