// LES DIALOGUES DE LA CHAMBRE D'INGA
//
// Les objets (un clic) :
//   first  : le premier clic, un dialogue plus long (plusieurs bulles : ["…", "…", "…"]) ;
//   repeat : les clics suivants, deux répliques courtes qui tournent en boucle.
//   Facultatif : image (un objet en gros plan), humeur: "degoutee" (le sprite dégoûté/surpris).
//
// Les interruptions et les réactions ont des « lignes » : toutes les bulles, à la suite.
//   Facultatif : telephone: true pour afficher le téléphone d'Inga pendant la conversation.
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
            "La porte. Enfin, ce qu'on en devine derrière la pile.",
            "Ça fait si longtemps que je suis pas sortie que les fringues ont formé une sorte de récif. Un écosystème. Faudrait le déclarer à l'UNESCO.",
            "Le carton sur la fenêtre date de… 2008 ? 2009 ? Le scotch a jauni, le carton a gondolé. Il tient quand même. Respect.",
            "Je devrais probablement sortir bientôt. Tout est quasiment mort ici, et la faim commence à me déchirer le crâne.",
            "… Bon. Pas ce soir."
        ],
        repeat: [
            "Pas ce soir.",
            "Dehors, c'est surfait. Y a même pas mon wifi."
        ]
    },

    chat: {
        image: "https://i.postimg.cc/yx3hXVzt/image.png",
        first: [
            "Le chat blanc. Toujours vivant, planqué sous la pile de linge. Gg.",
            "Il me regarde comme si j'allais le bouffer. Vu le contexte, c'est une lecture assez lucide de la situation.",
            "Il avait des frères et sœurs. Il en a plus. J'ai pas posé de questions, il a pas donné de détails. On a un accord.",
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
            "Je m'assois jamais dessus. Le sol est plus honnête. Personne vient ici pour l'utiliser, alors elle sert de portemanteau à des trucs que j'ose plus soulever."
        ],
        repeat: [
            "Elle me juge. Je le sens.",
            "Chaise. Tu sers à rien. On est pareilles."
        ]
    },

    poster: {
        image: "https://i.postimg.cc/C5LqKScr/image.png",
        first: [
            "Le dernier poster survivant. Les autres ont moisi un par un, comme dans un slasher pour papier.",
            "Quelqu'un me l'a filé la dernière fois que je suis sortie. Arraché d'un magazine de 2012, plié en quatre.",
            "Il m'a pas demandé ce qui était arrivé à mon visage. Il a rien dit sur l'odeur. Il me l'a juste donné, et il est reparti.",
            "Je l'ai accroché près de la fenêtre. C'est l'endroit le plus sec de l'appart. C'est là que je mets les trucs que je veux garder.",
            "Y en a pas beaucoup."
        ],
        repeat: [
            "2012. Une bonne année. Pour les posters.",
            "Je connais toujours ses mots de passe. Je m'en sers pas. C'est ma version d'un merci."
        ]
    },


    // ===== SCÈNE 2 =====

    holy: {
        humeur: "degoutee",
        first: [
            "Ce tas. Il a une odeur. Non, pas une odeur : une personnalité.",
            "Je suis à peu près sûre qu'il y a des boîtes de 2009 là-dessous. Peut-être une civilisation.",
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
            "Personne remarque quand un oreiller disparaît d'un salon. Ils remarquent quand quelqu'un s'assoit mal, quand quelqu'un rit trop fort. Pas ça.",
            "Ils sentent encore l'encens et le parfum de riche. Ça couvre un peu le reste.",
            "Faudrait que je m'achète un vrai lit. Mais il faudrait qu'un livreur monte, qu'il voie l'appart, qu'il voie ma tête. Non merci."
        ],
        repeat: [
            "Plus tard, la torpeur.",
            "Ils sentent toujours le Toréador. Dommage."
        ]
    },

    code: {
        first: [
            "La demande d'archivage. Encore.",
            "Ils veulent que je stocke les données des archives. Des copies des copies. Trois serveurs, deux sauvegardes, un disque dur dans un coffre, au cas où.",
            "Comme si un secret gardé par vingt personnes restait un secret. Mdr.",
            "J'ai vraiment pas envie de m'y mettre."
        ],
        repeat: [
            "Ça peut attendre. Ça attend depuis mars.",
            "Demain. Peut-être."
        ]
    },

    travail: {
        first: [
            "Il y a une pile de papier sur laquelle je travaille depuis un moment. J'arrive à rien.",
            "Les choses fonctionnent mieux en système de trois, mais je ne crois pas non plus au principe d'alchimie. Il y a quelque chose d'autre.",
            "Nous avons trop évolué pour ne pas impliquer la machine dans le concept même du monde. L'idée de quelque chose qui suit un but, et qui cherche à briser les limites sans les comprendre.",
            "Je me demande si Il pourrait m'aider.",
            "… Il répondrait à côté. Il répond toujours à côté."
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
            "Personne a perdu son mot de passe. Personne a cliqué sur une pièce jointe louche. Personne m'a demandé de pirater son ex.",
            "Soit la ville est devenue adulte, soit elle a trouvé quelqu'un d'autre.",
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
            "La seule chose dans cet appart que la Camarilla pourra jamais lire. Même Zacharias. Surtout Zacharias.",
            "Y a des noms dessus. Des gens qui m'écrivent une fois tous les six mois pour vérifier que je respire encore.",
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
            "« Libère-toi. » « Personne ne t'a forcé. » Ils ont lu un livre de développement personnel et ils ont remplacé « toi » par « Set ».",
            "Et le pire, c'est que ça marche. Les gens veulent tellement qu'on leur dise que leurs désirs sont une forme de liberté.",
            { texte: "Pas moyen de remonter à celui qui l'a fait. Pistes brouillées, proxys, tout le tralala. Presque respectable.", humeur: "base" },
            { texte: "Mais il a quand même laissé une <div> soup. Personne d'aussi prudent code aussi mal par accident. Le côté moche, c'est voulu. Ça fait « accessible ».", humeur: "base" },
            { texte: "… Ça fait aussi un peu 2004. J'ai presque la nostalgie.", humeur: "base" }
        ]
    },

    // PC 1 : en ouvrant le dossier Anarch
    anarch: {
        lignes: [
            "Le blog des Anarchs. Version quatre. Ou cinq. Ils déménagent plus souvent que Sun.",
            "Lil veut un anniversaire. Rollin veut un tableau Excel. Le Baron veut qu'on arrête de l'appeler en majuscules.",
            "C'est la seule série que je suis encore. Pas de saison deux annoncée, mais elle se renouvelle toute seule.",
            "Et entre deux engueulades, un truc comme ça : six corps sur le port. « C'est toujours six, puis plus rien. » Posté comme une recette de cuisine.",
            "Ils voient des trucs que la Cour verra jamais. La Cour descend pas sur le port à trois heures du matin.",
            "Ils savent pas que je les lis. Ou ils savent, et ils s'en foutent. Je sais pas ce qui est le plus vexant."
        ]
    },

    // PC 1 : quand on tape « zacharias » dans la discussion Steam
    zacharias: {
        lignes: [
            "Il râle, mais il n'a bloqué que quatre de mes cinq comptes…",
            "Le cinquième s'appelle xX_Zach_Fan_Xx. Il le sait. Il le garde quand même.",
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
            "Je plonge le bras dans le tas… Un truc me file entre les doigts. Puis un deuxième.",
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
            "Une taie d'oreiller. Brodée main. Volée à l'Élysium.",
            "Quelque part, un Toréador a payé une fortune pour que ça finisse en sac à rats.",
            "Ça me fait plaisir d'une façon que je vais pas analyser."
        ]
    },

    // les rats attrapés avec la taie, dans le tas
    rat1: {
        lignes: [
            "Taie dans le tas. Je referme d'un coup.",
            "… Un.",
            "Il gigote. Encore un et c'est bon."
        ]
    },

    rat2: {
        lignes: [
            "Deux. Un pour lui, un pour moi.",
            "Sûrement les derniers de l'appart. Après eux, plus rien couinera ici. Même pas moi.",
            { texte: "Ils sentent le linge mouillé et la poubelle. Je vais pas réfléchir à ce qu'ils ont mangé.", humeur: "degoutee" }
        ]
    },

    // quand on retourne voir le chat avec les rats
    nourrir: {
        lignes: [
            "Viens. Doucement. Celui-là est pour toi.",
            "… Il hésite, puis il mord. Bien.",
            { texte: "Et celui-là, c'est pour moi.", humeur: "degoutee" },
            { texte: "C'est immonde. Le goût est de plus en plus fade, presque comme boire de l'eau croupie.", humeur: "degoutee" },
            "Plus de rats, plus qu'un seul chat, et personne est venu ici depuis des lustres.",
            "Faudra que je me débrouille pour en trouver d'autres. Pour sortir, surtout.",
            "Peut-être que je pourrais Le voir. Peut-être qu'Il viendrait à ma rencontre.",
            { texte: "Mais non. Il préfère aller voir les autres… sous prétexte qu'ils sont amis.", humeur: "degoutee" },
            "Je lui suis utile. C'est censé être mieux. Tellement mieux.",
            ". . .",
            ". . .",
            ". . . ?",
            "Le chat sort enfin de sous la pile, laissant une carcasse derrière lui. Il y avait quelque chose coincé là-dessous… une lettre."
        ]
    },

    // le tas, une fois les rats attrapés
    tasVide: {
        first: [
            "Plus rien couine là-dedans.",
            "Le tas a l'air vexé. Je lui ai pris ses colocataires."
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
            "La lumière passe sous le carton de la fenêtre. Faible, lointaine, mais présente tout de même.",
            "Il doit bien être sept heures, et j'ai trop repoussé la torpeur.",
            "Mes paupières pèsent des tonnes.",
            "J'ai rien fait aujourd'hui encore, et je pense pas faire plus demain.",
            "La torpeur me prend avant que j'atteigne les oreillers, et je m'effondre sur le sol."
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
            "Hm.",
            "Le soleil est couché depuis des heures. Je me suis endormie là où je suis tombée, la joue sur le carrelage, entre deux boîtes de nouilles.",
            "Onze appels manqués. Zacharias.",
            "La dernière fois qu'il a appelé, c'était… juin ? Quatre mois. Et là, onze appels en une journée.",
            "Soit quelqu'un est mort, soit il croit que c'est moi.",
            "Il attendra. J'ai faim."
        ]
    },

    // 2. le repas : le chat
    repas: {
        lignes: [
            "La faim est toujours là.",
            "Le rat a pas suffi. Celui d'hier non plus. Il m'avait prévenue. Il prévient toujours, et je l'écoute jamais.",
            "Le chat est roulé en boule contre moi. Il a dormi ici toute la journée, contre la seule chose de l'appart qui bougeait pas.",
            "Il me fait confiance. C'est mignon. C'est con.",
            { texte: ". . .", humeur: "degoutee" },
            "Je peux pas sortir comme ça. Si la Bête se réveille dans le couloir, c'est la voisine du dessous qui paye.",
            "Désolée, petit chat.",
            { texte: "Le sang est chaud. Enfin un truc qui ressemble à de la force.", humeur: "degoutee" },
            { texte: "Je déteste à quel point c'est bon.", humeur: "degoutee" }
        ]
    },

    // 3. l'appel : Inga rappelle Zacharias. Ils jouent à se taper sur les nerfs, sans haine.
    //    Lore utilisé : la lettre de Zacharias à Esen sur les Anarchs (leurs deux méthodes, le jeu),
    //    le blog anarch du PC 1, le titre qu'Inga refuse, Dimitrios, Atam et le Régent.
    appel: {
        telephone: true,   // le téléphone s'affiche pendant la conversation (telephone.png)
        lignes: [
            "Bon. Rappelons-le, avant qu'il envoie une goule frapper à ma porte. Elle passerait pas la porte, de toute façon.",
            { texte: "Une sonnerie. Il décroche avant la deuxième.", qui: "" },
            { texte: "Onze appels, Inga. Onze. J'avais commencé à rédiger ta nécrologie. Sobre, élégante. Légèrement condescendante.", qui: "Zacharias" },
            "Tu aurais dû la publier. J'aurais adoré corriger tes fautes.",
            { texte: "Je ne fais pas de fautes. Je fais des choix stylistiques.", qui: "Zacharias" },
            "C'est ce que disent tous les gens qui font des fautes.",
            { texte: "Quatre mois, Inga.", qui: "Zacharias" },
            "J'avais rien à dire.",
            { texte: "Tu n'as jamais rien à dire. D'habitude, ça ne t'empêche pas de parler.", qui: "Zacharias" },
            { texte: "Bref. Les Anarchs ont encore migré. Nouveau blog, nouveau serveur. Et cette fois-ci, quelqu'un chez eux a lu un tutoriel de sécurité.", qui: "Zacharias" },
            "Je sais. Lil a cliqué sur un lien qu'il aurait pas dû, Rollin a paniqué, le Baron a tapé du poing. Ils ont tout déménagé en une nuit.",
            "C'était presque attendrissant.",
            { texte: "Nous les avons retrouvés en quatre jours. Ta méthode et la mienne, pour une fois dans le même sens.", qui: "Zacharias" },
            "Ta méthode, c'est envoyer des goules boire des cafés à Alsancak en attendant qu'un Anarch fasse une scène.",
            { texte: "Ma méthode, c'est l'observation. Ils tiennent à leur ego plus qu'à leur sécurité. Il suffit d'attendre qu'ils aient envie d'être remarqués.", qui: "Zacharias" },
            "Et la mienne, c'est leur vie d'avant. Ils cachent la Nuit, mais pas leurs vieilles adresses mail. Ils se croient encore humains, alors ils protègent pas la partie humaine.",
            { texte: "Et entre les deux, on retombe toujours sur le jeu. Les paris, les tables de cartes, des chances un peu trop favorables. Ils aiment l'argent qui vient vite.", qui: "Zacharias" },
            "Le seul point commun qu'ils ont avec les Ventrue.",
            { texte: "Le problème n'est pas de les retrouver. C'est ce qu'on remonte dans le filet.", qui: "Zacharias" },
            { texte: "Plus de scripts, plus de goules, plus de nuits passées à trier. Chaque migration nous coûte un peu plus.", qui: "Zacharias" },
            { texte: "Et qu'est-ce qu'on récupère ? Des anniversaires. Des recommandations de films. Un tableau des terrains de chasse, codé par couleur.", qui: "Zacharias" },
            "Le tableau est super, j'ai rien à redire sur le tableau.",
            "Et y a l'homme en costume qui regarde la station Konak depuis un bar. Et les six corps du port.",
            "« C'est toujours six, puis plus rien. » Ils l'ont écrit entre deux disputes sur le daltonisme de Lil.",
            { texte: "Ce n'est pas rien. Mais c'est noyé dans tout le reste. On creuse trop large, on ramasse tout et n'importe quoi.", qui: "Zacharias" },
            "Alors on resserre.",
            { texte: "Sur quoi ? Le port ? Konak ? Le Baron ? Ce n'est pas à nous de choisir. En théorie, c'est le Conseil qui décide de ce qui compte pour la ville. Nous ne sommes que des outils.", qui: "Zacharias" },
            "Parle pour toi.",
            { texte: "Et c'est là que tu interviens. Parle aux primogènes. Demande-leur sur quoi ils veulent qu'on se concentre.", qui: "Zacharias" },
            "Moi ? Parler à des gens ? Tu m'as vraiment crue morte, tu me confonds avec quelqu'un d'autre.",
            { texte: "Ils t'écoutent. Ils ne t'aiment pas, mais ils t'écoutent. La Cour t'a même proposé un titre, si je me souviens bien.", qui: "Zacharias" },
            "Et j'ai dit non. Je n'ai pas que ça à faire, leur titre, c'était juste un moyen pour eux de me forcer à leur faire des faveurs en échange.",
            { texte: "Soit, reste dans ton coin pour toujours. Cependant, ça reste à toi de le faire.", qui: "Zacharias" },
            { texte: "Moi, si j'apporte ça, ils me demanderont comment je l'ai obtenu. Avec quelles ressources, et sur ordre de qui. Ca pourrait compléxifier la chose.", qui: "Zacharias" },
            { texte: "Autant pour moi, toi, et mon sire.", qui: "Zacharias" },
            { texte: "Donc le grand génie de la Fondation a peur de se faire gronder par Dimitrios.", humeur: "degoutee" },
            { texte: "J'ai le sens de la hiérarchie. C'est une notion qui t'échappe, je sais.", qui: "Zacharias" },
            "Bon. Je leur parlerai. C'est mon projet de toute façon, tu as fait que l'améliorer.",
            { texte: "« Améliorer ». Je note que tu l'as dit.", qui: "Zacharias" },
             { texte: "Ne t'habitue pas.", humeur: "degoutee" } 
            "Et Il sera au courant, de toute façon, par moi ou quelqu'un d'autre.",
            { texte: "Atam fera ce qu'Atam fait. Je ne prétends pas comprendre ton sire, et je n'ai pas l'intention d'essayer. Ce n'est pas mon domaine.", qui: "Zacharias" },
            "Personne le comprend. C'est un peu le principe.",
            { texte: "Il voit le Régent plus souvent que nous tous réunis. Ça me suffit, comme mystère.", qui: "Zacharias" },
            { texte: "Bonne nuit, Inga. Ne meurs pas avant d'avoir parlé au Conseil. Ta nécrologie n'est pas finie.", qui: "Zacharias" },
            "Bonne nuit, Zacharias. Garde-la au chaud.",
            { texte: "Elle raccroche.", qui: "" }
        ]
    },

    // 4. la sortie
    sortie: {
        lignes: [
            "Si je dois parler aux primogènes, ce sera le ventre plein. Un rat et un chat, c'est pas un repas. Et une Nosferatu affamée au téléphone avec le Conseil, ça finit mal pour tout le monde.",
            "Avec cette force en plus, je peux enfin bouger la pile qui bloque l'entrée. Le bois craque avant de se briser.",
            "L'air du couloir est froid. Silencieux. Ça sent la javel et le chou des voisins.",
            { texte: "Je serai sûrement pas la seule dehors ce soir. Pourvu que je croise personne qui me reconnaisse…", humeur: "degoutee" },
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
