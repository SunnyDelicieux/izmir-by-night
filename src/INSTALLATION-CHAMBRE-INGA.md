# La chambre d'Inga, version simplifiée : installation

## Installer

1. **Décompresser le zip à la racine du site** (là où il y a `package.json`), et accepter de remplacer les fichiers.
2. **Supprimer l'ancienne version** (un zip ne peut pas supprimer de fichiers) :
   ```
   node supprimer-ancienne-chambre-inga.mjs
   ```
   Le script supprime les 33 anciens fichiers, puis se supprime lui-même.
   Si tu préfères le faire à la main, la liste est écrite en haut du script.
3. **Tester** : `npm run dev`, puis ouvrir `/ambiance/inga/#recommencer`.

Ce fichier peut être supprimé ensuite.

## Ce que contient le zip

- `src/ambiance/inga/` : toute la nouvelle chambre (le jeu, les deux PC, le site setite).
  Le mode d'emploi pour écrire la suite est dans `src/ambiance/inga/LISEZMOI.md`.
- `src/_data/redirections.yaml` : les anciennes adresses (`/ambiance/factions/`, `inga2.html`, l'ancien Steam,
  vermine.html…) renvoient vers les nouvelles. Le lien de la page d'accueil vers `/ambiance/factions/` continue donc de marcher.

Les blogs **Anarch** (`src/ambiance/factions/ANARCH/`) et **Sabbat** (`src/ambiance/factions/sabbat/`) n'ont pas été touchés.
Les PC les ouvrent toujours à leur adresse habituelle.

## Ce qui a changé

| Avant | Maintenant |
|---|---|
| 2 pages pour les 2 pièces, dans une iframe, qui se passaient la progression | 1 seule page (`index.html`) |
| `dialogues.js` + `room.js` + `quete.js` (la quête répartie dans 3 fichiers) | `histoire/nuit-1.txt` : les répliques **et** la quête, écrites comme un script de théâtre |
| la « nuit suivante » codée en dur dans `quete.js` | `histoire/nuit-2.txt`, le modèle pour écrire les nuits suivantes |
| PC 1 : bureau avec fenêtres déplaçables (jQuery + jQuery UI) | des icônes en HTML, une fenêtre à la fois, aucune bibliothèque |
| PC 2 : un faux PowerShell (`cd`, `ls`, `cat`, Tab, historique…) | la liste des fichiers en vert sur noir, le même mot de passe |
| le faux Chrome : un moteur de navigateur (routes, historique, recherches) | 7 pages HTML normales reliées par des liens |
| Steam : le chat dans le profil, avec ses réponses toutes faites et l'échange spécial « zacharias » | la même chose, sur sa propre page (`pc/steam-chat.html`), en JS simple |
| vermine-cercle : un moteur de conversation à choix | une page HTML avec ses deux réponses, puis la page de l'œil (`vermine-fin.html`) |
| le PDF caché, avec pdf.js et un zoom à la molette | une image (`pc/document.webp`) |
| le compteur « rats : 1 / 2 », le livre d'or qui change, le compteur de visites | retirés |
| les pages des PC appelaient la chambre (`chambreDInga()`, copiée dans 4 fichiers) | le jeu voit tout seul quelle page s'affiche ; une seule page (le chat Steam) le prévient elle-même, en une ligne |
| l'écran des PC, à la taille fixe 1200 × 820, mis à l'échelle | pareil : 1200 × 800, mis à l'échelle sans déformation ; il s'efface quand Inga parle |
| 1.png, 2.png, telephone.png : 4,5 Mo | en WebP : 0,7 Mo |

Toutes les répliques ont été gardées. Les petites retouches de texte :
- le log du PC 2 ne s'écrit plus lettre par lettre : une ligne de narration le remplace (« Elle tape le log d'une traite, sans se relire. ») ;
- la réaction d'Inga au site setite arrive sur la page de l'œil, à la fin de l'espace membres.

## À savoir

- La conversation du Cercle (`pc/vermine-cercle.html`) contient toujours les **placeholders** d'origine
  (« [ placeholder : la conversation du Cercle s'écrira ici ] »). Elle s'écrit maintenant directement dans le HTML.
- Une trentaine d'images viennent encore d'autres sites (le portrait d'Inga, le fond du PC 1, le profil Steam…).
  Elles marchent, mais disparaîtront si ces sites les suppriment. La liste est à la fin du `LISEZMOI.md`.
- Les anciennes parties sauvegardées dans les navigateurs ne sont pas reprises : tout le monde recommence à la nuit 1.
