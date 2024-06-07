import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import loanService from '../../services/loanService';
import AuthContext from '../../contexts/AuthContext'; // Importer le contexte d'authentification
import '../../cssComponents/Loans.css'; // Import du fichier CSS

// Composant Loans
const Loans = () => {
  const { user } = useContext(AuthContext); // Récupérer l'utilisateur connecté depuis le contexte d'authentification
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanService.getAllLoans();
        setLoans(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des prêts :', error);
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Gérer la suppression d'un prêt
  const handleDelete = async (loanId) => {
    try {
      await loanService.deleteLoan(loanId);
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } catch (error) {
      console.error('Erreur lors de la suppression du prêt :', error);
    }
  };

  // Affichage des prêts
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (loans.length === 0) {
    return <p>Aucun prêt trouvé.</p>;
  }

  let filteredLoans;
  if (user.role === 'administrateur') {
    // Si l'utilisateur est administrateur, afficher tous les prêts
    filteredLoans = loans;
  } else {
    // Si l'utilisateur est un utilisateur simple, afficher seulement ses prêts
    filteredLoans = loans.filter((loan) => loan.idUtilisateur === user.id);
  }

  return (
    <div className="loans-container">
      <h2 className="loans-header">{user.role === 'administrateur' ? 'Tous les prêts' : 'Vos prêts'}</h2>
      <table className="loans-table">
        <thead>
          <tr>
            <th>ID du Livre</th>
            <th>Date d'Emprunt</th>
            <th>Date de Retour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan) => (
            <tr key={loan.id}>
              <td data-label="ID du Livre">{loan.idLivre}</td>
              <td data-label="Date d'Emprunt">{loan.dateEmprunt.split('T')[0]}</td>
              <td data-label="Date de Retour">{loan.dateRetour.split('T')[0]}</td>
              <td data-label="Actions">
                <Link to={`/loans/${loan.id}`}>
                  <button>Détails</button>
                </Link>
                {user.role === 'administrateur' && (
                  <Link to={`/edit-loan/${loan.id}`}>
                    <button>Modifier</button>
                  </Link>
                )}
                {user.role === 'administrateur' && (
                  <button onClick={() => handleDelete(loan.id)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loans;
