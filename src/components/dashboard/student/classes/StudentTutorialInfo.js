import React, { Component } from 'react'
import { Link as RRLink } from "react-router-dom";
import { ListGroupItem } from "reactstrap";
import moment from 'moment'

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

  getStatus = (isMarked, isTardy, submissionDate) => {
    const status = (isMarked) ? "Marked" : ((submissionDate !== "") ? "Submitted" : "Not Submitted")
    if (isTardy) {
      return (
        <td>
          {status}
          <div style={LateTagStyle}>Late</div>
        </td>
      )
    }
    return <td>{status}</td>
  }

  render() {
    const {
      name,
      totalTests,
      totalScore,
      submissionDate,
      deadline,
    } = this.props.tutorial;

    const isMarked = this.props.tutorial.score !== ""
    const isTardy = moment().diff(moment(deadline)) > 0
    const score = (isMarked) ? this.props.tutorial.score : "-"
    const testsPassed = (this.props.tutorial.testsPassed !== "") ? this.props.tutorial.testsPassed : "-"

    return (
      <ListGroupItem 
        tag={RRLink}
        to={{
            pathname: "/tutorial/" + this.props.tutorial.id,
            state: {
                deadline: deadline,
                submitted: submissionDate !== ""
            } 
        }}
        action
        style={{padding:'0'}}
      >
        <tr>
          <td>{name}</td>
          {this.getStatus(isMarked, isTardy, submissionDate)}
          <td>
            {testsPassed}/{totalTests} tests passed
          </td>
          <td>
            {score}/{totalScore}
          </td>
        </tr>
      </ListGroupItem>
    );
  }
}

export default StudentTutorialInfo;

const LateTagStyle = {
  background:'#b73e3a',
  color:'#f2f2f2',
}