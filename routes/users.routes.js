const express = require("express");
const { usersGet, editPut, userDelete, userIdGet } = require("../controllers/users.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", isAdmin, usersGet);

router.put("/edit", isAdmin, editPut);

router.delete("/:id", isAdmin, userDelete);

router.get("/:id", userIdGet);

module.exports = router;
