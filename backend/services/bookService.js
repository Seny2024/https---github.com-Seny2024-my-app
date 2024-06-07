
// Ce module permet de récupérer des livres depuis l'API Google Books en utilisant une requête spécifique. 
// Les résultats sont formatés pour correspondre à la structure de la base de données locale.

const axios = require('axios');
const config = require('../config/config');

const fetchBooksFromGoogleBooks = async (query, maxResults = 10) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        maxResults: maxResults,
        key: config.googleBooksApiKey,
      },
    });
    return response.data.items.map((item) => ({
      titre: item.volumeInfo.title,
      auteur: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
      anneePublication: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate.split('-')[0]) : null,
      genre: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
      resume: item.volumeInfo.description || 'No description available',
      disponible: true,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des livres de Google Books :', error);
    return [];
  }
};

module.exports = fetchBooksFromGoogleBooks;
