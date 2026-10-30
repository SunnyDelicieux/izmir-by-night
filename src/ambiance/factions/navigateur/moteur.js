/* =========================
   LE NAVIGATEUR DU PC 1 (un faux Chrome de 2014)

   Les pages des sites sont dans les autres fichiers de ce dossier :
     bobines.js       le Cercle des bobines perdues (b0b1nes0.onion)
     egechan.js       ege-chan.org (et egechan-izm.js pour le board \izm\)
     historique.js    l'historique d'Inga, ses recherches, les sites les plus visités

   Une page s'ajoute comme ça :
     Nav.pages["ege-chan.org/a"] = () => ({ titre: "...", html: "..." });
   Facultatif :
     couleurs : { fond, texte, lien }      les couleurs du site
     apres(vue) : lancé une fois la page affichée (pour brancher un formulaire, par exemple)

   Les adresses s'écrivent sans http:// ni www : "ege-chan.org/a/6".
   Un lien vers une autre page : <a data-lien="ege-chan.org/a">...</a>
   Une adresse inconnue affiche la page d'erreur de Chrome.
========================= */

const Nav = {
    pages: {},
    routes: [],        // les adresses calculées : { motif: /.../, page: (resultat) => ... }
    recherches: {},    // rempli par historique.js
    visites: [],       // les pages vues depuis l'ouverture du navigateur (précédent / suivant)
    position: -1
};

const NOUVEL_ONGLET = "chrome://newtab";
const HISTORIQUE = "chrome://history";
const RECHERCHE = "google.fr/search?q=";


/* =========================
   PETITS OUTILS POUR LES PAGES
========================= */

// <a data-lien="adresse">texte</a>
Nav.lien = (adresse, texte) => `<a data-lien="${adresse}">${texte}</a>`;

// Une image de nav/images/, ou un cadre avec sa description tant qu'elle n'existe pas
Nav.affiche = (chemin, description, largeur, hauteur) => `
    <div class="affiche" style="width:${largeur}px;height:${hauteur}px">
        <span>${description}</span>
        <img src="navigateur/images/${chemin}" alt="" onerror="this.remove()">
    </div>`;

// Un petit bouton clignotant de site perso (88 x 31) ; le texte s'affiche tant que le gif n'existe pas
Nav.blinkie = (gif, texte) => `
    <span class="blinkie"><img src="navigateur/images/blinkies/${gif}" alt="" onerror="this.remove()">${texte}</span>`;

// La date d'il y a « jours » jours, en 2014 (comme le livre d'or de vermine.html)
Nav.date = (jours) => {
    const aujourdhui = new Date();
    return new Date(2014, aujourdhui.getMonth(), aujourdhui.getDate() - jours);
};

Nav.dateEnToutesLettres = (date) =>
    date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });


/* =========================
   TROUVER UNE PAGE
========================= */

// "https://www.ege-chan.org/a/" → "ege-chan.org/a"
function nettoyer(adresse) {
    return adresse.trim()
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/\/$/, "");
}

function trouverPage(adresse) {

    if (adresse === NOUVEL_ONGLET) return pageNouvelOnglet();
    if (adresse === HISTORIQUE) return pageHistorique();
    if (adresse.startsWith(RECHERCHE)) return pageRecherche(decodeURIComponent(adresse.slice(RECHERCHE.length)));

    const page = Nav.pages[adresse];
    if (page) return typeof page === "function" ? page() : page;

    for (const route of Nav.routes) {
        const resultat = adresse.match(route.motif);
        if (resultat) {
            const trouvee = route.page(resultat);
            if (trouvee) return trouvee;
        }
    }

    return null;
}

// le titre d'une page, pour l'historique et les vignettes
Nav.titre = (adresse) => {
    if (adresse.startsWith(RECHERCHE)) return decodeURIComponent(adresse.slice(RECHERCHE.length)) + " - Recherche Google";
    const page = trouverPage(adresse);
    return page ? page.titre : adresse;
};

// la petite icône de l'onglet, selon le site
Nav.icone = (adresse) => {
    if (adresse.startsWith("ege-chan.org")) return `<span class="favicon" style="background:#17296f;color:#8fb3ff">e</span>`;
    if (adresse.startsWith("b0b1nes0.onion")) return `<span class="favicon" style="background:#1a0000;color:#ff4d4d">&#9654;</span>`;
    if (adresse.startsWith(RECHERCHE)) return `<span class="favicon" style="background:#fff;color:#4285f4">g</span>`;
    if (adresse.startsWith("chrome://")) return `<span class="favicon" style="background:#9e9e9e;color:#fff">&#9679;</span>`;
    return `<span class="favicon" style="background:#ddd;color:#777">&#9675;</span>`;
};


/* =========================
   ALLER SUR UNE PAGE
========================= */

const vue = document.getElementById("vue");
const champAdresse = document.getElementById("adresse");

Nav.aller = (adresse, nouvelleVisite = true) => {

    adresse = adresse.startsWith("chrome://") || adresse.startsWith(RECHERCHE) ? adresse : nettoyer(adresse);

    const page = trouverPage(adresse) || pageErreur(adresse);

    if (nouvelleVisite) {
        Nav.visites = Nav.visites.slice(0, Nav.position + 1);
        Nav.visites.push(adresse);
        Nav.position = Nav.visites.length - 1;
    }

    const couleurs = page.couleurs || {};
    vue.style.background = couleurs.fond || "#fff";
    vue.style.color = couleurs.texte || "#222";
    vue.style.setProperty("--lien", couleurs.lien || "#1a0dab");
    vue.className = page.classe || "";
    vue.innerHTML = page.html;
    vue.scrollTop = 0;

    document.getElementById("onglet-titre").textContent = page.titre;
    document.getElementById("onglet-icone").innerHTML = Nav.icone(adresse);
    document.title = page.titre;
    champAdresse.value = adresse === NOUVEL_ONGLET ? "" : afficherAdresse(adresse);

    document.getElementById("precedent").disabled = Nav.position <= 0;
    document.getElementById("suivant").disabled = Nav.position >= Nav.visites.length - 1;

    if (page.apres) page.apres(vue);
};

Nav.actualiser = () => Nav.aller(Nav.visites[Nav.position], false);

// ce qui s'écrit dans la barre d'adresse
function afficherAdresse(adresse) {
    if (adresse.startsWith(RECHERCHE)) {
        return "https://www.google.fr/search?q=" + decodeURIComponent(adresse.slice(RECHERCHE.length)).replace(/ /g, "+");
    }
    return adresse;
}

// le nom du site, en gris dans l'historique : "ege-chan.org"
function domaine(adresse) {
    return afficherAdresse(adresse).replace(/^https?:\/\//, "").split("/")[0];
}


/* =========================
   LES CLICS ET LA BARRE D'ADRESSE
========================= */

vue.addEventListener("click", (e) => {

    const lien = e.target.closest("a");
    if (!lien) return;

    // un lien vers une autre page
    if (lien.dataset.lien !== undefined) {
        e.preventDefault();
        Nav.aller(lien.dataset.lien);
        return;
    }

    // un lien dans la même page (les >>9343474 d'ege-chan)
    const href = lien.getAttribute("href") || "";
    if (href.startsWith("#")) {
        e.preventDefault();
        const cible = vue.querySelector(href);
        if (cible && cible.offsetParent) cible.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    // tout le reste ne mène nulle part
    e.preventDefault();
});

document.getElementById("omnibox").addEventListener("submit", (e) => {

    e.preventDefault();
    const texte = champAdresse.value.trim();
    if (!texte) return;

    // une adresse (avec un point, sans espace), sinon une recherche
    const adresse = nettoyer(texte);
    if (/^chrome:\/\//.test(texte) || (!/\s/.test(texte) && texte.includes("."))) Nav.aller(adresse);
    else Nav.aller(RECHERCHE + encodeURIComponent(texte));
    champAdresse.blur();
});

champAdresse.addEventListener("focus", () => champAdresse.select());

document.getElementById("precedent").addEventListener("click", () => {
    if (Nav.position > 0) Nav.aller(Nav.visites[--Nav.position], false);
});

document.getElementById("suivant").addEventListener("click", () => {
    if (Nav.position < Nav.visites.length - 1) Nav.aller(Nav.visites[++Nav.position], false);
});

document.getElementById("actualiser").addEventListener("click", Nav.actualiser);
document.getElementById("menu-historique").addEventListener("click", () => Nav.aller(HISTORIQUE));
document.getElementById("onglet-nouveau").addEventListener("click", () => Nav.aller(NOUVEL_ONGLET));

Nav.demarrer = () => Nav.aller(NOUVEL_ONGLET);


/* =========================
   LES PAGES DE CHROME ET DE GOOGLE
========================= */

function ligneHistorique(visite) {
    return `
        <div class="visite" data-texte="${(Nav.titre(visite.adresse) + " " + visite.adresse).toLowerCase()}">
            <span class="heure">${visite.heure}</span>
            ${Nav.icone(visite.adresse)}
            <a data-lien="${visite.adresse}">${Nav.titre(visite.adresse)}</a>
            <span class="domaine">${domaine(visite.adresse)}</span>
        </div>`;
}

function pageNouvelOnglet() {

    const vignettes = (Nav.plusVisites || []).map((adresse) => `
        <a class="vignette" data-lien="${adresse}">
            <span class="apercu">${Nav.icone(adresse)}</span>
            <span class="vignette-titre">${Nav.titre(adresse)}</span>
        </a>`).join("");

    const recentes = (Nav.historique || []).slice(0, 6).map(ligneHistorique).join("");

    return {
        titre: "Nouvel onglet",
        classe: "page-chrome",
        html: `
            <div class="nouvel-onglet">
                <div class="logo-google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>
                <form class="recherche-google"><input placeholder="Rechercher sur Google ou saisir une URL" autocomplete="off"></form>
                <div class="vignettes">${vignettes}</div>
                <div class="recentes">
                    <h3>Récemment consultés</h3>
                    ${recentes}
                    <p><a data-lien="${HISTORIQUE}">Afficher l'historique complet</a></p>
                </div>
            </div>`,
        apres: brancherRechercheGoogle
    };
}

function pageHistorique() {

    // une partie par jour, la plus récente en haut
    const jours = {};
    (Nav.historique || []).forEach((visite) => (jours[visite.jour] = jours[visite.jour] || []).push(visite));

    const parties = Object.keys(jours).sort((a, b) => a - b).map((jour) => {
        const nomDuJour = jour == 0 ? "Aujourd'hui - " : jour == 1 ? "Hier - " : "";
        return `
            <div class="jour">
                <h3>${nomDuJour}${Nav.dateEnToutesLettres(Nav.date(Number(jour)))}</h3>
                ${jours[jour].map(ligneHistorique).join("")}
            </div>`;
    }).join("");

    return {
        titre: "Historique",
        classe: "page-chrome",
        html: `
            <div class="historique">
                <h1>Historique</h1>
                <form class="filtre-historique">
                    <input placeholder="Rechercher dans l'historique" autocomplete="off">
                    <button>Rechercher dans l'historique</button>
                </form>
                ${parties}
            </div>`,
        apres: (zone) => {
            const champ = zone.querySelector(".filtre-historique input");
            const filtrer = () => {
                const mot = champ.value.trim().toLowerCase();
                zone.querySelectorAll(".visite").forEach((ligne) => (ligne.hidden = !ligne.dataset.texte.includes(mot)));
                zone.querySelectorAll(".jour").forEach((jour) => (jour.hidden = !jour.querySelector(".visite:not([hidden])")));
            };
            champ.addEventListener("input", filtrer);
            zone.querySelector(".filtre-historique").addEventListener("submit", (e) => { e.preventDefault(); filtrer(); });
        }
    };
}

function pageRecherche(question) {

    const resultats = Nav.recherches[question.trim().toLowerCase()];

    const liste = resultats
        ? `<p class="nombre">Environ ${resultats.nombre || "1 240 000"} résultats (0,${31 + question.length % 40} secondes)</p>`
          + resultats.liens.map((r) => `
            <div class="resultat">
                <a data-lien="${r.adresse}">${r.titre}</a>
                <div class="url">${r.adresse}</div>
                <div class="extrait">${r.texte}</div>
            </div>`).join("")
        : `<p class="aucun">Aucun document ne correspond aux termes de recherche spécifiés (<b>${question}</b>).</p>
           <p>Suggestions :</p>
           <ul>
               <li>Vérifiez l'orthographe des termes de recherche.</li>
               <li>Essayez d'autres mots.</li>
               <li>Utilisez des mots clés plus généraux.</li>
           </ul>`;

    return {
        titre: question + " - Recherche Google",
        classe: "page-chrome",
        html: `
            <div class="page-recherche">
                <form class="recherche-google en-haut">
                    <span class="logo-google petit"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>
                    <input value="${question.replace(/"/g, "&quot;")}" autocomplete="off">
                </form>
                <div class="resultats">${liste}</div>
            </div>`,
        apres: brancherRechercheGoogle
    };
}

function brancherRechercheGoogle(zone) {
    const form = zone.querySelector(".recherche-google");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texte = form.querySelector("input").value.trim();
        if (texte) Nav.aller(RECHERCHE + encodeURIComponent(texte));
    });
}

function pageErreur(adresse) {
    const site = domaine(adresse);
    return {
        titre: site,
        classe: "page-chrome",
        html: `
            <div class="erreur-chrome">
                <div class="erreur-icone">:(</div>
                <h1>Cette page Web n'est pas disponible</h1>
                <p>Le serveur de <b>${site}</b> est introuvable, car la résolution DNS a échoué.</p>
                <p class="code">ERR_NAME_NOT_RESOLVED</p>
            </div>`
    };
}
