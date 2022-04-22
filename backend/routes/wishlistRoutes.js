const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

router.get("/", wishlistController.getWishlist);

router.post("/addItem", wishlistController.addItemToWishlist);

router.delete("/removeItem", wishlistController.removeItemFromWishlist);

router.post(
  "/changeItemQuantity",
  wishlistController.changeQuantityOfWishlistItem
);

module.exports = router;
