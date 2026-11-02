
import * as pagefind from "pagefind";

export async function indexerRecherche(sortie) {
  const { index } = await pagefind.createIndex({ forceLanguage: "fr" });
  const ajout = await index.addDirectory({ path: sortie });
  if (ajout.errors.length) throw new Error("Recherche : " + ajout.errors.join("\n"));
  await index.writeFiles({ outputPath: `${sortie}/pagefind` });
  await pagefind.close();
}
