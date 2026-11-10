/* =====================================================================
   LE PONT : pour les pages affichées sur un écran du visual novel
   (le bureau d'un PC, un terminal, un faux site, un blog…)

   Une page d'écran est une page HTML normale. En ajoutant cette ligne
   dans son <head>, elle peut parler à l'histoire qui l'affiche :

       <script src="/ambiance/vn/pont.js"></script>

   Ce qu'elle peut faire ensuite :

     Pont.joue("anarch")        demande à l'histoire de jouer une scène
                                (l'écran se cache le temps de la scène, puis revient)
     Pont.note("logEcrit")      retient quelque chose dans la mémoire de l'histoire
     Pont.sait("chatSorti")     lit la mémoire ;  Pont.sait("nuit")  donne le numéro de la nuit

   Et, sans écrire de JavaScript, montrer un morceau de page seulement à certains moments :

     <div data-nuit="2"> … </div>        visible à partir de la nuit 2
     <div data-nuit="2-3"> … </div>      visible de la nuit 2 à la nuit 3
     <div data-si="logEcrit"> … </div>   visible quand logEcrit est noté
     <div data-si="!logEcrit"> … </div>  visible tant que logEcrit n'est PAS noté

   Quand la page est ouverte toute seule (par un lien du site, hors de l'histoire),
   rien ne casse : Pont.joue ne fait rien, tout est visible, et ce que la page note
   est gardé à part dans le navigateur.
===================================================================== */

const Pont = {

    // Le visual novel qui affiche cette page : on remonte de fenêtre en fenêtre jusqu'à le trouver.
    // Répond null si la page est ouverte toute seule.
    histoire() {
        try {
            let fenetre = window;
            while (fenetre !== fenetre.parent) {
                fenetre = fenetre.parent;
                if (fenetre.VN && typeof fenetre.VN.joue === "function") return fenetre.VN;
            }
        } catch (e) {
            // une fenêtre d'un autre site : on ne peut pas regarder dedans
        }
        return null;
    },

    // Joue une scène de l'histoire. On peut attendre qu'elle soit finie :  await Pont.joue("vermine")
    joue(scene) {
        const histoire = Pont.histoire();
        return histoire ? histoire.joue(scene) : Promise.resolve();
    },

    note(nom, valeur = true) {
        const histoire = Pont.histoire();
        if (histoire) {
            histoire.note(nom, valeur);
            return;
        }
        const seule = Pont.memoireSeule();
        seule[nom] = valeur;
        try {
            localStorage.setItem("vn-page-seule", JSON.stringify(seule));
        } catch (e) {}
    },

    oublie(nom) {
        const histoire = Pont.histoire();
        if (histoire) {
            histoire.oublie(nom);
            return;
        }
        const seule = Pont.memoireSeule();
        delete seule[nom];
        try {
            localStorage.setItem("vn-page-seule", JSON.stringify(seule));
        } catch (e) {}
    },

    sait(nom) {
        const histoire = Pont.histoire();
        return histoire ? histoire.sait(nom) : Pont.memoireSeule()[nom];
    },

    // la petite mémoire des pages ouvertes hors de l'histoire
    memoireSeule() {
        try {
            return JSON.parse(localStorage.getItem("vn-page-seule")) || {};
        } catch (e) {
            return {};
        }
    },

    // Un morceau prévu pour la nuit « quand » ("2", ou "2-3") se voit-il maintenant ?
    cetteNuit(quand) {
        const histoire = Pont.histoire();
        if (!histoire || !quand) return true; // hors de l'histoire : on montre tout
        const nuit = histoire.sait("nuit") || 1;
        const [debut, fin] = String(quand).split("-").map(Number);
        return nuit >= debut && (!fin || nuit <= fin);
    },

    // Cache ce qui ne doit pas se voir maintenant (data-nuit, data-si).
    // Faite toute seule au chargement de la page ; une page qui fabrique son contenu
    // après coup peut la relancer sur ce qu'elle vient d'ajouter :  Pont.filtre(zone)
    filtre(zone = document) {

        if (!Pont.histoire()) return;

        for (const morceau of zone.querySelectorAll("[data-nuit]")) {
            if (!Pont.cetteNuit(morceau.dataset.nuit)) morceau.style.display = "none";
        }

        for (const morceau of zone.querySelectorAll("[data-si]")) {
            const condition = morceau.dataset.si.trim();
            const vrai = condition.startsWith("!")
                ? !Pont.sait(condition.slice(1).trim())
                : Boolean(Pont.sait(condition));
            if (!vrai) morceau.style.display = "none";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => Pont.filtre());
