const stripe = require("stripe")(process.env.STRIPE_KEY);
const axios = require("axios");
const OrderServices = require("../services/OrderServices");

const payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
const getOrders = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${process.env.BASE_URL}/orders?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  const orders = OrderServices.returnItemsFromRequest(response);
  const allOrders = OrderServices.getOrderDetail(orders);
  const totalOrderPrice = OrderServices.getTotalPrice(orders);

  res
    .status(200)
    .send({ orders, allOrders: await allOrders, subTotal: totalOrderPrice });
};

const createOrder = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { address, paymentId, items } = req.body;

  const orderData = {
    secretKey: process.env.SECRET_KEY,
    address,
    paymentId,
    items,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/orders`,
    orderData,
    config
  );
  res.status(200).json(response.data);
};

module.exports = { payment, createOrder, getOrders };
