import React from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SubCategoryItem = ({ subCategory }) => {
  const { parentId, subcategoryId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Card className="my-3 p-3 rounded text-center">
        <Card.Img src={`/images/${subCategory.image}`} variant="top" />

        <Card.Text>{subCategory.name}</Card.Text>
        <Card.Body className="text-center">
          <Card.Text>{subCategory.page_description}</Card.Text>
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/${parentId}/${subcategoryId}/${subCategory.id}`)
            }
          >
            View Products
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubCategoryItem;
