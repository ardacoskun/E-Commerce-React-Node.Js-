import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  ListGroup,
  Button,
  ListGroupItem,
  Card,
  Image,
} from "react-bootstrap";
import { useAppContext } from "../context/appContext";
import ProductVariations from "./ProductVariations";

const SingleProduct = ({ product }) => {
  const { sendProductToCart } = useAppContext();

  const initialState = {
    color: "",
    size: "",
    width: "",
  };

  const [data, setData] = useState(initialState);
  const [count, setCount] = useState(1);
  const [alert, setAlert] = useState("");
  const attributeLength = product.variation_attributes.length;

  //increase product quantity
  const increase = () => {
    setCount(() => count + 1);
  };

  //decrease porduct quantity
  const decrease = () => {
    if (count > 1) {
      setCount(() => count - 1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, [2000]);
  }, [alert]);

  const addProductToCart = (productId, quantity, endpoint) => {
    if (attributeLength < 1) {
      return setAlert("Product is not available");
    }

    const variants = product.variants;

    const color = data.color;
    const size = data.size;
    const width = data.width;

    for (let variant of variants) {
      const values = variant.variation_values;
      if (
        (values.color && !color) ||
        (values.size && !size) ||
        (values.width && !width)
      ) {
        return setAlert("Please provide all values");
      }
    }

    const productAttributes = {
      color,
      size,
      width,
    };

    const productVariants = product.variants;

    sendProductToCart(
      productId,
      productAttributes,
      productVariants,
      quantity,
      endpoint
    );
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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

              {product.variation_attributes[0].values.map((item, index) => (
                <ProductVariations
                  key={index}
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
              {product.variation_attributes[1].values.map((item, index) => (
                <ProductVariations
                  key={index}
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
              {product.variation_attributes[2].values.map((item, index) => (
                <ProductVariations
                  key={index}
                  item={item}
                  name="width"
                  handleChange={handleChange}
                />
              ))}
            </ListGroupItem>
          )}

          <ListGroup.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <b>
              {product.currency} {product.price}{" "}
            </b>
            {attributeLength < 1 ? (
              <Button variant="dark" disabled>
                <i className="fas fa-heart"></i> Add to Wishlist
              </Button>
            ) : (
              <Button
                onClick={() => addProductToCart(product.id, count, "wishlist")}
              >
                <i className="fas fa-heart"></i> Add to Wishlist
              </Button>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row style={{ display: "flex", alignItems: "center" }}>
                <Col>QTY</Col>
                <Col>
                  <div className="quantity-container">
                    <span className="quantity-cursor" onClick={increase}>
                      +
                    </span>
                    <div className="quantity-amount">{count}</div>
                    <span className="quantity-cursor" onClick={decrease}>
                      -
                    </span>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price:</Col>
                <Col>
                  <b>{Number(product.price * count).toFixed(2)} $</b>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {attributeLength < 1 ? (
                <Button className="w-100" type="button" disabled variant="dark">
                  Add To Cart
                </Button>
              ) : (
                <Button
                  className="w-100"
                  type="button"
                  onClick={() => addProductToCart(product.id, count, "cart")}
                >
                  Add To Cart
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        {alert && <b style={{ color: "red" }}>{alert}</b>}
      </Col>
    </Row>
  );
};

export default SingleProduct;
