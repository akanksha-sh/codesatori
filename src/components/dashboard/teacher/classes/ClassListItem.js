import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  ListGroupItem,
  DropdownToggle,
  ButtonGroup,
} from "reactstrap";
import AddStudent from "./AddStudent";
import ClassInfo from "./ClassInfo";

export default class ClassListItem extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = (e) => {
    e.preventDefault();
  };

  render() {
    if (!this.props.class.active) {
      return (
        <ListGroupItem
          disabled
          tag={RRLink}
          exact
          to={"/classes/" + this.props.class.id}
          action
        >
          {this.props.class.title}
        </ListGroupItem>
      );
    }

    return (
      <ListGroupItem
        tag={RRLink}
        exact
        to={"/classes/" + this.props.class.id}
        action
      >
        {this.props.class.title}
        <div style={{ float: "right" }}>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">person_add</i>
            </DropdownToggle>
            <DropdownMenu right>
              <AddStudent />
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">info</i>
            </DropdownToggle>
            <DropdownMenu right>
              <ClassInfo class={this.props.class} />
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </ListGroupItem>
    );
  }
}

const buttonStyle = {
  "background-color": "transparent",
  outline: "none",
  paddingBottom: "0px",
  border: "none",
};
