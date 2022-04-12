import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data } = await axios.get("/categories");
    setCategories(data);
  };

  return (
    <>
      <div>Home Page</div>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
