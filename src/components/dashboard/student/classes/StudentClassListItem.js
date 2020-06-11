import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Collapse,
  ListGroupItem,
  Table,
  Button,
} from "reactstrap";
import StudentClassInfo from "./StudentClassInfo";

export class StudentClassListItem extends Component {
  state = {
    isOpen: false,
  };

  getDescriptionStyle = (status) => {
    return {
      background: status === "pending" ? "#f2f2f2" : "#ffffff",
      color: status === "pending" ? "#8e929b" : "#000000",
      float: "right",
    };
  };

  toggleNav = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  render() {
    return (
      <ListGroupItem
        // tag={RRLink}
        // exact
        // to={"/classes/" + this.props.class.id}
        // action
        style={{ alignItems: "center" }}
      >
        {this.props.class.name}
        <Collapse
          isOpen={this.props.class.status !== "pending"}
          style={{ float: "right" }}
        >
          <UncontrolledDropdown onClick={this.toggleNav}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">info</i>
            </DropdownToggle>
          </UncontrolledDropdown>
        </Collapse>
        <Collapse isOpen={this.state.isOpen} style={{ margin: "0pt" }}>
          <Table
            responsive="sm"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "30px",
            }}
            hover
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>On Time/Late</th>
                <th>No. Of Tests Passed</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <StudentClassInfo id={this.props.class.id} />
            </tbody>
          </Table>
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default StudentClassListItem;
