import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankTransferDetails, setBankTransferDetails] = useState(''); 

  
  const totalAmount = cart.reduce((total, product) => total + product.price, 0);

  const handlePayment = (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    
    if (paymentMethod === 'creditCard' && (!cardName || !cardNumber || !cvc)) {
      alert('Por favor, completa los datos de la tarjeta.');
      return;
    }

    if (paymentMethod === 'paypal' && !paypalEmail) {
      alert('Por favor, ingresa un correo electrónico de PayPal.');
      return;
    }

    if (paymentMethod === 'bankTransfer' && !bankTransferDetails) {
      alert('Por favor, ingresa los detalles de la transferencia bancaria.');
      return;
    }

    
    setIsProcessing(true);

    
    setTimeout(() => {
      setIsProcessing(false);

      
      if (paymentMethod === 'creditCard') {
        setPaymentStatus('success');
        alert(`Pago con tarjeta de crédito por $${totalAmount.toFixed(2)} en ${installments} cuota(s) realizado con éxito.`);
      } else if (paymentMethod === 'paypal') {
        setPaymentStatus('success');
        alert(`Pago con PayPal por $${totalAmount.toFixed(2)} realizado con éxito.`);
      } else if (paymentMethod === 'bankTransfer') {
        setPaymentStatus('pending');
        alert('Transferencia bancaria en proceso. Verificaremos tu pago en breve.');
      } else {
        setPaymentStatus('failure');
        alert('Error al procesar el pago. Por favor, intenta de nuevo.');
      }
    }, 2000);

    console.log('Método de pago:', paymentMethod);
    console.log('Total a pagar:', totalAmount);
  };

  
  if (cart.length === 0) {
    return <div className="cart">El carrito está vacío.</div>;
  }

  return (
    <div className="cart">
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item._id} className="cart-item">
            {/* Mostrar la imagen del producto */}
            <img src={item.image} alt={item.name} className="cart-item-image" />

            {/* Información del producto */}
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="cart-total">Total: ${totalAmount.toFixed(2)}</h3>

      <form className="payment-form" onSubmit={handlePayment}>
        <h4>Selecciona un método de pago</h4>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Seleccione un método</option>
          <option value="creditCard">Tarjeta de Crédito</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">Transferencia Bancaria</option>
        </select>

        {/* Mostrar campos adicionales para tarjeta de crédito */}
        {paymentMethod === 'creditCard' && (
          <div className="credit-card-form">
            <label>
              Nombre en la tarjeta:
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </label>

            <label>
              Número de tarjeta:
              <input
                type="text"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </label>

            <label>
              CVC:
              <input
                type="text"
                maxLength="3"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </label>

            <label>
              Número de cuotas:
              <select
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                required
              >
                <option value="1">1 cuota</option>
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
              </select>
            </label>
          </div>
        )}

        {/* Mostrar campos adicionales para PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="paypal-form">
            <label>
              Correo de PayPal:
              <input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        {/* Mostrar campos adicionales para Transferencia Bancaria */}
        {paymentMethod === 'bankTransfer' && (
          <div className="bank-transfer-form">
            <label>
              Detalles de la transferencia bancaria:
              <textarea
                value={bankTransferDetails}
                onChange={(e) => setBankTransferDetails(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Procesando...' : 'Realizar Pago'}
        </button>
      </form>

      {/* Mostrar el estado del pago si ha sido procesado */}
      {paymentStatus && (
        <div className={`payment-status ${paymentStatus}`}>
          {paymentStatus === 'success' && <p>Pago realizado con éxito.</p>}
          {paymentStatus === 'pending' && <p>Transferencia en proceso. Esperando confirmación.</p>}
          {paymentStatus === 'failure' && <p>Error en el pago. Por favor, intenta de nuevo.</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;




