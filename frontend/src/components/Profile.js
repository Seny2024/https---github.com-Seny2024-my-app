import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../cssComponents/Profile.css';

// Composant pour afficher le profil de l'utilisateur
const Profile = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Retourne null si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return null;
  }

  // Affichage du profil de l'utilisateur
  return (
    <div className="profile-container">
      <h2 className="profile-header">Profil Utilisateur</h2>
      <div className="profile-info">
        <p><i className="fas fa-user"></i>Nom d'utilisateur : {user.nom}</p>
        <p><i className="fas fa-envelope"></i>Email : {user.email}</p>
        <p><i className="fas fa-user-tag"></i>Rôle : {user.role}</p>
      </div>
      <div className="profile-buttons">
        <Link to={`/edit-profile/${user.id}`}>
          <button>Modifier</button>
        </Link>
        <button onClick={logout}>Déconnexion</button>
        <Link to="/dashboard">
          <button>Retour</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
