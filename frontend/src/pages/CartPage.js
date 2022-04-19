import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartPage = () => {
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col md={2}>
                <Image src="product" alt="product" fluid rounded />
              </Col>
              <Col md={3}></Col>
              <Col md={2}>$100</Col>
              <Col md={2}>
                <Form.Control as="select" value="3">
                  <option key="1" value="3">
                    2
                  </option>
                </Form.Control>
              </Col>

              <Col md={2}>
                <Button type="button" variant="light">
                  <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Total</h2>$ 100
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block">
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
