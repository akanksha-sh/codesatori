import React from "react";
import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <header style={headerStyle}>
      <Link style={linkStyle} to="/">
        <h1>CodeSatori</h1>
      </Link>
      <nav>
        <Link style={linkStyle} to="/login">
          <div style={{ textAlign: "right" }}>Log In</div>
        </Link>
        <Link style={linkStyle} to="/signup">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

const headerStyle = {
  alignItems: "center",
  background: "#000",
  display: "flex",
  justifyContent: "space-between",
};

const linkStyle = {
  color: "#fff",
  display: "inline-block",
  fontFamily: "Roboto",
  padding: "10px",
  textDecoration: "none",
};
