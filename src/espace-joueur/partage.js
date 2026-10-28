
(function () {
  const { el, norm, groupesDuProfil } = izOutils;

  let usernamesPromise = null;
  let knownPlayers = new Set();

  function tagClass(t) {
    t = norm(t);
    if (t === "public") return "tag tag--public";
    if (knownPlayers.has(t)) return "tag tag--joueur";
    return "tag tag--groupe";
  }

  function chips(tags) {
    const box = document.createElement("div");
    box.className = "tags";
    for (const t of tags || []) {
      const s = document.createElement("span");
      s.className = tagClass(t);
      s.textContent = t;
      box.appendChild(s);
    }
    return box;
  }


  async function tags(acc) {
    if (!usernamesPromise) {
      usernamesPromise = acc.client.rpc("izmir_usernames").then(({ data }) => (data || []).map((r) =>
        norm(typeof r === "string" ? r : r.izmir_usernames)));
    }
    const all = await usernamesPromise;
    knownPlayers = new Set(all);
    const players = all.filter((u) => u && u !== norm(acc.username));
    let mine = [...new Set(acc.tags)].filter((t) => t !== "public" && t !== norm(acc.username));
    if (acc.isAdmin) {
      const { data } = await acc.client.from("profiles").select("clan, role, extra_tags");
      const groups = new Set();
      for (const p of data || []) for (const t of groupesDuProfil(p)) groups.add(t);
      mine = [...groups].sort();
    }
    return { mine: [...(acc.isAdmin ? [] : [norm(acc.username)]), ...mine, "public"], players };
  }


  function editor(selected, groups, onChange) {
    const box = el("div", "share-editor");
    const draw = () => {
      box.innerHTML = "";
      for (const g of groups) {
        if (!g.tags.length) continue;
        const row = el("div", "share-row");
        row.appendChild(el("span", "share-label", g.label));
        const list = el("div", "tags");
        for (const t of g.tags) {
          const b = el("button", tagClass(t) + (selected.has(t) ? " active" : ""), t);
          b.type = "button";
          b.addEventListener("click", () => {
            selected.has(t) ? selected.delete(t) : selected.add(t);
            draw();
            onChange?.();
          });
          list.appendChild(b);
        }
        row.appendChild(list);
        box.appendChild(row);
      }
    };
    draw();
    return box;
  }

  function escape(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function format(text) {
    return escape(text)
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<i>$2</i>")
      .replace(/\n/g, "<br>");
  }
  function setupModals() {
    const forms = [...document.querySelectorAll(".modal-form")];
    if (!forms.length) return;
    const backdrop = el("div", "modal-backdrop");
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    const sync = () => {
      const open = forms.some((f) => !f.hidden);
      backdrop.hidden = !open;
      document.documentElement.classList.toggle("modal-lock", open);
    };
    const closeAll = () => forms.forEach((f) => (f.hidden = true));

    for (const f of forms) {
      new MutationObserver(sync).observe(f, { attributes: true, attributeFilter: ["hidden"] });
      const x = el("button", "modal-close", "✕");
      x.type = "button";
      x.setAttribute("aria-label", "Fermer");
      x.addEventListener("click", () => (f.hidden = true));
      f.prepend(x);
    }
    backdrop.addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && forms.some((f) => !f.hidden) && !document.querySelector(".lx:not([hidden])")) closeAll();
    });
    sync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupModals);
  else setupModals();

  // Les liens vers les fichiers du coffre (Supabase les fabrique, ils sont signés et expirent).
  // On garde chaque lien quelques jours dans le navigateur au lieu d'en redemander un neuf à chaque visite :
  // avec la même adresse, le navigateur réutilise le fichier déjà téléchargé, ce qui économise la bande passante
  // (l'« Egress » de Supabase, limité à 5 Go par mois).
  const DUREE_LIEN = 7 * 24 * 3600; // un lien est valable 7 jours…
  const MARGE = 24 * 3600; // …et on en redemande un quand il lui reste moins d'un jour
  const CLE_LIENS = "izmir-liens";
  // à donner à l'envoi d'un fichier : le navigateur peut le garder 7 jours sans redemander
  const CACHE = String(DUREE_LIEN);

  function lireLiens() {
    try {
      return JSON.parse(localStorage.getItem(CLE_LIENS)) || {};
    } catch {
      return {};
    }
  }

  // chemins des fichiers -> { chemin: lien }
  async function liens(client, chemins) {
    const maintenant = Date.now() / 1000;
    const gardes = lireLiens();
    const resultat = {};
    const aDemander = [];
    for (const chemin of chemins) {
      const garde = gardes[chemin];
      if (garde && garde.expire - maintenant > MARGE) resultat[chemin] = garde.lien;
      else aDemander.push(chemin);
    }
    if (aDemander.length) {
      const { data } = await client.storage.from("handouts").createSignedUrls(aDemander, DUREE_LIEN);
      for (const s of data || []) {
        if (!s.signedUrl) continue;
        resultat[s.path] = s.signedUrl;
        gardes[s.path] = { lien: s.signedUrl, expire: maintenant + DUREE_LIEN };
      }
    }
    // on ne garde que les liens encore valables, pour que la liste ne grossisse pas sans fin
    for (const [chemin, garde] of Object.entries(gardes)) if (garde.expire - maintenant <= MARGE) delete gardes[chemin];
    try {
      localStorage.setItem(CLE_LIENS, JSON.stringify(gardes));
    } catch {
      // navigation privée ou stockage plein : les liens ne seront simplement pas gardés
    }
    return resultat;
  }

  window.izmirPartage = { tags, editor, format, escape, tagClass, chips, liens, CACHE };
})();
