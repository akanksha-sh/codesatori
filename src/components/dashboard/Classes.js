import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherClasses from "./teacher/classes/TeacherClasses";
import { pageTitle, contentDiv } from "../../Style";

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
    title: "Mr Williams - A-Level Computer Science, 19/20",
    students: 15,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: true,
  },
  {
    id: 2,
    title: "Mr Macleod - A-Level Computer Science, 19/20",
    students: 15,
    noAssignments: 6,
    ongoing: 2,
    pending: 2,
    marked: 2,
    active: true,
  },
  {
    id: 3,
    title: "Mr Macleod - IGCSE Computer Science, 19/20",
    students: 20,
    noAssignments: 4,
    ongoing: 1,
    pending: 0,
    marked: 3,
    active: true,
  },
  {
    id: 4,
    title: "Mr Macleod - IGCSE Computer Science, 18/19",
    students: 20,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: false,
  },
];
