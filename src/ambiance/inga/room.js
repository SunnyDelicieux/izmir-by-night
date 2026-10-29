
const room = document.getElementById("room");
const dialog = document.getElementById("dialog");
const text = document.getElementById("text");
const speaker = document.getElementById("speaker");

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

function talk(id) {

    const dialogue = dialogues[id];

    if (!dialogue) return;

    hideFocusItem();

    speaker.src = ingaPortrait;

    // first, puis les repeat ; à la fin, on reboucle sur les repeat,
    // sauf si le dialogue a boucle: false (il reste alors sur la dernière phrase)
    const lignes = [dialogue.first, ...dialogue.repeat];
    const index = seen[id] ?? 0;

    text.textContent = lignes[index];

    if (index + 1 < lignes.length) {
        seen[id] = index + 1;
    } else if (dialogue.boucle !== false) {
        seen[id] = 1;
    }

    dialog.style.display = "block";

    showSprite(dialogue.humeur || "base");


    // Objet en gros plan
    if (dialogue.image) {
        showFocusItem(dialogue.image);
    }
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

dialog.addEventListener("click", () => {

    // pendant une interruption, un clic passe à la phrase suivante (voir ingaInterrompt)
    if (phraseSuivante) {
        phraseSuivante();
        return;
    }

    dialog.style.display = "none";

    hideFocusItem();
    hideSprite();
});


/* =========================
   INGA INTERROMPT
   Appelée par les pages des PC (vermine-cercle.html, la discussion Steam) :
   on quitte l'écran, Inga dit toutes les phrases du dialogue (un clic pour passer
   à la suivante), puis on revient sur le PC, là où on en était.
   Les phrases sont dans dialogues.js (« lignes »).
========================= */

let phraseSuivante = null;

function ingaInterrompt(id) {

    const dialogue = dialogues[id];

    if (!dialogue) return Promise.resolve();

    const lignes = dialogue.lignes || [dialogue.first, ...(dialogue.repeat || [])];
    const etaitSurLePC = ecran && !ecran.hidden;

    if (ecran) ecran.hidden = true;
    hideFocusItem();
    speaker.src = ingaPortrait;

    return new Promise((fini) => {

        let n = 0;

        phraseSuivante = () => {

            if (n < lignes.length) {
                // une ligne est un texte, ou { texte: "…", humeur: "degoutee" } pour changer de sprite
                const ligne = lignes[n++];
                text.textContent = typeof ligne === "string" ? ligne : ligne.texte;
                dialog.style.display = "block";
                showSprite(ligne.humeur || dialogue.humeur || "base");
                return;
            }

            // plus de phrases : on revient sur le PC
            phraseSuivante = null;
            dialog.style.display = "none";
            hideSprite();

            if (etaitSurLePC) {
                ecran.hidden = false;
                ajusterEcran();
                montrerPC(pcActuel);
            }

            fini();
        };

        phraseSuivante();
    });
}


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
