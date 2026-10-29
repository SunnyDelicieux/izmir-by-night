// Chaque dialogue : first (la première fois), repeat (les fois suivantes).
// Facultatif : image (un objet en gros plan), boucle: false (reste sur la dernière phrase),
// humeur: "degoutee" pour le sprite dégoûté/surpris (sinon c'est le sprite de base).

const dialogues = {

    window: {
        first: "Cela fait si longtemps que je ne suis pas sortie qu'une pile de vêtement et de trucs encombre la porte. Je devrais probablement sortir bientôt, tout est quasiment mort ici.",
        repeat: [
            "Le soleil vient de se lever, je ne vais pas sortir maintenant.",
            "Il y a du bruit dehors, je me demande ce qui se passe."
        ]
    },

    chat: {
        image: "https://i.postimg.cc/yx3hXVzt/image.png",
        first: "Le chat blanc est toujours en vie, et se cache sous une pile de linge et de déchets. Il a l'air affamé et apeuré, je n'ai rien à lui donner pour le moment.",
        repeat: [
            "Je devrais trouver de quoi le nourrir.",
            "Il a trop peur pour que je l'approche."
        ]
    },

    
    chair: {
        first: "Une vieille chaise, je l'ai acheté quand j'ai emménagé avec l'argent de l'héritage. Au final, je préfère m'asseoir par terre, et personne ne vient ici pour l'utiliser.",
        repeat: [
            "Elle est vieille et inconfortable.",
            "Je pourrais m'en débarasser pour faire de la place.",        ]
    },

    poster: {
        image: "https://i.postimg.cc/C5LqKScr/image.png",
        first: "Le dernier poster de la chambre, quelqu'un me l'a donné la dernière fois que je suis sortie. Je l'ai accroché proche de la fenetre pour éviter qu'il moisisse",
        repeat: [
            "Il vient d'un magazine, visiblement acheté en 2012.",
            "Je sais que celui qui me l'a offert ne l'a pas fait pour se moquer de moi, ça change.",        ]
    },

    holy: {
        humeur: "degoutee",
        first: "Il y a une mauvaise odeur qui vient ce tas, je ne suis pas sure que ce soit une bonne idée d'y plonger les bras.",
        repeat: [
            "Un léger couinement semble provenir de là.",
            "Je devrais peut-etre faire quelque chose à propos de ça.",
        ]
    },

    flesh: {
        first: "Un tas d'orreiller, dont certains volés à l'Elysium traine sur le sol. Je devrais investir dans un lit, mais je n'ai pas envie de faire venir quelqu'un ici pour le livrer.",
        repeat: [
            "Le soleil s'est levé, mais je ne veux pas rentrer en torpeur.",
            "Plus tard.",
        ]
    },

    code: {
        first: "On me demande de stocker les donnés des archives, mais je n'ai vraiment pas envie de me mettre au travail.",
        repeat: [
            "Ca ne me concerne pas vraiment.",
            "Je n'ai pas l'energie pour ça.",
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
        first: "Mon ordinateur. Il ne s'éteint jamais vraiment, il attend juste que je revienne.",
        repeat: [
            "Il faudrait vraiment que je pense à nourrir le chat.",
            "Encore quelques heures de jeu et j'irai dormir. Peut-être."
        ]
    },

    pc2: {
        first: "L'autre machine. Elle n'est branchée sur rien d'autre, et c'est très bien comme ça.",
        repeat: [
            "Je n'aime pas laisser ces fichiers ouverts trop longtemps.",
            "Personne ne doit savoir ce qu'il y a là-dessus."
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
            { texte: "C'est immonde. Ça a le goût de la poussière, de la peur et des câbles électriques.", humeur: "degoutee" },
            "Il n'y a plus de rats. La prochaine fois, ce sera lui. Mon dernier chat.",
            "Il faudra que je me débrouille pour en trouver d'autres. Pour sortir, déjà.",
            "Je suis sacrément isolée, ces derniers temps.",
            "Le chat sort enfin de sous la pile. Il y avait quelque chose coincé derrière lui… une lettre."
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

Trois semaines sans nouvelles. Varto pense que tu es morte, Siran pense que tu boudes. Moi je pense que tu travailles, et que tu as encore oublié le reste du monde.

Il nous faut un log. Tout ce que tu as récupéré depuis la dernière fois, propre, daté, sur la machine du fond, avec les autres. Pas de copie ailleurs.

Le mot de passe n'a pas changé. Tu le laisses toujours ouvert sur ton bureau, idiote.

Nourris ton chat.

— Aram`,

    // dans le terminal du PC 2, quand on ouvre le dossier des logs après avoir lu la lettre
    log: {
        lignes: [
            "Les logs. Aram attend le prochain.",
            "Je n'ai rien écrit depuis des semaines. Il va me tuer, si quelqu'un d'autre ne le fait pas avant.",
            "Le fichier est déjà là, vide. Il n'y a plus qu'à l'écrire."
        ]
    },

    // dans le terminal, une fois le log écrit
    logEcrit: {
        lignes: [
            "Voilà. Daté, propre, pas de copie ailleurs. Aram n'aura rien à redire.",
            "Pour une fois."
        ]
    },


    // ===== LA FIN (voir quete.js) =====

    // quand le log est écrit et que tout a été lu : le soleil se lève
    aube: {
        lignes: [
            "La lumière passe sous le carton de la fenêtre. Le soleil s'est levé, trop haut, trop vite.",
            "J'ai trop traîné. Mes paupières pèsent des tonnes.",
            "La torpeur me prend avant que je n'atteigne les oreillers."
        ]
    },

    // le texte sur l'écran noir, entre les deux nuits
    nuitSuivante: "La nuit suivante.",

    lendemain: {
        lignes: [
            "La faim est revenue. Le rat n'a pas suffi, évidemment.",
            "Il est là, roulé en boule contre moi. Il me fait confiance.",
            { texte: "Pardon.", humeur: "degoutee" },
            "Le sang est chaud. Enfin quelque chose qui ressemble à de la force.",
            "La pile devant la porte cède d'un seul coup d'épaule. Vêtements, cartons, déchets… tout part.",
            "L'air du couloir est froid. Je sors."
        ]
    },

    // l'écran de fin
    fin: "FIN — pour l'instant."

};
