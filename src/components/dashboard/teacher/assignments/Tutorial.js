import React, { Component } from "react";
import { Button, ListGroup, Input, Spinner, Form, FormGroup, Label, ListGroupItem } from "reactstrap";
import { listGroup } from "../../../../Style";
import AddQuestion from "./AddQuestion";
import TutorialListItem from "./TutorialListItem";
import * as Globals from "../../../../Globals";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";
import { Link } from "react-router-dom";

export class Tutorial extends Component {
  static contextType = AuthUserContext;

  constructor() {
    super();
    this.state = {
      questions: [],
      title: "",
      classNames: [],
      classIdInput: 0,
      dateInput: "",
      publishClasses:[],
      isLoading: true,
      isSaving: false,
    };
  }

  componentDidMount() {
    const { classIdSelected } = this.props.location.state;
    this.setState({classIdInput: classIdSelected});
    this.getClasses();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };

  onClick = (e) => {
    e.preventDefault();
  };

  onPublishSubmit = (e) => {
    const publishName = this.state.classNames.find((className) => {return className.classId === this.state.classIdInput}).name;
    const addClass = {
      name: publishName,
      classId: this.state.classIdInput, 
      date: this.state.dateInput
    };
    const newPublishedClasses = this.state.publishClasses;
    newPublishedClasses.push(addClass);
    this.setState({publishClasses: newPublishedClasses, classIdInput: 0});
    e.preventDefault();
  };

  deletePublishedClass = (id) => {
    const newPublishedClasses = this.state.publishClasses;
    newPublishedClasses.splice(id, 1);
    this.setState({publishClasses: newPublishedClasses});
  }

  getClasses = () => {
    this.setState({ isLoading: true });
    const userContext = this.context;
    userContext.authUser
      .getIdToken()
      .then(async (idToken) => {
        const classRet = await axios({
            url: Globals.BACKEND_URL + "classes/teacher",
            method: "GET",
            headers: {
              Authorization: "Bearer " + idToken,
            },
          });
        const classNamesRet = classRet.data.map(({ classId, name }) => ({
          classId,
          name,
        }));
        console.log("Retrieved classes: " + JSON.stringify(classNamesRet));
        this.setState({
          classNames: classNamesRet,
        });
        this.setState({ isLoading: false });
      })
      .catch((errorRet) => {
        console.log("Error from backend: ", errorRet);
        this.setState({ error: errorRet });
        this.setState({ isLoading: false });
      });
  }
  
  delQuestion = (id) => {
    this.setState({
      questions: [...this.state.questions.filter((i) => i.id !== id)],
    });
  };

  addQuestion = (questionText, languageValue) => {
    const newQ = {
      id: this.state.id_next++,
      questionText: questionText,
      languageValue: languageValue,
    };
    this.setState({ questions: [...this.state.questions, newQ] });
  };

  saveAssignment = (e) => {
    e.preventDefault();
    this.setState({ isSaving: true });
    const userContext = this.context;
    const publishClasses = this.state.publishClasses;
    userContext.authUser.getIdToken().then(async (idToken) => {
      console.log(
        "Contextual User: " + JSON.stringify(userContext.userDetails)
      );
      const assignmentRet = await axios({
          url: Globals.BACKEND_URL + "assignments",
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: {
            name: this.state.title,
            teacherId: userContext.userDetails.id,
            assignmentTemplate: { questions: this.state.questions },
          },
        });
      if (publishClasses.length !== 0) {
        for (let publishClass of publishClasses) {
          const publishAssignment = {
            classId: publishClass.classId,
            assignmentId: assignmentRet.data.assignmentId,
            deadline: publishClass.date,
            status: 0,
          };
          console.log("Publishing to: " + JSON.stringify(publishAssignment));
          await axios({
            url: Globals.BACKEND_URL + "assignments/publish",
            method: "POST",
            headers: {
              Authorization: "Bearer " + idToken,
            },
            data: { ...publishAssignment },
          });
        }
      }
      this.setState({ isSaving: false });
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="text-center">
            <Spinner color="dark" className="mb-2" />
        </div>
      )
    }
    const del = this.delQuestion;
    const {classNames, classIdInput, dateInput, publishClasses} = this.state;
    const publishClassIds = publishClasses.map(({classId}) => (classId));
    const unpublishedClassNames = classNames.filter((className) => {
      return !publishClassIds.includes(className.classId);
    });
    return (
      <div>
        <h3>Assignment Title: </h3>
        <Input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          onChange={this.onChange}
          placeholder="Title"
        />
        <h5 className="mt-3">Publish assignment to: </h5>
        <Form onSubmit={this.onPublishSubmit} inline>
        <FormGroup className="mr-2">
          <Label for="group" className="mr-2">
            Class
          </Label>
          <Input
            type="select"
            name="classIdInput"
            id="classIdInput"
            placeholder="e.g. Class 19B"
            onClick={this.onClick}
            onChange={this.onChange}
            value={classIdInput}
            className="mr-2"
          >
            <option value={0} disabled>
              Select class...
            </option>
            {unpublishedClassNames.map((d, idx) => {
              return (
                <option key={idx} value={d.classId}>
                  {d.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup className="mr-2">
          <Label for="date" className="mr-2">
            {" "}
            Deadline
          </Label>
          <Input
            type="date"
            name="dateInput"
            id="dateInput"
            value={dateInput}
            onChange={this.onChange}
            onClick={this.onClick}
            className="mr-2"
          />
        </FormGroup>
        <Button type="submit">
          Add
        </Button>
      </Form>
      <ListGroup className="mt-2">
        {publishClasses.length === 0 ?
          <ListGroupItem>No classes to be published to.</ListGroupItem> :
          <>
          {publishClasses.map((d, idx) => {
            return (
              <ListGroupItem key={idx}><span>{d.name}</span>
              <span className="ml-4">Deadline: {d.date}</span>
              <Button
                className="float-right"
                onClick={this.deletePublishedClass.bind(this, idx)}
                close
              />
              </ListGroupItem>
            );
          })}
          </>
        }
      </ListGroup>
        
        
        <div className="mt-3">
        <AddQuestion addQuestion={this.addQuestion} />
        </div>
        {this.state.isSaving ? (
          <div className="text-center">
            <Spinner color="dark" className="mb-2" />
          </div>
        ) : (
          <>
          <div>
            <Button onClick={this.saveAssignment} style={{ width: "100%" }}>
              Save Assignment
            </Button>
          </div>
          <br/>
           <div>
            <Link to="/classes">
            <Button color="success" style={{ width: "100%" }}>
              Exit Assignment
            </Button>
            </Link>
           
         </div>
         </>
        )}
        <br />
        <br />
        <div>
          <ListGroup style={listGroup}>
            {this.state.questions.map(function (d, idx) {
              d.id = idx;
              return (
                <TutorialListItem key={idx} question={d} delQuestion={del} />
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Tutorial;
