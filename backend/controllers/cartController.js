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

  const cartProducts = response.data.items;
  const cartProductsIds = CartServices.getProductIds(cartProducts);

  const cartProductsVariants =
    CartServices.cartProductsVariantsId(cartProducts);

  const allCartProducts = await CartServices.getCartProducts(cartProductsIds);
  const colors = CartServices.getVariantColors(
    allCartProducts,
    cartProductsVariants
  );
  const sizes = CartServices.getVariantSizes(
    allCartProducts,
    cartProductsVariants
  );
  const widths = CartServices.getVariantWidths(
    allCartProducts,
    cartProductsVariants
  );

  const productNames = CartServices.getProductNames(allCartProducts);
  const productImages = CartServices.getProductImages(allCartProducts);

  res
    .status(200)
    .send({ colors, sizes, widths, cartProducts, productNames, productImages });
};

const addItemToCart = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, quantity, productAttributes, endpoint } = req.body;

  const productVariants = await CartServices.getSingleProductVariants(
    productId
  );

  const variantId = CartServices.findVariantId(
    productVariants,
    productAttributes
  );

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const { data } = await axios.post(
    `${process.env.BASE_URL}/${endpoint}/addItem`,
    productData,
    config
  );

  res.status(201).send(data);
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
  res.status(202).json(response.data);
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  changeQuantityOfItem,
};
