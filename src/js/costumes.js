function costumes() {
  const body = document.body;
  const actif = body.classList.contains("halloween") && !body.classList.contains("light");

  for (const img of document.querySelectorAll("img[data-halloween]")) {
    // la première fois, on retient l'image normale pour pouvoir revenir dessus
    if (!img.dataset.normal) {
      img.dataset.normal = img.src;
    }

    img.src = actif ? img.dataset.halloween : img.dataset.normal;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  costumes();  // au chargement de la page on regarde si c'est chargé ou pas

  // puis à chaque fois que la classe du body change (bouton jour/nuit ou citrouille), et seulement à ce moment-là
  new MutationObserver(costumes).observe(document.body, { attributes: true, attributeFilter: ["class"] });
});
