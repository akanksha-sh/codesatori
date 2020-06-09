import React, { Component } from "react";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import { withFirebase } from "./firebase";
import { AuthUserContext } from "./session";
import axios from "axios";
import * as Globals from "./Globals";

const INITIAL_USER_DETAILS = {
  firstName: "",
  lastName: "",
  role: 0,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: INITIAL_USER_DETAILS,
      authUser: null,
      newUserDetails: null,
    };
  }

  // check if user signed in, and update
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      (authUserRet) => {
        console.log(authUserRet);
        if (authUserRet !== null) {
          this.setState({ authUser: authUserRet });
          if (this.state.newUserDetails !== null) {
            this.initialiseUserDetails();
          } else {
            // ALWAYS USE getIdToken() !! If not it may be expired
            this.getUserDetails(this.state.authUser.uid);
          }
        } else {
          this.setState({ authUser: null });
          this.setState({ userDetails: INITIAL_USER_DETAILS });
          this.setState({ newUserDetails: null });
        }
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  getUserDetails = (uid) => {
    this.state.authUser.getIdToken().then((idToken) => {
      console.log("idToken: " + idToken);
      console.log("uid: " + uid);
      // get UserDetails from backend
      console.log("Getting user details from: " + Globals.BACKEND_URL);
      if (uid != null) {
        axios({
          url: Globals.BACKEND_URL + "user/" + uid,
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        })
          .then((res) => {
            const result = JSON.stringify(res.data);
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
    });
  };

  initialiseUserDetails = () => {
    this.state.authUser.getIdToken().then((idToken) => {
      console.log(
        "Initialising new user details: " +
          JSON.stringify(this.state.newUserDetails)
      );
      // add data to PostgresSQL
      if (idToken != null) {
        axios({
          url: Globals.BACKEND_URL + "user",
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: { id: "", ...this.state.newUserDetails },
        })
          .then((res) => {
            console.log("Initialised new user details: " + JSON.stringify(res));
            this.getUserDetails(this.state.authUser.uid);
            this.setState({ newUserDetails: null });
          })
          .catch((error) => {
            console.log("Error from backend: ", error);
          });
      }
    });
  };

  setNewUserDetails = (newDetails) => {
    this.setState({ newUserDetails: newDetails });
  };

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
          <Landing
            setNewUserDetails={this.setNewUserDetails}
            error
          />
        </div>
      );
    }
  }
}

const appStyle = {
  fontFamily: "Roboto",
};

export default withFirebase(App);
