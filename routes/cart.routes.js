const express = require("express");
const Cart = require("../models/Cart.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        let cart = await Cart.find().populate("user").populate("products");

        console.log("La cesta: ", cart);

        //return res.status(200).json(cart);

        return res.status(200).render("cesta", { user: req.user, cart, isAdmin: req.isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const { user, products, quantity, total } = req.body;

        const newCart = new Cart({
            user,
            products,
            total,
        });

        const createdCart = await newCart.save();

        return res.status(201).json(createdCart);
    } catch (error) {
        return next(error);
    }
});

router.get("/:user", async (req, res, next) => {
    try {
        const { user } = req.params;

        let cart = await Cart.find({ user: user }).populate("user").populate("products");
        cart = cart[0];

        return res.status(200).json(cart);
    } catch (error) {
        return next(error);
    }
});

router.put("/add-product", async (req, res, next) => {
    try {
        const { productId, quantity, cartId } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $addToSet: { products: { product: productId, quantity: quantity } },
            },
            { new: true }
        );

        return res.status(200).json(updatedCart);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
