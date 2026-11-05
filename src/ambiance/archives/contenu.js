// CE QUI EST RANGÉ DANS LES ARCHIVES.
//
// Les classeurs, de gauche à droite dans la salle. Chacun a trois tiroirs, de haut en bas.
// Avec « decor: true », un classeur reste dans la salle, mais on ne peut pas l'ouvrir.
// Un tiroir : son étiquette, et ses dossiers (le premier de la liste est rangé tout au fond).
// Un dossier : l'image de sa chemise (dans chemises/), et ce qu'il ouvre :
//   pdf: "mon-document.pdf"   (rangé dans docs/)
//   image: "mon-dessin.webp"  (rangée dans img/)
// Sur une chemise vierge (voir plus bas), on ajoute son nom : nom: "Mon dossier"
// (le site l'écrit en majuscules sur l'onglet ; au-delà d'une quinzaine de lettres, il dépasse).
//
// Atratinus #010 ouvre encore le PDF d'exemple.

const CLASSEURS = [
	{
		nom: "Histoire antique",
		tiroirs: [
			{
				etiquette: "A — F",
				dossiers: [
					{ chemise: "atratinus-009.webp", pdf: "une-legende-vetue-de-noir.pdf" },
					{ chemise: "atratinus-010.webp", pdf: "exemple.pdf" },
				],
			},
			{
				etiquette: "G — O",
				dossiers: [
					{ chemise: "vierge-bleue.webp", nom: "L'infernalisme", pdf: "l-infernalisme-a-smyrne.pdf" },
					{ chemise: "marcus-forain.webp", pdf: "marcus-forain.pdf" },
				],
			},
			{
				etiquette: "P — Z",
				dossiers: [
					{ chemise: "vierge-peche.webp", nom: "Shahar", pdf: "shahar-de-l-aube.pdf" },
					{ chemise: "soteria-012.webp", pdf: "les-fruits-du-jardin.pdf" },
				],
			},
		],
	},
	{
		nom: "Histoire des clans",
		tiroirs: [
			{ etiquette: "A — F", dossiers: [] },
			{
				etiquette: "G — O",
				dossiers: [
					{ chemise: "vierge-peche.webp", nom: "Mythes de Smyrne", pdf: "mythes-de-smyrne.pdf" },
				],
			},
			{
				etiquette: "Autre",
				dossiers: [
					{ chemise: "vierge-rose.webp", nom: "Lettre de tribut", pdf: "lettre-de-tribut-de-turkestan.pdf" },
				],
			},
		],
	},
	{
		nom: "Histoire moderne",
		decor: true, // pour l'instant, ce classeur n'est que du décor : on ne peut pas l'ouvrir
		tiroirs: [
			{ etiquette: "A — F", dossiers: [] },
			{ etiquette: "G — O", dossiers: [] },
			{ etiquette: "P — Z", dossiers: [] },
		],
	},
];

// LES CHEMISES VIERGES : des copies de chemises dont on a effacé le nom.
// Pour chacune, où écrire le nom : le milieu de son onglet [à gauche, en haut], en % de l'image.
const CHEMISES_VIERGES = {
	"vierge-bleue.webp": [64, 16.4],
	"vierge-peche.webp": [48.6, 15.9],
	"vierge-rose.webp": [73.9, 15.2],
};
