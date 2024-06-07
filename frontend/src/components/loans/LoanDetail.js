import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import loanService from '../../services/loanService';
import '../../cssComponents/LoanDetail.css'; // Import du fichier CSS

// Composant LoanDetail
const LoanDetail = () => {
  const [loan, setLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const data = await loanService.getLoanById(id);
        setLoan(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du prêt :', error);
        setIsLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  // Affichage du détail du prêt
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!loan) {
    return <p>Aucun prêt trouvé.</p>;
  }

  const { idUtilisateur, idLivre, dateEmprunt, dateRetour } = loan;

  return (
    <div className="loan-detail-container">
      <h2 className="loan-detail-header">Détails du prêt</h2>
      <div className="loan-info">
        <p><i className="fas fa-user"></i>Utilisateur : {idUtilisateur}</p>
        <p><i className="fas fa-book"></i>Livre : {idLivre}</p>
        <p><i className="fas fa-calendar-alt"></i>Date d'emprunt : {dateEmprunt.split('T')[0]}</p>
        <p><i className="fas fa-calendar-alt"></i>Date de retour : {dateRetour.split('T')[0]}</p>
      </div>
      <div className="loan-detail-buttons">
        <Link to="/loans">
          <button>Retour</button>
        </Link>
      </div>
    </div>
  );
};

export default LoanDetail;
