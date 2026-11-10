/* =====================================================================
   LE MOTEUR DE VISUAL NOVEL · 5 sur 5 · L'ATELIER

   Rien ici ne sert au joueur : c'est l'aide pour celle ou celui qui écrit.

   1. LA VÉRIFICATION, à chaque démarrage : le moteur relit toute l'histoire et
      signale en français ce qui cloche (une scène qui n'existe pas, une commande
      mal écrite…). Les messages s'affichent en haut de l'écran quand on travaille
      sur son ordinateur ou en mode atelier ; sur le site en ligne, ils restent
      dans la console du navigateur (F12).

   2. LE MODE ATELIER : ajouter #atelier à la fin de l'adresse de l'histoire
      (ex. /ambiance/inga/#atelier). On y voit les zones cliquables et la mémoire,
      on peut sauter à une nuit, noter ou oublier quelque chose, faire défiler
      les dialogues vite, et mesurer une nouvelle zone (Maj + glisser sur l'image).
      Un clic sur le mot ATELIER replie le panneau.
===================================================================== */

const MODE_ATELIER = location.hash === "#atelier";
const CHEZ_SOI = ["localhost", "127.0.0.1", ""].includes(location.hostname);

// ajouter ou enlever #atelier (ou #recommencer) dans l'adresse recharge la page, pour que ce soit pris en compte
window.addEventListener("hashchange", () => location.reload());


/* =========================
   1. LA VÉRIFICATION
========================= */

// tous les mots qu'une commande peut contenir (voir 4-scenes.js)
const MOTS_CONNUS = [
    "si", "alors", "sinon", "note", "oublie", "ajoute", "va", "choix",
    "image", "facon", "papier", "noir", "duree", "voile", "lieu",
    "attends", "musique", "son", "nuit"
];

VN.verifier = function () {

    // Un fichier illisible (une virgule oubliée…) est ignoré en entier : toutes ses scènes
    // manqueraient à l'appel. On ne signale que l'erreur d'écriture, déjà affichée.
    if (VN.fichierIllisible) return;

    const sceneExiste = (nom, ou) => {
        if (!VN.scenes[nom]) VN.probleme(`${ou} : la scène « ${nom} » n'existe pas.`);
    };

    // une liste d'étapes, et les listes qu'elle contient (choix, alors, sinon)
    const verifierEtapes = (etapes, ou) => {

        if (!Array.isArray(etapes)) {
            VN.probleme(`${ou} : il faut une liste d'étapes, entre crochets [ … ].`);
            return;
        }

        etapes.forEach((etape, n) => {

            const ici = `${ou}, étape ${n + 1}`;

            if (typeof etape === "string") return;

            if (!etape || typeof etape !== "object" || Array.isArray(etape)) {
                VN.probleme(`${ici} : une étape est un texte entre guillemets, ou une commande entre accolades { … }.`);
                return;
            }

            for (const mot of Object.keys(etape)) {
                if (!MOTS_CONNUS.includes(mot)) VN.probleme(`${ici} : je ne connais pas la commande « ${mot} ».`);
            }

            if (etape.va) sceneExiste(etape.va, ici);
            if (etape.lieu && !VN.lieux[etape.lieu]) VN.probleme(`${ici} : le lieu « ${etape.lieu} » n'existe pas.`);
            if (etape.alors) verifierEtapes(etape.alors, ici + " (alors)");
            if (etape.sinon) verifierEtapes(etape.sinon, ici + " (sinon)");

            if (typeof etape.nuit === "number" && !VN.nuits.some((nuit) => nuit.numero === etape.nuit)) {
                VN.probleme(`${ici} : la nuit ${etape.nuit} n'existe pas.`);
            }

            for (const texte of Object.keys(etape.choix || {})) {
                const suite = etape.choix[texte];
                if (Array.isArray(suite)) verifierEtapes(suite, `${ici}, choix « ${texte} »`);
                else sceneExiste(suite, `${ici}, choix « ${texte} »`);
            }
        });
    };

    // les réglages
    if (VN.config.heroine && !VN.personnages[VN.config.heroine]) {
        VN.probleme(`Les réglages disent que l'héroïne est « ${VN.config.heroine} », mais ce personnage n'est pas déclaré.`);
    }

    if (!Object.keys(VN.lieux).length) VN.probleme("L'histoire n'a aucun lieu : il en faut au moins un (VN.lieu).");

    // les scènes
    for (const nom of Object.keys(VN.scenes)) {

        const scene = VN.scenes[nom];
        const ou = `Scène « ${nom} »`;

        if (Array.isArray(scene)) {
            verifierEtapes(scene, ou);
            continue;
        }

        if (!scene || typeof scene !== "object") {
            VN.probleme(`${ou} : une scène est une liste [ … ] ou une fiche { premiere: [ … ], ensuite: [ … ] }.`);
            continue;
        }

        for (const mot of Object.keys(scene)) {
            if (!["premiere", "ensuite", "image"].includes(mot)) {
                VN.probleme(`${ou} : je ne connais pas « ${mot} » (une scène d'objet contient premiere, ensuite, image).`);
            }
        }

        if (scene.premiere) verifierEtapes(scene.premiere, ou + " (premiere)");

        if (scene.ensuite && !Array.isArray(scene.ensuite)) {
            VN.probleme(`${ou} : « ensuite » est une liste de répliques, entre crochets [ … ].`);
        } else {
            (scene.ensuite || []).forEach((replique, n) => {
                if (Array.isArray(replique)) verifierEtapes(replique, `${ou} (ensuite n° ${n + 1})`);
                else verifierEtapes([replique], `${ou} (ensuite n° ${n + 1})`);
            });
        }
    }

    // les lieux et leurs objets
    const tousLesObjets = [];

    for (const nom of Object.keys(VN.lieux)) {

        const lieu = VN.lieux[nom];

        for (const cote of Object.keys(lieu.voisins || {})) {
            if (!VN.lieux[lieu.voisins[cote]]) {
                VN.probleme(`Lieu « ${nom} » : le voisin « ${lieu.voisins[cote]} » n'existe pas.`);
            }
        }

        for (const nomObjet of Object.keys(lieu.objets || {})) {

            const objet = lieu.objets[nomObjet];
            const ou = `Lieu « ${nom} », objet « ${nomObjet} »`;
            tousLesObjets.push(nomObjet);

            const zoneCorrecte = Array.isArray(objet.zone) && objet.zone.length === 4
                && objet.zone.every((nombre) => typeof nombre === "number");

            if (!zoneCorrecte) VN.probleme(`${ou} : il faut une zone de quatre nombres, zone: [x1, y1, x2, y2].`);

            if (objet.scene) sceneExiste(objet.scene, ou);
            else if (objet.ecran) {
                if (!VN.ecrans[objet.ecran]) VN.probleme(`${ou} : l'écran « ${objet.ecran} » n'existe pas.`);
            } else {
                VN.probleme(`${ou} : il ne fait rien. Donne-lui une scène (scene: "…") ou un écran (ecran: "…").`);
            }
        }
    }

    // les écrans
    for (const nom of Object.keys(VN.ecrans)) {
        const ecran = VN.ecrans[nom];
        if (!ecran.page) VN.probleme(`Écran « ${nom} » : il lui faut une page (page: "adresse").`);
        if (ecran.enEteignant) sceneExiste(ecran.enEteignant, `Écran « ${nom} » (enEteignant)`);
    }

    // les nuits
    for (const nuit of VN.nuits) {

        const ou = `Nuit ${nuit.numero}`;

        if (nuit.lieu && !VN.lieux[nuit.lieu]) VN.probleme(`${ou} : le lieu « ${nuit.lieu} » n'existe pas.`);
        if (nuit.debut) sceneExiste(nuit.debut, ou + " (debut)");
        if (nuit.fin) sceneExiste(nuit.fin, ou + " (fin)");

        for (const nomObjet of Object.keys(nuit.objets || {})) {
            if (!tousLesObjets.includes(nomObjet)) {
                VN.probleme(`${ou} : l'objet « ${nomObjet} » n'existe dans aucun lieu.`);
            }
            if (typeof nuit.objets[nomObjet] === "string") sceneExiste(nuit.objets[nomObjet], `${ou}, objet « ${nomObjet} »`);
        }
    }
};


// la liste des problèmes, en haut de l'écran (seulement pour l'autrice : chez soi ou en mode atelier)
VN.montrerProblemes = function () {

    if (!MODE_ATELIER && !CHEZ_SOI) return;
    if (!document.body) return; // la page n'est pas encore là : la liste sera montrée au démarrage

    let boite = document.getElementById("problemes");

    if (!boite) {
        boite = document.createElement("div");
        boite.id = "problemes";
        boite.title = "cliquer pour cacher";
        boite.addEventListener("click", () => (boite.hidden = true));
        document.body.appendChild(boite);
    }

    boite.hidden = !VN.problemes.length;
    boite.innerHTML = "<b>L'histoire a un souci :</b>";

    for (const message of VN.problemes) {
        const ligne = document.createElement("div");
        ligne.textContent = "• " + message;
        boite.appendChild(ligne);
    }
};


/* =========================
   2. LE MODE ATELIER (#atelier)
========================= */

VN.ouvrirAtelier = function () {

    VN.verifier();
    VN.montrerProblemes();

    if (!MODE_ATELIER) return;

    VN.el("vn").classList.add("atelier"); // vn.css dessine alors le contour et le nom des zones

    const atelier = document.createElement("div");
    atelier.id = "atelier";
    atelier.innerHTML = `
        <b id="atelier-titre" title="cliquer pour replier ou déplier">ATELIER ▾</b>
        <div id="atelier-etat"></div>
        <div id="atelier-memoire"></div>
        <div>
            <input id="atelier-nom" placeholder="nom dans la mémoire" autocomplete="off" spellcheck="false">
            <button type="button" id="atelier-noter">noter</button>
            <button type="button" id="atelier-oublier">oublier</button>
        </div>
        <div id="atelier-nuits">aller à la nuit : </div>
        <label><input type="checkbox" id="atelier-vite"> dialogues en accéléré</label>
        <div><button type="button" id="atelier-effacer">tout effacer et recommencer</button></div>
        <div id="atelier-zone">Maj + glisser sur l'image : mesurer une zone</div>`;
    document.body.appendChild(atelier);

    for (const nuit of VN.nuits) {
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.textContent = nuit.numero;
        bouton.addEventListener("click", () => VN.allerALaNuit(nuit.numero));
        VN.el("atelier-nuits").appendChild(bouton);
    }

    VN.el("atelier-noter").addEventListener("click", () => {
        const nom = VN.el("atelier-nom").value.trim();
        if (nom) VN.note(nom);
    });

    VN.el("atelier-oublier").addEventListener("click", () => {
        const nom = VN.el("atelier-nom").value.trim();
        if (nom) VN.oublie(nom);
    });

    VN.el("atelier-vite").addEventListener("change", (e) => (VN.passeVite = e.target.checked));

    // un clic sur le titre replie l'atelier, pour voir ce qu'il cache
    VN.el("atelier-titre").addEventListener("click", () => atelier.classList.toggle("replie"));

    VN.el("atelier-effacer").addEventListener("click", () => {
        VN.toutOublier();
        location.reload();
    });

    mesurerLesZones();
    VN.majAtelier();
};


// ce que l'atelier affiche : la nuit, le lieu, et tout ce que l'histoire a noté
VN.majAtelier = function () {

    if (!MODE_ATELIER || !VN.el("atelier-etat")) return;

    const m = VN.memoire;
    VN.el("atelier-etat").textContent = `nuit ${m.nuit || "?"} · lieu : ${m.lieu || "?"}`;

    const reserves = ["nuit", "lieu", "vues", "debuts", "fini"];
    const notes = Object.keys(m)
        .filter((nom) => !reserves.includes(nom))
        .map((nom) => (m[nom] === true ? nom : `${nom} = ${m[nom]}`));

    VN.el("atelier-memoire").textContent = "mémoire : " + (notes.join(" · ") || "(rien)");
};


// Maj + glisser sur l'image : l'atelier écrit la zone à recopier dans la fiche du lieu
function mesurerLesZones() {

    const scene = VN.el("scene");
    const cadre = document.createElement("div");
    cadre.id = "atelier-cadre";
    cadre.hidden = true;
    scene.appendChild(cadre);

    let depart = null;

    // la position de la souris, en pixels de l'image du lieu
    const position = (e) => {
        const bord = scene.getBoundingClientRect();
        const lieu = VN.lieux[VN.memoire.lieu] || {};
        const [largeur, hauteur] = lieu.taille || VN.config.taille;
        return [
            Math.round(((e.clientX - bord.left) / bord.width) * largeur),
            Math.round(((e.clientY - bord.top) / bord.height) * hauteur)
        ];
    };

    const dessiner = (a, b) => {
        const lieu = VN.lieux[VN.memoire.lieu] || {};
        const [largeur, hauteur] = lieu.taille || VN.config.taille;
        const zone = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[0], b[0]), Math.max(a[1], b[1])];
        cadre.style.left = (zone[0] / largeur) * 100 + "%";
        cadre.style.top = (zone[1] / hauteur) * 100 + "%";
        cadre.style.width = ((zone[2] - zone[0]) / largeur) * 100 + "%";
        cadre.style.height = ((zone[3] - zone[1]) / hauteur) * 100 + "%";
        cadre.hidden = false;
        VN.el("atelier-zone").textContent = `zone: [${zone.join(", ")}]`;
    };

    scene.addEventListener("pointerdown", (e) => {
        if (!e.shiftKey) return;
        e.preventDefault();
        depart = position(e);
    }, true);

    scene.addEventListener("pointermove", (e) => {
        if (depart) dessiner(depart, position(e));
    }, true);

    window.addEventListener("pointerup", () => (depart = null));

    // un clic avec Maj ne déclenche pas l'objet qui est dessous
    scene.addEventListener("click", (e) => {
        if (e.shiftKey) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
}
