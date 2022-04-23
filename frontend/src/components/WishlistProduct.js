import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const WishlistProduct = ({ product, wishlistImages, wishlistNames, index }) => {
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
              <span className="quantity-cursor">+</span>
              <div className="quantity-amount">{product.quantity}</div>
              <span className="quantity-cursor">-</span>
            </div>
          </Col>
          <Card.Text as="h4">{product.variant.price}$</Card.Text>
        </Col>
        <Row>
          <Button variant="danger" className="my-3">
            Remove{" "}
          </Button>
          <Button variant="primary">Add to Cart </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WishlistProduct;
