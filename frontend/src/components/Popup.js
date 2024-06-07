import React from 'react';
import '../cssComponents/Popup.css'; // Assurez-vous de créer ce fichier CSS

// Composant Popup pour afficher les messages contextuels
const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;
