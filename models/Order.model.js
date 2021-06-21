const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: "Products" },
                quantity: { type: Number },
            },
        ],
        date: { type: Number, required: true },
        adress: { type: String, required: true },
        isPaid: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
