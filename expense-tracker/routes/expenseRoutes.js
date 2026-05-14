const express = require('express');
const router = express.Router();
const{ protect}= require('../middleware/authMiddleware');
const {
    addExpense,
    getExpenses,
    deleteExpense,
    getSummary,
    updateExpense

} = require('../controllers/expenseController');

router.post('/', protect, addExpense);
router.get('/', protect, getExpenses);
router.get('/summary', protect, getSummary);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;