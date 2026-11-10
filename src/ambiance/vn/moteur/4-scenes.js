/* =====================================================================
   LE MOTEUR DE VISUAL NOVEL · 4 sur 5 · LE LECTEUR

   C'est le cœur du moteur. Une scène est une liste d'étapes ; le lecteur
   les joue une par une, de haut en bas, en attendant le joueur quand il faut.

   Une étape est :
     - un texte entre guillemets : une réplique (voir VN.lireReplique, dans 2-affichage.js)
     - une commande entre accolades :

         { note: "chatVu" }              retient quelque chose dans la mémoire
         { oublie: "chatVu" }            l'efface
         { ajoute: "rats" }              compte : 1, puis 2, puis 3…
         { va: "autreScene" }            quitte cette scène pour une autre
         { choix: { "Texte du bouton": "sceneA", "Autre bouton": [ …étapes… ] } }
         { image: "objet.png" }          montre une image en gros plan ({ image: "aucune" } l'enlève)
         { papier: `texte` }             montre une lettre à lire
         { noir: "Trois heures plus tard." }   écran noir avec un texte
         { voile: true }                 assombrit le lieu (false pour l'enlever)
         { lieu: "entree" }              change de lieu
         { attends: 1500 }               une pause (en millisecondes : 1000 = une seconde)
         { musique: "fichier.mp3" }      change la musique ("aucune" pour l'arrêter)
         { son: "fichier.mp3" }          joue un son une fois
         { nuit: "suivante" }            termine la nuit tout de suite

       N'importe quelle commande peut avoir une condition :
         { si: "chatSorti", va: "lettre" }                     seulement si chatSorti est noté
         { si: "taie", alors: [ …étapes… ], sinon: [ …étapes… ] }

   Une scène s'écrit de deux façons (voir jouerScene) :
     VN.scene("aube", [ …étapes… ])                         jouée en entier à chaque fois
     VN.scene("chaise", { premiere: [ … ], ensuite: [ … ] })  un objet sur lequel on reclique
===================================================================== */


/* =========================
   CHACUN SON TOUR
   Une seule scène se joue à la fois. Si une autre est demandée pendant ce temps
   (par une page d'écran, par exemple), elle attend son tour dans la file.
========================= */

VN.occupe = false;            // vrai pendant qu'une scène se joue : les objets ne répondent pas
let file = Promise.resolve(); // la file d'attente
let enAttente = 0;            // combien de tâches attendent ou se jouent

function chacunSonTour(tache) {

    enAttente++;
    occuper(true);

    file = file
        .then(tache)
        .catch((erreur) => VN.probleme("Le moteur s'est arrêté sur une erreur : " + erreur.message))
        .then(() => {
            enAttente--;
            if (!enAttente) occuper(false);
        });

    return file;
}

function occuper(oui) {
    VN.occupe = oui;
    VN.el("vn").classList.toggle("en-scene", oui); // vn.css cache les flèches pendant une scène
}


/* =========================
   JOUER UNE SCÈNE
   VN.joue("nom") est la porte d'entrée : c'est ce qu'appellent les objets,
   les écrans (pont.js) et l'atelier.
========================= */

VN.joue = function (nom) {

    if (!VN.scenes[nom]) {
        VN.probleme(`La scène « ${nom} » n'existe pas.`);
        return Promise.resolve();
    }

    if (nAPlusRienADire(nom)) return Promise.resolve();

    return chacunSonTour(async () => {

        if (nAPlusRienADire(nom)) return;

        // si un écran est allumé, il se cache le temps de la scène
        const ecranAllume = VN.cacherEcran();

        VN.placerDialogue();
        VN.derniereZone = null;

        await jouerScene(nom);
        VN.fermerDialogue();

        const nuitChangee = await finirLaNuitSIlFaut();
        if (ecranAllume && !nuitChangee) VN.rallumerEcran();
    });
};

// une scène « premiere » sans « ensuite », déjà vue : elle ne se rejoue pas
function nAPlusRienADire(nom) {
    const scene = VN.scenes[nom];
    if (Array.isArray(scene)) return false;
    const dejaVue = VN.memoire.vues[nom] || 0;
    const aUneSuite = scene.ensuite && scene.ensuite.length;
    return !aUneSuite && (dejaVue > 0 || !scene.premiere);
}


async function jouerScene(nom) {

    const scene = VN.scenes[nom];

    if (!scene) {
        VN.probleme(`La scène « ${nom} » n'existe pas.`);
        return;
    }

    const dejaVue = VN.memoire.vues[nom] || 0;

    if (Array.isArray(scene)) {

        // une liste d'étapes : jouée en entier, à chaque fois
        await jouerEtapes(scene);

    } else {

        // une scène d'objet : « premiere » la première fois ;
        // puis une seule réplique de « ensuite » à chaque clic, chacune son tour, en boucle
        if (scene.image) VN.montrerImage(scene.image);

        if (dejaVue === 0 && scene.premiere) {
            await jouerEtapes(scene.premiere);
        } else if (scene.ensuite && scene.ensuite.length) {
            const tour = (dejaVue - (scene.premiere ? 1 : 0)) % scene.ensuite.length;
            const replique = scene.ensuite[tour];
            await jouerEtapes(Array.isArray(replique) ? replique : [replique]);
        }

        if (scene.image) VN.cacherImage();
    }

    // la scène est comptée comme vue une fois jouée jusqu'au bout
    VN.memoire.vues[nom] = dejaVue + 1;
    VN.sauver();
}


// Joue une liste d'étapes. Répond "parti" si une étape a quitté la scène (va, nuit) :
// ce qui restait dans la liste n'est alors pas joué.
async function jouerEtapes(etapes) {

    for (const etape of etapes) {

        if (nuitDemandee) return "parti";

        // un texte : une réplique
        if (typeof etape === "string") {
            await VN.dire(etape);
            continue;
        }

        // une commande avec une condition fausse : on joue « sinon » s'il y en a un, et on passe
        if (!VN.estVrai(etape.si)) {
            if (etape.sinon && (await jouerEtapes(etape.sinon)) === "parti") return "parti";
            continue;
        }

        if ((await jouerCommande(etape)) === "parti") return "parti";
    }
}


async function jouerCommande(etape) {

    // la mémoire
    if (etape.note) VN.note(etape.note);
    if (etape.oublie) VN.oublie(etape.oublie);
    if (etape.ajoute) VN.ajoute(etape.ajoute);

    // ce qu'on voit, ce qu'on entend
    if ("image" in etape) {
        if (etape.image && etape.image !== "aucune") VN.montrerImage(etape.image, etape.facon);
        else VN.cacherImage();
    }

    if ("voile" in etape) VN.voile(etape.voile);
    if (etape.lieu) VN.allerA(etape.lieu);
    if (etape.musique) VN.lancerMusique(etape.musique);
    if (etape.son) VN.jouerSon(etape.son);

    if (etape.papier) {
        VN.fermerDialogue();
        await VN.montrerPapier(etape.papier);
    }

    if (etape.noir) {
        VN.fermerDialogue();
        await VN.fondreAuNoir();
        await VN.ecrireSurLeNoir(etape.noir, etape.duree);
        VN.sortirDuNoir();
    }

    // une pause : la boîte de dialogue s'efface le temps d'attendre
    if (etape.attends) {
        VN.el("dialogue").hidden = true;
        VN.el("sprite").hidden = true;
        await VN.attendre(etape.attends);
    }

    // si… alors… (le « sinon » est joué par jouerEtapes quand la condition est fausse)
    if (etape.alors) {
        if ((await jouerEtapes(etape.alors)) === "parti") return "parti";
    }

    // des boutons : chaque texte mène à une scène (son nom) ou à une liste d'étapes écrite sur place.
    // Une fois le choix joué, la scène en cours reprend juste après.
    if (etape.choix) {
        const textes = Object.keys(etape.choix);
        const numero = await VN.proposer(textes);
        const suite = etape.choix[textes[numero]];

        if (Array.isArray(suite)) {
            if ((await jouerEtapes(suite)) === "parti") return "parti";
        } else if (suite) {
            await jouerScene(suite);
        }
    }

    // partir : vers une autre nuit, ou vers une autre scène
    if (etape.nuit) {
        nuitDemandee = etape.nuit;
        return "parti";
    }

    if (etape.va) {
        await jouerScene(etape.va);
        return "parti";
    }
}


/* =========================
   LES NUITS
   Une nuit est un chapitre. Sa fiche (VN.nuit(1, { … })) peut contenir :
     titre     un texte sur écran noir, au début de la nuit
     lieu      le lieu où elle commence (sinon on reste où l'on est)
     debut     une scène jouée en arrivant
     objets    ce que les objets font de différent cette nuit-là
     finQuand  la condition qui termine la nuit (voir VN.estVrai)
     fin       la scène jouée à ce moment-là, juste avant la nuit suivante
     musique   une autre musique pour cette nuit

   Après la dernière nuit : l'écran de fin.
========================= */

let nuitDemandee = null; // "suivante" ou un numéro, quand une scène a demandé de changer de nuit

VN.nuitActuelle = function () {
    return VN.nuits.find((nuit) => nuit.numero === VN.memoire.nuit);
};


// appelée après chaque scène : la nuit est-elle finie ? Répond vrai si on a changé de nuit.
async function finirLaNuitSIlFaut() {

    const nuit = VN.nuitActuelle();

    // la nuit a atteint son but : on joue sa scène de fin, puis on passe à la suivante
    if (!nuitDemandee && nuit && nuit.finQuand && VN.estVrai(nuit.finQuand)) {
        await VN.attendre(1200);
        VN.placerDialogue();
        if (nuit.fin) await jouerScene(nuit.fin);
        VN.fermerDialogue();
        if (!nuitDemandee) nuitDemandee = "suivante";
    }

    if (!nuitDemandee) return false;

    const vers = nuitDemandee;
    nuitDemandee = null;

    const position = VN.nuits.indexOf(nuit);
    const prochaine = vers === "suivante"
        ? VN.nuits[position + 1]
        : VN.nuits.find((autre) => autre.numero === vers);

    if (prochaine) {
        await commencerNuit(prochaine);
    } else {
        // plus de nuit : l'histoire est finie
        VN.memoire.fini = true;
        VN.sauver();
        VN.montrerFin();
    }

    return true;
}


async function commencerNuit(nuit) {

    VN.memoire.nuit = nuit.numero;
    VN.oublierEcrans();
    VN.fermerDialogue();

    const lieu = nuit.lieu || VN.memoire.lieu || Object.keys(VN.lieux)[0];

    if (nuit.titre) {
        // le titre de la nuit, sur écran noir ; le lieu change pendant que tout est noir
        await VN.fondreAuNoir();
        VN.voile(false);
        VN.allerA(lieu);
        await VN.ecrireSurLeNoir(nuit.titre);
        VN.sortirDuNoir();
    } else {
        VN.voile(false);
        VN.sortirDuNoir();
        VN.allerA(lieu);
    }

    if (nuit.musique) VN.lancerMusique(nuit.musique);

    await jouerLeDebut(nuit);
}


// la scène de début d'une nuit : une seule fois (si on recharge la page au milieu, elle recommence)
async function jouerLeDebut(nuit) {

    VN.memoire.debuts = VN.memoire.debuts || {};

    if (nuit.debut && !VN.memoire.debuts[nuit.numero]) {
        VN.placerDialogue();
        await jouerScene(nuit.debut);
        VN.fermerDialogue();

        if (!nuitDemandee) {
            VN.memoire.debuts[nuit.numero] = true;
            VN.sauver();
        }
    }

    await finirLaNuitSIlFaut();
}


/* =========================
   LE DÉMARRAGE
   VN.demarrer() est appelée à la fin de la page de l'histoire (index.html),
   une fois tous les fichiers de l'histoire lus.
========================= */

VN.demarrer = function () {

    if (!VN.nuits.length) VN.nuit(1, {}); // une histoire sans nuit déclarée : un seul chapitre
    if (VN.config.titre) document.title = VN.config.titre;

    VN.construire();
    VN.preparerEcrans();
    VN.charger();

    // …/index.html#recommencer : tout effacer
    if (location.hash === "#recommencer") {
        VN.toutOublier();
        history.replaceState(null, "", location.pathname + location.search);
    }

    // l'atelier vérifie l'histoire, et s'ouvre si l'adresse finit par #atelier
    if (VN.ouvrirAtelier) VN.ouvrirAtelier();

    // derrière l'écran d'accueil, le décor est déjà en place
    if (VN.memoire.fini) {
        VN.montrerFin();
    } else {
        const nuit = VN.nuitActuelle() || VN.nuits[0];
        VN.allerA(VN.memoire.lieu || nuit.lieu || Object.keys(VN.lieux)[0]);
    }

    // un clic sur l'écran d'accueil : la musique démarre (les navigateurs l'interdisent avant), et l'histoire aussi
    VN.el("accueil").addEventListener("click", () => {
        VN.el("accueil").classList.add("parti");
        VN.lancerMusique(VN.config.musique);
        if (!VN.memoire.fini) chacunSonTour(commencer);
    }, { once: true });
};


async function commencer() {

    const nuit = VN.nuitActuelle();

    if (!nuit) {
        await commencerNuit(VN.nuits[0]); // une nouvelle partie
    } else {
        await jouerLeDebut(nuit);         // une partie reprise
    }
}


// Utilisée par l'atelier : sauter directement au début d'une nuit.
VN.allerALaNuit = function (numero) {

    const nuit = VN.nuits.find((autre) => autre.numero === numero);
    if (!nuit) return;

    return chacunSonTour(async () => {
        VN.memoire.fini = false;
        if (VN.memoire.debuts) delete VN.memoire.debuts[numero];
        VN.el("vn").classList.remove("fini");
        VN.el("noir-texte").textContent = "";
        VN.el("noir-texte").className = "";
        VN.el("recommencer").hidden = true;
        await commencerNuit(nuit);
    });
};
