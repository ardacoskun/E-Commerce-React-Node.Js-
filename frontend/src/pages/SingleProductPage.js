import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

const SingleProductPage = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { parentId, subcategoryId, productCategoryId, productId } = useParams();

  useEffect(() => {
    getProduct();
  }, [loading]);

  useEffect(() => {}, []);

  const getProduct = async () => {
    const { data } = await axios.get(
      `/categories/${parentId}/${subcategoryId}/${productCategoryId}/${productId}`
    );

    setProduct(data[0]);

    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <div>Loading .... </div>
      ) : (
        <Row>
          <Col md={4}>
            <Image
              src={`/images/${product.image_groups[0].images[0].link}`}
              alt={product.name}
              fluid
            />
          </Col>

          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.page_description}</p>
              </ListGroup.Item>
              <ListGroup.Item>Color:RED</ListGroup.Item>
              <ListGroup.Item>Size:42</ListGroup.Item>

              <ListGroup.Item>
                <b>
                  {product.currency} {product.price}{" "}
                  <Button>Add to Wishlist</Button>
                </b>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>QTY</Col>
                    <Col>
                      <b>12</b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>
                      <b>{product.price}</b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="w-100" type="button">
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SingleProductPage;
