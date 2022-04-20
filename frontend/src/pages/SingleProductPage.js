import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";

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
      `/${parentId}/${subcategoryId}/${productCategoryId}/${productId}`
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

              {product.variation_attributes[0] && (
                <ListGroupItem>
                  <p style={{ fontWeight: "bold" }}>Color</p>

                  {product.variation_attributes[0].values.map((item) => (
                    <div
                      role="group"
                      class="btn-group"
                      style={{ margin: "3px" }}
                    >
                      <input
                        type="radio"
                        id={`select-${item.value}`}
                        value={item.name}
                        name="color"
                        autoComplete="off"
                        class="btn-check"
                        required
                      />
                      <label
                        class="btn btn-outline-info mb-4"
                        htmlFor={`select-${item.value}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </ListGroupItem>
              )}
              {product.variation_attributes[1] && (
                <ListGroupItem>
                  <p style={{ fontWeight: "bold" }}>Size</p>
                  {product.variation_attributes[1].values.map((item) => (
                    <div
                      role="group"
                      class="btn-group"
                      style={{ margin: "3px" }}
                    >
                      <input
                        type="radio"
                        id={`select-${item.value}`}
                        value={item.name}
                        name="size"
                        autoComplete="off"
                        class="btn-check"
                        required
                      />
                      <label
                        class="btn btn-outline-info mb-4"
                        htmlFor={`select-${item.value}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </ListGroupItem>
              )}

              {product.variation_attributes[2] && (
                <ListGroupItem>
                  <p style={{ fontWeight: "bold" }}>Width</p>
                  {product.variation_attributes[2].values.map((item) => (
                    <div
                      role="group"
                      class="btn-group"
                      style={{ margin: "3px" }}
                    >
                      <input
                        type="radio"
                        id={`select-${item.value}`}
                        value={item.name}
                        name="width"
                        autoComplete="off"
                        class="btn-check"
                        required
                      />
                      <label
                        class="btn btn-outline-info mb-4"
                        htmlFor={`select-${item.value}`}
                      >
                        {item.name}
                      </label>
                    </div>
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
      )}
    </>
  );
};

export default SingleProductPage;
