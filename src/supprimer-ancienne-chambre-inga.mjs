// SUPPRIME L'ANCIENNE CHAMBRE D'INGA
// À lancer une fois, depuis la racine du site, après avoir décompressé le zip :
//     node supprimer-ancienne-chambre-inga.mjs
// Il supprime les fichiers de l'ancienne version (listés ci-dessous), puis se supprime lui-même.
// Les blogs Anarch et Sabbat (src/ambiance/factions/ANARCH et sabbat) ne sont pas touchés.

import { rmSync, existsSync, readdirSync } from "node:fs";

const anciensFichiers = [
    "src/ambiance/factions/cache.html",
    "src/ambiance/factions/cache/document.pdf",
    "src/ambiance/factions/folder.png",
    "src/ambiance/factions/index.html",
    "src/ambiance/factions/inga.html",
    "src/ambiance/factions/lecteur-pdf.html",
    "src/ambiance/factions/mdp.html",
    "src/ambiance/factions/navigateur.html",
    "src/ambiance/factions/navigateur/chrome.svg",
    "src/ambiance/factions/navigateur/egechan-izm.js",
    "src/ambiance/factions/navigateur/egechan.css",
    "src/ambiance/factions/navigateur/egechan.js",
    "src/ambiance/factions/navigateur/historique.js",
    "src/ambiance/factions/navigateur/moteur.js",
    "src/ambiance/factions/navigateur/navigateur.css",
    "src/ambiance/factions/script.js",
    "src/ambiance/factions/style.css",
    "src/ambiance/factions/terminal.css",
    "src/ambiance/factions/terminal.html",
    "src/ambiance/factions/vermine-cercle.html",
    "src/ambiance/factions/vermine.html",
    "src/ambiance/factions/welcome.html",
    "src/ambiance/inga/1.png",
    "src/ambiance/inga/2.png",
    "src/ambiance/inga/bg.mp3",
    "src/ambiance/inga/dialogues.js",
    "src/ambiance/inga/inga-base.webp",
    "src/ambiance/inga/inga-degoutee.webp",
    "src/ambiance/inga/inga.html",
    "src/ambiance/inga/inga2.html",
    "src/ambiance/inga/quete.js",
    "src/ambiance/inga/room.js",
    "src/ambiance/inga/telephone.png",
];

let supprimes = 0;
for (const fichier of anciensFichiers) {
    if (existsSync(fichier)) {
        rmSync(fichier);
        console.log("supprimé :", fichier);
        supprimes++;
    }
}

// le dossier du faux Chrome, s'il est vide maintenant
const dossier = "src/ambiance/factions/navigateur";
if (existsSync(dossier) && readdirSync(dossier).length === 0) {
    rmSync(dossier, { recursive: true });
    console.log("supprimé :", dossier);
}

console.log(`\n${supprimes} fichier(s) supprimé(s). Lance « npm run dev » et ouvre /ambiance/inga/#recommencer pour tester.`);
rmSync(new URL(import.meta.url));
