# La chambre d'Inga : mode d'emploi

Un petit point and click : deux pièces, deux ordinateurs, et une histoire qui se joue nuit après nuit.
Pour écrire la suite, on n'a besoin que de **fichiers texte** et d'un peu de **HTML**.

## Où est quoi

| Fichier | Ce qu'il contient | On y touche ? |
|---|---|---|
| `histoire/nuit-1.txt`, `nuit-2.txt`… | tout ce qui se dit et se passe, nuit par nuit | **oui, c'est là qu'on écrit** |
| `index.html` | les pièces (zones cliquables) et les ordinateurs (leurs fichiers) | oui, pour ajouter une zone ou une page de PC |
| `personnages.js` | les portraits et les sprites | oui, pour ajouter un personnage |
| `pc/` | les pages qui s'affichent sur les écrans | oui, pour ajouter une page de PC |
| `img/`, `son/` | les images et la musique | oui |
| `moteur.js` | le moteur | non, normalement jamais |
| `style.css` | l'apparence | si on veut changer le look |

Les pages Anarch et Sabbat ne sont pas ici : elles sont restées dans `/ambiance/factions/`.


## Écrire une nuit

Un fichier de nuit est une suite de **blocs**. Un bloc commence par `== nom ==`.

```
== chat ==
[image img/objets/chat.webp]
Inga : Le chat blanc. T'es toujours en vie, toi ?
Inga (dégoûtée) : Tu me regardes comme si j'allais te bouffer.
* Le chat ne bouge pas.
[donne chat_vu]
--- ensuite ---
Inga : Il veut pas sortir. Je le comprends.
--- ensuite ---
Inga : Psst. Le chat. … Ouais, non.
```

| On écrit | Ça donne |
|---|---|
| `Inga : texte` | une bulle d'Inga (son nom et son portrait) |
| `Inga (dégoûtée) : texte` | avec le sprite « dégoûtée » (voir `personnages.js`) |
| `Zacharias : texte` | quelqu'un d'autre parle |
| `* texte` | de la narration : en italique, sans nom |
| `--- ensuite ---` | sépare le **premier clic** des **clics suivants** (ceux-là tournent en boucle) |
| `// texte` | un commentaire : le jeu l'ignore |

**Les actions**, entre crochets :

| On écrit | Ça fait |
|---|---|
| `[donne taie]` | Inga obtient le drapeau `taie` (un drapeau = quelque chose qu'elle a fait ou vu) |
| `[image adresse]` | un objet en gros plan, le temps du dialogue |
| `[document histoire/lettre.txt]` | une feuille en plein écran (un clic pour la reposer) |
| `[téléphone]` / `[raccroche]` | montre / cache le téléphone |
| `[noir La nuit suivante.]` | écran noir avec un texte, puis on revient |
| `[pièce chambre]` | va dans une pièce (et éteint le PC s'il est allumé) |
| `[nuit suivante]` | passe à la nuit suivante, à la fin du bloc |

### Les conditions

Un bloc peut avoir **plusieurs versions**, selon ce qu'Inga a déjà fait :

```
== tas ==                          ← au début
== tas si chat_vu ==               ← une fois qu'elle a vu le chat
== tas si taie ==                  ← une fois qu'elle a la taie
== oreillers si chat_vu, pas taie ==   ← plusieurs conditions, « pas » pour l'inverse
```

**La règle : c'est la version la plus BASSE dans le fichier (dont les conditions sont remplies) qui est jouée.**
Donc on écrit les versions dans l'ordre de l'histoire, et tout se passe bien.

### Les blocs spéciaux

| Bloc | Quand il se joue |
|---|---|
| `== début ==` | tout seul, au début de la nuit |
| `== fin de nuit si a, b, c ==` | tout seul, dès que `a`, `b` et `c` sont acquis. Il finit en général par `[nuit suivante]` |
| `== pc1 ==` | quand on éteint le PC 1 (même chose pour `pc2`) |
| `== vu steam-chat ==` | la première fois de la nuit que la page `steam-chat.html` s'affiche sur un PC |

Chaque page affichée sur un PC donne aussi le drapeau `vu <nom du fichier>` : `vu steam-chat`, `vu log-04`, `vu vermine-fin`…
On peut s'en servir dans les conditions, par exemple : `== fin de nuit si lettre, vu log-04 ==`.

Les drapeaux restent d'une nuit à l'autre. Les « premiers clics », eux, repartent de zéro à chaque nuit.


## Recettes

### Ajouter une réplique
Ouvrir `histoire/nuit-1.txt`, trouver le bloc, ajouter une ligne `Inga : …`. C'est tout.

### Ajouter un objet cliquable
1. Dans `index.html`, dans la bonne pièce, copier une ligne `<button class="zone" …>` et changer `data-nom` et les coordonnées.
   Pour trouver les coordonnées : ouvrir `/ambiance/inga/#zones`, cliquer sur l'image : elles s'affichent en bas à gauche.
2. Dans le fichier de la nuit, écrire un bloc `== le-nom ==`.

Une zone n'apparaît que si la nuit a un bloc à son nom : une nuit où l'objet n'a rien à dire, il n'y a pas d'étoile.

### Ajouter une page sur un PC
1. Mettre le fichier dans `pc/` : une page `.html`, un texte `.txt`, ou une image `.webp` / `.png` / `.jpg`.
2. Dans `index.html`, dans le bon ordinateur, ajouter un lien :
   ```html
   <a href="pc/rapport.txt" data-titre="rapport.txt">rapport.txt</a>
   ```
   Sur le PC 1, on copie plutôt une icône entière (`<a>` avec son `<img>` et son `<span>`).
3. Facultatif : `data-si="lettre"` pour qu'il n'apparaisse qu'une fois la lettre trouvée (`data-si="pas lettre"` pour l'inverse).
4. Facultatif : une réaction d'Inga, avec un bloc `== vu rapport ==` dans le fichier de la nuit.

Une page `.html` est une page web normale : ses liens vers d'autres pages de `pc/` marchent tout seuls,
et chaque page atteinte compte comme « vue ». Elle n'a besoin d'aucun code pour faire réagir Inga.
Donne à chaque fichier un nom unique, puisque c'est son nom qui sert pour les drapeaux.

### Ajouter un personnage
Dans `personnages.js`, ajouter une ligne dans `PORTRAITS` (et dans `SPRITES` s'il a une grande image).
Ensuite, `Nebetta : …` marche dans les fichiers d'histoire.

### Ajouter une nuit
1. Créer `histoire/nuit-3.txt` avec un bloc `== début ==`, des blocs pour les objets, et un `== fin de nuit si … ==` qui finit par `[nuit suivante]`.
2. Dans `nuit-2.txt`, la dernière ligne est `[nuit suivante]` : elle mène maintenant à la nuit 3.

Tant qu'une nuit n'existe pas, le jeu affiche « FIN — pour l'instant ».
Les joueurs qui y sont arrivés reprendront directement à la nouvelle nuit à leur prochaine visite.


## Tester

Ajouter à la fin de l'adresse :

| Adresse | Effet |
|---|---|
| `/ambiance/inga/#recommencer` | efface la partie |
| `/ambiance/inga/#nuit-2` | commence directement à la nuit 2 (sans aucun drapeau) |
| `/ambiance/inga/#zones` | montre les zones cliquables, et les coordonnées d'un clic sur l'image |

Une faute dans un fichier d'histoire (un personnage mal écrit, une action inconnue) s'affiche **en rouge en haut de l'écran**,
avec le nom du fichier et le numéro de la ligne.

À la fin du jeu, la console du navigateur affiche une erreur 404 pour `nuit-3.txt` : c'est normal,
c'est comme ça que le jeu sait qu'il n'y a pas encore de nuit 3.


## Les drapeaux de la nuit 1

| Drapeau | Quand |
|---|---|
| `chat_vu` | premier clic sur le chat |
| `taie` | la taie prise dans les oreillers |
| `rat1`, `rats` | le premier rat, puis le deuxième |
| `lettre` | le chat nourri, la lettre trouvée |
| `pc2 ouvert` | le mot de passe du PC 2 trouvé |
| `vu …` | chaque page ouverte sur un PC |

La nuit 1 se termine avec `lettre`, `vu log-04` (le log écrit sur le PC 2) et `vu vermine-fin` (le bout de l'espace membres setite).


## À faire un jour : les images hébergées ailleurs

Ces images viennent encore d'autres sites. Le jour où un de ces sites les supprime, elles disparaissent du jeu.
Pour les garder pour de bon : les télécharger dans `img/` (ou `pc/`), puis remplacer l'adresse.

- le portrait d'Inga : `personnages.js`
- le chat et le poster en gros plan : `histoire/nuit-1.txt` (`[image …]`)
- le fond d'écran et les icônes Steam, osu!, Isaac, WoW : `index.html` (le PC 1)
- les jeux, les avatars et les amis du profil : `pc/steam.html` et `pc/steam-chat.html`
  (l'avatar de « nekogirl13 » est déjà cassé : son adresse est incomplète)
