import React, { Component } from 'react'

export class LandingFooter extends Component {
    render() {
        return <div className="bg-dark" style={footerStyle}>Email: contact.codesatori@gmail.com</div>;
    }
}

export default LandingFooter


const footerStyle = {
    alignItems: "left",
    bottom: "0",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto",
    height: "auto",
    justifyContent: "space-between",
    margin: "0",
    padding: "10px",
    position: "fixed",
    width: "100%",
  };
  