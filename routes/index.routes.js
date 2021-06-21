const express = require("express");
const router = express.Router();
const { indexGet } = require("../controllers/index.controller");

router.get("/", indexGet);

module.exports = router;
