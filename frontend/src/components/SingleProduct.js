import React from "react";
import {
  Col,
  Row,
  ListGroup,
  Button,
  ListGroupItem,
  Card,
  Image,
} from "react-bootstrap";
import ProductVariations from "./ProductVariations";

const SingleProduct = ({ product }) => {
  return (
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

          {product.variation_attributes[0] && (
            <ListGroupItem>
              <p style={{ fontWeight: "bold" }}>Color</p>

              {product.variation_attributes[0].values.map((item) => (
                <ProductVariations item={item} name="color" />
              ))}
            </ListGroupItem>
          )}
          {product.variation_attributes[1] && (
            <ListGroupItem>
              <p style={{ fontWeight: "bold" }}>Size</p>
              {product.variation_attributes[1].values.map((item) => (
                <ProductVariations item={item} name="size" />
              ))}
            </ListGroupItem>
          )}

          {product.variation_attributes[2] && (
            <ListGroupItem>
              <p style={{ fontWeight: "bold" }}>Width</p>
              {product.variation_attributes[2].values.map((item) => (
                <ProductVariations item={item} name="width" />
              ))}
            </ListGroupItem>
          )}

          <ListGroup.Item>
            <b>
              {product.currency} {product.price}{" "}
              <Button>
                <i className="fas fa-heart"></i> Add to Wishlist
              </Button>
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
  );
};

export default SingleProduct;
