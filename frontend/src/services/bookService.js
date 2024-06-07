import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books/';

// Fonction pour créer un livre
const createBook = async (book) => {
  try {
    const token = localStorage.getItem('token'); // ou une autre méthode pour obtenir le token
    const response = await axios.post(API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du livre!', error);
    throw error;
  }
};

// Fonction pour récupérer tous les livres
const getAllBooks = async () => {
  try {
    const token = localStorage.getItem('token'); // ou une autre méthode pour obtenir le token
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des livres!', error);
    throw error;
  }
};

// Fonction pour récupérer un livre par son ID
const getBookById = async (bookId) => {
  try {
    const token = localStorage.getItem('token'); // Obtenir le token depuis localStorage
    const response = await axios.get(`${API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du livre!', error);
    throw error;
  }
};

// Fonction pour mettre à jour un livre
const updateBook = async (bookId, bookData) => {
  try {
    const token = localStorage.getItem('token'); // Obtenir le token depuis le localStorage
    const response = await axios.put(`${API_URL}/${bookId}`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du livre!', error);
    throw error;
  }
};

// Fonction pour supprimer un livre
const deleteBook = async (bookId) => {
  try {
    const token = localStorage.getItem('token'); // Obtenir le token depuis le localStorage
    await axios.delete(`${API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return bookId;
  } catch (error) {
    console.error('Erreur lors de la suppression du livre!', error);
    throw error;
  }
};

// Service des livres exportant toutes les fonctions nécessaires
const bookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};

export default bookService;
