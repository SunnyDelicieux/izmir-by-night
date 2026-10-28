// La galerie en bas des fiches : un clic sur un dessin l'agrandit dans la page.
// Les flèches (ou ← →) passent au dessin suivant de l'onglet ; Échap ou un clic à côté ferme.
// Sans ce script, le lien ouvre simplement l'image dans un nouvel onglet.
(function () {
  const galerie = document.getElementById("galerie");
  if (!galerie) return;

  const zoom = document.createElement("dialog");
  zoom.className = "galerie-zoom";
  zoom.innerHTML = `
    <img alt="">
    <p></p>
    <button type="button" class="precedent" aria-label="dessin précédent">‹</button>
    <button type="button" class="suivant" aria-label="dessin suivant">›</button>
    <button type="button" class="fermer" aria-label="fermer">×</button>`;
  document.body.appendChild(zoom);
  const image = zoom.querySelector("img");
  const legende = zoom.querySelector("p");

  let liens = []; // les dessins de l'onglet ouvert
  let numero = 0;

  function montrer(n) {
    numero = (n + liens.length) % liens.length;
    const lien = liens[numero];
    image.src = lien.href;
    image.alt = lien.querySelector("img").alt;
    legende.textContent = lien.querySelector(".legende")?.textContent || "";
    legende.hidden = !legende.textContent;
  }

  galerie.addEventListener("click", (e) => {
    const lien = e.target.closest(".galerie-dessins a");
    if (!lien || e.ctrlKey || e.metaKey || e.shiftKey) return; // Ctrl+clic : nouvel onglet, comme avant
    e.preventDefault();
    liens = [...lien.parentElement.querySelectorAll("a")];
    montrer(liens.indexOf(lien));
    for (const bouton of zoom.querySelectorAll(".precedent, .suivant")) bouton.hidden = liens.length < 2;
    zoom.showModal();
  });

  zoom.querySelector(".precedent").addEventListener("click", () => montrer(numero - 1));
  zoom.querySelector(".suivant").addEventListener("click", () => montrer(numero + 1));
  zoom.querySelector(".fermer").addEventListener("click", () => zoom.close());
  zoom.addEventListener("click", (e) => { if (e.target === zoom) zoom.close(); }); // clic sur le fond
  zoom.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") montrer(numero - 1);
    if (e.key === "ArrowRight") montrer(numero + 1);
  });
  zoom.addEventListener("close", () => image.removeAttribute("src"));
})();
