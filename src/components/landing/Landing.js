import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import ReactPlayer from 'react-player';

export class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <LandingHeader
          handleLogIn={this.props.handleLogIn}
          setNewUserDetails={this.props.setNewUserDetails}
        />
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
                <Container className="mt-5">
                  <Row className="justify-content-center">
                    <Col xs="auto">
                    <ReactPlayer
                      url={process.env.PUBLIC_URL +  "/demo.mp4"}
                      playing="true"
                      loop="true"
                      muted="true"
                    />
                    </Col>
                  </Row>
                </Container>
                
              </Jumbotron>
              <Jumbotron style={{ backgroundColor: "transparent" }}>
                <h3 className="text-center">
                  We're currently still in development.
                </h3>{" "}
                <br />
                <p
                  className="lead text-center"
                  style={{ marginBottom: "10px" }}
                >
                  But feel free to email us at contact.codesatori@gmail.com with
                  any suggestions!
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

const appStyle = {
  fontFamily: "Roboto",
};

export default Landing;
