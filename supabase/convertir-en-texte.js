// À coller dans la console (F12) de la page MJ, connecté en admin.
//   await izmirTexte()      → montre seulement ce qui serait converti (rien n'est modifié)
//   await izmirTexte(true)  → convertit pour de vrai
window.izmirTexte = async (pourDeVrai = false) => {
  const { client, isAdmin } = izmirAccount.state;
  if (!isAdmin) return console.warn("Connecte-toi en admin d'abord.");
  const { data: lettres, error } = await client.from("handouts").select("*").like("path", "%.pdf");
  if (error) throw error;
  const liens = await izmirPartage.liens(client, lettres.map((h) => h.path));
  const lib = await izmirLecteur.pdfjs();
  const textes = (window.izmirTextes ||= {}); // pour ne pas retélécharger les PDF au 2e lancement
  const bilan = [];

  for (const h of lettres) {
    try {
      if (!(h.id in textes)) {
        const doc = await lib.getDocument({ url: liens[h.path] }).promise;
        let texte = "";
        for (let n = 1; n <= doc.numPages; n++) {
          const { items } = await (await doc.getPage(n)).getTextContent();
          texte += items.map((i) => i.str + (i.hasEOL ? "\n" : "")).join("") + "\n\n";
        }
        textes[h.id] = texte.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
      }
      const texte = textes[h.id];
      if (texte.length < 30) { bilan.push({ titre: h.titre, résultat: "gardé : pas de texte dedans (scan ou image)" }); continue; }
      if (texte.length > 20000) { bilan.push({ titre: h.titre, résultat: "gardé : trop long (20 000 caractères max)" }); continue; }
      if (!pourDeVrai) { bilan.push({ titre: h.titre, résultat: "à convertir", début: texte.slice(0, 80) }); continue; }

      // on ne peut pas enlever le fichier d'une lettre : on crée une lettre identique en texte, puis on supprime l'ancienne
      const { error: e1 } = await client.from("handouts").insert({
        titre: h.titre, tags: h.tags, source: h.source, page: h.page, created_at: h.created_at,
        author: h.author, author_name: h.author_name, path: null, contenu: texte,
      });
      if (e1) throw e1;
      const { error: e2 } = await client.from("handouts").delete().eq("id", h.id);
      if (e2) throw e2;
      // le PDF reste dans le stockage Supabase comme sauvegarde ; plus personne ne le télécharge
      bilan.push({ titre: h.titre, résultat: "converti en texte" });
    } catch (err) {
      bilan.push({ titre: h.titre, résultat: `erreur : ${err.message || err}` });
    }
  }
  console.table(bilan);
};
