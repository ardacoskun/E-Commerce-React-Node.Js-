import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import ParentCategories from "../components/ParentCategories";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [rootCategories, setRootCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const { parentId } = useParams();

  useEffect(() => {
    getCategories();
  }, [parentId]);

  const getCategories = () => {
    const getRootCategories = axios.get(`/categories/${parentId}`);
    const getParentCategories = axios.get(`/${parentId}`);

    axios.all([getRootCategories, getParentCategories]).then(
      axios.spread((...allData) => {
        setRootCategories(allData[0].data);
        setParentCategories(allData[1].data);
      })
    );
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{rootCategories.name}</h1>
      <p style={{ textAlign: "center" }}>{rootCategories.page_description}</p>
      <Col>
        <ul>
          {parentCategories.map((category) => (
            <ParentCategories key={category?.name} category={category} />
          ))}
        </ul>
      </Col>
    </>
  );
};

export default CategoryPage;
