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
    const classes = this.props.classes;

    return (
      <Form onSubmit={this.onSubmit} inline>
        <FormGroup className="mr-2">
          <Label for="date" className="mr-2">
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
            className="mr-2"
          />
        </FormGroup>
        <FormGroup className="mr-2">
          <Label for="group" className="mr-2">
            Class
          </Label>
          <Input
            type="select"
            name="group"
            id="group"
            placeholder="e.g. Class 19B"
            onClick={this.onClick}
            className="mr-2"
          >
            {classes.map((d, idx) => {
                return <option key={idx}>{d.name}</option>;
            })}
          </Input>
        </FormGroup>
        <Button onClick={this.onClick}>
          Publish
        </Button>
      </Form>
    );
  }
}

export default AddAssignment;
