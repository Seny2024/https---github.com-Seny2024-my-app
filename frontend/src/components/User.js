import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importer le composant Link
import AuthContext from '../contexts/AuthContext';
import authService from '../services/authService';
import '../cssComponents/User.css'; // Import du fichier CSS

// Composant pour afficher la liste des utilisateurs
const Users = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effet pour charger la liste des utilisateurs lorsque l'utilisateur est authentifié
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await authService.getAllUsers();
        setUsers(allUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      await authService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };
  
  // Affichage conditionnel en fonction de l'état d'authentification et de chargement
  if (!isAuthenticated) {
    return <p>Vous devez être connecté en tant qu'administrateur pour voir les utilisateurs.</p>;
  }

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (users.length === 0) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  // Affichage de la liste des utilisateurs
  return (
    <div className="users-container">
      <h2 className="users-header">Liste des Utilisateurs</h2>
      <Link to="/admin">
        <button className="add-user-button">Retour</button> {/* Ajouter un lien de retour */}
      </Link>
      <Link to="/register">
        <button className="add-user-button">Ajouter Utilisateur</button> {/* Ajouter un bouton pour ajouter un utilisateur */}
      </Link>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
