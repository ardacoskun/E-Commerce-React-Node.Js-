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
  } = useAppContext();

  const sumOfPrices = [];
  const [total, setTotal] = useState();

  useEffect(() => {
    getCart();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cart.length > 0 ? (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cart.map((item, index) => (
              <ListGroup variant="flush" key={index}>
                <ListGroup.Item>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={2}>
                      <Image src="product" alt="product" fluid rounded />
                    </Col>

                    <Col md={3}>Product Name</Col>

                    <Col md={2}>
                      <div className="quantity-container">
                        <span
                          className="quantity-cursor"
                          onClick={() =>
                            increaseCartItem(
                              item.productId,
                              item.variant.product_id,
                              item.quantity
                            )
                          }
                        >
                          +
                        </span>
                        <div className="quantity-amount">{item.quantity}</div>
                        <span className="quantity-cursor">-</span>
                      </div>
                    </Col>

                    <Col md={2} style={{ fontSize: "20px" }}>
                      $
                      {item.variant.price.toFixed(2) * item.quantity.toFixed(2)}
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          removeCartItem(
                            item.productId,
                            item.variant.product_id
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
                  <h2>Total</h2>$ {total.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="btn-block">
                    Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <div>Empty Card</div>
      )}
    </>
  );
};

export default CartPage;
