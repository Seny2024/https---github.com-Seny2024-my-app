const express = require('express');
const router = express.Router();
const { getBooks, getBook, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes Livres
router.get('/', authenticateToken, getBooks);
router.get('/:id', authenticateToken, getBook);
router.post('/', authenticateToken, addBook);
router.put('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);

module.exports = router;
