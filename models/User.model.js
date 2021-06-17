const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        adress: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        orders: [{ type: mongoose.Types.ObjectId, ref: "Orders" }],
        cart: [{ type: mongoose.Types.ObjectId, ref: "Products" }],
        role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
