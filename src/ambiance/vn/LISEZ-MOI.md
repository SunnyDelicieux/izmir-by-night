# Le moteur de visual novel : mode d'emploi

Ce dossier contient un petit moteur de visual novel / point-and-click, écrit pour le site.
Il sert à l'histoire d'Inga (`/ambiance/inga/`) et peut servir à d'autres histoires.

L'idée à retenir : **le moteur et l'histoire sont séparés.**

| | Où | On y touche pour… |
|---|---|---|
| **Le moteur** | `src/ambiance/vn/` | presque jamais. Il ne contient aucun texte d'histoire. |
| **Une histoire** | `src/ambiance/inga/` (ou un autre dossier) | écrire : dialogues, lieux, nuits. |
| **Les écrans** (les PC) | `src/ambiance/factions/` | changer ce qu'on voit sur les ordinateurs. |

Pas d'installation, pas de logiciel spécial : ce sont des fichiers `.js`, `.css` et `.html` ordinaires.

---

## 1. Lancer et tester

```bash
npm run dev
```

Puis ouvrir `http://localhost:8080/ambiance/inga/`.

Trois adresses utiles :

| Adresse | Effet |
|---|---|
| `/ambiance/inga/` | l'histoire, comme la voit un joueur |
| `/ambiance/inga/#atelier` | le **mode atelier** (voir plus bas) |
| `/ambiance/inga/#recommencer` | efface la progression |

Après avoir changé un fichier, recharge la page (F5).

### Le mode atelier

Avec `#atelier` au bout de l'adresse, un panneau apparaît en bas à droite :

- le contour et le **nom de chaque zone** cliquable ;
- la **mémoire** : tout ce que l'histoire a noté jusqu'ici ;
- **noter / oublier** un nom à la main (pour tester une suite sans tout rejouer) ;
- **aller à la nuit** 1, 2, 3… ;
- **dialogues en accéléré** : les répliques défilent seules ;
- **mesurer une zone** : maintenir Maj et glisser sur l'image. Le panneau écrit `zone: [x1, y1, x2, y2]`, à recopier.

### Quand quelque chose cloche

À chaque démarrage, le moteur relit toute l'histoire. S'il trouve une erreur, il l'écrit en français dans un bandeau rouge en haut de la page (sur ton ordinateur et en mode atelier ; en ligne, seulement dans la console, F12) :

> Scène « chat », étape 2 : la scène « nourir » n'existe pas.

Les erreurs les plus fréquentes :

| Ce que dit le bandeau | Ce qu'il faut chercher |
|---|---|
| `Erreur dans histoire/nuit-1.js, ligne 42…` | une **virgule** oubliée à la fin de la ligne d'avant, un guillemet ou un crochet pas refermé |
| `la scène « … » n'existe pas` | une faute de frappe dans un nom de scène |
| `je ne connais pas la commande « … »` | une faute de frappe dans une commande (`vas` au lieu de `va`) |
| `… est déclaré deux fois` | deux scènes portent le même nom |

---

## 2. Comment une histoire est rangée

```
src/ambiance/inga/
    index.html            la page : elle charge le moteur, puis les fichiers de l'histoire
    style.css             l'ambiance (couleurs, police) et ce qui est propre à Inga
    histoire/
        reglages.js       titre, musique, personnages
        lieux.js          les lieux, leurs objets cliquables, les écrans
        nuit-1.js         la nuit 1 et toutes ses scènes
        nuit-2.js         la nuit 2
    1.png, 2.png, …       les images et la musique
```

Une histoire se décrit avec **six mots** :

| Mot | Ce qu'il déclare |
|---|---|
| `VN.reglages({ … })` | le titre, la musique, le nom de la sauvegarde |
| `VN.personnage("Nom", { … })` | quelqu'un qui parle : son portrait, ses sprites |
| `VN.lieu("nom", { … })` | une image avec des objets cliquables |
| `VN.ecran("nom", { … })` | une page affichée en grand (un PC) |
| `VN.nuit(1, { … })` | un chapitre |
| `VN.scene("nom", [ … ])` | ce qui se dit et ce qui se passe |

L'ordre des fichiers n'a pas d'importance entre eux : le moteur attend d'avoir tout lu avant de commencer.

---

## 3. Écrire des dialogues

Une scène est **une liste d'étapes**, lue de haut en bas. Une réplique est un texte entre guillemets, suivie d'une virgule.

```js
VN.scene("reveil", [
    "Hm.",                                          // l'héroïne parle
    "(degoutee) C'est immonde.",                    // l'héroïne, avec un autre sprite
    "* Elle attrape le téléphone.",                 // de la narration (pas de nom, en italique)
    "Zacharias : Cinq appels, Inga."                // quelqu'un d'autre parle
]);
```

Les règles :

- **D'abord qui parle, puis l'humeur entre parenthèses, puis le texte.**
- Pas de nom : c'est l'héroïne (celle des réglages, `heroine`).
- `Nom :` ne marche que pour un personnage déclaré avec `VN.personnage`. Sinon le texte reste tel quel (« Dernier log : il y a un an. » est bien une phrase d'Inga).
- `(humeur)` ne marche que si ce sprite existe dans la fiche du personnage. Un autre personnage peut en avoir aussi : `"Zacharias : (agace) Bonsoir."`, à condition de lui donner des `sprites`.
- Un personnage sans sprite (une voix au téléphone) laisse l'héroïne à l'écran ; seul son portrait change dans la boîte.
- La narration s'écrit à la troisième personne, au présent.
- Un guillemet droit `"` à l'intérieur d'une réplique casserait le texte : utilise « » ou `'`.

### Les objets sur lesquels on reclique

Pour un objet du décor, la scène a deux parties :

```js
VN.scene("chaise", {
    premiere: [                       // le premier clic : tout le dialogue
        "Ma chaise.",
        "Je m'assois jamais dessus."
    ],
    ensuite: [                        // les clics suivants : UNE réplique à chaque fois, chacune son tour
        "Elle sert de stockage.",
        "Toujours là."
    ]
});
```

- `image: "objet.png"` (facultatif) montre l'objet en gros plan pendant qu'on en parle.
- Sans `ensuite`, la scène ne se joue **qu'une seule fois** (pratique pour une réaction).

---

## 4. Les commandes

Entre les répliques, on peut glisser des commandes, entre accolades :

| Commande | Effet |
|---|---|
| `{ note: "chatVu" }` | retient `chatVu` dans la mémoire |
| `{ oublie: "chatVu" }` | l'efface |
| `{ ajoute: "rats" }` | compte : 1, puis 2, puis 3… |
| `{ va: "autreScene" }` | quitte cette scène pour une autre (la suite de la liste n'est pas jouée) |
| `{ choix: { … } }` | des boutons (voir plus bas) |
| `{ image: "objet.png" }` | une image en gros plan ; `{ image: "aucune" }` l'enlève |
| `{ papier: "…" }` | une lettre à lire. Pour un texte de plusieurs lignes, remplace les guillemets par des accents graves : les retours à la ligne sont gardés (voir la lettre dans `nuit-1.js`) |
| `{ noir: "Plus tard." }` | écran noir avec un texte |
| `{ voile: true }` | assombrit le lieu, pour une scène où l'on ne joue pas ; `false` l'enlève |
| `{ lieu: "entree" }` | change de lieu |
| `{ attends: 800 }` | une pause, en millisecondes (1000 = une seconde) |
| `{ musique: "x.mp3" }` | change la musique ; `"aucune"` l'arrête |
| `{ son: "x.mp3" }` | joue un son une fois |
| `{ nuit: "suivante" }` | termine la nuit tout de suite |

### Les conditions

N'importe quelle commande peut commencer par `si` :

```js
{ si: "chatSorti", va: "lettre" }              // si chatSorti est noté
{ si: "!chatVu", va: "tasDegoutant" }          // si chatVu n'est PAS noté
{ si: ["chatVu", "!taie"], va: "taie" }        // si tout est vrai en même temps
{ si: (m) => m.rats >= 2, va: "nourrir" }      // pour compter ou comparer : m, c'est la mémoire
```

Une scène peut n'être qu'un **aiguillage** : la première condition vraie gagne.

```js
VN.scene("chat", [
    { si: "chatSorti", va: "lettre" },
    { si: (m) => m.rats >= 2, va: "nourrirLeChat" },
    { note: "chatVu" },
    { va: "chatCache" }                        // si rien d'autre n'a marché
]);
```

Pour quelques répliques seulement : `{ si: "taie", alors: [ "J'ai un sac." ], sinon: [ "Il me faut un sac." ] }`.

### Les choix

```js
{ choix: {
    "Répondre": [                    // une liste d'étapes écrite sur place…
        "Bon. J'écris.",
        { note: "aRepondu" }
    ],
    "Fermer l'onglet": "fermer"      // …ou le nom d'une autre scène
} }
```

Une fois le choix joué, la scène reprend juste après. Pour retenir ce qui a été choisi, mets un `{ note: … }` dans la branche.

### La mémoire

La mémoire est un simple carnet : des noms, notés ou non. Tu choisis les noms (`chatVu`, `lettreLue`…), sans espace ni accent, et tu les réutilises dans les `si`. Elle est gardée dans le navigateur du joueur.

Cinq noms sont réservés au moteur : `nuit`, `lieu`, `vues`, `debuts`, `fini`.

---

## 5. Les lieux et les objets

```js
VN.lieu("entree", {
    image: "1.png",
    voisins: { droite: "bureau" },            // les flèches : gauche, droite, haut, bas
    objets: {
        chaise: { zone: [361, 159, 456, 262], scene: "chaise" },
        pc1:    { zone: [439, 176, 582, 279], ecran: "pc1" },
        lettre: { zone: [700, 300, 860, 420], scene: "lettre", si: "chatSorti" }
    }
});
```

- `zone` : le coin haut-gauche et le coin bas-droit, en pixels de l'image. Mesure-les en mode atelier.
- `scene` ou `ecran` : ce que fait le clic.
- `si` (facultatif) : l'objet n'existe que quand la condition est vraie.
- Si deux zones se chevauchent, la dernière de la liste passe au-dessus.

---

## 6. Les nuits

Une nuit est un chapitre. Elles se jouent dans l'ordre de leur numéro ; après la dernière, c'est l'écran de fin.

```js
VN.nuit(1, {
    titre: "La nuit suivante.",        // facultatif : un texte sur écran noir, au début
    lieu: "bureau",                    // où elle commence (sinon on reste où l'on est)
    debut: "reveil",                   // facultatif : une scène jouée en arrivant
    objets: { chat: "cachetteVide", poster: false },   // facultatif : voir ci-dessous
    finQuand: ["chatSorti", "logEcrit"],               // le but de la nuit (une condition)
    fin: "aube"                        // la scène jouée quand le but est atteint
});
```

Deux sortes de nuits :

- **Une nuit où l'on se promène** : elle a un `finQuand`. Après chaque scène, le moteur regarde si le but est atteint ; si oui il joue `fin`, puis la nuit suivante commence.
- **Une nuit qui se déroule toute seule** : pas de `finQuand`. Sa scène `debut` enchaîne les autres avec `va`, et la dernière finit par `{ nuit: "suivante" }`.

`objets` change ce que font les objets **cette nuit-là seulement** : un nom de scène à la place de l'habituelle, ou `false` pour retirer l'objet. Ceux qu'on ne cite pas ne changent pas. C'est ce qui permet de faire vivre le même appartement plusieurs nuits sans nouvelle image.

---

## 7. Les écrans (les PC) et le pont

Un écran affiche une page HTML ordinaire, en grand, par-dessus le lieu.

```js
VN.ecran("pc1", {
    titre: "PC 1 · bureau",            // le texte de l'onglet
    page: "/ambiance/factions/",       // la page affichée
    enEteignant: "pc1"                 // facultatif : la scène jouée quand on éteint
});
```

Pour qu'une page d'écran parle à l'histoire, elle charge **le pont** :

```html
<script src="/ambiance/vn/pont.js"></script>
```

Elle peut alors :

| Dans la page | Effet |
|---|---|
| `Pont.joue("anarch")` | joue une scène de l'histoire (l'écran se cache, puis revient) |
| `Pont.note("logEcrit")` | note quelque chose dans la mémoire |
| `Pont.sait("chatSorti")` | lit la mémoire ; `Pont.sait("nuit")` donne le numéro de la nuit |

Et, **sans JavaScript**, montrer un morceau de page seulement à certains moments :

```html
<div class="post" data-nuit="2"> … </div>      <!-- visible à partir de la nuit 2 -->
<div class="post" data-nuit="2-3"> … </div>    <!-- de la nuit 2 à la nuit 3 -->
<div data-si="logEcrit"> … </div>              <!-- quand logEcrit est noté -->
<div data-si="!logEcrit"> … </div>             <!-- tant qu'il ne l'est pas -->
```

Une page ouverte toute seule (par un lien du site) marche aussi : elle montre tout, et `Pont.joue` ne fait rien.

---

## 8. Recettes

**Ajouter une réplique.** Ouvre le fichier de la nuit, trouve la scène, ajoute une ligne entre guillemets. N'oublie pas la virgule à la fin de la ligne précédente.

**Ajouter un objet cliquable.**
1. Mode atelier, Maj + glisser sur l'image : recopie la `zone`.
2. Dans `lieux.js`, ajoute l'objet au lieu : `carton: { zone: [ … ], scene: "carton" },`
3. Dans le fichier de la nuit, écris `VN.scene("carton", { premiere: [ … ], ensuite: [ … ] });`

**Faire réagir l'héroïne à ce qu'on fait sur un PC.**
1. Dans la page du PC : `Pont.joue("maReaction");` à l'endroit voulu.
2. Dans l'histoire : `VN.scene("maReaction", { premiere: [ … ] });` (une seule fois, puisqu'il n'y a pas d'`ensuite`).

**Ajouter un fil au forum ege-chan qui n'apparaît qu'à la nuit 2.** Dans `factions/navigateur/egechan-izm.js`, copie un bloc `<div class="post" …>` et ajoute-lui `data-nuit="2"`. Donne-lui un `id` qui n'existe pas encore.

**Ajouter une conversation au blog anarch.** Copie une des pages de `factions/ANARCH/`, change son contenu, puis ajoute son lien dans le menu de **chaque** page du dossier. Pour qu'elle n'apparaisse qu'à partir d'une nuit, mets `data-nuit="2"` sur ces liens.

**Ajouter un fichier sur le PC 2 (le terminal).** Dans `factions/terminal.html`, dans `disque`, copie la ligne d'un fichier existant (`"lisez-moi.txt"`). Pour qu'il n'apparaisse qu'à partir d'une nuit : `"note.txt": { nuit: 3, texte: "le texte" },`

**Ajouter une nuit.**
1. Copie `nuit-2.js` en `nuit-3.js`, change le numéro dans `VN.nuit(3, { … })` et le nom des scènes.
2. Dans `index.html`, ajoute `<script src="histoire/nuit-3.js"></script>` après la nuit 2.
3. Vérifie que la nuit d'avant se termine (un `finQuand`, ou `{ nuit: "suivante" }` à la fin de sa dernière scène).

**Rendre jouable une nuit qui se déroule toute seule.** Enlève le `{ voile: true }` et le `{ va: … }` à l'endroit où le joueur doit reprendre la main, puis donne à la nuit un `finQuand` et une scène `fin`.

---

## 9. Faire un autre visual novel

Le dossier `modele/` est une histoire minuscule qui utilise toutes les mécaniques. Elle se joue à `/ambiance/vn/modele/`.

1. Copie `src/ambiance/vn/modele/` vers `src/ambiance/mon-histoire/`.
2. Dans `histoire.js`, change `sauvegarde` (un nom par histoire, sinon elles partagent la même progression).
3. Remplace les lieux, les personnages, les scènes.
4. Dans `style.css`, change l'ambiance : couleurs, police, signe des objets. La liste des réglages est en haut de `vn.css`.

Le moteur reste à sa place : toutes les histoires utilisent le même. Une correction dans le moteur profite à toutes.

---

## 10. Comprendre le moteur

Tu n'as pas besoin de le lire pour écrire. Mais il est fait pour être lu : cinq fichiers courts, commentés, dans l'ordre.

| Fichier | Son rôle | À lire quand… |
|---|---|---|
| `moteur/1-histoire.js` | les six mots, la mémoire, les conditions | tu veux comprendre `note` et `si` |
| `moteur/2-affichage.js` | la boîte de dialogue, les sprites, le papier, l'écran noir | tu veux changer ce qu'on voit |
| `moteur/3-lieux.js` | les lieux, les zones, les écrans | tu veux comprendre les clics |
| `moteur/4-scenes.js` | le lecteur : joue les étapes, enchaîne les nuits | tu veux **ajouter une commande** |
| `moteur/5-atelier.js` | la vérification et le mode atelier | tu veux un nouvel outil de test |
| `vn.css` | la mise en forme | tu veux changer une taille, une place |
| `pont.js` | le lien entre une page d'écran et l'histoire | tu fais une nouvelle page de PC |

Le chemin d'un clic, pour s'y retrouver :

1. le joueur clique sur une zone → `VN.toucher` (`3-lieux.js`) regarde ce que fait cet objet ;
2. → `VN.joue("scene")` (`4-scenes.js`) met la scène dans la file ;
3. → `jouerScene` puis `jouerEtapes` lisent la liste : un texte part vers `VN.dire` (`2-affichage.js`), une commande vers `jouerCommande` ;
4. à la fin, `finirLaNuitSIlFaut` regarde si la nuit est terminée.

### Ajouter une commande

Tout se passe dans `jouerCommande` (`4-scenes.js`). Par exemple, pour une commande `{ tremble: true }` :

```js
if (etape.tremble) VN.el("scene").classList.add("tremble");
```

Puis ajoute `"tremble"` à la liste `MOTS_CONNUS` de `5-atelier.js` (sinon la vérification la signalera), et le style `.tremble` dans le `style.css` de l'histoire.

### Un programme sur deux semaines

| Jours | Objectif |
|---|---|
| 1 à 2 | Jouer en mode atelier. Changer des répliques dans `nuit-1.js`. Provoquer exprès une erreur (enlever une virgule) et lire le bandeau. |
| 3 à 4 | Ajouter un objet cliquable avec sa scène `premiere` / `ensuite`. |
| 5 à 6 | Écrire un aiguillage avec `note` et `si`. Relire la quête du chat dans `nuit-1.js`. |
| 7 à 8 | Écrire une scène avec un `choix` et un `papier`. Jouer l'histoire du dossier `modele`. |
| 9 à 10 | Ajouter une nuit. Rebrancher des objets avec `objets`. |
| 11 à 12 | Ajouter un contenu daté sur un PC (`data-nuit`), et une réaction avec `Pont.joue`. |
| 13 à 14 | Lire `4-scenes.js` en entier, puis ajouter une petite commande à soi. |
