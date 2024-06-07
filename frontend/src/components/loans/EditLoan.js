import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import loanService from '../../services/loanService';
import '../../cssComponents/EditLoan.css';
import Popup from '../Popup'; // Import du composant Popup

// Composant EditLoan
const EditLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loanData, setLoanData] = useState({
    idLivre: '',
    dateEmprunt: '',
    dateRetour: ''
  });

  const [showPopup, setShowPopup] = useState(false); // Nouvel état pour contrôler l'affichage du popup
  const [popupMessage, setPopupMessage] = useState(''); // Nouvel état pour le message du popup

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const data = await loanService.getLoanById(id);
        setLoanData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du prêt :', error);
      }
    };

    fetchLoanData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoanData((prevLoanData) => ({
      ...prevLoanData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loanService.updateLoan(id, loanData);
      setPopupMessage('Modifications enregistrées avec succès!'); // Message de succès pour le popup
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        navigate(`/loans/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prêt :', error);
      setPopupMessage('Erreur lors de la mise à jour du prêt.'); // Message d'erreur pour le popup
      setShowPopup(true); // Afficher le popup en cas d'erreur
    }
  };

  // Affichage du formulaire de modification de prêt
  return (
    <div className="edit-loan-container">
      <Link to="/loans">Annuler</Link>
      <h2 className="edit-loan-header">Modifier un prêt</h2>
      <form className="edit-loan-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idLivre">ID du Livre:</label>
          <input type="text" id="idLivre" name="idLivre" value={loanData.idLivre} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="dateEmprunt">Date d'emprunt :</label>
          <input type="date" id="dateEmprunt" name="dateEmprunt" value={loanData.dateEmprunt} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="dateRetour">Date de retour :</label>
          <input type="date" id="dateRetour" name="dateRetour" value={loanData.dateRetour} onChange={handleInputChange} required />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />} {/* Affichage du popup */}
    </div>
  );
};

export default EditLoan;
