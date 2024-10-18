const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Ruta o URL de la imagen
    required: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
