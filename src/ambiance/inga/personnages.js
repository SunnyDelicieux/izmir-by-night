/* =========================================================
   LES PERSONNAGES

   Pour faire parler quelqu'un dans un fichier d'histoire (« Zacharias : … »),
   son nom doit être dans PORTRAITS. Sinon, la ligne est signalée en rouge.
   ========================================================= */


// Le portrait : la petite image carrée à gauche de la boîte de dialogue.
// Un personnage sans image : mettre "" (seul son nom s'affiche).
const PORTRAITS = {
    "Inga": "https://i.postimg.cc/Zn8ZdS2Q/image-2026-09-03-100531968.png",
    "Zacharias": "/img/wiki/tremere/zacharias.png",
    "Le Cercle": ""
};


// Le sprite : la grande image qui apparaît à gauche quand le personnage parle.
// Une ligne par humeur, écrite exactement comme dans les fichiers d'histoire :
//   « Inga : … »             utilise "Inga"
//   « Inga (dégoûtée) : … »  utilise "Inga (dégoûtée)"
// Un personnage qui n'a pas de sprite (Zacharias, au téléphone) laisse celui d'Inga affiché.
const SPRITES = {
    "Inga": "img/inga.webp",
    "Inga (dégoûtée)": "img/inga-degoutee.webp"
};
