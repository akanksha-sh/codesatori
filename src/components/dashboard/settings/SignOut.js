import React, { Component } from "react";
import { withFirebase } from "../../../firebase";
import { DropdownItem } from "reactstrap";

const SignOutButton = ({ firebase }) => (
  <DropdownItem onClick={firebase.doSignOut}>Sign Out</DropdownItem>
);

export default withFirebase(SignOutButton);
