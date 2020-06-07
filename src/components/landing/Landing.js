import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";
import { Jumbotron, Button } from "reactstrap";

export class Landing extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <LandingHeader handleLogIn={this.props.handleLogIn}/>
        <Redirect from="*" to="/" />
        <Route
          exact
          path="/"
          render={(props) => (
            <div className="App content-container" style={appStyle}>
              <Jumbotron style={{ marginBottom: "0px" }}>
                <h1
                  className="display-3 anim-typewriter line-1"
                  style={{ margin: "30px 0px" }}
                >
                  codesatori
                </h1>
                <p className="lead text-center">
                  A new coding platform for schools
                </p>
                <p className="text-center" style={{ marginBottom: "20px" }}>
                  Online code compilation, real-time help, class analytics,
                  simple grade tracking, and more
                </p>
                <p className="lead text-center">
                  <Button color="primary">Coming soon</Button>
                </p>
              </Jumbotron>
              <Jumbotron style={{ "background-color": "transparent" }}>
                <h3 className="text-center">
                  We're currently still in development.
                </h3>{" "}
                <br />
                <p
                  className="lead text-center"
                  style={{ marginBottom: "10px" }}
                >
                  But feel free to have a look at our demo pages.
                </p>
                <p className="text-center">
                  Use username: teacher and password: password to log in and
                  take a look!
                </p>
              </Jumbotron>
            </div>
          )}
        />
        <LandingFooter />
      </Router>
    );
  }
}

const image1 = "/wide_1.jfif";
const image2 = "/wide_2.jfif";
const image3 = "/wide_3.png";
const image4 = "/wide_4.jfif";

const appStyle = {
  fontFamily: "Roboto",
};

export default Landing;
