import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { contentDiv } from "../../../../Style";

export class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = { className: " " };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addClass(this.state.title);
    this.setState({ className: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} style={{ display: "flex" }} inline>
        <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="title" className="mr-sm-2">
            Class Name
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. AL Computing"
            value={this.state.value}
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

export default AddClass;

const formElemStyle = {
  margin: "20px",
  marginBottom: "40px",
  marginRight: "40px",
};
