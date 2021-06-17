const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        processor: { type: String },
        memory: { type: String },
        gpu: { type: String },
        ssd: { type: String },
        hdd: { type: String },
        stars: { type: Number },
        image: { type: String, required: true },
        stock: { type: Number, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
