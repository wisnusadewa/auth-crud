// const Product = require('../models/productModels');

// CREATE PRODUCT
// const createProduct = async (req, res, next) => {
//   try {
//     const newProduct = new Product({
//       name: req.body.name,
//       price: req.body.price,
//     });
//     const item = await newProduct.save();
//     res.status(201).json({ item: item, message: 'product berhasil dibuat' });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { createProduct };

// GET ALL PRODUCT
// const getProduct = async (req, res, next) => {
//   try {
//     const item = await Product.find();
//     res.json(item);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { getProduct };
