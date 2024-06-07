import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../cssComponents/Dashboard.css';

// Composant Dashboard
const Dashboard = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Affichage du tableau de bord
  return (
    <div className="dashboard-layout">
      <div className="dashboard-welcome">Bonjour, {user.nom} !<br/>Vous êtes dans votre tableau de bord</div>
      <div className="books-button-container">
        <Link to="/books" className="view-all-books-button">Visualiser tous les livres</Link>
      </div>
    </div>
  );
};

export default Dashboard;
