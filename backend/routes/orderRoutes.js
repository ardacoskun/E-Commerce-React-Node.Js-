const router = require("express").Router();
const OrderController = require("../controllers/orderController");

router.get("/", OrderController.getOrders);

router.post("/", OrderController.createOrder);

module.exports = router;
