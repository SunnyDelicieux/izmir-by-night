// Construit l'index de la barre de recherche avec Pagefind (https://pagefind.app),
// à partir des pages déjà construites dans _site/.
// Seules les pages marquées data-pagefind-body sont indexées (voir src/_includes/base.njk) :
// les îles d'ambiance, l'espace joueur et les redirections n'apparaissent pas dans la recherche.

import * as pagefind from "pagefind";

export async function indexerRecherche(sortie) {
  const { index } = await pagefind.createIndex({ forceLanguage: "fr" });
  const ajout = await index.addDirectory({ path: sortie });
  if (ajout.errors.length) throw new Error("Recherche : " + ajout.errors.join("\n"));
  await index.writeFiles({ outputPath: `${sortie}/pagefind` });
  await pagefind.close();
}
