/* =====================================================================
   LE MOTEUR DE VISUAL NOVEL · 2 sur 5 · CE QU'ON VOIT

   Ce fichier fabrique la page (dans <div id="vn">) et sait montrer :
     - une réplique dans la boîte de dialogue, avec le sprite de celui qui parle
     - des choix à cliquer
     - une image en gros plan (un objet, un téléphone…)
     - un papier à lire (une lettre, un manuscrit…)
     - l'écran noir (avec un texte), le voile sombre, l'écran de fin
     - le compteur en haut de l'écran, la musique

   Il ne décide de rien : c'est le lecteur (4-scenes.js) qui lui dit quoi montrer.
   Les couleurs et les tailles sont dans vn.css.
===================================================================== */

// raccourci : VN.el("dialogue") = l'élément de la page qui a cet id
VN.el = function (id) {
    return document.getElementById(id);
};


/* =========================
   FABRIQUER LA PAGE
   Tout est créé une seule fois, au démarrage. Ensuite on ne fait que montrer,
   cacher et remplir ces éléments.
========================= */

VN.construire = function () {

    const textes = VN.config.textes;

    VN.el("vn").innerHTML = `

        <!-- la scène : l'image du lieu, et tout ce qui se pose dessus -->
        <div id="scene">
            <img id="fond" alt="">
            <div id="zones"></div>
            <img id="gros-plan" alt="" hidden>
            <div id="noir">
                <span id="noir-texte"></span>
                <button id="recommencer" type="button" hidden>${textes.recommencer}</button>
            </div>
            <img id="sprite" alt="" hidden>

            <div id="dialogue" hidden>
                <img id="portrait" alt="">
                <div id="dialogue-contenu">
                    <div id="nom"></div>
                    <div id="texte"></div>
                    <div id="choix" hidden></div>
                    <span id="suite">${textes.suite}</span>
                </div>
            </div>

            <div id="papier" hidden>
                <div id="feuille"></div>
                <span>${textes.reposer}</span>
            </div>
        </div>

        <!-- les flèches vers les lieux voisins, le compteur -->
        <div id="fleches"></div>
        <div id="compteur" hidden></div>

        <!-- l'écran (les PC), par-dessus tout le reste -->
        <div id="ecran" hidden>
            <div id="ecran-barre">
                <div id="ecran-onglets"></div>
                <button id="ecran-changer" type="button" title="Tab">${textes.changerEcran}</button>
                <button id="ecran-eteindre" type="button" title="Échap">${textes.eteindre}</button>
            </div>
            <div id="ecran-moniteur">
                <div id="ecran-pages"></div>
                <div id="ecran-grain"></div>
            </div>
        </div>

        <!-- l'écran d'accueil, et la musique -->
        <div id="accueil"><span>${VN.config.entrer}</span></div>
        <audio id="musique" loop></audio>`;

    // la taille des images des lieux : vn.css s'en sert pour garder les proportions
    VN.el("scene").style.setProperty("--largeur", VN.config.taille[0]);
    VN.el("scene").style.setProperty("--hauteur", VN.config.taille[1]);

    // une image introuvable ne laisse pas d'icône cassée : on la cache, et on s'en souvient
    for (const id of ["fond", "gros-plan", "sprite", "portrait"]) {
        VN.el(id).addEventListener("error", () => {
            imagesIntrouvables.push(VN.el(id).getAttribute("src"));
            VN.el(id).hidden = true;
        });
    }

    VN.el("dialogue").addEventListener("click", passerALaSuite);
    VN.el("papier").addEventListener("click", reposerLePapier);
    document.addEventListener("keydown", toucheAppuyee);

    prechargerLesImages();
};

const imagesIntrouvables = [];

// les portraits et les sprites sont chargés tout de suite, pour s'afficher sans attendre
function prechargerLesImages() {
    for (const fiche of Object.values(VN.personnages)) {
        const images = [fiche.portrait, ...Object.values(fiche.sprites || {})];
        images.filter(Boolean).forEach((adresse) => (new Image().src = adresse));
    }
}


/* =========================
   LIRE UNE RÉPLIQUE
   L'histoire écrit ses répliques comme dans un script. Dans cet ordre :
   d'abord qui parle, puis l'humeur entre parenthèses, puis le texte.

     "Il fait froid."                    l'héroïne parle
     "(degoutee) Beurk."                 l'héroïne, avec son sprite « degoutee »
     "Zacharias : Bonsoir."              un autre personnage parle
     "Zacharias : (agace) Bonsoir."      un autre personnage, avec une humeur
     "* Elle raccroche."                 de la narration : pas de nom, en italique
     "* (degoutee) Le sang est chaud."   de la narration, avec une humeur de l'héroïne

   Un nom ou une humeur que le moteur ne connaît pas n'est pas un code :
   il reste affiché tel quel dans le texte ("Dernier log : il y a un an.").
========================= */

VN.lireReplique = function (ligne) {

    const replique = {
        qui: VN.config.heroine,
        humeur: "base",
        texte: String(ligne).trim(),
        narration: false
    };

    // « * … » : de la narration
    if (replique.texte.startsWith("*")) {
        replique.narration = true;
        replique.texte = replique.texte.slice(1).trim();
    }

    // « Nom : … » : un personnage déclaré parle
    const deuxPoints = replique.texte.indexOf(":");
    if (!replique.narration && deuxPoints > 0) {
        const nom = replique.texte.slice(0, deuxPoints).trim();
        if (VN.personnages[nom]) {
            replique.qui = nom;
            replique.texte = replique.texte.slice(deuxPoints + 1).trim();
        }
    }

    // « (humeur) … » : une humeur qui existe dans les sprites du personnage montré
    const parenthese = replique.texte.indexOf(")");
    if (replique.texte.startsWith("(") && parenthese > 0) {
        const humeur = replique.texte.slice(1, parenthese).trim();
        if (spritesDe(personnageMontre(replique.qui))[humeur]) {
            replique.humeur = humeur;
            replique.texte = replique.texte.slice(parenthese + 1).trim();
        }
    }

    return replique;
};

function spritesDe(nom) {
    return (VN.personnages[nom] || {}).sprites || {};
}

// Le sprite affiché est celui de la personne qui parle si elle en a un ;
// sinon (narration, voix au téléphone…) celui de l'héroïne reste à l'écran.
function personnageMontre(qui) {
    return Object.keys(spritesDe(qui)).length ? qui : VN.config.heroine;
}


/* =========================
   LA BOÎTE DE DIALOGUE
   VN.dire("…") montre une réplique et attend le clic du joueur.
========================= */

let auClic = null; // ce qu'il faut faire au prochain clic sur la boîte (rien si personne n'attend)

VN.dire = function (ligne) {

    const replique = VN.lireReplique(ligne);

    VN.el("nom").textContent = replique.qui;
    VN.el("nom").hidden = replique.narration || !replique.qui;

    VN.el("texte").textContent = replique.texte;
    VN.el("texte").classList.toggle("narration", replique.narration);

    montrerPortrait(replique.qui);
    montrerSprite(personnageMontre(replique.qui), replique.humeur);

    VN.el("dialogue").hidden = false;

    return attendreLeClic();
};

function attendreLeClic() {
    if (VN.passeVite) return VN.attendre(30); // mode atelier : les répliques défilent toutes seules
    return new Promise((ok) => (auClic = ok));
}

function passerALaSuite() {
    if (!auClic) return;
    const suite = auClic;
    auClic = null;
    suite();
}

// le portrait de celui qui parle ; à défaut, celui de l'héroïne
function montrerPortrait(qui) {
    const fiche = VN.personnages[qui] || {};
    const heroine = VN.personnages[VN.config.heroine] || {};
    const image = fiche.portrait || heroine.portrait;
    const portrait = VN.el("portrait");

    portrait.hidden = !image || imagesIntrouvables.includes(image);
    if (image && portrait.getAttribute("src") !== image) portrait.src = image;
}

function montrerSprite(nom, humeur) {

    const sprite = VN.el("sprite");
    const image = spritesDe(nom)[humeur] || spritesDe(nom).base;

    if (!image) {
        sprite.hidden = true;
        return;
    }

    // l'animation d'arrivée ne se relance que si le sprite change
    const cle = nom + " / " + humeur;
    if (sprite.dataset.cle === cle && !sprite.hidden) return;

    sprite.src = image;
    sprite.dataset.cle = cle;
    sprite.className = humeur; // vn.css ou le style de l'histoire peuvent animer une humeur : #sprite.degoutee
    sprite.hidden = false;
    sprite.style.animation = "none";
    sprite.offsetHeight; // force le navigateur à repartir de zéro
    sprite.style.animation = "";
}

// La boîte se met en bas, ou en haut quand l'objet cliqué est dans le bas de l'image
// (pour ne pas le cacher). VN.derniereZone est remplie par 3-lieux.js.
VN.placerDialogue = function () {

    let enHaut = false;

    if (VN.derniereZone) {
        const zone = VN.derniereZone.getBoundingClientRect();
        const scene = VN.el("scene").getBoundingClientRect();
        enHaut = (zone.top + zone.height / 2 - scene.top) / scene.height > 0.55;
    }

    VN.el("dialogue").classList.toggle("en-haut", enHaut);
};

// tout ranger : la boîte, le sprite, l'image en gros plan
VN.fermerDialogue = function () {
    auClic = null;
    VN.el("dialogue").hidden = true;
    VN.el("dialogue").classList.remove("avec-choix");
    VN.el("texte").textContent = "";
    VN.el("choix").hidden = true;
    VN.el("sprite").hidden = true;
    VN.cacherImage();
};


/* =========================
   LES CHOIX
   VN.proposer(["Répondre", "Se taire"]) affiche des boutons sous la dernière réplique
   et attend. La réponse est le numéro du bouton cliqué : 0 pour le premier, 1 pour le deuxième…
========================= */

VN.proposer = function (textes) {

    const zone = VN.el("choix");

    // si personne ne parlait, la boîte s'ouvre vide, avec le portrait de l'héroïne
    if (VN.el("dialogue").hidden) {
        VN.el("nom").hidden = true;
        montrerPortrait(VN.config.heroine);
        VN.el("dialogue").hidden = false;
    }

    VN.el("dialogue").classList.add("avec-choix");
    zone.innerHTML = "";
    zone.hidden = false;

    return new Promise((ok) => {
        textes.forEach((texte, numero) => {
            const bouton = document.createElement("button");
            bouton.type = "button";
            bouton.textContent = texte;
            bouton.addEventListener("click", (e) => {
                e.stopPropagation();
                zone.hidden = true;
                zone.innerHTML = "";
                VN.el("dialogue").classList.remove("avec-choix");
                ok(numero);
            });
            zone.appendChild(bouton);
        });
    });
};


/* =========================
   L'IMAGE EN GROS PLAN
   Un objet montré au milieu de l'écran. « facon » est un nom de style, facultatif :
   VN.montrerImage("telephone.png", "telephone") → le style de l'histoire décide
   de la taille et de la place avec  #gros-plan.telephone { … }
========================= */

VN.montrerImage = function (image, facon) {
    const grosPlan = VN.el("gros-plan");
    grosPlan.className = facon || "";
    grosPlan.src = image;
    grosPlan.hidden = false;
};

VN.cacherImage = function () {
    VN.el("gros-plan").hidden = true;
};


/* =========================
   LE PAPIER
   Une lettre, une page de manuscrit : le texte s'affiche sur une feuille,
   le joueur clique pour la reposer. Les retours à la ligne du texte sont gardés.
========================= */

let papierRepose = null;

VN.montrerPapier = function (texte) {
    VN.el("feuille").textContent = String(texte).trim();
    VN.el("papier").hidden = false;
    if (VN.passeVite) return VN.attendre(30).then(reposerLePapier);
    return new Promise((ok) => (papierRepose = ok));
};

function reposerLePapier() {
    VN.el("papier").hidden = true;
    const suite = papierRepose;
    papierRepose = null;
    if (suite) suite();
}


/* =========================
   L'ÉCRAN NOIR ET LE VOILE
   #noir recouvre la scène. Il a trois états :
     rien      transparent : on voit le lieu normalement
     voile     sombre mais transparent : pour une scène où l'on ne joue pas (une cinématique)
     plein     tout noir : pour passer d'une nuit à l'autre, ou pour la fin
========================= */

let voileMis = false;

VN.fondreAuNoir = async function () {
    VN.el("noir").className = "plein";
    await VN.attendre(1500); // le temps du fondu (voir vn.css)
};

VN.ecrireSurLeNoir = async function (texte, duree = 3500) {
    VN.el("noir-texte").textContent = texte;
    await VN.attendre(duree);
    VN.el("noir-texte").textContent = "";
};

VN.sortirDuNoir = function () {
    VN.el("noir").className = voileMis ? "voile" : "";
};

VN.voile = function (oui) {
    voileMis = Boolean(oui);
    if (VN.el("noir").className !== "plein") VN.sortirDuNoir();
};

// l'écran de fin : le texte de fin, et un bouton pour tout recommencer
VN.montrerFin = function () {
    VN.fermerDialogue();
    VN.el("vn").classList.add("fini");
    VN.el("noir").className = "plein";
    VN.el("noir-texte").textContent = VN.config.fin;
    VN.el("noir-texte").className = "titre-de-fin";
    VN.el("recommencer").hidden = false;
    VN.el("recommencer").onclick = () => {
        VN.toutOublier();
        location.reload();
    };
};


/* =========================
   LE COMPTEUR, EN HAUT DE L'ÉCRAN
   L'histoire donne une petite formule dans ses réglages :
     compteur: (m) => m.rats ? "rats : " + m.rats + " / 2" : ""
   Un texte vide cache le compteur.
========================= */

VN.majCompteur = function () {
    const compteur = VN.el("compteur");
    if (!compteur) return;
    const texte = VN.config.compteur ? VN.config.compteur(VN.memoire) : "";
    compteur.textContent = texte || "";
    compteur.hidden = !texte;
};


/* =========================
   LA MUSIQUE ET LES SONS
========================= */

VN.lancerMusique = function (fichier) {

    const musique = VN.el("musique");

    if (!fichier || fichier === "aucune") {
        musique.pause();
        return;
    }

    if (musique.getAttribute("src") !== fichier) musique.src = fichier;
    musique.volume = VN.config.volume;
    musique.play().catch(() => {}); // le navigateur refuse parfois : tant pis, pas de musique
};

VN.jouerSon = function (fichier) {
    const son = new Audio(fichier);
    son.volume = VN.config.volume;
    son.play().catch(() => {});
};


/* =========================
   LE CLAVIER
   Espace ou Entrée : passer à la suite. 1, 2, 3… : choisir une réponse.
   (Tab et Échap, pour les écrans, sont dans 3-lieux.js.)
========================= */

function toucheAppuyee(e) {

    // on ne gêne pas quelqu'un qui écrit dans un champ, ni un écran allumé
    if (e.target.closest("input, textarea, select")) return;
    if (!VN.el("ecran").hidden) return;

    const suivant = e.key === " " || e.key === "Enter";

    if (!VN.el("papier").hidden) {
        if (suivant || e.key === "Escape") reposerLePapier();
        return;
    }

    if (!VN.el("choix").hidden) {
        const bouton = VN.el("choix").querySelectorAll("button")[Number(e.key) - 1];
        if (bouton) bouton.click();
        return;
    }

    if (suivant && auClic) {
        e.preventDefault();
        passerALaSuite();
    }
}
