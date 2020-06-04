import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { listGroup } from "../../../../Style";
import ClassListItem from "./ClassListItem";

export default class TeacherClasses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Active</h4>
        <ListGroup style={listGroup}>
          {this.props.classes.map(function (d, idx) {
            if (d.active) {
              return <ClassListItem class={d} />;
            }
          })}
        </ListGroup>
        <h4>Inactive</h4>
        <ListGroup style={listGroup}>
          {this.props.classes.map(function (d, idx) {
            if (!d.active) {
              return <ClassListItem class={d} />;
            }
          })}
        </ListGroup>
      </div>
    );
  }
}
