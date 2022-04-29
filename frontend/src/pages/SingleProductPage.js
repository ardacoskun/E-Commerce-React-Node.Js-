import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleProduct from "../components/SingleProduct";
import Loading from "../components/Loading";

const SingleProductPage = () => {
  const [product, setProduct] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { parentId, subcategoryId, productCategoryId, productId } = useParams();

  useEffect(() => {
    getProduct();
  }, [loading]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/${parentId}/${subcategoryId}/${productCategoryId}/${productId}`
      );

      setProduct(data[0]);
      setLoading(false);
    } catch (error) {
      setErrorMsg("Product in not found");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SingleProduct product={product} errorMsg={errorMsg} />
      )}
    </>
  );
};

export default SingleProductPage;
