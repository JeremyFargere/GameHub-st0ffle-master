// Importation du module express pour créer un serveur web
import express from "express";

// Importation des données de jeux depuis un fichier JSON
import games from "./games.json" assert {type: 'json'};

// Affichage des données de jeux dans la console pour vérification
console.log(games)

// Création d'une instance de l'application express
const app = express();

// Définition du port sur lequel le serveur va écouter
const PORT = 3000;

// Quelques configurations pour notre serveur:
// Définition de ejs comme moteur de template
app.set("view engine", "ejs");

// Définition du dossier qui contient toutes nos vues
app.set("views", "./views/");

// Livraison de tous les fichiers statiques présents dans le dossier public
app.use(express.static('public'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    // Rendu de la vue 'index' en passant les données de jeux
    res.render('index', { games })
    next();
})

// Route pour une page de jeu spécifique
app.get('/game/:nomDuJeu', (req, res) => {
    // Récupération du paramètre d'URL pour connaître le nom du jeu demandé
    const gameNameUrl = req.params.nomDuJeu;

    // Recherche du jeu correspondant dans les données
    const foundGame = games.find(game => game.name.toLowerCase() === gameNameUrl.toLowerCase());

    // Si le jeu est trouvé, on rend la vue correspondante avec les données du jeu
    if (foundGame) {
        res.render(foundGame.name, { games, foundGame })
    } else {
        // Si le jeu n'est pas trouvé, on rend une page d'erreur 404
        res.status(404).render('error404', { games });
    }
})

// généralisation de la page d'erreur 404
app.use((req, res) => {
    res.status(404).render('error404', { games });
})

// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
    console.log(`Le serveur a bien démarré sur l'adresse http://localhost:${PORT}`);
});