const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", [isAdmin], (req, res) => {
    return res.status(200).render("admin", { user: req.user, isAdmin: req.isAdmin });
});

module.exports = router;
