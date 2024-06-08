const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// MONGODB CONNECTION
// 'mongodb://127.0.0.1:27017/authentication'

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connect to mongodb'))
  .catch((error) => console.error('failed to connect mongodb', error));

const app = express();

// KONFIGURASI CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://auth-crud-web.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
  })
);

// PARSING JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTE
app.use('/api/auth', authRoutes);
app.use('/api/auth', productRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});

module.exports = app;
