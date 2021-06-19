const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/file.middleware");
const Product = require("../models/Product.model");
const router = express.Router();

router.get("/", [isAdmin], async (req, res, next) => {
    try {
        const products = await Product.find();
        return res
            .status(200)
            .render("products", { user: req.user, products, isAdmin: req.isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.get("/shop", async (req, res, next) => {
    try {
        const products = await Product.find();

        return res.status(200).render("shop", {
            user: req.user._id,
            products,
            isAdmin: req.isAdmin,
        });
    } catch (error) {
        return next(error);
    }
});

router.get("/create", [isAdmin], (req, res, next) => {
    return res.render("create-product", { user: req.user, isAdmin: req.isAdmin });
});

router.post("/create", [isAdmin], [upload.single("image")], async (req, res, next) => {
    try {
        const { name, price, description, type, processor, memory, gpu, ssd, hdd, stars, stock } =
            req.body;

        const image = req.file ? req.file.filename : "";

        const newProduct = new Product({
            name,
            price,
            description,
            type,
            processor,
            memory,
            gpu,
            ssd,
            hdd,
            stars,
            image,
            stock,
        });

        const createProduct = await newProduct.save();

        return res.status(201).json(createProduct);
    } catch (error) {
        return next(error);
    }
});

router.put("/edit", [isAdmin], async (req, res, next) => {
    console.log("Endpoint EDIT");
    try {
        const {
            _id,
            name,
            price,
            description,
            type,
            processor,
            memory,
            gpu,
            ssd,
            hdd,
            stars,
            image,
            stock,
        } = req.body;

        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (price) fieldsToUpdate.price = Number(price);
        if (description) fieldsToUpdate.description = description;
        if (type) fieldsToUpdate.type = type;
        if (processor) fieldsToUpdate.processor = processor;
        if (memory) fieldsToUpdate.memory = memory;
        if (gpu) fieldsToUpdate.gpu = gpu;
        if (ssd) fieldsToUpdate.ssd = ssd;
        if (hdd) fieldsToUpdate.hdd = hdd;
        if (stars) fieldsToUpdate.stars = Number(stars);
        if (image) fieldsToUpdate.image = image;
        if (stock) fieldsToUpdate.stock = stock;

        const updatedProduct = await Product.findByIdAndUpdate(_id, fieldsToUpdate, { new: true });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        // return res.status(200).render("product", { user: req.user, product, isAdmin: req.isAdmin });

        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
});

router.delete("/:_id", [isAdmin], async (req, res, next) => {
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
