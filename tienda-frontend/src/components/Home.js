import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; 
import logo from '../assets/logo.png'; 

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" /> 
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Encuentra los mejores productos a los mejores precios</p>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

