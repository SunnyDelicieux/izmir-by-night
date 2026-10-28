// La configuration du site. Tu n'as normalement pas besoin d'y toucher :
// les pages sont dans src/, les données dans src/_data/, les modèles dans src/_includes/.

import { load as lireYaml } from "js-yaml";
import { preparerGalerie, dessinsDe } from "./config/galerie.js";
import { indexerRecherche } from "./config/recherche.js";
import { fiche, relation, fichesDe, lierRelations } from "./config/personnages.js";
import { ancres } from "./config/ancres.js";

export default function (eleventyConfig) {
  // Le YAML (en-têtes des pages et fichiers de src/_data/) est lu de la même façon partout.
  eleventyConfig.setFrontMatterParsingOptions({ engines: { yaml: (texte) => lireYaml(texte) } });
  eleventyConfig.addDataExtension("yaml", (texte) => lireYaml(texte));

  // Copiés tels quels, sans transformation.
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/**/*.{css,js}");
  eleventyConfig.addPassthroughCopy("src/ambiance");
  eleventyConfig.addPassthroughCopy("src/archives");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Pas transformés en pages : les modèles à copier, les îles (copiées au-dessus)
  // et les dessins (préparés par config/galerie.js).
  eleventyConfig.ignores.add("src/**/_modele*.html");
  eleventyConfig.ignores.add("src/ambiance/**");
  eleventyConfig.ignores.add("src/archives/**");
  eleventyConfig.ignores.add("src/galerie/dessins/**");

  // Toutes les fiches de src/personnages/, triées par nom de fichier.
  eleventyConfig.addCollection("personnages", (api) => fichesDe(api));
  // {% set f = "thouros" | fiche %} : la fiche de Thouros (le site refuse de se construire si elle n'existe pas).
  eleventyConfig.addFilter("fiche", fiche);
  // {% relation "thouros" %}texte{% endrelation %} : une relation avec l'icône et le lien de la fiche.
  eleventyConfig.addPairedShortcode("relation", relation);
  // {{ content | lierRelations }} : les noms des relations qui correspondent à une fiche deviennent des liens.
  eleventyConfig.addFilter("lierRelations", lierRelations);
  // {% set onglets = galerie | dessinsDe("baran", galerie_filtres.fiches) %} : les dessins tagués « baran », rangés en onglets.
  eleventyConfig.addFilter("dessinsDe", dessinsDe);

  // Les pages du wiki qui ont une « rubrique: », rangées selon leur « ordre: » (pour l'index du wiki).
  eleventyConfig.addCollection("wiki", (api) =>
    api.getAll()
       .filter((page) => page.data.rubrique)
       .sort((a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99))
  );

  // Écrit une donnée dans une balise <script> sans risque de la casser.
  eleventyConfig.addFilter("json", (valeur) => JSON.stringify(valeur).replace(/</g, "\\u003c"));
  // Donne un id aux titres des pages du wiki, pour le sommaire et la recherche.
  eleventyConfig.addFilter("ancres", ancres);

  // Avant chaque construction : miniatures et grandes images de la galerie.
  eleventyConfig.on("eleventy.before", ({ directories }) => preparerGalerie(directories.output));
  // Avec « npm run dev », un dessin ajouté met aussi le site à jour.
  eleventyConfig.addWatchTarget("src/galerie/dessins/");
  // Après chaque construction : l'index de la barre de recherche.
  eleventyConfig.on("eleventy.after", ({ directories }) => indexerRecherche(directories.output));
}

export const config = {
  dir: { input: "src", output: "_site" },
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
