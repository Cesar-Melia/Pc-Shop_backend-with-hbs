const express = require("express");
const Product = require("../models/Product.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).render("products", { products });
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        return res.status(200).render("product", { product });
    } catch (error) {
        return next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const { name, price, description, stars, image } = req.body;
        const newProduct = new Product({ name, price, description, stars, image });

        const createProduct = await newProduct.save();
        return res.status(201).json(createProduct);
    } catch (error) {
        return next(error);
    }
});

router.put("/edit", async (req, res, next) => {
    console.log("Endpoint EDIT");
    try {
        const { _id, name, price, description, stars, image } = req.body;

        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (price) fieldsToUpdate.price = Number(price);
        if (description) fieldsToUpdate.description = description;
        if (stars) fieldsToUpdate.stars = Number(stars);
        if (image) fieldsToUpdate.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(_id, fieldsToUpdate, { new: true });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete("/:_id", async (req, res, next) => {
    try {
        const { _id } = req.params;
        let response = "";

        const deleted = await Product.findByIdAndDelete(_id);
        if (deleted) response = "Product deleted from db";
        else response = "Can't find a product whit this id";

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
