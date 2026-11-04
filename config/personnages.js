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
    throw new Error(
      `Personnage inconnu : « ${id} » (dans ${ou}). Il faut un fichier src/personnages/${id}.html.`,
    );
  }
  return trouvee;
}

// {% set f = "thouros" | fiche %} puis {{ f.url }}, {{ f.data.nom }}, {{ f.data.icone }}…
export function fiche(id) {
  return trouver(id, this.page?.inputPath);
}

// {% set carte = "thouros" | carteDe(liste_personnages) %} : la carte du personnage dans la liste des personnages
// (avec son rôle). S'il n'est pas dans la liste, une carte avec seulement sa fiche (nom, icône, lien).
export function carteDe(id, liste) {
  for (const section of liste) {
    for (const groupe of section.groupes) {
      const carte = groupe.cartes.find((c) => c.fiche === id);
      if (carte) return carte;
    }
  }
  return { fiche: id };
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
const simple = (texte) =>
  String(texte ?? "")
    .replace(/<[^>]+>/g, " ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function nomsDe(f) {
  const complets = [f.data.nom, f.data.bio?.Nom].map(simple).filter(Boolean);
  const noms = new Set(
    [simple(f.fileSlug), simple(f.data.tag_galerie), ...complets].filter(
      Boolean,
    ),
  );
  const mots = new Set(complets.join(" ").split(" ").filter(Boolean));
  return { noms, mots, prenom: complets[0]?.split(" ")[0] };
}

export function ficheDuNom(texte) {
  const nom = simple(String(texte).split(",")[0]);
  if (!nom) return null;
  const tous = fiches.map((f) => ({ f, ...nomsDe(f) }));
  const exacts = tous.filter((p) => p.noms.has(nom));
  if (exacts.length === 1) return exacts[0].f;
  if (exacts.length > 1) return null;
  const [premier, ...reste] = nom.split(" ");
  const motsDuNom = new Set(nom.split(" "));
  const parPrenom = tous.filter(
    (p) =>
      (p.noms.has(premier) || p.prenom === premier) &&
      (reste.every((m) => p.mots.has(m)) ||
        [...p.mots].every((m) => motsDuNom.has(m))),
  );
  return parPrenom.length === 1 ? parPrenom[0].f : null;
}

export function lierRelations(html) {
  return html.replace(
    /<dt\b([^>]*)>((?:(?!<dt\b)[\s\S])*?)<\/dt>/g,
    (tout, attributs, dedans) => {
      if (/<a\b/i.test(dedans)) return tout;
      const f = ficheDuNom(dedans);
      if (!f || f.url === this.page?.url) return tout;
      return `<dt${attributs}><a href="${f.url}">${dedans}</a></dt>`;
    },
  );
}
