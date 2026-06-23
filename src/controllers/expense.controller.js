const Expense = require('../models/expense.model');
const { Parser } = require('json2csv');

// @desc    Get expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res, next) => {
  try {
    const { category, minAmount, maxAmount, startDate, endDate } = req.query;
    let query = { user: req.user.id };

    if (category) query.category = category;
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

// @desc    Set expense
// @route   POST /api/expenses
// @access  Private
const setExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, description } = req.body;

    if (!title || !amount || !category) {
      res.status(400);
      throw new Error('Please add title, amount, and category fields');
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date: date ? new Date(date) : Date.now(),
      description,
      user: req.user.id,
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the expense user
    if (expense.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the expense user
    if (expense.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await expense.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly expense summary
// @route   GET /api/expenses/summary
// @access  Private
const getExpenseSummary = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1; // 1-12

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const summary = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

// @desc    Export expenses to CSV
// @route   GET /api/expenses/export
// @access  Private
const exportExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).lean();
    
    if (!expenses.length) {
      res.status(404);
      throw new Error('No expenses to export');
    }

    const fields = ['title', 'amount', 'category', 'date', 'description'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
  exportExpenses,
};
