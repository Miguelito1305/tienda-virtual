const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const path = require('path');


// Configuración de multer para almacenamiento local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Asignar un nombre único a cada archivo
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 }, // Limitar el tamaño de la imagen a 1MB
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Extensiones permitidas
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes en formato jpeg, jpg o png'));
    }
  }
});

// Ruta para agregar un producto con imagen
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file.path; // Ruta de la imagen subida

    const newProduct = new Product({
      name,
      price,
      description,
      image: imageUrl // Guardar la ruta de la imagen en la base de datos
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto agregado con éxito', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar el producto', error: err.message });
  }
});


// Crear producto
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos', error: err.message });
  }
});

module.exports = router;
