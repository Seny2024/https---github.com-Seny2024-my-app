import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Importer Outlet
import AuthContext from '../contexts/AuthContext';
import NavBar from './Navbar';

// Composant pour la mise en page privée
const PrivateLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Affichage de la barre de navigation et du contenu des routes enfants
  return (
    <div>
      <NavBar />
      <div className="content">
        <Outlet /> {/* Render child routes */}
      </div>
    </div>
  );
};

export default PrivateLayout;
