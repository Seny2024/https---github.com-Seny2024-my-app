import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../cssComponents/Admin.css';

// Composant Admin
const Admin = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié ou n'est pas un administrateur
  if (!isAuthenticated || user.role !== 'administrateur') {
    return <Navigate to="/login" />;
  }

  // Affichage du tableau de bord administrateur
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-welcome">Administrateur, {user.nom} !</div>
      <div className="admin-dashboard-buttons">
        <Link to="/books/add">
          <button>Ajouter un livre</button>
        </Link>
        <Link to="/loans">
          <button>Gérer les prêts</button>
        </Link>
        <Link to="/users">
          <button>Gérer les utilisateurs</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
