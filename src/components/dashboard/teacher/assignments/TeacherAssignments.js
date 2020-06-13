import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { listGroup } from "../../../../Style";
import AddAssignment from "./AddAssignment";
import AssignmentListItem from "./AssignmentListItem";
import { pageTitle, contentDiv } from "../../../../Style";
import * as Globals from "../../../../Globals";
import axios from "axios";
import AuthUserContext from "../../../../session/Context";
import { Link as RRLink } from "react-router-dom";

export default class TeacherAssignment extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      classNames: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.getAssignments();
  }

  addAssignment = (title) => {
    const newAssignment = {
      id: 7,
      title,
      ongoing: true,
    };
    this.setState({ assignments: [...this.state.assignments, newAssignment] });
  };

  delAssignment = (id) => {
    this.setState({
      assignments: [...this.state.assignments.filter((i) => i.id !== id)],
    });
  };

  getAssignments = () => {
    this.setState({ isLoading: true });
    const userContext = this.context;
    userContext.authUser
      .getIdToken()
      .then(async (idToken) => {
        let [classRet, assignmentRet] = await Promise.all([
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
        const classNamesRet = classRet.data.map(({ classId, name }) => ({
          classId,
          name,
        }));
        console.log("Retrieved classes: " + JSON.stringify(classNamesRet));
        console.log(
          "Retrieved assignments: " + JSON.stringify(assignmentRet.data)
        );
        this.setState({
          assignments: assignmentRet.data,
          classNames: classNamesRet,
        });
        this.setState({ isLoading: false });
      })
      .catch((errorRet) => {
        console.log("Error from backend: ", errorRet);
        this.setState({ error: errorRet });
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { assignments, isLoading } = this.state;
    const ongoingAssignments = assignments;
    const archivedAssignments = [];
    const delAssignment = this.delAssignment;

    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}> Assignments </h2>
        <Button tag={RRLink} exact to="create" className="float-right">
          Create new assignment
        </Button>
        <br />
        {isLoading ? (
          <div className="text-center">
            <Spinner color="dark" className="mb-2" />
          </div>
        ) : (
          <div>
            <h4>Current</h4>
            <ListGroup style={listGroup}>
              {ongoingAssignments.length === 0 ? (
                <ListGroupItem>You have no current assignments.</ListGroupItem>
              ) : (
                <div>
                  {ongoingAssignments.map((d, idx) => {
                    d.id = idx;
                    return (
                      <AssignmentListItem
                        key={idx}
                        assignment={d}
                        delAssignment = {delAssignment}
                        classNames={this.state.classNames}
                        refresh={this.getAssignments}
                      />
                    );
                  })}
                </div>
              )}
            </ListGroup>
            <h4>Archived</h4>
            <ListGroup style={listGroup}>
              {archivedAssignments.length === 0 ? (
                <ListGroupItem>You have no archived assignments.</ListGroupItem>
              ) : (
                <div>
                  {archivedAssignments.map(function (d, idx) {
                    return <AssignmentListItem key={idx} assignment={d} />;
                  })}
                </div>
              )}
            </ListGroup>
          </div>
        )}
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
