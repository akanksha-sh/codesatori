import React, { Component } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  ListGroupItem,
  DropdownToggle,
} from "reactstrap";

export class StudentCompletedTutorialInformation extends Component {
    clickHandler = (e) => {
        e.preventDefault();
    };
    
    render() {
        const renderButton = () => {
            if(this.props.tutorial.score!=='') {
                return <i class="material-icons md-dark">assessment</i>
            } else {
                return <i class="material-icons md-dark">check</i>
            }
        }

        const renderStatus = () => {
            let status = (this.props.tutorial.score==='') ? 'Submitted' : 'Marked';
            return status;
        }

        return (
            <ListGroupItem
                // disabled
                tag={RRLink}
                to={{
                    pathname: "/tutorial/" + this.props.tutorial.id,
                    state: {
                        deadline: this.props.tutorial.deadline,
                        submitted: this.props.tutorial.submissionDate !== ""
                    } 
                }}
                action
                style={{alignItems:'center', display:'flex'}}
            >
                <div>{this.props.tutorial.name}</div>
                <div style={{marginLeft:'auto'}}>
                    {renderStatus()}
                    <UncontrolledDropdown onClick={this.clickHandler}>
                    <DropdownToggle color="light" className="transparentDropdownToggle">
                        {renderButton()}
                    </DropdownToggle>
                    </UncontrolledDropdown>
                </div>
            </ListGroupItem>
        );
    }
}

export default StudentCompletedTutorialInformation
