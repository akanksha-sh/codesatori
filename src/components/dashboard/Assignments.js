import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";

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
    return <div></div>;
  }
}
