const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    adress: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    orders: [{ type: mongoose.Types.ObjectId, ref: 'Orders' }],
    cart: { type: mongoose.Types.ObjectId, ref: 'Carts' },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
  },
  { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
