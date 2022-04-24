const router = require("express").Router();
const OrderController = require("../controllers/orderController");

router.post("/payment", OrderController.payment);

module.exports = router;
