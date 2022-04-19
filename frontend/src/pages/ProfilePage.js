import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import FormGroup from "../components/FormGroup";
import { useAppContext } from "../context/appContext";

const ProfilePage = () => {
  const { user } = useAppContext();

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
        <FormGroup
          type="text"
          name="name"
          value={user.name}
          disabled={true}
          labelName="Name"
        />

        <FormGroup
          type="email"
          name="email"
          value={user.email}
          disabled={true}
          labelName="Email"
        />

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Ship Address</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            value="3 Linda Street
        Hackettstown, NJ 07840"
            disabled={true}
          ></Form.Control>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ProfilePage;
