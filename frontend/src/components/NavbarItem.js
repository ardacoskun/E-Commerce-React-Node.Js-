import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarItem = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">OSF Digital</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categories/mens">
                  Mens
                </NavDropdown.Item>
                <NavDropdown.Item href="/categories/womens">
                  Womens
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/signin">
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
              <Nav.Link href="/wishlist">
                <i className="fas fa-heart"></i> Wishlist
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavbarItem;
