const express= require('express');
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const cors = require('cors');
dotenv.config();
connectDB();
const app= express();
app.use(express.json());
app.use(cors());
const authRoutes= require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.get('/',(req,res) =>{
    res.json({message: 'Expense Tracker API is running '});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));