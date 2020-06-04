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
            No. of students: {this.props.class.students}
          </ListGroupItem>
          <ListGroupItem>
            No. of assignments: {this.props.class.noAssignments}
          </ListGroupItem>
          <ListGroupItem>
            Ongoing assignments: {this.props.class.ongoing}{" "}
          </ListGroupItem>
          <ListGroupItem>
            Pending assignments: {this.props.class.pending}
          </ListGroupItem>
          <ListGroupItem>
            Marked assignments: {this.props.class.marked}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default ClassInfo;
