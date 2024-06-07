import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import '../../cssComponents/EditAddBook.css';
import Popup from '../Popup'; // Import du composant Popup

// Composant AddBook
const AddBook = () => {
  const [book, setBook] = useState({
    titre: '',
    auteur: '',
    anneePublication: '',
    genre: '',
    resume: '',
    disponible: true,
  });

  const history = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage du popup
  const [popupMessage, setPopupMessage] = useState(''); // État pour le message du popup

  // Gérer les modifications des champs de saisie
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // Soumettre le formulaire
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await bookService.createBook(book);
      setPopupMessage('Livre ajouté avec succès!'); // Message de succès pour le popup
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        history('/books');
      }, 2000);
    } catch (error) {
      console.error('Échec de la création du livre', error);
      setPopupMessage('Erreur lors de l\'ajout du livre.'); // Message d'erreur pour le popup
      setShowPopup(true); // Afficher le popup en cas d'erreur
    }
  };

  return (
    <div className="edit-book-container">
      <Link to="/books">Retour</Link>
      <h2 className="edit-book-header">Ajouter un livre</h2>
      <form className="edit-book-form" onSubmit={handleFormSubmit}>
        <label htmlFor="titre">Titre :</label>
        <input type="text" id="titre" name="titre" value={book.titre} onChange={handleInputChange} required />
        <label htmlFor="auteur">Auteur :</label>
        <input type="text" id="auteur" name="auteur" value={book.auteur} onChange={handleInputChange} required />
        <label htmlFor="anneePublication">Année de publication :</label>
        <input type="number" id="anneePublication" name="anneePublication" value={book.anneePublication} onChange={handleInputChange} required />
        <label htmlFor="genre">Genre :</label>
        <input type="text" id="genre" name="genre" value={book.genre} onChange={handleInputChange} required />
        <label htmlFor="resume">Résumé :</label>
        <textarea id="resume" name="resume" value={book.resume} onChange={handleInputChange} required />
        <label htmlFor="disponible">Disponible :</label>
        <input type="checkbox" id="disponible" name="disponible" checked={book.disponible} onChange={handleInputChange} />
        <button type="submit">Ajouter le livre</button>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />} {/* Affichage du popup */}
    </div>
  );
};

export default AddBook;
