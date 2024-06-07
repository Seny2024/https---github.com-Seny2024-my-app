/*
 * Configuration de la base de données pour les environnements de développement, de test et de production.
 * Charge les variables d'environnement à partir d'un fichier .env pour définir les paramètres de connexion à la base de données et d'autres configurations.
 * Utilise une clé secrète pour la signature des tokens JWT, générée aléatoirement si aucune n'est définie dans l'environnement.
 */

require('dotenv').config(); 
const crypto = require('crypto');


module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_project_s8',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    jwtExpiration: 2592000, // Période de validité du token en secondes (1 heure dans cet exemple)
    jwtSecret: process.env.JWT_SECRET || generateRandomKey(), // Clé secrète pour la signature du token JWT
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY

  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || 'database_project_s8',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    jwtExpiration: 2592000, // Période de validité du token en secondes (1 heure dans cet exemple)
    jwtSecret: process.env.JWT_SECRET || generateRandomKey(), // Clé secrète pour la signature du token JWT
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY

  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_PROD || 'database_project_s8',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    jwtExpiration: 2592000, // Période de validité du token en secondes (1 heure dans cet exemple)
    jwtSecret: process.env.JWT_SECRET || generateRandomKey(), // Clé secrète pour la signature du token JWT
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY

  },
};

// Fonction pour générer une clé aléatoire si aucune n'est définie dans l'environnement
function generateRandomKey() {
  return crypto.randomBytes(32).toString('hex');
}
