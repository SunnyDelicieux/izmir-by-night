"""Vérifie que chaque lien et chaque image du site mène à un fichier qui existe.

    npm run build
    python3 scripts/verifier_liens.py

Il lit le site construit (dossier _site) et liste les adresses introuvables,
avec les pages où elles apparaissent. Les liens vers d'autres sites ne sont pas vérifiés,
ni les archives (gardées telles quelles, avec leurs vieux liens cassés).
"""

import posixpath
import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlsplit

SITE = Path(sys.argv[1] if len(sys.argv) > 1 else "_site")
if not SITE.is_dir():
    sys.exit(f"Le dossier {SITE} n'existe pas : lance d'abord « npm run build ».")

ATTRIBUT = re.compile(r"""\s(?:href|src|poster|data-halloween)\s*=\s*(["'])(.*?)\1""", re.I | re.S)
URL_CSS = re.compile(r"""url\(\s*(['"]?)([^'")]*)\1\s*\)""", re.I)


def existe(chemin):
    fichier = SITE / unquote(chemin).lstrip("/")
    if chemin.endswith("/"):
        return (fichier / "index.html").is_file()
    return fichier.is_file() or (fichier / "index.html").is_file() or Path(f"{fichier}.html").is_file()


introuvables = defaultdict(set)
for fichier in sorted(SITE.rglob("*")):
    if fichier.suffix not in (".html", ".css") or {"pagefind", "archives"} & set(fichier.relative_to(SITE).parts):
        continue
    page = "/" + fichier.relative_to(SITE).as_posix()
    texte = fichier.read_text(encoding="utf-8", errors="replace")
    if fichier.suffix == ".html":
        texte = re.sub(r"<!--.*?-->", "", texte, flags=re.S)
        texte = re.sub(r"(<script\b[^>]*>).*?</script>", r"\1", texte, flags=re.S | re.I)
    texte = re.sub(r"/\*.*?\*/", "", texte, flags=re.S)  # commentaires CSS
    texte = re.sub(r"""(["'])data:.*?\1""", "", texte, flags=re.S)  # images intégrées (data:…)
    liens = [m.group(2) for m in ATTRIBUT.finditer(texte)] + [m.group(2) for m in URL_CSS.finditer(texte)]
    for lien in liens:
        lien = lien.strip()
        parties = urlsplit(lien)
        if not parties.path or parties.scheme or lien.startswith("//") or "${" in lien:
            continue  # ancre seule, autre site, mailto:, data:…
        chemin = parties.path
        if not chemin.startswith("/"):
            fin = "/" if chemin.endswith("/") else ""
            chemin = posixpath.normpath(posixpath.join(posixpath.dirname(page), chemin)) + fin
        if not existe(chemin):
            introuvables[chemin].add(page)

if not introuvables:
    print("Aucun lien cassé.")
for chemin, pages in sorted(introuvables.items()):
    liste = ", ".join(sorted(pages)[:3]) + (" …" if len(pages) > 3 else "")
    print(f"introuvable : {chemin}  (dans {liste})")
