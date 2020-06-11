import React, { Component } from "react";
import { Button, ListGroup, Input, Spinner } from "reactstrap";
import { listGroup } from "../../../../Style";
import TutorialListItem from "./TutorialListItem";
import AuthUserContext from "../../../../session/Context";

export class StudentTutorial extends Component {
  static contextType = AuthUserContext;

  constructor() {
    super();
    this.state = {
      questions: [
        {
          id: 1,
          questionText: "Hi Mr Macleod! Could you just test this works?",
        },
        {
          id: 2,
          questionText:
            "This is a second compiler window to demonstrate the layout.",
        },
      ],
      title: "Java Homework 1 : Hello World!",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <br />
        <br />
        <br />
        <div>
          <ListGroup style={listGroup}>
            {this.state.questions.map(function (d, idx) {
              d.id = idx;
              return <TutorialListItem key={idx} question={d} />;
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default StudentTutorial;
