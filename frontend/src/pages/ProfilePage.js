import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Badge } from "react-bootstrap";
import FormGroup from "../components/FormGroup";
import { useAppContext } from "../context/appContext";

const ProfilePage = () => {
  const { user } = useAppContext();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/profile", config);

      setCartCount(data.cartCount.length);
      setWishlistCount(data.wishlistCount.length);
    } catch (error) {}
  };

  return (
    <>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button variant="dark">
              Cart <Badge bg="danger">{cartCount}</Badge>
            </Button>
            <Button variant="danger">
              Wishlist <Badge bg="dark">{wishlistCount}</Badge>
            </Button>
          </div>
        </Form>
      </Col>
    </>
  );
};

export default ProfilePage;
