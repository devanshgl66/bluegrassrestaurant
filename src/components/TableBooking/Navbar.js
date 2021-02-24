import React from "react";
import { Navbar } from "reactstrap";
import NavbarBrand from "reactstrap/lib/NavbarBrand";
const NavBar = (props) => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand
        className="nav-brand"
        onClick={() => {
          props.setpage(1);
        }}
      > 
        Dinner Restaurant
      </NavbarBrand>
    </Navbar>
  );
};

export default NavBar;
