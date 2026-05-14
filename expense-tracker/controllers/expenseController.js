const Expense = require('../models/Expense');

// ADD an expense or income
const addExpense = async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    const expense = await Expense.create({
      user: req.user._id, // comes from auth middleware
      title,
      amount,
      type,
      category,
      date,
      note
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all expenses for logged-in user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE an expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure the expense belongs to the logged-in user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET summary — total income, total expense, balance
const getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });

    const totalIncome = expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalIncome - totalExpense;

    // Group expenses by category
    const byCategory = expenses.reduce((acc, e) => {
      if (e.type === 'expense') {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
      }
      return acc;
    }, {});

    res.json({
      totalIncome,
      totalExpense,
      balance,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, getSummary, updateExpense };