// La page Carte (src/univers/map.html).
//   1. Chaque carte (.carte-cadre) se zoome à la molette ou avec les boutons + et −, et se déplace en la tirant.
//   2. Les deux niveaux : la région et Izmir. On passe de l'un à l'autre avec les onglets,
//      ou en cliquant sur le point d'Izmir. L'adresse /univers/map/#izmir ouvre directement Izmir.

// ─────────── 1. zoomer et déplacer ───────────
document.querySelectorAll(".carte-cadre").forEach((cadre) => {
  const carte = cadre.querySelector(".carte");
  const image = carte.querySelector("img");
  let largeur = 0;

  // la plus petite taille permise : la carte remplit tout le cadre
  const minimum = () =>
    Math.max(
      cadre.clientWidth,
      (cadre.clientHeight * image.naturalWidth) / image.naturalHeight,
    );

  // change la largeur de la carte, en gardant sous le curseur (x, y) le même endroit
  function zoomer(nouvelle, x, y) {
    nouvelle = Math.min(image.naturalWidth * 2, Math.max(minimum(), nouvelle));
    const facteur = nouvelle / largeur;
    const gauche = (cadre.scrollLeft + x) * facteur - x;
    const haut = (cadre.scrollTop + y) * facteur - y;
    largeur = nouvelle;
    carte.style.width = largeur + "px";
    cadre.scrollLeft = gauche;
    cadre.scrollTop = haut;
  }

  // au départ : dézoomée au maximum, et centrée
  function demarrer() {
    if (!cadre.clientWidth || !image.naturalWidth) return; // la carte est cachée, ou son image pas encore là
    for (let fois = 0; fois < 2; fois++) {
      largeur = minimum();
      carte.style.width = largeur + "px";
    }
    cadre.scrollLeft = (carte.offsetWidth - cadre.clientWidth) / 2;
    cadre.scrollTop = (carte.offsetHeight - cadre.clientHeight) / 2;
  }
  if (image.complete) demarrer();
  image.addEventListener("load", demarrer);
  // une carte cachée ne peut pas se mesurer : elle démarre quand on la montre (voir « montrer » plus bas)
  cadre.addEventListener("carte:montree", () => {
    if (!largeur) demarrer();
  });
  addEventListener("resize", () => {
    if (largeur && largeur < minimum()) demarrer();
  });

  cadre.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const bord = cadre.getBoundingClientRect();
      zoomer(
        largeur * (e.deltaY < 0 ? 1.2 : 1 / 1.2),
        e.clientX - bord.left,
        e.clientY - bord.top,
      );
    },
    { passive: false },
  );

  // les boutons + et − (pour les téléphones, qui n'ont pas de molette) : ils zooment vers le centre
  const boutons = document.createElement("div");
  boutons.className = "carte-zoom";
  for (const [signe, nom, facteur] of [
    ["+", "Zoomer", 1.5],
    ["−", "Dézoomer", 1 / 1.5],
  ]) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.textContent = signe;
    bouton.title = nom;
    bouton.setAttribute("aria-label", nom);
    bouton.addEventListener("click", () =>
      zoomer(largeur * facteur, cadre.clientWidth / 2, cadre.clientHeight / 2),
    );
    boutons.appendChild(bouton);
  }
  cadre.after(boutons);

  // tirer la carte à la souris (au doigt, le cadre défile tout seul)
  let depart = null;
  cadre.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.target.closest(".lieu")) return;
    e.preventDefault();
    depart = {
      x: e.clientX,
      y: e.clientY,
      gauche: cadre.scrollLeft,
      haut: cadre.scrollTop,
    };
    cadre.classList.add("glisse");
  });
  addEventListener("pointermove", (e) => {
    if (!depart) return;
    cadre.scrollLeft = depart.gauche - (e.clientX - depart.x);
    cadre.scrollTop = depart.haut - (e.clientY - depart.y);
  });
  addEventListener("pointerup", () => {
    depart = null;
    cadre.classList.remove("glisse");
  });
});

// ─────────── 2. les deux niveaux : la région et Izmir ───────────
(function () {
  const vues = [...document.querySelectorAll(".carte-vue")];
  const onglets = [...document.querySelectorAll(".carte-niveaux [data-niveau]")];
  if (vues.length < 2) return;

  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const niveauDeLAdresse = () => (location.hash === "#izmir" ? "izmir" : "region");

  // affiche un niveau et cache l'autre
  function montrer(niveau) {
    for (const vue of vues) vue.hidden = vue.dataset.niveau !== niveau;
    for (const onglet of onglets) onglet.classList.toggle("actif", onglet.dataset.niveau === niveau);
    const cadre = vues.find((vue) => !vue.hidden).querySelector(".carte-cadre");
    cadre.dispatchEvent(new Event("carte:montree"));
    if (!calme) {
      cadre.classList.add("arrive");
      setTimeout(() => cadre.classList.remove("arrive"), 500);
    }
  }

  // change de niveau en changeant l'adresse : le bouton « précédent » du navigateur revient en arrière
  function aller(niveau) {
    if (niveau === niveauDeLAdresse()) return montrer(niveau);
    // history.pushState ne fait pas défiler la page vers la carte, contrairement à location.hash
    history.pushState(null, "", niveau === "izmir" ? "#izmir" : location.pathname + location.search);
    montrer(niveau);
  }

  for (const onglet of onglets) {
    onglet.addEventListener("click", () => aller(onglet.dataset.niveau));
  }

  // le point d'Izmir sur la région : la carte plonge vers la ville, puis on change de niveau
  const versIzmir = document.querySelector(".lieu.vers-izmir");
  versIzmir?.addEventListener("click", (e) => {
    e.preventDefault();
    const cadre = versIzmir.closest(".carte-cadre");
    const carte = versIzmir.closest(".carte");
    if (calme) return aller("izmir");
    carte.style.transformOrigin = `${versIzmir.style.left} ${versIzmir.style.top}`;
    cadre.classList.add("plonge");
    setTimeout(() => {
      aller("izmir");
      cadre.classList.remove("plonge");
    }, 450);
  });

  addEventListener("popstate", () => montrer(niveauDeLAdresse()));
  addEventListener("hashchange", () => montrer(niveauDeLAdresse()));
  if (niveauDeLAdresse() === "izmir") montrer("izmir");
})();

// ─────────── 3. la carte d'Izmir : les 3 couches (Lieux / Domaines / Quartiers) ───────────
(function () {
  const vue = document.querySelector('.carte-vue[data-niveau="izmir"]');
  if (!vue) return;
  const boutons = [...vue.querySelectorAll(".carte-couches button")];
  for (const bouton of boutons) {
    bouton.addEventListener("click", () => {
      vue.classList.remove("voir-lieux", "voir-domaines", "voir-quartiers");
      vue.classList.add("voir-" + bouton.dataset.couche);
      for (const x of boutons) x.classList.toggle("actif", x === bouton);
    });
  }
})();

// ─────────── 4. la bulle qui montre le nom d'un domaine ou d'un quartier au survol ───────────
(function () {
  const bulle = document.querySelector(".carte-infobulle");
  if (!bulle) return;
  const carte = bulle.closest(".carte");
  const cadre = bulle.closest(".carte-cadre");

  // place la bulle à la position (x, y) de l'écran, exprimée dans le repère de la carte
  function placer(clientX, clientY) {
    const r = carte.getBoundingClientRect();
    bulle.style.left = clientX - r.left + "px";
    bulle.style.top = clientY - r.top + "px";
  }

  for (const svg of carte.querySelectorAll(".carte-zones, .carte-quartiers")) {
    svg.addEventListener("pointerover", (e) => {
      const nom = e.target.closest("polygon")?.dataset.nom;
      if (!nom) return;
      bulle.textContent = nom;
      bulle.hidden = false;
      placer(e.clientX, e.clientY);
    });
    svg.addEventListener("pointermove", (e) => {
      if (!bulle.hidden) placer(e.clientX, e.clientY);
    });
    svg.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest("polygon")) bulle.hidden = true;
    });
  }
  // pendant qu'on fait glisser la carte, pas de bulle
  cadre?.addEventListener("pointerdown", () => (bulle.hidden = true));
})();
