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
/*******************************  CASE 1 *******************************/
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'https://auth-crud-web.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

//DISARANKAN DARI DEVTOOLS
// Access-Control-Allow-Origin: http://localhost:5173
// Access-Control-Allow-Methods: POST
// Access-Control-Allow-Headers: Content-Type

/*******************************  CASE 2 *******************************/
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin' : '*'),
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

/*******************************  CASE 3 *******************************/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'), res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// PARSING JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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
