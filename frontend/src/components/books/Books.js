import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookService from '../../services/bookService';
import AuthContext from '../../contexts/AuthContext'; // Importer le contexte d'authentification
import '../../cssComponents/Books.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

// Composant Books
const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext); // Récupérer l'utilisateur depuis le contexte
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Fonction pour ajouter un prêt
  const handleAddLoan = (bookId) => {
    if (user && user.id) {
      navigate(`/add-loan/${user.id}/${bookId}`);
    } else {
      console.error('User ID is not set');
    }
  };

  // Fonction pour supprimer un livre
  const handleDelete = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
    }
  };

  // Fonction pour filtrer les livres selon la recherche
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredBooks = books.filter(book =>
      book.titre.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
    return filteredBooks;
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  const filteredBooks = handleSearch();

  return (
    <div className="books-container">
      <h2 className="books-header">Liste des Livres</h2>
      <div className="search-and-add-container">
        {/* Bouton pour ajouter un livre (visible pour les administrateurs) */}
        {user && user.role === 'administrateur' && (
          <Link to="/books/add">
            <button className="add-book-button">Ajouter un livre</button>
          </Link>
        )}
        {/* Champ de recherche */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche par titre ou genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Tableau des livres */}
      <table className="books-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Genre</th>
            <th>Année de publication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td data-label="Titre">{book.titre}</td>
              <td data-label="Auteur">{book.auteur}</td>
              <td data-label="Genre">{book.genre}</td>
              <td data-label="Année de publication">{book.anneePublication}</td>
              <td data-label="Actions">
                {/* Lien pour éditer le livre */}
                <Link to={`/books/${book.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                {/* Bouton pour ajouter un prêt */}
                <FontAwesomeIcon icon={faPlus} onClick={() => handleAddLoan(book.id)} />
                {/* Bouton pour supprimer le livre (visible pour les administrateurs) */}
                {user && user.role === 'administrateur' && (
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(book.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
