(function () {
  if (window.izmirAccount) return;
  const { norm, loadScript, tagsDuProfil } = window.izOutils;

  const SUPABASE_URL = "https://bbxuycsmyowwsjrcdrsd.supabase.co";
  const SUPABASE_KEY = "sb_publishable_IvC70lWI8ymTVMaAnF76Uw_9CEKbexj";
  const SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3";
  const LOGIN_DOMAIN = "izmir.local";
  const SESSION_KEY = "sb-bbxuycsmyowwsjrcdrsd-auth-token";

  let clientPromise = null;
  let state = { client: null, user: null, profile: null, tags: ["public"], isAdmin: false };
  let started = false;
  const listeners = [];

  function hasStoredSession() {
    try { return !!localStorage.getItem(SESSION_KEY); } catch (e) { return false; }
  }

  function load() {
    if (clientPromise) return clientPromise;
    clientPromise = loadScript(SUPABASE_JS).then(() => {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      state.client = client;
      return new Promise((resolve) => {
        client.auth.onAuthStateChange((event, session) => {
          setTimeout(async () => {
            await applySession(session);
            resolve(client);
          }, 0);
        });
      });
    });
    return clientPromise;
  }

  let appliedUserId;

  async function applySession(session) {
    const user = session?.user || null;
    const changed = (user?.id || null) !== (appliedUserId ?? null);
    if (started && !changed) return;
    started = true;
    appliedUserId = user?.id || null;

    let profile = null;
    if (user) {
      const { data } = await state.client
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      profile = data || null;
    }

    const username = profile?.username || (user ? user.email.split("@")[0] : null);
    state = {
      client: state.client,
      user,
      profile: profile && { ...profile, username },
      username,
      isAdmin: !!profile?.is_admin,
      tags: user ? tagsDuProfil({ ...profile, username }) : ["public"],
    };

    if (changed) renderWidget();
    for (const fn of listeners) fn(state);
  }

  function onChange(fn) {
    load().then(() => {
      listeners.push(fn);
      fn(state);
    }).catch((err) => {
      console.error(err);
      fn({ ...state, error: err });
    });
  }

  async function signIn(login, password) {
    const client = await load();
    const email = login.includes("@") ? login : `${norm(login)}@${LOGIN_DOMAIN}`;
    const { error } = await client.auth.signInWithPassword({ email, password });
    return !error;
  }

  async function signOut() {
    const client = await load();
    await client.auth.signOut();
  }

  const badgesDemandes = new Set();
  async function gagnerBadge(badge) {
    if (badgesDemandes.has(badge) || !hasStoredSession()) return false;
    badgesDemandes.add(badge);
    try {
      const client = await load();
      const deja = state.profile?.badges;
      if (Array.isArray(deja) && deja.map(norm).includes(badge)) return true;
      const { data, error } = await client.rpc("izmir_gagner_badge", { badge });
      return !error && data === true;
    } catch (e) {
      return false;
    }
  }

  window.izmirAccount = { load, onChange, signIn, signOut, gagnerBadge, get state() { return state; } };

  let box = null;

  function topbar() {
    let bar = document.getElementById("iz-topbar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "iz-topbar";
      document.body.appendChild(bar);
    }
    return bar;
  }

  function place() {
    const barre = document.getElementById("iz-barre-compte");
    if (barre) {
      box.classList.add("iza-box--barre");
      barre.appendChild(box);
    } else {
      topbar().prepend(box);
    }
  }

  function renderWidget() {
    if (!box) return;
    box.classList.remove("iza-open");
    box.classList.toggle("iza-logged", !!state.user);

    if (state.user) {
      const pageUrl = encodeURIComponent(location.pathname + location.hash);
      box.innerHTML = `
        <button class="iza-btn" type="button" aria-haspopup="true"></button>
        <div class="iza-panel" role="menu">
          <div class="iza-who"></div>
          <a href="/espace-joueur/#calendrier" role="menuitem">calendrier</a>
          <a href="/espace-joueur/#coffre" role="menuitem">coffre-fort</a>
          <a href="/espace-joueur/?page=${pageUrl}#signaler" role="menuitem">signaler une erreur</a>
          ${state.isAdmin ? '<div class="iza-sep"></div><a href="/espace-joueur/mj/" role="menuitem">espace MJ</a>' : ""}
          <div class="iza-sep"></div>
          <button class="iza-item" type="button" data-logout role="menuitem">déconnexion</button>
        </div>`;
      box.querySelector(".iza-btn").textContent = state.username;
      box.querySelector(".iza-who").textContent =
        state.isAdmin ? "MJ" : [state.profile?.clan, state.profile?.role].filter(Boolean).join(" · ");
      box.querySelector("[data-logout]").addEventListener("click", signOut);
    } else {
      box.innerHTML = `
        <button class="iza-btn" type="button" aria-haspopup="true">connexion</button>
        <div class="iza-panel">
          <form class="iza-form">
            <input name="login" type="text" autocomplete="username" placeholder="identifiant…" aria-label="Identifiant" required>
            <input name="password" type="password" autocomplete="current-password" placeholder="mot de passe…" aria-label="Mot de passe" required>
            <button type="submit">se connecter</button>
            <div class="iza-msg" aria-live="polite"></div>
          </form>
        </div>`;
      const form = box.querySelector("form");
      const msg = box.querySelector(".iza-msg");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        msg.textContent = "connexion…";
        const ok = await signIn(form.login.value.trim(), form.password.value);
        if (!ok) msg.textContent = "identifiants invalides";
      });
    }

    box.querySelector(".iza-btn").addEventListener("click", () => {
      const open = box.classList.toggle("iza-open");
      if (open && !state.user) {
        load();
        box.querySelector("input")?.focus();
      }
    });
  }

  function init() {
    if (box) return;
    box = document.createElement("div");
    box.className = "iza-box";
    place();
    renderWidget();

    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) box.classList.remove("iza-open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") box.classList.remove("iza-open");
    });

    if (hasStoredSession()) load();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
