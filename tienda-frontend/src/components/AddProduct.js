import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css'; 

const AddProduct = ({ onProductAdded }) => {
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]); 
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('image', productImage);

    try {
      
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

     
      if (response.status === 200 || response.status === 201) {
        setMessage('Producto agregado con éxito');
        if (onProductAdded) {
          onProductAdded(response.data); 
        }

       
        setTimeout(() => {
          navigate('/products');
        }, 2000);

     
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
      } else {
        setErrorMessage('Hubo un problema al agregar el producto. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      setErrorMessage('Hubo un error al agregar el producto.');
    }
  };

  return (
    <div className="add-product-section">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar mensaje de error si lo hay */}
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Mostrar mensaje de éxito si lo hay */}
      
      <form onSubmit={handleSubmit} className="add-product-form">
        <label htmlFor="productName">Nombre del Producto</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label htmlFor="productPrice">Precio</label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />

        <label htmlFor="productDescription">Descripción</label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />

        <label htmlFor="productImage">Imagen del Producto</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;









