const router = require("express").Router();
const OrderController = require("../controllers/orderController");

router.post("/payment", OrderController.payment);

router.get("/orders", OrderController.getOrders);

router.post("/orders", OrderController.createOrder);

module.exports = router;
