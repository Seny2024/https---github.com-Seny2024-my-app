import React, { createContext, useEffect, useState } from 'react';
import authService from '../services/authService';

// Création du contexte d'authentification
const AuthContext = createContext();

// Provider du contexte d'authentification
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effet pour récupérer l'utilisateur actuellement authentifié
  useEffect(() => {
    const fetchUser = async () => {
      const data = await authService.getUser();
      console.log('Fetched user in context:', data); // Debugging
      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  // Fonction de connexion de l'utilisateur
  const login = async (email, motDePasse) => {
    const data = await authService.login(email, motDePasse);
    if (data) {
      const userData = await authService.getUser(); // Récupération de l'utilisateur après la connexion
      console.log('Logged in user data:', userData); // Debugging
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  // Fonction de déconnexion de l'utilisateur
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Fonction d'inscription de l'utilisateur
  const register = async (nom, email, motDePasse, role) => {
    const data = await authService.register(nom, email, motDePasse, role);
    if (data) {
      const userData = await authService.getUser(); // Récupération de l'utilisateur après l'inscription
      console.log('Registered user data:', userData); // Debugging
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  // Valeur fournie par le contexte d'authentification
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
export { AuthContextProvider }; 
