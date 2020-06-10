import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { listGroup } from "../../../../Style";
import ClassListItem from "./ClassListItem";
import PropTypes from "prop-types";
import { pageTitle, contentDiv } from "../../../../Style";
import AddClass from "./AddClass";

export default class TeacherClasses extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    classes: [],
  };

  componentDidMount() {
    this.setState({
      classes: retrievedClasses,
    });
  }

  delClass = (id) => {
    this.setState({
      classes: [...this.state.classes.filter((i) => i.id !== id)],
    });
  }

  addClass = (title) => {
    const newClass = {
      id: 7,
      title,
      active: true,
      ongoingAssignments: [],
    };
    this.setState({ classes: [...this.state.classes, newClass] });
  };

  render() {
    const del = this.delClass;
    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}> Classes </h2>
        <AddClass addClass={this.addClass} />
        <br />
        <br />
        <div>
          <h4>Active</h4>
          <ListGroup style={listGroup}>
            {this.state.classes.map(function (d, idx) {
              if (d.active) {
                return <ClassListItem key={idx} class={d} delClass={del} />;
              }
              return null;
            })}
          </ListGroup>
          <h4>Inactive</h4>
          <ListGroup style={listGroup}>
            {this.state.classes.map(function (d, idx) {
              if (!d.active) {
                return <ClassListItem key={idx} class={d} delClass={del} />;
              }
              return null;
            })}
          </ListGroup>
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
