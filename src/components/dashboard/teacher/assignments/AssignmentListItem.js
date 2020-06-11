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
} from "reactstrap";
import AddAssignment from './AddAssignment';

export default class AssignmentListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoOpen:false
    }
  }

  open = (e) => {
    this.setState({isInfoOpen: !this.state.isInfoOpen});
    e.preventDefault();
  };

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const assignmentStatuses = this.props.assignment.assignmentStatus;
    const classNames = this.props.classNames;
    const dateNow = Date.now();
 
    // if (false) {
    //   const renderButton = () => {
    //     if (this.props.assignment.marked) {
    //       return <i class="material-icons md-dark">assessment</i>;
    //     } else {
    //       return <i class="material-icons md-dark">check</i>;
    //     }
    //   };

    //   const renderStatus = () => {
    //     let status = this.props.assignment.marked ? "Marked" : "Pending";
    //     return status;
    //   };

    //   return (
    //     <ListGroupItem
    //       // disabled
    //       tag={RRLink}
    //       exact
    //       to={"/assignments/" + this.props.assignment.id}
    //       action
    //     >
    //       {this.props.assignment.title}

    //       <div style={{ float: "right" }}>
    //         {renderStatus()}
    //         <UncontrolledDropdown onClick={this.clickHandler}>
    //           <DropdownToggle
    //             color="light"
    //             className="transparentDropdownToggle"
    //           >
    //             {renderButton()}
    //           </DropdownToggle>
    //           <DropdownMenu right>
    //             {/* <ClassInfo class={this.props.class} /> */}
    //           </DropdownMenu>
    //         </UncontrolledDropdown>
    //       </div>
    //     </ListGroupItem>
    //   );
    // }

    return (
      <ListGroupItem
        tag="a"
        href=""
        action
        onClick={this.open}
      >
        <span style={{width: "80%"}}>{this.props.assignment.name}</span>
        <i className="material-icons md-dark float-right">expand_more</i>
        {/*here*/}
        <div>
          <Collapse isOpen={this.state.isInfoOpen}>
            <div className="pt-3 pb-2">
            <Container>
              <Row>
                <Col xs="auto">
                <Button onClick={this.onClick}>Edit</Button> 
                </Col>
                <Col className="ml-3">
                  <AddAssignment classes={this.props.classNames}/>
                </Col>
              </Row>
              <Row>
              <ListGroup className="mt-3 mx-3" style={{width: "100%"}}>
                {assignmentStatuses.length === 0 ? 
                <ListGroupItem className="justify-content-between">Not published to any classes yet. </ListGroupItem>
                : assignmentStatuses.map((status) => {
                  const className = classNames.find(cls => cls.classId === status.classId).name;
                  const deadline = new Date(status.deadline);
                  const ongoing = deadline > dateNow;
                  return (
                  <ListGroupItem className="justify-content-between">
                    {className}
                    <span className="float-right">
                      {ongoing ? ("Deadline: " + deadline) 
                      : (status.status === 0 ? 
                      <div className="float-right">
                        Pending
                        <UncontrolledDropdown onClick={this.clickHandler}>
                        <DropdownToggle
                          color="light"
                          className="transparentDropdownToggle"
                        >
                        <i class="material-icons md-dark">check</i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {/* Pending dropdown */}
                        </DropdownMenu>
                        </UncontrolledDropdown>
                      </div> : 
                      <div className="float-right">
                      Marked
                        <UncontrolledDropdown onClick={this.clickHandler}>
                        <DropdownToggle
                          color="light"
                          className="transparentDropdownToggle"
                        >
                        <i class="material-icons md-dark">assessment</i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {/* Marked dropdown */}
                        </DropdownMenu>
                        </UncontrolledDropdown>
                      </div> )}
                    </span>
                  </ListGroupItem>
                  );
                })}
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