import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";
import * as Globals from "../../../../Globals";

export class AddAssignment extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {
      date: "",
      classId: 0,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };

  onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  onSubmitClick = (e) => {
    e.stopPropagation();
  };

  onSubmit = (e) => {
    console.log("Submitting!");
    const userContext = this.context;
    const publishAssignment = {
      classId: this.state.classId,
      assignmentId: this.props.assignmentId,
      deadline: this.state.date,
      status: 0,
    };
    userContext.authUser
      .getIdToken()
      .then((idToken) =>
        axios({
          url: Globals.BACKEND_URL + "assignments/publish",
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: { ...publishAssignment },
        })
      )
      .then((res) => {
        this.props.refresh();
      })
      .catch((errorRet) => {
        console.log("Error from backend: ", errorRet);
      });
    e.preventDefault();
    // this.props.addAssignment(this.state.title);
    // this.setState({ title: "" });
    // // this.setState({date: ''})     ideally store this (but dummy data anyway)
  };

  render() {
    const classes = this.props.classes;

    const { date, classId } = this.state;

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
            value={date}
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
            name="classId"
            id="classId"
            placeholder="e.g. Class 19B"
            onClick={this.onClick}
            onChange={this.onChange}
            value={classId}
            className="mr-2"
          >
            <option value={0} disabled>
              Select class...
            </option>
            {classes.map((d, idx) => {
              return (
                <option key={idx} value={d.classId}>
                  {d.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <Button type="submit" onClick={this.onSubmitClick}>
          Publish
        </Button>
      </Form>
    );
  }
}

export default AddAssignment;
