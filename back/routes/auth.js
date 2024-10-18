// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');  // Usa bcryptjs para encriptar contraseñas
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modelo de usuario
const router = express.Router();



// Ruta de inicio de sesión

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Aquí puedes generar un token o realizar cualquier otra acción
      res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });

// Ruta de registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya está registrado' });
    }

    // Crear nuevo usuario
    user = new User({
      email,
      password,
    });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    await user.save();

    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' }); // Cambia 'secreto' por una clave secreta adecuada

    // Enviar token al cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});




module.exports = router;

