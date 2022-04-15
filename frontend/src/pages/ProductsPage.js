import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products.js";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { parentId, subcategoryId, productCategoryId } = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data } = await axios.get(
      `/${parentId}/${subcategoryId}/${productCategoryId}`
    );
    setProducts(data);
  };
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
