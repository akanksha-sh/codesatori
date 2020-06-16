import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export class ClassInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropdown-menu-custom">
        <ListGroup>
          <ListGroupItem>
            No. of students: {this.props.classInfo.studentIds.length}
          </ListGroupItem>
          <ListGroupItem>
            No. of assignments: {this.props.classInfo.assignmentStatus.length}
          </ListGroupItem>
          <ListGroupItem>
            Ongoing assignments: {this.props.classInfo.assignmentStatus.length}
          </ListGroupItem>
          <ListGroupItem>
            Pending assignments: 0
          </ListGroupItem>
          <ListGroupItem>
            Marked assignments: 0
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default ClassInfo;
