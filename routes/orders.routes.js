const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const Order = require("../models/Order.model");

const router = express.Router();

router.get("/", [isAdmin], async (req, res, next) => {
    try {
        const orders = await Order.find().populate("users").populate("products");

        return res.status(200).render("orders", { user: req.user, orders, isAdmin: req.isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        let isAdmin;
        if (req.user && req.user.role === "admin") {
            isAdmin = true;
        }

        const { user, products, date } = req.body;
        const newOrder = new Order({ user, products, date });

        const createdOrder = await newOrder.save();

        console.log(createdOrder);

        return res.status(200).render("order", { user: req.user, createdOrder, isAdmin });
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

router.get("/edit", [isAdmin], async (req, res, next) => {
    try {
        const { _id, user, products, date } = req.body;

        const fieldsToUpdate = {};
        if (user) fieldsToUpdate.user = user;
        if (products) fieldsToUpdate.products = products;
        if (date) fieldsToUpdate.date = date;

        const updatedOrder = await Order.findByIdAndUpdate(_id, fieldsToUpdate, { new: true });

        return res
            .status(200)
            .render("order", { user: req.user, updatedOrder, isAdmin: req.isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("users").populate("products");

        return res.status(200).render("order", { user: req.user, order, isAdmin: req.isAdmin });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
