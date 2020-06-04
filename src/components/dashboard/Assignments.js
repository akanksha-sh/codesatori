import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";
import { pageTitle, contentDiv } from "../../Style";
import AddAssignment from "./teacher/assignments/AddAssignment"

export default class Assignments extends Component {
  static contextType = UserContext;

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
    const user = this.context;

    if (user.isTeacher) {
      return (
        <div style={contentDiv}>
          <h2 style={pageTitle}> Assignments </h2>
          <br/>
          <AddAssignment addAssignment={this.addAssignment}/> 
          <br/>
          <br/>
          <TeacherAssignments classes={this.state.assignments} />
        </div>
      );
    }
    return <div></div>;
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
