import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../context/appContext";
import Search from "./Search";

const NavbarItem = () => {
  const { user, logout } = useAppContext();

  return (
    <header>
      <Navbar bg="danger" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Alibazon</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Search />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <LinkContainer to="/mens">
                <Nav.Link>Mens</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/womens">
                <Nav.Link>Womens</Nav.Link>
              </LinkContainer>

              {user && (
                <>
                  <LinkContainer to="/wishlist">
                    <Nav.Link>
                      <i className="fas fa-heart"></i> Wishlist
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i> Cart
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {user ? (
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavbarItem;
