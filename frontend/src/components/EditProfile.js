import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import authService from '../services/authService';
import '../cssComponents/EditProfile.css';
import Popup from './Popup';

// Composant de modification de profil
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nom: user.nom,
    email: user.email,
    motDePasse: ''
  });

  const [showPopup, setShowPopup] = useState(false); // Nouvel état pour contrôler l'affichage du popup
  const [popupMessage, setPopupMessage] = useState(''); // Nouvel état pour le message du popup

  const history = useNavigate();

  // Fonction pour gérer le changement de valeur des champs du formulaire
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Fonction pour gérer la soumission du formulaire de modification de profil
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.updateProfile(user.id, formData);
      setPopupMessage('Profil mis à jour avec succès!'); // Message de succès pour le popup
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        history('/profile');
      }, 2000); // Durée du Pop 2 secondes
    } catch (error) {
      console.error('Erreur lors de la modification du profil :', error);
      setPopupMessage('Erreur lors de la modification du profil.'); // Message d'erreur pour le popup
      setShowPopup(true); // Afficher le popup en cas d'erreur
    }
  };

  // Affichage du formulaire de modification de profil
  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-header">Modifier le profil</h2>
      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <label htmlFor="nom">Nom :</label>
        <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <label htmlFor="motDePasse">Nouveau mot de passe :</label>
        <input type="password" id="motDePasse" name="motDePasse" value={formData.motDePasse} onChange={handleInputChange} />
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <Link to={`/profile`}><button className="return-button">Annuler</button></Link>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />} {/* Affichage du popup */}
    </div>
  );
};

export default EditProfile;
