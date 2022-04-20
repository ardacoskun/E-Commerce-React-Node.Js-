import React from "react";

const ProductVariations = ({ item, name, handleChange }) => {
  return (
    <div role="group" className="btn-group" style={{ margin: "3px" }}>
      <input
        type="radio"
        id={item.value}
        value={item.name}
        name={name}
        autoComplete="off"
        className="btn-check"
        onChange={handleChange}
        required
      />
      <label className="btn btn-outline-info mb-4" htmlFor={item.value}>
        {item.name}
      </label>
    </div>
  );
};

export default ProductVariations;
