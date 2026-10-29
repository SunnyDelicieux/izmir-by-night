
const room = document.getElementById("room");
const dialog = document.getElementById("dialog");
const text = document.getElementById("text");
const speaker = document.getElementById("speaker");

// La dernière zone cliquée. Si l'objet est dans le bas de l'image, la boîte de dialogue
// se met en haut pour ne pas le cacher (voir placerDialogue).
let derniereZone = null;
room.addEventListener("click", (e) => { derniereZone = e.target.closest(".zone"); }, true);

const ingaPortrait =
    "https://i.postimg.cc/Zn8ZdS2Q/image-2026-09-03-100531968.png";

const seen = {};

// Les sprites d'Inga : « base » par défaut, ou celui donné par « humeur » dans dialogues.js
const sprites = {
    base: "inga-base.webp",
    degoutee: "inga-degoutee.webp"
};

// on les charge tout de suite, pour qu'ils s'affichent sans attendre au premier clic
Object.values(sprites).forEach(src => { new Image().src = src; });


/* =========================
   DIALOGUES
========================= */

// Un clic sur un objet. Chaque « ligne » (first, puis chaque repeat) peut être :
//   un texte (une bulle), ou une liste de textes (plusieurs bulles qui se suivent, un clic pour passer).
async function talk(id) {

    const dialogue = dialogues[id];

    if (!dialogue || phraseSuivante) return;  // pas de nouveau dialogue pendant qu'Inga parle

    // first, puis les repeat ; à la fin, on reboucle sur les repeat,
    // sauf si le dialogue a boucle: false (il reste alors sur la dernière ligne)
    const lignes = [dialogue.first, ...dialogue.repeat];
    const index = seen[id] ?? reprise(id, lignes.length, dialogue.boucle);
    const ligne = lignes[index];

    // pour reprendre au bon endroit en changeant de pièce (quete.js)
    if (typeof noterDialogue === "function") noterDialogue(id, index + 1);

    if (index + 1 < lignes.length) {
        seen[id] = index + 1;
    } else if (dialogue.boucle !== false) {
        seen[id] = 1;
    }

    hideFocusItem();

    // Objet en gros plan
    if (dialogue.image) {
        showFocusItem(dialogue.image);
    }

    await direBulles(Array.isArray(ligne) ? ligne : [ligne], dialogue.humeur);

    // l'histoire avance-t-elle ? (quete.js)
    if (typeof verifierFin === "function") verifierFin();
}


// Chaque pièce est une page à part : en changeant de pièce, on reprend chaque dialogue
// là où on l'avait laissé (quete.js garde combien de phrases ont été lues).
function reprise(id, total, boucle) {

    const lues = typeof lireProgression === "function"
        ? (lireProgression().dialogues || {})[id] || 0
        : 0;

    if (lues < total) return lues;                 // la phrase suivante
    if (boucle === false) return total - 1;        // reste sur la dernière
    return total > 1 ? 1 : 0;                      // tout est lu : on reboucle sur les repeat
}


/* =========================
   OBJET EN GROS PLAN
========================= */

function showFocusItem(image) {

    let item = document.getElementById("focus-item");

    if (!item) {
        item = document.createElement("img");
        item.id = "focus-item";
        room.appendChild(item);
    }

    item.src = image;
    item.style.display = "block";
}


function hideFocusItem() {

    const item = document.getElementById("focus-item");

    if (item) {
        item.style.display = "none";
    }
}


/* =========================
   SPRITE D'INGA
========================= */

function showSprite(humeur) {

    let sprite = document.getElementById("sprite");

    if (!sprite) {
        sprite = document.createElement("img");
        sprite.id = "sprite";
        sprite.alt = "";
        room.appendChild(sprite);
    }

    const src = sprites[humeur] || sprites.base;

    // l'animation ne se relance que si l'humeur change
    if (sprite.dataset.humeur !== humeur || sprite.style.display !== "block") {
        sprite.src = src;
        sprite.dataset.humeur = humeur;
        sprite.className = humeur;
        sprite.style.display = "block";
        sprite.style.animation = "none";
        sprite.offsetHeight; // force le navigateur à repartir de zéro
        sprite.style.animation = "";
    }
}


function hideSprite() {

    const sprite = document.getElementById("sprite");

    if (sprite) {
        sprite.style.display = "none";
    }
}


/* =========================
   FERMER LE DIALOGUE
========================= */

// un clic sur la boîte de dialogue passe à la bulle suivante
dialog.addEventListener("click", () => {
    if (phraseSuivante) phraseSuivante();
});


/* =========================
   LES BULLES
   direBulles montre des bulles l'une après l'autre (un clic pour passer à la suivante).
   Une bulle est un texte, ou un objet :
     { texte: "…", humeur: "degoutee" }   change le sprite d'Inga
     { texte: "…", qui: "Zacharias" }     quelqu'un d'autre parle (son nom et son icône s'affichent)
     { texte: "…", qui: "" }              de la narration, sans personne
========================= */

let phraseSuivante = null;

function direBulles(bulles, humeurParDefaut) {

    placerDialogue();

    return new Promise((fini) => {

        let n = 0;

        phraseSuivante = () => {

            if (n < bulles.length) {
                const bulle = bulles[n++];
                text.textContent = typeof bulle === "string" ? bulle : bulle.texte;
                montrerQuiParle(bulle.qui);
                dialog.style.display = "block";
                showSprite(bulle.humeur || humeurParDefaut || "base");
                return;
            }

            // plus de bulles : on ferme
            phraseSuivante = null;
            montrerQuiParle(undefined);
            dialog.style.display = "none";
            hideFocusItem();
            hideSprite();
            fini();
        };

        phraseSuivante();
    });
}


// la boîte de dialogue en bas (normalement) ou en haut (si l'objet cliqué est dans le bas de l'image)
function placerDialogue() {

    let enHaut = false;

    if (derniereZone) {
        const zone = derniereZone.getBoundingClientRect();
        const image = room.getBoundingClientRect();
        enHaut = (zone.top + zone.height / 2 - image.top) / image.height > 0.55;
    }

    dialog.classList.toggle("en-haut", enHaut);
}


// qui parle : rien (Inga), le nom d'un autre personnage (avec son icône), ou "" (la narration)
function montrerQuiParle(qui) {

    let nom = document.getElementById("nom");

    if (!nom) {
        nom = document.createElement("div");
        nom.id = "nom";
        text.before(nom);
    }

    nom.textContent = qui || "";
    nom.hidden = !qui;
    text.classList.toggle("narration", qui === "");

    const icone = qui && typeof interlocuteurs !== "undefined" ? interlocuteurs[qui] : null;
    speaker.src = icone || ingaPortrait;
}


/* =========================
   INGA INTERROMPT
   Appelée par les pages des PC et par la quête : on quitte l'écran, Inga dit toutes les bulles
   du dialogue (« lignes » dans dialogues.js), puis on revient sur le PC, là où on en était.
========================= */

async function ingaInterrompt(id) {

    const dialogue = dialogues[id];

    if (!dialogue) return;

    // si Inga parle déjà, on attend qu'elle ait fini
    while (phraseSuivante) await new Promise((ok) => setTimeout(ok, 200));

    const etaitSurLePC = ecran && !ecran.hidden;
    if (ecran) ecran.hidden = true;
    hideFocusItem();

    // une conversation au téléphone : le téléphone s'affiche à côté d'Inga (telephone: true dans dialogues.js)
    if (dialogue.telephone) montrerTelephone(true);

    await direBulles(dialogue.lignes || [dialogue.first, ...(dialogue.repeat || [])], dialogue.humeur);

    montrerTelephone(false);

    if (etaitSurLePC && !ecranFermePourDeBon) {
        ecran.hidden = false;
        ajusterEcran();
        montrerPC(pcActuel);
    }

    if (typeof verifierFin === "function") verifierFin();
}

// le téléphone d'Inga (telephone.png, dans ce dossier), affiché pendant les appels
function montrerTelephone(visible) {

    let telephone = document.getElementById("telephone");

    if (!telephone && visible) {
        telephone = document.createElement("img");
        telephone.id = "telephone";
        telephone.alt = "";
        telephone.src = "telephone.png";
        telephone.onerror = () => telephone.remove(); // pas d'image : pas de téléphone, rien ne casse
        room.appendChild(telephone);
    }

    if (telephone) telephone.hidden = !visible;
}

// mis à vrai par la fin de l'histoire : on ne revient plus sur le PC
let ecranFermePourDeBon = false;


/* =========================
   ÉTOILES
========================= */

document.querySelectorAll(".zone").forEach(zone => {

    const star = document.createElement("span");

    star.className = "hint";
    star.textContent = "✦";

    zone.appendChild(star);
});


/* =========================
   LES ORDINATEURS
========================= */

// Les deux PC de la chambre, dans l'ordre des onglets.
//   nom      : le texte de l'onglet
//   page     : la page affichée sur l'écran
//   dialogue : ce qu'Inga dit en l'éteignant (dans dialogues.js)
const ordinateurs = [
    { nom: "PC 1 · bureau", page: "/ambiance/factions/", dialogue: "pc1" },
    { nom: "PC 2 · ???", page: "/ambiance/factions/terminal.html", dialogue: "pc2" }
];

// les pages des PC sont faites pour un écran de 1200 × 820 pixels
const LARGEUR_PC = 1200;
const HAUTEUR_PC = 820;

const ecran = document.getElementById("ecran");
const ecranPages = document.getElementById("ecran-pages");
const ecranOnglets = document.getElementById("ecran-onglets");
const moniteur = document.getElementById("ecran-moniteur");

let pcActuel = null;
const pages = []; // une <iframe> par PC, créée au premier allumage puis gardée :
                  // les fenêtres ouvertes sur un PC y sont toujours quand on revient dessus


// un onglet par PC (seulement dans la scène qui a les ordinateurs)
if (ecran) ordinateurs.forEach((pc, n) => {
    const onglet = document.createElement("button");
    onglet.type = "button";
    onglet.textContent = pc.nom;
    onglet.addEventListener("click", () => montrerPC(n));
    ecranOnglets.appendChild(onglet);
});


function allumerPC(n) {

    dialog.style.display = "none";
    hideFocusItem();
    hideSprite();

    ecran.hidden = false;
    ajusterEcran();
    montrerPC(n);
}


function montrerPC(n) {

    if (!pages[n]) {
        const frame = document.createElement("iframe");
        frame.src = ordinateurs[n].page;
        frame.title = ordinateurs[n].nom;
        ecranPages.appendChild(frame);
        pages[n] = frame;
    }

    pages.forEach((frame, i) => { if (frame) frame.hidden = i !== n; });

    ecranOnglets.querySelectorAll("button").forEach((onglet, i) => {
        onglet.classList.toggle("actif", i === n);
    });

    // petit grésillement de l'écran à chaque changement
    moniteur.classList.remove("allumage");
    moniteur.offsetHeight;
    moniteur.classList.add("allumage");

    pcActuel = n;
}


function changerPC() {
    montrerPC((pcActuel + 1) % ordinateurs.length);
}


function eteindrePC() {

    if (ecran.hidden) return;

    const pc = ordinateurs[pcActuel];
    ecran.hidden = true;

    // Inga réagit au PC qu'on vient de regarder
    if (pc.dialogue) talk(pc.dialogue);
}


// l'écran garde les proportions du PC et prend toute la place disponible
function ajusterEcran() {

    const echelle = Math.min(
        moniteur.clientWidth / LARGEUR_PC,
        moniteur.clientHeight / HAUTEUR_PC
    );

    ecranPages.style.width = LARGEUR_PC + "px";
    ecranPages.style.height = HAUTEUR_PC + "px";
    ecranPages.style.transform = `translate(-50%, -50%) scale(${echelle})`;
}


window.addEventListener("resize", () => { if (ecran && !ecran.hidden) ajusterEcran(); });

document.getElementById("ecran-changer")?.addEventListener("click", changerPC);
document.getElementById("ecran-eteindre")?.addEventListener("click", eteindrePC);

// raccourcis : Tab pour changer de PC, Échap pour éteindre
// (ils ne marchent que quand on n'a pas cliqué dans la page d'un PC)
document.addEventListener("keydown", (e) => {
    if (!ecran || ecran.hidden) return;
    if (e.key === "Escape") eteindrePC();
    if (e.key === "Tab") { e.preventDefault(); changerPC(); }
});
