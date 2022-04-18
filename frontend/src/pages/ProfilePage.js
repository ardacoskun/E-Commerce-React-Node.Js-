import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Col
      style={{
        border: "1px solid blue",
        borderRadius: "10px",
        padding: "40px 10px",
      }}
    >
      <Row md={6} style={{ display: "flex", justifyContent: "center" }}>
        <h2>Profile</h2>
      </Row>
      <Form>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" value="test" disabled></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value="test@gmail.com"
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Ship Address</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            value="3 Linda Street
        Hackettstown, NJ 07840"
            disabled
          ></Form.Control>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ProfilePage;
