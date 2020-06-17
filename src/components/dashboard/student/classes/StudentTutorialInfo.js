import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import { ListGroupItem } from "reactstrap";
import moment from "moment";

export class StudentTutorialInfo extends Component {
  getStatus = (isMarked, isTardy, submissionDate) => {
    const status = isMarked
      ? "Marked"
      : submissionDate !== null
      ? "Submitted"
      : "Not Submitted";
    if (isTardy) {
      return (
        <td>
          {status}
          <div style={LateTagStyle}>Late</div>
        </td>
      );
    }
    return <td>{status}</td>;
  };

  render() {
    const {
      submissionDate,
      testsPassed,
      score,
    } = this.props.assignmentInfo.studentSubmission;

    const { assignmentId, name } = this.props.assignmentInfo.assignment;

    const deadline = this.props.assignmentInfo.assignment.assignmentStatus.filter(
      (status) => {
        if (status.classId === this.props.classId) {
          return status
        }
      }
    )[0].deadline;

    const isSubmitted = submissionDate !== null
    const isMarked = score !== -1;
    const isTardy = (isSubmitted) 
      ? moment(submissionDate).diff(moment(deadline)) > 0
      : moment().diff(moment(deadline)) > 0;
    const scoreDisplay = isMarked ? score : "-";
    const testsPassedDisplay =
      testsPassed !== -1 ? testsPassed + "tests passed" : "-";
    
    return (
      <ListGroupItem
        tag={RRLink}
        to={{
          pathname: "/tutorial/" + assignmentId,
          state: {
            deadline: deadline,
            submitted: isSubmitted,
            assignment: this.props.assignmentInfo.assignment,
            studentSubmission: this.props.assignmentInfo.studentSubmission,
          },
        }}
        action
        style={{ padding: "0" }}
      >
        <tr>
          <td>{name}</td>
          {this.getStatus(isMarked, isTardy, submissionDate)}
          <td>{testsPassedDisplay}</td>
          <td>{scoreDisplay}</td>
        </tr>
      </ListGroupItem>
    );
  }
}

export default StudentTutorialInfo;

const LateTagStyle = {
  background: "#b73e3a",
  color: "#f2f2f2",
};
