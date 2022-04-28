const axios = require("axios");
const CartServices = require("../services/CartServices");
const OutOfStockError = require("../errors/outOfStockError");

const getWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${process.env.BASE_URL}/wishlist?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  const wishlistProducts = data.items;
  const wishlistProductsIds = await CartServices.getProductIds(
    wishlistProducts
  );
  const productInfo = await CartServices.getProductInfos(wishlistProductsIds);

  res.status(200).send({
    productImages: (await productInfo).productImages,
    productNames: (await productInfo).productsNames,
    response: data.items,
  });
};
const addItemToWishlist = async (req, res) => {
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
    `${process.env.BASE_URL}/wishlist/addItem`,
    productData,
    config
  );
  res.status(201).json(response.data);
};
const removeItemFromWishlist = async (req, res) => {
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
    url: `${process.env.BASE_URL}/wishlist/removeItem`,
    data: productData,
    headers: config.headers,
  });

  res.status(202).json({ msg: "Item removed from the wishlist" });
};

const changeQuantityOfWishlistItem = async (req, res) => {
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
    `${process.env.BASE_URL}/wishlist/changeItemQuantity`,
    productData,
    config
  );
  res.status(202).json(response.data);
};

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  changeQuantityOfWishlistItem,
};
