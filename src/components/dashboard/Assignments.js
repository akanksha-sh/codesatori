import React, { Component } from "react";
import AuthUserContext from "../../session/Context";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";
import StudentAssignment from "./student/assignments/StudentAssignment";

export default class Assignments extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.context;

    if (user.userDetails.role === 1) {
      return <TeacherAssignments />;
    }
    return <StudentAssignment />;
  }
}
