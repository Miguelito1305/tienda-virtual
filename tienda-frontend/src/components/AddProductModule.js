// src/components/AddProductModule.js

import React from 'react';
import AddProduct from './AddProduct'; // Asegúrate de que esta ruta sea correcta

const AddProductModule = ({ onProductAdded }) => {
  return (
    <div>
      <h2>Agregar Producto</h2>
      <AddProduct onProductAdded={onProductAdded} />
    </div>
  );
};

export default AddProductModule;
