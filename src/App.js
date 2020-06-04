import React, { Component } from "react";
import Landing from './components/landing/Landing';
import Dashboard from "./components/dashboard/Dashboard";
import { UserProvider } from './contexts/UserContext'

export default class App extends Component {
  state = {
    isLoggedIn: false,
    userDetails: {
      userId: 0,
      isTeacher: false
    }
  };

  Logged = (username, password) => {
    if (this.authenticateUser(username, password)) {
      this.setState({ isLoggedIn: true });
    } else {
      //Error handling
    }
  };

  authenticateUser = (username, password) => {
    if (username === "teacher" && password ==='password') {
      this.setState({userDetails: {userId: 1, isTeacher: true}});
      return true;
    }
    if (username === "student" && password ==='password') {
      this.setState({userDetails: {userId: 2, isTeacher: false}});
      return true;
    }
    return false;
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
                  <div style={appStyle}>
                      <UserProvider value={this.state.userDetails}>
                        <Dashboard/>
                      </UserProvider>
                  </div>
              )
  } else {
      return (
          <div style={appStyle}>
              <Landing handleLogIn={this.Logged} error/>
          </div>
      )
  }
  }
}

const appStyle = {
  fontFamily: "Roboto",
};