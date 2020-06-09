import React, { Component } from "react";
import { Navbar, NavbarBrand, Spinner } from "reactstrap";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed="top">
          <NavbarBrand>codesatori</NavbarBrand>
        </Navbar>
        <div
          style={{
            left: "50%",
            position: "fixed",
            top: "50%",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }
}
