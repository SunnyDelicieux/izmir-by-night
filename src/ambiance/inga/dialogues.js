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

    // La nuit suivante se joue en cinq interruptions, l'une après l'autre (voir jouerLaFin dans quete.js) :
    // le réveil, le chat, l'appel à Zacharias, l'appel au Conseil, la sortie.

    // 1. le réveil : le téléphone
    lendemain: {
        lignes: [
            { texte: "Un bourdonnement contre le carrelage. Le téléphone vibre, s'arrête, recommence. Quelqu'un, quelque part, a décidé que ma nuit commencerait maintenant.", qui: "" },
            "Le soleil s'est couché il y a plusieurs heures quand j'ouvre les yeux. Je suis restée là où je suis tombée, la joue contre le sol, entre deux boîtes de nouilles que je ne me souviens pas avoir achetées.",
            "Onze appels manqués. Zacharias. Évidemment.",
            "Ça fait des mois que personne ne m'a vue. Pas en vrai. Une webcam, une voix, un fichier qui apparaît sur un serveur : c'est tout ce qui prouve que j'existe encore. Il suffit que je me taise trois semaines pour que la ville commence à parler de moi au passé.",
            "Je pourrais les laisser faire. Ce serait reposant, d'être morte. Personne n'attend rien d'un cadavre.",
            "Mais je connais Zacharias. Il n'appelle pas pour savoir si je vais bien. Il appelle pour être le premier à savoir si je ne vais plus bien du tout. Il a toujours voulu ma place, il n'a juste jamais eu le courage de la prendre pendant que j'y étais assise.",
            { texte: "Il peut attendre. Je n'ai pas mangé, et je ne suis pas d'humeur à supporter un Tremere à jeun.", humeur: "degoutee" }
        ]
    },

    // 2. le chat
    repas: {
        lignes: [
            "Rien de nouveau, rien n'a changé. La faim est toujours là, tapie derrière les yeux, patiente comme un créancier.",
            "Le rat n'a pas suffi. Celui d'hier non plus. Il m'avait prévenue, que ça ne suffirait jamais, que la Bête se souvient de chaque repas qu'on lui refuse. Mais je n'ai pas le temps pour ça.",
            "Pas le temps pour la faim, pas le temps pour chasser, pas le temps pour trouver quelque chose de convenable. Il y a toujours un serveur à surveiller, une conversation à archiver, quelqu'un à qui il faut rappeler qu'on le regarde.",
            "Mon père écrivait pour qu'on se souvienne de nous. Moi, je garde tout : les conversations des autres, leurs mensonges, leurs anniversaires, leurs tableaux Excel. Je me souviens de toute la ville. Je ne suis pas sûre que la ville se souvienne de moi.",
            "A ma droite, le chat est là, roulé en boule contre moi. Il a dormi ici toute la journée. Il me fait confiance, parce que je suis la seule chose chaude dans cet appartement. Ce qui est drôle, quand on y pense.",
            { texte: ". . .", humeur: "degoutee" },
            "Je ne peux pas sortir dans cet état. Si la Bête me prend dans le couloir, ce ne sera pas un chat qu'elle trouvera, ce sera la voisine du dessous. J'ai besoin de force. Maintenant.",
            "Désolée, petit chat. Les bonnes personnes meurent en premier. Toi, tu étais juste au mauvais endroit.",
            { texte: "Le sang est chaud. Enfin quelque chose qui ressemble à de la force. Je déteste à quel point c'est bon.", humeur: "degoutee" }
        ]
    },

    // 3. l'appel : Inga rappelle Zacharias
    appel: {
        lignes: [
            "Bon. Rappelons le génie, avant qu'il ne prévienne toute la Fondation de ma mort et ne réclame mes serveurs.",
            { texte: "Ah. Tu existes encore. Je commençais à préparer un discours, quelque chose de sobre. Tu m'as fait perdre une soirée d'écriture.", qui: "Zacharias" },
            "Onze appels, Zacharias. Si j'étais morte, tu aurais parlé onze fois à un cadavre. Remarque, ça ne t'aurait pas trop changé de tes étudiants.",
            { texte: "Charmante, comme toujours. Je n'appelais pas pour ta santé. Les Anarchs ont encore migré. Nouveau blog, nouveau serveur, et cette fois-ci quelqu'un chez eux a lu un tutoriel de sécurité.", qui: "Zacharias" },
            "Je sais. Lil a cliqué sur un lien qu'il n'aurait pas dû, Rollin a paniqué, le Baron a tapé du poing. Ils ont tout déménagé en une nuit. C'était presque attendrissant.",
            { texte: "Nous les avons retrouvés en quatre jours. Ce n'est pas le problème. Le problème, c'est ce qu'on remonte dans le filet.", qui: "Zacharias" },
            { texte: "J'ai trois scripts qui croisent leurs pseudonymes, deux goules qui passent leurs nuits dans les bars d'Alsancak, et des giga-octets de conversations. Un anniversaire. Des recommandations de films. Une vidéo de Kostas qu'ils se revendent. Un tableau de rotation des terrains de chasse, codé par couleur.", qui: "Zacharias" },
            "Et quelque part là-dedans, un homme en costume qui regarde la station Konak depuis un bar, et six corps sur le port. « C'est toujours six, puis plus rien. » Ils l'ont écrit entre deux disputes sur le daltonisme de Lil.",
            { texte: "Voilà. On a peut-être une piste. Mais chaque nuit, ça coûte plus : plus de machines, plus de goules, plus d'heures. On creuse trop large. On ramasse tout et n'importe quoi, et on finira par se noyer dans leur bruit, ce qui est précisément ce qu'ils veulent.", qui: "Zacharias" },
            "Alors il faut resserrer. Choisir. Le port, l'homme de Konak, ou le Baron. Pas les trois.",
            { texte: "Ce n'est pas à nous de choisir. En théorie, c'est le Conseil qui décide de ce qui compte pour la ville. Nous ne sommes que des outils.", qui: "Zacharias" },
            "Parle pour toi. Donc, tu vas les appeler ?",
            { texte: "Si je leur apporte ça, ils me demanderont comment je l'ai obtenu, avec quelles ressources, et sur ordre de qui. Mon sire n'aime pas que la Pyramide découvre ce que je fais en même temps que le reste de la ville.", qui: "Zacharias" },
            { texte: "Donc le grand génie de la Fondation a peur de se faire gronder.", humeur: "degoutee" },
            { texte: "J'ai le sens de la hiérarchie. C'est une notion qui t'échappe, je sais.", qui: "Zacharias" },
            "Je m'en occupe. Je les appelle. C'est mon projet de toute façon, c'est moi qui ai ouvert leur réseau en premier, tu n'as fait que suivre le chemin que j'avais tracé.",
            "Mais je ne mentirai pas pour toi. Je dirai que tu y as participé. Que tes scripts sont bons. Si quelqu'un doit te tirer les oreilles, ce ne sera pas moi qui tiendrai le ciseau.",
            { texte: "… C'est presque gentil. Tu es sûre que tu as bien mangé ?", qui: "Zacharias" },
            "Et Il aura son mot à dire, de toute façon. Il a toujours son mot à dire. Même quand il ne dit rien.",
            { texte: "Atam fera ce qu'Atam fait. Je ne prétends pas comprendre ton sire, et je n'ai pas l'intention d'essayer. Ce n'est pas mon domaine.", qui: "Zacharias" },
            "Personne ne le comprend. C'est un peu le principe.",
            { texte: "Bonne nuit, Inga. Essaie de ne pas mourir avant la réunion, j'ai encore besoin de toi pour te battre.", qui: "Zacharias" },
            "Elle l'était, avant que tu appelles.",
            { texte: "Elle raccroche.", qui: "" }
        ]
    },

    // 4. l'appel au Conseil : Inga parle aux primogènes, par téléphone
    conseil: {
        lignes: [
            "Maintenant, le Conseil. Pas question d'aller à l'Élysium. Je n'ai pas l'intention de traverser la ville pour qu'on me regarde comme une tache sur un tapis.",
            { texte: "Le Héraut accepte d'ouvrir une ligne. Une à une, des respirations s'ajoutent à l'appel. Personne ne se présente : ils savent tous qui appelle.", qui: "" },
            { texte: "Inga. Nous ne savions plus si nous devions encore t'attendre.", qui: "Sophia" },
            "Je sais. Désolée pour ceux qui avaient parié sur ma mort. Ils peuvent réclamer leur argent à Zacharias, il gère très bien les pertes.",
            "Je serai brève, vous n'aimez pas m'entendre et je n'aime pas parler. Les Anarchs ont changé de serveur. Nous les avons retrouvés. Nous lisons tout ce qu'ils écrivent, encore.",
            "Je dis « nous », parce que Zacharias y a travaillé avec moi. Ses scripts, ses goules, ses heures. Il ne voulait pas vous appeler lui-même. Je ne vais pas vous expliquer pourquoi, vous connaissez la Pyramide mieux que moi.",
            "Ce qu'on a trouvé : un homme en costume qui surveille la station Konak, que même les Anarchs ne savent pas placer. Et six corps sur le port, déchirés. Eux disent : six, puis plus rien. Eux disent : le Sabbat. Ils ne vous l'ont pas dit, évidemment. Ils préfèrent mourir que de vous rendre service.",
            "Le problème, c'est qu'on ramasse tout. Leurs disputes, leurs anniversaires, leurs films. Ça coûte des machines, des goules et des nuits, et plus on écoute, moins on entend.",
            "Alors dites-nous ce qui compte. Le port. Konak. Le Baron. Choisissez. C'est votre travail, pas le mien. Moi, je trouve. Vous, vous décidez quoi faire de ce que je trouve.",
            { texte: "Un silence. Quelqu'un tousse. Quelqu'un d'autre, sans doute, prend des notes qu'il ne relira jamais.", qui: "" },
            { texte: "Nous en discuterons. Merci, Inga. La ville t'est… reconnaissante.", qui: "Sophia" },
            "Elle ne l'est pas. Mais c'est gentil de faire semblant. Vous avez jusqu'à la nuit prochaine. Après, je choisis seule, et vous n'aimerez pas ce que je choisirai.",
            { texte: "Elle raccroche avant qu'on puisse lui répondre.", qui: "" }
        ]
    },

    // 5. la sortie
    sortie: {
        lignes: [
            "Avec cette force nouvelle, je peux déplacer la pile de meubles qui bloque l'entrée. Le bois craque avant de se briser. Neuf mois de déchets s'effondrent dans le couloir comme une digue qui lâche.",
            "L'air du couloir est froid. Silencieux. Il sent la javel et le chou des voisins, et c'est la plus belle odeur que j'ai sentie depuis longtemps.",
            { texte: "Je ne serai sûrement pas la seule dehors ce soir. J'espère ne croiser personne qui me reconnaîtrait. Ou pire, quelqu'un qui voudrait discuter.", humeur: "degoutee" },
            { texte: "Loués soient les villes où les souterrains appartiennent aux Nosferatu seuls, et pas à absolument tout le monde.", humeur: "degoutee" },
            "D'abord, manger quelque chose qui ne ronronne pas. Ensuite, le travail. Il y a toujours du travail.",
            "Je sors enfin. J'ai à faire."
        ]
    },

    // l'écran de fin
    fin: "FIN — pour l'instant."

};


// les autres personnages qui parlent dans les interruptions (« qui » dans une ligne) : leur icône
const interlocuteurs = {
    "Zacharias": "/img/wiki/tremere/zacharias.png",
    "Sophia": "/img/wiki/tremere/sophia.png"
};
