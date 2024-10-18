// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Asegúrate de que esta ruta sea correcta

const app = express();
const PORT = process.env.PORT || 5000;

const productRoutes = require('./routes/products');

app.use('/api/products', productRoutes);


// Middleware
app.use(cors()); // Habilitar CORS para permitir solicitudes desde diferentes dominios
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// MongoDB Connection
const dbURI = 'mongodb+srv://miguelcarabali13:dgWGMsrR_2Lcv.%23@cluster0.yoi5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión:', err));

// Usar rutas de autenticación
app.use('/api', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

