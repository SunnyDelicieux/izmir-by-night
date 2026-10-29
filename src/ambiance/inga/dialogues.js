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

    // après avoir ouvert vermine.exe sur le PC 1 (voir eteindrePC dans room.js)
    vermine: {
        humeur: "degoutee",
        first: "Un humain m'a envoyé ce lien en jurant que ça allait « changer ma vie ». C'est nul à chier. Les Setites recrutent avec un site qui a l'air codé en 2004 par un prof de yoga.",
        repeat: [
            "Et le pire, c'est que ça marche. Les gens veulent tellement qu'on leur dise que leurs pires envies sont une forme de liberté.",
            "Je devrais signaler ce site à quelqu'un. Mais qui ? Le Prince ? Il va me demander comment je l'ai trouvé."
        ]
    }

};
