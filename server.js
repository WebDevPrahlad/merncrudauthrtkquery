const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();
connectDB();

const app = express();

// CORS configuration with specific origin
app.use(cors({
  origin: 'https://roaring-faloodeh-9af903.netlify.app', // Replace with your Netlify domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Additional CORS headers setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://roaring-faloodeh-9af903.netlify.app'); // Replace with your Netlify domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
