import React, { Component } from "react";
import { Link } from "react-router-dom";

export class StudentOngoingTutorialInformation extends Component {
  getCountdownBoxStyle = (daysLeft) => {
    return {
      display: "flex",
      background: daysLeft > 0 ? "#000" : "#b73e3a",
      flex: "3",
      maxWidth: "50pt",
      color: "#fff",
      fontSize: "8pt",
      textAlign: "center",
      lineHeight: "10pt",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  render() {
    return (
      <div style={this.props.infoBoxStyle}>
        <div style={this.getCountdownBoxStyle(this.props.tutorial.daysLeft)}>
          <Link to="/tutorial" style={{ color: "#f2f2f2" }}>
            {this.props.tutorial.daysLeft} Days Left
          </Link>
        </div>
        <div style={NameBoxStyle}>
          {this.props.tutorial.name}
          <br></br>
          {this.props.tutorial.className}
        </div>
      </div>
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
