import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useAppContext } from "../context/appContext";

const WishlistProduct = ({ product, wishlistImages, wishlistNames, index }) => {
  const { removeCartItem, addItemToCart, increaseCartItem, decreaseCartItem } =
    useAppContext();

  return (
    <Card className="my-3 p-3 rounded ">
      <Card.Img
        src={`images/${wishlistImages[index]}`}
        style={{ height: "300px" }}
      />

      <Card.Body>
        <Card.Title as="div">
          <b>{wishlistNames[index]}</b>
        </Card.Title>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Col>
            <div className="quantity-container">
              <span
                className="quantity-cursor"
                onClick={() =>
                  increaseCartItem(
                    product.productId,
                    product.variant.product_id,
                    product.quantity,
                    "wishlist"
                  )
                }
              >
                +
              </span>
              <div className="quantity-amount">{product.quantity}</div>
              <span
                className="quantity-cursor"
                onClick={() =>
                  decreaseCartItem(
                    product.productId,
                    product.variant.product_id,
                    product.quantity,
                    "wishlist"
                  )
                }
              >
                -
              </span>
            </div>
          </Col>
          <Card.Text as="h4">{product.variant.price}$</Card.Text>
        </Col>
        <Row>
          <Button
            variant="danger"
            className="my-3"
            onClick={() =>
              removeCartItem(
                product.productId,
                product.variant.product_id,
                "wishlist"
              )
            }
          >
            Remove{" "}
          </Button>
          <Button variant="primary">Add to Cart </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WishlistProduct;
