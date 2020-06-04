import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import TeacherAssignments from "./teacher/assignments/TeacherAssignments";

export default class Assignments extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
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
<<<<<<< HEAD
        <TeacherAssignments />
=======
        <div style={contentDiv}>
          <h2 style={pageTitle}> Assignments </h2>
          <br/>
          <AddAssignment addAssignment={this.addAssignment}/> 
          <br/>
          <br/>
          <TeacherAssignments classes={this.state.assignments} />
        </div>
>>>>>>> a82a0cb... [as16418] Add functionality to add assignments, set deadline for assignments in assignments tab
      );
    }
    return <div></div>;
  }
}
