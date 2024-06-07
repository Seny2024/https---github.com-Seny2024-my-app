import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../cssComponents/Register.css'; // Import du fichier CSS
import Popup from './Popup'; // Importer le composant Popup

// Composant pour l'inscription des utilisateurs
const Register = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setPassword] = useState('');
  const [role, setRole] = useState('utilisateur');
  const { register } = useContext(AuthContext);
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Ajouter l'état pour la popup
  const [popupMessage, setPopupMessage] = useState('');

  // Gestion de la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(nom, email, motDePasse, role);
      setPopupMessage('Inscription réussie!\nPassez à l\'authentification en vous connectant');
      setShowPopup(true); // Afficher la popup
      setTimeout(() => {
        setShowPopup(false);
        history('/login');
      }, 3000); // Masquer la popup après 3 secondes
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de l\'inscription.');
    }
  };

  // Affichage du formulaire d'inscription
  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Nom :
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Rôle :
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="utilisateur">Utilisateur</option>
            <option value="administrateur">Administrateur</option>
          </select>
        </label>
        <button type="submit">S'inscrire</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Register;
