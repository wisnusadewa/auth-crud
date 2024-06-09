const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// KONFIGURASI CORS MIDDLEWARE
app.use(cors());

// app.use(
//   cors({
//     origin: ['http://localhost:5173/', 'https://auth-crud-web.vercel.app/login'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'token'],
//     credentials: true,
//   })
// );

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// PARSING JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(cookieParser());

// ROUTE
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);

// MONGODB CONNECTION
// 'mongodb://127.0.0.1:27017/authentication'

const mongoURI = process.env.MONGODB_URL;

mongoose
  .connect(mongoURI)
  .then(() => console.log('connect to mongodb'))
  .catch((error) => console.error('failed to connect mongodb', error));

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

// FOR VERCEL
module.exports = app;
