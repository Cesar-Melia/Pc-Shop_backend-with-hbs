const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find().populate("orders");
        return res.status(200).render("users", { users });
    } catch (error) {
        return next(error);
    }
});

router.put("/add-order", async (req, res, next) => {
    try {
        const { orderId, userId } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { orders: orderId },
            },
            { new: true }
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
