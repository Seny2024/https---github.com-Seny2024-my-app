import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/'; // URL de base de l'API pour les utilisateurs

// Fonction d'inscription
const register = async (nom, email, motDePasse, role) => {
  const response = await axios.post(`${API_URL}register`, {
    nom,
    email,
    motDePasse,
    role,
  });
  // Stocke le token dans le localStorage si disponible
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    console.log('Token stored after register:', response.data.token);
  }
  return response.data;
};

// Fonction de connexion
const login = async (email, motDePasse) => {
  const response = await axios.post(`${API_URL}login`, {
    email,
    motDePasse,
  });
  // Stocke le token et l'ID utilisateur dans le localStorage si disponibles
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId); // Stocke l'ID utilisateur après connexion
    console.log('Token stored after login:', response.data.token);
    console.log('User ID stored after login:', response.data.userId);
  }
  return response.data;
};

// Fonction pour obtenir les informations de l'utilisateur actuellement connecté
const getUser = async () => {
  const token = localStorage.getItem('token');
  console.log('Token retrieved from localStorage:', token);
  // Vérifie si le token est disponible
  if (!token) return null;
  // Effectue une requête GET pour obtenir le profil utilisateur
  const response = await axios.get(`${API_URL}profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('token');
  console.log('Token removed from localStorage');
};

// Fonction de mise à jour du profil utilisateur
const updateProfile = async (userId, profileData) => {
  const token = localStorage.getItem('token');
  // Vérifie si le token est disponible
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
  
  try {
    // Effectue une requête PUT pour mettre à jour le profil utilisateur
    const response = await axios.put(`${API_URL}${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil!', error);
    throw error;
  }
};

// Fonction pour obtenir la liste de tous les utilisateurs
const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  console.log('Token retrieved from localStorage:', token);
  // Vérifie si le token est disponible
  if (!token) throw new Error('Token not found in localStorage');
  
  try {
    // Effectue une requête GET pour obtenir tous les utilisateurs
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error while fetching all users:', error);
    throw error;
  }
};

// Fonction de suppression d'un utilisateur
const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  // Vérifie si le token est disponible
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  try {
    // Effectue une requête DELETE pour supprimer l'utilisateur
    const response = await axios.delete(`${API_URL}${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    throw error;
  }
};

// Objet authService contenant toutes les fonctions d'authentification
const authService = {
  register,
  login,
  getUser,
  logout,
  updateProfile, // Ajout de la fonction updateProfile
  getAllUsers,
  deleteUser
};

export default authService;
