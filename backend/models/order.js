const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postal: { type: String, required: true },
  order: [
    {
      meal: { type: ObjectId, ref: 'Meal' },
      amount: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);