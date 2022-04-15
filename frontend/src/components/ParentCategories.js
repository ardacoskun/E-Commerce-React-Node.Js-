import React from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const ParentCategories = ({ category }) => {
  const { parentId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Card className="my-3 p-3 rounded text-center">
        <a href={`category/${category._id}`}>
          <Card.Img src={`/images/${category.image}`} variant="top" />
        </a>
        <Card.Text>{category.name}</Card.Text>
        <Card.Body className="text-center">
          <Card.Text>{category.page_description}</Card.Text>
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/${parentId}/${category.name.toLowerCase()}`)
            }
          >
            View Products
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ParentCategories;
