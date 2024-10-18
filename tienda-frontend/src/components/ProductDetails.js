// src/components/ProductDetails.js

import React from 'react';

const ProductDetails = ({ product, onBack, addToCart }) => {
  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Añadir al Carrito</button>
      <button onClick={onBack}>Volver a la lista</button>
    </div>
  );
};

export default ProductDetails;
