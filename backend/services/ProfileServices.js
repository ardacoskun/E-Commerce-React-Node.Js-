const axios = require("axios");

const getCartCount = async (config) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/cart?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  return data.items;
};

const getWishlistCount = async (config) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/cart?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  return data.items;
};

module.exports = {
  getCartCount,
  getWishlistCount,
};
