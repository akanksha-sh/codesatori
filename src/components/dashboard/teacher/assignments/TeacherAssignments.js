import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { listGroup } from "../../../../Style";
import AddAssignment from "./AddAssignment"
import AssignmentListItem from "./AssignmentListItem"
import { pageTitle, contentDiv } from "../../../../Style";

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

  addAssignment = (title) => {
    const newAssignment = {
      id: 7,
      title,
      ongoing: true,
    }
    this.setState({assignments: [...this.state.assignments, newAssignment]})
  }

  render() {
    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}> Assignments </h2>
        <br/>
        <AddAssignment addAssignment={this.addAssignment}/> 
        <br/>
        <br/>
        <div>
          <h4>Ongoing</h4>
          <ListGroup style={listGroup}>
            {this.state.assignments.map(function (d, idx) {
              if (d.ongoing) {
                return <AssignmentListItem key={idx} assignment={d} />;
              }
            })}
          </ListGroup>
          <h4>Recieved</h4>
          <ListGroup style={listGroup}>
            {this.state.assignments.map(function (d, idx) {
              if (!d.ongoing) {
                return <AssignmentListItem key={idx} assignment={d} />;
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
    marked: false,
    ongoing: true,
  },
  {
    id: 2,
    title: "Tutorial 1 : Linked-Lists",
    marked: false,
    ongoing: true,
  },
  {
    id: 3,
    title: "Tutorial 2 : Microprocessors",
    marked: false,
    ongoing: true,
  },
  {
    id: 4,
    title: "Tutorial 1 : Programming in Python",
    marked: false,
    ongoing: false,
  },
  {
    id: 5,
    title: "Tutorial 2 : What are supercomputers?",
    marked: true,
    ongoing: false,
  },
];
