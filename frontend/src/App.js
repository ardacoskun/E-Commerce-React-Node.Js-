import React from "react";
import Footer from "./components/Footer";
import NavbarItem from "./components/NavbarItem";
import { Container } from "react-bootstrap";
const App = () => {
  return (
    <>
      <NavbarItem />
      <Container>
        <h1>OSF Digital</h1>
      </Container>
      <Footer />
    </>
  );
};

export default App;
