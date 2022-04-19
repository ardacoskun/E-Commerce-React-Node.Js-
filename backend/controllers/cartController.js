const axios = require("axios");

const getCart = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${process.env.BASE_URL}/cart?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  res.status(200).json(response.data);
};

const addItemToCart = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/cart/addItem`,
    req.body,
    config
  );
  res.status(201).json(response.data);
};

module.exports = { getCart, addItemToCart };
