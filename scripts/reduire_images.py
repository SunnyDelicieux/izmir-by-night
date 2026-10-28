"""Prépare des dessins pour la galerie, pour garder le dépôt léger.

    python3 scripts/reduire_images.py DOSSIER_DES_ORIGINAUX DOSSIER_DE_LA_GALERIE

Exemple : python3 scripts/reduire_images.py ~/Dessins/octobre sun

Chaque image (png, jpg, webp) du premier dossier est enregistrée en .webp, 2000 px au maximum,
dans src/galerie/dessins/sun/. Les originaux ne sont pas modifiés : garde-les sur ton ordinateur ou ton Drive.
Le script affiche ensuite les lignes à coller dans src/_data/galerie.yaml.

Ce script est facultatif : le site sait aussi réduire une image trop grande tout seul,
mais le dépôt grossit alors de tout le poids de l'original.

Il a besoin de Pillow : pip install pillow
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

if len(sys.argv) != 3:
    sys.exit(__doc__)

originaux = Path(sys.argv[1]).expanduser()
dossier = sys.argv[2]
destination = Path("src/galerie/dessins") / dossier
destination.mkdir(parents=True, exist_ok=True)

nouveaux = []
for fichier in sorted(originaux.iterdir()):
    if fichier.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
        continue
    image = ImageOps.exif_transpose(Image.open(fichier))
    image.thumbnail((2000, 2000))
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGBA")
    sortie = destination / (fichier.stem + ".webp")
    image.save(sortie, "WEBP", quality=85, method=6)
    nouveaux.append(f"{dossier}/{sortie.name}")
    print("ok", sortie)

if nouveaux:
    print("\nÀ coller dans src/_data/galerie.yaml (puis complète alt, tags et desc) :\n")
    for src in nouveaux:
        print(f"- src: {src}\n  alt: \n  tags: [sunny]\n  desc: ")
