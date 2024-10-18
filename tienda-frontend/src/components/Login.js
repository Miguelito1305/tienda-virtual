// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que este archivo exista y esté configurado

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Almacenar el token en el localStorage
        onLogin(); // Cambiar estado de autenticación tras éxito
      } else {
        setErrorMessage(data.message || 'Error al iniciar sesión'); // Mostrar el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.'); // Manejo de errores de red
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar el error si hay */}
      
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit">Iniciar Sesión</button>
        <div className="register-link">
        <p>¿No tienes una cuenta? <button onClick={() => {}}>Regístrate</button></p>
        </div>
      </form>
    </div>
  );
};

export default Login;



