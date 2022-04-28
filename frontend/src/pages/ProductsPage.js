import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Products from "../components/Products.js";
import Loading from "../components/Loading.js";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { parentId, subcategoryId, productCategoryId } = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `/${parentId}/${subcategoryId}/${productCategoryId}`
      );
      setProducts(data);
      setLoading(false);
    } catch (error) {}
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductsPage;
