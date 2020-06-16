import React, { Component } from "react";
import uuid from "uuid";
import TutorialInfo from "./StudentTutorialInfo";

export class StudentClassInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.assignmentInfo.map((assignmentInfo) => (
      <TutorialInfo
        key={this.props.id + assignmentInfo.assignment.assignmentId}
        assignmentInfo={assignmentInfo}
        classId={this.props.id}
      />
    ));
  }
}

export default StudentClassInfo;