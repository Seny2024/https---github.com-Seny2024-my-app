import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Popup from './Popup'; 
import '../cssComponents/Login.css'; 

// Composant de connexion
const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const { login } = useContext(AuthContext);
  const history = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // Ajouter l'état pour la popup
  const [popupMessage, setPopupMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, motDePasse);
      setPopupMessage('Connexion réussie!');
      setShowPopup(true); // Afficher la popup
      setTimeout(() => {
        setShowPopup(false);
        history('/Dashboard');
      }, 2000); // Masquer la popup après 2 secondes
    } catch (error) {
      console.error(error);
      setPopupMessage('Erreur lors de la connexion.');
      setShowPopup(true); // Afficher la popup en cas d'erreur
    }
  };

  // Affichage du formulaire de connexion
  return (
    <div>
      <div className="header">VOTRE BIBLIOTHEQUE EN LIGNE</div> {/* Header avec fond indigo */}
      <div className="container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Mot de passe :
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Se connecter</button>
        </form>
        <p>
          Pas encore inscrit ? <Link to="/register">S'inscrire</Link>
        </p>
        {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default Login;
