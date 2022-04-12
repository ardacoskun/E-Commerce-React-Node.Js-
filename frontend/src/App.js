import React from "react";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import NavbarItem from "./components/NavbarItem";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <>
      <NavbarItem />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
