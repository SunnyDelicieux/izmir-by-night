/* =========================
   L'HISTOIRE DE LA CHAMBRE (un point and click)

   La quête du chat :
   1. On regarde le chat (scène 1) : il a faim et se cache.
   2. On fouille le tas qui couine (scène 2) : à mains nues, impossible d'attraper les rats.
   3. On prend une taie d'oreiller dans le tas d'oreillers (scène 2) : elle servira de sac.
   4. On retourne au tas : un clic, un rat ; un autre clic, le deuxième. (« rats : 1 / 2 » en haut)
   5. On retourne voir le chat : Inga lui donne un rat et mange l'autre. Le chat sort.
   6. Derrière lui, elle trouve la lettre, qui lui demande un log.

   Les réactions d'Inga, une seule fois chacune (reactionUnique, plus bas) :
   - la fin de la conversation setite (vermine.exe, PC 1)
   - l'ouverture du dossier Anarch (PC 1)
   - « zacharias » tapé dans ses messages Steam (PC 1)
   - l'ouverture des logs de son groupe (PC 2, ashugh\logs)

   La fin se lance quand ces trois choses sont faites :
   la lettre récupérée, le log écrit (PC 2), la conversation setite terminée.
   Le soleil se lève, puis la nuit suivante : le réveil, le repas, l'appel de Zacharias, la sortie.

   Les phrases sont dans dialogues.js.
   La progression est gardée dans le navigateur : elle reste quand on ferme la page.
   Adresses spéciales, à mettre à la fin de l'adresse de la chambre (ex. /ambiance/inga/#recommencer) :
     #recommencer      tout effacer
     #tester-la-fin    tout marquer comme fait : la fin se lance au premier dialogue fermé
========================= */

const RATS_A_ATTRAPER = 2;
const CLE_PROGRESSION = "inga-progression";


/* La progression est relue à chaque fois : le PC 2 (terminal.html) l'écrit lui aussi. */

function lireProgression() {
    try {
        return JSON.parse(localStorage.getItem(CLE_PROGRESSION)) || {};
    } catch (e) {
        return {};
    }
}

function noterProgression(changements) {
    const progression = Object.assign(lireProgression(), changements);
    try {
        localStorage.setItem(CLE_PROGRESSION, JSON.stringify(progression));
    } catch (e) {
        // navigation privée : la progression ne sera simplement pas gardée
    }
    return progression;
}

try {
    const adresse = window.top.location.hash;
    if (adresse === "#recommencer") {
        localStorage.removeItem(CLE_PROGRESSION);
        localStorage.removeItem("inga-pc2");
    }
    if (adresse === "#tester-la-fin") {
        localStorage.setItem(CLE_PROGRESSION, JSON.stringify({
            chatVu: true, taie: true, rats: 2, chatSorti: true, logEcrit: true, reactions: { vermine: true }
        }));
        localStorage.setItem("inga-pc2", "ouvert");
    }
} catch (e) {}


// Les réactions d'Inga qui n'arrivent qu'une fois. Appelée par les pages des PC :
// chambreDInga()?.reactionUnique("anarch"), etc. (les phrases sont dans dialogues.js)
async function reactionUnique(id) {
    const vues = lireProgression().reactions || {};
    if (vues[id]) return;
    vues[id] = true;
    noterProgression({ reactions: vues });
    await ingaInterrompt(id);
}


// appelée par talk() et ingaInterrompt() (room.js) : combien de phrases de ce dialogue ont été lues
function noterDialogue(id, phrasesLues) {
    const lus = lireProgression().dialogues || {};
    if ((lus[id] || 0) >= phrasesLues) return;
    lus[id] = phrasesLues;
    noterProgression({ dialogues: lus });
}


/* =========================
   LE CHAT, LE TAS, LES OREILLERS
========================= */

// la zone du chat (scène 1)
function toucherChat() {

    const progression = lireProgression();

    if (progression.chatSorti) {
        montrerLettre();
        return;
    }

    if (progression.rats >= RATS_A_ATTRAPER) {
        nourrirChat();
        return;
    }

    noterProgression({ chatVu: true });
    talk("chat");
}


// la zone du tas qui couine (scène 2)
function fouillerTas() {

    const progression = lireProgression();
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
    noterProgression({ rats: rats + 1 });
    majCompteur();
    ingaInterrompt(rats + 1 === 1 ? "rat1" : "rat2");
}


// la zone du tas d'oreillers (scène 2) : la taie, une fois qu'Inga sait qu'il lui faut un sac
function toucherOreillers() {

    const progression = lireProgression();

    if (progression.chatVu && !progression.taie && !progression.chatSorti) {
        noterProgression({ taie: true });
        ingaInterrompt("taie");
        return;
    }

    talk("flesh");
}


async function nourrirChat() {

    await ingaInterrompt("nourrir");

    noterProgression({ chatSorti: true });
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

function majCompteur() {

    let compteur = document.getElementById("compteur");

    if (!compteur) {
        compteur = document.createElement("div");
        compteur.id = "compteur";
        document.body.appendChild(compteur);
    }

    const progression = lireProgression();
    const rats = progression.rats || 0;
    compteur.textContent = `rats : ${rats} / ${RATS_A_ATTRAPER}`;
    compteur.hidden = !rats || progression.chatSorti;
}

majCompteur();


/* =========================
   LA FIN
========================= */

let finEnCours = false;

// appelée quand un dialogue se ferme (room.js) : la lettre, le log et les Setites sont-ils faits ?
function verifierFin() {

    const progression = lireProgression();

    if (finEnCours || progression.fin) return;

    if (progression.chatSorti && progression.logEcrit && (progression.reactions || {}).vermine) {
        jouerLaFin();
    }
}


const attendre = (ms) => new Promise((ok) => setTimeout(ok, ms));

async function jouerLaFin() {

    finEnCours = true;
    await attendre(1200);

    // on quitte l'écran du PC s'il est ouvert : la scène se passe dans la chambre
    ecranFermePourDeBon = true;
    if (typeof ecran !== "undefined" && ecran) ecran.hidden = true;

    // l'aube : la torpeur la prend
    await ingaInterrompt("aube");

    const noir = document.createElement("div");
    noir.id = "noir";
    room.appendChild(noir);
    await attendre(1500);
    noir.innerHTML = `<span>${dialogues.nuitSuivante}</span>`;
    await attendre(3500);
    noir.innerHTML = "";
    noir.classList.add("transparent");

    // la nuit suivante : le réveil, le repas, l'appel de Zacharias, la sortie
    for (const moment of ["lendemain", "repas", "appel", "sortie"]) {
        await ingaInterrompt(moment);
    }

    noterProgression({ fin: true });
    noir.classList.remove("transparent");
    montrerEcranDeFin(noir);
}


function montrerEcranDeFin(noir) {

    if (!noir) {
        noir = document.createElement("div");
        noir.id = "noir";
        room.appendChild(noir);
    }

    // plus de flèche vers l'autre scène : l'histoire est finie
    document.querySelectorAll(".page-arrow").forEach((fleche) => (fleche.hidden = true));

    noir.innerHTML = `
        <span class="fin-titre">${dialogues.fin}</span>
        <button type="button" class="fin-recommencer">recommencer</button>`;

    noir.querySelector(".fin-recommencer").addEventListener("click", () => {
        try {
            localStorage.removeItem(CLE_PROGRESSION);
            localStorage.removeItem("inga-pc2");
        } catch (e) {}
        window.top.location.reload();
    });
}


// si l'histoire est déjà finie, on retombe sur l'écran de fin
if (lireProgression().fin) montrerEcranDeFin();
