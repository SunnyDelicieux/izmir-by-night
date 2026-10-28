// Les fiches de personnages : un fichier par personnage dans src/personnages/.
// Le nom du fichier (sans .html) sert d'identifiant : "thouros" pour src/personnages/thouros.html.

let fiches = [];

export function fichesDe(api) {
  fiches = api
    .getFilteredByGlob("src/personnages/*.html")
    .sort((a, b) => a.fileSlug.localeCompare(b.fileSlug));
  return fiches;
}

function trouver(id, ou) {
  const trouvee = fiches.find((f) => f.fileSlug === id);
  if (!trouvee) {
    throw new Error(`Personnage inconnu : « ${id} » (dans ${ou}). Il faut un fichier src/personnages/${id}.html.`);
  }
  return trouvee;
}

// {% set f = "thouros" | fiche %} puis {{ f.url }}, {{ f.data.nom }}, {{ f.data.icone }}…
export function fiche(id) {
  return trouver(id, this.page?.inputPath);
}

// {% relation "thouros" %}Le texte de la relation.{% endrelation %}
// {% relation "baran", "Baran Serra, son Sheriff" %}…{% endrelation %} pour changer le nom affiché.
export function relation(texte, id, nom) {
  const f = trouver(id, this.page?.inputPath);
  const icone = f.data.icone || "/img/wiki/icon/no-icon.png";
  return `<dl>
  <dt><a href="${f.url}"><img src="${icone}" class="icon" alt="">${nom || f.data.nom}</a></dt>
  <dd>${texte.trim()}</dd>
</dl>`;
}
