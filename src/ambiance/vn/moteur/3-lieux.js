/* =====================================================================
   LE MOTEUR DE VISUAL NOVEL · 3 sur 5 · LES LIEUX ET LES ÉCRANS

   Un lieu, c'est une image avec des objets cliquables posés dessus (les « zones »)
   et des flèches vers les lieux voisins. Changer de lieu ne recharge pas la page :
   on change seulement l'image et les zones.

   Un écran, c'est une page du site affichée en grand par-dessus le lieu :
   un ordinateur, un téléphone, un minitel… La page est une page HTML normale,
   qui peut parler à l'histoire grâce à pont.js.
===================================================================== */


/* =========================
   LES LIEUX
========================= */

VN.allerA = function (nom) {

    const lieu = VN.lieux[nom];

    if (!lieu) {
        VN.probleme(`Le lieu « ${nom} » n'existe pas.`);
        return;
    }

    VN.memoire.lieu = nom;

    // l'image du lieu (un lieu peut ne pas en avoir : il reste un fond uni)
    VN.el("fond").hidden = !lieu.image;
    if (lieu.image) VN.el("fond").src = lieu.image;

    // les objets : un bouton invisible par zone, placé en pourcentage de l'image
    const [largeur, hauteur] = lieu.taille || VN.config.taille;
    VN.el("scene").style.setProperty("--largeur", largeur);
    VN.el("scene").style.setProperty("--hauteur", hauteur);

    VN.el("zones").innerHTML = "";

    for (const nomObjet of Object.keys(lieu.objets || {})) {

        const [x1, y1, x2, y2] = lieu.objets[nomObjet].zone;
        const zone = document.createElement("button");

        zone.type = "button";
        zone.className = "zone";
        zone.dataset.objet = nomObjet;
        zone.setAttribute("aria-label", nomObjet);
        zone.style.left = (x1 / largeur) * 100 + "%";
        zone.style.top = (y1 / hauteur) * 100 + "%";
        zone.style.width = ((x2 - x1) / largeur) * 100 + "%";
        zone.style.height = ((y2 - y1) / hauteur) * 100 + "%";
        zone.addEventListener("click", () => VN.toucher(nomObjet, zone));

        VN.el("zones").appendChild(zone);
    }

    // les flèches vers les lieux voisins : voisins: { gauche: "entree", droite: "bureau" }
    const dessins = { gauche: "←", droite: "→", haut: "↑", bas: "↓" };

    VN.el("fleches").innerHTML = "";

    for (const cote of Object.keys(lieu.voisins || {})) {
        const fleche = document.createElement("button");
        fleche.type = "button";
        fleche.className = "fleche " + cote;
        fleche.textContent = dessins[cote] || "→";
        fleche.setAttribute("aria-label", "aller vers : " + lieu.voisins[cote]);
        fleche.addEventListener("click", () => {
            if (!VN.occupe) VN.allerA(lieu.voisins[cote]);
        });
        VN.el("fleches").appendChild(fleche);
    }

    VN.sauver(); // garde le lieu en mémoire, et rafraîchit ce qui dépend d'elle (juste en dessous)
};


// Appelée à chaque changement de la mémoire : un objet peut apparaître ou disparaître,
// le compteur peut changer.
VN.rafraichir = function () {

    if (!VN.el("zones")) return; // la page n'est pas encore fabriquée

    const lieu = VN.lieux[VN.memoire.lieu];

    if (lieu) {
        for (const zone of VN.el("zones").children) {
            zone.hidden = !actionDe(lieu, zone.dataset.objet);
        }
    }

    VN.majCompteur();
    if (VN.majAtelier) VN.majAtelier();
};


// Ce que fait un objet en ce moment : rien (il est caché), jouer une scène, ou allumer un écran.
function actionDe(lieu, nomObjet) {

    const objet = lieu.objets[nomObjet];

    // « si » sur un objet : il n'existe que quand la condition est vraie
    if (!VN.estVrai(objet.si)) return null;

    // la nuit en cours peut rebrancher un objet sur une autre scène, ou le retirer :
    //   VN.nuit(2, { objets: { chat: "coussinVide", poster: false } })
    const nuit = VN.nuitActuelle();
    const change = nuit && nuit.objets ? nuit.objets[nomObjet] : undefined;

    if (change === false) return null;
    if (typeof change === "string") return { scene: change };

    return objet;
}


// un clic sur un objet
VN.toucher = function (nomObjet, zone) {

    if (VN.occupe) return; // pas de nouvel objet pendant qu'une scène se joue

    const action = actionDe(VN.lieux[VN.memoire.lieu], nomObjet);
    if (!action) return;

    VN.derniereZone = zone; // pour placer la boîte de dialogue (voir VN.placerDialogue)

    if (action.ecran) VN.allumer(action.ecran);
    else if (action.scene) VN.joue(action.scene);
};


/* =========================
   LES ÉCRANS
   Chaque écran déclaré a son onglet. Sa page est une <iframe>, créée au premier
   allumage puis gardée : les fenêtres ouvertes sur un PC y sont toujours quand
   on revient dessus. Les pages sont rechargées quand on change de nuit.
========================= */

const pagesDesEcrans = {}; // nom de l'écran → son <iframe>
let ecranActuel = null;    // le nom de l'écran affiché

// les pages sont faites pour un écran de cette taille, sauf si l'écran dit autre chose (taille: [800, 600])
const TAILLE_D_ECRAN = [1200, 820];


// appelée une fois au démarrage : les onglets, les boutons, le clavier
VN.preparerEcrans = function () {

    for (const nom of Object.keys(VN.ecrans)) {
        const onglet = document.createElement("button");
        onglet.type = "button";
        onglet.dataset.ecran = nom;
        onglet.textContent = VN.ecrans[nom].titre || nom;
        onglet.addEventListener("click", () => montrerEcran(nom));
        VN.el("ecran-onglets").appendChild(onglet);
    }

    // un seul écran : pas besoin du bouton pour changer
    VN.el("ecran-changer").hidden = Object.keys(VN.ecrans).length < 2;
    VN.el("ecran-changer").addEventListener("click", ecranSuivant);
    VN.el("ecran-eteindre").addEventListener("click", VN.eteindre);

    window.addEventListener("resize", ajusterEcran);

    // raccourcis : Tab pour changer d'écran, Échap pour éteindre
    // (ils ne marchent que quand on n'a pas cliqué dans la page de l'écran)
    document.addEventListener("keydown", (e) => {
        if (VN.el("ecran").hidden) return;
        if (e.key === "Escape") VN.eteindre();
        if (e.key === "Tab") {
            e.preventDefault();
            ecranSuivant();
        }
    });
};


VN.allumer = function (nom) {

    if (!VN.ecrans[nom]) {
        VN.probleme(`L'écran « ${nom} » n'existe pas.`);
        return;
    }

    VN.fermerDialogue();
    VN.el("ecran").hidden = false;
    montrerEcran(nom);
};


function montrerEcran(nom) {

    const ecran = VN.ecrans[nom];

    if (!pagesDesEcrans[nom]) {
        const page = document.createElement("iframe");
        page.src = ecran.page;
        page.title = ecran.titre || nom;
        VN.el("ecran-pages").appendChild(page);
        pagesDesEcrans[nom] = page;
    }

    for (const autre of Object.keys(pagesDesEcrans)) {
        pagesDesEcrans[autre].hidden = autre !== nom;
    }

    for (const onglet of VN.el("ecran-onglets").children) {
        onglet.classList.toggle("actif", onglet.dataset.ecran === nom);
    }

    ecranActuel = nom;
    ajusterEcran();

    // petit grésillement de l'écran à chaque changement (voir vn.css)
    const moniteur = VN.el("ecran-moniteur");
    moniteur.classList.remove("allumage");
    moniteur.offsetHeight;
    moniteur.classList.add("allumage");
}


function ecranSuivant() {
    const noms = Object.keys(VN.ecrans);
    montrerEcran(noms[(noms.indexOf(ecranActuel) + 1) % noms.length]);
}


// l'écran garde les proportions de sa page et prend toute la place disponible
function ajusterEcran() {

    if (VN.el("ecran").hidden || !ecranActuel) return;

    const [largeur, hauteur] = VN.ecrans[ecranActuel].taille || TAILLE_D_ECRAN;
    const moniteur = VN.el("ecran-moniteur");
    const echelle = Math.min(moniteur.clientWidth / largeur, moniteur.clientHeight / hauteur);

    VN.el("ecran-pages").style.width = largeur + "px";
    VN.el("ecran-pages").style.height = hauteur + "px";
    VN.el("ecran-pages").style.transform = `translate(-50%, -50%) scale(${echelle})`;
}


// Éteindre : on revient au lieu, et l'héroïne peut réagir à ce qu'elle vient de regarder
// (« enEteignant » dans la fiche de l'écran : le nom d'une scène).
VN.eteindre = function () {

    if (VN.el("ecran").hidden) return;

    VN.el("ecran").hidden = true;
    VN.derniereZone = null;

    const ecran = VN.ecrans[ecranActuel];
    if (ecran && ecran.enEteignant) VN.joue(ecran.enEteignant);
};


// Utilisées par le lecteur (4-scenes.js) : quand une page d'écran lance une scène,
// l'écran se cache le temps qu'elle se joue, puis revient là où on en était.
VN.cacherEcran = function () {
    const etaitAllume = !VN.el("ecran").hidden;
    VN.el("ecran").hidden = true;
    return etaitAllume;
};

VN.rallumerEcran = function () {
    if (!ecranActuel) return;
    VN.el("ecran").hidden = false;
    montrerEcran(ecranActuel);
};

// Jeter les pages des écrans : elles seront rechargées au prochain allumage.
// (À chaque nouvelle nuit : ce qu'elles montrent peut dépendre de la nuit.)
VN.oublierEcrans = function () {
    VN.el("ecran").hidden = true;
    for (const nom of Object.keys(pagesDesEcrans)) {
        pagesDesEcrans[nom].remove();
        delete pagesDesEcrans[nom];
    }
    ecranActuel = null;
};
