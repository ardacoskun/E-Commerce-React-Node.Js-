import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarItem from "./components/NavbarItem";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
const App = () => {
  return (
    <>
      <NavbarItem />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:parentId" element={<CategoryPage />} />
            <Route
              path="/categories/:parentId/:subcategoryId"
              element={<SubCategoryPage />}
            />
            <Route
              path="/categories/:parentId/:subcategoryId/:productCategoryId"
              element={<ProductsPage />}
            />
            <Route
              path="/categories/:parentId/:subcategoryId/:productCategoryId/:productId"
              element={<SingleProductPage />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
