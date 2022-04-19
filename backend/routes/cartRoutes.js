const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authCheck = require("../middleware/authCheck");

router.get("/", authCheck, cartController.getCart);

router.post("/addItem", authCheck, cartController.addItemToCart);

module.exports = router;
