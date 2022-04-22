import React from "react";
import { Card, Button, Row } from "react-bootstrap";

const WishlistProduct = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src="https://camkumu.com/wp-content/themes/456ecology/assets//img/no-product-image.png" />

      <Card.Body>
        <Card.Title as="div">
          <b>Product Name</b>
        </Card.Title>
        <Card.Text as="div" className="my-3"></Card.Text>
        <Card.Text as="h4">100 USD</Card.Text>
        <Row>
          <Button variant="danger">Remove </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WishlistProduct;
