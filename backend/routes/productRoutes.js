const express = require('express');
const router = express.Router();

const Product = require('../models/productModels');

// POST
router.post('/products', async (req, res, next) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
    });
    const item = await newProduct.save();
    res.status(201).json({ item: item, message: 'produk berhasil dibuat' });
  } catch (error) {
    next(error);
  }
});

// GET ALL DATA
router.get('/products', async (req, res, next) => {
  try {
    const getData = await Product.find();
    res.json(getData);
  } catch (error) {
    next(error);
  }
});

// PATCH
// router.patch('/products/:productId', async (req, res, next) => {
//   try {
//     const productId = req.params.productId; // Parameter ID yang di assign
//     const updates = req.body; // request
//     const product = await Product.find({}).then((product) => product._id === productId); // Object dengan ID yang sama dengan Parameter // Object awal akan di UPDATE dengan req.body

//     Object.keys(updates).forEach((key) => {
//       product[key] = updates[key];
//     });

//     res.status(201).json({ product: product, message: 'data diperbarui' });
//   } catch (error) {
//     next(error);
//   }
// });

// PUT
router.put('/products/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    product.name = req.body.name;
    product.price = req.body.name;

    const updateProduct = await product.save();
    res.status(201).json({ produk_update: updateProduct, message: 'product berhasil di update' });
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete('/products/:productId', async (req, res, next) => {
  const id = req.params.productId;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'product berhasil di hapus' });
});

// EXPORT
module.exports = router;
