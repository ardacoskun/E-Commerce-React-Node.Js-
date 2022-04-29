import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import StripeCheckout from "react-stripe-checkout";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const CartPage = () => {
  const {
    getCart,
    isAlert,
    isLoading,
    alertMessage,
    cart,
    colors,
    sizes,
    widths,
    removeCartItem,
    increaseCartItem,
    decreaseCartItem,
    cartImages,
    cartNames,
    user,
  } = useAppContext();

  const sumOfPrices = [];
  const orderVariants = [];
  const [total, setTotal] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    getCart("cart");
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [sumOfPrices]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.post("/api/payment", {
          tokenId: stripeToken.id,
          amount: total * 100,
        });
        const baseAddress = data.billing_details.address;

        const address =
          baseAddress.city +
          " " +
          baseAddress.line1 +
          " " +
          baseAddress.postal_code +
          " ";

        const paymentId = data.id;

        createOrder(address, paymentId);
        navigate("/orders");
      } catch (error) {
        setErrorMsg("Payment has failed!!");
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  const getTotalPrice = () => {
    cart.map((item) => {
      return sumOfPrices.push(item.quantity * item.variant.price);
    });
    setTotal(sumOfPrices.reduce((acc, curr) => acc + curr, 0));
  };

  const createOrder = async (address, paymentId) => {
    cart.map((item) => {
      return orderVariants.push(item);
    });

    const orderInfo = {
      address,
      paymentId,
      items: orderVariants,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="signin" />;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post("/api/orders", orderInfo, config);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <>
      {isAlert && alertMessage.includes("created") ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>There are no items in your cart.</h1>
          <Link to="/">Start Shopping</Link>
        </div>
      ) : (
        cart.length > 0 && (
          <Row>
            <Col md={8}>
              <h1>Shopping Cart</h1>
              {cart.map((item, index) => (
                <ListGroup variant="flush" key={index}>
                  <ListGroup.Item>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Col md={2} key={index}>
                        <Image
                          src={`images/${cartImages[index]}`}
                          alt="product"
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={4}>
                        <Row>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <h5 style={{ fontWeight: "bold" }}>
                              {cartNames[index]}
                            </h5>
                            {Object.keys(colors[index]).length > 1 && (
                              <div>
                                <span style={{ fontWeight: "30px" }}>
                                  Color:{" "}
                                </span>
                                {colors[index].color}
                              </div>
                            )}
                            {Object.keys(sizes[index]).length > 1 && (
                              <div>
                                <span style={{ fontWeight: "bold" }}>
                                  Size:{" "}
                                </span>
                                {sizes[index].size}
                              </div>
                            )}
                            {Object.keys(widths[index]).length > 1 && (
                              <div>
                                <span style={{ fontWeight: "bold" }}>
                                  Width:{" "}
                                </span>
                                {widths[index].width}
                              </div>
                            )}
                          </div>
                        </Row>
                      </Col>
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
                  <hr />
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
                    <StripeCheckout
                      name="OSF FINAL"
                      image="/images/additional/osf_digital.png"
                      email={user.email}
                      shippingAddress
                      billingAddress
                      description={`Your total is ${total}$`}
                      amount={total * 100}
                      token={onToken}
                      stripeKey={process.env.React_App_STRIPE_KEY}
                    >
                      <Button variant="primary">CHECKOUT</Button>
                    </StripeCheckout>
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
