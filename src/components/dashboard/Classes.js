import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherClasses from "./teacher/classes/TeacherClasses";
import { pageTitle, contentDiv } from "../../Style";
import { Jumbotron } from "reactstrap";

export default class Classes extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  componentDidMount() {
    this.setState({
      classes: retrievedClasses,
    });
  }

  render() {
    const user = this.context;

    if (user.isTeacher) {
      return (
        <div style={contentDiv}>
          <h2 style={pageTitle}> Classes </h2>
          <TeacherClasses classes={this.state.classes} />
        </div>
      );
    }
    return <div></div>;
  }
}

const retrievedClasses = [
  {
    id: 1,
    title: "A-Level Computer Science, 19/20 (Class 1)",
    students: 15,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: true,
    ongoingAssignments: [
      { id: 1, title: "Tutorial 2 : Programming in Python" },
      { id: 2, title: "Tutorial 1 : Linked-Lists" },
    ],
  },
  {
    id: 2,
    title: "A-Level Computer Science, 19/20 (Class 2)",
    students: 13,
    noAssignments: 6,
    ongoing: 1,
    pending: 2,
    marked: 3,
    active: true,
    ongoingAssignments: [{ id: 3, title: "Tutorial 2 : Microprocessors" }],
  },
  {
    id: 3,
    title: "IGCSE Computer Science, 19/20",
    students: 20,
    noAssignments: 4,
    ongoing: 1,
    pending: 0,
    marked: 3,
    active: true,
    ongoingAssignments: [{ id: 2, title: "Tutorial 1 : Linked-Lists" }],
  },
  {
    id: 4,
    title: "IGCSE Computer Science, 18/19",
    students: 17,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: false,
    ongoingAssignments: [],
  },
];
