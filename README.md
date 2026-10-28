# İzmir by Night

Le site de la campagne Izmir by Night : https://izmir.sunnydelicieux.com

Le site est fabriqué par [Eleventy](https://www.11ty.dev/) : tu écris tes pages dans `src/`, et Eleventy en fait
le site final dans `_site/` (ce dossier-là ne se modifie jamais à la main, et ne va pas dans Git).

## Comment c'est rangé

```
src/                     tout ce que tu écris, et seulement ça
├── _data/               les données (listes, menu…), en YAML
│   ├── menu.yaml            la barre de navigation
│   ├── nouveautes.yaml      la liste « Updates » du hub
│   ├── liste_personnages.yaml   la page « Tous les personnages »
│   ├── galerie.yaml         les dessins de la galerie
│   ├── galerie_filtres.yaml les boutons de filtre de la galerie
│   └── redirections.yaml    les anciennes adresses du site
├── _includes/           les modèles de page (le <head>, la barre… écrits une seule fois)
│   ├── base.njk             le squelette de toutes les pages
│   ├── barre.njk            la barre de navigation
│   ├── fiche.njk            une fiche de personnage
│   ├── wiki.njk             une page du wiki
│   └── hub.njk              une page du hub
├── css/  js/  img/      styles, scripts et images partagés par tout le site
├── index.njk            le hub (la page d'accueil)
├── accueil.html         l'accueil du site principal
├── hub/                 les pages du hub : blog, projet, galerie
├── univers/             le wiki : la ville, les clans, la chronologie, les lois…
├── personnages/         une fiche par personnage (+ la liste)
├── jouer/               création de personnage, groupes, objectifs, système
├── outils/              carte, relations, alchemy, tarot
├── galerie/             la galerie (dessins/ : les images)
├── espace-joueur/       le compte des joueurs et l'espace MJ
├── ambiance/            les pages d'ambiance : Inga, Elysium, journal, factions
└── archives/            l'ancien blog et l'ancien hub
config/                  ce qui fabrique le site (pas besoin d'y toucher)
scripts/                 petits outils Python facultatifs
supabase/                la base de données de l'espace joueur (voir supabase/LISEZMOI.md)
```

L'adresse d'une page suit son chemin dans `src/` : `src/jouer/creation.html` devient `/jouer/creation/`.

## Voir le site sur ton ordinateur

Il faut [Node.js](https://nodejs.org) (la version « LTS »), à installer une seule fois.
Puis, dans un terminal ouvert dans le dossier du projet, la première fois :

```bash
npm install
```

Et à chaque fois que tu veux travailler sur le site :

```bash
npm run dev
```

Ouvre http://localhost:8080 : la page se recharge toute seule à chaque fois que tu enregistres un fichier.
Si tu fais une erreur (par exemple une fiche qui cite un personnage qui n'existe pas), le message s'affiche dans le terminal.

## Les tâches courantes

### Modifier une page

Ouvre son fichier dans `src/`. En haut, entre deux lignes `---`, il y a l'en-tête de la page :

```yaml
---
titre: Création            # le titre de l'onglet
layout: base.njk           # le modèle utilisé
css: [/css/izmir.css]      # ses feuilles de style
---
```

En dessous, c'est le HTML de la page, comme avant. Le `<head>`, la barre de navigation et les scripts communs
sont ajoutés par le modèle : inutile de les écrire.

### Ajouter un personnage

1. Copie `src/personnages/_modele.html` en `src/personnages/jiwoo.html` et remplis-le (tout est expliqué dedans).
2. Ajoute sa carte dans `src/_data/liste_personnages.yaml`, à sa place :
   ```yaml
           - fiche: jiwoo
             role: Membre du conseil
   ```
   Le nom, l'icône et le lien viennent de la fiche. Si la fiche n'existe pas, le site refuse de se construire et te dit pourquoi.

Dans une fiche, une relation vers un personnage qui a déjà une fiche peut s'écrire :

```html
{% relation "thouros" %}
  Tant qu'il travaille, Thouros le laisse en paix.
{% endrelation %}
```

Son icône, son nom et le lien vers sa fiche sont ajoutés tout seuls. Les relations écrites en HTML marchent toujours.

### Ajouter une page au wiki

Copie `src/univers/_modele.html` dans `src/univers/` et remplis-le. Avec `rubrique:` et `ordre:` dans son en-tête,
elle apparaît toute seule dans l'index du wiki (`/univers/toutes-les-pages/`).

### Ajouter une nouveauté sur le hub

Dans `src/_data/nouveautes.yaml`, ajoute un bloc tout en haut :

```yaml
- date: 28 Oct 26
  texte: Fiche PNJ de Ji-Woo
  lien: /personnages/jiwoo/
```

### Ajouter un dessin à la galerie

1. Mets l'image dans `src/galerie/dessins/` (dans le dossier de l'artiste, par exemple `sun/`).
   Le site en fabrique tout seul une miniature et une grande image. Pour garder le dépôt léger, tu peux d'abord
   la réduire avec `python3 scripts/reduire_images.py DOSSIER_DES_ORIGINAUX sun` : garde les originaux sur ton ordinateur.
2. Ajoute-la dans `src/_data/galerie.yaml` (en haut, pour qu'elle apparaisse en premier) :
   ```yaml
   - src: sun/mon-dessin.webp
     alt: Mon dessin.
     tags: [sunny, canon, brujah, baran]
     desc: Le texte sous l'image agrandie.
   ```
3. Un nouveau bouton de filtre (thème, personnage, auteur) se règle dans `src/_data/galerie_filtres.yaml`.

### Changer le menu

Tout est dans `src/_data/menu.yaml`.

### Les pages d'ambiance

`src/ambiance/` (Inga, l'Elysium, le journal, les pages des factions) est copié tel quel : chaque page garde son propre
look et ses liens vers ses voisines. Elles n'utilisent pas les modèles du site.

### Vérifier les liens

```bash
npm run build
```

```bash
python3 scripts/verifier_liens.py
```

## Mettre le site en ligne

Le site est reconstruit par l'hébergeur à chaque push : plus aucun robot ne fait de commit dans le dépôt.
Il faut lui donner ces réglages (une seule fois) :

- commande de construction : `npm run build`
- dossier publié : `_site`
- version de Node : 22 (indiquée dans le fichier `.nvmrc`)

**Netlify** lit tout seul le fichier `netlify.toml`. **Cloudflare Pages** : choisis « Eleventy » dans « Framework preset »,
puis vérifie la commande et le dossier ci-dessus.

Si la construction échoue (une erreur dans une page), l'hébergeur garde l'ancienne version en ligne et affiche l'erreur.

## Les anciennes adresses

Les liens vers l'ancien site (Kumu, favoris des joueurs, messages…) marchent toujours : chaque ancienne adresse de
`src/_data/redirections.yaml` a une petite page qui redirige vers la nouvelle. Si tu déplaces une page, ajoute une ligne.

Les images de la galerie gardent leurs anciennes adresses (`/GALLERIE/web/…`, `/GALLERIE/thumbs/…`), pour les liens
qui existent déjà (calendrier, fiches). Les originaux des dessins ne sont plus dans le dépôt : `src/_redirects`
renvoie leurs anciennes adresses vers la version web (sur Netlify et Cloudflare Pages).

## Où est passé quoi

| Avant | Maintenant |
|---|---|
| `WIKI/sources/<clan>/<nom>.html` + `build-fiches.py` | `src/personnages/<nom>.html` |
| `WIKI/fiche/index.html` (la liste) | `src/_data/liste_personnages.yaml` |
| `WIKI/liste.html` (l'index du wiki) | fabriqué tout seul avec `rubrique:` dans chaque page |
| les autres pages de `WIKI/` | `src/univers/` |
| `SITE/CREATION/`, `SITE/SYSTEME/`, `SITE/ORGANISATION/` | `src/jouer/` |
| `SITE/OUTILS/`, `tarot.html` | `src/outils/` |
| `header.html` | `src/_data/menu.yaml` |
| la liste « Updates » de `index.html` | `src/_data/nouveautes.yaml` |
| `newblog/` | `src/hub/` |
| `GALLERIE/gallery-data.js` | `src/_data/galerie.yaml` |
| `GALLERIE/web/` (versions web des dessins) | `src/galerie/dessins/` |
| `GALLERIE/dessin/` (originaux, 490 Mo) | plus dans le dépôt : garde-les sur ton ordinateur |
| `galerie-legere.py` + le robot GitHub | `config/galerie.js`, automatique |
| `build-search-index.py`, `search-index.js` | [Pagefind](https://pagefind.app/), automatique |
| `COMPTE/` | `src/espace-joueur/` |
| `DATA/*.css` | `src/css/` |
| `DATA/*.js` | `src/js/` (`account.js` → `connexion.js`, `search.js` → `recherche.js`) |
| `ELYSIUM/`, `INGA/`, `JOURNAL/`, `SITE/FACTIONS/` | `src/ambiance/` |
| `legacy/` | `src/archives/` (et `legacy/hub/` → `src/img/hub/`) |
