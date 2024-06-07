const express = require('express');
const router = express.Router();
const { register, login, getUser, updateUser, deleteUser, profile, getAllUsers } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes Utilisateurs
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);
router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.get('/', authenticateToken, getAllUsers);

module.exports = router;
