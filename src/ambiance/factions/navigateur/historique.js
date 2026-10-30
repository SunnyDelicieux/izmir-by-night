/* =========================
   L'HISTORIQUE D'INGA

   Une ligne par visite, la plus récente en haut.
     jour    : 0 = aujourd'hui, 1 = hier, 2 = avant-hier… (la date s'écrit toute seule, en 2014)
     heure   : l'heure de la visite
     adresse : une page qui existe (voir bobines.js et egechan.js),
               ou une recherche : recherche("ce qu'elle a tapé")
   Une adresse qui n'existe pas affiche la page d'erreur de Chrome.
========================= */

const recherche = (texte) => "google.fr/search?q=" + encodeURIComponent(texte);

Nav.historique = [
    { jour: 0, heure: "05:02", adresse: "ege-chan.org/a/6" },
    { jour: 0, heure: "04:58", adresse: "ege-chan.org/a" },
    { jour: 0, heure: "04:47", adresse: recherche("attraper un rat sans piège") },
    { jour: 0, heure: "04:40", adresse: "ege-chan.org/izm" },
    { jour: 0, heure: "04:12", adresse: "b0b1nes0.onion/catalogue/kirmizi-oda" },
    { jour: 0, heure: "04:09", adresse: "b0b1nes0.onion/catalogue/ayna" },
    { jour: 0, heure: "04:05", adresse: "b0b1nes0.onion/rayon/zihin" },
    { jour: 0, heure: "04:03", adresse: "b0b1nes0.onion" },

    { jour: 1, heure: "06:31", adresse: recherche("chat ne mange plus se cache") },
    { jour: 1, heure: "05:58", adresse: "ege-chan.org/pol" },
    { jour: 1, heure: "05:40", adresse: "ege-chan.org/turkey" },
    { jour: 1, heure: "03:15", adresse: "b0b1nes0.onion/catalogue/liman" },
    { jour: 1, heure: "03:11", adresse: "b0b1nes0.onion/nouveautes" },

    { jour: 3, heure: "02:20", adresse: recherche("combien de temps sans sortir de chez soi") },
    { jour: 3, heure: "01:48", adresse: "b0b1nes0.onion/recherches" },
    { jour: 3, heure: "01:46", adresse: "b0b1nes0.onion/catalogue/gece-kusu" },
    { jour: 3, heure: "01:30", adresse: "b0b1nes0.onion/cercle/2" },
    { jour: 3, heure: "01:29", adresse: "b0b1nes0.onion/cercle" },

    { jour: 6, heure: "23:58", adresse: "ege-chan.org/turkey/2" },
    { jour: 6, heure: "23:40", adresse: "b0b1nes0.onion/vitrine" }
];


/* Les vignettes de la page « Nouvel onglet » (8 au maximum) */

Nav.plusVisites = [
    "ege-chan.org/izm",
    "b0b1nes0.onion",
    "ege-chan.org/a",
    "b0b1nes0.onion/catalogue",
    "ege-chan.org/pol",
    "b0b1nes0.onion/cercle",
    "ege-chan.org/turkey",
    "b0b1nes0.onion/rayon/gercek"
];


/* =========================
   LES RECHERCHES GOOGLE : ce que Google répond à chaque recherche.
   Le texte de la recherche s'écrit en minuscules.
   Les liens des résultats ne mènent nulle part (page d'erreur), sauf s'ils visent une page qui existe.
   Une recherche qui n'est pas ici affiche « Aucun document ne correspond… ».
========================= */

Nav.recherches = {

    "attraper un rat sans piège": {
        nombre: "312 000",
        liens: [
            {
                titre: "Comment attraper un rat sans piège ? - Forum Maison",
                adresse: "forum-maison.fr/nuisibles/rat-sans-piege",
                texte: "Un seau, une planche, du beurre de cacahuète. Sinon, à la main avec un sac en tissu, une serviette ou une taie d'oreiller, n'importe quoi qui ferme. Mettez des gants."
            },
            {
                titre: "Rats dans l'appartement : que faire ? | Hijyen İzmir",
                adresse: "hijyenizmir.com.tr/fr/rats",
                texte: "Dératisation à domicile 7j/7, intervention en 24 h. Konak, Karşıyaka, Bornova, Buca. Devis gratuit par téléphone."
            },
            {
                titre: "j'ai attrapé un rat à mains nues (il m'a mordu) - YouTube",
                adresse: "youtube.com/watch?v=r4tM4nu3l",
                texte: "Ne faites pas ça. Sérieusement. 1 284 302 vues."
            }
        ]
    },

    "chat ne mange plus se cache": {
        nombre: "1 020 000",
        liens: [
            {
                titre: "Mon chat ne mange plus et se cache : quand s'inquiéter ?",
                adresse: "veto-conseils.fr/chat/se-cache-ne-mange-plus",
                texte: "Un chat qui se cache est souvent un chat stressé : bruit, odeur inhabituelle, changement dans la maison. S'il ne mange plus depuis plus de 24 h, consultez un vétérinaire."
            },
            {
                titre: "mon chat a peur de moi depuis quelques mois - Forum Animaux",
                adresse: "forum-animaux.fr/chats/peur-de-moi",
                texte: "Il ne vient plus quand je l'appelle. Il me regarde de loin. Je n'ai rien changé. Enfin je crois. — 14 réponses"
            },
            {
                titre: "Que donner à manger à un chat quand on n'a plus rien ?",
                adresse: "chat-maison.org/alimentation/urgence",
                texte: "Du poulet cuit sans os, un peu de poisson, un œuf. Jamais d'oignon, jamais de chocolat. Le lait n'est pas une bonne idée."
            }
        ]
    },

    "combien de temps sans sortir de chez soi": {
        nombre: "4 560 000",
        liens: [
            {
                titre: "Hikikomori : ces jeunes qui ne sortent plus de leur chambre",
                adresse: "lemagazine-sante.fr/hikikomori",
                texte: "Ils ne sortent plus depuis six mois, un an, parfois dix. Ils vivent la nuit, mangent quand la maison dort et ne parlent plus qu'à travers un écran."
            },
            {
                titre: "Il n'était pas sorti de chez lui depuis 20 ans",
                adresse: "faits-divers-du-monde.com/2013/20-ans-enferme",
                texte: "Les voisins pensaient l'appartement vide. Ils ont appelé quand l'odeur est devenue trop forte. Il allait très bien. Il ne voulait juste pas sortir."
            },
            {
                titre: "3 ans sans sortir, posez-moi vos questions",
                adresse: "forum-ados.fr/discussion/3-ans-sans-sortir",
                texte: "« Tu manges quoi ? » « Ce qui vient à moi. » « Tu t'ennuies pas ? » « Non. » « T'as des amis ? » (pas de réponse)"
            }
        ]
    }
};
