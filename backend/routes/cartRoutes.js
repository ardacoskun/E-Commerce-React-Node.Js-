const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);

router.post("/addItem", cartController.addItemToCart);

router.delete("/removeItem", cartController.removeItemFromCart);

router.post("/changeItemQuantity", cartController.changeQuantityOfItem);

module.exports = router;
