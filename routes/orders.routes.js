const express = require("express");
const Order = require("../models/Order.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        ////////////////////////////////////// .populate(users) no funciona!!!!!
        const orders = await Order.find().populate("users").populate("products");

        return res.status(200).json(orders);
    } catch (error) {
        return next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const { user, products, date } = req.body;
        const newOrder = new Order({ user, products, date });

        const createdOrder = await newOrder.save();

        return res.status(200).json(createdOrder);
    } catch (error) {
        next(error);
    }
});

router.put("/add-product", async (req, res, next) => {
    try {
        const { productId, orderId } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $addToSet: { products: productId },
            },
            { new: true }
        );

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
