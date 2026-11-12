// Le petit lien « ← carte » des pages d'ambiance (Elysium, Archives, Inga…), en haut à gauche de l'écran.
// Pour l'ajouter à une page, une seule ligne dans son <head> :
//     <script src="/js/retour.js" defer></script>
// Par défaut il ramène à la carte d'Izmir. Pour l'envoyer ailleurs :
//     <script src="/js/retour.js" data-vers="/" data-texte="← accueil" defer></script>
// Il ne s'affiche pas quand la page est montrée dans une autre (l'écran des PC d'Inga, par exemple).
(function () {
  if (window.top !== window) return;
  const reglages = document.currentScript?.dataset || {};

  const style = document.createElement("style");
  style.textContent = `
    .iz-retour {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 100000;
      padding: 6px 12px;
      color: var(--iz-accent, #c09050);
      background: var(--iz-bar, rgba(20, 12, 4, 0.92));
      border: 1px solid var(--iz-border-strong, #4a3018);
      border-radius: 4px;
      font: italic 14px/1.2 Georgia, "Times New Roman", serif;
      letter-spacing: 0.5px;
      text-decoration: none;
      opacity: 0.75;
      transition: opacity 0.2s ease, color 0.2s ease;
    }
    .iz-retour:hover,
    .iz-retour:focus-visible {
      opacity: 1;
      color: var(--iz-accent-hover, #d4aa72);
    }
  `;
  document.head.appendChild(style);

  const lien = document.createElement("a");
  lien.className = "iz-retour";
  lien.href = reglages.vers || "/univers/map/#izmir";
  lien.textContent = reglages.texte || "← carte";

  const poser = () => document.body.appendChild(lien);
  if (document.body) poser();
  else document.addEventListener("DOMContentLoaded", poser);
})();
