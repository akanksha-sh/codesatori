import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Collapse,
  CardBody,
  Card,
  ListGroup,
  ListGroupItem,
  Table,
} from "reactstrap";
import AddStudent from "./AddStudent";
import ClassInfo from "./ClassInfo";

export default class ClassListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isInfoOpen: false, areAssignmentsOpen: false };
  }

  clickHandler = (e) => {
    e.preventDefault();
  };

  toggleAreAssignmentsOpen = (e) => {
    this.clickHandler(e);
    this.setState({ areAssignmentsOpen: !this.state.areAssignmentsOpen });
  };

  toggleIsInfoOpen = (e) => {
    this.clickHandler(e);
    this.setState({ isInfoOpen: !this.state.isInfoOpen });
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
        style={{ fontWeight: "bold" }}
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
          <UncontrolledDropdown onClick={this.toggleAreAssignmentsOpen}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">assignment</i>
            </DropdownToggle>
          </UncontrolledDropdown>
          <UncontrolledDropdown onClick={this.toggleIsInfoOpen}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">info</i>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
        <div style={{ paddingTop: "25px" }}>
          <Collapse isOpen={this.state.areAssignmentsOpen}>
            /* TODO: assignment stuff goes here. */
          </Collapse>
          <Collapse isOpen={this.state.isInfoOpen}>
            <Table>
              <tbody>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    No. of students:
                  </th>
                  <td>{this.props.class.students}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    No. of assignments:
                  </th>
                  <td>{this.props.class.noAssignments}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Ongoing assignments:
                  </th>
                  <td>{this.props.class.ongoing}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Pending assignments:
                  </th>
                  <td>{this.props.class.pending}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Marked assignments:
                  </th>
                  <td>{this.props.class.marked}</td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
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

const infoTabStyle = {
  fontWeight: "normal",
};
