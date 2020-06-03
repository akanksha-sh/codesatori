import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import Reveal from "react-reveal/Reveal";
import Header from "./components/layout/Header";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Footer from "./components/layout/Footer";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.parallaxShift);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.parallaxShift);
  }
  parallaxShift = () => {
    this.setState({
      offset: window.pageYOffset,
    });
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="App" style={appStyle}>
          <Parallax bgImage={image1} strength={500} blur={{ min: -1, max: 5 }}>
            <div style={{ height: 400 }}>
              <div style={infoStyle}>
                <h1>Welcome to CodeSatori!</h1>
                <h3>A New Coding Platform for Schools</h3>
              </div>
            </div>
          </Parallax>
          <Parallax bgImage={image2} strength={500} blur={{ min: -1, max: 5 }}>
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
          <Parallax bgImage={image3} strength={500} blur={{ min: -1, max: 5 }}>
            <div style={{ height: 400 }}>
              <div style={infoStyle}>
                <h1>While You're Waiting</h1>
                <h3>You can have a look at some of our demo pages.</h3>
                <p>(if you want)</p>
              </div>
            </div>
          </Parallax>
          <Parallax bgImage={image4} strength={500} blur={{ min: -1, max: 5 }}>
            <div style={{ height: 400 }}>
              <div style={infoStyle}>
                <Link
                  style={{
                    color: "#000",
                    textDecoration: "none",
                  }}
                  to="/teacher_dashboard"
                >
                  <h1>Teacher Dashboard</h1>
                </Link>
              </div>
            </div>
          </Parallax>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
        </div>
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
  margin: "auto",
  opacity: "0.9",
  padding: "10px",
  position: "absolute",
  textAlign: "center",
  width: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};
