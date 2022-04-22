import React, { useEffect } from "react";
import WishlistProduct from "../components/WishlistProduct";
import { useAppContext } from "../context/appContext";

const WishlistPage = () => {
  const { wishlist, getCart } = useAppContext();

  useEffect(() => {
    getCart("wishlist");
  }, []);

  return (
    <div>
      {wishlist.map((product) => (
        <WishlistProduct product={product} />
      ))}
    </div>
  );
};

export default WishlistPage;
