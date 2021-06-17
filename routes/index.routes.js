const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let isAdmin;
    if (req.user && req.user.root === "admin") {
        isAdmin = true;
    }

    return res.status(200).render("index", { user: req.user, isAdmin });
});

module.exports = router;
