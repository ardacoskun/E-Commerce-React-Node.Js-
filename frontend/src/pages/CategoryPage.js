import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import ParentCategories from "../components/ParentCategories";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const { parentId } = useParams();

  useEffect(() => {
    getCategories();
  }, [parentId]);

  const getCategories = async () => {
    const { data } = await axios.get(`/${parentId}`);
    setCategories(data);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Mens</h1>
      <p style={{ textAlign: "center" }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur ab
        nam quis quisquam dolorem distinctio animi, itaque temporibus nisi
        earum?
      </p>
      <Col>
        <ul>
          {categories.map((category) => (
            <ParentCategories key={category?.name} category={category} />
          ))}
        </ul>
      </Col>
    </>
  );
};

export default CategoryPage;
