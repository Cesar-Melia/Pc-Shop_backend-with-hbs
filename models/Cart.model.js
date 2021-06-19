const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: "Products" },
                quantity: { type: Number },
            },
        ],
        total: { type: Number },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
