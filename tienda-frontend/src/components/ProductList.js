import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  
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

  // Manejar la adición al carrito y redirigir al carrito
  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart'); // Redirige al carrito después de agregar
  };

  return (
    <div className="product-list-section">
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img 
              src={product.imageUrl ? product.imageUrl : `http://localhost:5000/${product.image}`} 
              alt={product.name} 
              width="200" 
            />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;




