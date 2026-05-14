const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['income','expense'],
        required: true,
    },
    category: {
        type: String,
        enum: ['food','transport','shopping','salary','entertainment','health','other'],
        default: 'other'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    note: {
        type: String,
        trim: true
    }
} ,{
    timestamps : true
});

module.exports = mongoose.model('Expense',expenseSchema);