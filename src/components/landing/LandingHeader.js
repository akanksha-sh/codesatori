import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  ModalBody,
  Modal,
  ModalFooter,
} from "reactstrap";
import Login from "./Login";
import SignUp, { SignUpLink } from "./SignUp";

export class LandingHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      signUpOpen: false,
    };
  }

  toggleNav = () => this.setState({ isOpen: !this.state.isOpen });

  signUpToggle = (e) => {
    e.preventDefault();
    this.setState({ signUpOpen: !this.state.signUpOpen });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.signUpOpen}
          toggle={this.signUpToggle}
          centered
          style={{ width: "25em" }}
        >
          <ModalBody>
            <SignUp />
          </ModalBody>
          <ModalFooter>
            <SignUpLink />
          </ModalFooter>
        </Modal>
        <Navbar color="dark" dark expand="md" fixed="top">
          <NavbarBrand href="/">codesatori</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                    <NavLink href="/components/">Students</NavLink>
                  </NavItem> */}
            </Nav>
            <Nav navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>Log In</DropdownToggle>
                <DropdownMenu right>
                  <Login handleLogIn={this.props.handleLogIn} />
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink onClick={this.signUpToggle} href="">
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default LandingHeader;
