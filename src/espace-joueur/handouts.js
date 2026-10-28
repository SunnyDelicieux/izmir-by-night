
(function () {
  const BUCKET = "handouts";

  const gate = document.getElementById("ho-gate");
  const content = document.getElementById("ho-content");
  const fileInput = document.getElementById("file");
  const drop = document.getElementById("drop");
  const dropText = document.getElementById("drop-text");
  const split = document.getElementById("split");
  const pagesBox = document.getElementById("pages");
  const bulkTags = document.getElementById("bulk-tags");
  const sendBtn = document.getElementById("send");
  const cancelBtn = document.getElementById("cancel");
  const sendMsg = document.getElementById("send-msg");
  const sentBox = document.getElementById("sent");
  const filter = document.getElementById("ho-filter");
  const count = document.getElementById("ho-count");
  const allegerBtn = document.getElementById("alleger");
  const allegerMsg = document.getElementById("alleger-msg");

  const { el, norm, plain, tagsDuProfil, groupesDuProfil } = izOutils;

  let client = null;
  let known = ["public"];
  let pending = null;
  let sent = [];


  async function loadKnownTags() {
    const { data } = await client.from("profiles").select("username, clan, role, extra_tags");
    const set = new Set(["public"]);
    for (const p of data || []) for (const t of tagsDuProfil(p)) set.add(t);
    for (const h of sent) for (const t of h.tags || []) set.add(norm(t));
    const groups = new Set((data || []).flatMap(groupesDuProfil));
    known = [...set].sort((a, b) =>
      (a === "public") - (b === "public") || groups.has(a) - groups.has(b) || a.localeCompare(b)
    );
  }

  function tagEditor(selected, onChange) {
    const box = el("div", "tags tag-editor");
    const draw = () => {
      box.innerHTML = "";
      const all = [...new Set([...known, ...selected])];
      for (const t of all) {
        const b = el("button", "tag" + (selected.has(t) ? " active" : ""), t);
        b.type = "button";
        b.addEventListener("click", () => {
          selected.has(t) ? selected.delete(t) : selected.add(t);
          draw();
          onChange?.();
        });
        box.appendChild(b);
      }
      const add = el("button", "tag tag-add", "+");
      add.type = "button";
      add.title = "ajouter un autre tag";
      add.addEventListener("click", () => {
        const t = norm(prompt("Nouveau tag (pseudo, clan, rôle…) :"));
        if (!t) return;
        if (!known.includes(t)) known.push(t);
        selected.add(t);
        draw();
        onChange?.();
      });
      box.appendChild(add);
    };
    draw();
    return box;
  }


  async function openPdf(file) {
    if (!file || !/\.pdf$/i.test(file.name)) {
      dropText.textContent = "ce n'est pas un PDF — clique ou glisse un PDF ici";
      return;
    }
    dropText.textContent = `ouverture de ${file.name}…`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const lib = await izmirLecteur.pdfjs();
    const doc = await lib.getDocument({ data: bytes.slice() }).promise;
    const base = file.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ");

    pending = {
      file,
      bytes,
      doc,
      bulk: new Set(),
      pages: Array.from({ length: doc.numPages }, (_, i) => ({
        num: i + 1,
        keep: true,
        titre: doc.numPages > 1 ? `${base} — ${i + 1}` : base,
        tags: new Set(),
      })),
    };
    dropText.textContent = `${file.name} · ${doc.numPages} page${doc.numPages > 1 ? "s" : ""} — clique pour en choisir un autre`;
    renderPending();
  }

  function renderPending() {
    split.hidden = !pending;
    sendMsg.textContent = "";
    if (!pending) return;

    bulkTags.innerHTML = "";
    bulkTags.appendChild(tagEditor(pending.bulk, () => {
      const before = pending.lastBulk;
      for (const p of pending.pages) {
        for (const t of pending.bulk) if (!before.has(t)) p.tags.add(t);
        for (const t of before) if (!pending.bulk.has(t)) p.tags.delete(t);
      }
      pending.lastBulk = new Set(pending.bulk);
      drawPages();
    }));
    pending.lastBulk = new Set(pending.bulk);
    drawPages();
  }

  function drawPages() {
    pagesBox.innerHTML = "";
    for (const p of pending.pages) {
      const card = el("div", "page-card" + (p.keep ? "" : " skipped"));

      const thumb = el("div", "vault-thumb");
      const canvas = el("canvas");
      thumb.appendChild(canvas);
      izmirLecteur.thumb(pending.doc, p.num, canvas).then(() => canvas.classList.add("ready"));
      card.appendChild(thumb);

      const head = el("label", "page-keep");
      const keep = el("input");
      keep.type = "checkbox";
      keep.checked = p.keep;
      keep.addEventListener("change", () => {
        p.keep = keep.checked;
        card.classList.toggle("skipped", !p.keep);
        updateSendLabel();
      });
      head.append(keep, ` page ${p.num}`);
      card.appendChild(head);

      const titre = el("input", "input");
      titre.value = p.titre;
      titre.placeholder = "titre de la lettre";
      titre.addEventListener("input", () => (p.titre = titre.value));
      card.appendChild(titre);

      card.appendChild(tagEditor(p.tags, updateSendLabel));
      pagesBox.appendChild(card);
    }
    updateSendLabel();
  }

  function updateSendLabel() {
    const kept = pending.pages.filter((p) => p.keep);
    const untagged = kept.filter((p) => !p.tags.size).length;
    sendBtn.textContent = `envoyer ${kept.length} lettre${kept.length > 1 ? "s" : ""}`;
    sendBtn.disabled = !kept.length;
    sendMsg.textContent = untagged
      ? `${untagged} lettre${untagged > 1 ? "s" : ""} sans tag : visible${untagged > 1 ? "s" : ""} par l'admin seulement`
      : "";
  }

  function explain(err) {
    const m = String(err?.message || err?.error || err || "");
    if (/row-level security|violates|Unauthorized|403/i.test(m))
      return "Supabase refuse l'envoi : relance supabase/izmir.sql en entier et vérifie que ton compte a is_admin = true.";
    if (/handouts.*(does not exist|not find)|relation .*handouts|schema cache/i.test(m))
      return "la table « handouts » n'existe pas encore : relance supabase/izmir.sql en entier.";
    if (/bucket not found/i.test(m))
      return "le bucket « handouts » n'existe pas : relance supabase/izmir.sql en entier.";
    if (/duplicate|already exists/i.test(m))
      return "un fichier du même nom existe déjà, réessaie.";
    return `erreur : ${m || "inconnue"} (détails dans la console, F12)`;
  }

  async function send() {
    const kept = pending.pages.filter((p) => p.keep);
    if (!kept.length) return;
    sendBtn.disabled = cancelBtn.disabled = true;

    let done = 0;
    const failed = [];
    let lastError = null;

    for (const p of kept) {
      sendMsg.textContent = `envoi ${done + 1} / ${kept.length}…`;
      try {
        // chaque page devient une image légère (voir alleger.js)
        const image = await izmirAlleger.pageEnImage(pending.doc, p.num);
        const path = `lettres/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}.${izmirAlleger.extension(image)}`;
        const up = await client.storage.from(BUCKET).upload(path, image, { contentType: image.type });
        if (up.error) throw up.error;

        const ins = await client.from("handouts").insert({
          titre: p.titre.trim() || `page ${p.num}`,
          path,
          tags: [...p.tags],
          source: pending.file.name,
          page: p.num,
        });
        if (ins.error) {
          await client.storage.from(BUCKET).remove([path]);
          throw ins.error;
        }
        done++;
      } catch (err) {
        console.error(`page ${p.num}`, err);
        failed.push(p.num);
        lastError = err;
      }
    }

    sendBtn.disabled = cancelBtn.disabled = false;
    if (failed.length) {
      pending.pages = pending.pages.filter((p) => failed.includes(p.num));
      drawPages();
      sendMsg.textContent = `${done} envoyée${done > 1 ? "s" : ""}, échec pour la page ${failed.join(", ")} — ${explain(lastError)}`;
    } else {
      pending = null;
      fileInput.value = "";
      dropText.textContent = `${done} lettre${done > 1 ? "s" : ""} envoyée${done > 1 ? "s" : ""} ✔ — clique ou glisse un autre PDF`;
      renderPending();
    }
    loadSent();
  }

  fileInput.addEventListener("change", () => openPdf(fileInput.files[0]));
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("over");
    openPdf(e.dataTransfer.files[0]);
  });
  sendBtn.addEventListener("click", send);
  cancelBtn.addEventListener("click", () => {
    pending = null;
    fileInput.value = "";
    dropText.textContent = "clique ou glisse un PDF ici";
    renderPending();
  });


  async function loadSent() {
    const { data, error } = await client.from("handouts").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      sentBox.innerHTML = `<div class="note muted">Impossible de charger les lettres (supabase/izmir.sql a-t-il été lancé en entier ?).</div>`;
      return;
    }
    sent = data || [];
    const paths = sent.map((h) => h.path).filter(Boolean);
    const { data: signed } = paths.length
      ? await client.storage.from(BUCKET).createSignedUrls(paths, 3600)
      : { data: [] };
    const urls = Object.fromEntries((signed || []).map((s) => [s.path, s.signedUrl]));
    for (const h of sent) h._url = urls[h.path];
    renderSent();
  }

  function renderSent() {
    const q = plain(filter.value);
    const shown = sent.filter((h) => !q || plain([h.titre, h.source, ...(h.tags || [])].join(" ")).includes(q));
    count.textContent = `${shown.length} lettre${shown.length > 1 ? "s" : ""}`;
    sentBox.innerHTML = "";
    if (!shown.length) {
      sentBox.appendChild(el("div", "note muted", sent.length ? "Aucune lettre ne correspond." : "Aucune lettre envoyée pour l'instant."));
      return;
    }

    for (const h of shown) {
      const row = el("div", "note sent-row");
      const tags = new Set((h.tags || []).map(norm));

      const thumb = el("button", "sent-thumb");
      thumb.type = "button";
      thumb.title = "lire";
      const isPdf = /\.pdf$/i.test(h.path || "");
      if (!h.path) {
        const sheet = el("div", "letter-thumb");
        sheet.innerHTML = izmirPartage.format((h.contenu || "").slice(0, 300));
        thumb.appendChild(sheet);
        thumb.addEventListener("click", () => izmirLecteur.open({ title: h.titre, kind: "texte", html: izmirPartage.format(h.contenu), author: h.author_name }));
      } else if (h._url && isPdf) {
        const canvas = el("canvas");
        thumb.appendChild(canvas);
        izmirLecteur.cover(h._url, canvas).then(() => canvas.classList.add("ready")).catch(() => {});
        thumb.addEventListener("click", () => izmirLecteur.open({ title: h.titre, url: h._url, kind: "pdf" }));
      } else if (h._url) {
        const img = el("img");
        img.src = h._url;
        img.alt = "";
        img.style.cssText = "width:100%;height:100%;object-fit:cover";
        thumb.appendChild(img);
        thumb.addEventListener("click", () => izmirLecteur.open({ title: h.titre, url: h._url, kind: "image" }));
      }
      row.appendChild(thumb);

      const body = el("div", "sent-body");
      const titre = el("input", "input");
      titre.value = h.titre;
      body.appendChild(titre);
      body.appendChild(el("div", "muted sent-meta",
        [h.author_name && `de ${h.author_name}`, !h.path && "lettre écrite", h.source && `${h.source}${h.page ? `, page ${h.page}` : ""}`, new Date(h.created_at).toLocaleDateString("fr-FR")]
          .filter(Boolean).join(" · ")));

      const actions = el("div", "row-btns");
      const save = el("button", "btn", "enregistrer");
      save.type = "button";
      save.hidden = true;
      const markDirty = () => (save.hidden = false);
      titre.addEventListener("input", markDirty);
      body.appendChild(tagEditor(tags, markDirty));

      save.addEventListener("click", async () => {
        save.disabled = true;
        const { error } = await client.from("handouts")
          .update({ titre: titre.value.trim() || h.titre, tags: [...tags] })
          .eq("id", h.id);
        save.disabled = false;
        if (error) { console.error(error); save.textContent = "échec, réessayer"; return; }
        h.titre = titre.value.trim() || h.titre;
        h.tags = [...tags];
        save.hidden = true;
        save.textContent = "enregistrer";
      });

      const del = el("button", "btn", "supprimer");
      del.type = "button";
      del.addEventListener("click", async () => {
        if (!confirm(`Supprimer « ${h.titre} » ? Les joueurs ne la verront plus.`)) return;
        del.disabled = true;
        const { error } = await client.from("handouts").delete().eq("id", h.id);
        if (error) { console.error(error); del.disabled = false; del.textContent = "échec"; return; }
        if (h.path) await client.storage.from(BUCKET).remove([h.path]);
        sent = sent.filter((x) => x.id !== h.id);
        renderSent();
      });

      actions.append(save, del);
      body.appendChild(actions);
      row.appendChild(body);
      sentBox.appendChild(row);
    }
  }

  filter.addEventListener("input", renderSent);


  // ===== ALLÉGER LES FICHIERS DÉJÀ ENVOYÉS =====
  // Supabase interdit de changer le fichier d'une lettre : on crée donc une lettre identique
  // (titre, tags, auteur, date…) avec le fichier allégé, puis on supprime l'ancienne et son fichier.

  async function alleger(h) {
    const reponse = await fetch(h._url);
    if (!reponse.ok) throw new Error(`téléchargement impossible (${reponse.status})`);
    const avant = await reponse.blob();
    let apres;
    if (/\.pdf$/i.test(h.path)) {
      const lib = await izmirLecteur.pdfjs();
      const doc = await lib.getDocument({ data: new Uint8Array(await avant.arrayBuffer()) }).promise;
      if (doc.numPages !== 1) return 0; // un PDF de plusieurs pages (envoyé par un joueur) reste tel quel
      apres = await izmirAlleger.pageEnImage(doc, 1);
    } else {
      apres = await izmirAlleger.imageAllegee(avant);
    }
    if (apres === avant || apres.size > avant.size * 0.9) return 0; // presque rien à gagner

    // même dossier : un fichier de joueur reste dans joueurs/<son id>/, il peut donc toujours le supprimer
    const dossier = h.path.slice(0, h.path.lastIndexOf("/") + 1);
    const path = `${dossier}${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}.${izmirAlleger.extension(apres)}`;
    const up = await client.storage.from(BUCKET).upload(path, apres, { contentType: apres.type });
    if (up.error) throw up.error;

    const { data: copie, error: erreurCopie } = await client.from("handouts").insert({
      titre: h.titre, tags: h.tags, source: h.source, page: h.page,
      created_at: h.created_at, author: h.author, author_name: h.author_name, path,
    }).select("id").single();
    if (erreurCopie) {
      await client.storage.from(BUCKET).remove([path]);
      throw erreurCopie;
    }
    const { error: erreurSuppression } = await client.from("handouts").delete().eq("id", h.id);
    if (erreurSuppression) {
      await client.from("handouts").delete().eq("id", copie.id);
      await client.storage.from(BUCKET).remove([path]);
      throw erreurSuppression;
    }
    await client.storage.from(BUCKET).remove([h.path]);
    return avant.size - apres.size;
  }

  allegerBtn.addEventListener("click", async () => {
    const aFaire = sent.filter((h) => h.path && h._url && !/\.(webp|gif)$/i.test(h.path));
    if (!aFaire.length) {
      allegerMsg.textContent = "Rien à alléger : tous les fichiers sont déjà légers.";
      return;
    }
    if (!confirm(`Alléger ${aFaire.length} fichier${aFaire.length > 1 ? "s" : ""} ? Les lettres PDF d'une page deviennent des images ` +
      "(on ne pourra plus sélectionner leur texte). Les titres, tags et dates ne changent pas.")) return;

    allegerBtn.disabled = true;
    let gagne = 0;
    let alleges = 0;
    const echecs = [];
    for (const [i, h] of aFaire.entries()) {
      allegerMsg.textContent = `allègement ${i + 1} / ${aFaire.length}…`;
      try {
        const octets = await alleger(h);
        if (octets > 0) {
          gagne += octets;
          alleges++;
        }
      } catch (err) {
        console.error(h.titre, err);
        echecs.push(h.titre);
      }
    }
    allegerBtn.disabled = false;
    allegerMsg.textContent = `${alleges} fichier${alleges > 1 ? "s" : ""} allégé${alleges > 1 ? "s" : ""}, ` +
      `${(gagne / 1024 / 1024).toFixed(1)} Mo gagnés.` +
      (echecs.length ? ` Échec pour : ${echecs.join(", ")} (détails dans la console, F12).` : "");
    await loadSent();
  });


  izmirAccount.onChange(async (acc) => {
    client = acc.client;
    const ok = acc.user && acc.isAdmin;
    content.hidden = !ok;
    gate.hidden = ok;
    if (!acc.user) {
      gate.textContent = acc.error
        ? "Connexion au serveur impossible, réessaie plus tard."
        : "Connecte-toi (bouton « connexion » en haut à droite du bandeau) avec le compte admin.";
      return;
    }
    if (!acc.isAdmin) {
      gate.textContent = "Cette page est réservée à l'admin.";
      return;
    }
    await loadSent();
    await loadKnownTags();
    renderSent();
    if (pending) renderPending();
  });
})();
