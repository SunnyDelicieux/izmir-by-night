# Les sites « vieux web » d'Izmir : mode d'emploi

Ce dossier contient de faux sites de 2010 qui font allusion à l'univers : un garage, un catalogue de cassettes, un talk-show, un site occulte, et un annuaire qui les relie.

Ce sont des **pages HTML toutes simples** : du HTML et du CSS, aucun JavaScript. Une page = un fichier `index.html`, qui contient son texte et son style.

```
src/ambiance/web/
    index.html            l'annuaire IZMIR.WEB : la porte d'entrée, un lien par site
    carat/index.html      le garage de Dimitri
    devourme/index.html   les cassettes d'Aylin
    max/index.html        le talk-show de Max
    occulte/index.html    les pages occultes
    _modele/index.html    une page vide à copier
```

Pour les voir : `npm run dev`, puis `http://localhost:8080/ambiance/web/`.

---

## Ajouter du contenu

Ouvre la page, cherche le mot **COPIER**. Chaque morceau qu'on peut répéter est encadré :

```html
<!-- COPIER À PARTIR D'ICI pour ajouter un message -->
<div class="message">
    <span class="qui">A.</span> <span class="quand">— 14/05/2010</span><br>
    Le texte du message.
</div>
<!-- JUSQU'ICI -->
```

Copie le bloc, colle-le juste en dessous, change le texte. C'est tout.

À savoir en écrivant du HTML :

- `<br>` passe à la ligne, `<b>…</b>` met en gras, `<i>…</i>` en italique.
- `&` s'écrit `&amp;` et `<` s'écrit `&lt;`.
- Le bandeau qui défile est la balise `<marquee>` : change simplement son texte.

## Ajouter une image

Les pages ont des « fausses images », des cases grises avec un nom de fichier, comme une image qui ne charge pas :

```html
<span class="fausse-image">[photo.jpg]</span>
```

Pour mettre une vraie image, range le fichier dans le dossier du site et remplace la ligne par :

```html
<img src="photo.jpg" alt="">
```

## Changer l'ambiance d'un site

Tout en haut de chaque page, entre `<style>` et `</style>`, les premières lignes donnent les couleurs et la police. `background` est la couleur du fond, `color` celle du texte, `font` la police.

## Ajouter une page à un site

Copie le `index.html` du site sous un autre nom dans le même dossier (`galerie.html`), change son contenu, puis fais un lien vers elle : `<a href="galerie.html">Galerie</a>`.

## Faire un nouveau site

1. Copie le dossier `_modele` et renomme-le : `src/ambiance/web/mon-site/`.
2. Change le titre, les couleurs et les textes de son `index.html`.
3. Ajoute-le à l'annuaire : dans `src/ambiance/web/index.html`, copie un bloc de site et change le lien (`mon-site/`), le nom et la description.

---

## Montrer un site dans le navigateur d'Inga

Le faux Chrome du PC 1 peut afficher ces pages sous une fausse adresse. Il suffit d'une fiche dans `src/ambiance/factions/navigateur/sites.js` :

```js
Nav.site("mon-site.com.tr", {
    titre: "Le titre de l'onglet",
    page: "/ambiance/web/mon-site/",
    mots: ["un mot", "un autre"],          // les recherches Google qui le trouvent (en minuscules)
    extrait: "Le texte sous le résultat."
});
```

Ensuite, dans le navigateur d'Inga, on peut taper l'adresse, suivre un lien depuis l'annuaire, ou chercher un des mots dans Google.

Pour qu'un site apparaisse **sans rien taper**, ajoute son adresse dans `src/ambiance/factions/navigateur/historique.js` :

- dans `Nav.plusVisites`, pour une vignette sur la page « Nouvel onglet » ;
- dans `Nav.historique`, pour une ligne dans l'historique d'Inga.

## Un contenu qui n'apparaît qu'à partir d'une nuit

Facultatif. Si une page doit changer au fil du visual novel d'Inga, ajoute cette ligne dans son `<head>` :

```html
<script src="/ambiance/vn/pont.js"></script>
```

Puis mets `data-nuit="2"` sur un bloc : il ne se verra qu'à partir de la nuit 2 quand la page est ouverte sur le PC d'Inga. Ouverte toute seule, la page montre tout.

## Mettre un lien dans le menu du site

Dans `src/_data/menu.yaml`, sous « À lire, à voir », ajoute :

```yaml
        - texte: Le web d'Izmir
          url: /ambiance/web/
```
