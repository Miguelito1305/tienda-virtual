// src/components/Cart.js

import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  if (cart.length === 0) {
    return <div className="cart">El carrito está vacío.</div>;
  }

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
