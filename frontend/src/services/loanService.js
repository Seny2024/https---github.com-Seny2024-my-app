import axios from 'axios';

const API_URL = 'http://localhost:3000/api/loans/';

// Récupérer tous les prêts
const getAllLoans = async () => {
  const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local
  const config = {
    headers: {
      Authorization: `Bearer ${token}` // Inclure le jeton d'authentification dans l'en-tête de la requête
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Récupérer un prêt par son ID
const getLoanById = async (loanId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL + loanId, config);
  return response.data;
};

// Ajouter un prêt
const addLoan = async (loanData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, loanData, config);
  return response.data;
};

// Mettre à jour un prêt
const updateLoan = async (loanId, loanData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_URL + loanId, loanData, config);
  return response.data;
};

// Supprimer un prêt
const deleteLoan = async (loanId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  await axios.delete(API_URL + loanId, config);
  return loanId;
};

const loanService = {
  getAllLoans,
  getLoanById,
  addLoan,
  updateLoan,
  deleteLoan,
};

export default loanService;
