import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  ListGroupItem,
  DropdownToggle,
} from "reactstrap";
import moment from "moment";

export class StudentOngoingTutorialInformation extends Component {
  clickHandler = (e) => {
    e.preventDefault();
  };

  clickHandler = (e) => {
    e.preventDefault();
  };

  computeTimeLeft = (countdown) => {
    if (countdown.format("D") > 0) {
      return <div>{countdown.format("D") > 0} d</div>;
    } else if (countdown.format("HH") > 0) {
      return <div>{countdown.format("HH")} h</div>;
    } else {
      return <div>{countdown.format("mm")} min</div>;
    }
  };

  getAssignmentStatus = (assignmentData) => {
    return assignmentData.assignment.assignmentStatus.filter((status) => {
      if (status.classId === assignmentData.studentSubmission.classId) {
        return status
      }
    })[0]
  }

  render() {
    let status = this.getAssignmentStatus(this.props.tutorial)
    const countdown = moment(moment(status.deadline) - moment());
    let {
      assignmentId,
      submissionDate,
    } = this.props.tutorial.studentSubmission

    return (
      <ListGroupItem
        // disabled
        tag={RRLink}
        to={{
          pathname: "/tutorial/" + assignmentId,
          state: {
            deadline: status.deadline,
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
          deadline: {status.deadline}
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">chat_bubble_outline</i>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      </ListGroupItem>
    );
  }
}

export default StudentOngoingTutorialInformation;

