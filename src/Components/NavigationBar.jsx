import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavbarToggle } from "react-bootstrap";

//Navbar.Brand, Navbar.Toggle, Navbar.Collapse,Nav.Link
function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
      <NavbarToggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link as={NavLink} to="/" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-customer/" activeclassname="active">
            Add Customer
          </Nav.Link>
          <Nav.Link as={NavLink} to="/customers" activeclassname="active">
            Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
            Add-Product
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" activeclassname="active">
            Products
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
