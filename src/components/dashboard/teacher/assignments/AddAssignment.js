import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export class AddAssignment extends Component {
  state = {
    title: " ",
    date: " ",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
}

  onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  onSubmit = (e) => {
    e.preventDefault();
    // this.props.addAssignment(this.state.title);
    // this.setState({ title: "" });
    // // this.setState({date: ''})     ideally store this (but dummy data anyway)
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} inline>
        <FormGroup>
          <Label for="date">
            {" "}
            Deadline
          </Label>
          <Input
            type="date"
            name="date"
            id="title"
            value={this.state.value}
            onChange={this.onChange}
            onClick={this.onClick}
          />
        </FormGroup>
        <FormGroup>
          <Label for="group">
            Class
          </Label>
          <Input
            type="select"
            name="group"
            id="group"
            placeholder="e.g. Class 19B"
            onClick={this.onClick}
          >
            <option>For class</option>
            <option>AL Comptuing</option>
            <option>IGCSE Computing</option>
            <option>AL Maths</option>
          </Input>
        </FormGroup>
        <Button onClick={this.onClick}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddAssignment;
