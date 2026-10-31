// ============================================================
//  EGE-CHAN (ege-chan.org)
//  Organisation reprise de la page de l'autrice (EGECHAN/index.html de l'ancien site) :
//  colonne de gauche (avatar, bio, board), cadre de droite (contenu).
//  Le style est dans egechan.css, le contenu du board \izm\ dans egechan-izm.js.
// ============================================================

(function () {

  const COULEURS = { fond: '#0f1222', texte: '#e7ecff', lien: '#5b87cc' };

  function site(contenu) {
    return `
      <div class="egechan">
        <div class="outer">
          <div class="left">
            <div class="avatar">
              <img src="navigateur/images/quicksandtourist.png" alt="" onerror="this.style.visibility='hidden'">
            </div>
            <div class="bio">
              <h1>ISOLATIONIST</h1>
              <span class="blue">&#46;&#10022;&#32;&#1729;&#723;</span> carcinogenic<br>
              <span class="blue">&#46;&#10022;&#32;&#1729;&#723;</span> low melting point<br>
              <a data-lien="ege-chan.org/izm">\\izm\\</a>
            </div>
          </div>
          <div class="right">
            <div class="header"></div>
            <div class="content">${contenu}</div>
          </div>
        </div>
      </div>`;
  }

  Nav.pages['ege-chan.org/izm'] = () => ({
    titre: '/izm/ - egechan',
    html: site(Nav.EGECHAN_IZM),
    couleurs: COULEURS,
    classe: 'site-egechan'
  });
  Nav.pages['ege-chan.org'] = Nav.pages['ege-chan.org/izm'];

})();
