import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherClasses from "./teacher/classes/TeacherClasses";

export default class Classes extends Component {
  static contextType = UserContext;

  render() {
    const user = this.context;

    if (user.isTeacher) {
      return (
        <TeacherClasses />
      );
    }
    return <div></div>;
  }
}

