const Product = require('../models/productModels');

const postProduct = async (req, res, next) => {
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
};

const getProduct = async (req, res, next) => {
  try {
    const getData = await Product.find();
    res.json(getData);
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
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
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.productId;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'product berhasil di hapus' });
};

module.exports = { postProduct, getProduct, editProduct, deleteProduct };
