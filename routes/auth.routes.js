const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/register", (req, res, next) => {
    return res.render("register");
});

router.post("/register", (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            console.log(error);
            return res.render("error", { message: error.message });
        }
        console.log(user);
        return res.redirect("/products");
    };
    passport.authenticate("register", done)(req);
});

module.exports = router;
