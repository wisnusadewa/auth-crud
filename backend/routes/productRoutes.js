const express = require('express');
const { postProduct, getProduct, editProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// POST
router.post('/products', postProduct);

// GET ALL DATA
router.get('/products', getProduct);

// PUT
router.put('/products/:productId', editProduct);

// DELETE
router.delete('/products/:productId', deleteProduct);

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
// EXPORT
module.exports = router;
