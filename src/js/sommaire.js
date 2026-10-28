(function () {
  const toc = document.getElementById("toc");
  const contents = document.getElementById("contents");
  if (!toc || !contents) return;

  // même règle que dans DATA/search.js, pour que les liens de la recherche tombent sur ces ancres
  const slug = (s) => s.toLowerCase().replace(/ı/g, "i")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[-_]+/g, " ").trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  let liste = toc;
  let niveau = 0;
  const parents = [];

  for (const titre of contents.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    const n = Number(titre.tagName[1]);
    for (; niveau < n; niveau++) {
      const ol = document.createElement("ol");
      liste.appendChild(ol);
      parents.push(liste);
      liste = ol;
    }
    for (; niveau > n; niveau--) liste = parents.pop();

    titre.id ||= slug(titre.textContent);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${titre.id}`;
    a.textContent = titre.textContent.trim();
    li.appendChild(a);
    liste.appendChild(li);
  }
})();
