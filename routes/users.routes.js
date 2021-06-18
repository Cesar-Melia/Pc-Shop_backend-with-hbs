const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const User = require("../models/User.model");

const router = express.Router();

router.get("/", [isAdmin], async (req, res, next) => {
    try {
        let isAdmin;
        if (req.user && req.user.role === "admin") {
            isAdmin = true;
        }

        const users = await User.find().populate("orders");
        return res.status(200).render("users", { user: req.user, users, isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.get("/edit", [isAdmin], async (req, res, next) => {
    try {
        let isAdmin;
        if (req.user && req.user.role === "admin") {
            isAdmin = true;
        }

        const { _id, user, products, date } = req.body;

        const fieldsToUpdate = {};
        if (user) fieldsToUpdate.user = user;
        if (products) fieldsToUpdate.products = products;
        if (date) fieldsToUpdate.date = date;

        const updatedOrder = await User.findByIdAndUpdate(_id, fieldsToUpdate, { new: true });

        return res.status(200).render("user", { user: req.user, updatedOrder, isAdmin });
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        let isAdmin;
        if (req.user && req.user.role === "admin") {
            isAdmin = true;
        }

        const { id } = req.params;
        const userDetail = await User.findById(id);

        return res.status(200).render("user", { user: req.user, userDetail, isAdmin });
    } catch (error) {
        return next(error);
    }
});

// router.put("/add-order", async (req, res, next) => {
//     try {
//         const { orderId, userId } = req.body;

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 $addToSet: { orders: orderId },
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedUser);
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = router;
