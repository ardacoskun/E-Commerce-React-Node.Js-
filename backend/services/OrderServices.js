const axios = require("axios");

const returnItemsFromRequest = async (request) => {
  const allProducts = request.data;
  return allProducts;
};

const getOrderDetail = async (orders) => {
  let productInfo = {};
  const allOrders = [];
  for (let order of orders) {
    const orderId = order._id;
    const address = order.address;
    const paymentId = order.paymentId;
    const orderItems = order.items;
    const singleOrder = [];
    for (let product of orderItems) {
      const productId = product.productId;
      const productUnitPrice = product.variant.price;
      const productQuantity = product.quantity;
      let productTotalPrice = productUnitPrice * productQuantity;

      const productResponse = await axios.get(
        `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
      );

      productInfo = {
        orderId,
        productId: productResponse.data[0].id,
        productName: productResponse.data[0].name,
        address,
        quantity: productQuantity,
        price: productTotalPrice,
        paymentId,
      };

      singleOrder.push(productInfo);
    }
    allOrders.push(singleOrder);
  }
  return allOrders;
};

const getTotalPrice = async (orders) => {
  const subTotal = [];
  const allPrices = [];
  for (let order of orders) {
    const orderItems = order.items;
    const singleOrderPrice = [];
    for (let product of orderItems) {
      const productUnitPrice = product.variant.price;
      const productQuantity = product.quantity;
      let productTotalPrice = productUnitPrice * productQuantity;

      singleOrderPrice.push(productTotalPrice);
    }
    allPrices.push(singleOrderPrice);
  }
  allPrices.map((item) => {
    subTotal.push(item.reduce((acc, curr) => acc + curr, 0));
  });
  return subTotal;
};

module.exports = {
  returnItemsFromRequest,
  getOrderDetail,
  getTotalPrice,
};
