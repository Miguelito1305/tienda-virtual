import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => { // Asegúrate de recibir la prop correctamente
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Para almacenar la imagen seleccionada

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Obtener la imagen seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image); // Añadir la imagen al formulario

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Producto agregado con éxito:', response.data);
      onProductAdded(response.data); // Llama a la función pasada como prop
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;




