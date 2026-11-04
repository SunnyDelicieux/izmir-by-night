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

export function fiche(id) {
  return trouver(id, this.page?.inputPath);
}

export function carteDe(id, liste) {
  for (const section of liste) {
    for (const groupe of section.groupes) {
      const carte = groupe.cartes.find((c) => c.fiche === id);
      if (carte) return carte;
    }
  }
  return { fiche: id };
}

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

export function avecEtreintes(html, toutes) {
  html = String(html);
  // les repères : les événements et les titres qui ont une année, dans l'ordre de la page
  const reperes = [];
  for (const m of html.matchAll(
    /<div class="chrono-evenement">|<h2[^>]*>([\s\S]*?)<\/h2>/g,
  )) {
    if (m[0].startsWith("<h2")) {
      const annee = anneeDe(sansBalises(m[1]));
      const debut = html.indexOf('<div class="chronologie">', m.index);
      if (annee !== null && debut !== -1)
        reperes.push({
          annee,
          position: debut + '<div class="chronologie">'.length,
        });
    } else {
      const date = html
        .slice(m.index)
        .match(/<div class="chrono-date">([\s\S]*?)<\/div>/);
      const annee = anneeDe(sansBalises(date[1].replace(/<br\s*\/?>/g, " ")));
      if (annee !== null)
        reperes.push({ annee, position: finDuBloc(html, m.index) });
    }
  }
  const premier =
    html.indexOf('<div class="chronologie">') +
    '<div class="chronologie">'.length;

  // chaque Étreinte va après le dernier repère qui la précède
  const ajouts = new Map();
  for (const f of toutes) {
    const date = sansBalises(f.data.bio?.["Étreinte"] ?? f.data.bio?.Etreinte);
    const annee = anneeDe(date);
    if (annee === null) continue;
    const avant = reperes.filter((r) => r.annee <= annee).at(-1);
    const position = avant ? avant.position : premier;
    if (!ajouts.has(position)) ajouts.set(position, []);
    ajouts.get(position).push({ annee, html: ligneEtreinte(f, date) });
  }

  // on colle les Étreintes en partant de la fin, pour que les positions restent justes
  for (const position of [...ajouts.keys()].sort((a, b) => b - a)) {
    const lignes = ajouts
      .get(position)
      .sort((a, b) => a.annee - b.annee)
      .map((l) => l.html)
      .join("");
    html = html.slice(0, position) + lignes + html.slice(position);
  }
  return html;
}

function ligneEtreinte(f, date) {
  const sire = sansBalises(f.data.bio?.Sire);
  const ficheSire = sire ? ficheDuNom(sire) : null;
  const lien = (url, texte) => `<a href="${url}">${echapper(texte)}</a>`;
  return `
<div class="chrono-evenement chrono-etreinte">
    <div class="chrono-date">${echapper(date)}</div>
    <div class="chrono-contenu">
        <div class="chrono-titre">Étreinte ${/^[aeiouyàâéèêëîïôûœ]/i.test(f.data.nom) ? "d’" : "de "}${lien(f.url, f.data.nom)}</div>
        ${sire ? `<p>Par ${ficheSire ? lien(ficheSire.url, sire) : echapper(sire)}.</p>` : ""}
    </div>
</div>
`;
}

// la fin d'un <div …> : là où se ferme le </div> qui lui correspond
function finDuBloc(html, debut) {
  let profondeur = 0;
  const balises = /<div\b|<\/div>/g;
  balises.lastIndex = debut;
  for (const m of html.matchAll(balises)) {
    if (m.index < debut) continue;
    profondeur += m[0] === "</div>" ? -1 : 1;
    if (profondeur === 0) return m.index + m[0].length;
  }
  return html.length;
}

const sansBalises = (texte) =>
  String(texte ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const echapper = (texte) =>
  String(texte)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// L'année, à peu près, pour ranger : « 1851 », « ~1830 », « vers 1750 », « Vers -1000 », « 1450–1540 » → la première année ;
// « Début du XIIIe siècle » → 1210, « Milieu du XIXe siècle » → 1850, « Fin XIIIe » → 1290, « Au 18ème siècle » → 1750 ;
// « … avant J.C » → une année négative. Sans date lisible (« Antiquité ») : null.
function anneeDe(texte) {
  const debut = texte.split("–")[0];
  const negatif = /av(?:ant|\.)\s*J/i.test(debut) ? -1 : 1;
  const annee = debut.match(/(?:^|\D)(-?\d{3,4})/);
  if (annee) return Number(annee[1]) * negatif;
  const siecle = debut.match(/\b([IVX]+|\d{1,2})(?:e|è|ème)\b/);
  if (!siecle) return null;
  const n = /\d/.test(siecle[1]) ? Number(siecle[1]) : nombre(siecle[1]);
  const dans = /début/i.test(debut) ? 10 : /fin/i.test(debut) ? 90 : 50;
  return ((n - 1) * 100 + dans) * negatif;
}

// « XIX » → 19
function nombre(texte) {
  for (const [valeur, lettres] of [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]) {
    if (texte.startsWith(lettres))
      return valeur + nombre(texte.slice(lettres.length));
  }
  return 0;
}
