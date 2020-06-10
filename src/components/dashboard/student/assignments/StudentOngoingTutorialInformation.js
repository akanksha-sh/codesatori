import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  ListGroupItem,
  DropdownToggle,
} from "reactstrap";

export class StudentOngoingTutorialInformation extends Component {

    clickHandler = (e) => {
        e.preventDefault();
    };
    
    render() {
        return (
            <ListGroupItem
                // disabled
                tag={RRLink}
                exact
                to={"/tutorial/" + this.props.tutorial.id}
                action
                style={{alignItems:'center', display:'flex'}}
            >
                <div>{this.props.tutorial.name}</div>
                <div style={{marginLeft:'auto'}}>
                    {this.props.tutorial.daysLeft} d   
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
