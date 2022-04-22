import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import WishlistProduct from "../components/WishlistProduct";
import { useAppContext } from "../context/appContext";

const WishlistPage = () => {
  const { wishlist, getCart } = useAppContext();

  useEffect(() => {
    getCart("wishlist");
  }, []);

  return (
    <Row>
      {wishlist.map((product, index) => (
        <Col md={6} lg={4} xl={3} key={index}>
          <WishlistProduct product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default WishlistPage;
