/* =========================
   LA QUÊTE DU CHAT (un point and click)
   1. On regarde le chat (scène 1) : il a faim et se cache.
   2. On fouille le tas qui couine (scène 2) : à mains nues, impossible d'attraper les rats.
   3. On prend une taie d'oreiller dans le tas d'oreillers (scène 2) : elle servira de sac.
   4. On retourne au tas : un clic, un rat ; un autre clic, le deuxième. (« rats : 1 / 2 » en haut)
   5. On retourne voir le chat : Inga lui donne un rat et mange l'autre. Le chat sort.
   6. Derrière lui, elle trouve la lettre d'Aram, qui lui demande un log (à faire sur le PC 2).

   Les phrases sont dans dialogues.js (chat, holy, tasMainsNues, taie, rat1, rat2, nourrir, tasVide, lettre).
   La progression est gardée dans le navigateur : elle reste quand on ferme la page.
   Pour tout recommencer : ouvrir la chambre avec #recommencer à la fin de l'adresse
   (ex. /ambiance/inga/#recommencer).
========================= */

const CLE_PROGRESSION = "inga-progression";

function lireProgression() {
    try {
        return JSON.parse(localStorage.getItem(CLE_PROGRESSION)) || {};
    } catch (e) {
        return {};
    }
}

function sauverProgression() {
    try {
        localStorage.setItem(CLE_PROGRESSION, JSON.stringify(progression));
    } catch (e) {
        // navigation privée : la progression ne sera simplement pas gardée
    }
}

let progression = lireProgression();

try {
    if (window.top.location.hash === "#recommencer") {
        localStorage.removeItem(CLE_PROGRESSION);
        localStorage.removeItem("inga-pc2");
        progression = {};
    }
} catch (e) {}


// la zone du chat (scène 1)
function toucherChat() {

    if (progression.chatSorti) {
        montrerLettre();
        return;
    }

    if (progression.rats >= 2) {
        nourrirChat();
        return;
    }

    progression.chatVu = true;
    sauverProgression();
    talk("chat");
}


// la zone du tas qui couine (scène 2)
function fouillerTas() {

    const rats = progression.rats || 0;

    if (progression.chatSorti || rats >= RATS_A_ATTRAPER) {
        talk("tasVide");
        return;
    }

    // tant qu'elle n'a pas vu que le chat a faim, Inga n'a aucune raison d'y plonger les bras
    if (!progression.chatVu) {
        talk("holy");
        return;
    }

    if (!progression.taie) {
        talk("tasMainsNues");
        return;
    }

    // avec la taie d'oreiller : un rat à chaque fois
    progression.rats = rats + 1;
    sauverProgression();
    majCompteur();
    ingaInterrompt(progression.rats === 1 ? "rat1" : "rat2");
}


// la zone du tas d'oreillers (scène 2) : la taie, une fois qu'Inga sait qu'il lui faut un sac
function toucherOreillers() {

    if (progression.chatVu && !progression.taie && !progression.chatSorti) {
        progression.taie = true;
        sauverProgression();
        ingaInterrompt("taie");
        return;
    }

    talk("flesh");
}


async function nourrirChat() {

    await ingaInterrompt("nourrir");

    progression.chatSorti = true;
    sauverProgression();
    majCompteur();

    montrerLettre();
}


/* =========================
   LA LETTRE
========================= */

function montrerLettre() {

    let lettre = document.getElementById("lettre");

    if (!lettre) {
        lettre = document.createElement("div");
        lettre.id = "lettre";
        lettre.innerHTML = `<div class="papier"></div><span class="fermer">cliquer pour reposer la lettre</span>`;
        lettre.addEventListener("click", () => (lettre.hidden = true));
        room.appendChild(lettre);
    }

    lettre.querySelector(".papier").textContent = dialogues.lettre;
    lettre.hidden = false;
    dialog.style.display = "none";
    hideSprite();
}


/* =========================
   LE COMPTEUR EN HAUT : « rats : 1 / 2 »
   Visible tant qu'Inga a des rats et que le chat n'a pas mangé.
========================= */

const RATS_A_ATTRAPER = 2;

function majCompteur() {

    let compteur = document.getElementById("compteur");

    if (!compteur) {
        compteur = document.createElement("div");
        compteur.id = "compteur";
        document.body.appendChild(compteur);
    }

    const rats = progression.rats || 0;
    compteur.textContent = `rats : ${rats} / ${RATS_A_ATTRAPER}`;
    compteur.hidden = !rats || progression.chatSorti;
}

majCompteur();
