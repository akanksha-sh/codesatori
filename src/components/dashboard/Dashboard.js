import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Classes from "./Classes";
import Assignments from "./Assignments";
import Tutorial from "./teacher/assignments/Tutorial";
import StudentTutorial from "./student/tutorial/StudentTutorial";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <NavigationBar />
          <div className="content-container">
            <div style={contentStyle} className="container">
              <Route exact path="/classes" component={Classes} />
              <Route exact path="/assignments" component={Assignments} />
              <Route exact path="/assignments/1" component={Tutorial} />
              <Route exact path="/assignments/create" component={Tutorial} />
              <Route exact path="/assignments/edit" render={(props) => <Tutorial {...props} isEdit={true} />} />
              <Route exact path="/tutorial/:id" component={StudentTutorial} />
            </div>
            <Redirect exact from="/" to="/classes" />
          </div>
        </Router>
      </div>
    );
  }
}

const contentStyle = {
  margin: "50px auto",
};

export default Dashboard;
