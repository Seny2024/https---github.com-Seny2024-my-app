import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import bookService from '../../services/bookService';
import AuthContext from '../../contexts/AuthContext';
import '../../cssComponents/BookDetail.css'; // Import du fichier CSS

// Composant BookDetail
const BookDetail = () => {
  const { user } = useContext(AuthContext); // Récupérer le contexte de l'utilisateur
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Gérer l'édition du livre
  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  // Gérer la suppression du livre
  const handleDelete = async () => {
    try {
      await bookService.deleteBook(id);
      navigate('/books'); // Rediriger vers la page principale ou une autre page après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du livre!', error);
    }
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!book) {
    return <p>Livre non trouvé.</p>;
  }

  const { titre, auteur, anneePublication, genre, resume, disponible } = book;

  return (
    <div className="book-detail-container">
      <Link to="/books">Retour</Link>
      <h2 className="book-detail-header">{titre}</h2>
      <div className="book-info">
        <p>Auteur : {auteur}</p>
        <p>Année de publication : {anneePublication}</p>
        <p>Genre : {genre}</p>
        <p>Résumé : {resume}</p>
        <p>Disponible : {disponible ? 'Oui' : 'Non'}</p>
      </div>
      {user && user.role === 'administrateur' && (
        <div className="book-detail-buttons">
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
