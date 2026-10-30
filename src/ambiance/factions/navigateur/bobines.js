// ============================================================
//  LE CERCLE DES BOBINES PERDUES (b0b1nes0.onion)
//  Une boutique de cassettes qui n'existe pas : elle est au fond d'Ege Video,
//  un vidéoclub de Kemeraltı (inventé), derrière le rayon des comédies et un rideau rouge.
//  Gore, cassettes « vérité », thrillers psychologiques violents, et les introuvables.
//  Le comptoir est tenu par Pic4Death. DeadDogs y est client.
//
//  LE LOOK : une page HTML de débutant, sans aucun style (bobines.css).
//  Times, fond blanc, liens bleus soulignés, violets une fois visités, des tableaux à bordure.
//  C'est voulu : le contenu fait peur, la page ne fait aucun effort.
//  Seule la vitrine (le vrai vidéoclub, devant) a l'air d'un site normal.
//
//  CASSETTES : une ligne par cassette, sa fiche est générée (catalogue/<id>).
//    affiche   : l'image de la jaquette, navigateur/images/cassettes/<id>.jpg
//                (tant qu'elle n'existe pas : une image cassée avec ce texte)
//    etat      : stock, derniere, reservee, surplace, introuvable, retiree, precommande
//    coms      : les commentaires, [pseudo, date, texte]
//
//  Sur le PC d'Inga, on ne peut ni réserver ni commenter : le site répond, c'est tout.
// ============================================================

(function () {
  const S = 'b0b1nes0.onion';
  const L = (chemin, texte) => `<a data-lien="${S}${chemin ? '/' + chemin : ''}">${texte}</a>`;

  // ---------- Les rayons ----------
  const RAYONS = {
    kan:    { nom: 'KAN',    sous: 'gore',
              texte: 'du sang, du vrai maquillage, parfois de la vraie viande. tout est joué. (tout est joué.)' },
    gercek: { nom: 'GERÇEK', sous: 'cassettes « vérité »',
              texte: 'des cassettes sans générique. vendues comme fiction. personne au comptoir ne vous dira le contraire.' },
    zihin:  { nom: 'ZİHİN',  sous: 'thrillers psychologiques',
              texte: 'ceux qui ne montrent rien et qui restent. on ne les reprend pas.' },
    kayip:  { nom: 'KAYIP',  sous: 'introuvables',
              texte: 'les films que le Cercle cherche. une prime pour chacun. apportez-les au comptoir, pas à la police.' }
  };

  // ---------- Les états ----------
  const ETATS = {
    stock:       { texte: 'en stock',               reservable: true },
    derniere:    { texte: 'dernière copie',         reservable: true },
    precommande: { texte: 'précommande',            reservable: true },
    reservee:    { texte: 'réservée' },
    surplace:    { texte: 'consultation sur place' },
    introuvable: { texte: 'introuvable' },
    retiree:     { texte: 'RETIRÉE',                rouge: true }
  };

  // ============================================================
  //  LES CASSETTES
  // ============================================================
  const CASSETTES = [

    // ---------------- KAN : gore ----------------
    { id: 'kanli-dugun', titre: 'Kanlı Düğün', fr: 'Les Noces sanglantes', annee: 1987, rayon: 'kan',
      duree: '84 min', support: 'VHS, copie 3e génération', etat: 'derniere', prix: '40 TL',
      affiche: 'jaquette VHS délavée : une mariée de dos, voile blanc taché, un couteau de boucher posé sur un plateau de baklava. titre en lettres rouges dégoulinantes.',
      description: "Un mariage de village près de Tire. Le marié est boucher. La nuit de noces dure trois jours. Les effets ont été faits avec des abats achetés le matin même au marché : l'équipe raconte que la chaleur du plateau les a « fait bouger ».",
      coms: [
        ['VHS_Baba', '12/11/12', "le plan du plateau de baklava. je n'ai plus jamais mangé de baklava."],
        ['et_suyu', '13/11/12', "la scène de la chambre est trop longue. c'est le principe, je sais."],
        ['DeadDogs', '20/11/12', "récupérée au comptoir. l'image saute à 41:12, c'est normal ?"],
        ['Pic4Death', '20/11/12', "c'est normal. c'est l'endroit où le précédent propriétaire a arrêté la cassette. plusieurs fois."],
        ['kırmızı_perde', '02/02/13', "il en reste une. une seule. je la veux mais ma femme a trouvé la dernière."]
      ] },

    { id: 'kesik', titre: 'Kesik', fr: 'Entaille', annee: 1995, rayon: 'kan', nouveau: true,
      duree: '71 min', support: 'VHS', etat: 'stock', prix: '35 TL',
      affiche: 'jaquette noire, un seul trait rouge en diagonale, comme une coupure dans le carton. au dos : « 71 dakika. 1 bıçak. 0 kurgu. »',
      description: "Un barbier de Basmane rase ses clients le soir, après la fermeture. Il ne les coupe jamais. Il attend qu'ils bougent. Le film est tourné en plans fixes, à hauteur de fauteuil. Arrivage de samedi : six copies retrouvées dans un grenier de Bornova.",
      coms: [
        ['Pic4Death', '02/03/13', "arrivage. six copies. j'en garde une. vous savez pourquoi."],
        ['Kaset', '02/03/13', "le barbier est un vrai barbier. il est mort en 2007. son salon est devenu un magasin de téléphones."],
        ['et_suyu', '03/03/13', "j'ai regardé les 20 premières minutes. je me suis rasé la barbe le lendemain. au rasoir électrique."],
        ['anonim', '04/03/13', "le fauteuil existe encore. il est au fond d'Ege Video. vous êtes assis dessus quand vous attendez au comptoir."]
      ] },

    { id: 'et-pazari', titre: 'Et Pazarı', fr: 'Le Marché à la viande', annee: 1989, rayon: 'kan',
      duree: '92 min', support: 'VHS', etat: 'stock', prix: '30 TL',
      affiche: 'photo floue d\'un étal de boucherie la nuit, néon vert. des carcasses suspendues. l\'une d\'elles porte une montre.',
      description: "Tourné sans autorisation dans l'abattoir municipal de Buca, la nuit, avec deux employés payés en cigarettes. Le scénario tient sur une page : un inspecteur vient contrôler l'hygiène et ne ressort pas. Le reste, ce sont des carcasses. Beaucoup.",
      coms: [
        ['d34danim', '15/10/12', "les animaux de l'abattoir sont vrais et morts. ça, c'est documenté. le reste, je ne sais pas. je l'ai mis dans mes archives."],
        ['VHS_Baba', '16/10/12', "l'inspecteur est joué par un vrai inspecteur. c'est le seul film où il a joué. il a été muté à Van l'année suivante."],
        ['Bant', '18/10/12', "à 1:12:40, regardez la montre sur la carcasse de gauche. elle tourne encore."]
      ] },

    { id: 'dis-hekimi', titre: 'Diş Hekimi', fr: 'Le Dentiste', annee: 1991, rayon: 'kan',
      duree: '79 min', support: 'VHS', etat: 'reservee', prix: '30 TL',
      affiche: 'gros plan d\'une bouche ouverte maintenue par un écarteur métallique, éclairage de cabinet dentaire. le titre est gravé sur une dent.',
      description: "Un dentiste de Konak collectionne les dents de ses patients. Il les classe. Il les numérote. Il tient un registre. Le film passe plus de temps sur le registre que sur les extractions, et c'est pire.",
      coms: [
        ['Projeksiyon', '07/01/13', "le registre, c'est le vrai sujet. un homme qui range les gens."],
        ['kırmızı_perde', '08/01/13', "réservée depuis trois semaines. par qui ?"],
        ['Pic4Death', '08/01/13', "par quelqu'un qui paie. ça suffit."]
      ] },

    { id: 'cig', titre: 'Çiğ', fr: 'Cru', annee: 2003, rayon: 'kan',
      duree: '66 min', support: 'DVD-R gravé', etat: 'stock', prix: '25 TL',
      affiche: 'boîtier DVD transparent, jaquette imprimée sur une imprimante jet d\'encre qui manquait de cyan : une table de cuisine, une assiette, une fourchette plantée dans quelque chose.',
      description: "Le seul film du rayon tourné en numérique. Un étudiant en cuisine décide de ne plus rien cuire. Rien. Son colocataire tient un journal vidéo. Les effets sont pauvres, l'idée ne l'est pas.",
      coms: [
        ['et_suyu', '22/12/12', "trop récent pour moi. on voit les pixels. le gore a besoin de bruit vidéo."],
        ['VHS_Baba', '22/12/12', "d'accord avec et_suyu. le numérique n'a pas d'odeur."],
        ['Pic4Death', '23/12/12', "achetez-la quand même. elle vous apprendra à aimer les cassettes."]
      ] },

    { id: 'hasta', titre: 'Patient 0', fr: '', annee: 1993, rayon: 'kan',
      duree: '40 min de rushes', support: 'VHS de travail, sans montage', etat: 'surplace', prix: 'consultation : 10 TL',
      affiche: 'pas de jaquette. une cassette noire avec un morceau de sparadrap : « HASTA 0 - RUSH 2/5 - NE PAS PRÊTER ».',
      description: "Tourné de nuit dans une aile désaffectée d'un hôpital d'İzmir. Un médecin qui saigne ses patients « pour leur bien ». Maquillages au sang de boucherie, tournage arrêté par l'odeur. Plusieurs plans montrent un couloir carrelé qui ne correspond à aucun plan connu de l'hôpital.",
      coms: [
        ['Kaset', '11/09/12', "le couloir. encore le couloir. c'est le même que sur la cassette de mariage."],
        ['KaTaKoMb', '28/02/13', "ce couloir je l'ai TROUVÉ. il est sous le chantier du métro. j'ai des photos. venez voir mon blog."],
        ['Pic4Death', '28/02/13', "ne descends pas, katakomb."],
        ['KaTaKoMb', '01/03/13', "lol t'es qui toi ma mère ?"]
      ] },

    { id: 'sinek', titre: 'Sinek', fr: 'Les Mouches', annee: 1984, rayon: 'kan',
      duree: '88 min', support: 'VHS', etat: 'retiree', prix: '—',
      affiche: 'une fenêtre fermée, vue de l\'intérieur. la vitre est noire de mouches. une main appuyée contre le verre.',
      description: "Une vieille femme meurt dans son appartement de Karşıyaka. Personne ne vient pendant un mois. Le film est raconté par ce qui vient quand même.",
      coms: [
        ['Pic4Death', '10/12/12', "retirée à la demande d'un client. il habite au-dessus de l'appartement du tournage. il dit qu'il entend encore bourdonner."],
        ['VHS_Baba', '10/12/12', "on retire des films parce qu'un client entend des choses maintenant ?"],
        ['Pic4Death', '10/12/12', "on retire des films parce que ce client-là paie plus que toi."]
      ] },

    // ---------------- GERÇEK : « vérité » ----------------
    { id: 'kaset-14', titre: 'Kaset No. 14', fr: 'sans étiquette', annee: '1998 ?', rayon: 'gercek',
      duree: '22 min', support: 'VHS-C dans un adaptateur', etat: 'stock', prix: '60 TL',
      affiche: 'aucune jaquette. photo d\'une petite cassette VHS-C dans son adaptateur gris, posée sur un journal turc de 1998. quelqu\'un a écrit « 14 » au marqueur.',
      description: "Une cave. Une chaise. Une ampoule. Pendant vingt-deux minutes, quelqu'un hors champ pose des questions en arménien à quelqu'un qui ne répond pas. Vendue comme un court métrage expérimental. Il n'y a pas de générique.",
      coms: [
        ['Projeksiyon', '03/06/12', "j'ai fait traduire les questions. ce sont des noms. il demande des noms. pendant 22 minutes."],
        ['Bant', '04/06/12', "la chaise est vide à la fin. personne n'est sorti du champ."],
        ['KaTaKoMb', '20/01/13', "les briques du mur du fond. c'est les caves de Kemeraltı, j'en suis sûr à 90 %."],
        ['Pic4Death', '20/01/13', "c'est une fiction. ça a toujours été une fiction. 60 TL."]
      ] },

    { id: 'mariage-1988', titre: 'MARIAGE 1988 - NE PAS EFFACER', fr: '', annee: 1988, rayon: 'gercek',
      duree: '2 h 20', support: 'VHS de famille', etat: 'surplace', prix: 'consultation : 10 TL',
      affiche: 'étiquette manuscrite au stylo bille bleu sur une cassette TDK : « DÜĞÜN 1988 - SİLMEYİN ». rien d\'autre.',
      description: "Deux heures d'un mariage à Gaziemir : la danse, les billets épinglés sur la robe, les oncles. Puis la cassette continue. Vingt minutes d'un couloir carrelé, filmé caméra à l'épaule, très lentement. Personne ne parle. La caméra s'arrête devant une porte.",
      coms: [
        ['Bant', '14/08/12', "trouvée au marché aux puces de Karşıyaka. 2 TL. je ne la revendrai pas. je la laisse ici pour qu'elle ne soit pas chez moi."],
        ['Kaset', '15/08/12', "carrelé, le couloir ?"],
        ['Bant', '15/08/12', "comment tu sais ?"],
        ['KaTaKoMb', '27/02/13', "LA PORTE. c'est la porte. elle était ouverte quand je suis arrivé."],
        ['Pic4Death', '06/03/13', "plus de nouvelles de katakomb ?"]
      ] },

    { id: 'liman', titre: 'Liman, rıhtım 3', fr: 'Port, quai 3', annee: 2013, rayon: 'gercek',
      duree: '38 min', support: 'DVD-R, copie de caméra de surveillance', etat: 'retiree', prix: '—',
      affiche: 'capture de caméra de surveillance en noir et blanc : deux conteneurs, un quai mouillé, l\'horodatage « 04-03-2013 02:07 » en bas à droite.',
      description: "Copie des caméras du quai 3 du port d'Alsancak, nuit du 3 au 4 mars. Les caméras ont été « coupées pour maintenance » à minuit. Pas celles-là.",
      coms: [
        ['anonim', '04/03/13', "c'est ce que liman35 racontait sur egechan ? les chiens ?"],
        ['d34danim', '04/03/13', "ce ne sont pas des chiens."],
        ['Pic4Death', '05/03/13', "retirée ce matin à 9h. ne demandez pas. ne la cherchez pas. si vous l'avez achetée hier, brûlez-la."]
      ] },

    { id: 'kurban', titre: 'Kurban', fr: 'Le Sacrifice', annee: 2010, rayon: 'gercek',
      duree: '55 min', support: 'DVD-R, téléphone portable', etat: 'stock', prix: '20 TL',
      affiche: 'image verticale de téléphone, très compressée : une cour en béton à Buca, un tuyau d\'arrosage, des enfants qui regardent quelque chose hors champ.',
      description: "Quarante et une vidéos de téléphone filmées pendant une fête du Sacrifice dans une cour de Buca, montées bout à bout par quelqu'un qui n'a gardé que les dernières secondes de chacune.",
      coms: [
        ['d34danim', '19/11/12', "c'est moi qui ai fait le montage. je l'ai déposé ici parce que c'est le seul endroit qui garde les choses."],
        ['VHS_Baba', '20/11/12', "ce n'est pas du cinéma."],
        ['d34danim', '20/11/12', "non. c'est ce que les gens filment quand ils croient que ça ne compte pas."]
      ] },

    { id: 'bekci', titre: 'Gece Bekçisi', fr: 'Le Veilleur de nuit', annee: 1999, rayon: 'gercek',
      duree: '6 h', support: '3 VHS, caméra fixe', etat: 'stock', prix: '45 TL les trois',
      affiche: 'trois cassettes attachées par un élastique. sur la première : « OTOPARK - 1/3 ».',
      description: "Six heures de caméra fixe sur un parking souterrain de Bayraklı, filmées par un veilleur qui s'ennuyait. Rien ne se passe. À 3 h 14, quelqu'un traverse le champ, de gauche à droite, sans se presser. À 3 h 15, il retraverse. De gauche à droite.",
      coms: [
        ['et_suyu', '01/10/12', "j'ai tout regardé. six heures. pour deux secondes. ça valait le coup."],
        ['Projeksiyon', '01/10/12', "il n'est pas revenu par la droite. il est revenu par la gauche. il a fait le tour par où ?"],
        ['anonim', '02/10/12', "par en dessous."]
      ] },

    { id: 'sessiz', titre: 'Sessiz Parti', fr: 'La Fête silencieuse', annee: 2001, rayon: 'gercek',
      duree: '90 min (un plan)', support: '—', etat: 'introuvable', prix: 'prime : 1 000 TL',
      affiche: 'aucune affiche connue. emplacement pour le seul souvenir qu\'on en a : un ticket d\'entrée violet, « özel gösterim », sans adresse.',
      description: "Une soirée où personne ne parle, en un seul plan de 90 minutes. À la fin, les invités ne sont plus les mêmes qu'au début, mais personne n'est sorti. Projetée une fois dans un club sans nom d'Alsancak. Les copies ont été saisies le lendemain.",
      coms: [
        ['Kaset', '03/03/12', "saisies par qui ?"],
        ['Pic4Death', '03/03/12', "par des gens sans plaque. tout ce qui est saisi dans cette ville finit au même endroit. un bâtiment à Konak. des cartons avec un numéro au feutre."],
        ['DeadDogs', '30/11/12', "ce bâtiment, quelqu'un y est déjà entré ?"],
        ['Pic4Death', '30/11/12', "le gardien du dépôt aime la pizza. c'est tout ce que je dirai ici."]
      ] },

    { id: 'd-01', titre: 'D-01', fr: '', annee: '?', rayon: 'gercek',
      duree: '?', support: '?', etat: 'retiree', prix: 'pas à vendre',
      affiche: 'pas d\'image. pas d\'image.',
      description: "Pas de description.",
      coms: [
        ['kırmızı_perde', '17/02/13', "c'est quoi cette fiche vide ?"],
        ['Pic4Death', '17/02/13', "elle n'est pas à vendre. elle n'est pas à moi."],
        ['kırmızı_perde', '17/02/13', "alors pourquoi elle est dans le catalogue ?"],
        ['Pic4Death', '17/02/13', "parce qu'on m'a demandé de la laisser. on m'appelle en vidéo pour me le demander, chaque mois."]
      ] },

    // ---------------- ZİHİN : thrillers psychologiques ----------------
    { id: 'ayna', titre: 'Ayna', fr: 'Le Miroir', annee: 1997, rayon: 'zihin',
      duree: '101 min', support: 'VHS', etat: 'stock', prix: '30 TL',
      affiche: 'une salle de bain, un miroir au-dessus du lavabo. dans le miroir, la pièce est vide. devant le miroir, un homme se rase.',
      description: "Un traducteur de Bornova cesse un matin de voir son reflet. Il n'en parle à personne. Il continue d'aller travailler. Sa femme commence à acheter des miroirs. Beaucoup de miroirs.",
      coms: [
        ['Projeksiyon', '05/05/12', "le plus beau film du rayon. personne ne meurt, et c'est le plus triste."],
        ['DeadDogs', '18/01/13', "j'ai compris la fin à la troisième fois. ce n'est pas lui qui a disparu."],
        ['Pic4Death', '18/01/13', "tu es le premier client à le dire. tu as gagné une cassette gratuite. tu ne l'auras pas."]
      ] },

    { id: 'kirmizi-oda', titre: 'Kırmızı Oda', fr: 'La Chambre rouge', annee: 2000, rayon: 'zihin',
      duree: '96 min', support: 'VHS', etat: 'stock', prix: '35 TL',
      affiche: 'une pièce entièrement rouge, une table, deux chaises face à face, une caméra sur trépied tournée vers le spectateur.',
      description: "Un couple accepte de passer une semaine dans une chambre filmée pour un jeu télévisé qui n'existe pas. Un juge qu'on ne voit jamais pose une question par jour. Le septième jour, la question, c'est leur adresse.",
      coms: [
        ['kırmızı_perde', '11/11/12', "mon pseudo vient de là. je l'ai vu à 16 ans. je ne réponds plus jamais aux questions qu'on me pose par écrit."],
        ['DeadDogs', '02/02/13', "le juge ne pose pas de questions pour savoir. il pose des questions pour qu'ils sachent qu'il sait."],
        ['Pic4Death', '02/02/13', "tu as l'air de parler de quelqu'un."]
      ] },

    { id: 'dinleyici', titre: 'Dinleyici', fr: "L'Auditeur", annee: 1992, rayon: 'zihin',
      duree: '88 min', support: 'VHS', etat: 'stock', prix: '30 TL',
      affiche: 'un standard téléphonique de nuit, des voyants allumés. un seul combiné décroché pend au bout de son fil.',
      description: "Un standardiste de nuit à la poste centrale de Konak reçoit chaque nuit, à la même heure, l'appel d'une femme qui lui décrit sa chambre à lui. Les draps. Le verre d'eau. Ce qu'il y a sous le lit. Un soir, elle lui dit qu'elle a envoyé quelqu'un.",
      coms: [
        ['VHS_Baba', '09/09/12', "le téléphone qui sonne dans la dernière scène. je l'entends encore quand je m'endors."],
        ['et_suyu', '10/09/12', "le type qu'elle envoie, on ne voit jamais son visage. on voit juste qu'il tient un téléphone."],
        ['anonim', '05/03/13', "il ne frappe jamais. il sonne."]
      ] },

    { id: 'hafiza', titre: 'Hafıza', fr: 'Mémoire', annee: 2004, rayon: 'zihin',
      duree: '112 min', support: 'DVD', etat: 'reservee', prix: '30 TL',
      affiche: 'des étagères d\'archives à perte de vue, des cartons numérotés au feutre. au bout de l\'allée, un homme en costume ouvre un carton et regarde dedans.',
      description: "Un fonctionnaire classe des dossiers saisis dans un bâtiment sans fenêtre. Il fait bien son travail. Un jour, en ouvrant un carton, il trouve un dossier à son nom, avec ses habitudes, ses horaires, ce qu'il a fait la veille. Le dossier est à jour.",
      coms: [
        ['Projeksiyon', '12/03/12', "un des rares films turcs sur les archives. pas un succès."],
        ['kırmızı_perde', '13/03/12', "la scène où il se lit lui-même. je l'ai mise en pause et je suis sorti marcher."],
        ['Pic4Death', '01/03/13', "réservée par quelqu'un qui ne vient jamais la chercher. je la garde quand même. elle aime savoir qu'elle est là."]
      ] },

    { id: 'sevgili', titre: 'Sevgili Komşum', fr: 'Mon cher voisin', annee: 1979, rayon: 'zihin',
      duree: '11 min retrouvées', support: 'Super 8, une bobine', etat: 'surplace', prix: 'consultation : 15 TL',
      affiche: 'photogramme Super 8 granuleux : une fenêtre d\'immeuble d\'Alsancak, une femme qui arrose des plantes sur son balcon, vue d\'en face.',
      description: "Un homme se convainc que sa voisine ne vieillit pas. Il la filme pendant des années depuis sa fenêtre. Les onze minutes retrouvées : elle arrose ses plantes, toujours à la même heure, sur plusieurs saisons. À la dernière minute, elle se tourne vers la caméra et ferme les rideaux.",
      coms: [
        ['Bant', '01/03/13', "retrouvée sur une VHS au marché aux puces. 2 TL. toujours le marché de Karşıyaka."],
        ['Projeksiyon', '01/03/13', "le réalisateur a disparu avant la fin du montage. la voisine n'a jamais été identifiée."],
        ['VHS_Baba', '02/03/13', "elle ferme les rideaux comme quelqu'un qui a toujours su."]
      ] },

    { id: 'misafir', titre: 'Misafir', fr: "L'Invité", annee: 1999, rayon: 'zihin',
      duree: '94 min', support: 'VHS', etat: 'stock', prix: '30 TL',
      affiche: 'une table de famille dressée, tout le monde sourit à l\'objectif. une chaise en bout de table, et la personne assise dessus est découpée de la photo.',
      description: "Un soir de Ramazan, une famille de Karabağlar invite un inconnu à rompre le jeûne. Il ne repart pas. Personne n'ose lui demander de partir. Il ne mange pas. Eux, de moins en moins.",
      coms: [
        ['et_suyu', '25/07/12', "l'hospitalité comme film d'horreur. on n'a pas fini d'en parler."],
        ['VHS_Baba', '26/07/12', "le grand-père qui continue de servir le thé jusqu'à la fin. le plus beau personnage du rayon."]
      ] },

    { id: 'devour', titre: 'Devour Me Softly', fr: '', annee: 2013, rayon: 'zihin', nouveau: true,
      duree: '78 min', support: 'DVD', etat: 'stock', prix: '25 TL',
      affiche: 'jaquette DVD brillante, très soignée : une femme brune en robe de soirée, de dos, qui regarde par-dessus son épaule. crédit : « A. Belgin ».',
      description: "Le dernier film d'A. Belgin, sorti en janvier. Rangé chez nous et non au rayon adulte d'Ege Video parce que personne ne sait dans quel rayon le ranger. Une femme qui ne vieillit pas rend visite à des hommes qui, eux, vieillissent pendant la nuit.",
      coms: [
        ['Projeksiyon', '20/01/13', "elle fait 35 ans. elle en fait 35 depuis 1998. voir nos recherches."],
        ['Kaset', '20/01/13', "ce n'est pas sa fille."],
        ['Pic4Death', '21/01/13', "la société de production a racheté toutes nos copies de son court métrage de 1961. sauf une, qu'on n'a jamais eue."]
      ] },

    { id: 'apartment-12', titre: 'After Midnight, Apartment 12', fr: '', annee: 2005, rayon: 'zihin',
      duree: '83 min', support: 'VHS', etat: 'stock', prix: '20 TL',
      affiche: 'une porte d\'appartement avec un « 12 » en laiton, entrouverte, une lumière rouge qui passe dessous.',
      description: "A. Belgin joue Nadia, une voisine qui frappe chez les gens après minuit pour emprunter quelque chose. Personne ne se souvient de ce qu'il lui a prêté. Classé érotique. Ce n'est pas que ça.",
      coms: [
        ['VHS_Baba', '30/06/12', "trouvé au rayon adulte d'un vidéoclub d'Aydın, entre deux films allemands."],
        ['Projeksiyon', '30/06/12', "le plan final dans le couloir est le même plan que dans Gece Kusu (1961). au cadre près."]
      ] },

    { id: 'body-language', titre: 'Body Language', fr: '', annee: 1998, rayon: 'zihin',
      duree: '91 min', support: 'VHS de festival', etat: 'surplace', prix: 'consultation : 10 TL',
      affiche: 'jaquette de festival avec un tampon « COPIE DE PRESSE », une salle de séminaire vide, des chaises en cercle.',
      description: "Réalisé par A. Belgin. Plusieurs personnages suivent un stage pour apprendre à mieux comprendre leur propre désir. Le stage dure plus longtemps que prévu. Les participants ne s'en plaignent pas, et c'est ça qui dérange.",
      coms: [
        ['Projeksiyon', '14/02/12', "le seul film qu'elle a réalisé, à notre connaissance. elle n'apparaît qu'une seconde, au fond d'un plan."],
        ['et_suyu', '15/02/12', "le formateur ressemble au juge de Kırmızı Oda. même voix."]
      ] },

    { id: 'la-cave', titre: 'La Cave', fr: 'Mahzen', annee: 2013, rayon: 'zihin', nouveau: true,
      duree: '~20 min', support: 'VHS, production du Cercle', etat: 'precommande', prix: '10 TL',
      affiche: 'maquette de jaquette faite main, photocopiée : un mur de briques, une flèche dessinée au marqueur, « BURADA » (ici).',
      description: "Notre court métrage maison ! Une bande d'amis trouve une cave murée sous un vieux magasin de Kemeraltı. Lieu : un vendeur de tapis veut bien nous prêter sa cave pour 20 TL et des thés. Il nous manque toujours une victime. Projeksiyon propose de jouer le mur.",
      coms: [
        ['Projeksiyon', '10/02/13', "tournage en avril. venez aider. apportez une lampe."],
        ['KaTaKoMb', '15/02/13', "je connais la cave. tapez trois fois sur le mur du fond. ça sonne creux. (ne cassez pas)"],
        ['Pic4Death', '15/02/13', "ne cassez pas le mur."]
      ] },

    // ---------------- KAYIP : introuvables ----------------
    { id: 'kuyu', titre: 'Buca Kuyusu', fr: 'Le Puits de Buca', annee: 1986, rayon: 'kayip',
      duree: '?', support: '—', etat: 'introuvable', prix: 'prime : 300 TL',
      affiche: 'aucune image du film. emplacement pour la seule trace : une coupure de fanzine photocopiée, « KUYU » en titre, une critique de trois lignes.',
      description: "Des enfants jettent des choses dans un vieux puits ; le puits les leur rend, mais pas tout à fait dans l'état où ils les ont jetées. Budget : une caméra empruntée et un week-end. Seule trace : une critique de fanzine qui parle d'une scène « avec un chien, d'un réalisme insupportable ».",
      coms: [
        ['d34danim', '30/12/12', "je la cherche depuis 2006. si elle passe au comptoir, je paie le double de la prime."],
        ['Pic4Death', '30/12/12', "le puits existe. les enfants ont grandi. l'un d'eux m'a écrit : il dit qu'il n'a jamais jeté de chien."]
      ] },

    { id: 'kasap', titre: 'Kasap', fr: 'Le Boucher', annee: 1974, rayon: 'kayip',
      duree: '?', support: 'affiche seulement', etat: 'introuvable', prix: 'prime : 200 TL',
      affiche: 'affiche de cinéma de plein air : un tablier blanc, un crochet, une jeune femme qui rit. slogan : « Sizin her parçanızı tanır » (il connaît chaque morceau de vous).',
      description: "Projeté une semaine dans un cinéma de plein air de Karşıyaka, l'été 1974. Le cinéma a fermé à la fin de la semaine. Aucune copie, aucun nom d'acteur.",
      coms: [
        ['Kaset', '18/07/12', "j'ai retrouvé le projectionniste. il ne veut pas en parler. il a quand même dit : « c'était de la vraie viande »."],
        ['VHS_Baba', '19/07/12', "le cinéma de plein air est devenu un parking. on y a retrouvé des os en 2003. des os de vache, d'après le journal."]
      ] },

    { id: 'bergama', titre: 'Bergama\'da Aysız Gece', fr: 'Nuit sans lune à Bergama', annee: 1982, rayon: 'kayip',
      duree: '74 min (son seulement)', support: 'cassette audio', etat: 'surplace', prix: 'écoute : 5 TL',
      affiche: 'une cassette audio BASF, l\'étiquette à moitié arrachée : « …AYSIZ… 82 ».',
      description: "Il ne reste que la bande-son : 74 minutes de vent, de pas sur du gravier, et une femme qui chante une berceuse dans une langue que personne au Cercle n'a reconnue. À la 61e minute, la berceuse s'arrête et quelqu'un, tout près du micro, respire. Puis le vent reprend.",
      coms: [
        ['Bant', '22/04/12', "on l'a écoutée en entier une seule fois, en réunion. plus personne ne veut la réécouter."],
        ['Pic4Death', '22/04/12', "la langue, c'est de l'arménien ancien. je n'ai pas dit ça."]
      ] },

    { id: 'torba', titre: 'Torba', fr: 'Le Sac', annee: 1990, rayon: 'kayip',
      duree: '?', support: '?', etat: 'introuvable', prix: 'prime : ?',
      affiche: 'rien. un sac en toile de jute, photographié par un membre parce que « c\'est à ça que ça devait ressembler ».',
      description: "On ne sait rien sauf le titre, l'année, et qu'il a été tourné à İzmir. Trois membres jurent l'avoir vu. Aucun des trois ne raconte le même film.",
      coms: [
        ['Pic4Death', '09/01/13', "si quelqu'un la trouve, il l'apporte. pas à moi : au Cercle. moi, je n'en veux pas."]
      ] },

    { id: 'foca', titre: 'Foça Düğünü', fr: 'Les Noces de Foça', annee: 1968, rayon: 'kayip',
      duree: '?', support: '—', etat: 'introuvable', prix: 'prime : 250 TL',
      affiche: 'carte postale de Foça des années 60, le port, les bateaux. au dos, au crayon : « tournage aujourd\'hui. ils ont mis la mariée dans l\'eau. »',
      description: "Un mariage de pêcheurs. La mariée doit passer une nuit dans l'eau du port, selon une coutume que personne à Foça ne connaît. Le film est sorti dans deux salles et n'a jamais été rediffusé.",
      coms: [
        ['Kaset', '01/09/12', "j'ai demandé aux vieux de Foça. ils connaissent la coutume. ils disent qu'elle n'existe pas."]
      ] },

    { id: 'gece-kusu', titre: 'Gece Kuşu', fr: "L'Oiseau de nuit (court métrage)", annee: 1961, rayon: 'kayip',
      duree: '9 min', support: 'une bobine 16 mm, abîmée', etat: 'surplace', prix: 'prime pour une 2e copie : 500 TL',
      affiche: 'photogramme 16 mm rayé : une femme brune marche seule dans une rue d\'İzmir la nuit, tous les passants se sont arrêtés pour la regarder.',
      description: "Court métrage muet, 9 minutes. Une femme marche seule dans İzmir la nuit et tous les gens qu'elle croise s'arrêtent pour la regarder. Au générique, une seule actrice : « A.B. ». Comparé image par image avec Devour Me Softly (2013) : même grain de beauté sous l'œil gauche. Même façon de tourner la tête.",
      coms: [
        ['Projeksiyon', '20/01/13', "sa fille, sûrement. ou sa petite-fille."],
        ['Kaset', '20/01/13', "ce n'est pas sa fille."],
        ['Pic4Death', '21/01/13', "la société de production nous a proposé 5 000 TL pour la bobine. on a dit non. depuis, quelqu'un se gare devant Ege Video tous les soirs."]
      ] },

    { id: 'photo-1944', titre: 'photo de plateau', fr: '', annee: '1944 ?', rayon: 'kayip',
      duree: '—', support: 'tirage papier', etat: 'surplace', prix: 'non communicable',
      affiche: 'tirage noir et blanc : une jeune femme de dos devant un projecteur, la nuque dégagée. au dos, au crayon : « le dernier jour avant ».',
      description: "Tirage trouvé dans un carton du marché aux puces, avec des programmes de cinéma de 1943-1945. On ne voit pas son visage. Le membre qui l'a trouvée dit qu'il « la reconnaît à la nuque ». Il a quitté le Cercle la semaine suivante.",
      coms: [
        ['Projeksiyon', '22/01/13', "le dernier jour avant quoi ?"],
        ['Kaset', '22/01/13', "avant qu'elle arrête de vieillir."]
      ] }
  ];

  const parId = {};
  CASSETTES.forEach(c => { parId[c.id] = c; });

  // ============================================================
  //  MORCEAUX DE PAGE
  // ============================================================
  const menu = `
    <p>[ ${L('', 'accueil')} | ${L('catalogue', 'catalogue')} | ${L('nouveautes', 'nouveautés')} | ${L('commander', 'commander')} | ${L('cercle', 'le cercle')} | ${L('pic4death', 'contact')} ]</p>
    <hr>`;

  const pied = `
    <hr>
    <p><small>tout ce qui est vendu ici est une œuvre de fiction. (P4D : presque tout.)<br>
    on ne rembourse pas. on ne rembobine pas pour vous. on ne connaît pas votre nom et on ne veut pas le connaître.</small></p>
    <p><small>dernière mise à jour : 06/03/2013</small></p>`;

  const page = contenu => `<div class="bobines">${menu}${contenu}${pied}</div>`;

  function etat(c) {
    const et = ETATS[c.etat];
    return et.rouge ? `<font color="red">${et.texte}</font>` : et.texte;
  }

  const ligne = c => `
    <tr>
      <td>${L('catalogue/' + c.id, c.titre)}${c.nouveau ? ' <font color="red"><small>nouveau</small></font>' : ''}</td>
      <td>${c.annee}</td>
      <td>${RAYONS[c.rayon].nom}</td>
      <td>${etat(c)}</td>
      <td>${c.coms.length}</td>
    </tr>`;

  const tableau = liste => `
    <table border="1" cellpadding="3" cellspacing="0">
      <tr><th>titre</th><th>année</th><th>rayon</th><th>état</th><th>com.</th></tr>
      ${liste.map(ligne).join('')}
    </table>`;

  function commentaire([pseudo, date, texte]) {
    const p4d = pseudo === 'Pic4Death';
    return `
      <p><b>${pseudo}</b>${p4d ? ' [comptoir]' : ''}${date ? ' - ' + date : ''}<br>
      ${texte}</p>`;
  }

  // ============================================================
  //  LES PAGES
  // ============================================================
  const pages = {};

  // ---------- Accueil ----------
  pages[''] = () => page(`
    <h1>le cercle des bobines perdues</h1>
    <p>kaset · VHS · Super 8 · 16 mm · DVD-R<br>
    İzmir, depuis 2006.</p>
    <p>derrière le rideau rouge d'Ege Video, Kemeraltı. (${L('vitrine', 'la vitrine')})</p>
    <p><b>nouveau :</b> Kesik (1995), six copies. Devour Me Softly (2013). La Cave en précommande.<br>
    <b>retiré :</b> Liman, rıhtım 3.<br>
    retrait au comptoir du fond uniquement. on ne rembourse pas.</p>
    <h3>rayons</h3>
    <ul>
      ${Object.entries(RAYONS).map(([id, r]) => `
        <li>${L('rayon/' + id, r.nom)} - ${r.sous} (${CASSETTES.filter(c => c.rayon === id).length})<br>
        <small>${r.texte}</small></li>`).join('')}
    </ul>
    <h3>derniers commentaires</h3>
    <ul>
      ${CASSETTES.flatMap(c => c.coms.map(k => ({ c, k })))
        .sort((a, b) => b.k[1].split('/').reverse().join('').localeCompare(a.k[1].split('/').reverse().join('')))
        .slice(0, 6)
        .map(({ c, k }) => `<li><b>${k[0]}</b> sur ${L('catalogue/' + c.id, c.titre)} : <i>${k[2]}</i></li>`).join('')}
    </ul>
    <p>vous êtes le visiteur n° 004133.</p>`);

  // ---------- La vitrine : le vrai vidéoclub, devant (lui, il a l'air normal) ----------
  pages['vitrine'] = `
    <div style="background:#ffffee;color:#003366;padding:10px;font-family:Arial;min-height:100%">
      <center><font face="Arial Black" size="6" color="#0055aa">EGE VİDEO</font><br>
      <font size="2">aile filmleri · komedi · çizgi film · yeni çıkanlar — Kemeraltı, depuis 1986</font></center>
      <hr>
      <p><b>Nos nouveautés familiales :</b> L'Âge de glace 4 · Hôtel Transylvanie · Rebelle · Le Hobbit (bientôt)</p>
      <p><b>Location :</b> 3 TL la soirée, 5 TL le week-end. Carte de fidélité : la 10e location offerte !</p>
      <p><b>Rayons :</b> ${L('vitrine/komedi', 'Comédies')} · Dessins animés · Action · Drame · Adulte (+18, au fond à gauche)</p>
      <p><font size="1">Ege Video ne vend ni ne loue de copies pirates. Pour toute question, adressez-vous au comptoir.</font></p>
      <p align="right"><font size="1" color="#ffffee">${L('', 'au fond, derrière le rideau rouge')}</font></p>
    </div>`;

  pages['vitrine/komedi'] = `
    <div style="background:#ffffee;color:#003366;padding:10px;font-family:Arial;min-height:100%">
      <h3>Comédies</h3>
      <ul>
        <li>Recep İvedik 3 (2010)</li><li>Eyyvah Eyvah 2 (2011)</li><li>Hababam Sınıfı (1975, édition restaurée)</li>
        <li>Düğün Dernek (bientôt)</li><li>G.O.R.A. (2004)</li><li>Vizontele (2001)</li>
      </ul>
      <p><font size="2">Fin du rayon. Le rideau rouge n'est pas une sortie de secours.</font></p>
      <p>${L('vitrine', '&lt; retour')} · <font size="1">${L('', 'passer le rideau')}</font></p>
    </div>`;

  // ---------- Catalogue complet, en pages ----------
  const PAR_PAGE = 12;
  const nbPages = Math.ceil(CASSETTES.length / PAR_PAGE);
  for (let n = 1; n <= nbPages; n++) {
    const chemin = n === 1 ? 'catalogue' : 'catalogue/page-' + n;
    pages[chemin] = () => page(`
      <h2>catalogue</h2>
      <p>${CASSETTES.length} titres. page ${n} sur ${nbPages}.</p>
      ${tableau(CASSETTES.slice((n - 1) * PAR_PAGE, n * PAR_PAGE))}
      <p>pages : ${Array.from({ length: nbPages }, (_, i) => i + 1)
        .map(k => k === n ? `${k}` : L(k === 1 ? 'catalogue' : 'catalogue/page-' + k, `${k}`)).join(' ')}</p>`);
  }

  // ---------- Rayons ----------
  Object.entries(RAYONS).forEach(([id, r]) => {
    pages['rayon/' + id] = () => page(`
      <h2>${r.nom} - ${r.sous}</h2>
      <p><i>${r.texte}</i></p>
      ${tableau(CASSETTES.filter(c => c.rayon === id))}
      ${id === 'kayip' ? `<p>voir aussi : ${L('recherches', 'nos recherches sur A. Belgin')}</p>` : ''}`);
  });

  // ---------- Fiches ----------
  CASSETTES.forEach(c => {
    pages['catalogue/' + c.id] = () => {
      const r = RAYONS[c.rayon];
      const et = ETATS[c.etat];
      return page(`
        <p><small>${L('catalogue', 'catalogue')} &gt; ${L('rayon/' + c.rayon, r.nom)} &gt; ${c.titre}</small></p>
        <h2>${c.titre}</h2>
        ${c.fr ? `<p><i>${c.fr}</i></p>` : ''}
        <table border="0" cellpadding="0" cellspacing="10"><tr>
          <td valign="top">${Nav.affiche('cassettes/' + c.id + '.jpg', c.affiche, 200, 300)}</td>
          <td valign="top">
            <table border="1" cellpadding="3" cellspacing="0">
              <tr><td>année</td><td>${c.annee}</td></tr>
              <tr><td>durée</td><td>${c.duree}</td></tr>
              <tr><td>support</td><td>${c.support}</td></tr>
              <tr><td>rayon</td><td>${r.nom} (${r.sous})</td></tr>
              <tr><td>prix</td><td>${c.prix}</td></tr>
              <tr><td>état</td><td>${etat(c)}</td></tr>
            </table>
          </td>
        </tr></table>
        <p>${c.description}</p>
        ${et.reservable ? `
          <form class="form-reservation">
            réserver. n° client : <input name="client" size="6" autocomplete="off">
            <input type="submit" value="réserver">
          </form>
          <p class="reservation-reponse"><small>retrait au comptoir du fond sous 7 jours. pas de livraison. ${L('commander', 'comment ça marche')}</small></p>`
        : `<p><small>${c.etat === 'introuvable' ? 'recherchée par le Cercle. si vous l\'avez, apportez-la au comptoir.'
            : c.etat === 'surplace' ? 'consultation sur place uniquement, dans l\'arrière-salle. 1 personne à la fois.'
            : 'non réservable.'}</small></p>`}
        <hr>
        <h3>commentaires (${c.coms.length})</h3>
        ${c.coms.map(commentaire).join('')}
        <form class="site-form">
          commenter :<br>
          <textarea rows="3" cols="40"></textarea><br>
          <input type="submit" value="envoyer">
        </form>
        <p class="site-reponse"></p>`);
    };
  });

  // ---------- Nouveautés ----------
  pages['nouveautes'] = () => page(`
    <h2>nouveautés</h2>
    ${tableau(CASSETTES.filter(c => c.nouveau))}
    <p><b>Pic4Death</b> : arrivage samedi. un grenier de Bornova. six Kesik, deux cassettes sans étiquette que je n'ai pas encore regardées, et une boîte de bobines 16 mm qui sent la cire. je trie.</p>
    <p><b>Pic4Death</b> : <s>Liman, rıhtım 3</s>. retirée.</p>`);

  // ---------- Commander ----------
  pages['commander'] = page(`
    <h2>comment ça marche</h2>
    <ol>
      <li>Vous avez un numéro client. Si vous n'en avez pas, vous n'êtes pas ici.</li>
      <li>Vous réservez sur la fiche de la cassette, avec votre numéro.</li>
      <li>Vous allez à Ege Video, Kemeraltı. Vous traversez le rayon des comédies. Au fond, le rideau rouge.</li>
      <li>Au comptoir, vous dites « <i>geri sarmaya geldim</i> » (je viens rembobiner). Pas votre nom. Votre numéro.</li>
      <li>Vous payez en liquide. Vous repartez avec un sac Ege Video et une comédie par-dessus, pour la forme.</li>
    </ol>
    <p>Les cassettes « vérité » ne sont jamais réservées deux fois par le même numéro. Si vous redemandez une cassette que vous avez déjà, c'est que ce n'est pas vous.</p>
    <p>${L('retrait', 'horaires du comptoir')}<br>${L('regles', 'règles')}</p>`);

  pages['retrait'] = page(`
    <h2>horaires du comptoir</h2>
    <p>Ege Video ouvre de 10 h à 22 h. Le comptoir du fond ouvre quand Ege Video ferme.</p>
    <p>22 h - 2 h, tous les soirs sauf le vendredi.<br>Le samedi : arrivages. Ne venez pas, on trie.</p>
    <p>Si le rideau est tiré, le comptoir est fermé. Si le rideau est tiré et qu'il y a de la lumière, partez.</p>`);

  pages['regles'] = page(`
    <h2>règles du comptoir</h2>
    <ol>
      <li>Pas de noms.</li>
      <li>Pas de photos du comptoir, du rideau, ou de Pic4Death.</li>
      <li>On ne revend pas une cassette « vérité ». On la rapporte.</li>
      <li>Ce qui est retiré est retiré. On ne demande pas pourquoi.</li>
      <li>Les cassettes de la société de production d'A. Belgin ne se vendent pas à la société de production d'A. Belgin.</li>
      <li>Si quelqu'un vous appelle en vidéo à propos d'une cassette, raccrochez. (P4D : si vous pouvez.)</li>
    </ol>`);

  // ---------- Pic4Death ----------
  pages['pic4death'] = page(`
    <h2>contact</h2>
    <table border="0" cellpadding="0" cellspacing="10"><tr>
      <td valign="top">${Nav.affiche('cassettes/pic4death.jpg', 'pas de photo du comptoir (règle 2).', 120, 120)}</td>
      <td valign="top">
        <p>Je tiens le comptoir depuis 2009. Avant moi, c'était le Cercle, des gens qui achetaient des VHS 2 TL au marché aux puces et qui avaient peur de les regarder.</p>
        <p>Je regarde tout ce qui passe le rideau. Tout. C'est mon travail. Je ne vous dirai pas ce qui est vrai.</p>
        <p>Je ne vends pas aux gens qui posent trop de questions, ni aux gens qui en posent trop peu.</p>
        <p>Je réponds aux mails. Je ne réponds pas aux appels vidéo.</p>
        <p>- P4D</p>
      </td>
    </tr></table>
    <p>clients fidèles ce mois-ci : kırmızı_perde, VHS_Baba, DeadDogs, d34danim, et_suyu</p>`);

  // ---------- Le Cercle (forum des membres) ----------
  const posts = [
    ['Projeksiyon', 'Quelqu\'un a encore un lecteur Super 8 qui marche ?'],
    ['Kaset', 'mon oncle. il ne le prête pas. il dit que la dernière fois qu\'il a projeté une bobine trouvée, « quelque chose est resté ».'],
    ['Projeksiyon', 'ton oncle est très divertissant.'],
    ['Bant', 'nouvelle trouvaille : une VHS « MARIAGE 1988 - NE PAS EFFACER ». 2 h de mariage, puis 20 min de couloir.'],
    ['Kaset', 'carrelé, le couloir ?'],
    ['Bant', 'comment tu sais ?'],
    ['Projeksiyon', 'Pour A. Belgin : j\'ai écrit à sa société de production. Ils m\'ont répondu en une heure. Ils m\'ont demandé mon adresse.'],
    ['Kaset', 'ne la donne pas.'],
    ['Projeksiyon', 'trop tard.'],
    ['Pic4Death', 'Projeksiyon, tu ne viens plus au comptoir ?'],
    ['Pic4Death', 'Projeksiyon ?'],
    ['VHS_Baba', 'il a laissé un mot sur le forum des boulangers. il dit qu\'il va bien et qu\'il a trouvé du travail dans une société de production.'],
    ['Kaset', 'il ne mange pas de pain.']
  ];
  const posts2 = [
    ['et_suyu', 'top 3 du rayon KAN, go.'],
    ['VHS_Baba', '1. Kanlı Düğün 2. Et Pazarı 3. Kesik. pas de débat.'],
    ['kırmızı_perde', 'Kırmızı Oda n\'est pas dans KAN et c\'est le plus violent du magasin.'],
    ['et_suyu', 'il n\'y a pas une goutte de sang dedans.'],
    ['kırmızı_perde', 'justement.'],
    ['DeadDogs', 'Ayna. personne ne meurt. tout le monde a disparu.'],
    ['Pic4Death', 'DeadDogs, ta réservation de la semaine dernière est prête. passe après 22 h.'],
    ['d34danim', 'je cherche toujours la scène du chien du Puits de Buca. si quelqu\'un a une piste, je paie.'],
    ['anonim', 'arrêtez de chercher des choses dans des puits.']
  ];
  const fil = liste => liste.map(([pseudo, texte]) => commentaire([pseudo, '', texte])).join('');
  pages['cercle'] = page(`
    <h2>le cercle</h2>
    <p>forum des membres. 14 membres. cotisation : 10 TL par an, ou une cassette.<br>
    réunions le premier jeudi du mois, au fond du café sans enseigne de Basmane.</p>
    <hr>
    ${fil(posts)}
    <hr>
    <p>${L('cercle/2', 'page 2')}<br>${L('adhesion', 'adhérer')}<br>${L('projets', 'nos projets')}<br>${L('recherches', 'recherches')}</p>`);
  pages['cercle/2'] = page(`
    <h2>le cercle (page 2)</h2>
    <hr>
    ${fil(posts2)}
    <hr>
    <p>${L('cercle', 'page 1')}</p>`);

  pages['adhesion'] = page(`
    <h2>adhérer au Cercle</h2>
    <p>Envoyez-nous une cassette, une bobine, ou une histoire. Nous ne prenons pas d'argent (sauf pour le projecteur, et sauf Pic4Death).</p>
    <p><i>Les membres qui quittent le Cercle sont priés de rendre les cassettes.</i></p>
    <p><i>Les membres qui disparaissent aussi.</i></p>`);

  pages['projets'] = page(`
    <h2>nos projets</h2>
    <ul>
      <li>Numériser les 11 minutes de ${L('catalogue/sevgili', 'Sevgili Komşum')} (il nous faut un projecteur Super 8 qui marche).</li>
      <li>Retrouver le réalisateur de ${L('catalogue/hasta', 'Patient 0')} (il ne répond plus depuis 2009).</li>
      <li>Tourner ${L('catalogue/la-cave', 'La Cave')}. Rôle de la victime encore à pourvoir.</li>
      <li>Ne plus jamais acheter de VHS sans étiquette au marché de Karşıyaka (voté à l'unanimité moins une voix : Bant).</li>
      <li>Retrouver Projeksiyon.</li>
    </ul>`);

  // ---------- Recherches : A. Belgin ----------
  pages['recherches'] = () => page(`
    <h2>recherches en cours : A. Belgin</h2>
    <p>Actrice et réalisatrice d'İzmir, connue pour ses films érotiques à petit budget, souvent rangés à tort dans l'horreur. Le Cercle s'intéresse à elle pour une autre raison.</p>
    ${tableau(['devour', 'apartment-12', 'body-language', 'gece-kusu', 'photo-1944'].map(id => parId[id]))}
    <p>membre « Projeksiyon » (avant) : <i>quelqu'un a une idée de son âge ? sur Devour Me Softly elle fait 35-40 ans max.</i></p>`);
  pages['recherches/1961'] = pages['catalogue/gece-kusu'];
  pages['recherches/1944'] = pages['catalogue/photo-1944'];

  // ============================================================
  //  LES FORMULAIRES : le site répond, mais rien ne se passe
  // ============================================================
  function brancherFormulaires(vue) {
    vue.querySelectorAll('.form-reservation').forEach(form => {
      form.addEventListener('submit', ev => {
        ev.preventDefault();
        vue.querySelector('.reservation-reponse').innerHTML = 'numéro client inconnu. demandez au comptoir.';
      });
    });
    vue.querySelectorAll('.site-form').forEach(form => {
      form.addEventListener('submit', ev => {
        ev.preventDefault();
        vue.querySelector('.site-reponse').innerHTML = 'commentaire envoyé au comptoir. il sera lu. peut-être.';
        form.querySelector('textarea').value = '';
      });
    });
  }

  // ============================================================
  //  ON DONNE LES PAGES AU NAVIGATEUR
  // ============================================================
  Object.entries(pages).forEach(([chemin, contenu]) => {
    const vitrine = chemin.startsWith('vitrine');
    const cassette = parId[chemin.replace('catalogue/', '')];
    Nav.pages[S + (chemin ? '/' + chemin : '')] = () => ({
      titre: vitrine ? 'EGE VİDEO'
        : !chemin ? 'le cercle des bobines perdues'
        : 'le cercle - ' + (cassette ? cassette.titre
          : chemin.startsWith('rayon/') ? RAYONS[chemin.slice(6)].nom
          : chemin.split('/')[0]).toLowerCase(),
      html: typeof contenu === 'function' ? contenu() : contenu,
      couleurs: vitrine
        ? { fond: '#ffffee', texte: '#003366', lien: '#0055aa' }
        : { fond: '#ffffff', texte: '#000000', lien: '#0000ee', lienVu: '#551a8b' },
      classe: vitrine ? '' : 'site-bobines',
      apres: brancherFormulaires
    });
  });
})();
