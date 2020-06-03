import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/layout/Header";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={appStyle}>
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <h1>Home</h1>
                  <p>Welcome to CodeSatori!</p>
                  <p>Sorry, but we're currently working on the homepage...</p>
                  <p>
                    Feel free to email us at contact.codesatori@gmail.com with
                    any suggestions.
                  </p>

                  <Link style={linkStyle} to="/teacher">
                  <h4>Teacher Dashboard</h4>
                  </Link>  
                  <Link style={linkStyle} to="/student">
                  <h4>Student Dashboard</h4>
                  </Link>  
                </React.Fragment>
              )}
            />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/teacher" component={Teacher}/>
            <Route exact path="/student" component={Student}/>

          </div>
        </div>
      </Router>
    );
  }
}

const appStyle = {
  fontFamily: "Roboto",
  padding: "10px",
  textAlign: "left",
};

const linkStyle = {
  color: "#000",
  fontFamily: "Roboto",
  padding: "10px",
  textDecoration: "none",
  textAlign: "center",
};
