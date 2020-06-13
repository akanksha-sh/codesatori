import React, { Component } from "react";
import { ListGroup, Spinner } from "reactstrap";
import { listGroup } from "../../../../Style";
import ClassListItem from "./ClassListItem";
import PropTypes from "prop-types";
import { pageTitle, contentDiv } from "../../../../Style";
import AddClass from "./AddClass";
import * as Globals from "../../../../Globals";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";

export default class TeacherClasses extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

    this.state = { classes: [], assignments: [], isLoading: true };
  }

  refreshClasses() {
    this.setState({ isLoading: true });
    const userContext = this.context;
    userContext.authUser.getIdToken().then(async (idToken) => {
      console.log(
        "Contextual User: " + JSON.stringify(userContext.userDetails)
      );
      let [classesRet, assignmentsRet] = await Promise.all([
        axios({
          url: Globals.BACKEND_URL + "classes/teacher",
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }),
        axios({
          url: Globals.BACKEND_URL + "assignments/teacher",
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }),
      ]);
      console.log("Retrieved Classes: " + JSON.stringify(classesRet.data));
      console.log(
        "Retrieved Assignments: " + JSON.stringify(assignmentsRet.data)
      );
      const newAssignments = assignmentsRet.data;
      const newClasses = classesRet.data.map(function (c) {
        const ongoingAssignments = c.assignmentStatus
          .filter(function (a) {
            console.log(new Date(a.deadline));
            console.log(new Date());
            return new Date(a.deadline) > new Date();
          })
          .map(function (a) {
            return newAssignments.filter(
              (assignment) => assignment.assignmentId == a.assignmentId
            )[0];
          });
        return { ...c, ongoingAssignments: ongoingAssignments };
      });
      console.log("New Classes: " + newClasses);
      this.setState({
        classes: newClasses,
        assignments: newAssignments,
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    this.refreshClasses();
  }

  delClass = (id) => {
    this.setState({
      classes: [...this.state.classes.filter((i) => i.id !== id)],
    });
  };

  addClass = (title, emailList) => {
    const userContext = this.context;
    console.log(
      "Contextual User: " + JSON.stringify(userContext.userDetails)
    );
    userContext.authUser.getIdToken()
    .then((idToken) => (
      axios({
        url: Globals.BACKEND_URL + "classes",
        method: "POST",
        headers: {
          Authorization: "Bearer " + idToken,
        },
        data: {
          name: title,
          emails: emailList,
        },
      })))
    .then((classRet) => {
      const newClass = classRet.data;
      console.log("Retrieved Class: " + JSON.stringify(newClass));
      this.refreshClasses();
    })
    .catch((error) => {
      console.log("Error from backend: ", error);
    });
  }

  render() {
    const del = this.delClass;
    return (
      <div>
          <div style={contentDiv}>
            <h2 style={pageTitle}> Classes </h2>
            <AddClass addClass={this.addClass} />
            <br />
            <br />
            {
              this.state.isLoading ? (
                <div className="text-center">
                  <Spinner color="dark" className="mb-2" />
                </div>
              ) : 
            <div>
              <h4>Current</h4>
              <ListGroup style={listGroup}>
                {this.state.classes.map(function (d, idx) {
                  if (d.active) {
                    d.id = idx;
                    return <ClassListItem key={idx} class={d} delClass={del} />;
                  }
                  return null;
                })}
              </ListGroup>
              <h4>Archived</h4>
              <ListGroup style={listGroup}>
                {this.state.classes.map(function (d, idx) {
                  if (!d.active) {
                    return <ClassListItem key={idx} class={d} delClass={del} />;
                  }
                  return null;
                })}
              </ListGroup>
            </div>
          }
        </div>
      </div>
    );
  }
}

TeacherClasses.propTypes = {
  delTodo: PropTypes.func.isRequired,
};

const retrievedClasses = [
  {
    id: 1,
    title: "A-Level Computer Science, 19/20 (Class 1)",
    students: 15,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: true,
    ongoingAssignments: [
      { id: 1, title: "Tutorial 2 : Programming in Python" },
      { id: 2, title: "Tutorial 1 : Linked-Lists" },
    ],
  },
  {
    id: 2,
    title: "A-Level Computer Science, 19/20 (Class 2)",
    students: 13,
    noAssignments: 6,
    ongoing: 1,
    pending: 2,
    marked: 3,
    active: true,
    ongoingAssignments: [{ id: 3, title: "Tutorial 2 : Microprocessors" }],
  },
  {
    id: 3,
    title: "IGCSE Computer Science, 19/20",
    students: 20,
    noAssignments: 4,
    ongoing: 1,
    pending: 0,
    marked: 3,
    active: true,
    ongoingAssignments: [{ id: 2, title: "Tutorial 1 : Linked-Lists" }],
  },
  {
    id: 4,
    title: "IGCSE Computer Science, 18/19",
    students: 17,
    noAssignments: 5,
    ongoing: 1,
    pending: 2,
    marked: 2,
    active: false,
    ongoingAssignments: [],
  },
];
