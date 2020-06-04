import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import Reveal from "react-reveal/Reveal";
import Header from "./components/layout/Header";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Assignment from "./pages/Assignment";
import Footer from "./components/layout/Footer";

export default class App extends Component {
  state = {
    isLoggedIn: false,
  };

  Logged = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/assignments" component={Assignment} />
        <Route exact path="/student" component={Student} />
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
                    <Link
                      style={{
                        color: "#000",
                        textDecoration: "none",
                      }}
                      to="/teacher"
                    >
                      <h1>Teacher Dashboard</h1>
                    </Link>
                  </div>
                </div>
              </Parallax>
            </div>
          )}
        />
        <Footer />
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
