// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();

// Suponiendo que tienes un modelo de pedidos
const Order = require('../models/Order');

// Ruta para procesar el pago
router.post('/', async (req, res) => {
    const { paymentMethod, totalAmount, cart } = req.body;

    
    // Validación básica de los campos
    if (!paymentMethod) {
        return res.status(400).json({ message: 'Método de pago es requerido' });
    }

    if (!totalAmount || totalAmount <= 0) {
        return res.status(400).json({ message: 'El total debe ser mayor que cero' });
    }

    if (!cart || cart.length === 0) {
        return res.status(400).json({ message: 'El carrito no puede estar vacío' });
    }


    const newOrder = new Order({
        paymentMethod,
        totalAmount,
        items: cart.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price
        })),
        date: new Date(),
        status: 'Pending'
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json({ message: 'Compra procesada exitosamente', order: savedOrder });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({ message: 'Error al procesar la compra' });
    }
});

module.exports = router;
