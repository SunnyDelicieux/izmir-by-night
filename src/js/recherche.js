// La barre de recherche, en haut à droite des pages.
// Elle cherche dans tout le texte du site grâce à Pagefind : l'index est reconstruit
// automatiquement à chaque construction du site (voir config/recherche.js).
(function () {
  if (!getComputedStyle(document.documentElement).getPropertyValue("--iz-accent")) {
    const theme = document.createElement("link");
    theme.rel = "stylesheet";
    theme.href = "/css/theme.css";
    document.head.appendChild(theme);
  }

  const MAX_RESULTATS = 10;

  // la partie du site d'une page : /personnages/cem/ → « personnages »
  const rubrique = (url) => url.split("/").filter(Boolean)[0] || "accueil du site";

  let pagefind = null;
  function chargerIndex() {
    pagefind ??= import("/pagefind/pagefind.js").then(async (pf) => {
      await pf.options({ excerptLength: 12 });
      return pf;
    });
    return pagefind;
  }

  // le passage de la page qui correspond le mieux à la recherche
  function meilleurePartie(page) {
    let meilleure = null;
    let max = 0;
    for (const partie of page.sub_results || []) {
      const score = (partie.weighted_locations || []).reduce((total, l) => total + l.balanced_score, 0);
      if (score > max) {
        max = score;
        meilleure = partie;
      }
    }
    return meilleure;
  }

  async function chercher(texte) {
    const pf = await chargerIndex();
    const recherche = await pf.debouncedSearch(texte, {}, 120);
    if (recherche === null) return null; // une recherche plus récente a pris le relais
    const pages = await Promise.all(recherche.results.slice(0, MAX_RESULTATS).map((r) => r.data()));
    return pages.map((page) => {
      const titre = page.meta?.title || page.url;
      const partie = meilleurePartie(page);
      if (partie && partie.url.includes("#") && partie.title && partie.title !== titre) {
        return { label: titre, sub: `${partie.title} · ${rubrique(page.url)}`, url: partie.url };
      }
      return { label: titre, sub: rubrique(page.url), url: page.url };
    });
  }

  function init() {
    if (document.querySelector(".izs-box")) return;

    const box = document.createElement("div");
    box.className = "izs-box";
    box.setAttribute("role", "search");
    box.innerHTML = `
      <input class="izs-input" type="search" placeholder="rechercher une page…" aria-label="Rechercher une page" autocomplete="off">
      <ul class="izs-results"></ul>
    `;
    let bar = document.getElementById("iz-topbar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "iz-topbar";
      document.body.appendChild(bar);
    }
    bar.appendChild(box);

    const input = box.querySelector(".izs-input");
    const list = box.querySelector(".izs-results");
    let active = -1;

    function setActive(i) {
      const links = list.querySelectorAll("a");
      links.forEach((a) => a.classList.remove("izs-active"));
      active = links.length ? (i + links.length) % links.length : -1;
      if (active >= 0) {
        links[active].classList.add("izs-active");
        links[active].scrollIntoView({ block: "nearest" });
      }
    }

    async function render() {
      const texte = input.value.trim();
      if (!texte) {
        list.innerHTML = "";
        active = -1;
        return;
      }
      let resultats;
      try {
        resultats = await chercher(texte);
      } catch (e) {
        console.error(e);
        resultats = [];
      }
      if (resultats === null || input.value.trim() !== texte) return;

      list.innerHTML = "";
      active = -1;
      if (!resultats.length) {
        list.innerHTML = `<li class="izs-none">Aucune page trouvée</li>`;
        return;
      }
      for (const r of resultats) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = r.url;
        a.textContent = r.label;
        const folder = document.createElement("span");
        folder.className = "izs-folder";
        folder.textContent = r.sub;
        a.appendChild(folder);
        li.appendChild(a);
        list.appendChild(li);
      }
      setActive(0);
    }

    input.addEventListener("focus", () => {
      chargerIndex().catch(() => {});
      render();
    });
    input.addEventListener("input", render);

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") {
        const link = list.querySelectorAll("a")[active];
        if (link) location.href = link.href;
      }
      else if (e.key === "Escape") { input.value = ""; render(); input.blur(); }
    });

    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) list.innerHTML = "";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
