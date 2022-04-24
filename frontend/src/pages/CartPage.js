import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

import { useAppContext } from "../context/appContext";

const CartPage = () => {
  const {
    getCart,
    isAlert,
    isLoading,
    alertMessage,
    cart,
    removeCartItem,
    increaseCartItem,
    decreaseCartItem,
    cartImages,
    cartNames,
  } = useAppContext();

  const sumOfPrices = [];
  const orderVariants = [];
  const [total, setTotal] = useState();

  useEffect(() => {
    getCart("cart");
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [sumOfPrices]);

  const getTotalPrice = () => {
    cart.map((item) => {
      sumOfPrices.push(item.quantity * item.variant.price);
    });
    setTotal(sumOfPrices.reduce((acc, curr) => acc + curr, 0));
  };

  const createOrder = async () => {
    cart.map((item) => {
      orderVariants.push(item);
    });

    const orderInfo = {
      address: "home",
      paymentId: "2",
      items: orderVariants,
    };

    try {
      const response = await axios.post("/checkout/orders", orderInfo);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      {isAlert ? (
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {alertMessage}
        </h1>
      ) : (
        cart.length > 0 && (
          <Row>
            <Col md={8}>
              <h1>Shopping Cart</h1>
              {cart.map((item, index) => (
                <ListGroup variant="flush" key={index}>
                  <ListGroup.Item>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <Col md={2} key={index}>
                        <Image
                          src={`images/${cartImages[index]}`}
                          alt="product"
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>{cartNames[index]}</Col>
                      <Col md={2}>
                        <div className="quantity-container">
                          <span
                            className="quantity-cursor"
                            onClick={() =>
                              increaseCartItem(
                                item.productId,
                                item.variant.product_id,
                                item.quantity,
                                "cart"
                              )
                            }
                          >
                            +
                          </span>
                          <div className="quantity-amount">{item.quantity}</div>
                          <span
                            className="quantity-cursor"
                            onClick={() =>
                              decreaseCartItem(
                                item.productId,
                                item.variant.product_id,
                                item.quantity,
                                "cart"
                              )
                            }
                          >
                            -
                          </span>
                        </div>
                      </Col>
                      <Col md={2} style={{ fontSize: "20px" }}>
                        ${Number(item.quantity * item.variant.price).toFixed(2)}
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            removeCartItem(
                              item.productId,
                              item.variant.product_id,
                              "cart"
                            )
                          }
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Total</h2>$ {Number(total).toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={createOrder}
                    >
                      Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default CartPage;
