import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Parallax } from "react-parallax";
import LandingHeader from "./LandingHeader"
import LandingFooter from "./LandingFooter"

export class Landing extends Component {
  constructor(props) {
    super(props);
    }

    
  render() {
    return (
      <Router>
        <LandingHeader handleLogIn={this.props.handleLogIn}/>
        {/* <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/assignments" component={Assignment} />
        <Route exact path="/student" component={Student} /> */}
        <Redirect from="*" to="/" />
        <Route
          exact
          path="/"
          render={(props) => (
            <div className="App" style={appStyle}>
              <Parallax
                bgImage={image1}
                strength={500}
                blur={{ min: -1, max: 5 }}
              >
                <div style={{ height: 400 }}>
                  <div style={infoStyle}>
                    <h1>Welcome to CodeSatori!</h1>
                    <h3>A New Coding Platform for Schools</h3>
                  </div>
                </div>
              </Parallax>
              <Parallax
                bgImage={image2}
                strength={500}
                blur={{ min: -1, max: 5 }}
              >
                <div style={{ height: 400 }}>
                  <div style={infoStyle}>
                    <h1>We're currently still developing...</h1>
                    <h3>
                      But please email us at contact.codesatori@gmail.com if you
                      have any suggestions!
                    </h3>
                  </div>
                </div>
              </Parallax>
              <Parallax
                bgImage={image3}
                strength={500}
                blur={{ min: -1, max: 5 }}
              >
                <div style={{ height: 400 }}>
                  <div style={infoStyle}>
                    <h1>While You're Waiting</h1>
                    <h3>You can have a look at some of our demo pages.</h3>
                    <p>(if you want)</p>
                  </div>
                </div>
              </Parallax>
              <Parallax
                bgImage={image4}
                strength={500}
                blur={{ min: -1, max: 5 }}
              >
                <div style={{ height: 400 }}>
                  <div style={infoStyle}>
                    <h1>To get started, login with the following credentials:</h1>
                    <h3>Username: teacher</h3>
                    <h3>Password: password</h3>
                  </div>
                </div>
              </Parallax>
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

const infoStyle = {
  alignItems: "center",
  backgroundColor: "#fff",
  backgroundPosition: "center",
  bottom: "this.state.offset / 2",
  justifyContent: "center",
  left: "50%",
  margin: "auto",
  opacity: "0.9",
  padding: "10px",
  position: "absolute",
  textAlign: "center",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: "50%",
};

export default Landing
