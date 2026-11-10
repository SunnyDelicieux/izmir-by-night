/* =====================================================================
   INGA · NUIT 2 · « La nuit suivante. »

   Une nuit sans objet à cliquer : quatre moments qui s'enchaînent tout seuls
   (chaque scène finit par « va » vers la suivante), le lieu assombri par un voile.

     1. le réveil : Zacharias a appelé cinq fois
     2. le repas : le chat
     3. l'appel : Inga rappelle Zacharias
     4. la sortie : elle quitte enfin l'appartement

   Pour en faire une nuit où l'on se promène, comme la première : enlever le voile
   et le « va » à l'endroit où le joueur doit reprendre la main, puis donner à la nuit
   un but (finQuand) et une scène de fin (fin). Voir nuit-1.js et /ambiance/vn/LISEZ-MOI.md.
===================================================================== */

VN.nuit(2, {
    titre: "La nuit suivante.",   // le texte sur l'écran noir, entre les deux nuits
    debut: "reveil"
});


// 1. le réveil : Zacharias a appelé
VN.scene("reveil", [
    { voile: true },
    "* Un bourdonnement contre le carrelage. Un des téléphones sonne. Vu la sonnerie, c'est celui destiné aux communications avec les Tremere.",
    "Hm.",
    "* Elle s'est endormie là où elle est tombée, la joue sur le carrelage, entre deux boîtes de nouilles. Le soleil est couché depuis trois heures.",
    "* Elle attrape le téléphone.",
    "Cinq appels manqués. Zacharias.",
    "La dernière fois qu'il a appelé, c'était… juin ? Quatre mois. Et là, cinq appels en une journée.",
    "Soit quelqu'un est mort, soit il croit que c'est moi.",
    "Il attendra. J'ai faim.",
    { attends: 600 },
    { va: "repas" }
]);

// 2. le repas : le chat
VN.scene("repas", [
    "Le rat a pas suffi. Celui d'hier non plus. Il m'avait prévenue que ça durerait pas.",
    "* Le chat est roulé en boule contre elle. Il a dormi là toute la journée, contre la seule chose de l'appart qui ne bougeait pas.",
    "Il me fait confiance. C'est mignon. C'est con.",
    "(degoutee) . . .",
    "Je peux pas sortir comme ça. Si la Bête se réveille dans le couloir, c'est la voisine du dessous qui paye.",
    "Désolée, petit chat.",
    "* Elle le soulève doucement. Il ne se débat pas, et l'observe avec de grands yeux.",
    "* (degoutee) Le sang est chaud, le goût est meilleur que celui du rongeur, bien qu'il reste quelque peu fade.",
    "* (degoutee) Il est clair que tout ça n'a encore rien de naturel pour elle.",
    { attends: 600 },
    { va: "appel" }
]);

// 3. l'appel : Inga rappelle Zacharias. Ils jouent à se taper sur les nerfs, sans haine.
//    Lore utilisé : la lettre de Zacharias à Esen sur les Anarchs (leurs deux méthodes, le jeu),
//    le blog anarch du PC 1, le titre qu'Inga refuse, Dimitrios, Atam et le Régent.
VN.scene("appel", [
    { image: "telephone.png", facon: "telephone" },   // le téléphone s'affiche pendant la conversation (voir style.css)
    "Bon. Rappelons-le, avant qu'il annonce ma mort.",
    "* Une sonnerie. Il décroche avant la deuxième.",
    "Zacharias : Cinq appels, Inga. Cinq. J'avais commencé à rédiger ta nécrologie.",
    "Et tu l'écrivais comment ?",
    "Zacharias : Elle était sobre, élégante et légèrement condescendante.",
    "Tu aurais dû la publier. J'aurais adoré corriger tes fautes.",
    "Zacharias : Je ne fais pas de fautes.",
    "C'est ce que disent tous les gens qui font des fautes.",
    "Zacharias : Quatre mois, Inga.",
    "Je n'avais rien à te dire.",
    "Zacharias : Tu n'as jamais rien à dire. D'habitude, ça ne t'empêche pas de parler.",
    "Zacharias : Bref. Les Anarchs ont encore migré. Nouveau blog, nouveau serveur, et ils semblent commencer à apprendre les bases de la sécurité informatique.",
    "Je sais. Lil a cliqué sur un lien qu'il aurait pas dû. Ils ont tout déménagé en une nuit.",
    "C'était presque attendrissant.",
    "Zacharias : Il nous a fallu quatre jours pour les retrouver, ce qui reste court, mais ça risque d'être plus difficile plus tard.",
    "Zacharias : Le problème n'est pas de les retrouver. C'est ce qu'on remonte dans le filet.",
    "Zacharias : Plus de scripts, plus de goules, plus de nuits passées à trier. Chaque migration nous coûte un peu plus.",
    "Zacharias : Et qu'est-ce qu'on récupère ? Des anniversaires. Des recommandations de films. Un tableau des terrains de chasse.",
    "Le tableau est super, j'ai rien à redire sur le tableau.",
    "Zacharias : Ce n'est pas rien. Mais c'est noyé dans tout le reste. On creuse trop large, on ramasse tout et n'importe quoi.",
    "On a juste à resserrer un peu, se concentrer sur un truc.",
    "Zacharias : Sur quoi ? Le port ? Konak ? Le Baron ? Ce n'est pas à nous de choisir. En théorie, c'est le Conseil qui décide de ce qui compte pour la ville.",
    "En théorie, oui. Après, ils savent pas ce que ça implique.",
    "Zacharias : Et c'est là que tu interviens. Parle-leur. Demande-leur sur quoi ils veulent qu'on se concentre.",
    "Moi ? C'est toi qui as un primogène, fais-le toi-même.",
    "Zacharias : Ils t'écoutent. Ils ne t'aiment pas, mais ils t'écoutent. La Cour t'a même proposé un titre, si je me souviens bien.",
    "Et j'ai dit non. J'ai pas que ça à faire. Leur titre, c'était juste un moyen de me forcer à leur faire des faveurs en échange.",
    "Zacharias : Soit. Reste dans ton coin pour toujours. Mais ça reste à toi de le faire.",
    "Zacharias : Moi, si j'apporte ça, ils me demanderont comment je l'ai obtenu. Avec quelles ressources, et sur ordre de qui. Ça pourrait compliquer les choses.",
    "Zacharias : Pour moi, pour toi, et pour mon sire.",
    "(degoutee) Donc le grand génie de la Fondation a peur de se faire gronder par Dimitrios.",
    "Zacharias : J'ai le sens de la hiérarchie. C'est une notion qui t'échappe, je sais.",
    "Bon. Je leur parlerai. C'est mon projet de toute façon, tu n'as fait que l'améliorer.",
    "Zacharias : « Améliorer ». Je note que tu l'as dit.",
    "(degoutee) Ne t'habitue pas.",
    "Et Il sera au courant, de toute façon, par moi ou quelqu'un d'autre.",
    "Zacharias : Atam fera ce qu'Atam fait. Je ne prétends pas comprendre ton sire, et je n'ai pas l'intention d'essayer. Ce n'est pas mon domaine.",
    "Personne le comprend. C'est un peu le principe.",
    "Zacharias : Il voit le Régent plus souvent que nous tous réunis. Ça me suffit, comme mystère.",
    "Tu m'en diras des nouvelles, oui.",
    "Zacharias : Bonne nuit, Inga. Ne meurs pas avant d'avoir parlé au Conseil. Ta nécrologie n'est pas finie.",
    "Bonne nuit, Zacharias. Garde-la au chaud.",
    "* Elle raccroche.",
    { image: "aucune" },
    { attends: 600 },
    { va: "sortie" }
]);

// 4. la sortie
VN.scene("sortie", [
    { lieu: "entree" },   // la porte est de ce côté-là de l'appartement
    "Si je dois parler aux primogènes, ce sera le ventre plein. Un rat et un chat, c'est pas un repas. Et une Nosferatu affamée au téléphone avec le Conseil, ça finit mal pour tout le monde.",
    "Avec cette force en plus, je peux enfin bouger la pile qui bloque l'entrée.",
    "* Elle pousse. Le bois craque avant de se briser.",
    "* L'air du couloir est froid. Silencieux. Ça sent la javel et le chou des voisins.",
    "(degoutee) Je serai sûrement pas la seule dehors ce soir. Pourvu que je croise personne qui me reconnaisse…",
    "(degoutee) Louées soient les villes où les souterrains appartiennent aux Nosferatu seuls, et pas à absolument tout le monde.",
    "Je sors enfin. J'ai à faire.",
    { nuit: "suivante" }  // la nuit est finie. S'il n'y a pas de nuit 3 : l'écran de fin.
]);
