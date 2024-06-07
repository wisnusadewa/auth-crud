const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// MIDDEWARE
app.use(cors());
app.options('*', cors());
app.use(bodyparser.json());
app.use(express.json());

// COBA CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// ROUTE
app.use('/api/auth', authRoutes);
app.use('/api/auth', productRoutes);

// MONGODB CONNECTION
// 'mongodb://127.0.0.1:27017/authentication'

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connect to mongodb'))
  .catch((error) => console.error('failed to connect mongodb', error));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statuCode = err.statuCode || 500;
  err.status = err.status || 'error';

  res.status(err.statuCode).json({
    status: err.status,
    message: err.message,
  });
});

// SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});
