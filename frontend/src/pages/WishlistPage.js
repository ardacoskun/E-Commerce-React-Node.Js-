import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import WishlistProduct from "../components/WishlistProduct";
import { useAppContext } from "../context/appContext";

const WishlistPage = () => {
  const {
    getCart,
    wishlist,
    wishlistImages,
    wishlistNames,
    isLoading,
    isAlert,
    alertMessage,
  } = useAppContext();

  useEffect(() => {
    getCart("wishlist");
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {isAlert ? (
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {alertMessage}
        </h1>
      ) : (
        wishlist.length > 0 && (
          <Row>
            {wishlist.map((product, index) => (
              <Col md={6} lg={4} xl={3} key={index}>
                <WishlistProduct
                  product={product}
                  wishlistImages={wishlistImages}
                  wishlistNames={wishlistNames}
                  index={index}
                />
              </Col>
            ))}
          </Row>
        )
      )}
    </>
  );
};

export default WishlistPage;
