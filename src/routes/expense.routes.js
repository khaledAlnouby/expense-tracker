const express = require('express');
const router = express.Router();
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/').get(protect, getExpenses).post(protect, setExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
