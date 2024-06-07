// Ce fichier contient les fonctions de "seeding" pour initialiser la base de données avec des utilisateurs, des prêts et des livres.

const bcrypt = require('bcrypt');
const db = require('../models/index');
const fetchBooksFromGoogleBooks = require('../services/bookService');

const seedUsers = async () => {
  try {
    // Générer le mot de passe hashé pour les utilisateurs
    const hashedAdminPassword = await bcrypt.hash('12345', 10);
    const hashedSimpleUserPassword = await bcrypt.hash('12345', 10);

    // Créer les utilisateurs fictifs
    await db.User.bulkCreate([
      {
        nom: 'Seny',
        email: 'nitiema24@gmail.com',
        motDePasse: hashedAdminPassword,
        role: 'administrateur'
      },
      {
        nom: 'Simple User',
        email: 'user@example.com',
        motDePasse: hashedSimpleUserPassword,
        role: 'utilisateur'
      }
    ]);

    console.log('Utilisateurs fictifs créés avec succès.');

    // Vérification des mots de passe
    const adminUser = await db.User.findOne({ where: { email: 'nitiema24@gmail.com' } });
    const simpleUser = await db.User.findOne({ where: { email: 'user@example.com' } });

    if (adminUser && await adminUser.validPassword('12345')) {
      console.log('Mot de passe admin valide.');
    } else {
      console.log('Mot de passe admin invalide.');
    }

    if (simpleUser && await simpleUser.validPassword('userPassword')) {
      console.log('Mot de passe utilisateur valide.');
    } else {
      console.log('Mot de passe utilisateur invalide.');
    }
  } catch (error) {
    // Gérer les erreurs lors de la création des utilisateurs fictifs
    console.error('Erreur lors de la création des utilisateurs fictifs :', error);
  }
};

const seedLoans = async () => {
  try {
    await db.Loan.bulkCreate([
      { idUtilisateur: 1, idLivre: 1, dateEmprunt: new Date('2024-05-01'), dateRetour: new Date('2024-05-15') },
      { idUtilisateur: 2, idLivre: 2, dateEmprunt: new Date('2024-05-05'), dateRetour: new Date('2024-05-20') },
      // Ajoutez d'autres prêts ici
    ]);
    console.log('Prêts fictifs créés avec succès.');
  } catch (error) {
    // Gérer les erreurs lors de la création des prêts fictifs
    console.error('Erreur lors de la création des prêts fictifs :', error);
  }
};

const seedBook = async () => {
  try {
    // Récupérer les livres à partir de l'API Google Books
    const booksFromAPI = await fetchBooksFromGoogleBooks('programming', 10);

    await db.Book.bulkCreate(booksFromAPI);

    console.log('Livres réels créés avec succès.');
  } catch (error) {
    // Gérer les erreurs lors de la création des livres
    console.error('Erreur lors de la création des livres :', error);
  }
};

const seedAll = async () => {
  await seedBook();
  // Ajoutez d'autres seeds si nécessaire
};

module.exports = { seedUsers, seedLoans, seedAll };
