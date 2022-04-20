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

  const { productId, variantId, quantity } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/cart/addItem`,
    productData,
    config
  );
  res.status(201).json(response.data);
};

const removeItemFromCart = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/cart/removeItem`,
    data: req.body,
    headers: config.headers,
  });

  res.status(202).json({ msg: "Item removed from the cart" });
};

const changeQuantityOfItem = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/cart/changeItemQuantity`,
    req.body,
    config
  );
  res.status(200).json(response.data);
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  changeQuantityOfItem,
};
