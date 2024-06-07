const db = require('../models/index'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, motDePasse, role } = req.body;
  const hashedPassword = await bcrypt.hash(motDePasse, 10); // Hache le mot de passe avant de l'enregistrer en base de données.
  try {
    const user = await db.User.create({ nom, email, motDePasse: hashedPassword, role }); // Crée un nouvel utilisateur dans la base de données avec le mot de passe haché.
    const token = jwt.sign({ id: user.id, role: user.role }, 'my_very_secret_key_123!@#456'); // Génère un jeton JWT pour l'utilisateur créé.
    res.status(201).send({ user, token }); // Envoie une réponse avec l'utilisateur créé et le jeton JWT.
  } catch (error) {
    res.status(400).send(error); // Envoie une erreur en cas d'échec de la création de l'utilisateur.
  }
};


exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } }); // Recherche l'utilisateur dans la base de données par son email.
    if (!user) return res.status(400).send('Utilisateur non trouvé'); // Vérifie si l'utilisateur existe.

    console.log(motDePasse);
    console.log(user.motDePasse);
    const validPassword = bcrypt.compare(motDePasse, user.motDePasse); // Vérifie si le mot de passe fourni correspond au mot de passe enregistré.
    console.log(validPassword);

    if (!validPassword) return res.status(400).send('Mot de passe incorrect'); // Vérifie la validité du mot de passe.

    const token = jwt.sign({ id: user.id, role: user.role }, 'my_very_secret_key_123!@#456'); // Génère un jeton JWT pour l'utilisateur authentifié.
    res.send({ token }); // Envoie le jeton JWT.
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
}; 

exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id); // Recherche un utilisateur par son ID dans la base de données.
    if (!user) return res.status(404).send('Utilisateur non trouvé'); // Vérifie si l'utilisateur existe.
    res.send(user); // Envoie l'utilisateur trouvé.
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id); // Recherche l'utilisateur actuellement authentifié par son ID.
    if (!user) return res.status(404).send('Utilisateur non trouvé'); // Vérifie si l'utilisateur existe.
    res.send(user); // Envoie l'utilisateur trouvé.
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await db.User.update(req.body, {
      where: { id: req.params.id }
    }); // Met à jour les informations de l'utilisateur dans la base de données.
    if (updated) {
      const updatedUser = await db.User.findByPk(req.params.id); // Récupère les informations mises à jour de l'utilisateur.
      res.status(200).send(updatedUser); // Envoie l'utilisateur mis à jour.
    } else {
      res.status(404).send('Utilisateur non trouvé'); // Envoie une erreur si l'utilisateur n'est pas trouvé.
    }
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await db.User.destroy({
      where: { id: req.params.id }
    }); // Supprime l'utilisateur de la base de données.
    if (deleted) {
      res.status(204).send(); // Envoie une réponse sans contenu si la suppression réussit.
    } else {
      res.status(404).send('Utilisateur non trouvé'); // Envoie une erreur si l'utilisateur n'est pas trouvé.
    }
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll(); // Récupère tous les utilisateurs de la base de données.
    res.send(users); // Envoie la liste des utilisateurs.
  } catch (error) {
    res.status(500).send(error); // Envoie une erreur en cas d'échec de l'opération.
  }
};
