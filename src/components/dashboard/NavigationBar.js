import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed="top">
          <NavbarBrand href="/">codesatori</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar></Nav>
            <Nav navbar>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  exact
                  to="/classes/"
                  activeClassName="active"
                >
                  Classes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  exact
                  to="/assignments/"
                  activeClassName="active"
                >
                  Assignments
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>Settings</DropdownToggle>
                  <DropdownMenu right></DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
