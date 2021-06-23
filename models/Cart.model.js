const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
