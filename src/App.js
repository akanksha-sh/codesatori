import React, { Component } from "react";
import Landing from "./components/landing/Landing";
import Loading from "./components/dashboard/Loading";
import UserDetailsForm from "./components/dashboard/UserDetailsForm";
import Dashboard from "./components/dashboard/Dashboard";
import { withFirebase } from "./firebase";
import { AuthUserContext } from "./session";
import axios from "axios";
import * as Globals from "./Globals";

const INITIAL_STATE = {
  //
  // DO NOT SET USERDETAILS TO NULL ON INITIAL STATE!!!!
  //
  // The userDetails must be filled up with empty data and not just set to NULL,
  // so the child components dont throw an error when trying to read from its properties.
  // For e.g. when the Classes component tries to read userDetails.role, userDetails
  // must not be null or it will throw an error trying to read 'role' from undefined.
  //
  // This applies to other objects with properties that are used by inner components, so
  // it is best to initialise their fields as empty first instead of setting the whole object to null.
  //
  userDetails: {
    id: "",
    firstName: "",
    lastName: "",
    role: 0,
  },
  authUser: null,
  newUserDetails: null,
  isLoading: false,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // check if user signed in, and update
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      (authUserRet) => {
        this.setState({ isLoading: true });
        console.log(authUserRet);
        if (authUserRet !== null) {
          this.setState({ authUser: authUserRet });
          if (this.state.newUserDetails !== null) {
            this.initialiseUserDetails();
          } else {
            this.getCurrentUserDetails();
          }
        } else {
          this.setState({ ...INITIAL_STATE });
        }
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  getCurrentUserDetails = () => this.getUserDetails(this.state.authUser.uid);

  getUserDetails = (uid) => {
    // ALWAYS USE getIdToken() !! If not it may be expired
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
            if (!this.isEmpty(res.data)) {
              this.setState({ userDetails: res.data });
            }
            console.log("Current state: " + JSON.stringify(this.state));
            this.setState({ isLoading: false });
          })
          .catch((error) => {
            console.log("Error from backend: ", error);
          });
      }
    });
  };

  initialiseUserDetails = () => {
    this.setState({ isLoading: true });
    // ALWAYS USE getIdToken() !! If not it may be expired
    this.state.authUser.getIdToken().then((idToken) => {
      console.log(
        "Initialising new user details: " +
          JSON.stringify(this.state.newUserDetails)
      );
      // add data to PostgresSQL
      if (idToken != null) {
        this.postUserDetails(idToken, this.state.newUserDetails)
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

  postUserDetails = (idToken, userDetailsRequest) =>
    axios({
      url: Globals.BACKEND_URL + "user",
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
      },
      data: { id: "", ...userDetailsRequest },
    });

  setNewUserDetails = (newDetails) => {
    this.setState({ newUserDetails: newDetails });
  };

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    if (this.state.authUser !== null) {
      if (!this.state.isLoading) {
        if (this.state.userDetails.id === "") {
          return (
            <div style={appStyle}>
              <UserDetailsForm
                authUser={this.state.authUser}
                postUserDetails={this.postUserDetails}
                callback={this.getCurrentUserDetails}
              />
            </div>
          );
        }
        return (
          <div style={appStyle}>
            <AuthUserContext.Provider value={this.state}>
              <Dashboard />
            </AuthUserContext.Provider>
          </div>
        );
      }
      return <Loading />;
    }
    return (
      <div style={appStyle}>
        <Landing setNewUserDetails={this.setNewUserDetails} error />
      </div>
    );
  }
}

const appStyle = {
  fontFamily: "Roboto",
};

export default withFirebase(App);
