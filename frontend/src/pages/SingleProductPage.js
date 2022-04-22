import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleProduct from "../components/SingleProduct";

const SingleProductPage = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { parentId, subcategoryId, productCategoryId, productId } = useParams();

  useEffect(() => {
    getProduct();
  }, [loading]);

  const getProduct = async () => {
    const { data } = await axios.get(
      `/${parentId}/${subcategoryId}/${productCategoryId}/${productId}`
    );

    setProduct(data[0]);

    setLoading(false);
  };
  return (
    <>
      {loading ? <div>Loading .... </div> : <SingleProduct product={product} />}
    </>
  );
};

export default SingleProductPage;
