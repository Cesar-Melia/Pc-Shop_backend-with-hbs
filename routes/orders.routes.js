const express = require("express");
const Order = require("../models/Order.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.find().populate("users").populate("products");

        return res.status(200).render("orders", { user: req.user, orders });
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("users").populate("products");

        return res.status(200).render("order", { user: req.user, order });
    } catch (error) {
        return next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const { user, products, date } = req.body;
        const newOrder = new Order({ user, products, date });

        const createdOrder = await newOrder.save();

        return res.status(200).render("order", { user: req.user, createdOrder });
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
