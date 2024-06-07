const express = require('express');
const router = express.Router();
const { getLoans, getLoan, addLoan, updateLoan, deleteLoan } = require('../controllers/loanController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes Prêts
router.get('/', authenticateToken, getLoans);
router.get('/:id', authenticateToken, getLoan);
router.post('/', authenticateToken, addLoan);
router.put('/:id', authenticateToken, updateLoan);
router.delete('/:id', authenticateToken, deleteLoan);

module.exports = router;
