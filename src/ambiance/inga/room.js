
const room = document.getElementById("room");
const dialog = document.getElementById("dialog");
const text = document.getElementById("text");
const speaker = document.getElementById("speaker");

const ingaPortrait =
    "https://i.postimg.cc/Zn8ZdS2Q/image-2026-09-03-100531968.png";

const seen = {};


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
   FERMER LE DIALOGUE
========================= */

dialog.addEventListener("click", () => {

    dialog.style.display = "none";

    hideFocusItem();
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

