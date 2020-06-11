import React, { Component } from "react";
import { Button, ListGroupItem, FormGroup, Label, Input } from "reactstrap";

export class TutorialListItem extends Component {
  clickHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { id, questionText } = this.props.question;

    return (
      <ListGroupItem>
        <h5> Question {id + 1} </h5>
        {questionText}
        <Button
          style={{ margin: "6px" }}
          onClick={this.props.delQuestion.bind(this, id)}
          close
        />
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="code"
            disabled="disabled"
            placeholder="Your student's answer will go here..."
            onChange={this.onChange}
          />
        </FormGroup>
      </ListGroupItem>
    );
  }
}

export default TutorialListItem;
