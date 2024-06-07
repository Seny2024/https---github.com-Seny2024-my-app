import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../cssComponents/Navbar.css'; // Import du fichier CSS

// Composant de la barre de navigation
const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Affichage des liens de navigation en fonction du rôle de l'utilisateur
  return (
    <nav className="navbar">
      <Link to="/dashboard">Tableau de bord</Link>
      <Link to="/books">Voir les livres</Link>
      <Link to="/loans">Voir mes prêts en cours</Link>
      <Link to="/profile">Gérer mon compte</Link>
      {user.role === 'administrateur' && (
        <Link to="/admin">Tableau de bord administrateur</Link>
      )}
      <button onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default NavBar;
