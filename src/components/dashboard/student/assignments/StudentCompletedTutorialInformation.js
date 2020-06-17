import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  ListGroupItem,
  DropdownToggle,
} from "reactstrap";

export class StudentCompletedTutorialInformation extends Component {
  clickHandler = (e) => {
    e.preventDefault();
  };

  getAssignmentStatus = (assignmentData) => {
    return assignmentData.assignment.assignmentStatus.filter((status) => {
      if (status.classId === assignmentData.studentSubmission.classId) {
        return status
      }
    })[0]
  }

  render() {
    const renderButton = () => {
      if (this.props.tutorial.studentSubmission.score !== -1) {
        return <i class="material-icons md-dark">assessment</i>;
      } else {
        return <i class="material-icons md-dark">check</i>;
      }
    };

    const renderStatus = () => {
      let status =
        this.props.tutorial.studentSubmission.submissionDate === null
          ? "Not Submitted"
          : this.props.tutorial.studentSubmission.score === -1
          ? "Submitted"
          : "Marked";
      return status;
    };

    let {
      classId,
      assignmentId,
      submissionDate,
    } = this.props.tutorial.studentSubmission

    return (
      <ListGroupItem
        // disabled
        tag={RRLink}
        to={{
          pathname: "/tutorial/" + this.props.tutorial.id,
          state: {
            deadline: this.getAssignmentStatus(this.props.tutorial).deadline,
            submitted: submissionDate !== null,
            assignment: this.props.tutorial.assignment,
            studentSubmission: this.props.tutorial.studentSubmission,
          },
        }}
        action
        style={{ alignItems: "center", display: "flex" }}
      >
        <div>{this.props.tutorial.assignment.name}</div>
        <div style={{ marginLeft: "auto" }}>
          {renderStatus()}
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              {renderButton()}
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      </ListGroupItem>
    );
  }
}

export default StudentCompletedTutorialInformation;
