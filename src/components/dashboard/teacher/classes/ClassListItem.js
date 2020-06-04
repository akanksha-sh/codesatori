import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Collapse,
  ListGroupItem,
  Table,
  Button,
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
    const {id, title} = this.props.class
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
        // tag={RRLink}
        // exact
        // to={"/classes/" + this.props.class.id}
        // action
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
          <Button style={{margin:"6px"}} onClick={this.props.delClass.bind(this, id)} close/>
        </div>

        <div style={{ paddingTop: "25px" }}>
          <Collapse isOpen={this.state.areAssignmentsOpen}>
            <tbody>
              {this.props.class.ongoingAssignments.map(function (d, idx) {
                return (
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontStyle: "italic",
                        fontWeight: "normal",
                      }}
                    >
                      {d.title}
                    </th>
                    <td>
                      <UncontrolledDropdown
                        onClick={(e) => {
                          e.preventDefault();
                          /* TODO: go to the page where you can set assignmens. */
                        }}
                      >
                        <DropdownToggle
                          color="light"
                          className="transparentDropdownToggle"
                        >
                          <i class="material-icons md-dark">settings</i>
                        </DropdownToggle>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Collapse>
        </div>
        <div style={{ paddingTop: "25px" }}>
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

const btnStyle = {
  borderRadius: '50%',
  width: "10px",
  background: "black",
  color: "white",
  outline: "none",
  paddingBottom: "0px",
  border: "1px",
 
};

const infoTabStyle = {
  fontWeight: "normal",
};
