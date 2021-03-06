import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Subcategories from "../components/Subcategories";
import axios from "axios";
import { useParams } from "react-router-dom";

const SubCategoryPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { subcategoryId, parentId } = useParams();

  useEffect(() => {
    getSubCategories();
  }, []);

  const getSubCategories = async () => {
    const { data } = await axios.get(`/api/${parentId}/${subcategoryId}`);

    setSubCategories(data);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1)}
      </h1>
      <Col>
        {subCategories.map((subCategory) => (
          <Subcategories key={subCategory?._id} subCategory={subCategory} />
        ))}
      </Col>
    </>
  );
};

export default SubCategoryPage;
