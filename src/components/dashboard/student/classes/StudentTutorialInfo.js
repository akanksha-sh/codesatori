import React, { Component } from "react";

export class StudentTutorialInfo extends Component {
  getTardiness = (tardy) => {
    if (tardy === "-") {
      return tardy;
    } else if (tardy) {
      return "Late";
    } else {
      return "On Time";
    }
  };

  render() {
    const {
      id,
      name,
      status,
      tardy,
      testsPassed,
      totalTests,
      score,
      totalScore,
    } = this.props.tutorial;
    return (
      <tr>
        <td>{name}</td>
        <td>{status}</td>
        <td>{this.getTardiness(tardy)}</td>
        <td>
          {testsPassed}/{totalTests} tests passed
        </td>
        <td>
          {score}/{totalScore}
        </td>
      </tr>
    );
  }
}

export default StudentTutorialInfo;
