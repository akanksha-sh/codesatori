import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { listGroup, pageTitle, contentDiv } from "../../../../Style";
import AssignmentListItem from "./AssignmentListItem"

export default class TeacherAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
  }

  componentDidMount() {
    this.setState({
      assignments: retrievedAssignments,
    });
  }

  render() {
    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}> Assignments </h2>
        <div>
          <h4>Ongoing</h4>
          <ListGroup style={listGroup}>
            {this.state.assignments.map(function (d, idx) {
              if (d.ongoing) {
                return <AssignmentListItem assignment={d} />;
              }
            })}
          </ListGroup>
          <h4>Recieved</h4>
          <ListGroup style={listGroup}>
            {this.state.assignments.map(function (d, idx) {
              if (!d.ongoing) {
                return <AssignmentListItem assignment={d} />;
              }
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

const retrievedAssignments = [
  {
    id: 1,
    title: "Tutorial 2 : Programming in Python",
    ongoing: true,
  },
  {
    id: 2,
    title: "Tutorial 1 : Linked-Lists",
    ongoing: true,
  },
  {
    id: 3,
    title: "Tutorial 2 : Microprocessors",
    ongoing: true,
  },
  {
    id: 4,
    title: "Tutorial 1 : Programming in Python",
    ongoing: false,
  },
  {
    id: 5,
    title: "Tutorial 2 : What are supercomputers?",
    ongoing: false,
  },
];
