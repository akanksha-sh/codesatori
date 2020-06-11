import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
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

  clickHandler = (e) => {
    this.setState({isInfoOpen: !this.state.isInfoOpen});
    e.preventDefault();
  };

  render() {
    if (false) {
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
        tag="a"
        href=""
        action
        onClick={this.clickHandler}
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
                <Button>Edit</Button> 
                </Col>
                <Col xs="auto">
                <AddAssignment />
                </Col>
              </Row>
            </Container>
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    );
  }
}

// { <div style={{ float: "right" }}>
//           1 w{" "}
//           <UncontrolledDropdown onClick={this.clickHandler}>
//             <DropdownToggle color="light" className="transparentDropdownToggle">
//               <i class="material-icons md-dark">chat_bubble_outline</i>
//             </DropdownToggle>
//             <DropdownMenu right>{/* <AddStudent /> */}</DropdownMenu>
//           </UncontrolledDropdown>
//           <UncontrolledDropdown onClick={this.clickHandler}>
//             <DropdownToggle color="light" className="transparentDropdownToggle">
//               <i class="material-icons md-dark">update</i>
//             </DropdownToggle>
//             <DropdownMenu right>{/* <AddStudent /> */}</DropdownMenu>
//           </UncontrolledDropdown>
//           <UncontrolledDropdown onClick={this.clickHandler}>
//             <DropdownToggle color="light" className="transparentDropdownToggle">
//               <i class="material-icons md-dark">assignment</i>
//             </DropdownToggle>
//             <DropdownMenu right>
//               {/* <ClassInfo class={this.props.class} /> */}
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </div> }