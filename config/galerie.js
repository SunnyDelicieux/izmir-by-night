// Prépare les images de la galerie à partir de src/galerie/dessins/ :
//   - une miniature de 600 px    → /GALLERIE/thumbs/dessin/<chemin>.webp
//   - une grande image de 2000 px → /GALLERIE/web/dessin/<chemin>.webp
//   - les vidéos et les gifs sont copiés tels quels → /GALLERIE/dessin/<chemin>
// Ce sont les adresses de l'ancien site : les liens qui existent déjà (calendrier, Kumu…) continuent de marcher.
// Une image n'est retraitée que si elle a changé depuis la dernière construction.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = "src/galerie/dessins";
const IMAGE = /\.(png|jpe?g|webp)$/i;
const VERSIONS = {
  thumbs: { taille: 600, qualite: 80 },
  web: { taille: 2000, qualite: 85 },
};

// Les adresses publiées d'un dessin (« src » de galerie.yaml), comme dans src/galerie/galerie.js.
const telQuel = (src) => src.startsWith("/") || /\.(gif|mp4|webm)$/i.test(src);
const fichierPublie = (src) => (src.startsWith("/") ? src : "/GALLERIE/dessin/" + src);
const miniature = (src) => (telQuel(src) ? fichierPublie(src) : "/GALLERIE/thumbs/dessin/" + src.replace(IMAGE, ".webp"));
const grandeImage = (src) => (telQuel(src) ? fichierPublie(src) : "/GALLERIE/web/dessin/" + src.replace(IMAGE, ".webp"));

// Pour la fiche d'un personnage : les dessins tagués avec son nom, en deux onglets.
// Tout est canon (« official » compris), sauf ce qui a le tag « noncanon ».
// Les dessins « spice » et les vidéos ne sont pas montrés. Un onglet vide n'apparaît pas.
export function dessinsDe(dessins, tag) {
  const canon = [];
  const noncanon = [];
  for (const dessin of dessins) {
    const tags = (dessin.tags || []).map((t) => String(t).trim().toLowerCase());
    const src = dessin.pages?.length ? dessin.pages[0].src : dessin.src;
    if (!tags.includes(tag) || tags.includes("spice") || /\.(mp4|webm)$/i.test(src)) continue;
    (tags.includes("noncanon") ? noncanon : canon).push({
      miniature: miniature(src),
      image: grandeImage(src),
      alt: dessin.alt || "",
      legende: dessin.desc || dessin.alt || "",
    });
  }
  return [
    { titre: "Canon", dessins: canon },
    { titre: "Non canon", dessins: noncanon },
  ].filter((onglet) => onglet.dessins.length);
}

async function tousLesFichiers(dossier) {
  const liste = [];
  for (const entree of await fs.readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) liste.push(...(await tousLesFichiers(chemin)));
    else if (entree.isFile()) liste.push(chemin);
  }
  return liste;
}

async function dejaFait(source, cible) {
  try {
    const [s, c] = await Promise.all([fs.stat(source), fs.stat(cible)]);
    return c.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function copier(source, cible) {
  await fs.mkdir(path.dirname(cible), { recursive: true });
  await fs.copyFile(source, cible);
}

export async function preparerGalerie(sortie) {
  for (const source of await tousLesFichiers(SOURCE)) {
    const chemin = path.relative(SOURCE, source);

    if (!IMAGE.test(source)) {
      const cible = path.join(sortie, "GALLERIE/dessin", chemin);
      if (!(await dejaFait(source, cible))) await copier(source, cible);
      continue;
    }

    for (const [version, { taille, qualite }] of Object.entries(VERSIONS)) {
      const cible = path.join(sortie, "GALLERIE", version, "dessin", chemin.replace(IMAGE, ".webp"));
      if (await dejaFait(source, cible)) continue;

      const { width, height } = await sharp(source).metadata();
      if (version === "web" && /\.webp$/i.test(source) && Math.max(width, height) <= taille) {
        // déjà au bon format et à la bonne taille : copiée sans la recompresser
        await copier(source, cible);
        continue;
      }
      await fs.mkdir(path.dirname(cible), { recursive: true });
      await sharp(source)
        .rotate()
        .resize({ width: taille, height: taille, fit: "inside", withoutEnlargement: true })
        .webp({ quality: qualite })
        .toFile(cible);
    }
  }
}
