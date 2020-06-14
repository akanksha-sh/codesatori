import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
  Row,
  DropdownToggle,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import AddAssignment from "./AddAssignment";
import AuthUserContext from "../../../../session/Context";

export default class AssignmentListItem extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

    this.state = {
      isInfoOpen: false,
    };
  }

  open = (e) => {
    e.preventDefault();
    this.setState({ isInfoOpen: !this.state.isInfoOpen });
  };

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  onEditClick = (e) => {
    //Edit button
    e.preventDefault();
    e.stopPropagation();
  };

  onDeleteClick = (e) => {
    const assignmentId = this.props.assignment.assignmentId;
    this.props.delAssignment(assignmentId);
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const assignmentStatuses = this.props.assignment.assignmentStatus;
    const classNames = this.props.classNames;
    const publishedClassIds = assignmentStatuses.map(({ classId }) => classId);
    const classesNotPublished = classNames.filter((className) => {
      return !publishedClassIds.includes(className.classId);
    });
    const dateNow = Date.now();
    const assignmentId = this.props.assignment.assignmentId;

    return (
      <ListGroupItem tag="a" href="" action onClick={this.open}>
        <span  style={{ width: "80%" }}>{this.props.assignment.name}</span>
        <Button
            style={{ marginLeft: "16px" }}
            id={"deletePopover" + this.props.assignment.id}
            onClick={this.onClick}
            close
          />
        <UncontrolledPopover trigger="legacy" placement="bottom" target={"deletePopover" + this.props.assignment.id}>
          <PopoverHeader>Delete this assignment</PopoverHeader>
          <PopoverBody>This cannot be undone! Are you sure?</PopoverBody>
          <Button color="danger" 
            style={{width: "100%"}} 
            onClick={this.onDeleteClick}>
              Delete Assignment
          </Button>
        </UncontrolledPopover>
        <i className="material-icons md-dark float-right">expand_more</i>
        {/*here*/}
        <div>
          <Collapse isOpen={this.state.isInfoOpen}>
            <div className="pt-3 pb-2">
              <Container>
                <Row>
                  <Col xs="auto">
                    <Button onClick={this.onEditClick}>Edit</Button>
                  </Col>
                  <Col className="ml-3">
                    <AddAssignment
                      classes={classesNotPublished}
                      assignmentId={assignmentId}
                      refresh={this.props.refresh}
                    />
                  </Col>
                </Row>
                <Row className="mt-4 mx-1">
                  <h5>Classes published to</h5>
                </Row>
                <Row>
                  <ListGroup className="mt-1 mx-3" style={{ width: "100%" }}>
                    {assignmentStatuses.length === 0 ? (
                      <ListGroupItem className="justify-content-between">
                        Not published to any classes yet.{" "}
                      </ListGroupItem>
                    ) : (
                      assignmentStatuses.map((status) => {
                        const className = classNames.find(
                          (cls) => cls.classId === status.classId
                        ).name;
                        const deadline = new Date(status.deadline);
                        const ongoing = deadline > dateNow;
                        return (
                          <ListGroupItem className="justify-content-between">
                            {className}
                            <span className="float-right">
                              {ongoing ? (
                                "Deadline: " + deadline
                              ) : status.status === 0 ? (
                                <div className="float-right">
                                  Pending
                                  <UncontrolledDropdown
                                    onClick={this.clickHandler}
                                  >
                                    <DropdownToggle
                                      color="light"
                                      className="transparentDropdownToggle"
                                    >
                                      <i class="material-icons md-dark">
                                        check
                                      </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      {/* Pending dropdown */}
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              ) : (
                                <div className="float-right">
                                  Marked
                                  <UncontrolledDropdown
                                    onClick={this.clickHandler}
                                  >
                                    <DropdownToggle
                                      color="light"
                                      className="transparentDropdownToggle"
                                    >
                                      <i class="material-icons md-dark">
                                        assessment
                                      </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      {/* Marked dropdown */}
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              )}
                            </span>
                          </ListGroupItem>
                        );
                      })
                    )}
                  </ListGroup>
                </Row>
              </Container>
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    );
  }
}
