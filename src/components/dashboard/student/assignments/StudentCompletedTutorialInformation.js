import React, { Component } from "react";
import { Link } from "react-router-dom";

export class StudentCompletedTutorialInformation extends Component {
  render() {
    return (
      <div style={this.props.infoBoxStyle}>
        <div style={StatusBoxStyle}>
          <Link to="/tutorial" style={{ color: "#000" }}>
            {this.props.tutorial.score === "-" ? "Submitted" : "Marked"}
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

export default StudentCompletedTutorialInformation;

const StatusBoxStyle = {
  display: "flex",
  background: "#f2f2f2",
  flex: "2",
  maxWidth: "50pt",
  color: "#000",
  fontSize: "8pt",
  textAlign: "center",
  lineHeight: "10pt",
  alignItems: "center",
  justifyContent: "center",
};

const NameBoxStyle = {
  display: "flex",
  background: "#000",
  flex: "5",
  color: "#fff",
  fontSize: "8pt",
  paddingLeft: "5pt",
  lineHeight: "10pt",
  alignItems: "center",
  justifyContent: "left",
  flexDirection: "row",
};
