import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";

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
                </React.Fragment>
              )}
            />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
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
