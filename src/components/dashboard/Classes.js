import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherClasses from "./teacher/classes/TeacherClasses";
import StudentClasses from "./student/classes/StudentClasses";

export default class Classes extends Component {
  static contextType = UserContext;

  render() {
    const user = this.context;

    if (user.isTeacher) {
      return <TeacherClasses classes={this.state.classes} delClass={this.delClass}/>;
    }
    return <StudentClasses />;
  }
}
