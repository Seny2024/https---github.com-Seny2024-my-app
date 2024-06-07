/*
 * Middleware de vérification du jeton d'authentification JWT.
 * Vérifie la présence et la validité du jeton JWT dans l'en-tête d'autorisation de la requête HTTP.
 * Si le jeton est valide, il ajoute l'utilisateur extrait du jeton à l'objet de requête (req.user) et passe à l'étape suivante.
 * Si le jeton est manquant ou invalide, renvoie un statut d'erreur approprié (401 ou 403).
 * Utilisé pour sécuriser les endpoints nécessitant une authentification dans une application Node.js avec Express.js.
 */

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'my_very_secret_key_123!@#456', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
