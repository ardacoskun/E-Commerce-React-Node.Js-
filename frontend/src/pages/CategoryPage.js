import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import ParentCategories from "../components/ParentCategories";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NotFoundPage from "./NotFound";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [rootCategories, setRootCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [alert, setAlert] = useState("");
  const { parentId } = useParams();

  useEffect(() => {
    getCategories();
  }, [parentId]);

  const getCategories = () => {
    const getRootCategories = axios.get(`/categories/${parentId}`);
    const getParentCategories = axios.get(`/${parentId}`);

    axios
      .all([getRootCategories, getParentCategories])
      .then(
        axios.spread((...allData) => {
          setRootCategories(allData[0].data);
          setParentCategories(allData[1].data);
        })
      )
      .catch((error) => {
        const errorMsg = error.response.data;
        if (errorMsg.statusCode === 400 || errorMsg.statusCode === 404) {
          setAlert(errorMsg.msg);
          setLoading(false);
        } else {
          setAlert("Something went wrong!!!");
          setLoading(false);
        }
      });
    setLoading(false);
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
        <>
          <h1 style={{ textAlign: "center" }}>{rootCategories.name}</h1>
          <p style={{ textAlign: "center" }}>
            {rootCategories.page_description}
          </p>
          <Col>
            <ul>
              {parentCategories.map((category) => (
                <ParentCategories key={category?.name} category={category} />
              ))}
            </ul>
          </Col>
        </>
      )}
    </>
  );
};

export default CategoryPage;
