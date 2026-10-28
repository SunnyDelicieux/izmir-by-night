(function () {
  const norm = (s) => String(s ?? "").toLowerCase().trim();
  const plain = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  const scripts = new Map();
  function loadScript(src) {
    if (!scripts.has(src)) {
      scripts.set(src, new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`${src} introuvable`));
        document.head.appendChild(s);
      }));
    }
    return scripts.get(src);
  }

  const groupesDuProfil = (p) =>
    [p?.clan, p?.role, ...(Array.isArray(p?.extra_tags) ? p.extra_tags : [])].map(norm).filter(Boolean);
  const tagsDuProfil = (p) => ["public", norm(p?.username), ...groupesDuProfil(p)].filter(Boolean);

  window.izOutils = { norm, plain, el, loadScript, groupesDuProfil, tagsDuProfil };
})();
