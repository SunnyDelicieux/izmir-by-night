(function () {
  const LARGEUR_PAGE = 1600; 
  const COTE_MAX = 2000; 
  const QUALITE = 0.82;

  async function compresser(canvas) {
    const webp = await new Promise((ok) => canvas.toBlob(ok, "image/webp", QUALITE));
    if (webp && webp.type === "image/webp") return webp;
    const fond = document.createElement("canvas");
    fond.width = canvas.width;
    fond.height = canvas.height;
    const ctx = fond.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, fond.width, fond.height);
    ctx.drawImage(canvas, 0, 0);
    return new Promise((ok) => fond.toBlob(ok, "image/jpeg", QUALITE));
  }

  async function pageEnImage(doc, num) {
    const page = await doc.getPage(num);
    const largeur = page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale: Math.min(4, LARGEUR_PAGE / largeur) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return compresser(canvas);
  }

  async function imageAllegee(fichier) {
    if (/gif/i.test(fichier.type)) return fichier; // un gif peut être animé : on n'y touche pas
    const image = await createImageBitmap(fichier);
    const echelle = Math.min(1, COTE_MAX / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * echelle);
    canvas.height = Math.round(image.height * echelle);
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    image.close();
    const leger = await compresser(canvas);
    return leger && leger.size < fichier.size ? leger : fichier;
  }

  const EXTENSIONS = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png", "image/gif": "gif", "application/pdf": "pdf" };
  const extension = (fichier) => EXTENSIONS[fichier.type] || "bin";

  window.izmirAlleger = { pageEnImage, imageAllegee, extension };
})();
