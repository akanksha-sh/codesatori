import React, { Component } from "react";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import { withFirebase } from "./firebase";
import { AuthUserContext } from "./session";
import axios from 'axios';
import * as Globals from './Globals';

const DemoTeacherDetails = {
    uuid: 'd8b64d49-c5d2-3756-89bb-6d3172e73f5d',
    role: 'ROLE_TEACHER',
    school: 'Demo High School'
}

const DemoStudentDetails = {
  uuid: '93c8d05c-6438-3c4b-a34f-7cb3926fe730',
  role: 'ROLE_STUDENT',
  school: 'Demo High School'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {
        uuid: '',
        role: '',
        school: ''
      },
      authUser: null
    };
  }

  logged = (username, password) => {
    if (this.authenticateUser(username, password)) {
      this.setState({ isLoggedIn: true });
    } else {
      //Error handling
    }
  };

  authenticateUser = (username, password) => {
    if (username === "teacher" && password === "password") {
      this.setState({ authUser: { userId: 1 } });
      this.setState({ userDetails: DemoTeacherDetails });
      return true;
    }
    if (username === "student" && password === "password") {
      this.setState({ authUser: { userId: 2 } });
      this.setState({ userDetails: DemoTeacherDetails });
      return true;
    }
    return false;
  };

  // check if user signed in, and update
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUserRet) => {
      console.log(authUserRet);
      if (authUserRet !== null) {
        this.setState({ authUser: authUserRet });
        // ALWAYS USE getIdToken() !! If not it may be expired
        this.state.authUser.getIdToken().then((idToken) => {
          // get UserDetails from backend
          this.getUserDetails(idToken);
        });
      } else {
        this.setState({authUser: null});
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  getUserDetails = (uid) => {
    if (uid != null) {
      axios({
        url: Globals.BACKEND_URL + "user/" + uid,
        method: "GET",
        headers: {
          Authorization: "Bearer " + uid,
        },
      })
        .then((res) => {
          const result = JSON.stringify(res.data)
          console.log("Retrieved User Details: " + result);
          if (result !== null) {
            this.setState({ userDetails: JSON.parse(result) });
          }
          console.log("Current state: " + JSON.stringify(this.state));
        })
        .catch((error) => {
          console.log("Error from backend: ", error);
        });
    }
  }

  render() {
    if (this.state.authUser !== null) {
      return (
        <div style={appStyle}>
          <AuthUserContext.Provider value={this.state}>
              <Dashboard />
          </AuthUserContext.Provider>
        </div>
      );
    } else {
      return (
        <div style={appStyle}>
          <Landing handleLogIn={this.logged} error />
        </div>
      );
    }
  }
}

const appStyle = {
  fontFamily: "Roboto",
};

export default withFirebase(App);
