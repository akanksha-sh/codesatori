import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  ListGroupItem,
  DropdownToggle,
  ButtonGroup,
} from "reactstrap";

export default class AssignmentListItem extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = (e) => {
    e.preventDefault();
  };

  render() {
    if (!this.props.assignment.ongoing) {
      return (
        <ListGroupItem
          disabled
          tag={RRLink}
          exact
          to={"/assignments/" + this.props.assignment.id}
          action
        >
          {this.props.assignment.title}
        </ListGroupItem>
      );
    }

    return (
      <ListGroupItem
        tag={RRLink}
        exact
        to={"/assignments/" + this.props.assignment.id}
        action
      >
        {this.props.assignment.title}
        <div style={{ float: "right" }}>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">chat_bubble_outline</i>
            </DropdownToggle>
            <DropdownMenu right>
              {/* <AddStudent /> */}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">update</i>
            </DropdownToggle>
            <DropdownMenu right>
              {/* <AddStudent /> */}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">assignment</i>
            </DropdownToggle>
            <DropdownMenu right>
              {/* <ClassInfo class={this.props.class} /> */}
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
