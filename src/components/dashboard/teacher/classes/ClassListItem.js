import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Collapse,
  ListGroupItem,
  Table,
  Button,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader
} from "reactstrap";
import AddStudent from "./AddStudent";
import { Link as RRLink } from "react-router-dom";

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
    const { id, classId, name, active } = this.props.classInfo;
    if (!active) {
      return (
        <ListGroupItem
        // disabled
        // tag={RRLink}
        // exact
        // to={"/classes/" + id}
        // action
        >
          {name}
          <Button
            style={{ margin: "6px" }}
            id={"deletePopover"+id}
            close
          />
          <UncontrolledPopover trigger="legacy" placement="bottom" target={"deletePopover"+id}>
            <PopoverHeader>Delete this class</PopoverHeader>
            <PopoverBody>This cannot be undone! Are you sure?</PopoverBody>
            <Button color="danger" style={{width: "100%"}} onClick={this.props.delClass.bind(this,classId)}>Delete Class</Button>
          </UncontrolledPopover>
        </ListGroupItem>
      );
    }

    return (
      <ListGroupItem
        // tag={RRLink}
        // exact
        // to={"/classes/" + this.props.classInfo.id}
        // action
        style={{ fontWeight: "bold" }}
      >
        {name}
        <div style={{ float: "right" }}>
        <Button color="light" className="transparentDropdownToggle" tag={RRLink} exact to={{
            pathname: "/assignments/create",
            state: {
              classIdSelected: classId,
            }
          }} >
              <i class="material-icons md-dark">add</i>
            </Button>
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
          <Button
            style={{ margin: "6px" }}
            id={"deletePopover"+id}
            close
          />
          <UncontrolledPopover trigger="legacy" placement="bottom" target={"deletePopover"+id}>
            <PopoverHeader>Delete this class</PopoverHeader>
            <PopoverBody>This cannot be undone! Are you sure?</PopoverBody>
            <Button color="danger" style={{width: "100%"}} onClick={this.props.delClass.bind(this,classId)}>Delete Class</Button>
          </UncontrolledPopover>
        </div>

        <div style={{ paddingTop: "25px" }}>
          <Collapse isOpen={this.state.areAssignmentsOpen}>
            <tbody>
              {this.props.classInfo.ongoingAssignments.map((d, idx) => {
                return (
                  <tr>
                    <th
                      scope="row"
                      style={{
                        fontStyle: "italic",
                        fontWeight: "normal",
                      }}
                    >
                      {d.name}
                    </th>
                    <td>
                      <Button color="light"
                          className="transparentDropdownToggle"
                          tag={RRLink} exact to={{
                            pathname: "/assignments/edit",
                            state: {
                              assignmentInfo: d,
                            }
                          }}>
                            <i class="material-icons md-dark">create</i>
                      </Button>
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
                  <td>{this.props.classInfo.students}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    No. of assignments:
                  </th>
                  <td>{this.props.classInfo.noAssignments}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Ongoing assignments:
                  </th>
                  <td>{this.props.classInfo.ongoing}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Pending assignments:
                  </th>
                  <td>{this.props.classInfo.pending}</td>
                </tr>
                <tr>
                  <th scope="row" style={infoTabStyle}>
                    Marked assignments:
                  </th>
                  <td>{this.props.classInfo.marked}</td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
        </div>
      </ListGroupItem>
    );
  }
}

const infoTabStyle = {
  fontWeight: "normal",
};
