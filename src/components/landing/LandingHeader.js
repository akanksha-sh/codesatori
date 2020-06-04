import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import Login from './Login'
import Signup from './Signup'

export class LandingHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
          };
    }


    toggleNav = () => this.setState({isOpen: !this.state.isOpen});

    render() {
        return (
            <div>
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
                        <DropdownToggle nav>
                        Log In
                        </DropdownToggle>
                        <DropdownMenu right>
                        <Login handleLogIn={this.props.handleLogIn}/>
                        </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                        Sign Up
                        </DropdownToggle>
                        <DropdownMenu right>
                        <Signup/>
                        </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )
    }
}

export default LandingHeader
