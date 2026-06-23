const express = require('express');
const router = express.Router();
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
  exportExpenses,
} = require('../controllers/expense.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/summary').get(protect, getExpenseSummary);
router.route('/export').get(protect, exportExpenses);
router.route('/').get(protect, getExpenses).post(protect, setExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
