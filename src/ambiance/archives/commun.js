// CE QUI SERT AUX DEUX PAGES (la salle et le classeur) :
//   construireClasseur(element, classeur, cliquer) : l'image d'un classeur, et ses trois tiroirs par-dessus
//   dire(texte, image)       : la boîte de dialogue, en bas, et l'objet en grand au-dessus
//   ouvrirPdf(nom), ouvrirImage(noms) : un document par-dessus la page
//   la lumière qui vacille, de temps en temps

// LES TROIS TIROIRS DE L'IMAGE img/classeur.png : leur haut et leur hauteur, en % de l'image.
// Chaque tiroir a sa propre image (img/tiroir-1.png…), pour pouvoir s'avancer seul.
const TIROIRS = [
	{ haut: 2.98, hauteur: 26.96 },
	{ haut: 32.93, hauteur: 27.62 },
	{ haut: 64.53, hauteur: 26.96 },
];

// pour écrire un texte dans la page sans risque
function echapper(texte) {
	return String(texte ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// UN CLASSEUR : l'image du meuble, et ses trois tiroirs, chacun avec son étiquette.
// cliquer(numéro du tiroir) : ce qui se passe quand on clique sur un tiroir.
// Sans « cliquer », les tiroirs ne sont que du décor : on ne peut pas cliquer dessus.
function construireClasseur(element, classeur, cliquer) {
	element.classList.add("classeur");
	element.innerHTML = `<img src="img/classeur.png" alt="">`;
	classeur.tiroirs.forEach((tiroir, i) => {
		if (!TIROIRS[i]) return;
		const bouton = document.createElement(cliquer ? "button" : "span");
		bouton.className = "tiroir";
		if (cliquer) bouton.title = `${classeur.nom} · ${tiroir.etiquette}`;
		bouton.style.top = TIROIRS[i].haut + "%";
		bouton.style.height = TIROIRS[i].hauteur + "%";
		bouton.innerHTML = `<img src="img/tiroir-${i + 1}.png" alt=""><span class="etiquette">${echapper(tiroir.etiquette)}</span>`;
		if (cliquer) bouton.onclick = () => cliquer(i);
		element.append(bouton);
	});
}


/* =========================
   LA BOÎTE DE DIALOGUE, et l'objet en grand le temps du dialogue
========================= */

function dire(texte, image) {
	let boite = document.getElementById("dialogue");
	if (!boite) {
		document.body.insertAdjacentHTML("beforeend", `
			<div id="voile" hidden></div>
			<img id="gros-plan" alt="" hidden>
			<div id="dialogue" hidden></div>`);
		boite = document.getElementById("dialogue");
		boite.onclick = fermerDialogue;
		document.getElementById("voile").onclick = fermerDialogue;
	}
	const grosPlan = document.getElementById("gros-plan");
	grosPlan.hidden = !image;
	if (image) grosPlan.src = image;
	document.getElementById("voile").hidden = false;
	boite.textContent = texte;
	boite.hidden = false;
}

function fermerDialogue() {
	["voile", "gros-plan", "dialogue"].forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.hidden = true;
	});
}


/* =========================
   UN DOCUMENT PAR-DESSUS LA PAGE : un PDF, ou une image
========================= */

function fenetre() {
	let boite = document.getElementById("fenetre");
	if (!boite) {
		boite = document.createElement("dialog");
		boite.id = "fenetre";
		boite.addEventListener("click", (e) => {
			if (e.target === boite) boite.close();
		});
		document.body.append(boite);
	}
	return boite;
}

function ouvrirPdf(nom) {
	const boite = fenetre();
	boite.className = "pdf";
	boite.onclick = null;
	boite.innerHTML = `<button class="fermer">fermer</button><iframe src="lecteur.html?pdf=docs/${encodeURIComponent(nom)}"></iframe>`;
	boite.querySelector(".fermer").onclick = () => boite.close();
	boite.showModal();
}

// une image, ou plusieurs côte à côte (noms : un nom, ou une liste de noms)
function ouvrirImage(noms) {
	const liste = [].concat(noms);
	const boite = fenetre();
	boite.className = "image";
	boite.style.setProperty("--nombre", liste.length);
	boite.innerHTML = liste.map((nom) => `<img src="enluminures/${echapper(nom)}" alt="">`).join("");
	boite.onclick = () => boite.close();
	boite.showModal();
}

// Échap ferme aussi la boîte de dialogue
addEventListener("keydown", (e) => {
	if (e.key === "Escape") fermerDialogue();
});


/* =========================
   LA LUMIÈRE QUI VACILLE : toutes les 6 à 14 secondes, elle baisse un instant, deux fois
   (pas si l'ordinateur demande moins d'animations)
========================= */

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
	const ombre = document.createElement("div");
	ombre.id = "vacillement";
	document.body.append(ombre);
	const ETAPES = [0.35, 0, 0.2, 0]; // l'ombre à chaque étape : 0 = lumière normale
	(function vaciller() {
		let temps = 0;
		for (const obscurite of ETAPES) {
			setTimeout(() => (ombre.style.opacity = obscurite), temps);
			temps += 60 + Math.random() * 40;
		}
		setTimeout(vaciller, 6000 + Math.random() * 8000);
	})();
}
