const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        adress: { type: String, required: true },
        city: { type: String, required: true },
        orders: [{ type: mongoose.Types.ObjectId, ref: "Orders" }],
    },
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
