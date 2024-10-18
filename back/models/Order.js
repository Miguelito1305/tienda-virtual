// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);

