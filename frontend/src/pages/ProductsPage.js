import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products.js";
import Loading from "../components/Loading.js";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const { parentId, subcategoryId, productCategoryId } = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/${parentId}/${subcategoryId}/${productCategoryId}`
      );
      setProducts(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response.data;
      if (errorMsg.statusCode === 400 && errorMsg.msg.includes("Found")) {
        setAlert("Sorry, There Are No Products In This Collection");
      } else {
        setAlert("Something went wrong");
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {alert ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>{alert}</h1>
          <Link to="/">BACK TO HOMEPAGE</Link>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ProductsPage;
