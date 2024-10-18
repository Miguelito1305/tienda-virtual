// src/components/AddProductModule.js

import React from 'react';
import AddProduct from './AddProduct'; 

const AddProductModule = ({ onProductAdded }) => {
  return (
    <div>
      <h2>Agregar Producto</h2>
      <AddProduct onProductAdded={onProductAdded} />
    </div>
  );
};

export default AddProductModule;
