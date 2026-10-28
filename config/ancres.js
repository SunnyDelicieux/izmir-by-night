// Donne un id aux titres <h2>, <h3>… qui n'en ont pas, calculé comme dans src/js/sommaire.js :
// les liens du sommaire et ceux de la barre de recherche tombent ainsi sur le bon titre.

const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function texte(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (tout, e) => {
      if (e[0] !== "#") return ENTITES[e.toLowerCase()] ?? tout;
      return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    });
}

function slug(s) {
  return s.toLowerCase().replace(/ı/g, "i")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[-_]+/g, " ").trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ancres(html) {
  return html.replace(/<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1\s*>/gi, (tout, niveau, attributs = "", contenu) => {
    if (/\sid\s*=/i.test(attributs)) return tout;
    const id = slug(texte(contenu));
    return id ? `<h${niveau}${attributs} id="${id}">${contenu}</h${niveau}>` : tout;
  });
}
