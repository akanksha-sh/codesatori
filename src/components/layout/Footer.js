import React from "react";

export default function Footer() {
  return <div style={footerStyle}>Email: contact.codesatori@gmail.com</div>;
}

const footerStyle = {
  alignItems: "left",
  background: "#000",
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
