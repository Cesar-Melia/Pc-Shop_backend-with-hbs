const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", [isAdmin], (req, res) => {
    let isAdmin;
    if (req.user && req.user.role === "admin") {
        isAdmin = true;

        return res.status(200).render("admin", { user: req.user, isAdmin });
    }

    return res.status(200).render("index", { user: req.user, isAdmin });
});

module.exports = router;
