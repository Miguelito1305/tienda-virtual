// src/components/ProductDetails.js
import React from 'react';


const ProductDetails = ({ product, onBack, addToCart }) => {
  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={onBack}>Volver</button>
      <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

export default ProductDetails;

