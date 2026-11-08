const CLASSEURS = [
  {
    nom: "Origines",
    tiroirs: [
      {
        etiquette: "Le Jardin",
        dossiers: [
          {
            chemise: "vierge-rose.webp",
            nom: "Le Prophète",
            pdf: "le-prophete.pdf",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Origines de Soteria",
            pdf: "origines-de-soteria.pdf",
          },
          {
            chemise: "vierge-bleue.webp",
            nom: "Paroles de Soteria",
            pdf: "paroles-de-soteria.pdf",
          },
          { chemise: "soteria-012.webp", pdf: "les-fruits-du-jardin.pdf" },
          {
            chemise: "vierge-peche.webp",
            nom: "Enluminure de Soteria",
            image: "soteria-et-atratinus.webp",
          },
        ],
      },
      {
        etiquette: "Atratinus",
        dossiers: [
          {
            chemise: "atratinus-009.webp",
            pdf: "une-legende-vetue-de-noir.pdf",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure des cavaliers",
            images: [
              "cavalier-conquerant.webp",
              "cavalier-atratinus.webp",
              "cavalier-kushi.webp",
            ],
          },
        ],
      },
      {
        etiquette: "Travaux de recherche",
        dossiers: [
          {
            chemise: "vierge-peche.webp",
            nom: "Mythes de Smyrne",
            pdf: "mythes-de-smyrne.pdf",
          },
          {
            chemise: "vierge-bleue.webp",
            nom: "L'infernalisme",
            pdf: "l-infernalisme-a-smyrne.pdf",
          },
        ],
      },
    ],
  },
  {
    nom: "Age moderne",
    tiroirs: [
      {
        etiquette: "Kushi",
        dossiers: [
          {
            chemise: "vierge-rose.webp",
            nom: "Lettre de tribut",
            pdf: "lettre-de-tribut-de-turkestan.pdf",
          },
          {
            chemise: "vierge-peche.webp",
            nom: "Lettre de tolède",
            pdf: "tolede.pdf",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "La peau de lupin",
            pdf: "peau-de-lupin.pdf",
          },
        ],
      },
      {
        etiquette: "La décennie des pleurs",
        dossiers: [
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure d'Eudokia",
            image: "mort-d-eudokia.webp",
          },
            {
            chemise: "vierge-bleue.webp",
            nom: "Procès d'Eudokia la Séditieuse.",
            pdf: "procés-eudokia.pdf",
          },
          {
            chemise: "vierge-peche.webp",
            nom: "Shahar",
            pdf: "shahar-de-l-aube.pdf",
          },
        ],
      },
      {
        etiquette: "Sabbat",
        dossiers: [
          { chemise: "marcus-forain.webp", pdf: "marcus-forain.pdf" },
          {
            chemise: "vierge-bleue.webp",
            nom: "Enluminure de Marcus Forain",
            image: "marcus-forain.webp",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure du Sabbat",
            image: "sabbat.webp",
          },
        ],
      },
    ],
  },
  {
    nom: "Les clans",
    tiroirs: [
      {
        etiquette: "La cour",
        dossiers: [
          {
            chemise: "vierge-rose.webp",
            nom: "Enluminure des Primogènes",
            image: "primogene.webp",
          },
		    {
            chemise: "vierge-bleue.webp",
            nom: "Charites d'Izmir",
            pdf: "les-charites-d-izmir.pdf",
          },
        ],
      },
      {
        etiquette: "Les clans",
        dossiers: [
          {
            chemise: "vierge-bleue.webp",
            nom: "Enluminure de la lignée Tremere",
            image: "lignee-tremere.webp",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure des sigils",
            images: ["sigils-brujah.webp", "sigils-tremere.webp"],
          },
        ],
      },
      { etiquette: "À trier", dossiers: [] },
    ],
  },
];

const CHEMISES_VIERGES = {
  "vierge-bleue.webp": [64, 16.4],
  "vierge-peche.webp": [48.6, 15.9],
  "vierge-rose.webp": [73.9, 15.2],
  "vierge-rose-gauche.webp": [24, 15.8],
};