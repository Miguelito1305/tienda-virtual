// index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const checkoutRoutes = require('./routes/checkoutRoutes');
const auth = require('./routes/auth');


const app = express(); // Asegúrate de que `app` esté declarado antes de `app.use()`
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Habilitar la carpeta 'uploads' para que sea accesible desde el navegador
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// MongoDB Connection
const dbURI = 'mongodb+srv://miguelcarabali13:dgWGMsrR_2Lcv.%23@cluster0.yoi5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Importa las rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

// Rutas
app.use('/api/products', productRoutes);
app.use('/api', authRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Bienvenido a la tienda virtual');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
