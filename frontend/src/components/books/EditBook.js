import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import '../../cssComponents/EditAddBook.css';
import Popup from '../Popup'; // Import du composant Popup

// Composant EditBook
const EditBook = () => {
  const [book, setBook] = useState({
    titre: '',
    auteur: '',
    anneePublication: '',
    genre: '',
    resume: '',
    disponible: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // Nouvel état pour contrôler l'affichage du popup
  const [popupMessage, setPopupMessage] = useState(''); // Nouvel état pour le message du popup

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(id);
        setBook(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du livre :', error);
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumettre le formulaire pour mettre à jour le livre
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await bookService.updateBook(id, book);
      setPopupMessage('Modifications enregistrées avec succès!'); // Message de succès pour le popup
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        navigate('/books');
      }, 2000);
    } catch (error) {
      console.error('Échec de la mise à jour du livre :', error);
      setPopupMessage('Erreur lors de la mise à jour.'); // Message d'erreur pour le popup
      setShowPopup(true); // Afficher le popup en cas d'erreur
    }
  };

  // Si le chargement est en cours, afficher un message de chargement
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  // Affichage du formulaire de modification du livre
  return (
    <div className="edit-book-container">
      <h2 className="edit-book-header">Modifier un livre</h2>
      <form className="edit-book-form" onSubmit={handleFormSubmit}>
        <label htmlFor="titre">Titre :</label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={book.titre}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="auteur">Auteur :</label>
        <input
          type="text"
          id="auteur"
          name="auteur"
          value={book.auteur}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="anneePublication">Année de publication :</label>
        <input
          type="number"
          id="anneePublication"
          name="anneePublication"
          value={book.anneePublication}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="genre">Genre :</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={book.genre}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="resume">Résumé :</label>
        <textarea
          id="resume"
          name="resume"
          value={book.resume}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="disponible">Disponible :</label>
        <input
          type="checkbox"
          id="disponible"
          name="disponible"
          checked={book.disponible}
          onChange={handleInputChange}
        />
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <Link to={`/books`}><button className="book-return-button">Annuler</button></Link>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />} {/* Affichage du popup */}
    </div>
  );
};

export default EditBook;
