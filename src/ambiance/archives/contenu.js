const CLASSEURS = [
  {
    nom: "Histoire antique",
    tiroirs: [
      {
        etiquette: "A — F",
        dossiers: [
          {
            chemise: "atratinus-009.webp",
            pdf: "une-legende-vetue-de-noir.pdf",
          },
          { chemise: "atratinus-010.webp", pdf: "exemple.pdf" },
          {
            chemise: "vierge-peche.webp",
            nom: "Enluminure des cavaliers",
            images: [
              "cavalier-conquerant.webp",
              "cavalier-atratinus.webp",
              "cavalier-kushi.webp",
            ],
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure d'Eudokia",
            image: "mort-d-eudokia.webp",
          },
        ],
      },
      {
        etiquette: "G — O",
        dossiers: [
          {
            chemise: "vierge-bleue.webp",
            nom: "L'infernalisme",
            pdf: "l-infernalisme-a-smyrne.pdf",
          },
          { chemise: "marcus-forain.webp", pdf: "marcus-forain.pdf" },
          {
            chemise: "vierge-bleue.webp",
            nom: "Enluminure de Marcus Forain",
            image: "marcus-forain.webp",
          },
          {
            chemise: "vierge-peche.webp",
            nom: "Peau du Lupin",
            pdf: "peau-de-lupin.pdf",
          },
        ],
      },
      {
        etiquette: "P — Z",
        dossiers: [
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Le Prophète",
            pdf: "le-prophete.pdf",
          },
          {
            chemise: "vierge-peche.webp",
            nom: "Shahar",
            pdf: "shahar-de-l-aube.pdf",
          },
          { chemise: "soteria-012.webp", pdf: "les-fruits-du-jardin.pdf" },
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
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure de Soteria",
            image: "soteria-et-atratinus.webp",
          },
        ],
      },
    ],
  },
  {
    nom: "Histoire des clans",
    tiroirs: [
      {
        etiquette: "A — M",
        dossiers: [
          {
            chemise: "vierge-peche.webp",
            nom: "Mythes de Smyrne",
            pdf: "mythes-de-smyrne.pdf",
          },
        ],
      },
      {
        etiquette: "N — Z",
        dossiers: [
          {
            chemise: "vierge-rose.webp",
            nom: "Enluminure des Primogènes",
            image: "primogene.webp",
          },
          {
            chemise: "vierge-rose-gauche.webp",
            nom: "Enluminure du Sabbat",
            image: "sabbat.webp",
          },
          {
            chemise: "vierge-bleue.webp",
            nom: "Enluminure des sigils",
            images: ["sigils-brujah.webp", "sigils-tremere.webp"],
          },
          {
            chemise: "vierge-peche.webp",
            nom: "Enluminure de la lignée Tremere",
            image: "lignee-tremere.webp",
          },
        ],
      },
      {
        etiquette: "Autre",
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
        ],
      },
    ],
  },
  {
    nom: "Histoire moderne",
    decor: true,
    tiroirs: [
      { etiquette: "A — F", dossiers: [] },
      { etiquette: "G — O", dossiers: [] },
      { etiquette: "P — Z", dossiers: [] },
    ],
  },
];

const CHEMISES_VIERGES = {
  "vierge-bleue.webp": [64, 16.4],
  "vierge-peche.webp": [48.6, 15.9],
  "vierge-rose.webp": [73.9, 15.2],
  "vierge-rose-gauche.webp": [24, 15.8],
};
