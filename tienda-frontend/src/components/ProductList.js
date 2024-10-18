import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onProductSelect }) => {
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
    <div>
      <h2>Lista de Productos</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <img 
              src={`http://localhost:5000/${product.image}`} 
              alt={product.name} 
              width="200" 
            />
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => onProductSelect(product)}>Seleccionar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

