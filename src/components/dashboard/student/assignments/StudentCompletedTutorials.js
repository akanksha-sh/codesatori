import React, { Component } from "react";
import TutorialInformation from './StudentCompletedTutorialInformation'

export class StudentCompletedTutorials extends Component {
    render() {
        return (
            this.props.tutorials.sort((a, b)=> (a.daysLeft < b.daysLeft) ? 1 : -1)
                .map((tutorial)=><TutorialInformation key={tutorial.id} tutorial={tutorial} infoBoxStyle={this.props.infoBoxStyle}/>)
        )
    }
}

export default StudentCompletedTutorials