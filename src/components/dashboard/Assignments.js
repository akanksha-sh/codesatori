import React, { Component } from "react";
import AuthUserContext from "../../session/Context";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";
import StudentAssignments from "./student/assignments/StudentAssignments";

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
    return <StudentAssignments />;
  }
}
