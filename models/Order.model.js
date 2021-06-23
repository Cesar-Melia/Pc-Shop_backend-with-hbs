const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: "Products" },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true, default: 0 },
        totalQuantity: { type: Number, required: true, default: 0 },
        date: { type: Number, required: true },
        adress: { type: String, required: true },
        isPaid: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
