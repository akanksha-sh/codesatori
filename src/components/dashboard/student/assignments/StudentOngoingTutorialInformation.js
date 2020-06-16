import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  ListGroupItem,
  DropdownToggle,
} from "reactstrap";
import moment from "moment";

export class StudentOngoingTutorialInformation extends Component {
  clickHandler = (e) => {
    e.preventDefault();
  };

  clickHandler = (e) => {
    e.preventDefault();
  };

  computeTimeLeft = (countdown) => {
    if (countdown.format("D") > 0) {
      return <div>{countdown.format("D") > 0} d</div>;
    } else if (countdown.format("HH") > 0) {
      return <div>{countdown.format("HH")} h</div>;
    } else {
      return <div>{countdown.format("mm")} min</div>;
    }
  };

  render() {
    const countdown = moment(moment(this.props.tutorial.deadline) - moment());
    const days = countdown.format("D");

    console.log(days);
    return (
      <ListGroupItem
        // disabled
        tag={RRLink}
        to={{
          pathname: "/tutorial/" + this.props.tutorial.id,
          state: {
            deadline: this.props.tutorial.deadline,
            submitted: this.props.tutorial.submissionDate !== "",
          },
        }}
        action
        style={{ alignItems: "center", display: "flex" }}
      >
        <div>{this.props.tutorial.name}</div>
        <div style={{ marginLeft: "auto" }}>
          deadline: {this.props.tutorial.deadline}
          <UncontrolledDropdown onClick={this.clickHandler}>
            <DropdownToggle color="light" className="transparentDropdownToggle">
              <i class="material-icons md-dark">chat_bubble_outline</i>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      </ListGroupItem>
    );
  }
}

export default StudentOngoingTutorialInformation;

const NameBoxStyle = {
  display: "flex",
  background: "#f2f2f2",
  flex: "10",
  color: "#000",
  fontSize: "8pt",
  paddingLeft: "5pt",
  lineHeight: "10pt",
  alignItems: "center",
  justifyContent: "left",
};
