// La barre de navigation : thèmes jour / nuit / Halloween, menus déroulants, lien de la page actuelle.
// Le HTML de la barre est dans src/_includes/barre.njk, les liens du menu dans src/_data/menu.yaml.
(function () {
  const barre = document.getElementById("iz-barre");
  if (!barre) return;
  if (!getComputedStyle(document.documentElement).getPropertyValue("--iz-accent")) {
    const theme = document.createElement("link");
    theme.rel = "stylesheet";
    theme.href = "/css/theme.css";
    document.head.appendChild(theme);
  }

  // la barre prend toute la largeur, même si la page a des marges
  const caler = () => {
    const cs = getComputedStyle(document.body);
    barre.style.marginTop = `-${cs.paddingTop}`;
    barre.style.marginLeft = `-${cs.paddingLeft}`;
    barre.style.marginRight = `-${cs.paddingRight}`;
  };
  caler();
  addEventListener("resize", caler);

  const theme = barre.querySelector(".izb-theme");
  const label = () => {
    const light = document.body.classList.contains("light");
    theme.textContent = light ? "☾" : "☀";
    theme.title = light ? "passer en mode nuit" : "passer en mode jour";
  };
  try { if (localStorage.getItem("izmir-theme") === "light") document.body.classList.add("light"); } catch (e) {}
  const citrouille = barre.querySelector(".izb-citrouille");
  const halloween = (actif) => {
    document.body.classList.toggle("halloween", actif);
    try { localStorage.setItem("izmir-halloween", actif ? "1" : "0"); } catch (e) {}
    citrouille.title = actif ? "quitter le thème Halloween" : "passer en thème Halloween";
  };
  try {
    const h = new URLSearchParams(location.search).get("halloween");
    if (h !== null) localStorage.setItem("izmir-halloween", h === "0" ? "0" : "1");
    halloween(localStorage.getItem("izmir-halloween") === "1");
  } catch (e) { halloween(false); }
  citrouille.addEventListener("click", () => {
    const light = document.body.classList.contains("light");
    const actif = document.body.classList.contains("halloween") && !light;
    halloween(!actif);
    if (!actif && light) theme.click();
  });
  label();
  theme.addEventListener("click", () => {
    const light = document.body.classList.toggle("light");
    try { localStorage.setItem("izmir-theme", light ? "light" : "dark"); } catch (e) {}
    label();
  });

  // le lien de la page actuelle est souligné, et son menu aussi
  const samePage = (href) => {
    const clean = (p) => p.split("#")[0].replace(/(\.html|\/)$/, "").replace(/\/index$/, "");
    return clean(location.pathname) === clean(new URL(href, location.origin).pathname);
  };
  const menu = barre.querySelector(".izb-menu");
  for (const a of menu.querySelectorAll("a")) {
    if (samePage(a.getAttribute("href"))) {
      a.classList.add("active");
      a.closest(".navi-group")?.classList.add("izb-ici");
    }
  }

  // les menus déroulants s'ouvrent aussi au clic (utile sur téléphone)
  const groups = [...menu.querySelectorAll(".navi-group")];
  for (const g of groups) {
    g.querySelector(".navi-parent").addEventListener("click", () => {
      const open = !g.classList.contains("izb-ouvert");
      groups.forEach((x) => x.classList.remove("izb-ouvert"));
      g.classList.toggle("izb-ouvert", open);
    });
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".izb-menu .navi-group")) groups.forEach((x) => x.classList.remove("izb-ouvert"));
  });
})();
