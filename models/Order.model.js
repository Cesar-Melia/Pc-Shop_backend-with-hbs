const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "Users" },
        products: [{ type: mongoose.Types.ObjectId, ref: "Products" }],
        date: { type: String, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
