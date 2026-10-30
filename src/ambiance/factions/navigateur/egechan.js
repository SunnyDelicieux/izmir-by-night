// ============================================================
//  EGE-CHAN (ege-chan.org)
//  Organisation reprise de la page de l'autrice (EGECHAN/index.html de l'ancien site) :
//  colonne de gauche (avatar, bio, boards, code modérateur),
//  cadre de droite (en-tête [mod], contenu). Le style est dans egechan.css.
//
//  Chaque page est une fonction qui renvoie :
//    { titre: '...', html: '...', apres: function(vue) {...} }
//  Les liens entre pages s'écrivent :  <a data-lien="ege-chan.org/a">...</a>
//  Un post ou une réponse avec  cache: true  n'est visible qu'en mode modérateur.
//  Le code modérateur, c'est le mot de passe de DeadDogs (il est caché dans /a/, page 6).
// ============================================================

(function () {

  const CODE_MOD = 'd0g32013';
  const COULEURS = { fond: '#0f1222', texte: '#e7ecff', lien: '#5b87cc' };

  // le mode modérateur reste tant que le navigateur est ouvert
  let admin = false;
  const estAdmin = () => admin;

  // ---------- Hasard reproductible (même graine = même résultat) ----------
  function hasard(graine) {
    let a = graine >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const choisir = (r, liste) => liste[Math.floor(r() * liste.length)];

  // ============================================================
  //  LE CADRE DU SITE (organisation de la page de l'autrice)
  // ============================================================
  function site(contenu) {
    return `
      <div class="egechan ${estAdmin() ? 'admin' : ''}">
        <div class="outer">
          <div class="left">
            <div class="avatar">
              <img src="navigateur/images/quicksandtourist.png" alt="" onerror="this.style.visibility='hidden'">
            </div>
            <div class="bio">
              <h1>ISOLATIONIST</h1>
              <span class="blue">&#46;&#10022;&#32;&#1729;&#723;</span> carcinogenic<br>
              <span class="blue">&#46;&#10022;&#32;&#1729;&#723;</span> low melting point<br>
              <a data-lien="ege-chan.org/a">\\a\\</a> <br>
              <a data-lien="ege-chan.org/izm">\\izm\\</a> <br>
              <a data-lien="ege-chan.org/turkey">\\turkey\\</a><br>
              <a data-lien="ege-chan.org/pol">\\pol\\</a>
            </div>
            <form class="admin-form">
              <input type="password" class="admin-code" placeholder="code"> <button>ok</button>
            </form>
          </div>
          <div class="right">
            <div class="header"><span class="admin-btn">${estAdmin() ? '[mod : déconnexion]' : '[mod]'}</span></div>
            <div class="content">${contenu}</div>
          </div>
        </div>
      </div>`;
  }

  // Branche le bouton [mod] et le code (repris du script de l'autrice)
  function brancherMod(vue) {
    const bouton = vue.querySelector('.admin-btn');
    const form = vue.querySelector('.admin-form');
    if (!bouton || !form) return;

    bouton.onclick = () => {
      if (estAdmin()) {                         // déconnexion
        admin = false;
        return Nav.actualiser();
      }
      form.classList.toggle('open');
      form.querySelector('.admin-code').focus();
    };

    form.onsubmit = e => {
      e.preventDefault();
      const champ = form.querySelector('.admin-code');
      if (champ.value === CODE_MOD) {
        admin = true;
        Nav.actualiser();
      }
      champ.value = '';
    };
  }

  // Une page du site
  const page = (titre, contenu) => ({ titre, html: site(contenu), couleurs: COULEURS, classe: 'site-egechan', apres: brancherMod });

  // ---------- Posts, au format de la page de l'autrice ----------
  // f = { no, titre, nom, date, texte, cache, reponses: [{ no, nom, date, texte, cache }] }
  function reponse(r) {
    const tag = r.cache ? '<span class="tag">[hidden]</span> ' : '';
    return `
      <div class="reply${r.cache ? ' hidden' : ''}" id="p${r.no}">
        <i>${tag}${r.nom || 'Anonymous'} ${r.date} No.${r.no}</i>
        ${r.image ? `<div class="image">[image : ${r.image}]</div>` : ''}
        <p>${r.texte}</p>
      </div>`;
  }

  function fil(f) {
    const tag = f.cache ? '<span class="tag">[hidden]</span> ' : '';
    return `
      <div class="post${f.cache ? ' hidden' : ''}" id="p${f.no}">
        <h2>${tag}${f.titre}</h2>
        <i>${f.nom || 'Anonymous'} ${f.date} No.${f.no}</i>
        <p>${f.texte}</p>
        ${(f.reponses || []).map(reponse).join('')}
      </div>`;
  }

  const cite = no => `<a href="#p${no}">&gt;&gt;${no}</a>`;
  const vert = t => `<span class="green">&gt;${t}</span>`;

  // ============================================================
  //  \izm\ : la page de l'autrice (egechan-izm.js)
  // ============================================================
  Nav.pages['ege-chan.org/izm'] = () => page('/izm/ - egechan', Nav.EGECHAN_IZM);
  Nav.pages['ege-chan.org'] = Nav.pages['ege-chan.org/izm'];

  // ============================================================
  //  \a\ : tout le reste (règle 2 de \izm\).
  //  Le mot de passe de DeadDogs est dans le fil des mèmes, en page 6.
  // ============================================================
  const SUJETS = [
    'votre animal le plus con', 'chats vs chiens, débat final', 'photos de vos chats svp',
    'le chien du voisin aboie depuis 3h', 'les mouettes de Konak sont des criminelles',
    'quelqu\'un a déjà eu un furet ?', 'mon chat a mangé un câble', 'le meilleur mème de chat',
    'est-ce que les pigeons pensent', 'windows 8 c\'est vraiment si nul ?',
    'ma connexion coupe tous les soirs', 'examens dans 2 semaines', 'mon proprio augmente le loyer',
    'il fait déjà 25 degrés en mars', 'meilleur kumru de la ville'
  ];
  const REPONSES = [
    'lol', 'source ?', 'mon chat fait pareil', 'personne a demandé', 'trop mignon', 'c\'est fake',
    'espèce d\'âne, c\'est un furet pas un rat', 'tête de chèvre, lis le fil avant de poster',
    'grumpy cat c\'est fini depuis l\'an dernier', 'nyan cat 4ever', 'repost', 'bump', 'feels bad',
    'les mouettes de Konak m\'ont volé un simit', 'ça va vite passer ce truc', 'je pleure'
  ];

  const date = (r, jour) => {
    const h = String(Math.floor(r() * 24)).padStart(2, '0');
    const m = String(Math.floor(r() * 60)).padStart(2, '0');
    const s = String(Math.floor(r() * 60)).padStart(2, '0');
    return `${jour} ${h}:${m}:${s}`.replace(' ', '');
  };
  const JOURS = ['02/26/13(Tue)', '02/27/13(Wed)', '02/28/13(Thu)', '03/01/13(Fri)', '03/02/13(Sat)', '03/03/13(Sun)', '03/04/13(Mon)'];

  function filBruit(no) {
    const r = hasard(no);
    const jour = choisir(r, JOURS);
    const nb = 1 + Math.floor(r() * 4);
    const reponses = [];
    for (let i = 1; i <= nb; i++) reponses.push({ no: no + i * 3, date: date(r, jour), texte: choisir(r, REPONSES) });
    return fil({ no, titre: choisir(r, SUJETS), date: date(r, jour), texte: choisir(r, REPONSES), reponses });
  }

  // Le fil clé : DeadDogs s'y trahit avec un nom d'animal arménien
  const FIL_MEMES = fil({
    no: 48100, titre: 'Top mèmes animaux 2013', date: '03/03/13(Sun)20:02:11',
    texte: 'classez, go. le perdant paie les simit.',
    reponses: [
      { no: 48104, date: '03/03/13(Sun)20:05:40', texte: '1. grumpy cat<br>2. nyan cat<br>3. keyboard cat<br>fight me' },
      { no: 48117, date: '03/03/13(Sun)20:09:02', texte: `${cite(48104)}<br>grumpy cat c'est 2012 frère` },
      { no: 48132, date: '03/03/13(Sun)20:15:33', texte: '1. le hibou O RLY<br>2. la chèvre qui crie<br>3. les chats de Konak' },
      { no: 48150, date: '03/03/13(Sun)20:21:47', texte: 'philosoraptor est éternel' },
      { no: 48213, date: '03/03/13(Sun)20:40:18', image: 'un chien Shiba de profil, regard en coin, entouré de petits mots en Comic Sans multicolore : « such wow », « very 2013 », « much meme »', texte: 'le seul, le vrai' },
      { no: 48220, date: '03/03/13(Sun)20:42:05', texte: `${cite(48213)}<br>ça va vite passer ce truc` },
      { no: 48231, date: '03/03/13(Sun)20:44:51', texte: `${cite(48213)}<br>le seul roi de l'année. le reste c'est pour les aghves.` },
      { no: 48240, date: '03/03/13(Sun)20:47:30', texte: 'c\'est quoi un aghves' },
      { no: 48244, date: '03/03/13(Sun)20:50:12', texte: `${cite(48240)}<br>aucune idée` },
      { no: 48263, date: '03/03/13(Sun)21:03:44', texte: 'keyboard cat > tout, je retiens rien de ce fil' }
    ]
  });

  // Fausse piste : le troll du « leak »
  const FIL_LEAK = fil({
    no: 8812, titre: 'LEAK mot de passe admin egechan', date: '03/02/13(Sat)01:12:09',
    texte: `vrai de vrai, testé hier :<br>
      admin123 · egechan2013 · izmir35 · moderator · door1 · 12345678 · baklava<br>
      gr4mpyc4t · goztepe1925 · karsiyaka1912 · qwerty · admin2012 · ege35 ·
      konak · s3cret · bornova · password123 · anonymous`,
    reponses: [
      { no: 8815, date: '03/02/13(Sat)01:20:33', texte: 'ça marche pas ton truc' },
      { no: 8819, date: '03/02/13(Sat)01:25:10', texte: 'c\'est /admin/ bande de noobs' },
      { no: 8823, date: '03/02/13(Sat)01:31:52', texte: `${cite(8819)}<br>j'ai essayé, ça dit mot de passe incorrect` },
      { no: 8824, date: '03/02/13(Sat)01:32:40', texte: `${cite(8823)}<br>essaie encore lol` }
    ]
  });

  // [hidden] Le fil de HoneyTrap : un lien terminal par personne
  const FIL_MAINTENANCE = fil({
    no: 31337, cache: true, nom: 'meghu #mod', titre: 'Maintenance', date: '03/02/13(Sat)03:05:00',
    texte: `lisez avant de toucher à quoi que ce soit.<br><br>
      accès terminal, un par personne. ne partagez pas.<br><br>
      kria&nbsp;&nbsp;&nbsp;&nbsp;saz://relais/kria-7731<br>
      khoz&nbsp;&nbsp;&nbsp;&nbsp;saz://relais/khoz-0419<br>
      shun&nbsp;&nbsp;&nbsp;&nbsp;saz://relais/shun-5562<br>
      aghves&nbsp;&nbsp;saz://relais/aghves-3388<br>
      meghu&nbsp;&nbsp;&nbsp;saz://relais/meghu-0001<br><br>
      ne collez jamais un lien qui finit par -miel. ils sont à moi.`
  });

  // [hidden] Liens morts semés dans les pages (pièges en -miel, vieux sites)
  const LIENS_CACHES = {
    1: { no: 47003, date: '03/04/13(Mon)03:12:44', texte: 'nouveau miroir : saz://relais/miroir-miel' },
    3: { no: 47341, date: '03/01/13(Fri)04:02:19', texte: 'archive à jour. lien habituel : saz://relais/archive-miel' },
    5: { no: 47622, date: '02/28/13(Thu)02:47:03', texte: 'ancienne galerie : http://galerie-ege.net (down)' },
    8: { no: 48035, date: '02/27/13(Wed)03:33:10', texte: 'si ça tombe encore : saz://relais/tunnel-miel' }
  };

  const PAGE_MEMES = 6;

  function pageA(n) {
    const r = hasard(n * 991);
    let fils = '';
    if (n === 1) {
      fils += `<p>/a/ rules</p>
        <ul>
          <li><strong>1. </strong>Don't be a dick</li>
          <li><strong>2. </strong>Everything else goes here</li>
        </ul>`;
      fils += FIL_MAINTENANCE + FIL_LEAK;
    }
    for (let i = 0; i < 6; i++) {
      if (n === PAGE_MEMES && i === 3) fils += FIL_MEMES;
      fils += filBruit(47000 + n * 137 + i * 11 + Math.floor(r() * 5));
    }
    if (LIENS_CACHES[n]) {
      fils += fil({ no: LIENS_CACHES[n].no - 1, cache: true, titre: 'lien', date: LIENS_CACHES[n].date, texte: LIENS_CACHES[n].texte });
    }
    const pagination = Array.from({ length: 10 }, (_, i) => i + 1)
      .map(k => k === n ? `<b>[${k}]</b>` : `<a data-lien="ege-chan.org/a/${k}">[${k}]</a>`).join(' ');
    return page(`/a/ - egechan (${n})`, fils + `<div class="pagination">${pagination}</div>`);
  }

  Nav.pages['ege-chan.org/a'] = () => pageA(1);
  Nav.routes.push({ motif: /^ege-chan\.org\/a\/(\d+)$/, page: m => {
    const n = Number(m[1]);
    return n >= 1 && n <= 10 ? pageA(n) : null;
  } });

  // ============================================================
  //  \turkey\ : la vie, la ville, le pays
  // ============================================================
  Nav.pages['ege-chan.org/turkey'] = () => page('/turkey/ - egechan', `
    <p>/turkey/ rules</p>
    <ul><li><strong>1. </strong>Don't be a dick</li><li><strong>2. </strong>la politique va sur \\pol\\</li></ul>
    ${fil({ no: 51002, titre: 'Izmir vs Istanbul', date: '03/04/13(Mon)18:22:10', texte: 'vous avez la mer, on a tout le reste',
      reponses: [
        { no: 51005, date: '03/04/13(Mon)18:25:41', texte: `${cite(51002)}<br>vous avez les embouteillages surtout` },
        { no: 51011, date: '03/04/13(Mon)18:40:03', texte: 'trois heures pour traverser le pont ce matin' },
        { no: 51014, date: '03/04/13(Mon)18:52:30', texte: `${vert('on a tout le reste')}<br>vous avez pas le boyoz. fin du débat.` }
      ] })}
    ${fil({ no: 50877, titre: 'MSN ferme le 15 mars', date: '03/03/13(Sun)22:10:44', texte: 'ils nous forcent à passer sur skype. 10 ans de conversations qui vont disparaître.',
      reponses: [
        { no: 50880, date: '03/03/13(Sun)22:14:02', texte: 'exporte tes logs' },
        { no: 50884, date: '03/03/13(Sun)22:20:51', texte: 'mes logs de 2004 c\'est que des wizz et des poèmes, laisse-les mourir' },
        { no: 50890, date: '03/03/13(Sun)23:01:12', texte: 'ceux qui ont une messagerie à eux, ils rigolent' },
        { no: 50891, cache: true, nom: 'shun #mod', date: '03/03/13(Sun)23:04:40', texte: `${cite(50890)}<br>on ne parle pas de ça ici.` }
      ] })}
    ${fil({ no: 50702, titre: 'le vapur de 7h40', date: '03/02/13(Sat)08:02:19', texte: 'le type au manteau vert qui lit sur le pont même sous la pluie, il est là depuis des années. quelqu\'un sait qui c\'est ?',
      reponses: [
        { no: 50706, date: '03/02/13(Sat)08:30:41', texte: 'laisse-le lire en paix' },
        { no: 50711, date: '03/02/13(Sat)09:12:03', texte: 'il descend à Konak et il prend le guichet 2. je dis ça je dis rien' },
        { no: 50712, date: '03/02/13(Sat)09:13:40', texte: `${cite(50711)}<br>pourquoi tu sais ça. pourquoi tu sais ça` },
        { no: 50713, cache: true, nom: 'shun #mod', date: '03/02/13(Sat)09:20:00', texte: 'lien vers findme supprimé. pas ici.' }
      ] })}
    ${fil({ no: 50644, titre: 'les chiens de Konak', date: '03/01/13(Fri)19:40:02', texte: 'la belediye les ramasse encore. ils les relâchent en forêt et ils reviennent en meute.',
      reponses: [
        { no: 50650, date: '03/01/13(Fri)19:51:16', texte: 'les chiens c\'est la seule chose honnête dans cette ville' },
        { no: 50657, date: '03/01/13(Fri)20:30:44', texte: 'y en a un qui dort devant le bâtiment sans plaque à Konak, toujours le même. les types qui entrent lui donnent à manger' },
        { no: 50660, date: '03/01/13(Fri)20:33:10', texte: `${cite(50657)}<br>c'est quoi ce bâtiment` },
        { no: 50661, date: '03/01/13(Fri)20:35:00', texte: `${cite(50660)}<br>\\pol\\` }
      ] })}
    ${fil({ no: 50512, titre: 'meilleur kumru', date: '02/28/13(Thu)13:05:51', texte: 'Çeşme ou rien',
      reponses: [
        { no: 50516, date: '02/28/13(Thu)13:20:22', texte: 'le kumru de Çeşme c\'est pour les touristes d\'Istanbul' },
        { no: 50519, date: '02/28/13(Thu)13:44:09', texte: 'kumru = sandwich, je comprends pas pourquoi on se bat' },
        { no: 50520, date: '02/28/13(Thu)13:45:30', texte: `${cite(50519)}<br>sors` }
      ] })}
    ${fil({ no: 50401, cache: true, nom: 'shun #mod', titre: 'liman35', date: '03/04/13(Mon)06:10:00', texte: 'quelqu\'un lui dit d\'arrêter de poster sur le port ? il a un profil sur findme depuis hier.',
      reponses: [ { no: 50403, cache: true, nom: 'aghves', date: '03/04/13(Mon)06:30:12', texte: 'je m\'en occupe. je lui parle de foot.' } ] })}
    <div class="pagination"><b>[1]</b> <a data-lien="ege-chan.org/turkey/2">[2]</a></div>`);

  Nav.pages['ege-chan.org/turkey/2'] = () => page('/turkey/ - egechan (2)', `
    ${filBruit(52011)}${filBruit(52044)}${filBruit(52101)}
    <p class="deleted">les anciennes pages ont été archivées.</p>
    <div class="pagination"><a data-lien="ege-chan.org/turkey">[1]</a> <b>[2]</b></div>`);

  // ============================================================
  //  \pol\ : les Ashughs n'y touchent pas, ils y lisent
  // ============================================================
  Nav.pages['ege-chan.org/pol'] = () => page('/pol/ - egechan', `
    <p>/pol/ rules</p>
    <ul><li><strong>1. </strong>Don't be a dick</li><li><strong>2. </strong>pas de noms, pas d'adresses</li><li><strong>3. </strong>personne ne vous lit (c'est faux)</li></ul>
    ${fil({ no: 61200, titre: 'le bâtiment sans plaque de Konak', date: '03/03/13(Sun)01:44:12', texte: 'trois étages, pas de plaque, des voitures banalisées. tout le monde sait ce que c\'est et personne le dit.',
      reponses: [
        { no: 61204, date: '03/03/13(Sun)01:50:09', texte: 'une annexe du cadastre' },
        { no: 61207, date: '03/03/13(Sun)01:52:33', texte: `${cite(61204)}<br>le cadastre avec des antennes sur le toit` },
        { no: 61215, date: '03/03/13(Sun)02:20:10', texte: 'mon oncle y a livré des cartons en 2009. des centaines. des archives saisies. il dit qu\'ils notent tout sur le côté au feutre, comme des déménageurs' },
        { no: 61216, cache: true, nom: 'shun', date: '03/03/13(Sun)02:21:40', texte: `${cite(61215)}<br>contacte-moi. ne poste plus rien.` },
        { no: 61230, date: '03/03/13(Sun)03:05:51', texte: 'arrêtez de parler de ça, ils lisent \\pol\\' },
        { no: 61231, date: '03/03/13(Sun)03:06:02', texte: `${cite(61230)}<br>bonsoir messieurs` }
      ] })}
    ${fil({ no: 61105, titre: 'liste de blocage du TİB', date: '03/02/13(Sat)23:10:00', texte: 'egechan sera sur la prochaine liste. préparez vos proxys.',
      reponses: [
        { no: 61109, date: '03/02/13(Sat)23:15:40', texte: 'ils bloquent, on change de DNS, ils bloquent, on change de DNS. c\'est un sport national' },
        { no: 61114, date: '03/02/13(Sat)23:40:21', texte: 'le jour où ils bloquent les DNS on fait quoi' },
        { no: 61118, date: '03/02/13(Sat)23:41:00', texte: `${cite(61114)}<br>on sort. on se parle. comme des animaux.` }
      ] })}
    ${fil({ no: 61010, titre: 'archives saisies, comment chercher ?', date: '03/01/13(Fri)16:22:47', texte: 'étudiante en histoire. je cherche ce qui a été saisi chez des particuliers dans les années 80. où c\'est rangé ? à qui on demande ?',
      reponses: [
        { no: 61013, date: '03/01/13(Fri)16:30:12', texte: 'tu demandes pas' },
        { no: 61019, date: '03/01/13(Fri)17:02:55', texte: 'les fonds privés saisis c\'est pas aux archives d\'état. c\'est ailleurs. dans des bâtiments sans plaque' },
        { no: 61020, cache: true, nom: 'kria', date: '03/01/13(Fri)17:10:30', texte: 'je lui écris. personne d\'autre.' },
        { no: 61021, cache: true, nom: 'D', date: '03/01/13(Fri)17:11:02', texte: 'fiche ouverte. muk.' }
      ] })}
    ${fil({ no: 60922, titre: '1922 : qui a mis le feu ?', date: '02/28/13(Thu)21:00:13', texte: 'chaque année le même débat. chaque année les mêmes réponses. allez-y.',
      reponses: [
        { no: 60925, date: '02/28/13(Thu)21:04:40', texte: 'les deux camps ont leurs torts' },
        { no: 60926, cache: true, nom: 'khoz', date: '02/28/13(Thu)21:05:20', texte: `${cite(60925)}<br>même phrase que gayl. même adresse IP de lycée.` },
        { no: 60931, date: '02/28/13(Thu)21:30:02', texte: 'le quartier arménien a brûlé en premier. c\'est dans tous les témoignages. lisez les témoignages.' },
        { no: 60933, date: '02/28/13(Thu)21:33:47', texte: `${cite(60931)}<br>quels témoignages ? t'as un lien ?` },
        { no: 60934, cache: true, nom: 'shun #mod', date: '02/28/13(Thu)21:34:10', texte: 'pas de lien. jamais de lien vers le relais.' }
      ] })}
    ${filBruit(61333)}
    <div class="pagination"><b>[1]</b></div>`);

  // ============================================================
  //  /admin/ : le pot de miel de HoneyTrap (sur le PC d'Inga : il refuse, c'est tout)
  // ============================================================
  Nav.pages['ege-chan.org/admin'] = () => ({
    titre: 'administration - egechan',
    couleurs: COULEURS,
    classe: 'site-egechan',
    html: `
      <div class="egechan">
        <form class="faux-panneau">
          <h1>administration</h1>
          <label>identifiant <input name="identifiant" autocomplete="off"></label>
          <label>mot de passe <input name="mdp" type="password"></label>
          <p><button type="submit">connexion</button></p>
          <div class="erreur"></div>
        </form>
      </div>`,
    apres: function (vue) {
      const form = vue.querySelector('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        form.querySelector('.erreur').textContent = 'identifiant ou mot de passe incorrect.';
      });
    }
  });

})();
