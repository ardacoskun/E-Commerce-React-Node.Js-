import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const initialState = {
    color: "",
    size: "",
    width: "",
  };
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.id });
  };

  const getVariantId = () => {
    let variantId = 0;

    const products = product.variants;
    for (let variant of products) {
      const values = variant.variation_values;

      const color = data.color;
      const size = data.size;
      const width = data.width;

      if (color.length > 0 && size.length > 0 && width.length > 0) {
        if (
          color === values.color &&
          size === values.size &&
          width === values.width
        ) {
          variantId = variant.product_id;
        }
      } else if (color.length <= 0 && size.length > 0 && width.length > 0) {
        if (
          size === values.size ||
          (size === values.accessorySize && width === values.width)
        ) {
          variantId = variant.product_id;
        }
      } else if (color.length > 0 && size.length > 0 && width.length <= 0) {
        if (
          size === values.size ||
          (size === values.accessorySize && width === values.color)
        ) {
          variantId = variant.product_id;
        }
      } else if (color.length > 0 && size.length <= 0 && width.length > 0) {
        if (color === values.color && width === values.color) {
          variantId = variant.product_id;
        }
      } else if (color.length > 0 && size.length <= 0 && width.length <= 0) {
        if (color === values.color) {
          variantId = variant.product_id;
        }
      } else if (color.length <= 0 && size.length <= 0 && width.length > 0) {
        if (width === values.width) {
          variantId = variant.product_id;
        }
      } else if (color.length <= 0 && size.length > 0 && width.length <= 0) {
        if (size === values.size || size === values.accessorySize) {
          variantId = variant.product_id;
        }
      } else {
        variantId = variant.product_id;
      }
    }
    if (variantId === 0) {
      return false;
    } else {
      return variantId;
    }
  };

  const variantData = getVariantId();

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
                <ProductVariations
                  item={item}
                  name="color"
                  handleChange={handleChange}
                />
              ))}
            </ListGroupItem>
          )}
          {product.variation_attributes[1] && (
            <ListGroupItem>
              <p style={{ fontWeight: "bold" }}>Size</p>
              {product.variation_attributes[1].values.map((item) => (
                <ProductVariations
                  item={item}
                  name="size"
                  handleChange={handleChange}
                />
              ))}
            </ListGroupItem>
          )}

          {product.variation_attributes[2] && (
            <ListGroupItem>
              <p style={{ fontWeight: "bold" }}>Width</p>
              {product.variation_attributes[2].values.map((item) => (
                <ProductVariations
                  item={item}
                  name="width"
                  handleChange={handleChange}
                />
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
