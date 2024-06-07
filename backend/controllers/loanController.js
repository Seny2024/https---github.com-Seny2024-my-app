// backend/controllers/loanController.js
const db = require('../models/index'); 

// Contrôleur pour récupérer la liste de tous les prêts
const getLoans = async (req, res) => {
  try {
    const loans = await db.Loan.findAll(); // Récupère tous les prêts depuis la base de données
    res.json(loans); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Contrôleur pour récupérer les informations d'un prêt par son ID
const getLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await db.Loan.findByPk(id); // Recherche un prêt par son ID dans la base de données
    if (!loan) {
      return res.status(404).json({ message: 'Prêt non trouvé' }); 
    }
    res.json(loan); // Envoie les informations du prêt trouvé
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Contrôleur pour créer un nouveau prêt
const addLoan = async (req, res) => {
  const { idUtilisateur, idLivre, dateEmprunt, dateRetour } = req.body;
  console.log('userId', idUtilisateur);

  try {
    const loan = await db.Loan.create({ idUtilisateur, idLivre, dateEmprunt, dateRetour }); // Crée un nouveau prêt dans la base de données
    res.status(201).json(loan); // Envoie une réponse avec le prêt créé
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Contrôleur pour mettre à jour les informations d'un prêt
const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { idUtilisateur, idLivre, dateEmprunt, dateRetour } = req.body;
  try {
    const loan = await db.Loan.findByPk(id); // Recherche le prêt à mettre à jour par son ID
    if (!loan) {
      return res.status(404).json({ message: 'Prêt non trouvé' }); 
    }
    await loan.update({ idUtilisateur, idLivre, dateEmprunt, dateRetour }); // Met à jour les informations du prêt
    res.json(loan); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Contrôleur pour supprimer un prêt
const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await db.Loan.findByPk(id); // Recherche le prêt à supprimer par son ID
    if (!loan) {
      return res.status(404).json({ message: 'Prêt non trouvé' }); 
    }
    await loan.destroy(); // Supprime le prêt de la base de données
    res.json({ message: 'Prêt supprimé avec succès' }); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

module.exports = {
  getLoans,
  getLoan,
  addLoan,
  updateLoan,
  deleteLoan
};
