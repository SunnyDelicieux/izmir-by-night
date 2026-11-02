function costumes() {
  const body = document.body;
  const actif = body.classList.contains("halloween") && !body.classList.contains("light");

  for (const img of document.querySelectorAll("img[data-halloween]")) {
    if (!img.dataset.normal) {
      img.dataset.normal = img.src;
    }

    img.src = actif ? img.dataset.halloween : img.dataset.normal;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  costumes(); 

  new MutationObserver(costumes).observe(document.body, { attributes: true, attributeFilter: ["class"] });
});
