import React, { Component } from "react";
import Countdown from "./Countdown";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import moment from "moment";
import { pageTitle, contentDiv } from "../../../../Style";
import TutorialListItem from "./TutorialListItem";
import classnames from "classnames";

export class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "(Tutorial Name)",
      questions: [],
      answers: [],
      activeTab: 1,
    };
  }

  componentDidMount() {
    this.getTutorialQuestions();
  }

  submit = () => {
    //save to database and change status to submit
  };

  save = () => {
    //save to database
  };

  saveAndExit = () => {
    //save to database
    this.props.history.goBack();
  };

  exit = () => {
    this.props.history.goBack();
  };

  render() {
    const { deadline, submitted } = this.props.location.state;

    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}>{this.state.name}</h2>
        <Collapse
          isOpen={moment().diff(moment(deadline)) > 0}
          style={TimeLeftStyle}
        >
          {this.getCountdownBox(deadline)}
        </Collapse>
        <Nav tabs>
          {this.state.questions.map((q) => {
            return (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === q.id + 1,
                  })}
                  onClick={() => {
                    this.setState({ activeTab: q.id + 1 });
                  }}
                >
                  Question {q.id + 1}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {this.state.questions.map((q, idx) => {
            return (
              <TabPane tabId={q.id + 1}>
                <TutorialListItem key={q.id + 1} question={q} answer={this.state.answers[idx]} />
              </TabPane>
            );
          })}
        </TabContent>
        {this.getButtons(submitted)}
      </div>
    );
  }

  getTutorialQuestions = () => {
    let { assignment, studentSubmission } = this.props.location.state
    console.log("This assignment is: " + JSON.stringify(assignment) + " with answers: " + JSON.stringify(studentSubmission))
    console.log("Actual questions are: "+ JSON.stringify(assignment.assignmentTemplate.questions))
    this.setState({
      name: assignment.name,
      questions: assignment.assignmentTemplate.questions,
      answers: studentSubmission.studentSubmissionTemplate.answers
    })

    // if (this.state.id === "28082810-0614-3091-8084-2c7173ef0793") {
    //   this.setState({
    //     name: "Java Homework 2 : Linked-List",
    //     questions: [
    //       {
    //         id: 1,
    //         languageIndex: 0,
    //         text:
    //           "Write a public method with signature 'createIntList()' that will return an empty LinkedList of type 'Integer'.",
    //         studentAnswer:
    //           'public class Solution {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}\n',
    //       },
    //       {
    //         id: 2,
    //         languageIndex: 0,
    //         text:
    //           "Write a public method with sigature 'max(List<Integer> integers)' that returns the largest integer in the list.",
    //         studentAnswer:
    //           "public class Solution {\n\tpublic static Integer max(List<Integer> integers) {\n\t\t/* Code goes here! */\n\t\treturn 0;\n\t}\n}\n",
    //       },
    //     ],
    //   });
    // }
  };

  getCountdownBoxStyle = (isOverdue) => {
    return {
      display: "flex",
      padding: "8px",
      border: "1px solid #ccc",
      minWidth: "200pt",
      background: isOverdue ? "#f2f2f2" : "#b73e3a",
      color: isOverdue ? "#000" : "#f2f2f2",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    };
  };

  getCountdownBox = (deadline) => {
    const isOverdue = moment().diff(moment(deadline)) > 0;
    const countdownBoxStyle = this.getCountdownBoxStyle(isOverdue);

    if (isOverdue) {
      return (
        <div style={countdownBoxStyle}>This tutorial has been locked.</div>
      );
    } else {
      return (
        <Countdown deadline={deadline} countdownBoxStyle={countdownBoxStyle} />
      );
    }
  };

  getBtnStyle = (isSave) => {
    return {
      background: isSave ? "#f2f2f2" : "#e0e0e0",
      color: "#000",
      border: "none",
      width: "50%",
      cursor: "pointer",
      margin: "5pt",
      alignItems: "center",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
    };
  };

  getButtons = (submitted) => {
    if (!submitted) {
      return (
        <div style={BtnGroupStyle}>
          <Button
            style={this.getBtnStyle(false)}
            onClick={this.submit}
            onMouseEnter={(e) => (e.target.style.background = "#f2f2f2")}
            onMouseLeave={(e) => (e.target.style.background = "#e0e0e0")}
          >
            {/* <i className="material-icons md-dark">assignment_turned_in</i>  */}
            Submit
          </Button>
          <Button
            style={this.getBtnStyle(true)}
            onMouseEnter={(e) => (e.target.style.background = "#e0e0e0")}
            onMouseLeave={(e) => (e.target.style.background = "#f2f2f2")}
            onClick={this.save}
          >
            <i className="material-icons md-dark">save</i> 
            Save
          </Button>
          <Button
            style={this.getBtnStyle(false)}
            onMouseEnter={(e) => (e.target.style.background = "#f2f2f2")}
            onMouseLeave={(e) => (e.target.style.background = "#e0e0e0")}
            onClick={this.saveAndExit}
          >
            {/* <i className="material-icons md-dark">power_settings_new</i>  */}
            Save and Exit
          </Button>
        </div>
      );
    }

    return (
      <div style={BtnGroupStyle}>
        <button
          style={this.getBtnStyle(false)}
          onMouseEnter={(e) => (e.target.style.background = "#f2f2f2")}
          onMouseLeave={(e) => (e.target.style.background = "#e0e0e0")}
          onClick={this.exit}
        >
          Exit
        </button>
      </div>
    );
  };
}

export default Tutorial;

const TimeLeftStyle = {
  display: "flex",
  flexDirection: "row",
  width: "30%",
  minWidth: "250pt",
  marginLeft: "auto",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const BtnGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
};
