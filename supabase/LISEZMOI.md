# Supabase : la partie « dynamique » du site

Presque tout le site est fait de pages fixes. Seuls l'espace joueur (calendrier, coffre-fort, signalements, badges)
et l'Elysium parlent à une base de données, chez Supabase.

La connexion est faite dans `src/js/connexion.js` (l'adresse du projet et sa clé publique). Cette clé est faite pour être
visible : ce qui protège les données, ce sont les règles de sécurité (« RLS ») écrites dans `izmir.sql`.

## Ce qu'il y a dans ce dossier

- `izmir.sql` : les règles de sécurité, les fonctions, et les tables `tickets` (signalements) et `handouts` (coffre-fort).
  Après une modification, relance-le en entier dans Supabase (SQL Editor).
- `functions/ticket-mail/` : la petite fonction qui t'envoie un mail à chaque signalement (explications en haut du fichier).

## Ce qui manque encore ici

Une partie de la base a été créée directement dans le tableau de bord de Supabase et n'est écrite nulle part ailleurs :

- la table `Calendar` (le site utilise ses colonnes `id`, `titre`, `date`, `desc`, `permissions`, `image`, `author`, `author_name`) ;
- la table `profiles` (`user_id`, `username`, `clan`, `role`, `extra_tags`, `is_admin`, `badges`) ;
- la fonction `get_daily_conversation_data` (les dialogues de Nebetta dans l'Elysium).

Si le projet Supabase disparaissait, on ne pourrait donc pas tout recréer à partir de ce dossier. Pour l'éviter, recopie
leur définition dans un fichier `supabase/tables.sql` :

1. Table Editor → ouvre la table → vue « Definition » : c'est le code SQL qui crée la table. Copie-le.
2. Database → Functions → `get_daily_conversation_data` : copie sa définition.

(Avec l'outil en ligne de commande de Supabase, la commande `supabase db pull` fait la même chose en une fois.)

## Les images du calendrier

Les images de la galerie gardent leurs anciennes adresses (`/GALLERIE/web/dessin/…` et `/GALLERIE/thumbs/dessin/…`),
donc les images déjà choisies pour des événements du calendrier continuent de s'afficher.
Seule exception : une image qui pointait vers l'original d'un dessin (`/GALLERIE/dessin/….png`). Les originaux ne sont plus
publiés ; sur Netlify et Cloudflare Pages, le fichier `src/_redirects` envoie ces adresses vers la version web du dessin.
Ailleurs, remplace l'adresse dans Supabase par la version web (même chemin, avec `web/` et `.webp`).
