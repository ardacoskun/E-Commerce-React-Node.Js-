import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const SearchedProduct = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded ">
      <Card.Img
        src={`/images/${product.image_groups[0].images[0].link}`}
        style={{ height: "300px" }}
      />

      <Card.Body>
        <Card.Title as="div">
          <b>{product.name}</b>
        </Card.Title>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Card.Text as="h4" style={{ marginBottom: "10px" }}>
            {product.price}$
          </Card.Text>
        </Col>
        <Row>
          <Button variant="primary">Buy Now </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SearchedProduct;
