const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

/*
// POST
module.exports.addFormation = function (newFormation, callback) {
  Formation.create(newFormation, callback);
};

// GET ALL
module.exports.getFormations = function (callback) {
  Formation.find(callback);
};

// UPDATE

module.exports.updateFormation = function (callback) {
  Formation.findByIdAndUpdate(id, newFormation, callback);
};

// DELETE

module.exports.deleteFormation = function (callback) {
  Formation.findByIdAndRemove(id, callback);
};

// GET by ID
module.exports.deleteFormation = function (callback) {
  Formation.findByIdAndRemove(id, callback);
};
*/
