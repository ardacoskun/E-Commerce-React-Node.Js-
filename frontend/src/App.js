import React from "react";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import NavbarItem from "./components/NavbarItem";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
const App = () => {
  return (
    <>
      <NavbarItem />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:parentId" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
