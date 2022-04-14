import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to="/">
        <Card.Img
          src={`/images/${product.image_groups[0].images[0].link}`}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to="/">
          <Card.Title as="div">
            <b>{product.name}</b>
          </Card.Title>
        </Link>
        <Card.Text as="div" className="my-3">
          {product.page_description}
        </Card.Text>
        <Card.Text as="h4">
          {product.price} {product.currency}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
