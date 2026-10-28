
import { load as lireYaml } from "js-yaml";
import { preparerGalerie, dessinsDe } from "./config/galerie.js";
import { indexerRecherche } from "./config/recherche.js";
import { fiche, relation, fichesDe } from "./config/personnages.js";
import { ancres } from "./config/ancres.js";

export default function (eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({ engines: { yaml: (texte) => lireYaml(texte) } });
  eleventyConfig.addDataExtension("yaml", (texte) => lireYaml(texte));

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/**/*.{css,js}");
  eleventyConfig.addPassthroughCopy("src/ambiance");
  eleventyConfig.addPassthroughCopy("src/archives");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  eleventyConfig.ignores.add("src/**/_modele.html");
  eleventyConfig.ignores.add("src/ambiance/**");
  eleventyConfig.ignores.add("src/archives/**");
  eleventyConfig.ignores.add("src/galerie/dessins/**");

  eleventyConfig.addCollection("personnages", (api) => fichesDe(api));
  eleventyConfig.addFilter("fiche", fiche);
  eleventyConfig.addPairedShortcode("relation", relation);
  eleventyConfig.addFilter("dessinsDe", dessinsDe);

  eleventyConfig.addCollection("wiki", (api) =>
    api.getAll()
       .filter((page) => page.data.rubrique)
       .sort((a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99))
  );
  eleventyConfig.addFilter("json", (valeur) => JSON.stringify(valeur).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("ancres", ancres);
  eleventyConfig.on("eleventy.before", ({ directories }) => preparerGalerie(directories.output));
  eleventyConfig.addWatchTarget("src/galerie/dessins/");
  eleventyConfig.on("eleventy.after", ({ directories }) => indexerRecherche(directories.output));
}

export const config = {
  dir: { input: "src", output: "_site" },
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
