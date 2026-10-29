// Chaque dialogue : first (la première fois), repeat (les fois suivantes).
// Facultatif : image (un objet en gros plan), boucle: false (reste sur la dernière phrase),
// humeur: "degoutee" pour le sprite dégoûté/surpris (sinon c'est le sprite de base).
//
// Les interruptions ont des « lignes » : chaque ligne est un texte, ou un objet pour aller plus loin :
//   { texte: "…", humeur: "degoutee" }              change le sprite d'Inga pour cette ligne
//   { texte: "…", qui: "Zacharias" }                quelqu'un d'autre parle : son nom s'affiche,
//                                                   avec son icône (voir « interlocuteurs » tout en bas)
//   { texte: "…", qui: "" }                         une ligne de narration, sans personne

const dialogues = {

    window: {
        first: "Cela fait si longtemps que je ne suis pas sortie qu'une pile de vêtement et de trucs encombre la porte. Je devrais probablement sortir bientôt, tout est quasiment mort ici. La faim commence à me déchirer le crane.",
        repeat: [
            "Le soleil vient de se lever, je ne vais pas sortir maintenant.",
            "Il y a du bruit dehors, je me demande ce qui se passe."
        ]
    },

    chat: {
        image: "https://i.postimg.cc/yx3hXVzt/image.png",
        first: "Le chat blanc est toujours en vie, et se cache sous une pile de linge et de déchets. Il a l'air affamé et apeuré, je n'ai rien à lui donner pour le moment.",
        repeat: [
            "Je devrais trouver de quoi le nourrir, il refuse de s'approcher, et il y a trop de trucs autour pour que je puisse l'attrapper.",
            "Il a trop peur pour que je l'approche, je ne sais pas ou sont les autres."
        ]
    },


    chair: {
        first: "Une vieille chaise, je l'ai acheté quand j'ai emménagé avec l'argent de l'héritage. Au final, je préfère m'asseoir par terre, et personne ne vient ici pour l'utiliser.",
        repeat: [
            "Elle est vieille et inconfortable.",
            "Je pourrais m'en débarasser pour faire de la place."
        ]
    },

    poster: {
        image: "https://i.postimg.cc/C5LqKScr/image.png",
        first: "Le dernier poster de la chambre, quelqu'un me l'a donné la dernière fois que je suis sortie. Je l'ai accroché proche de la fenetre pour éviter qu'il moisisse",
        repeat: [
            "Il vient d'un magazine, visiblement acheté en 2012.",
            "Je sais que celui qui me l'a offert ne l'a pas fait pour se moquer de moi, ça change."
        ]
    },

    holy: {
        humeur: "degoutee",
        first: "Il y a une mauvaise odeur qui vient ce tas, je ne suis pas sure que ce soit une bonne idée d'y plonger les bras.",
        repeat: [
            "Un léger couinement semble provenir de là.",
            "Je devrais peut-etre faire quelque chose à propos de ça."
        ]
    },

    flesh: {
        first: "Un tas d'orreiller, dont certains volés à l'Elysium traine sur le sol. Je devrais investir dans un lit, mais je n'ai pas envie de faire venir quelqu'un ici pour le livrer.",
        repeat: [
            "Le soleil s'est levé, mais je ne veux pas rentrer en torpeur.",
            "Plus tard."
        ]
    },

    code: {
        first: "On me demande de stocker les donnés des archives, mais je n'ai vraiment pas envie de me mettre au travail.",
        repeat: [
            "Ca ne me concerne pas vraiment.",
            "Je n'ai pas l'energie pour ça."
        ]
    },

    travail: {
        boucle: false,
        first: "Il y a une pile de papier sur laquelle je travaille depuis quelque temps, mais je n'arrive à rien pour l'instant. Je me demande si Il pourrait m'aider.",
        repeat: [
            "Les choses fonctionnent mieux en système de trois, mais je ne crois pas non plus au principe d'alchimie. Il y a quelque chose d'autre.",
            "Nous avons trop évolué pour ne pas impliquer la machine dans le concept même du monde, l'idée de quelque chose qui suit un but, et qui cherche à briser les limites sans les comprendre.",
            "Pas maintenant."
        ]
    },

    // ce qu'Inga dit en éteignant un PC (voir « ordinateurs » dans room.js)
    pc1: {
        first: "Cà fait un moment que je n'ai pas eu de problème informatique, est-ce que les autres sont trop occupés pour me faire chier ? Hm, ça arrange mes affaires en soit.",
        repeat: [
            "Il faudrait vraiment que je pense à nourrir le chat.",
            "Encore quelques heures de jeu et j'irai dormir. Peut-être."
        ]
    },

    pc2: {
        first: "L'autre machine. Elle n'est branchée sur rien, et c'est très bien comme ça.",
        repeat: [
            "Je n'aime pas laisser ces fichiers ouverts trop longtemps."
        ]
    },


    // Les interruptions

    // à la fin de la conversation cachée de vermine.exe
    vermine: {
        humeur: "degoutee",
        lignes: [
            "Un humain m'a filé une clef contenant ce fichier. C'est nul à chier. Les Setites recrutent avec un site qui a l'air codé en 2001 par un prof de yoga.",
            "Et le pire, c'est que ça marche, les gens veulent tellement qu'on leur dise que leur désirs sont une forme de libérté.",
            "Dans l'état des choses, je ne pourrais pas remonter à celui qui l'a fait, il à eu l'intelligence de brouiller les pistes, mais à quand meme une <div> soup.",
            "Ce qui laisse à penser que le look est volontaire, pour leur donner une image `accessible`."
        ]
    },

    // dans la discussion Steam
    zacharias: {
        lignes: [
            "Il rale, mais il n'a bloqué que 4 de mes cinq comptes . . .",
            "Je devrais pouvoir récupérer ce que je cherche bientot, s'il reste trop peu méfiant.",
            "Reste à savoir ce que lui cherche, en continuant à me parler."
        ]
    },


    // ===== LA QUÊTE DU CHAT (voir quete.js) =====

    // le tas, après avoir vu le chat, mais sans rien pour attraper les rats
    tasMainsNues: {
        first: "Ça couine là-dedans. Je plonge le bras… et ils me filent entre les doigts. À mains nues, je n'y arriverai pas. Il me faudrait de quoi les piéger.",
        repeat: [
            "Ils sont trop rapides. Il me faut un sac, quelque chose.",
            "Je ne vais pas fouiller ce tas à mains nues une deuxième fois."
        ]
    },

    // dans le tas d'oreillers, une fois qu'Inga sait qu'il lui faut un sac
    taie: {
        lignes: [
            "Une taie d'oreiller. Volée à l'Elysium, si je me souviens bien.",
            "Ça fera un très bon sac à rats. Ils ne remarqueront rien."
        ]
    },

    // les rats attrapés avec la taie, dans le tas
    rat1: {
        lignes: [
            "Je plonge la taie dans le tas, je la referme d'un coup… Un.",
            "Il s'agite. Encore un, et ce sera bon."
        ]
    },

    rat2: {
        lignes: [
            "Deux. Un pour lui… et un pour moi.",
            "Ce sont sûrement les derniers de l'appartement. Après eux, plus rien ne couinera ici.",
            { texte: "Ils sentent le linge mouillé et la poubelle. Je ne vais pas réfléchir à ce qu'ils ont mangé.", humeur: "degoutee" }
        ]
    },

    // quand on retourne voir le chat avec les rats
    nourrir: {
        lignes: [
            "Viens. Doucement. Celui-là est pour toi.",
            "…Il hésite, puis il mord. Bien.",
            { texte: "Et celui-là, c'est pour moi.", humeur: "degoutee" },
            { texte: "C'est immonde. Le gout est de plus en plus fade, presque comme boire de l'eau croupie.", humeur: "degoutee" },
            "Il n'y a plus de rats, plus qu'un seul chat, et personne n'est venue ici depuis des lustres.",
            "Il faudra que je me débrouille pour en trouver d'autres. Pour sortir, surtout.",
            "Peut etre que je pourrais Le voir, peut etre qu'Il viendrait à ma rencontre.",
            { texte: "Mais non, il préfère aller voir les autres . . . sous pretexte qu'ils sont amis.", humeur: "degoutee" },
            "Je lui suis utile, c'est censé etre mieux, tellement mieux.",
            ". . .",
            ". . .",
            ". . . ?",
            "Le chat sort enfin de sous la pile, laissant une carcasse derrière lui. Il y avait quelque chose coincé derrière lui… une lettre."
        ]
    },

    // le tas, une fois les rats attrapés
    tasVide: {
        first: "Plus rien ne couine là-dedans. Je préfère ne pas savoir ce qui reste au fond.",
        repeat: [
            "Le tas a l'air presque vexé.",
            "Je devrais vraiment faire le ménage. Un jour."
        ]
    },

    // la lettre trouvée derrière le chat (les retours à la ligne sont gardés)
    lettre: `Inga,

9 mois sans nouvelles. Est-ce que tu travailles encore sur les manuscrits ? J'espère que tu n'as pas oublié, je sais que c'est important pour toi.

Ce qui compte, c'est que tu gardes le moral, et que tu puisse continuer à nous donner des informations, c'est le seul moyen qu'on à de t'aider, tu sais.

Quand tu auras le temps, fais un log sur le pc, vraiment n'importe quoi pour l'instant, histoire qu'on sache que tu es en vie.
Ensuite, tu pourras reprendre plus sérieusement, on a pas mal de choses à te montrer, et le combat continue meme sans toi.

Nourris ton chat, débile.

DeadDogs`,

    // dans le terminal du PC 2, quand on ouvre le dossier des logs après avoir lu la lettre
    log: {
        lignes: [
            "Les logs, ils servent à pas mal de chose, mais c'est surtout un moyen pour les autres de savoir qu'on est pas mort.",
            "Quand on fait notre boulot, ça peut arriver à n'importe quel moment.",
            "Je n'ai rien écrit depuis plus d'un ans. Il va me tuer, si quelqu'un d'autre ne le fait pas avant.",
            "Le fichier est déjà là, vide. Il n'y a plus qu'à l'écrire."
        ]
    },

    // dans le terminal, une fois le log écrit
    logEcrit: {
        lignes: [
            "Voilà. DUMBF0UNDED est en vie.",
            "Ca devrais les rassurer."
        ]
    },


    // ===== LA FIN (voir quete.js) =====

    // quand le log est écrit et que tout a été lu : le soleil se lève
    aube: {
        lignes: [
            "La lumière passe sous le carton de la fenêtre, faible et lointaine, mais présente tout de meme. Il doit bien etre 7h, et j'ai trop repoussé la torpeur.",
            "Mes paupières pèsent des tonnes.",
            "Je n'ai rien fais aujourd'hui encore, et je ne pense pas faire plus demain",
            "La torpeur me prend avant que je n'atteigne les oreillers, et je m'éffondre sur le sol."
        ]
    },

    // le texte sur l'écran noir, entre les deux nuits
    nuitSuivante: "La nuit suivante.",

    // La nuit suivante se joue en quatre interruptions, l'une après l'autre (voir jouerLaFin dans quete.js) :
    // le réveil, le chat, l'appel à Zacharias, la sortie.

    // 1. le réveil : le téléphone
    lendemain: {
        lignes: [
            { texte: "Un bourdonnement contre le sol. Le téléphone vibre, s'arrête, recommence.", qui: "" },
            "Le soleil s'est couché il y a plusieurs heures quand j'ouvre les yeux.",
            "Onze appels manqués. Zacharias. Évidemment.",
            "Personne ne m'a vue depuis des mois, alors il appelle pour vérifier. Que je suis encore là. Ou pour être le premier à annoncer que je ne le suis plus.",
            { texte: "Il peut attendre. Je n'ai pas mangé, je ne suis pas d'humeur à supporter un Tremere.", humeur: "degoutee" }
        ]
    },

    // 2. le chat
    repas: {
        lignes: [
            "Rien de nouveau, rien n'a changé, la faim est toujours présente.",
            "Le rat n'a pas suffit, celui d'hier non plus, Il m'avait prévenu, mais je n'ai pas le temps pour ça.",
            "Pas le temps pour la faim, et pas le temps pour trouver quelque chose de convenable pour me nourrir.",
            "A ma droite, le chat est là, roulé en boule contre moi. Il me fait confiance.",
            { texte: ". . .", humeur: "degoutee" },
            "Je ne peux pas sortir dans cet état, j'ai besoin de force.",
            "Désolé petit chat.",
            { texte: "Le sang est chaud. Enfin quelque chose qui ressemble à de la force.", humeur: "degoutee" }
        ]
    },

    // 3. l'appel : Inga rappelle Zacharias
    appel: {
        lignes: [
            "Bon. Rappelons le génie, avant qu'il ne prévienne toute la Pyramide de ma mort.",
            { texte: "Ah. Donc tu existes encore. J'avais parié le contraire, je viens de perdre de l'argent.", qui: "Zacharias" },
            "Onze appels. Si j'étais morte, tu aurais parlé à un cadavre. Ça ne t'aurait pas changé de tes étudiants.",
            { texte: "Charmante, comme toujours. Je n'appelais pas pour prendre de tes nouvelles. C'est le réseau anarch. Ils ont migré.", qui: "Zacharias" },
            "Je sais qu'ils ont migré. C'est moi qui les ai fait migrer. Lil a cliqué sur un lien, évidemment.",
            { texte: "Le nouveau serveur. J'y suis entré cette nuit. Ils parlent encore du port. D'un sixième corps.", qui: "Zacharias" },
            "« C'est toujours six, puis plus rien. » Ils l'ont écrit noir sur blanc, entre deux disputes sur un fichier Excel.",
            { texte: "Le Sabbat chasse dans la ville. Les Anarchs le savent depuis des semaines, et ils n'en ont rien dit à la Cour.", qui: "Zacharias" },
            "Bien sûr qu'ils n'ont rien dit. Ils détestent la Cour presque autant que tu détestes qu'on sache que tu lis leurs blogs.",
            { texte: "Ce qui nous amène au problème. Il faut prévenir les primogènes.", qui: "Zacharias" },
            "« Il faut. » Traduction : toi, tu ne veux pas.",
            { texte: "Si j'apporte ça, on me demandera comment je l'ai obtenu. Et mon sire n'aime pas que je fouille sans son accord.", qui: "Zacharias" },
            { texte: "Donc le grand génie de la Pyramide a peur de se faire gronder.", humeur: "degoutee" },
            { texte: "Inga.", qui: "Zacharias" },
            "Je m'en occupe. Je parlerai aux primogènes. Je leur dirai que j'ai tout trouvé toute seule, évidemment.",
            { texte: "Évidemment.", qui: "Zacharias" },
            "Et la prochaine fois que tu m'appelles avant que j'aie mangé, je publie ton historique de recherche sur le forum de ta Fondation.",
            { texte: "… Bonne nuit, Inga.", qui: "Zacharias" },
            "Elle l'était, avant que tu appelles.",
            { texte: "Elle raccroche.", qui: "" }
        ]
    },

    // 4. la sortie
    sortie: {
        lignes: [
            "Avec cette force supplémentaire, je peux déplacer la pile de meuble qui bloque l'entrée. Le bois craque avant de se briser.",
            "L'air du couloir est froid. Silencieux.",
            { texte: "Je ne serais surement pas la seule dehors ce soir, j'espère ne croiser personne qui me reconnaitrai . . .", humeur: "degoutee" },
            { texte: "Loué soit les villes ou les sous terrains appartiennent aux nosferatu seuls, et pas à absolument tous le monde", humeur: "degoutee" },
            "Les primogènes d'abord. Ils vont adorer me voir débarquer.",
            "Je sors enfin, j'ai à faire."
        ]
    },

    // l'écran de fin
    fin: "FIN — pour l'instant."

};


// les autres personnages qui parlent dans les interruptions (« qui » dans une ligne) : leur icône
const interlocuteurs = {
    "Zacharias": "/img/wiki/tremere/zacharias.png"
};
