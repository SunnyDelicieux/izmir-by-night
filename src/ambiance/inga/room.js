
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

    dialog.style.display = "none";

    hideFocusItem();
    hideSprite();
});


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
   PAGES INTERNES
========================= */

function openPage(page) {

    const viewer = document.getElementById("page-viewer");
    const frame = document.getElementById("page-frame");

    frame.src = page;
    viewer.style.display = "block";
}


function closePage() {

    const viewer = document.getElementById("page-viewer");
    const frame = document.getElementById("page-frame");

    frame.src = "about:blank";
    viewer.style.display = "none";
}

