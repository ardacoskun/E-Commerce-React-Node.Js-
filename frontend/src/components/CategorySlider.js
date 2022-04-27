import React from "react";
import { Carousel, Image } from "react-bootstrap";

const CategorySlider = () => {
  const data = [
    "../images/categories/womens-accessories.jpg",
    "../images/categories/mens-accessories-ties.png",
    "../images/categories/womens-clothing-tops.png",
    "../images/categories/mens-clothing-sportscoats.png",
  ];

  return (
    <Carousel pause="hover" className="bg-dark">
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <Image
            src={item}
            alt={`category_${index}`}
            fluid
            style={{ width: "100%" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CategorySlider;
