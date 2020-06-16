import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { contentDiv } from "../../../../Style";
import axios from "axios";
import AuthUserContext from "../../../../session/Context";
import * as Globals from "../../../../Globals";

export class StudentAddClass extends Component {
  static contextType = AuthUserContext;

  state = {
    nameOfClass: "",
    classCode: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    // Communicate with database to verify existence of class. If it doesn't exit, handle error
    this.addClass(this.state.classCode);
    this.setState({ nameOfClass: "", classCode: "" });
  };

  addClass = (code) => {
    const userContext = this.context;
    userContext.authUser
      .getIdToken()
      .then((idToken) =>
        axios({
          url: Globals.BACKEND_URL + "classes/join?code=" + code,
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        })
      )
      .then((res) => {
        this.props.refreshData();
      })
      .catch((error) => {
        console.log("Error adding class: " + error);
      });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} style={{ display: "flex" }} inline>
        <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="classCode" className="mr-sm-2">
            Class Code
          </Label>
          <Input
            type="text"
            name="classCode"
            id="classCode"
            placeholder="e.g. 6RAI8"
            value={this.state.classCode}
            onChange={this.onChange}
          />
        </FormGroup>
        <Button style={{ marginLeft: "40px", marginTop: "13px" }}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default StudentAddClass;

const formElemStyle = {
  margin: "20px",
  marginBottom: "40px",
  marginRight: "40px",
};
