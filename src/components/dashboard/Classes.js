import React, { Component } from "react";
import AuthUserContext from "../../session/Context";
import TeacherClasses from "./teacher/classes/TeacherClasses";
import StudentClasses from "./student/classes/StudentClasses";

export default class Classes extends Component {
  static contextType = AuthUserContext;

  render() {
    const user = this.context;
    if (user.userDetails.role === 1) {
      return <TeacherClasses />;
    }
    return <StudentClasses />;
  }
}
