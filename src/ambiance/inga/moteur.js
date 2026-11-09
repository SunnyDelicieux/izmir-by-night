/* =========================================================
   LE MOTEUR DE LA CHAMBRE D'INGA

   On n'a normalement pas besoin de toucher à ce fichier :
   - ce qui se dit et se passe : histoire/nuit-1.txt, nuit-2.txt…
   - les pièces, les zones cliquables, les ordinateurs : index.html
   - les portraits et les sprites : personnages.js
   Le mode d'emploi est dans LISEZMOI.md.

   Le fichier se lit de haut en bas :
     1. la sauvegarde et les drapeaux
     2. lire un fichier d'histoire
     3. jouer un bloc (les bulles, les actions entre crochets)
     4. les pièces et les zones
     5. les ordinateurs
     6. les nuits
     7. le démarrage
   ========================================================= */

const DOSSIER_HISTOIRE = "histoire/";
const TEXTE_DE_FIN = "FIN — pour l'instant.";
const CLE_SAUVEGARDE = "inga-sauvegarde";
const DELAI_REACTION = 1500;   // le temps avant qu'Inga réagisse à une page de PC (en millisecondes)

// les éléments de la page dont le moteur se sert
const boite = document.getElementById("dialogue");
const boiteNom = document.getElementById("dialogue-nom");
const boiteTexte = document.getElementById("dialogue-texte");
const boitePortrait = document.getElementById("dialogue-portrait");
const sprite = document.getElementById("sprite");
const grosPlan = document.getElementById("gros-plan");
const telephone = document.getElementById("telephone");
const noir = document.getElementById("noir");
const papier = document.getElementById("papier");
const erreurs = document.getElementById("erreurs");

const attendre = (millisecondes) => new Promise((suite) => setTimeout(suite, millisecondes));


/* =========================================================
   1. LA SAUVEGARDE ET LES DRAPEAUX
   Tout ce dont le jeu se souvient tient dans « etat ».
   Il est gardé dans le navigateur : il reste quand on ferme la page.
   ========================================================= */

let etat = nouvelEtat(1);

function nouvelEtat(nuit) {
    return {
        nuit: nuit,
        piece: "chambre",
        drapeaux: [],          // ce qu'Inga a fait ou vu : "chat_vu", "taie", "vu steam"…
        clics: {},             // combien de fois chaque bloc a été joué cette nuit
        vusCetteNuit: [],      // les pages de PC déjà ouvertes cette nuit
        debutJoue: false,
        finDeNuitJouee: false
    };
}

function sauvegarder() {
    try {
        localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(etat));
    } catch (e) {
        // navigation privée : la partie ne sera simplement pas gardée
    }
}

function chargerSauvegarde() {
    try {
        const sauvegarde = JSON.parse(localStorage.getItem(CLE_SAUVEGARDE));
        if (sauvegarde) etat = sauvegarde;
    } catch (e) {}
}

function effacerSauvegarde() {
    try {
        localStorage.removeItem(CLE_SAUVEGARDE);
    } catch (e) {}
}

function aLeDrapeau(nom) {
    return etat.drapeaux.includes(nom);
}

function donner(nom) {
    if (!aLeDrapeau(nom)) {
        etat.drapeaux.push(nom);
        sauvegarder();
    }
}

// conditions : une liste comme ["chat_vu", "pas taie"]
function conditionsRemplies(conditions) {
    for (const condition of conditions) {
        if (condition.startsWith("pas ")) {
            if (aLeDrapeau(condition.slice(4))) return false;
        } else {
            if (!aLeDrapeau(condition)) return false;
        }
    }
    return true;
}

// "chat_vu, pas taie" → ["chat_vu", "pas taie"]
function lireConditions(texte) {
    if (!texte) return [];
    return texte.split(",").map((condition) => condition.trim()).filter((condition) => condition !== "");
}


/* =========================================================
   2. LIRE UN FICHIER D'HISTOIRE
   Le texte de nuit-1.txt devient une liste de blocs :
     { nom: "chat", conditions: ["rats"], titre: "chat si rats", parties: [ [...], [...] ] }
   Une partie = ce qui se joue en un clic. La 1re au premier clic, les suivantes ensuite.
   Dans une partie, chaque ligne est :
     { sorte: "parole", qui: "Inga (dégoûtée)", personnage: "Inga", texte: "…" }
     { sorte: "narration", texte: "…" }
     { sorte: "action", texte: "donne taie" }
   ========================================================= */

const ACTIONS = ["donne", "image", "document", "téléphone", "raccroche", "noir", "pièce", "nuit suivante"];

let blocs = [];

function lireHistoire(texte, nomDuFichier) {

    const resultat = [];
    let bloc = null;
    const lignes = texte.split("\n");

    for (let numero = 1; numero <= lignes.length; numero++) {

        const ligne = lignes[numero - 1].trim();

        // une ligne vide ou un commentaire
        if (ligne === "" || ligne.startsWith("//")) continue;

        // « == chat == » ou « == chat si rats == » : un nouveau bloc
        if (ligne.startsWith("==")) {
            const titre = ligne.split("=").join("").trim();
            const morceaux = titre.split(" si ");
            bloc = {
                nom: morceaux[0].trim(),
                conditions: lireConditions(morceaux[1]),
                titre: titre,
                parties: [[]]
            };
            resultat.push(bloc);
            continue;
        }

        if (bloc === null) {
            signalerErreur(nomDuFichier, numero, ligne, "cette ligne doit être dans un bloc (== nom ==)");
            continue;
        }

        const partie = bloc.parties[bloc.parties.length - 1];

        // « --- ensuite --- » : la partie suivante (le clic d'après)
        if (ligne.startsWith("---")) {
            bloc.parties.push([]);
            continue;
        }

        // « [donne taie] » : une action
        if (ligne.startsWith("[") && ligne.endsWith("]")) {
            const action = ligne.slice(1, -1).trim();
            if (ACTIONS.includes(premierMot(action)) || ACTIONS.includes(action)) {
                partie.push({ sorte: "action", texte: action });
            } else {
                signalerErreur(nomDuFichier, numero, ligne, "action inconnue");
            }
            continue;
        }

        // « * Elle raccroche. » : de la narration
        if (ligne.startsWith("*")) {
            partie.push({ sorte: "narration", texte: ligne.slice(1).trim() });
            continue;
        }

        // « Inga : … » ou « Inga (dégoûtée) : … » : quelqu'un parle
        const deuxPoints = ligne.indexOf(":");
        if (deuxPoints > 0) {
            const qui = ligne.slice(0, deuxPoints).trim();
            const personnage = qui.split("(")[0].trim();
            if (personnage in PORTRAITS) {
                partie.push({ sorte: "parole", qui: qui, personnage: personnage, texte: ligne.slice(deuxPoints + 1).trim() });
                continue;
            }
        }

        signalerErreur(nomDuFichier, numero, ligne, "personnage inconnu (voir personnages.js) ou ligne incomprise");
    }

    return resultat;
}

function premierMot(texte) {
    return texte.split(" ")[0];
}

// tout ce qui suit le premier mot : « image img/chat.webp » → « img/chat.webp »
function apresLePremierMot(texte) {
    return texte.split(" ").slice(1).join(" ").trim();
}

function signalerErreur(fichier, numero, ligne, raison) {
    const message = document.createElement("p");
    message.textContent = `${fichier}, ligne ${numero} : ${raison} → « ${ligne} »`;
    erreurs.appendChild(message);
    erreurs.hidden = false;
}


/* =========================================================
   3. JOUER UN BLOC
   ========================================================= */

let occupe = false;                 // vrai pendant qu'un bloc se joue
let nuitSuivanteDemandee = false;   // mis à vrai par [nuit suivante]

// La version d'un bloc à jouer : la DERNIÈRE du fichier dont les conditions sont remplies.
function trouverBloc(nom) {
    let trouve = null;
    for (const bloc of blocs) {
        if (bloc.nom === nom && conditionsRemplies(bloc.conditions)) {
            trouve = bloc;
        }
    }
    return trouve;
}

function existeUnBloc(nom) {
    return blocs.some((bloc) => bloc.nom === nom);
}

// Le 1er clic joue la 1re partie, le 2e la 2e… puis on tourne en boucle sur les parties « ensuite ».
function choisirPartie(bloc) {

    const fois = etat.clics[bloc.titre] || 0;
    etat.clics[bloc.titre] = fois + 1;
    sauvegarder();

    const nombre = bloc.parties.length;

    if (fois < nombre) return bloc.parties[fois];
    if (nombre === 1) return bloc.parties[0];
    return bloc.parties[1 + (fois - 1) % (nombre - 1)];
}

async function jouer(nom) {

    const bloc = trouverBloc(nom);
    if (bloc === null) return;

    occupe = true;

    for (const ligne of choisirPartie(bloc)) {
        if (ligne.sorte === "action") {
            await faire(ligne.texte);
        } else {
            await dire(ligne);
        }
    }

    fermerDialogue();
    occupe = false;

    if (nom === "début") etat.debutJoue = true;
    if (nom === "fin de nuit") etat.finDeNuitJouee = true;
    sauvegarder();

    if (nuitSuivanteDemandee) {
        nuitSuivanteDemandee = false;
        await passerALaNuit(etat.nuit + 1);
        return;
    }

    await verifierFinDeNuit();
}

// Pour les réactions (« vu … ») : on attend qu'Inga ait fini de parler avant de jouer le bloc.
async function jouerQuandLibre(nom) {
    while (occupe) {
        await attendre(300);
    }
    await jouer(nom);
}

// « == fin de nuit si … == » se joue tout seul, une fois, dès que ses conditions sont remplies.
async function verifierFinDeNuit() {
    if (occupe || etat.finDeNuitJouee) return;
    if (trouverBloc("fin de nuit") !== null) {
        await jouer("fin de nuit");
    }
}


/* --- les bulles --- */

let avancer = null;   // la fonction qui passe à la bulle suivante (un clic sur la boîte)

boite.addEventListener("click", () => {
    if (avancer) avancer();
});

function dire(ligne) {

    if (ligne.sorte === "narration") {
        boiteNom.hidden = true;
        boitePortrait.hidden = true;
        boiteTexte.classList.add("narration");
    } else {
        boiteNom.hidden = false;
        boiteNom.textContent = ligne.personnage;
        boitePortrait.src = PORTRAITS[ligne.personnage] || "";
        boitePortrait.hidden = !PORTRAITS[ligne.personnage];
        boiteTexte.classList.remove("narration");
        montrerSprite(ligne);
    }

    boiteTexte.textContent = ligne.texte;
    boite.hidden = false;

    // on attend le clic
    return new Promise((suite) => {
        avancer = () => {
            avancer = null;
            suite();
        };
    });
}

function montrerSprite(ligne) {

    // « Inga (dégoûtée) » d'abord, sinon « Inga », sinon on garde le sprite affiché
    const image = SPRITES[ligne.qui] || SPRITES[ligne.personnage];
    if (!image) return;

    // l'animation ne se relance que si l'image change
    if (sprite.getAttribute("src") !== image || sprite.hidden) {
        sprite.src = image;
        sprite.classList.toggle("sursaut", ligne.qui.includes("("));
        sprite.hidden = false;
        sprite.style.animation = "none";
        sprite.offsetHeight;   // oblige le navigateur à repartir de zéro
        sprite.style.animation = "";
    }
}

function fermerDialogue() {
    boite.hidden = true;
    sprite.hidden = true;
    grosPlan.hidden = true;
    telephone.hidden = true;
}


/* --- les actions entre crochets --- */

async function faire(action) {

    const mot = premierMot(action);
    const valeur = apresLePremierMot(action);

    if (action === "nuit suivante") {
        nuitSuivanteDemandee = true;
    } else if (mot === "donne") {
        donner(valeur);
    } else if (mot === "image") {
        grosPlan.src = valeur;
        grosPlan.hidden = false;
    } else if (mot === "document") {
        await montrerDocument(valeur);
    } else if (mot === "téléphone") {
        telephone.hidden = false;
    } else if (mot === "raccroche") {
        telephone.hidden = true;
    } else if (mot === "noir") {
        await ecranNoir(valeur);
    } else if (mot === "pièce") {
        allerDans(valeur);
    }
}

// [document histoire/lettre.txt] : une feuille en plein écran, un clic pour la reposer
async function montrerDocument(adresse) {

    const reponse = await fetch(adresse, { cache: "no-cache" });
    papier.querySelector(".feuille").textContent = reponse.ok ? await reponse.text() : "(document introuvable : " + adresse + ")";

    boite.hidden = true;
    papier.hidden = false;

    await new Promise((suite) => {
        papier.onclick = () => {
            papier.hidden = true;
            suite();
        };
    });
}

// [noir La nuit suivante.] : l'écran devient noir, le texte s'affiche, puis l'écran revient
async function ecranNoir(texte) {
    boite.hidden = true;
    sprite.hidden = true;
    noir.textContent = "";
    noir.hidden = false;
    await attendre(1500);
    noir.textContent = texte;
    await attendre(3500);
    noir.textContent = "";
    noir.classList.add("disparait");
    await attendre(1500);
    noir.classList.remove("disparait");
    noir.hidden = true;
}


/* =========================================================
   4. LES PIÈCES ET LES ZONES
   Elles sont écrites dans index.html : <section class="piece" id="chambre">…
   ========================================================= */

function allerDans(nomDeLaPiece) {

    const piece = document.getElementById(nomDeLaPiece);
    if (!piece) return;

    eteindre(false);

    for (const autre of document.querySelectorAll(".piece")) {
        autre.hidden = autre !== piece;
    }

    etat.piece = nomDeLaPiece;
    sauvegarder();
}

// l'ordinateur qui porte ce nom dans index.html (<section class="ordinateur" id="pc1">), ou null
function trouverOrdinateur(nom) {
    const element = document.getElementById(nom);
    if (element && element.classList.contains("ordinateur")) return element;
    return null;
}

// une zone n'est visible que si elle a quelque chose à dire cette nuit (ou si c'est un ordinateur)
function majZones() {
    for (const zone of document.querySelectorAll(".zone")) {
        const nom = zone.dataset.nom;
        zone.hidden = !existeUnBloc(nom) && trouverOrdinateur(nom) === null;
    }
}

document.addEventListener("click", (evenement) => {

    if (occupe) return;   // pas de nouveau clic pendant qu'Inga parle

    const zone = evenement.target.closest(".zone");
    if (zone) {
        const nom = zone.dataset.nom;
        const ordinateur = trouverOrdinateur(nom);
        if (ordinateur !== null) {
            allumer(ordinateur);
        } else {
            jouer(nom);
        }
        return;
    }

    const fleche = evenement.target.closest(".fleche");
    if (fleche) {
        allerDans(fleche.dataset.vers);
    }
});


/* =========================================================
   5. LES ORDINATEURS
   Ils sont écrits dans index.html : <section class="ordinateur" id="pc1">…
   Chaque lien <a href="…"> d'un ordinateur s'ouvre dans sa fenêtre.
   ========================================================= */

let pcAllume = null;

function allumer(ordinateur) {

    pcAllume = ordinateur;

    // les liens qui n'apparaissent qu'à certaines conditions (data-si="lettre")
    for (const element of ordinateur.querySelectorAll("[data-si]")) {
        element.hidden = !conditionsRemplies(lireConditions(element.dataset.si));
    }

    // le mot de passe, s'il y en a un et qu'il n'a pas encore été trouvé
    const verrou = ordinateur.querySelector(".verrou");
    const session = ordinateur.querySelector(".session");
    if (verrou) {
        const ouvert = aLeDrapeau(ordinateur.id + " ouvert");
        verrou.hidden = ouvert;
        session.hidden = !ouvert;
    }

    ordinateur.hidden = false;

    if (verrou && !verrou.hidden) verrou.querySelector("input").focus();
}

// en éteignant un PC, Inga dit le bloc qui porte son nom (« == pc1 == »)
function eteindre(avecCommentaire) {

    if (pcAllume === null) return;

    fermerFenetre();
    pcAllume.hidden = true;
    const nom = pcAllume.id;
    pcAllume = null;

    if (avecCommentaire && !occupe) jouer(nom);
}

function ouvrirFichier(adresse, titre) {

    const fenetre = pcAllume.querySelector(".fenetre");
    const contenu = fenetre.querySelector(".fenetre-contenu");
    fenetre.querySelector(".fenetre-titre").textContent = titre;
    contenu.innerHTML = "";

    if (adresse.endsWith(".txt")) {
        // un fichier texte : affiché tel quel
        const texte = document.createElement("pre");
        contenu.appendChild(texte);
        fetch(adresse, { cache: "no-cache" })
            .then((reponse) => reponse.text())
            .then((lu) => { texte.textContent = lu; });
        voir(adresse);
    } else if (adresse.endsWith(".webp") || adresse.endsWith(".png") || adresse.endsWith(".jpg")) {
        // une image
        const image = document.createElement("img");
        image.src = adresse;
        contenu.appendChild(image);
        voir(adresse);
    } else {
        // une page web : chaque page affichée, même en suivant ses liens, compte comme « vue »
        const page = document.createElement("iframe");
        page.src = adresse;
        page.addEventListener("load", () => {
            try {
                voir(page.contentWindow.location.pathname);
            } catch (e) {
                // une page d'un autre site : le navigateur ne nous laisse pas lire son adresse
            }
        });
        contenu.appendChild(page);
    }

    fenetre.hidden = false;
}

function fermerFenetre() {
    if (pcAllume === null) return;
    const fenetre = pcAllume.querySelector(".fenetre");
    fenetre.hidden = true;
    fenetre.querySelector(".fenetre-contenu").innerHTML = "";
}

// "/ambiance/inga/pc/steam-chat.html" → "steam-chat"
function nomDuFichier(adresse) {
    const fichier = decodeURIComponent(adresse).split("/").pop();
    return fichier.split(".")[0];
}

// Une page vue pour la première fois cette nuit : Inga reçoit le drapeau « vu steam-chat »,
// et le bloc « == vu steam-chat == » se joue s'il existe.
function voir(adresse) {

    const nom = nomDuFichier(adresse);
    if (nom === "" || nom === "blank" || etat.vusCetteNuit.includes(nom)) return;

    etat.vusCetteNuit.push(nom);
    donner("vu " + nom);

    setTimeout(async () => {
        await jouerQuandLibre("vu " + nom);
        await verifierFinDeNuit();
    }, DELAI_REACTION);
}

// les clics dans un ordinateur
document.addEventListener("click", (evenement) => {

    if (pcAllume === null) return;

    const lien = evenement.target.closest(".ordinateur a[href]");
    if (lien) {
        evenement.preventDefault();
        ouvrirFichier(lien.getAttribute("href"), lien.dataset.titre || lien.textContent.trim());
        return;
    }

    if (evenement.target.closest(".fermer-fenetre")) fermerFenetre();
    if (evenement.target.closest(".eteindre")) eteindre(true);
});

// le mot de passe : on ne compare que les lettres et les chiffres (« 12-289-8208 » = « 122898208 »)
document.addEventListener("submit", (evenement) => {

    const verrou = evenement.target.closest(".verrou");
    if (!verrou) return;
    evenement.preventDefault();

    const ordinateur = verrou.closest(".ordinateur");
    const champ = verrou.querySelector("input");
    const simplifier = (texte) => texte.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (simplifier(champ.value) === simplifier(ordinateur.dataset.motDePasse)) {
        donner(ordinateur.id + " ouvert");
        allumer(ordinateur);
    } else {
        verrou.querySelector(".refus").hidden = false;
    }
    champ.value = "";
});

// Échap : ferme la fenêtre ouverte, sinon éteint le PC
document.addEventListener("keydown", (evenement) => {
    if (evenement.key !== "Escape" || pcAllume === null) return;
    const fenetre = pcAllume.querySelector(".fenetre");
    if (!fenetre.hidden) {
        fermerFenetre();
    } else {
        eteindre(true);
    }
});


/* =========================================================
   6. LES NUITS
   ========================================================= */

// charge histoire/nuit-N.txt ; renvoie false si le fichier n'existe pas
async function chargerNuit(numero) {
    const fichier = "nuit-" + numero + ".txt";
    const reponse = await fetch(DOSSIER_HISTOIRE + fichier, { cache: "no-cache" });
    if (!reponse.ok) return false;
    blocs = lireHistoire(await reponse.text(), fichier);
    return true;
}

async function lancerLaNuit() {

    const existe = await chargerNuit(etat.nuit);
    if (!existe) {
        montrerFin();
        return;
    }

    allerDans(etat.piece);
    majZones();

    if (!etat.debutJoue) await jouer("début");
    await verifierFinDeNuit();
}

// [nuit suivante] : les drapeaux restent, tout le reste repart de zéro
async function passerALaNuit(numero) {
    const drapeaux = etat.drapeaux;
    const piece = etat.piece;
    etat = nouvelEtat(numero);
    etat.drapeaux = drapeaux;
    etat.piece = piece;
    sauvegarder();
    await lancerLaNuit();
}

// plus de nuit à jouer : l'écran de fin
function montrerFin() {
    eteindre(false);
    noir.hidden = false;
    noir.innerHTML = "";

    const titre = document.createElement("span");
    titre.className = "fin-titre";
    titre.textContent = TEXTE_DE_FIN;

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.textContent = "recommencer";
    bouton.addEventListener("click", () => {
        effacerSauvegarde();
        location.reload();
    });

    noir.append(titre, bouton);
}


/* =========================================================
   7. LE DÉMARRAGE
   Adresses spéciales, à ajouter à la fin de l'adresse (ex. /ambiance/inga/#recommencer) :
     #recommencer   efface la partie
     #nuit-2        commence directement à la nuit 2 (pour tester)
     #zones         montre les zones cliquables, et les coordonnées d'un clic sur l'image
   ========================================================= */

chargerSauvegarde();

const adresseSpeciale = location.hash;

if (adresseSpeciale === "#recommencer") {
    effacerSauvegarde();
    etat = nouvelEtat(1);
    history.replaceState(null, "", location.pathname);
}

if (adresseSpeciale.startsWith("#nuit-")) {
    etat = nouvelEtat(Number(adresseSpeciale.slice(6)));
    sauvegarder();
    history.replaceState(null, "", location.pathname);
}

if (adresseSpeciale === "#zones") {
    document.body.classList.add("mode-zones");

    // un clic sur l'image affiche ses coordonnées, en pixels de l'image d'origine
    for (const image of document.querySelectorAll(".piece > img")) {
        image.addEventListener("click", (evenement) => {
            const x = Math.round(evenement.offsetX / image.clientWidth * image.naturalWidth);
            const y = Math.round(evenement.offsetY / image.clientHeight * image.naturalHeight);
            document.getElementById("coordonnees").textContent = `x : ${x}   y : ${y}`;
        });
    }
}

// l'écran ENTER : un clic lance la musique et la nuit
document.getElementById("entrer").addEventListener("click", () => {
    const musique = document.getElementById("musique");
    musique.volume = 0.25;
    musique.play().catch(() => {});
    document.getElementById("entrer").hidden = true;
    lancerLaNuit();
});
