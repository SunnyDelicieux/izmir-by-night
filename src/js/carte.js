document.querySelectorAll(".carte-cadre").forEach((cadre) => {
  const carte = cadre.querySelector(".carte");
  const image = carte.querySelector("img");
  let largeur;

  const minimum = () =>
    Math.max(
      cadre.clientWidth,
      (cadre.clientHeight * image.naturalWidth) / image.naturalHeight,
    );

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

  function demarrer() {
    largeur = minimum(); // au départ : dézoomée au maximum
    carte.style.width = largeur + "px";
    cadre.scrollLeft = (carte.offsetWidth - cadre.clientWidth) / 2;
    cadre.scrollTop = (carte.offsetHeight - cadre.clientHeight) / 2;
  }
  if (image.complete) demarrer();
  else image.addEventListener("load", demarrer);

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
