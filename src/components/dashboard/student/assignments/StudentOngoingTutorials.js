import React, { Component } from "react";
import TutorialInformation from "./StudentOngoingTutorialInformation";

export class StudentOngoingTutorials extends Component {
  render() {
    return this.props.tutorials.map((tutorial) => (
      <TutorialInformation
        key={tutorial.id}
        tutorial={tutorial}
        infoBoxStyle={this.props.infoBoxStyle}
      />
    ));
  }
}

export default StudentOngoingTutorials;
