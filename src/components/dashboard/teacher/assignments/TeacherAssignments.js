import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { listGroup } from "../../../../Style";
import AssignmentListItem from "./AssignmentListItem"

export default class TeacherAssignment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Ongoing</h4>
        <ListGroup style={listGroup}>
          {this.props.classes.map(function (d, idx) {
            if (d.ongoing) {
              return <AssignmentListItem key={idx} assignment={d} />;
            }
          })}
        </ListGroup>
        <h4>Recieved</h4>
        <ListGroup style={listGroup}>
          {this.props.classes.map(function (d, idx) {
            if (!d.ongoing) {
              return <AssignmentListItem key={idx} assignment={d} />;
            }
          })}
        </ListGroup>
      </div>
    );
  }
}
