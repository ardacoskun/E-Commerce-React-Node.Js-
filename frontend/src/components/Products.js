import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Products = ({ product }) => {
  const { parentId, subcategoryId, productCategoryId } = useParams();
  const navigate = useNavigate();
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img
        src={`/images/${product.image_groups[0].images[0].link}`}
        variant="top"
      />
      <Card.Body>
        <Card.Title as="div">
          <b>{product.name}</b>
        </Card.Title>

        <Card.Text as="div" className="my-3">
          {product.page_description}
        </Card.Text>
        <Card.Text as="h4">
          {product.price} {product.currency}
        </Card.Text>
        <Button
          onClick={() =>
            navigate(
              `/${parentId}/${subcategoryId}/${productCategoryId}/${product.id}`
            )
          }
        >
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Products;
