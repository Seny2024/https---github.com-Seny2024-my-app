// backend/controllers/bookController.js

const db = require('../models/index'); 
const { Book } = db;

// Controller to get all books
async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller to get a single book by ID
async function getBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller to add a new book
async function addBook(req, res) {
  const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
  try {
    const newBook = await Book.create({ titre, auteur, anneePublication, genre, resume, disponible });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller to update a book by ID
async function updateBook(req, res) {
  const { id } = req.params;
  const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update({ titre, auteur, anneePublication, genre, resume, disponible });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller to delete a book by ID
async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook };
