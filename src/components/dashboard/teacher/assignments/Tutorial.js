import React, { Component } from "react";
import { Button, ListGroup, Input, Spinner } from "reactstrap";
import { listGroup } from "../../../../Style";
import AddQuestion from "./AddQuestion";
import TutorialListItem from "./TutorialListItem";
import * as Globals from "../../../../Globals";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";

export class Tutorial extends Component {
  static contextType = AuthUserContext;

  constructor() {
    super();
    this.state = {
      questions: [],
      title: "",
      isSaving: false,
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  delQuestion = (id) => {
    this.setState({
      questions: [...this.state.questions.filter((i) => i.id !== id)],
    });
  };

  addQuestion = (questionText, languageValue) => {
    const newQ = {
      id: this.state.id_next++,
      questionText: questionText,
      languageValue: languageValue,
    };
    this.setState({ questions: [...this.state.questions, newQ] });
  };

  saveAssignment = (e) => {
    e.preventDefault();
    this.setState({ isSaving: true });
    const userContext = this.context;
    userContext.authUser.getIdToken().then(async (idToken) => {
      console.log(
        "Contextual User: " + JSON.stringify(userContext.userDetails)
      );
      let [userRet] = await Promise.all([
        axios({
          url: Globals.BACKEND_URL + "user/" + userContext.userDetails.id,
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }),
      ]);
      const user = userRet.data;
      console.log("Retrieved user: " + JSON.stringify(user));
      let [assignmentRet] = await Promise.all([
        axios({
          url: Globals.BACKEND_URL + "assignments",
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: {
            name: this.state.title,
            teacherId: userContext.userDetails.id,
            assignmentTemplate: { questions: this.state.questions },
          },
        }),
      ]);
      this.setState({ isSaving: false });
    });
  };

  render() {
    const del = this.delQuestion;
    return (
      <div>
        <h3>Assignment Title: </h3>
        <Input
          type="text"
          name="title"
          id="title"
          value={this.state.value}
          onChange={this.onChange}
          placeholder="Title"
        />
        <br />

        <AddQuestion addQuestion={this.addQuestion} />
        {this.state.isSaving ? (
          <div className="text-center">
            <Spinner color="dark" className="mb-2" />
          </div>
        ) : (
          <div>
            <Button onClick={this.saveAssignment} style={{ width: "100%" }}>
              Save Assignment
            </Button>
          </div>
        )}
        <br />
        <br />
        <div>
          <ListGroup style={listGroup}>
            {this.state.questions.map(function (d, idx) {
              d.id = idx;
              return (
                <TutorialListItem key={idx} question={d} delQuestion={del} />
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Tutorial;
