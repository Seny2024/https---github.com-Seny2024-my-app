import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import loanService from '../../services/loanService';
import '../../cssComponents/EditLoan.css';
import Popup from '../Popup'; // Import du composant Popup

// Composant AddLoan
const AddLoan = () => {
  const navigate = useNavigate();
  const { userId, bookId } = useParams();

  const [loanData, setLoanData] = useState({
    idUtilisateur: userId,
    idLivre: bookId,
    dateEmprunt: '',
    dateRetour: ''
  });

  const [showPopup, setShowPopup] = useState(false); // Nouvel état pour contrôler l'affichage du popup
  const [popupMessage, setPopupMessage] = useState(''); // Nouvel état pour le message du popup

  useEffect(() => {
    console.log('User ID from URL params:', userId);
    console.log('Book ID from URL params:', bookId);
  }, [userId, bookId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoanData((prevLoanData) => ({
      ...prevLoanData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Loan data to be submitted:', loanData);
    try {
      await loanService.addLoan(loanData);
      setPopupMessage('Prêt ajouté avec succès!'); // Message de succès pour le popup
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        navigate('/loans');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du prêt :', error);
      setPopupMessage('Erreur lors de l\'ajout du prêt.'); // Message d'erreur pour le popup
      setShowPopup(true); // Afficher le popup en cas d'erreur
    }
  };

  // Affichage du formulaire d'ajout de prêt
  return (
    <div className="edit-loan-container">
      <Link to="/books">Retour</Link>
      <h2 className="edit-loan-header">Ajouter un prêt</h2>
      <form className="edit-loan-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idLivre">ID du Livre:</label>
          <input type="text" id="idLivre" name="idLivre" value={loanData.idLivre} readOnly />
        </div>
        <div>
          <label htmlFor="dateEmprunt">Date d'emprunt :</label>
          <input type="date" id="dateEmprunt" name="dateEmprunt" value={loanData.dateEmprunt} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="dateRetour">Date de retour :</label>
          <input type="date" id="dateRetour" name="dateRetour" value={loanData.dateRetour} onChange={handleInputChange} required />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />} {/* Affichage du popup */}
    </div>
  );
};

export default AddLoan;
