const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();
const { adminGet } = require("../controllers/admin.controller");

router.get("/", [isAdmin], adminGet);

module.exports = router;
