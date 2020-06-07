import React, { Component } from "react";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import { withFirebase } from "./firebase";
import { AuthUserContext } from "./session";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {
        userId: 1,
        isTeacher: true,
      },
      authUser: null,
    };
  }

  Logged = (username, password) => {
    if (this.authenticateUser(username, password)) {
      this.setState({ isLoggedIn: true });
    } else {
      //Error handling
    }
  };

  authenticateUser = (username, password) => {
    if (username === "teacher" && password === "password") {
      this.setState({ authUser: { userId: 1 } });
      this.setState({ userDetails: { isTeacher: true } });
      return true;
    }
    if (username === "student" && password === "password") {
      this.setState({ authUser: { userId: 2 } });
      this.setState({ userDetails: { isTeacher: false } });
      return true;
    }
    return false;
  };

  // check if user signed in, and update
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    if (this.state.authUser !== null) {
      return (
        <div style={appStyle}>
          <AuthUserContext.Provider value={this.state.authUser}>
            <UserProvider value={this.state.userDetails}>
              <Dashboard />
            </UserProvider>
          </AuthUserContext.Provider>
        </div>
      );
    } else {
      return (
        <div style={appStyle}>
          <Landing handleLogIn={this.Logged} error />
        </div>
      );
    }
  }
}

const appStyle = {
  fontFamily: "Roboto",
};

export default withFirebase(App);