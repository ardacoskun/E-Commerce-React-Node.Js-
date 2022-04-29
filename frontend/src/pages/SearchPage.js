import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SearchedProduct from "../components/SearchedProduct";

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSearchedProducts();
  }, [keyword]);

  const getSearchedProducts = async () => {
    try {
      const { data } = await axios.get(`/api/search/?keyword=${keyword}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        setAlert(error.response.data.msg);
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
        products.length > 0 && (
          <Row>
            {products.map((product, index) => (
              <Col md={6} lg={4} xl={3} key={index}>
                <SearchedProduct product={product} index={index} />
              </Col>
            ))}
          </Row>
        )
      )}
    </>
  );
};

export default SearchPage;
