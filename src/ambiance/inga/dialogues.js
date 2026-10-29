// LES DIALOGUES DE LA CHAMBRE D'INGA
//
// Les objets (un clic) : first (la première fois), puis repeat (les fois suivantes).
//   Chaque ligne est une bulle ("…"), ou plusieurs bulles qui se suivent (["…", "…", "…"]).
//   Facultatif : image (un objet en gros plan), boucle: false (reste sur la dernière ligne),
//   humeur: "degoutee" pour le sprite dégoûté/surpris (sinon c'est le sprite de base).
//
// Les interruptions et les réactions ont des « lignes » : toutes les bulles, à la suite.
//
// Une bulle peut aussi être un objet :
//   { texte: "…", humeur: "degoutee" }   change le sprite d'Inga pour cette bulle
//   { texte: "…", qui: "Zacharias" }     quelqu'un d'autre parle : son nom et son icône s'affichent
//                                        (voir « interlocuteurs » tout en bas)
//   { texte: "…", qui: "" }              de la narration, sans personne

const dialogues = {

    // ===== SCÈNE 1 =====

    window: {
        first: [
            "Cela fait si longtemps que je ne suis pas sortie qu'une pile de vêtements et de trucs encombre la porte.",
            "Je devrais probablement sortir bientôt. Tout est quasiment mort ici, et la faim commence à me déchirer le crâne.",
            "La fenêtre, je l'ai couverte de carton il y a des années. Je n'en ai pas besoin : je vois mieux la ville à travers ses caméras qu'à travers ce trou dans le mur."
        ],
        repeat: [
            [
                "Le soleil vient de se lever, je ne vais pas sortir maintenant.",
                "De toute façon, il ne se passe rien dehors que je ne puisse lire le lendemain, dans les messages de ceux qui y étaient."
            ],
            [
                "Il y a du bruit dehors. Des sirènes, quelque part vers Konak.",
                "Les mortels appellent ça un fait divers. Les Anarchs en feront un sujet de dispute. La Cour en fera un dossier.",
                "Moi, j'en ferai une ligne dans un fichier. C'est la seule version qui ne mente pas."
            ]
        ]
    },

    chat: {
        image: "https://i.postimg.cc/yx3hXVzt/image.png",
        first: [
            "Le chat blanc est toujours en vie, et se cache sous une pile de linge et de déchets.",
            "Il a l'air affamé et apeuré. Je n'ai rien à lui donner pour le moment.",
            "Ses frères et sœurs ne sont plus là. Les chats de cet appartement ont appris à se débrouiller entre eux, et je préfère ne pas savoir comment."
        ],
        repeat: [
            [
                "Je devrais trouver de quoi le nourrir.",
                "Il refuse de s'approcher, et il y a trop de choses autour pour que je puisse l'attraper."
            ],
            [
                "Il a trop peur pour que je l'approche. Je ne sais pas où sont les autres.",
                "Si, je sais. Je préfère juste ne pas le formuler."
            ]
        ]
    },

    chair: {
        first: [
            "Une vieille chaise. Je l'ai achetée quand j'ai emménagé, avec l'argent de l'héritage.",
            "Mes parents ont laissé une maison vide, quelques dettes, et une boîte de manuscrits que personne ne voulait lire.",
            "J'ai gardé les manuscrits. J'ai acheté une chaise. Au final, je préfère m'asseoir par terre, et personne ne vient ici pour l'utiliser."
        ],
        repeat: [
            [
                "Elle est vieille et inconfortable.",
                "C'est le seul meuble que j'ai choisi. Tout le reste est arrivé tout seul, couche après couche."
            ],
            [
                "Je pourrais m'en débarrasser pour faire de la place.",
                "Mais il faudrait sortir pour la jeter. Elle restera."
            ]
        ]
    },

    poster: {
        image: "https://i.postimg.cc/C5LqKScr/image.png",
        first: [
            "Le dernier poster de la chambre. Quelqu'un me l'a donné, la dernière fois que je suis sortie.",
            "Je l'ai accroché près de la fenêtre pour éviter qu'il moisisse. C'est l'endroit le plus sec de l'appartement, ce qui ne veut pas dire grand-chose."
        ],
        repeat: [
            [
                "Il vient d'un magazine, visiblement acheté en 2012.",
                "Celui qui me l'a donné ne m'a posé aucune question. Ni sur mon visage, ni sur l'odeur. C'est rare."
            ],
            [
                "Je sais que celui qui me l'a offert ne l'a pas fait pour se moquer de moi. Ça change.",
                "Je connais son nom, son adresse, et ses trois mots de passe. C'est ma façon de dire merci : je ne m'en sers pas."
            ]
        ]
    },


    // ===== SCÈNE 2 =====

    holy: {
        humeur: "degoutee",
        first: [
            "Il y a une mauvaise odeur qui vient de ce tas.",
            "Je ne suis pas sûre que ce soit une bonne idée d'y plonger les bras. Même pour moi."
        ],
        repeat: [
            [
                "Un léger couinement semble provenir de là.",
                "Quelque chose vit là-dedans. Plus longtemps que la plupart des choses dans cet appartement."
            ],
            [
                "Je devrais peut-être faire quelque chose à propos de ça.",
                "Pas maintenant. Mais je le note."
            ]
        ]
    },

    flesh: {
        first: [
            "Un tas d'oreillers, dont certains volés à l'Élysium, traîne sur le sol.",
            "Ils sentent encore l'encens et le parfum des Toréador. Ça couvre un peu l'odeur du reste.",
            "Je devrais investir dans un lit. Mais il faudrait faire venir quelqu'un pour le livrer, et personne n'entre ici."
        ],
        repeat: [
            [
                "Le soleil s'est levé, mais je ne veux pas rentrer en torpeur.",
                "Chaque jour où je dors, quelqu'un en ville écrit quelque chose que je n'aurai pas lu en direct."
            ],
            "Plus tard."
        ]
    },

    code: {
        first: [
            "On me demande de stocker les données des archives.",
            "La Cour veut des copies de tout. Des archives des archives. Elle croit que ce qui est stocké est sous contrôle.",
            "Je n'ai vraiment pas envie de me mettre au travail."
        ],
        repeat: [
            [
                "Ça ne me concerne pas vraiment.",
                "Une information gardée par trop de monde n'est plus gardée par personne. Mais personne ne me demande mon avis là-dessus."
            ],
            "Je n'ai pas l'énergie pour ça."
        ]
    },

    travail: {
        boucle: false,
        first: [
            "Il y a une pile de papier sur laquelle je travaille depuis quelque temps.",
            "Je n'arrive à rien pour l'instant. Je me demande si Il pourrait m'aider."
        ],
        repeat: [
            "Les choses fonctionnent mieux en système de trois, mais je ne crois pas non plus au principe d'alchimie. Il y a quelque chose d'autre.",
            [
                "Nous avons trop évolué pour ne pas impliquer la machine dans le concept même du monde.",
                "L'idée de quelque chose qui suit un but, et qui cherche à briser les limites sans les comprendre."
            ],
            "Pas maintenant."
        ]
    },

    // ce qu'Inga dit en éteignant un PC (voir « ordinateurs » dans room.js)
    pc1: {
        first: [
            "Ça fait un moment que je n'ai pas eu de problème informatique à régler pour les autres.",
            "Les Ventrue ne perdent plus leurs mots de passe, les Brujah ne me demandent plus de pirater leurs ex.",
            "Soit la ville est devenue adulte, soit elle a trouvé quelqu'un d'autre. Hm. Ça arrange mes affaires, en soi."
        ],
        repeat: [
            "Il faudrait vraiment que je pense à nourrir le chat.",
            [
                "Encore quelques heures de jeu et j'irai dormir. Peut-être.",
                "Dans les jeux, au moins, les gens font semblant d'avoir un but. C'est reposant."
            ]
        ]
    },

    pc2: {
        first: [
            "L'autre machine. Elle n'est branchée sur rien, et c'est très bien comme ça.",
            "C'est la seule chose dans cet appartement qui n'appartient pas à la Camarilla."
        ],
        repeat: [
            [
                "Je n'aime pas laisser ces fichiers ouverts trop longtemps.",
                "Pas parce que quelqu'un pourrait les lire. Parce que moi, je pourrais les relire."
            ]
        ]
    },


    // ===== LES RÉACTIONS (une seule fois chacune, voir reactionUnique dans quete.js) =====

    // PC 1 : à la fin de la conversation setite de vermine.exe
    vermine: {
        humeur: "degoutee",
        lignes: [
            "Un humain m'a filé une clé contenant ce fichier. C'est nul à chier.",
            "Les Setites recrutent avec un site qui a l'air codé en 2001 par un prof de yoga.",
            "Et le pire, c'est que ça marche. Les gens veulent tellement qu'on leur dise que leurs désirs sont une forme de liberté.",
            { texte: "Ils ne forcent personne. Ils posent des questions, ils attendent, et ils te rendent responsable de chaque réponse. C'est plus efficace qu'une menace.", humeur: "base" },
            { texte: "Dans l'état des choses, je ne pourrais pas remonter à celui qui l'a fait. Il a eu l'intelligence de brouiller les pistes.", humeur: "base" },
            "Mais il a quand même laissé une <div> soup. Ce qui laisse à penser que le look est volontaire, pour leur donner une image « accessible ».",
            { texte: "Je l'archive avec le reste. Je n'ai pas d'avis sur les serpents. Juste sur leur code.", humeur: "base" }
        ]
    },

    // PC 1 : en ouvrant le dossier Anarch
    anarch: {
        lignes: [
            "Le blog des Anarchs. La quatrième version, ou la cinquième. J'ai arrêté de compter les déménagements.",
            "Ils parlent de tout. D'une rotation des terrains de chasse dans un tableau codé par couleur, de l'anniversaire de Lil, de films, du Baron qui lance des trucs de la main gauche.",
            "La Cour les prend pour une menace. Vus d'ici, ils ressemblent surtout à une colocation qui se serait trompée de siècle.",
            "Mais il ne faut pas s'y tromper. Ils voient des choses que la Cour ne voit pas, parce qu'ils vivent là où la Cour ne descend jamais : le port, les bars d'Alsancak, les quais à trois heures du matin.",
            "Six corps sur le port, et ils en parlent comme de la météo. « C'est toujours six, puis plus rien. »",
            "Moi, je n'ai pas d'avis. Je lis, je range. Quelqu'un d'autre décidera si c'est grave."
        ]
    },

    // PC 1 : quand on tape « zacharias » dans la discussion Steam
    zacharias: {
        lignes: [
            "Il râle, mais il n'a bloqué que quatre de mes cinq comptes…",
            "On joue à ce jeu depuis des années. Il essaie de me battre sur mon propre terrain, je le laisse croire qu'il s'en approche.",
            "Je devrais pouvoir récupérer ce que je cherche bientôt, s'il reste aussi peu méfiant.",
            "Reste à savoir ce que lui cherche, en continuant à me parler. Il n'est pas idiot. C'est ce qui rend le jeu intéressant."
        ]
    },

    // PC 2 : en ouvrant les logs du groupe (ashugh\logs)
    log: {
        lignes: [
            "Les logs. Ils servent à pas mal de choses, mais c'est surtout un moyen pour les autres de savoir qu'on n'est pas mort.",
            "Quand on fait notre boulot, ça peut arriver à n'importe quel moment.",
            "Ashugh. Les poètes errants, ceux qui chantaient ce qu'on leur interdisait de dire. On a pris le nom parce qu'il était joli, et parce qu'il était vrai.",
            "Je n'ai rien écrit depuis plus d'un an. Ils doivent se poser des questions. Ou ils ont arrêté de s'en poser, ce qui est pire."
        ]
    },

    // PC 2 : une fois le log écrit
    logEcrit: {
        lignes: [
            "Voilà. DUMBF0UNDED est en vie.",
            "Ça devrait les rassurer. Une ligne datée, quelques informations, et toute une petite équipe dort mieux.",
            "C'est fou, ce que les gens attendent d'un fichier texte."
        ]
    },


    // ===== LA QUÊTE DU CHAT (voir quete.js) =====

    // le tas, après avoir vu le chat, mais sans rien pour attraper les rats
    tasMainsNues: {
        first: [
            "Ça couine là-dedans. Je plonge le bras… et ils me filent entre les doigts.",
            "À mains nues, je n'y arriverai pas. Il me faudrait de quoi les piéger."
        ],
        repeat: [
            "Ils sont trop rapides. Il me faut un sac, quelque chose.",
            "Je ne vais pas fouiller ce tas à mains nues une deuxième fois."
        ]
    },

    // dans le tas d'oreillers, une fois qu'Inga sait qu'il lui faut un sac
    taie: {
        lignes: [
            "Une taie d'oreiller. Volée à l'Élysium, si je me souviens bien.",
            "Brodée main. Quelqu'un, à la Cour, a payé très cher pour qu'elle serve de sac à rats.",
            "Ça me fait plaisir d'une manière que je ne vais pas analyser."
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
            { texte: "C'est immonde. Le goût est de plus en plus fade, presque comme boire de l'eau croupie.", humeur: "degoutee" },
            "Il n'y a plus de rats, plus qu'un seul chat, et personne n'est venu ici depuis des lustres.",
            "Il faudra que je me débrouille pour en trouver d'autres. Pour sortir, surtout.",
            "Peut-être que je pourrais Le voir. Peut-être qu'Il viendrait à ma rencontre.",
            { texte: "Mais non. Il préfère aller voir les autres… sous prétexte qu'ils sont amis.", humeur: "degoutee" },
            "Je lui suis utile. C'est censé être mieux. Tellement mieux.",
            ". . .",
            ". . .",
            ". . . ?",
            "Le chat sort enfin de sous la pile, laissant une carcasse derrière lui. Il y avait quelque chose coincé derrière lui… une lettre."
        ]
    },

    // le tas, une fois les rats attrapés
    tasVide: {
        first: [
            "Plus rien ne couine là-dedans.",
            "Je préfère ne pas savoir ce qui reste au fond."
        ],
        repeat: [
            "Le tas a l'air presque vexé.",
            "Je devrais vraiment faire le ménage. Un jour."
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
            "La lumière passe sous le carton de la fenêtre. Faible, lointaine, mais présente tout de même.",
            "Il doit bien être sept heures, et j'ai trop repoussé la torpeur.",
            "Mes paupières pèsent des tonnes.",
            "Je n'ai rien fait aujourd'hui encore, et je ne pense pas faire plus demain.",
            "La torpeur me prend avant que je n'atteigne les oreillers, et je m'effondre sur le sol."
        ]
    },

    // le texte sur l'écran noir, entre les deux nuits
    nuitSuivante: "La nuit suivante.",

    // La nuit suivante se joue en quatre moments, l'un après l'autre (voir jouerLaFin dans quete.js) :
    // le réveil, le repas, l'appel de Zacharias, la sortie.

    // 1. le réveil : Zacharias a appelé
    lendemain: {
        lignes: [
            { texte: "Un bourdonnement contre le carrelage. Le téléphone vibre, s'arrête, recommence.", qui: "" },
            "Le soleil s'est couché il y a plusieurs heures quand j'ouvre les yeux.",
            "Je suis restée là où je suis tombée, la joue contre le sol, entre deux boîtes de nouilles que je ne me souviens pas avoir achetées.",
            "Onze appels manqués. Zacharias.",
            "Ça fait des mois que personne ne m'a vue. Pas en vrai. Une webcam, une voix, un fichier sur un serveur : c'est tout ce qui prouve que j'existe encore.",
            "Il suffit que je me taise quelques semaines pour que la ville se demande si je suis encore là. Zacharias est le seul qui appelle pour vérifier.",
            "Il ne l'avouera jamais. Moi non plus, je ne l'avouerais pas à sa place.",
            "Il attendra. Je n'ai pas mangé."
        ]
    },

    // 2. le repas : le chat
    repas: {
        lignes: [
            "Rien de nouveau, rien n'a changé. La faim est toujours là, tapie derrière les yeux, patiente comme un créancier.",
            "Le rat n'a pas suffi. Celui d'hier non plus. Il m'avait prévenue, mais je n'ai pas le temps pour ça.",
            "Pas le temps pour la faim, et pas le temps de trouver quelque chose de convenable pour me nourrir.",
            "Il y a toujours un serveur à surveiller, une conversation à archiver. La ville parle sans arrêt, et quelqu'un doit l'écouter.",
            "Mon père écrivait pour qu'on se souvienne de nous. Moi, je garde tout : les conversations des autres, leurs mensonges, leurs anniversaires.",
            "Je me souviens de toute la ville. Je ne suis pas sûre que la ville se souvienne de moi. Ce n'est pas grave. Ce n'est pas mon travail.",
            "À ma droite, le chat est là, roulé en boule contre moi. Il me fait confiance, parce que je suis la seule chose chaude dans cet appartement.",
            { texte: ". . .", humeur: "degoutee" },
            "Je ne peux pas sortir dans cet état. J'ai besoin de force.",
            "Désolée, petit chat.",
            { texte: "Le sang est chaud. Enfin quelque chose qui ressemble à de la force.", humeur: "degoutee" }
        ]
    },

    // 3. l'appel : Inga rappelle Zacharias. Ils jouent à se taper sur les nerfs, sans haine.
    appel: {
        lignes: [
            "Bon. Rappelons-le, avant qu'il n'envoie une goule frapper à ma porte. Elle ne passerait pas la porte, de toute façon.",
            { texte: "Onze appels, Inga. Onze. J'avais commencé à rédiger ta nécrologie. Sobre, élégante. Légèrement condescendante.", qui: "Zacharias" },
            "Tu aurais dû la publier. J'aurais adoré corriger tes fautes.",
            { texte: "Je ne fais pas de fautes. Je fais des choix stylistiques.", qui: "Zacharias" },
            "C'est ce que disent tous les gens qui font des fautes.",
            { texte: "Bref. Les Anarchs ont encore déménagé leur blog. Tu l'as vu ?", qui: "Zacharias" },
            "Je l'ai vu avant eux. Quelqu'un a cliqué sur un lien qu'il n'aurait pas dû, quelqu'un d'autre a paniqué, et ils ont tout déplacé en une nuit.",
            { texte: "Nous avons retrouvé le nouveau serveur en quatre jours.", qui: "Zacharias" },
            "Trois et demi. Je compte mieux que toi.",
            { texte: "Le problème n'est pas de les retrouver. C'est ce qu'on remonte dans le filet.", qui: "Zacharias" },
            { texte: "Plus de scripts, plus de goules dans les bars d'Alsancak, plus de nuits passées à trier. Chaque migration nous coûte un peu plus.", qui: "Zacharias" },
            { texte: "Et qu'est-ce qu'on récupère ? Des anniversaires. Des recommandations de films. Un tableau des terrains de chasse, codé par couleur.", qui: "Zacharias" },
            "Et l'homme en costume qui regarde la station Konak depuis un bar. Et les six corps du port. Ce n'est pas rien.",
            { texte: "Ce n'est pas rien. Mais c'est noyé dans tout le reste. On creuse trop large, on ramasse tout et n'importe quoi.", qui: "Zacharias" },
            "Alors on resserre.",
            { texte: "Sur quoi ? Le port ? Konak ? Le Baron ? Ce n'est pas à nous de choisir. C'est au Conseil de nous dire ce qui compte.", qui: "Zacharias" },
            { texte: "Et c'est là que tu interviens. Parle aux primogènes. Demande-leur sur quoi ils veulent qu'on se concentre.", qui: "Zacharias" },
            "Moi ? Parler à des gens ? Tu m'as vraiment crue morte, tu me confonds avec quelqu'un d'autre.",
            { texte: "Ils t'écoutent. Ils ne t'aiment pas, mais ils t'écoutent. Moi, ils me demandent d'où viennent mes informations, et sur quel budget.", qui: "Zacharias" },
            "Donc la Pyramide ne sait pas tout ce que tu fais. Je suis presque fière de toi.",
            { texte: "La Pyramide sait ce qu'elle a besoin de savoir.", qui: "Zacharias" },
            "Bon. Je leur parlerai. C'est mon projet de toute façon, tu n'as fait que l'améliorer.",
            { texte: "« Améliorer ». Je note que tu l'as dit.", qui: "Zacharias" },
            "Ne t'habitue pas. Et Il sera au courant, de toute façon. Il est toujours au courant.",
            { texte: "Évidemment. J'ai renoncé depuis longtemps à me demander comment.", qui: "Zacharias" },
            "C'est la chose la plus intelligente que tu aies dite ce soir.",
            { texte: "Bonne nuit, Inga. Ne meurs pas avant d'avoir parlé au Conseil. Ta nécrologie n'est pas finie.", qui: "Zacharias" },
            "Bonne nuit, Zacharias. Garde-la au chaud.",
            { texte: "Elle raccroche. Elle sourit presque.", qui: "" }
        ]
    },

    // 4. la sortie
    sortie: {
        lignes: [
            "Si je dois parler aux primogènes, ce sera le ventre plein. Un rat et un chat ne font pas un repas, et une Nosferatu affamée au téléphone avec le Conseil, ça finit mal pour tout le monde.",
            "Avec cette force supplémentaire, je peux déplacer la pile de meubles qui bloque l'entrée. Le bois craque avant de se briser.",
            "L'air du couloir est froid. Silencieux.",
            { texte: "Je ne serai sûrement pas la seule dehors ce soir. J'espère ne croiser personne qui me reconnaîtrait…", humeur: "degoutee" },
            { texte: "Loués soient les villes où les souterrains appartiennent aux Nosferatu seuls, et pas à absolument tout le monde.", humeur: "degoutee" },
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
