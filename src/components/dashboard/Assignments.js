import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";
import StudentAssignments from "./student/assignments/StudentAssignments";

export default class Assignments extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.context;

    if (user.isTeacher) {
      return (
        <TeacherAssignments />
      );
    }
    return <StudentAssignments />;
  }
}

