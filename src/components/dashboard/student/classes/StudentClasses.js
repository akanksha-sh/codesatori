import React, { Component } from "react";
import { Collapse, ListGroup, Spinner } from "reactstrap";
import uuid from "uuid";
import AddClass from "./StudentAddClass";
import ClassListItem from "./StudentClassListItem";
import { pageTitle, contentDiv } from "../../../../Style";
import * as Globals from "./../../../../Globals";
import axios from "axios";
import AuthUserContext from "../../../../session/Context";

export class StudentClasses extends Component {
  static contextType = AuthUserContext;

  state = {
    classes: [],
    inactiveShown: false,
    isLoading: true,
    classAssignmentData: [],
    error: null,
  };

  componentDidMount() {
    this.getClasses();
  }

  getClasses = () => {
    console.log("Retrieving user's classes from: " + Globals.BACKEND_URL);
    const userContext = this.context;
    userContext.authUser
      .getIdToken()
      .then(async (idToken) => {
        const classRet = await axios({
          url: Globals.BACKEND_URL + "classes/student",
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
        });
        console.log("getClass(): " + JSON.stringify(classRet.data));
        this.setState({ classAssignmentData: classRet.data, isLoading: false });
      })
      .catch((errorRet) => {
        console.log("Error from backend: ", errorRet);
        this.setState({ error: errorRet });
        this.setState({ isLoading: false });
      });
  };

  addClass = (name) => {
    const newClass = {
      id: uuid.v4(),
      name: name,
      //To implement at backend
      status: "pending",
    };
    this.setState({ classes: [...this.state.classes, newClass] });
  };

  getBtnStyle = () => {
    return {
      background: !this.state.inactiveShown ? "#000000" : "#e5e5e5",
      color: !this.state.inactiveShown ? "#ffffff" : "#000000",
      border: "none",
      height: "20px",
      width: "30px",
      borderRadius: "10%",
      cursor: "pointer",
      float: "left",
      fontSize: "6pt",
    };
  };

  toggleShow = () =>
    this.setState({
      inactiveShown: !this.state.inactiveShown,
    });

  render() {
    //To implement statuses at backend
    const { classAssignmentData, isLoading } = this.state;
    const inactiveClasses = [];
    const pendingClasses = [];

    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}> Classes </h2>
        <AddClass addClass={this.addClass} refreshData={this.getClasses} />
        <br />
        {isLoading ? (
          <div className="text-center">
            <Spinner color="dark" className="mb-2" />
          </div>
        ) : (
          <div>
            <div style={ClassGroupStyle}>
              <Collapse isOpen={pendingClasses.length > 0}>
                <h4>Pending</h4>
                <ListGroup style={ListStyle}>
                  {pendingClasses.map((c) => (
                    <ClassListItem key={c.id} class={c} />
                  ))}
                </ListGroup>
              </Collapse>
            </div>
            <div style={ClassGroupStyle}>
              <h4>Active Classes</h4>
              <ListGroup style={ListStyle}>
                {classAssignmentData.map(function (d, idx) {
                  return <ClassListItem key={idx} classInfo={d} />;
                })}
              </ListGroup>
            </div>
            <div style={ClassGroupStyle}>
              <h4>Inactive Classes</h4>
              <button style={this.getBtnStyle()} onClick={this.toggleShow}>
                {this.state.inactiveShown ? "hide" : "show"}
              </button>
              <br />
              <Collapse isOpen={this.state.inactiveShown}>
                {inactiveClasses.length === 0 ? (
                  <div style={{ fontSize: "8pt" }}>Nothing to show</div>
                ) : (
                  <ListGroup style={ListStyle}>
                    {inactiveClasses.map((c) => (
                      <ClassListItem key={c.id} class={c} />
                    ))}
                  </ListGroup>
                )}
              </Collapse>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const ClassGroupStyle = {
  marginTop: "30px",
};

const ListStyle = {
  marginTop: "20px",
  marginBottom: "20px",
  padding: "0px",
};

export default StudentClasses;
