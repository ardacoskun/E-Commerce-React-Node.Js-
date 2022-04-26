const axios = require("axios");
const OutOfStockError = require("../errors/outOfStockError");
const CartServices = require("../services/CartServices");

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

  const cartProducts = await CartServices.getCartProducts(response);
  const cartProductsIds = CartServices.getProductIds(cartProducts);
  const productInfo = CartServices.getProductInfos(cartProductsIds);

  res.status(200).send({
    productImages: (await productInfo).productImages,
    productNames: (await productInfo).productsNames,
    response: response.data.items,
  });
};

const addItemToCart = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, productAttributes, productVariants, quantity } = req.body;

  const variantId = CartServices.getVariantId(
    productAttributes,
    productVariants
  );

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

  const { productId, variantId } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
  };

  await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/cart/removeItem`,
    data: productData,
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

  const { productId, variantId, quantity } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/cart/changeItemQuantity`,
    productData,
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
