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
import BreadCrumbs from "./components/BreadCrumbs";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  return (
    <>
      <NavbarItem />
      <BreadCrumbs />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:parentId" element={<CategoryPage />} />
            <Route
              path="/:parentId/:subcategoryId"
              element={<SubCategoryPage />}
            />
            <Route
              path="/:parentId/:subcategoryId/:productCategoryId"
              element={<ProductsPage />}
            />
            <Route
              path="/:parentId/:subcategoryId/:productCategoryId/:productId"
              element={<SingleProductPage />}
            />
            <Route path="/signin" element={<RegisterPage />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
