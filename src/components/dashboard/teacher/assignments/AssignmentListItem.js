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
      const renderButton = () => {
        if (this.props.assignment.marked) {
          return <i class="material-icons md-dark">assessment</i>;
        } else {
          return <i class="material-icons md-dark">check</i>;
        }
      };

      const renderStatus = () => {
        let status = this.props.assignment.marked ? "Marked" : "Pending";
        return status;
      };

      return (
        <ListGroupItem
          // disabled
          tag={RRLink}
          exact
          to={"/assignments/" + this.props.assignment.id}
          action
        >
          {this.props.assignment.title}

          <div style={{ float: "right" }}>
            {renderStatus()}
            <UncontrolledDropdown onClick={this.clickHandler}>
              <DropdownToggle
                color="light"
                className="transparentDropdownToggle"
              >
                {renderButton()}
              </DropdownToggle>
              <DropdownMenu right>
                {/* <ClassInfo class={this.props.class} /> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
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
          1 w{" "}
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">chat_bubble_outline</i>
            </DropdownToggle>
            <DropdownMenu right>{/* <AddStudent /> */}</DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">update</i>
            </DropdownToggle>
            <DropdownMenu right>{/* <AddStudent /> */}</DropdownMenu>
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
